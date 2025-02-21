/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
  cy.login();
  cy.visitFileEntity('FI0000981');
  cy.resetColumns('biospecimens');
  cy.get('div[id="content"] svg[data-icon="download"]').eq(1).clickAndWait({force: true});
  cy.waitUntilFile(oneMinute);
});

describe('Page d\'un fichier - Exporter le tableau Participants-Samples en TSV', () => {  
  it('Valider le nom du fichier', () => {
    cy.validateFileName('cqdg-participants-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauParticipantsPageFile.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauParticipantsPageFile.json');
  });
});
