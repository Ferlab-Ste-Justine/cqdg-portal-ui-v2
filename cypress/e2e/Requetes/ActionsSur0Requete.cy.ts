/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=fbfdb5e3-231b-47f1-9021-1b3af84425ff');

    cy.get('li[data-key="category_variant"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Construire une première requête', () => {
    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
    cy.validateTotalSelectedQuery('442');
    cy.validateTableResultsCount('442');

    cy.checkValueFacetAndApply(0, 'SNV');

    cy.validatePillSelectedQuery('Variant Type', ['SNV']);
    cy.validateTotalSelectedQuery('226');
    cy.validateTableResultsCount('226');
    cy.validateClearAllButton(false);
  });
});
