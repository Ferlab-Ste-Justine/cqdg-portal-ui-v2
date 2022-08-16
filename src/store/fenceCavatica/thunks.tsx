import intl from 'react-intl-universal';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { termToSqon } from '@ferlab/ui/core/data/sqon/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Modal } from 'antd';
import { IFileEntity, IFileResultTree } from 'graphql/files/models';
import { SEARCH_FILES_QUERY } from 'graphql/files/queries';
import { hydrateResults } from 'graphql/models';
import isEmpty from 'lodash/isEmpty';
import { CAVATICA_FILE_BATCH_SIZE } from 'views/DataExploration/utils/constant';

import { FENCE_CONNECTION_STATUSES } from 'common/fenceTypes';
import { ArrangerApi } from 'services/api/arranger';
import { CavaticaApi } from 'services/api/cavatica';
import {
  ICavaticaBillingGroup,
  ICavaticaCreateProjectBody,
  ICavaticaProject,
} from 'services/api/cavatica/models';
import { globalActions } from 'store/global';
import { RootState } from 'store/types';
import { handleThunkApiReponse } from 'store/utils';
import { userHasAccessToFile } from 'utils/dataFiles';

import { IBulkImportData, TCavaticaProjectWithMembers } from './types';

const fetchAllProjects = createAsyncThunk<
  TCavaticaProjectWithMembers[],
  void,
  { rejectValue: string; state: RootState }
>(
  'cavatica/fetch/projects',
  async (_, thunkAPI) => {
    const { data, error } = await CavaticaApi.fetchProjects();
    const projects = data?.items || [];

    if (error) {
      thunkAPI.dispatch(
        globalActions.displayNotification({
          type: 'error',
          message: intl.get('api.cavatica.error.title'),
          description: intl.get('api.cavatica.error.projects.fetch'),
        }),
      );
      return thunkAPI.rejectWithValue(error.message);
    }

    const projectList = await Promise.all(
      (projects || []).map(async (project) => {
        const [memberResponse] = await Promise.all([CavaticaApi.fetchProjetMembers(project.id)]);

        return { ...project, memberCount: memberResponse.data?.items.length || 0 };
      }),
    );

    return projectList;
  },
  {
    condition: (_, { getState }) => {
      const { fenceCavatica } = getState();

      return isEmpty(fenceCavatica.projects);
    },
  },
);

const beginAnalyse = createAsyncThunk<
  IBulkImportData,
  {
    sqon: ISqonGroupFilter;
    fileIds: string[];
  },
  { rejectValue: string; state: RootState }
>('cavatica/begin/analyse', async (args, thunkAPI) => {
  const { fenceConnection } = thunkAPI.getState();
  const allFencesAcls = Object.values(fenceConnection.fencesAcls).flat();

  const sqon: ISqonGroupFilter = {
    op: BooleanOperators.and,
    content: [args.sqon],
  };

  if (args.fileIds.length > 0) {
    sqon.content = [
      ...sqon.content,
      termToSqon({
        field: 'file_id',
        value: args.fileIds,
      }),
    ];
  }

  const { data, error } = await ArrangerApi.graphqlRequest<{ data: IFileResultTree }>({
    query: SEARCH_FILES_QUERY.loc?.source.body,
    variables: {
      sqon,
      first: CAVATICA_FILE_BATCH_SIZE,
    },
  });

  if (error) {
    thunkAPI.dispatch(
      globalActions.displayNotification({
        type: 'error',
        message: intl.get('api.cavatica.error.title'),
        description: intl.get('api.cavatica.error.bulk.fetchFiles'),
      }),
    );
    return thunkAPI.rejectWithValue(error.message);
  }

  const {
    data: { file },
  } = data!;

  const files = hydrateResults(file?.hits?.edges || []);

  const authorizedFiles = getAuthorizedFiles(
    allFencesAcls,
    files,
    fenceConnection.connectionStatus.cavatica === FENCE_CONNECTION_STATUSES.connected,
    fenceConnection.connectionStatus.gen3 === FENCE_CONNECTION_STATUSES.connected,
  );

  if (!authorizedFiles.length) {
    Modal.error({
      type: 'error',
      title: intl.get('api.cavatica.error.fileAuth.title'),
      content: intl.get('api.cavatica.error.fileAuth.description'),
    });
    return thunkAPI.rejectWithValue('0 authorized files');
  }

  return {
    files,
    authorizedFiles,
  };
});

const fetchAllBillingGroups = createAsyncThunk<
  ICavaticaBillingGroup[],
  void,
  { rejectValue: string; state: RootState }
>(
  'cavatica/fetch/billingGroups',
  async (_, thunkAPI) => {
    const { data, error } = await CavaticaApi.fetchBillingGroups();

    return handleThunkApiReponse({
      error,
      data: data?.items || [],
      reject: thunkAPI.rejectWithValue,
      onError: () =>
        thunkAPI.dispatch(
          globalActions.displayNotification({
            type: 'error',
            message: intl.get('api.cavatica.error.title'),
            description: intl.get('api.cavatica.error.billingGroups.fetch'),
          }),
        ),
    });
  },
  {
    condition: (_, { getState }) => {
      const { fenceCavatica } = getState();

      return isEmpty(fenceCavatica.billingGroups);
    },
  },
);

const createProjet = createAsyncThunk<
  {
    isAnalyseModalVisible: boolean;
    newProject: ICavaticaProject;
  },
  {
    openAnalyseModalOnDone?: boolean;
    showSuccessNotification?: boolean;
    showErrorNotification?: boolean;
    body: ICavaticaCreateProjectBody;
  },
  { rejectValue: string; state: RootState }
>('cavatica/create/project', async (args, thunkAPI) => {
  const { data, error } = await CavaticaApi.createProject(args.body);

  return handleThunkApiReponse({
    error,
    reject: thunkAPI.rejectWithValue,
    onError: () => {
      if (args.showErrorNotification) {
        thunkAPI.dispatch(
          globalActions.displayNotification({
            type: 'error',
            message: intl.get('api.cavatica.error.title'),
            description: intl.get('api.cavatica.error.projects.create'),
          }),
        );
      }
    },
    onSuccess: () => {
      if (args.showSuccessNotification) {
        thunkAPI.dispatch(
          globalActions.displayNotification({
            type: 'success',
            message: intl.get('api.cavatica.success.title'),
            description: intl.get('api.cavatica.success.projects.create'),
          }),
        );
      }
    },
    data: {
      isAnalyseModalVisible: args.openAnalyseModalOnDone || false,
      newProject: data!,
    },
  });
});

const getAuthorizedFiles = (
  userAcls: string[],
  files: IFileEntity[],
  isConnectedToCavatica: boolean,
  isConnectedToGen3: boolean,
) =>
  files.filter((file) =>
    userHasAccessToFile(file, userAcls, isConnectedToCavatica, isConnectedToGen3),
  );

export { fetchAllProjects, fetchAllBillingGroups, createProjet, beginAnalyse };
