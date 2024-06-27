import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import keycloak from 'auth/keycloak-api/keycloak';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';
import { INDEXES } from 'graphql/constants';
import { getColumnStateQuery } from 'graphql/reports/queries';
import EnvironmentVariables from 'helpers/EnvVariables';
import startCase from 'lodash/startCase';
import { v4 } from 'uuid';

import { getDefaultContentType } from 'common/downloader';
import { ReportApi } from 'services/api/reports';
import { ReportConfig } from 'services/api/reports/models';
import { WrapperApi } from 'services/api/wrapper';
import { ArrangerColumnStateResults } from 'services/api/wrapper/models';
import { globalActions } from 'store/global';

import { ManifestApi } from '../../services/api/manifest';
import { ManifestConfig } from '../../services/api/manifest/models';

import { TFetchTSVArgs } from './types';

export const SUPPORT_EMAIL = EnvironmentVariables.configFor('SUPPORT_EMAIL') || 'support@cqdg.ca';

const showErrorReportNotif = (thunkApi: any) =>
  thunkApi.dispatch(
    globalActions.displayNotification({
      type: 'error',
      message: intl.get('api.report.error.title'),
      description: (
        <div>
          {intl.get('api.report.error.message')}
          <a
            style={{ color: 'unset', textDecoration: 'underline' }}
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {intl.get('api.report.error.support')}
          </a>
        </div>
      ),
      duration: 5,
    }),
  );

const fetchReport = createAsyncThunk<
  void,
  {
    data: ReportConfig;
    callback?: () => void;
  },
  { rejectValue: string }
>('report/generateReport', async (args, thunkAPI) => {
  const messageKey = 'report_pending';

  try {
    thunkAPI.dispatch(
      globalActions.displayMessage({
        type: 'loading',
        key: messageKey,
        content: intl.get('api.report.inProgress.fetchReport'),
        duration: 0,
      }),
    );
    await ReportApi.generateReport(args.data);
    thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
    thunkAPI.dispatch(
      globalActions.displayNotification({
        type: 'success',
        message: intl.get('api.report.onSuccess.title'),
        description: intl.get('api.report.onSuccess.fetchReport'),
      }),
    );
    if (args.callback) args.callback();
  } catch (e) {
    thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
    showErrorReportNotif(thunkAPI);
  }
});

const fetchTsvReport = createAsyncThunk<void, TFetchTSVArgs, { rejectValue: string }>(
  'report/generate/tsv',
  async (args, thunkAPI) => {
    const messageKey = 'report_pending';

    thunkAPI.dispatch(
      globalActions.displayMessage({
        type: 'loading',
        key: messageKey,
        content: intl.get('api.report.inProgress.fetchReport'),
        duration: 0,
      }),
    );

    try {
      const formattedDate = format(new Date(), 'yyyy-MM-dd');
      const formattedFileName = `cqdg-${
        args.fileName ?? args.index.toLowerCase()
      }-table-${formattedDate}.tsv`;

      const { data, error } = await WrapperApi.columnStates({
        query: getColumnStateQuery(args.index),
        variables: {},
      });

      if (error) {
        showErrorReportNotif(thunkAPI);
        thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
        return thunkAPI.rejectWithValue(error?.message);
      }

      const { downloadData, downloadError } = await fetchTsxReport(args, data!, formattedFileName);

      thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));

      if (downloadError) {
        showErrorReportNotif(thunkAPI);
        return thunkAPI.rejectWithValue(downloadError?.message);
      }

      thunkAPI.dispatch(
        globalActions.displayNotification({
          type: 'success',
          message: intl.get('api.report.onSuccess.title'),
          description: intl.get('api.report.onSuccess.fetchReport'),
        }),
      );

      saveAs(
        new Blob([downloadData], {
          type: getDefaultContentType('text'),
        }),
        formattedFileName,
      );
    } catch {
      thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
      showErrorReportNotif(thunkAPI);
    }
  },
);

const generateLocalTsvReport = createAsyncThunk<
  void,
  {
    index: string;
    fileName?: string;
    headers: any[];
    cols: { key: string; visible: boolean }[];
    rows: any[];
  },
  { rejectValue: string }
>('report/generate/tsv', async (args, thunkAPI) => {
  // !! This function assumes that it is called only when the table is not empty. Said otherwise, data is never empty !!
  const messageKey = 'report_pending';

  try {
    const formattedDate = format(new Date(), 'yyyy-MM-dd');
    const formattedFileName = `cqdg-${
      args.fileName ?? args.index.toLowerCase()
    }-table-${formattedDate}.tsv`;

    const visibleKeys = (args.cols || []).filter((c) => c.visible).map((c) => c.key);
    const visibleHeaders = args.headers.filter((h) => visibleKeys.includes(h.key));
    const visibleTitle = visibleHeaders.map((h) => h.title);
    const visibleRows = (args.rows || []).reduce(
      (rs, r) => [
        ...rs,
        visibleHeaders.map((h) => (h.exportValue ? h.exportValue(r) : '') || r[h.key] || '--'),
      ],
      [],
    );

    const shapeIsOK = visibleRows.every((r: unknown[]) => r.length === visibleTitle.length);
    if (!shapeIsOK) {
      showErrorReportNotif(thunkAPI);
      return thunkAPI.rejectWithValue('Error while generating report: shape is not OK');
    }

    const doc: string = [visibleTitle, ...visibleRows]
      .reduce((text, row) => text + '\n' + row.join('\t'), '')
      .trimStart();

    saveAs(new Blob([doc], { type: 'text/plain;charset=utf-8' }), formattedFileName);

    thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
  } catch {
    thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
    showErrorReportNotif(thunkAPI);
  }
});

const idField = (index: string) => {
  switch (index) {
    case INDEXES.PARTICIPANT:
      return 'participant_id';
    case INDEXES.FILE:
      return 'file_id';
    case INDEXES.BIOSPECIMEN:
      return 'sample_id';
    default:
      return undefined;
  }
};

const fetchTsxReport = async (
  args: TFetchTSVArgs,
  data: ArrangerColumnStateResults,
  formattedFileName: string,
) => {
  let colStates = args.columnStates
    ? args.columnStates
    : args.columns.map((col, index) => ({
        index,
        key: col.key,
        visible: col.defaultHidden || true,
      }));
  colStates = colStates.filter(({ visible }) => !!visible);

  const columnKeyOrdered = [...colStates].sort((a, b) => a.index - b.index).map(({ key }) => key);
  const tsvColumnsConfig = data!.data[args.index].columnsState.state.columns.filter(({ field }) =>
    colStates.find(({ key }) => key === field),
  );
  const tsvColumnsConfigWithHeader = tsvColumnsConfig.map((column) => ({
    ...column,
    Header: getTitleFromColumns(args.columns, column.field),
  }));

  const sortIdField = idField(args.index);

  const params = new URLSearchParams({
    params: JSON.stringify({
      files: [
        {
          fileName: formattedFileName,
          fileType: 'tsv',
          sqon: args.sqon,
          sort: sortIdField ? [{ field: sortIdField, order: 'asc' }] : [],
          index: args.index,
          columns: tsvColumnsConfigWithHeader.sort((a, b) =>
            columnKeyOrdered.indexOf(a.field) > columnKeyOrdered.indexOf(b.field) ? 1 : -1,
          ),
        },
      ],
    }),
    httpHeaders: JSON.stringify({
      authorization: `Bearer ${keycloak.token}`,
    }),
    downloadKey: v4(),
  });

  const { data: downloadData, error: downloadError } = await WrapperApi.download(params);

  return {
    downloadData,
    downloadError,
  };
};

const getTitleFromColumns = (columns: ProColumnType[], field: string) => {
  const column = columns.find(({ key }) => key === field);

  if (!column || (column.title && typeof column.title !== 'string')) {
    return startCase(field.replace(/\./g, ' '));
  }

  return column.title;
};

const fetchCavaticaManifest = createAsyncThunk<
  void,
  {
    data: ManifestConfig;
    callback?: () => void;
  },
  { rejectValue: string }
>('report/generateReport', async (args, thunkAPI) => {
  const messageKey = 'report_pending';

  try {
    thunkAPI.dispatch(
      globalActions.displayMessage({
        type: 'loading',
        key: messageKey,
        content: intl.get('api.report.inProgress.fetchReport'),
        duration: 0,
      }),
    );
    await ManifestApi.generateManifest(args.data);
    thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
    thunkAPI.dispatch(
      globalActions.displayNotification({
        type: 'success',
        message: intl.get('api.report.onSuccess.title'),
        description: intl.get('api.report.onSuccess.fetchReport'),
      }),
    );
    if (args.callback) args.callback();
  } catch (e) {
    thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
    showErrorReportNotif(thunkAPI);
  }
});

export { fetchReport, fetchTsvReport, generateLocalTsvReport, fetchCavaticaManifest };
