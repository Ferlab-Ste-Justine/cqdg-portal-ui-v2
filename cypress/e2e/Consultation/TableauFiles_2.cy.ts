/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('datafiles', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
});

describe('Page Data Exploration (Data Files) - Valider les liens disponibles', () => {
  it('Lien File du tableau', () => {
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(3).find('[href]').clickAndWait({force: true});
    cy.get('[id="file-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('FI0000572');
  });

  it('Lien Study du tableau', () => {
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(4).find('[href]').clickAndWait({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Lien Participants du tableau', () => {
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(10).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('FI0000572').should('exist');
    cy.validateTableResultsCount(/^1$/);
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="FI00005720"] [class*="ant-table-cell"]').eq(11).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('FI0000572').should('exist');
    cy.validateTableResultsCount(/^1$/);
  });
});
