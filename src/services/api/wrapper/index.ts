import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { IParticipantResultTree } from 'graphql/participants/models';
import { MATCH_PARTICIPANTS } from 'graphql/participants/queries';
import EnvironmentVariables from 'helpers/EnvVariables';
import {
  API_COLUMN_STATE_URL,
  API_DOWNLOAD_URL,
  API_PROJECT_URL,
  WRAPPER_API,
} from 'provider/ApolloProvider';

import { sendRequest } from 'services/api';

import {
  ArrangerColumnStateResults,
  ArrangerPhenotypes,
  IStatistics,
  ISuggestionPayload,
  Suggestion,
  SuggestionType,
} from './models';

const WRAPPER_API_URL = EnvironmentVariables.configFor('WRAPPER_API');
const PROJECT_ID = EnvironmentVariables.configFor('PROJECT_ID');

const headers = () => ({
  'Content-Type': 'application/json',
});

const fetchStatistics = () =>
  sendRequest<IStatistics>({
    method: 'GET',
    url: `${WRAPPER_API_URL}/statistics`,
    headers: headers(),
  });

const fetchPhenotypes = <T = any>(data: ArrangerPhenotypes) =>
  sendRequest<T>({
    method: 'POST',
    url: `${WRAPPER_API_URL}/phenotypes`,
    data: { ...data, project: PROJECT_ID },
  });

const graphqlRequest = <T = any>(data: { query: any; variables: any }) =>
  sendRequest<T>({
    method: 'POST',
    url: API_PROJECT_URL,
    data,
  });

const download = <T = any>(data: URLSearchParams) =>
  sendRequest<T>({
    method: 'POST',
    url: API_DOWNLOAD_URL,
    data,
  });

const columnStates = (data: { query: any; variables: any }) =>
  sendRequest<ArrangerColumnStateResults>({
    method: 'POST',
    url: API_COLUMN_STATE_URL,
    data,
  });

const fetchMatchParticipant = (ids: string[]) =>
  sendRequest<{ data: IParticipantResultTree }>({
    method: 'POST',
    url: API_PROJECT_URL,
    data: {
      query: MATCH_PARTICIPANTS.loc?.source.body,
      variables: {
        sqon: generateQuery({
          newFilters: [
            generateValueFilter({
              field: 'participant_id',
              value: ids,
            }),
          ],
        }),
      },
    },
  });

const searchSuggestions = (type: SuggestionType, value: string) =>
  sendRequest<ISuggestionPayload<Suggestion>>({
    method: 'GET',
    url: `${WRAPPER_API}/${type}Feature/suggestions/${value}`,
  });

export const WrapperApi = {
  fetchStatistics,
  graphqlRequest,
  download,
  fetchPhenotypes,
  columnStates,
  fetchMatchParticipant,
  searchSuggestions,
};
