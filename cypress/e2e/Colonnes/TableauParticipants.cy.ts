/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Participants) - Colonnes du tableau', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants');
  });

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(1)
      .contains('Participant').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Study').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Gender').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(4)
      .contains('Diagnosis (MONDO)').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(5)
      .contains('Phenotype (HPO)').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Age').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(7)
      .contains('Files').should('exist');

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .find('th[class*="ant-table-cell"]').eq(8)
      .contains('Biospecimen').should('exist');
    
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Ethnicity').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(9)
      .contains('Ethnicity').should('exist');
  
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Diagnosis (ICD)').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(10)
      .contains('Diagnosis (ICD)').should('exist');
  
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Diagnosis (Source Text)').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(11)
      .contains('Diagnosis (Source Text)').should('exist');
  
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('External Participant').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(12)
      .contains('External Participant').should('exist');
  
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Vital Status').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(13)
      .contains('Vital Status').should('exist');
  });

  it('Masquer une colonne affichée', () => {
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Study').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Study')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Study').should('not.exist');
  });

  it('Afficher une colonne masquée', () => {
    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Ethnicity').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Ethnicity')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]').eq(0)
      .contains('Ethnicity').should('exist');
  });
});