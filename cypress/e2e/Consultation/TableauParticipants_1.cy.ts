/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('participants', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
  cy.showColumn('Ethnicity');
  cy.showColumn('Diagnosis (ICD)');
  cy.showColumn('Diagnosis (Source Text)');
  cy.showColumn('External Participant');
  cy.showColumn('Vital Status');
});

describe('Page Data Exploration (Participants) - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[data-cy="Title_DataExploration"]').contains('Data Explorer');
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(1).contains('PT0000010').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(2).contains('T-DEE').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(3).contains('Male').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(4).contains('epilepsy').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(4).contains('MONDO:').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(4).contains('0005027').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(5).contains('Seizure').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(5).contains('HP:').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(5).contains('0001250').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(6).contains('Proband').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(7).contains('Case-parent trio').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(8).contains('-').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(9).contains(/^5$/).should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(10).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(11).contains('-').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(12).contains('Generalized idiopathic epilepsy and epileptic syndromes, intractable').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(12).contains('G40.31').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(13).contains('Intractable Epilepsy').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(14).contains('HSJ-1005-389').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(15).contains('Unknown').should('exist');
  });
});
