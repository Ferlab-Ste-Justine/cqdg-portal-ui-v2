/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Dashboard - Widget Saved Filters', () => {
  beforeEach(() => {
    cy.visitDashboard();
  });

  it('Vérifier les informations affichées - Tooltip', () => {
    cy.get('[class*="DashboardCards_dashboardCard"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('My Filters')) {
        cy.wrap($el).find('[class*="CardHeader_infoIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
      }
    });
    cy.get('[class="ant-popover-title"]').contains('Managing Saved Filters').should('exist');
    cy.get('[class="ant-popover-inner-content"]').contains('A filter is a collection of queries applied to all harmonized CQDG data. The results of a filter may change over time as CQDG data is updated.').should('exist');
  });

  it('Valider les liens disponibles - Learn more du Tooltip', () => {
    cy.get('[class*="DashboardCards_dashboardCard"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('My Filters')) {
        cy.wrap($el).find('[class*="CardHeader_infoIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
      }
    });
    cy.get('[href="https://docs.cqdg.ca/docs/filtres"]').should('exist');
  });
});

describe('Page Dashboard - Widget Saved Filters', () => {
  beforeEach(() => {
    cy.visitDataExploration();
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);
    cy.createFilterIfNotExists('Cypress_FB');
    cy.visitDashboard();
  });

  it('Vérifier les informations affichées - Nom', () => {
    cy.get('[data-cy="SavedFilters"]').contains('Cypress_FB').should('exist');
  });

  it('Vérifier les informations affichées - Stamp', () => {
    cy.get('[data-cy="SavedFilters"]').contains('Last saved:').should('exist');
    cy.get('[data-cy="SavedFilters"]').contains(' ago').should('exist');
  });

  it('Valider les liens disponibles - Nom', () => {
    cy.get('[data-cy="SavedFilters"] [data-cy="Tab_Variants"]').click({force: true});
    cy.get('[data-cy="SavedFilters"]').contains('Cypress Variant Type Filter').click({force: true});
    cy.get('[data-cy="Title_Variants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SNV').should('exist');
  });

  it('Valider les liens disponibles - Bouton Delete', () => {
    cy.get('[class*="ListItemWithActions_fuiListItemWithActions"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('Cypress_FB')) {
        cy.wrap($el).find('svg[data-icon="delete"]').click({force:true});
      }
    });
    cy.clickAndIntercept('[class="ant-modal-content"] button[class*="ant-btn-dangerous"]', 'POST', '**/graphql', 1);
    cy.get('[data-cy="SavedFilters"]').contains('Cypress_FB').should('not.exist');
  });
});

describe('Page Dashboard - Widget Saved Filters', () => {
  beforeEach(() => {
    cy.visitDataExploration();
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').click({force: true});
    cy.waitWhileSpin(2000);
    cy.createFilterIfNotExists('Cypress_FA');
    cy.deleteFilterIfExists('Cypress_FB');
    cy.visitDashboard();
  });

  it('Valider les liens disponibles - Bouton Edit', () => {
    cy.get('[class*="ListItemWithActions_fuiListItemWithActions"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('Cypress_FA')) {
        cy.wrap($el).find('svg[data-icon="edit"]').click({force:true});
      }
    });
    cy.get('[class="ant-modal-content"] input').clear().type('Cypress_FB');
    cy.get(`[class="ant-modal-content"] input[value="Cypress_FB"]`).should('exist');
    cy.clickAndIntercept('[class="ant-modal-content"] button[class*="ant-btn-primary"]', 'POST', '**/saved-filters', 1);
    cy.get('[data-cy="SavedFilters"]').contains('Cypress_FB').should('exist');
    cy.get('[data-cy="SavedFilters"]').contains('Cypress_FA').should('not.exist');
  });
});
