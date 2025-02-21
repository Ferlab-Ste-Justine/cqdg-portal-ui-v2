/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('biospecimens', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
});

describe('Page Data Exploration (Biospecimens) - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[data-cy="Title_DataExploration"]').contains('Data Explorer');
  });

  it('Tableau', () => {
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(1).contains('SR0000214').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(2).contains('SP0000179').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(3).contains('PT0000010').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(4).contains('T-DEE').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(5).contains('DNA').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(5).contains('NCIT:').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(5).contains('C449').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).contains('Blood').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).contains('NCIT:').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).contains('C12434').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(7).contains('-').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(8).contains(/^5$/).should('exist');
  });
});
