import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { localStorageIntegration } from '@ferlab/ui/core/utils/sentry/localStorageIntegration';
import * as Sentry from '@sentry/react';
import EnvironmentVariables from 'helpers/EnvVariables';

import { initUserSnap } from 'services/initUsersnap';

import App from './App';
import reportWebVitals from './reportWebVitals';

import '@ferlab/ui/themes/default/theme.template.css';
import 'style/themes/cqdg/dist/antd.css';
import 'style/themes/cqdg/dist/colors.css';
import 'style/themes/cqdg/main.css';
import './index.css';

initUserSnap();

const reactAppWebRoot = EnvironmentVariables.configFor('CQDG_WEB_APP');
const SentryDSN = EnvironmentVariables.configFor('SENTRY_API');

Sentry.init({
  dsn: SentryDSN,
  integrations: [
    Sentry.browserTracingIntegration({
      tracePropagationTargets: ['localhost', reactAppWebRoot],
    }),
    Sentry.contextLinesIntegration(),
    Sentry.browserProfilingIntegration(),
    localStorageIntegration('LocalStorage'),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
