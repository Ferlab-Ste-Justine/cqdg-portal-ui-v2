/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExploration('datafiles', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
  cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
  cy.get('[data-cy="RequestAccess_Button"]').click({force: true});
  cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-request-access', 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page Data Exploration (Data Files) - Télécharger le Request Access', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('CQDG-access-request.tar.gz');
  });
});
