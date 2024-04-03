/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=51590cb8-6c31-471c-bb34-129dcb018adc');

    cy.get('[data-cy="SidebarMenuItem_Variant"]').click({force: true});
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
    cy.validateTotalSelectedQuery('431K');
    cy.validateTableResultsCount('431K');
    cy.validateClearAllButton(false);

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('[class*="QueryBar_selected"]').find('[class*="Combiner_operator"]').click({force: true});
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    };

    cy.validatePillSelectedQuery('Variant Type', ['SNV']);
    cy.validatePillSelectedQuery('Position', ['10000000'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery('20.7K');
    cy.validateTableResultsCount('20.7K');
    cy.validateClearAllButton(false);
  });

  it('Supprimer une des pilules d\'une requête avec le X', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_selected"]').find('button[class*="QueryPill_close"]').eq(0).click();
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    };

    cy.validatePillSelectedQuery('Position', ['10000000']);
    cy.validateTotalSelectedQuery('26.4K');
    cy.validateTableResultsCount('26.4K');
    cy.validateClearAllButton(false);
  });
});
