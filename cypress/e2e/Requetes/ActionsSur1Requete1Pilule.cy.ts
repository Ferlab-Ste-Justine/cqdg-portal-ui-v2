/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=ef7ef916-6ab4-469e-a42c-52669e583d34');

    cy.get('[data-cy="SidebarMenuItem_Variant"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Éditer une pilule via la facette', () => {
    cy.checkValueFacetAndApply('Variant Type', 'deletion');

    cy.validatePillSelectedQuery('Variant Type', ['SNV','Deletion']);
    cy.validateTotalSelectedQuery('488K');
    cy.validateTableResultsCount('488K');
    cy.validateClearAllButton(false);
  });

  it('Éditer une pilule via son popup', () => {
    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('SNV').click({force:true});
    cy.get('[class*="filtersDropdown"] input[id="input-deletion"]').check({force: true});
    cy.clickAndIntercept('[class*="filtersDropdown"] [data-cy="Apply_Variant Type"]', 'POST', '**/graphql', 1);

    cy.validatePillSelectedQuery('Variant Type', ['SNV','Deletion']);
    cy.validateTotalSelectedQuery('488K');
    cy.validateTableResultsCount('488K');
    cy.validateClearAllButton(false);
  });

  it('Ajouter une pilule à une requête', () => {
    cy.checkValueFacetAndApply('Consequence', 'intron');

    cy.validatePillSelectedQuery('Variant Type', ['SNV']);
    cy.validatePillSelectedQuery('Consequence', ['Intron'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery('249K');
    cy.validateTableResultsCount('249K');
    cy.validateClearAllButton(false);
  });

  it('Construire une deuxième requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('button[class*="QueryTools_button"]').contains('New query').click({force:true});
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    };

    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
    cy.validateTotalSelectedQuery('554K');
    cy.validateTableResultsCount('554K');
    cy.validateClearAllButton(false);

    cy.checkValueFacetAndApply('Consequence', 'intron');

    cy.validatePillSelectedQuery('Consequence', ['Intron']);
    cy.validateTotalSelectedQuery('325K');
    cy.validateTableResultsCount('325K');
    cy.validateClearAllButton(true);
  });

  it('Dupliquer une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_selected"]').find('[data-icon="copy"]').click({force: true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validatePillSelectedQuery('Variant Type', ['SNV']);
    cy.validateTotalSelectedQuery('425K');
    cy.validateTableResultsCount('425K');
    cy.validateClearAllButton(true);
  });
});
