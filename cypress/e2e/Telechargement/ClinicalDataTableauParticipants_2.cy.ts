/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExploration('participants', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
  cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
  cy.get('[class*="Header_ProTableHeader"] button[class*="ant-dropdown-trigger"]').eq(1).click({force: true});
  cy.clickAndIntercept('[data-menu-id*="-familyClinicalData"]', 'POST', '**/file-manifest', 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page Data Exploration (Participants) - Télécharger le clinical data (family)', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName(`cqdg_familyClinicalData_${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}.xlsx`);
  });

  it('Valider le contenu du fichier [CQDG-889]', () => {
    cy.validateXlsxFileContent('DownloadClinicalDataFamily.json');
  });
});
