/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudyEntity('STUDY1', 1);
  cy.get('[class*="EntityTitle"] [data-cy="FileManifest_Button"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
});

describe('Page d\'une étude - Bouton Manifest', () => {
  it('Vérifier les informations affichées - Tooltip', () => {
    cy.get('div[class="ant-tooltip-inner"]').contains('File manifest for the tool ').should('exist');
    cy.get('div[class="ant-tooltip-inner"]').contains('Ferload').should('exist');
    cy.get('div[class="ant-tooltip-inner"] [class="anticon"]').should('exist');
  });

  it('Valider les liens disponibles - Tooltip', () => {
    cy.get('div[class="ant-tooltip-inner"] [class*="DownloadFileManifestModal_externalLinkFerload"]').should('have.attr', 'href', 'https://docs.cqdg.ca/docs/comment-utiliser-le-client-ferload?ljs=en-CA');
  });
});
