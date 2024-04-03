import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { setContext } from '@apollo/client/link/context';
import keycloak from 'auth/keycloak-api/keycloak';
import EnvironmentVariables from 'helpers/EnvVariables';
import EnvVariables from 'helpers/EnvVariables';
import { GraphqlProvider } from 'provider/types';

// export const ARRANGER_API = EnvironmentVariables.configFor('ARRANGER_API');
export const ARRANGER_API = 'http://localhost:5051';
const PROJECT_ID = EnvironmentVariables.configFor('ARRANGER_PROJECT_ID');
export const ARRANGER_API_DOWNLOAD_URL = `${ARRANGER_API}/${PROJECT_ID}/download`;
export const ARRANGER_API_PROJECT_URL = `${ARRANGER_API}/${PROJECT_ID}/graphql`;
export const ARRANGER_API_COLUMN_STATE_URL = `${ARRANGER_API}/${PROJECT_ID}/graphql/columnsStateQuery`;

const arrangerLink = createHttpLink({
  uri: ARRANGER_API_PROJECT_URL,
});

const getAuthLink = () =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${keycloak.token}`,
    },
  }));

const Provider = ({ children }: GraphqlProvider) => {
  const header = getAuthLink();

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        StudiesType: { merge: true, fields: { id: () => Math.random() } },
        ParticipantsType: { merge: true, fields: { id: () => Math.random() } },
        SamplesType: { merge: true, fields: { id: () => Math.random() } },
        FilesType: { merge: true, fields: { id: () => Math.random() } },
        VariantsType: { merge: true, fields: { id: () => Math.random() } },
        Study: { merge: true, keyFields: ['study_code'] },
        Participant: { merge: true, keyFields: ['participant_id'] },
        Biospecimen: { merge: true, keyFields: ['sample_id'] },
        File: { merge: true, keyFields: ['file_id'] },
        Variant: { merge: true, keyFields: ['locus'] },
      },
    }),
    link: header.concat(arrangerLink),
  });

  if (EnvVariables.configFor('ENV') === 'development') {
    loadDevMessages();
    loadErrorMessages();
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
