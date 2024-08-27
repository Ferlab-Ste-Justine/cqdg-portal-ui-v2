/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=5b4acf3a-54b3-4997-807e-d864e96f0aad');

    cy.get('[data-cy="SidebarMenuItem_Variant"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Modifier l\'opérateur d\'une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('[class*="QueryBar_selected"]').find('[class*="Combiner_operator"]').clickAndWait({force: true});
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql1');
    };

    cy.validatePillSelectedQuery('Variant Type', ['SNV']);
    cy.validatePillSelectedQuery('Position', ['10000000'], 1);
    cy.validateOperatorSelectedQuery('or');
    cy.validateTotalSelectedQuery('431K');
    cy.validateTableResultsCount('431K');
    cy.validateClearAllButton(false);

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('[class*="QueryBar_selected"]').find('[class*="Combiner_operator"]').clickAndWait({force: true});
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql2');
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
    cy.get('[class*="QueryBar_selected"]').find('button[class*="QueryPill_close"]').eq(0).clickAndWait();
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql');
    };

    cy.validatePillSelectedQuery('Position', ['10000000']);
    cy.validateTotalSelectedQuery('26.4K');
    cy.validateTableResultsCount('26.4K');
    cy.validateClearAllButton(false);
  });
});
