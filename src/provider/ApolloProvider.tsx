import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import keycloak from 'auth/keycloak-api/keycloak';
import EnvironmentVariables from 'helpers/EnvVariables';
import { GraphqlProvider } from 'provider/types';

export const ARRANGER_API = EnvironmentVariables.configFor('ARRANGER_API');
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
        Study: { merge: true },
        Participant: { merge: true },
        Biospecimen: { merge: true },
        File: { merge: true },
        Variant: { merge: true },
      },
    }),
    link: header.concat(arrangerLink),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
