/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=1e2eed68-e5c7-4814-abc5-dd151842a4a4');

    cy.get('li[data-key="participants"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Modifier l\'opérateur d\'une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('[class*="QueryBar_selected"]').find('[class*="Combiner_operator"]').click({force: true});
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    };

    cy.validatePillSelectedQuery('Study Code', ['NEURODEV']);
    cy.validatePillSelectedQuery('Age at Recruitment (days)', ['100000'], 1);
    cy.validateOperatorSelectedQuery('or');
    cy.validateTotalSelectedQuery('470');
    cy.validateTableResultsCount('470');
    cy.validateClearAllButton(false);

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('[class*="QueryBar_selected"]').find('[class*="Combiner_operator"]').click({force: true});
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    };

    cy.validatePillSelectedQuery('Study Code', ['NEURODEV']);
    cy.validatePillSelectedQuery('Age at Recruitment (days)', ['100000'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery('128');
    cy.validateTableResultsCount('128');
    cy.validateClearAllButton(false);
  });

  it('Supprimer une des pilules d\'une requête avec le X', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_selected"]').find('button[class*="QueryPill_close"]').eq(0).click();
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    };

    cy.validatePillSelectedQuery('Age at Recruitment (days)', ['100000']);
    cy.validateTotalSelectedQuery('216');
    cy.validateTableResultsCount('216');
    cy.validateClearAllButton(false);
  });
});
