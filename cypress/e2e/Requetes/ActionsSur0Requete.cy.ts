/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=4507bcae-2cba-4840-b659-931b95abd1de');

    cy.get('li[data-key="participants"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Construire une première requête', () => {
    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
    cy.validateTotalSelectedQuery('1,229');
    cy.validateTableResultsCount('1,229');

    cy.checkValueFacetAndApply(0, 'NEURODEV');

    cy.validatePillSelectedQuery('Study Code', ['NEURODEV']);
    cy.validateTotalSelectedQuery('382');
    cy.validateTableResultsCount('382');
    cy.validateClearAllButton(false);
  });
});
