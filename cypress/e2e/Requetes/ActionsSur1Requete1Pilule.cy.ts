/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=ef7ef916-6ab4-469e-a42c-52669e583d34');

    cy.get('li[data-key="category_variant"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Éditer une pilule via la facette', () => {
    cy.checkValueFacetAndApply(0, 'Deletion');

    cy.validatePillSelectedQuery('Variant Type', ['SNV','Deletion']);
    cy.validateTotalSelectedQuery('274');
    cy.validateTableResultsCount('274');
    cy.validateClearAllButton(false);
  });

  it('Éditer une pilule via son popup', () => {
    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('SNV').click({force:true});
    cy.get('input[id="input-deletion"]').check({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('span[data-key="apply"]', {timeout: 20*1000}).click({force: true, multiple:true});
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    };

    cy.validatePillSelectedQuery('Variant Type', ['SNV','Deletion']);
    cy.validateTotalSelectedQuery('274');
    cy.validateTableResultsCount('274');
    cy.validateClearAllButton(false);
  });

  it('Ajouter une pilule à une requête', () => {
    cy.checkValueFacetAndApply(1, 'Intron');

    cy.validatePillSelectedQuery('Variant Type', ['SNV']);
    cy.validatePillSelectedQuery('Consequence', ['Intron'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery('155');
    cy.validateTableResultsCount('155');
    cy.validateClearAllButton(false);
  });

  it('Construire une deuxième requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('button[class*="QueryTools_button"]').contains('New query').click({force:true});
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    };

    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
    cy.validateTotalSelectedQuery('442');
    cy.validateTableResultsCount('442');
    cy.validateClearAllButton(false);

    cy.checkValueFacetAndApply(1, 'Intron');

    cy.validatePillSelectedQuery('Consequence', ['Intron']);
    cy.validateTotalSelectedQuery('270');
    cy.validateTableResultsCount('270');
    cy.validateClearAllButton(true);
  });

  it('Dupliquer une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_selected"]').find('[data-icon="copy"]').click({force: true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validatePillSelectedQuery('Variant Type', ['SNV']);
    cy.validateTotalSelectedQuery('226');
    cy.validateTableResultsCount('226');
    cy.validateClearAllButton(true);
  });
});
