/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExploration('biospecimens', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
  cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
  cy.clickAndIntercept('[class*="Header_ProTableHeader"] button[class*="ant-btn-default"]', 'POST', '**/file-manifest', 1, 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page Data Exploration (Biospecimens) - Télécharger le sample data', () => {
  it('Valider le nom du fichier [CQDG-861]', () => {
    cy.validateFileName(`cqdg_biospecimenData_${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}T*.xlsx`);
  });

  it('Valider le contenu du fichier [CQDG-861]', () => {
    cy.validateXlsxFileContent('DownloadbiospecimenData.json');
  });
});