import { defineConfig } from 'cypress';
import { getDateTime } from './cypress/support/utils';

const { strDate, strTime } = getDateTime();

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