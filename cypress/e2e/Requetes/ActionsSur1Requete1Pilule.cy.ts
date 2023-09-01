/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=648a3525-d026-40cf-ab80-8c799c425669');

    cy.get('li[data-key="participants"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Éditer une pilule via la facette', () => {
    cy.checkValueFacetAndApply(0, 'RAPIDOMICS');

    cy.validatePillSelectedQuery('Study Code', ['NEURODEV','RAPIDOMICS']);
    cy.validateTotalSelectedQuery('639');
    cy.validateTableResultsCount('639');
    cy.validateClearAllButton(false);
  });

  it('Éditer une pilule via son popup', () => {
    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('NEURODEV').click({force:true});
    cy.get('input[id="input-RAPIDOMICS"]').check({force: true});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('span[data-key="apply"]', {timeout: 20*1000}).click({force: true, multiple:true});
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    };

    cy.validatePillSelectedQuery('Study Code', ['NEURODEV','RAPIDOMICS']);
    cy.validateTotalSelectedQuery('639');
    cy.validateTableResultsCount('639');
    cy.validateClearAllButton(false);
  });

  it('Ajouter une pilule à une requête', () => {
    cy.checkValueFacetAndApply(2, 'Female');

    cy.validatePillSelectedQuery('Study Code', ['NEURODEV']);
    cy.validatePillSelectedQuery('Gender', ['Female'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery('184');
    cy.validateTableResultsCount('184');
    cy.validateClearAllButton(false);
  });

  it('Construire une deuxième requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('button[class*="QueryTools_button"]').contains('New query').click({force:true});
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql', {timeout: 20*1000});
    };

    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
    cy.validateTotalSelectedQuery('1,119');
    cy.validateTableResultsCount('1,119');
    cy.validateClearAllButton(false);

    cy.checkValueFacetAndApply(2, 'Female');

    cy.validatePillSelectedQuery('Gender', ['Female']);
    cy.validateTotalSelectedQuery('527');
    cy.validateTableResultsCount('527');
    cy.validateClearAllButton(true);
  });

  it('Dupliquer une requête', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_selected"]').find('[data-icon="copy"]').click({force: true});
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validatePillSelectedQuery('Study Code', ['NEURODEV']);
    cy.validateTotalSelectedQuery('382');
    cy.validateTableResultsCount('382');
    cy.validateClearAllButton(true);
  });
});
