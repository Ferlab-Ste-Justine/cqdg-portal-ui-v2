/// <reference types="cypress"/>
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExploration('biospecimens', '?sharedFilterId=a80b4939-38c4-415e-9189-27f79ab37cb5');

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, 1);
  cy.wait(10 * 1000);
});

describe('Page Data Exploration (Biospecimens) - Exporter les biospecimens en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('cqdg-biospecimen-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauBiospecimens.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauBiospecimens.json');
  });
});
