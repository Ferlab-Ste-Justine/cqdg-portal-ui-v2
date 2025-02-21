/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitFileEntity('FI0000981');
});

describe('Page d\'un fichier - Valider les redirections', () => {
  it('Studies', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"] [href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });
  
  it('Participant', () => {
    cy.get('[data-cy="SummaryHeader_Participants_Button"] [href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('FI0000981').should('exist');
  });
  
  it('Sample', () => {
    cy.get('[data-cy="SummaryHeader_Samples_Button"] [href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('FI0000981').should('exist');
  });
});
