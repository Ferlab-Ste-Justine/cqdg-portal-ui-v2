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
});

describe('Page Data Exploration (Data Files) - Bouton Request Access', () => {
  it('Vérifier les informations affichées - Modal', () => {
    cy.get('[class="ant-modal-title"]').contains('Request access').should('exist');
    cy.get('[class="ant-modal-body"]').contains('Download an archive containing documents to guide you through your access requests. You will find terms of use and the Access Authority contact information for each study, as well as a list of files included in each study\'s access request.').should('exist');
    cy.get('[class="ant-modal-body"]').contains('For more information, consult the README_EN file in the archive or this documentation page:').should('exist');
    cy.get('[class="ant-modal-body"]').contains('Data Access Request').should('exist');
    cy.get('[class="ant-modal-body"]').contains('Include the files of the same type for related family members in this selection.').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] thead th').eq(0).contains('Study').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] thead th').eq(1).contains('Study Code').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] thead th').eq(2).contains('Files').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] [data-row-key="T-DEE"] td').eq(0).contains('Developmental and epileptic encephalopathies').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] [data-row-key="T-DEE"] td').eq(1).contains('T-DEE').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] [data-row-key="T-DEE"] td').eq(2).contains(/^1$/).should('exist');

    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').contains('Cancel').should('exist');
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').contains('Download').should('exist');
  });

  it('Valider les liens disponibles - Lien Documentation', () => {
    cy.get('[class="ant-modal-body"] a').should('have.attr', 'href', 'https://docs.cqdg.ca/docs/faire-une-demande-daccès-aux-données-du-cqdg?ljs=en-CA');
  });

  it('Valider les fonctionnalités - Bouton Cancel', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').click({force: true});
    cy.get('[class*="DownloadRequestAccessModal_modal"]').should('have.css', 'display', 'none');
    cy.wait(5000);
    cy.task('fileExists', `${Cypress.config('downloadsFolder')}`).then((exists) => {
      assert.isTrue(!exists);
    });
  });

  it('Valider les fonctionnalités - Bouton Download', () => {
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-request-access', 1);
    cy.get('[class*="DownloadRequestAccessModal_modal"]').should('have.css', 'display', 'none');
    cy.waitUntilFile(oneMinute);
    cy.validateFileName('*.gz');
  });
});
