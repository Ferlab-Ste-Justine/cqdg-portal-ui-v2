import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import keycloak from 'auth/keycloak-api/keycloak';
import { AxiosRequestHeaders } from 'axios';
import { format } from 'date-fns';
import EnvironmentVariables from 'helpers/EnvVariables';
import isEmpty from 'lodash/isEmpty';

import downloader from 'common/downloader';

import { ReportConfig, ReportType } from './models';

const REPORT_API_URL = EnvironmentVariables.configFor('REPORTS_API_URL');

const ARRANGER_PROJECT_ID = EnvironmentVariables.configFor('ARRANGER_PROJECT_ID');

export const REPORTS_ROUTES = {
  [ReportType.CLINICAL_DATA]: `${REPORT_API_URL}/reports/clinical-data`,
  [ReportType.CLINICAL_DATA_FAMILY]: `${REPORT_API_URL}/reports/clinical-data`,
  [ReportType.BIOSPECIMEN_DATA]: `${REPORT_API_URL}/reports/biospecimen-data`,
  [ReportType.FILE_MANIFEST]: `${REPORT_API_URL}/reports/file-manifest`,
  [ReportType.FILE_MANIFEST_FAMILY]: `${REPORT_API_URL}/reports/file-manifest`,
  [ReportType.FILE_MANIFEST_STATS]: `${REPORT_API_URL}/reports/file-manifest/stats`,
  [ReportType.FILE_REQUEST_ACCESS]: `${REPORT_API_URL}/reports/file-request-access`,
  [ReportType.FILE_REQUEST_ACCESS_STATS]: `${REPORT_API_URL}/reports/file-request-access/stats`,
};

export const headers = (): AxiosRequestHeaders => ({
  'Content-Type': 'application/json',
  Accept: '*',
  Authorization: `Bearer ${keycloak.token}`,
});

const generateReport = (config: ReportConfig) => {
  const name = config.name;

  let reportSqon;
  if (!config.sqon || isEmpty(config.sqon)) {
    reportSqon = {
      op: BooleanOperators.and,
      content: [],
    };
  } else {
    reportSqon = config.sqon;
  }

  /** the quotes in string are required by format function, else it throws an error */
  const fileName = `'cqdg_${name}'_yyyyMMdd`;
  const fileNameFormatted = format(new Date(), fileName);

  return downloader({
    // @ts-ignore
    url: REPORTS_ROUTES[name],
    method: 'POST',
    responseType: 'blob',
    data: {
      sqon: reportSqon,
      projectId: ARRANGER_PROJECT_ID,
      filename: fileNameFormatted,
      withFamily: config.withFamily,
      withoutFiles: config.withoutFiles,
    },
    headers: headers(),
  });
};

export const ReportApi = {
  generateReport,
};
