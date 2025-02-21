/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitParticipantEntity('PT0000010');
  cy.resetColumns('biospecimen');
});

describe('Page d\'un participant - Colonnes du tableau Biospecimens', () => {
  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Sample').should('exist');
    
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Sample Type').should('exist');
  
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Tissue').should('exist');

    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Biospecimen').should('exist');

    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Age').should('exist');
  });

  it('Masquer/Afficher une colonne affichée', () => {
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Sample Type').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Sample Type')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Sample Type').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Sample Type')
      .find('[type="checkbox"]').check({force: true});

    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Sample Type').should('exist');
  });
});
