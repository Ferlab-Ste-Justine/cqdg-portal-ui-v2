/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=51590cb8-6c31-471c-bb34-129dcb018adc');

    cy.get('[data-cy="SidebarMenuItem_Variant"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Modifier l\'opérateur d\'une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('[class*="QueryBar_selected"]').find('[class*="Combiner_operator"]').click({force: true});
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    };

    cy.validatePillSelectedQuery('Variant Type', ['SNV']);
    cy.validatePillSelectedQuery('Position', ['10000000'], 1);
    cy.validateOperatorSelectedQuery('or');
    cy.validateTotalSelectedQuery('242');
    cy.validateTableResultsCount('242');
    cy.validateClearAllButton(false);

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('[class*="QueryBar_selected"]').find('[class*="Combiner_operator"]').click({force: true});
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    };

    cy.validatePillSelectedQuery('Variant Type', ['SNV']);
    cy.validatePillSelectedQuery('Position', ['10000000'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery('27');
    cy.validateTableResultsCount('27');
    cy.validateClearAllButton(false);
  });

  it('Supprimer une des pilules d\'une requête avec le X', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_selected"]').find('button[class*="QueryPill_close"]').eq(0).click();
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    };

    cy.validatePillSelectedQuery('Position', ['10000000']);
    cy.validateTotalSelectedQuery('43');
    cy.validateTableResultsCount('43');
    cy.validateClearAllButton(false);
  });
});
