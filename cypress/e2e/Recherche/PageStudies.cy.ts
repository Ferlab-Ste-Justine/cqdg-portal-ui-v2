/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudiesPage();
});

describe('Page des études - Rechercher des études', () => {
  it('Par study code', () => {
    cy.typeAndIntercept('[class*="PageContent_search"]', 'study1', 'POST', '**/graphql', 6);
    cy.validateTableResultsCount(/1 Result/);
    cy.validateTableFirstRow('STUDY1', 0);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').clickAndWait({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });

  it('Par study name', () => {
    cy.typeAndIntercept('[class*="PageContent_search"]', 'congenital', 'POST', '**/graphql', 10);
    cy.validateTableResultsCount(/1 Result/);
    cy.validateTableFirstRow('STUDY1', 0);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').clickAndWait({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });

  it('Par domaine', () => {
    cy.typeAndIntercept('[class*="PageContent_search"]', 'diseases', 'POST', '**/graphql', 8);
    cy.validateTableResultsCount(/1 Result/);
    cy.validateTableFirstRow('STUDY1', 0);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').clickAndWait({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });

  it('Par chercheur principal', () => {
    cy.typeAndIntercept('[class*="PageContent_search"]', 'batman', 'POST', '**/graphql', 6);
    cy.validateTableResultsCount(/1 Result/);
    cy.validateTableFirstRow('STUDY1', 0);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').clickAndWait({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });

  it('Par mot-clé', () => {
    cy.typeAndIntercept('[class*="PageContent_search"]', 'FAMILY', 'POST', '**/graphql', 6);
    cy.validateTableResultsCount(/\d{1} Results/);
    cy.validateTableFirstRow('STUDY2', 0);

    cy.get('button[class*="Header_clearFilterLink"]').should('contain', 'Clear filters').clickAndWait({force: true});
    cy.validateTableResultsCount(/\d{1} Results/);
  });
});
