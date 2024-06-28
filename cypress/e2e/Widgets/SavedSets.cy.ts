/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Dashboard - Widget Saved Sets', () => {
  beforeEach(() => {
    cy.visitDashboard();
  });

  it('Vérifier les informations affichées - Tooltip', () => {
    cy.get('[class*="DashboardCards_dashboardCard"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('My Sets')) {
        cy.wrap($el).find('[class*="CardHeader_infoIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
      }
    });
    cy.get('[class="ant-popover-title"]').contains('Managing Saved Sets').should('exist');
    cy.get('[class="ant-popover-inner-content"]').contains('A set is a fixed collection of entities (participants, biospecimens, files, or variants) which does not change even if CQDG data is updated.').should('exist');
  });

  it('Valider les liens disponibles - Learn more du Tooltip', () => {
    cy.get('[class*="DashboardCards_dashboardCard"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('My Sets')) {
        cy.wrap($el).find('[class*="CardHeader_infoIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
      }
    });
    cy.get('[href="https://docs.cqdg.ca/docs/filtres"]').should('exist');
  });
});

describe('Page Dashboard - Widget Saved Sets', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants');
    cy.get('[data-cy="SidebarMenuItem_Participant"]').click({force: true});
    cy.createSetIfNotExists('Cypress_SB', 0);
    cy.visitDashboard();
  });

  it('Vérifier les informations affichées - Nom', () => {
    cy.get('[data-cy="SavedSets"]').contains('Cypress_SB').should('exist');
  });

  it('Vérifier les informations affichées - Stamp', () => {
    cy.get('[data-cy="SavedSets"]').contains('Last saved:').should('exist');
    cy.get('[data-cy="SavedSets"]').contains(' ago').should('exist');
  });

  it('Valider les liens disponibles - Nom', () => {
    cy.get('[data-cy="Tab_Biospecimens"]').click({force: true});
    cy.get('[data-cy="SavedSets"]').contains('Cypress Biospecimens').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Cypress Biospecimens').should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="Tab_Files"]').click({force: true});
    cy.get('[data-cy="SavedSets"]').contains('Cypress Data Files').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Cypress Data Files').should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="SavedSets"] [data-cy="Tab_Variants"]').click({force: true});
    cy.get('[data-cy="SavedSets"]').contains('Cypress Variants').click({force: true});
    cy.get('[data-cy="Title_Variants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Cypress Variants').should('exist');
  });

  it('Valider les liens disponibles - Bouton Delete', () => {
    cy.get('[class*="ListItemWithActions_fuiListItemWithActions"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('Cypress_SB')) {
        cy.wrap($el).find('svg[data-icon="delete"]').click({force:true});
      }
    });
    cy.clickAndIntercept('[class="ant-modal-content"] button[class*="ant-btn-dangerous"]', 'DELETE', '**/sets/**', 1);
    cy.get('[data-cy="SavedSets"]').contains('Cypress_SB').should('not.exist');
  });
});

describe('Page Dashboard - Widget Saved Sets', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants');
    cy.get('[data-cy="SidebarMenuItem_Participant"]').click({force: true});
    cy.createSetIfNotExists('Cypress_SA', 0);
    cy.deleteSetIfExists('participants', 'Cypress_SB');
    cy.visitDashboard();
  });

  it('Valider les liens disponibles - Bouton Edit', () => {
    cy.get('[class*="ListItemWithActions_fuiListItemWithActions"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('Cypress_SA')) {
        cy.wrap($el).find('svg[data-icon="edit"]').click({force:true});
      }
    });
    cy.get('[class="ant-modal-content"] input').clear().type('Cypress_SB');
    cy.get(`[class="ant-modal-content"] input[value="Cypress_SB"]`).should('exist');
    cy.clickAndIntercept('[class="ant-modal-content"] button[class*="ant-btn-primary"]', 'PUT', '**/sets/**', 1);
    cy.get('[data-cy="SavedSets"]').contains('Cypress_SB').should('exist');
    cy.get('[data-cy="SavedSets"]').contains('Cypress_SA').should('not.exist');
  });
});
