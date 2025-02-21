/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('participants');
  cy.showColumn('Ethnicity');
  cy.showColumn('Vital Status');
});

describe('Page Data Exploration (Participants) - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('STUDY1', 2, true);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('T-DEE', 2, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Sex', () => {
    cy.sortTableAndIntercept('Sex', 1);
    cy.validateTableFirstRow('Female', 3, true);
    cy.sortTableAndIntercept('Sex', 1);
    cy.validateTableFirstRow('Male', 3, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Family Position', () => {
    cy.sortTableAndIntercept('Family Position', 1);
    cy.validateTableFirstRow('Brother', 6, true);
    cy.sortTableAndIntercept('Family Position', 1);
    cy.validateTableFirstRow('Proband', 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Family Type', () => {
    cy.sortTableAndIntercept('Family Type', 1);
    cy.validateTableFirstRow('Case-parent trio', 7, true);
    cy.sortTableAndIntercept('Family Type', 1);
    cy.validateTableFirstRow('Other', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Age', () => {
    cy.sortTableAndIntercept('Age', 1);
    cy.validateTableFirstRow('Congenital', 8, true);
    cy.sortTableAndIntercept('Age', 1);
    cy.validateTableFirstRow('Senior', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Ethnicity', () => {
    cy.sortTableAndIntercept('Ethnicity', 1);
    cy.validateTableFirstRow('-', 11, true);
    cy.sortTableAndIntercept('Ethnicity', 1);
    cy.validateTableFirstRow('-', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Vital Status', () => {
    cy.sortTableAndIntercept('Vital Status', 1);
    cy.validateTableFirstRow('Alive', 12, true);
    cy.sortTableAndIntercept('Vital Status', 1);
    cy.validateTableFirstRow('Unknown', 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Vital Status', 1);
    cy.sortTableAndIntercept('Vital Status', 1);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('STUDY1', 2, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('20').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Previous').clickAndWait({force: true});
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
