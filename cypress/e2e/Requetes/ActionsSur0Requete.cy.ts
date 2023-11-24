/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=23870b3f-b2f5-442d-96cf-d9f1a718d37c');

    cy.get('[data-cy="SidebarMenuItem_Variant"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Construire une première requête', () => {
    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
    cy.validateTotalSelectedQuery('442');
    cy.validateTableResultsCount('442');

    cy.checkValueFacetAndApply('Variant Type', 'SNV');

    cy.validatePillSelectedQuery('Variant Type', ['SNV']);
    cy.validateTotalSelectedQuery('226');
    cy.validateTableResultsCount('226');
    cy.validateClearAllButton(false);
  });
});
