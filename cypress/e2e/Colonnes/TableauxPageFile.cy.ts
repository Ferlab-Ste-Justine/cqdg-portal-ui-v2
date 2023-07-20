/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page d\'un fichier - Colonnes du tableau Participants-Samples', () => {
  beforeEach(() => {
    cy.visitFileEntity('FI0181945');
    cy.resetColumns('biospecimens');
  });

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes [CQDG-300]', () => {
    cy.get('[id="biospecimens"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Participant').should('exist');
    
    cy.get('[id="biospecimens"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Study').should('exist');
  
    cy.get('[id="biospecimens"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Sample').should('exist');

    cy.get('[id="biospecimens"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Sample Type').should('exist');

    cy.get('[id="biospecimens"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Biospecimen').should('exist');

    cy.get('[id="biospecimens"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Tissue').should('exist');
  });

  it('Masquer/Afficher une colonne affichée', () => {
    cy.get('[id="biospecimens"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Participant').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Participant')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('[id="biospecimens"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Participant').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Participant')
      .find('[type="checkbox"]').check({force: true});

    cy.get('[id="biospecimens"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Participant').should('exist');
  });
});