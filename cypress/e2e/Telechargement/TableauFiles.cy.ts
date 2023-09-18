/// <reference types="Cypress" />
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExploration('datafiles', '?sharedFilterId=d9b0e27c-d2d4-4f3e-8a9f-859f6a32faea');
  cy.showColumn('File Name');
  cy.showColumn('Platform');
  cy.wait(1000);

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, 2);
});

describe('Page Data Exploration (Data Files) - Exporter les fichiers en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('cqdg-file-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauFiles.json');
  });

  it('Valider le contenu du fichier [CQDG-261]', () => {
    cy.validateFileContent('ExportTableauFiles.json');
  });
});
