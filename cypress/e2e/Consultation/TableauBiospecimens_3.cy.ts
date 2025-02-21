/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('biospecimens');
});

describe('Page Data Exploration (Biospecimens) - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    cy.sortTableAndWait('Study');
    cy.validateTableFirstRow('STUDY1', 4, true);
    cy.sortTableAndWait('Study');
    cy.validateTableFirstRow('T-DEE', 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Sample Type', () => {
    cy.sortTableAndWait('Sample Type');
    cy.validateTableFirstRow('C449', 5, true);
    cy.sortTableAndWait('Sample Type');
    cy.validateTableFirstRow('C449', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Tissue', () => {
    cy.sortTableAndWait('Tissue');
    cy.validateTableFirstRow('C12434', 6, true);
    cy.sortTableAndWait('Tissue');
    cy.validateTableFirstRow('Unknown', 6, true);
    cy.sortTableAndWait('Tissue');
  });

  it('Valider les fonctionnalités du tableau - Tri Age', () => {
    cy.sortTableAndIntercept('Age', 1);
    cy.validateTableFirstRow('Congenital', 7, true);
    cy.sortTableAndIntercept('Age', 1);
    cy.validateTableFirstRow('Young Adult', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Sample Type', 1);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('STUDY1', 4, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('20').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql1');
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql2');
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql3');
    cy.get('button[type="button"]').contains('Previous').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql3');
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('First').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
