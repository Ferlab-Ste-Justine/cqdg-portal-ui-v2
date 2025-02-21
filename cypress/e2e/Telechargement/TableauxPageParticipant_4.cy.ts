/// <reference types="cypress"/>
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
  cy.login();
  cy.visitParticipantEntity('PT0000010');
  cy.resetColumns('biospecimen');
  cy.get('div[id="content"] svg[data-icon="download"]').eq(5).clickAndWait({force: true});
  cy.waitUntilFile(oneMinute);
});

describe('Page d\'un participant - Exporter le tableau Biospecimens en TSV', () => {  
  it('Valider le nom du fichier', () => {
    cy.validateFileName('cqdg-biospecimens-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauBiospecimensPageParticipant.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauBiospecimensPageParticipant.json');
  });
});
