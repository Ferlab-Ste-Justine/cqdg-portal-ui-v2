import { defineConfig } from 'cypress';

const date = new Date();
const joinWithPadding = (l: number[]) => l.reduce((xs, x) => xs + `${x}`.padStart(2, '0'), '');
const strDate = joinWithPadding([
  date.getFullYear(),
  date.getMonth() + 1,
  date.getDate()
]);
const strTime = joinWithPadding([
  date.getHours(),
  date.getMinutes()
]);

export default defineConfig({
  projectId: '765dip',
  chromeWebSecurity: true,
  video: false,
  videoUploadOnPasses: false,
  screenshotOnRunFailure: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config);
    },
    baseUrl: 'https://portalv2.qa.cqdg.ferlab.bio/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    slowTestThreshold: 60000,
    experimentalSessionAndOrigin: true
  },
  retries: {
    "runMode": 2,
    "openMode": 0
  },
  reporter: 'junit',
  reporterOptions: {
     "mochaFile": 'cypress/results/'+strDate+'_'+strTime+'-[hash].xml',
     rootSuiteTitle: 'Tests Cypress'
  }
});