/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDashboard();
});

describe('Page Dashboard - Widget Saved Filters', () => {
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
    cy.get('[href*="https://docs.cqdg.ca/docs/filtres?ljs="]').should('exist');
  });
});
