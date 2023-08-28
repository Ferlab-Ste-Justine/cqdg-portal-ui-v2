/// <reference types="Cypress" />
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  
  cy.visitFileEntity('FI0188666'); // CQDG-301
  cy.get('[data-cy="SummaryHeader_Participants_Button"]').find('[href]').click({force: true}); // CQDG-301
  cy.get('[data-cy="ProTable_Participants"]').should('exist'); // CQDG-301
  cy.resetColumns(); // CQDG-301
//    cy.visitDataExploration('participants', '?sharedFilterId=6bd9c618-87bb-49a9-a4ea-d793601f944d');
  cy.showColumn('Ethnicity');
  cy.showColumn('Diagnosis (ICD)');
  cy.showColumn('Diagnosis (Source Text)');
  cy.showColumn('External Participant');
  cy.showColumn('Vital Status');
  cy.wait(1000);

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, 1);
});

describe('Page Data Exploration (Participants) - Exporter les participants en TSV', () => {
  it('Valider le nom du fichier [CQDG-311]', () => {
    cy.validateFileName('cqdg-participant-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauParticipants.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauParticipants.json');
  });
});
