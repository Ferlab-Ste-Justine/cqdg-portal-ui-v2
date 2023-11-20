/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration - Requêtes', () => {

  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=TODO');
  });

  it('Validation Facette numérique ou No Data', () => {
    cy.validateTotalSelectedQuery('1,143');
    cy.validateTableResultsCount('1,143');
  });

  it('Validation Facette numérique OU Facette standard', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('455');
    cy.validateTableResultsCount('455');
  });

  it('Validation Facette numérique ou No Data ET Facette standard', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(2).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('307');
    cy.validateTableResultsCount('307');
  });

  it('Validation Facette standard (Any of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(3).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('639');
    cy.validateTableResultsCount('639');
  });

  it('Validation Facette standard (All of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(4).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('0');
    cy.validateTableResultsCount('No Result');
  });

  it('Validation Facette standard (None of)', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(5).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('594');
    cy.validateTableResultsCount('594');
  });

  it('Validation Facette standard (None of) ET Facette numérique', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(6).click();
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});

    cy.validateTotalSelectedQuery('53');
    cy.validateTableResultsCount('53');
  });
});
