/// <reference types="Cypress" />
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  
  cy.visitParticipantEntity('PT1007374'); // CQDG-301
  cy.get('[data-cy="SummaryHeader_Files_Button"]').find('[href]').click({force: true}); // CQDG-301
  cy.get('[data-cy="ProTable_DataFiles"]').should('exist'); // CQDG-301
  cy.resetColumns(); // CQDG-301
//    cy.visitDataExploration('datafiles', '?sharedFilterId=6bd9c618-87bb-49a9-a4ea-d793601f944d');
  cy.showColumn('File Name');
  cy.showColumn('Platform');
  cy.wait(1000);

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, 2);
});

describe('Page Data Exploration (Data Files) - Exporter les fichiers en TSV', () => {
  it('Valider le nom du fichier [CQDG-311]', () => {
    cy.validateFileName('cqdg-file-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauFiles.json');
  });

  it('Valider le contenu du fichier [CQDG-261]', () => {
    cy.validateFileContent('ExportTableauFiles.json');
  });
});
