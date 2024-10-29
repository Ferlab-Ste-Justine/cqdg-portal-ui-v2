/// <reference types="cypress"/>
import { getDateTime } from '../../support/utils';
import { oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudiesPage();
  cy.showColumn('Population');
  cy.showColumn('Access Limitation');
  cy.showColumn('Access Requirement');
  cy.showColumn('Overall Design');
  cy.showColumn('Data Collection Method');
  cy.showColumn('Principal Investigators');
  cy.showColumn('Contact Persons');
  cy.showColumn('Affiliated Institutions');
  cy.showColumn('Inclusion and Exclusion Criteria');
  cy.showColumn('Description');
  cy.wait(1000);

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page des études - Exporter les études en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('cqdg-study-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauStudies.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauStudies.json');
  });
});
