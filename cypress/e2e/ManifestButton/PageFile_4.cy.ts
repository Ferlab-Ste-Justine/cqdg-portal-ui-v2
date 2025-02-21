/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitFileEntity('FI0000572');
  cy.get('[data-cy="FileManifest_Button"]').click({force: true});
  cy.get('[class="ant-modal-body"] input[type="checkbox"]').check({force: true});
  cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-manifest', 1, 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page d\'un fichier - Télécharger le manifest (checkbox)', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('cqdg_familyManifest_'+`${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('DownloadManifestFamily.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('DownloadManifestFamily.json');
  });
});
