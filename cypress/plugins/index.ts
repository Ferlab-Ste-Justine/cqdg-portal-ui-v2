/* eslint-disable no-console */
/// <reference types="Cypress" />

require('dotenv').config();

const { rmdir } = require('fs');

module.exports = (on: Cypress.PluginEvents, config: Cypress.ConfigOptions) => {
  on('task', {
    deleteFolder(folderName) {
      console.log('deleting folder %s', folderName);

      return new Promise((resolve, reject) => {
        rmdir(folderName, { maxRetries: 10, recursive: true }, (err: any) => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          resolve(null);
        });
      });
    },
    log (message: any) {
      console.log(message);
      return null
    },
  });

  if (!config.env) {
    config.env = {};
  }

  config.env.google_Username = process.env.CYPRESS_GOOGLE_USERNAME;
  config.env.google_Password = process.env.CYPRESS_GOOGLE_PASSWORD;

  return config;
};

export {};
