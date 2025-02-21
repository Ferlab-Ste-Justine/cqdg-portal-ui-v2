/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('participants');
  cy.get('[data-cy="SidebarMenuItem_Participant"]').clickAndWait({force: true});
  cy.createSetIfNotExists('Cypress_SB', 0);
  cy.visitDashboard();
});

describe('Page Dashboard - Widget Saved Sets', () => {
  it('Vérifier les informations affichées - Nom', () => {
    cy.get('[data-cy="SavedSets"]').contains('Cypress_SB').should('exist');
  });

  it('Vérifier les informations affichées - Stamp', () => {
    cy.get('[data-cy="SavedSets"]').contains('Last saved:').should('exist');
    cy.get('[data-cy="SavedSets"]').contains(' ago').should('exist');
  });

  it('Valider les liens disponibles - Nom', () => {
    cy.get('[data-cy="Tab_Biospecimens"]').clickAndWait({force: true});
    cy.get('[data-cy="SavedSets"]').contains('Cypress Biospecimens').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Cypress Biospecimens').should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="Tab_Files"]').clickAndWait({force: true});
    cy.get('[data-cy="SavedSets"]').contains('Cypress Data Files').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Cypress Data Files').should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="SavedSets"] [data-cy="Tab_Variants"]').clickAndWait({force: true});
    cy.get('[data-cy="SavedSets"]').contains('Cypress Variants').clickAndWait({force: true});
    cy.get('[data-cy="Title_Variants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Cypress Variants').should('exist');
  });

  it('Valider les liens disponibles - Bouton Delete', () => {
    cy.get('[class*="ListItemWithActions_fuiListItemWithActions"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('Cypress_SB')) {
        cy.wrap($el).find('svg[data-icon="delete"]').clickAndWait({force:true});
      }
    });
    cy.clickAndIntercept('[class="ant-modal-content"] button[class*="ant-btn-dangerous"]', 'DELETE', '**/sets/**', 1);
    cy.get('[data-cy="SavedSets"]').contains('Cypress_SB').should('not.exist');
  });
});
