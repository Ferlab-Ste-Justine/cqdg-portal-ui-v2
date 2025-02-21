/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage('?sharedFilterId=7159e9d5-abd3-4793-932a-786dc5242d5f');

  cy.get('[data-cy="SidebarMenuItem_Variant"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
});

describe('Page Data Exploration - Requêtes', () => {
  it('Construire une première requête', () => {
    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
    cy.validateTotalSelectedQuery('554K');
    cy.validateTableResultsCount('554K');

    cy.checkValueFacetAndApply('Variant Type', 'SNV');

    cy.validatePillSelectedQuery('Variant Type', ['SNV']);
    cy.validateTotalSelectedQuery('425K');
    cy.validateTableResultsCount('425K');
    cy.validateClearAllButton(false);
  });
});
