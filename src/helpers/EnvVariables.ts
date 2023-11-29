export default class EnvironmentVariables {
  static vars: Record<string, string | undefined> = {
    // GENERAL

    ENV: window._env_?.NODE_ENV || process.env.NODE_ENV,
    CQDG_WEB_APP: window._env_?.REACT_APP_CQDG_WEB_APP || process.env.REACT_APP_CQDG_WEB_APP,
    CQDG_WEB_SITE: window._env_?.REACT_APP_CQDG_WEB_SITE || process.env.REACT_APP_CQDG_WEB_SITE,
    CQDG_DOCUMENTATION:
      window._env_?.REACT_APP_CQDG_DOCUMENTATION || process.env.REACT_APP_CQDG_DOCUMENTATION,
    REDUX_LOG: window._env_?.REACT_APP_REDUX_LOG || process.env.REACT_APP_REDUX_LOG,
    IS_BETA: window._env_?.REACT_APP_IS_BETA || process.env.REACT_APP_IS_BETA,
    // APIS
    ARRANGER_API:
      window._env_?.REACT_APP_ARRANGER_API_URL || process.env.REACT_APP_ARRANGER_API_URL,
    ARRANGER_PROJECT_ID:
      window._env_?.REACT_APP_ARRANGER_PROJECT_ID || process.env.REACT_APP_ARRANGER_PROJECT_ID,
    USERS_API: window._env_?.REACT_APP_USERS_API_URL || process.env.REACT_APP_USERS_API_URL,
    // FENCES
    KEY_MANAGER_API_URL:
      window._env_?.REACT_APP_KEY_MANAGER_API_URL || process.env.REACT_APP_KEY_MANAGER_API_URL,
    FENCE_API_URL: window._env_?.REACT_APP_FENCE_API_URL || process.env.REACT_APP_FENCE_API_URL,
    // KEYCLOAK
    KC_AUTH_SERVER_URL:
      window._env_?.REACT_APP_KC_AUTH_SERVER_URL || process.env.REACT_APP_KC_AUTH_SERVER_URL,
    KC_CLIENT_ID: window._env_?.REACT_APP_KC_CLIENT_ID || process.env.REACT_APP_KC_CLIENT_ID,
    KC_REALM: window._env_?.REACT_APP_KC_REALM || process.env.REACT_APP_KC_REALM,
    // USERSNAP
    USER_SNAP_API_KEY:
      window._env_?.REACT_APP_USER_SNAP_API_KEY || process.env.REACT_APP_USER_SNAP_API_KEY,
    //REPORT
    REPORTS_API_URL:
      window._env_?.REACT_APP_REPORTS_API_URL || process.env.REACT_APP_REPORTS_API_URL,
  };

  static configFor(key: string): string {
    return EnvironmentVariables.vars[key] || '';
  }
}

export const getEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (window._env_?.[`REACT_APP_${key}`] as any) ||
  (process.env[`REACT_APP_${key}`] as any) ||
  defaultValue;

export const getFTEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (window._env_?.[`REACT_APP_FT_${key}`] as any) ||
  (process.env[`REACT_APP_FT_${key}`] as any) ||
  defaultValue;