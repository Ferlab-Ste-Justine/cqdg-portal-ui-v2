/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('datafiles', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
  cy.showColumn('Dataset');
  cy.showColumn('File Name');
  cy.showColumn('Platform');
});

describe('Page Data Exploration (Data Files) - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[data-cy="Title_DataExploration"]').contains('Data Explorer');
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(1).find('svg[data-icon="lock"]').should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(2).contains('C').should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(2).find('[class*="ant-tag-geekblue"]').should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(3).contains('FI0000572').should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(4).contains('T-DEE').should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(5).contains('-').should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(6).contains('Genomics').should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(7).contains('Supplement').should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(8).contains('WGS').should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(9).contains('TGZ').should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(10).contains('0 B').should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(11).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(12).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(13).contains('S03510.extra.tgz').should('exist');
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(14).contains('Illumina HiSeq 2500 PE125').should('exist');
  });
});
