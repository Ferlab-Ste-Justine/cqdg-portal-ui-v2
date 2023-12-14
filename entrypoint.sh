#!/bin/sh

# Generate a unique filename for config.js based on the current timestamp
UNIQUE_CONFIG_FILENAME="config-$(date +%s).js"

# Generate config.js with a unique filename
cat <<EOF > "/usr/share/nginx/html/static/js/$UNIQUE_CONFIG_FILENAME"
window._env_ = {
  REACT_APP_ARRANGER_API_URL: "$REACT_APP_ARRANGER_API_URL",
  REACT_APP_ARRANGER_PROJECT_ID: "$REACT_APP_ARRANGER_PROJECT_ID",
  REACT_APP_KC_AUTH_SERVER_URL: "$REACT_APP_KC_AUTH_SERVER_URL",
  REACT_APP_KC_CLIENT_ID: "$REACT_APP_KC_CLIENT_ID",
  REACT_APP_KC_REALM: "$REACT_APP_KC_REALM",
  SASS_PATH: "$SASS_PATH",
  REACT_APP_USERS_API_URL: "$REACT_APP_USERS_API_URL",
  REACT_APP_CQDG_WEB_APP: "$REACT_APP_CQDG_WEB_APP",
  REACT_APP_CQDG_WEB_SITE: "$REACT_APP_CQDG_WEB_SITE",
  REACT_APP_CQDG_DOCUMENTATION: "$REACT_APP_CQDG_DOCUMENTATION",
  REACT_APP_USER_SNAP_API_KEY: "$REACT_APP_USER_SNAP_API_KEY",
  REACT_APP_REPORTS_API_URL: "$REACT_APP_REPORTS_API_URL"
};
EOF

# Dynamically update the index.html to reference the new unique config.js filename
sed -i "s|config.js|$UNIQUE_CONFIG_FILENAME|" /usr/share/nginx/html/index.html

# Start Nginx
nginx -g "daemon off;"
