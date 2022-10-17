export default class EnvironmentVariables {
  static vars: Record<string, string | undefined> = {
    // GENERAL
    ENV: process.env.NODE_ENV,
    CQDG_WEB_APP: process.env.REACT_APP_CQDG_WEB_APP,
    CQDG_WEB_SITE: process.env.REACT_APP_CQDG_WEB_SITE,
    CQDG_DOCUMENTATION: process.env.REACT_APP_CQDG_DOCUMENTATION,
    REDUX_LOG: process.env.REACT_APP_REDUX_LOG,
    // APIS
    ARRANGER_API: process.env.REACT_APP_ARRANGER_API_URL,
    ARRANGER_PROJECT_ID: process.env.REACT_APP_ARRANGER_PROJECT_ID,
    USERS_API: process.env.REACT_APP_USERS_API_URL,
    // FENCES
    KEY_MANAGER_API_URL: process.env.REACT_APP_KEY_MANAGER_API_URL,
    FENCE_API_URL: process.env.REACT_APP_FENCE_API_URL,
    // KEYCLOAK
    KC_AUTH_SERVER_URL: process.env.REACT_APP_KC_AUTH_SERVER_URL,
    KC_CLIENT_ID: process.env.REACT_APP_KC_CLIENT_ID,
    KC_REALM: process.env.REACT_APP_KC_REALM,
    // USERSNAP
    USER_SNAP_API_KEY: process.env.REACT_APP_USER_SNAP_API_KEY,
    //REPORT
    REPORTS_API_URL: process.env.REACT_APP_REPORTS_API_URL,
  };

  static configFor(key: string): string {
    return EnvironmentVariables.vars[key] || '';
  }
}

export const getEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (process.env[`REACT_APP_${key}`] as any) || defaultValue;

export const getFTEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (process.env[`REACT_APP_FT_${key}`] as any) || defaultValue;
