/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExploration('datafiles', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
  cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
  cy.get('[data-cy="FileManifest_Button"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
});

describe('Page Data Exploration (Data Files) - Bouton Manifest', () => {
  it('Vérifier les informations affichées - Tooltip', () => {
    cy.get('div[class="ant-tooltip-inner"]').contains('File manifest for the tool ').should('exist');
    cy.get('div[class="ant-tooltip-inner"]').contains('Ferload').should('exist');
    cy.get('div[class="ant-tooltip-inner"] [class="anticon"]').should('exist');
  });

  it('Valider les liens disponibles - Tooltip', () => {
    cy.get('div[class="ant-tooltip-inner"] [class*="DownloadFileManifestModal_externalLinkFerload"]').should('have.attr', 'href', 'https://docs.cqdg.ca/docs/comment-utiliser-le-client-ferload?ljs=en-CA');
  });
});
