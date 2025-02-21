/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudyEntity('T-DEE', 1);
  cy.get('[class*="EntityTitle"] [data-cy="RequestAccess_Button"]').click({force: true});
  cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-request-access', 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page d\'une étude - Télécharger le Request Access', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('CQDG-access-request.tar.gz');
  });
});
