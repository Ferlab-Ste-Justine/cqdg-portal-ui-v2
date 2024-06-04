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

export const WRAPPER_API = EnvironmentVariables.configFor('WRAPPER_API');
export const API_DOWNLOAD_URL = `${WRAPPER_API}/download`;
export const API_PROJECT_URL = `${WRAPPER_API}/graphql`;
export const API_COLUMN_STATE_URL = `${WRAPPER_API}/graphql/columnsStateQuery`;

const wrapperLink = createHttpLink({
  uri: API_PROJECT_URL,
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
    link: header.concat(wrapperLink),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
