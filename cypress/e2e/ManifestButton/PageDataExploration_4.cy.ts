/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExploration('datafiles', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
  cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
  cy.get('[data-cy="FileManifest_Button"]').click({force: true});
});

describe('Page Data Exploration (Data Files) - Bouton Manifest', () => {
  it('Vérifier les informations affichées - Modal', () => {
    cy.get('[class="ant-modal-title"]').contains('File manifest').should('exist');
    cy.get('[class="ant-modal-body"]').contains('Download a manifest of the selected files which can be used with CQDG\'s bulk download tool. This manifest also includes additional information, including the participants and samples associated with these files.').should('exist');
    cy.get('[class="ant-modal-body"]').contains('Include data files of the same type for the participants\' related family members for this selection.').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] thead th').eq(0).contains('Data Type').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] thead th').eq(1).contains('Participants').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] thead th').eq(2).contains('Files').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] thead th').eq(3).contains('Size').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Supplement"] td').eq(0).contains('Supplement').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Supplement"] td').eq(1).contains(/^1$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Supplement"] td').eq(2).contains(/^1$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Supplement"] td').eq(3).contains(/^0 B$/).should('exist');

    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').eq(0).find('[class*="anticon-copy"]').should('exist');
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').eq(0).contains('Copy manifest ID').should('exist');
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').eq(1).find('[class*="anticon-download"]').should('exist');
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').eq(1).contains('Download').should('exist');
  });

  it('Valider les fonctionnalités - Bouton Cancel', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').click({force: true});
    cy.get('[class*="DownloadFileManifestModal_modal"]').should('not.exist');
    cy.task('fileExists', `${Cypress.config('downloadsFolder')}`).then((exists) => {
      assert.isTrue(!exists);
    });
  });

  it('Valider les fonctionnalités - Bouton Copy manifest ID', () => {
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/sets', 1, 0);
    cy.get('[class="ant-message"]').contains('ID copied to clipboard').should('exist');
    cy.get('[class="ant-message"]').contains('error').should('not.exist');
  });

  it('Vérifier les informations affichées - Tooltip du bouton Copy manifest ID', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"] [class*="anticon-copy"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"]').contains('Copy the manifest ID for use in ').should('exist');
    cy.get('div[class="ant-tooltip-inner"]').contains('Ferload').should('exist');
    cy.get('div[class="ant-tooltip-inner"] [class="anticon"]').should('exist');
  });

  it('Valider les liens disponibles - Tooltip du bouton Copy manifest ID', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"] [class*="anticon-copy"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"] [class*="DownloadFileManifestModal_externalLinkFerload"]').should('have.attr', 'href', 'https://docs.cqdg.ca/docs/comment-utiliser-le-client-ferload?ljs=en-CA');
  });

  it('Valider les fonctionnalités - Bouton Download', () => {
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-manifest', 1, 1);
    cy.get('[class*="DownloadFileManifestModal_modal"]').should('not.exist');
    cy.waitUntilFile(oneMinute);
    cy.validateFileName('*.tsv');
  });
});
