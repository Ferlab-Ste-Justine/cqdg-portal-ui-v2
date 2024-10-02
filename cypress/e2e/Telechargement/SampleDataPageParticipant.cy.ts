/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitParticipantEntity('PT0000010');
  cy.clickAndIntercept('[id="biospecimen"] button[class*="ant-btn-default"]', 'POST', '**/file-manifest', 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page d\'un participant - Télécharger le sample data', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName(`cqdg_biospecimenData_${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}.xlsx`);
  });

  it('Valider le contenu du fichier [CQDG-889]', () => {
    cy.validateXlsxFileContent('DownloadBiospecimenData.json');
  });
});