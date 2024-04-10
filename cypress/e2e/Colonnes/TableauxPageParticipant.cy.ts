/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page d\'un participant - Colonnes du tableau Family', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('PT0000010');
    cy.resetColumns('family');
  });

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('[id="family"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Participant').should('exist');
    
    cy.get('[id="family"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Family Position').should('exist');
  
    cy.get('[id="family"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Disease Status').should('exist');
  });

  it('Masquer/Afficher une colonne affichée', () => {
    cy.get('[id="family"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Participant').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Participant')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('[id="family"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Participant').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Participant')
      .find('[type="checkbox"]').check({force: true});

    cy.get('[id="family"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Participant').should('exist');
  });
});

describe('Page d\'un participant - Colonnes du tableau Diagnoses', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('PT0000010');
    cy.resetColumns('diagnosis');
  });

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Diagnosis (MONDO)').should('exist');
    
    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Diagnosis (ICD-10)').should('exist');
  
    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Diagnosis (Source Text)').should('exist');

    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Age').should('exist');

    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Cancer').should('exist');

    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('MONDO Term').should('exist');
  });

  it('Masquer/Afficher une colonne affichée', () => {
    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Diagnosis (MONDO)').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Diagnosis (MONDO)')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Diagnosis (MONDO)').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Diagnosis (MONDO)')
      .find('[type="checkbox"]').check({force: true});

    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Diagnosis (MONDO)').should('exist');
  });
});

describe('Page d\'un participant - Colonnes du tableau Phenotypes', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('PT0000010');
    cy.resetColumns('phenotype');
  });

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('[id="phenotype"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Phenotype (HPO)').should('exist');
    
    cy.get('[id="phenotype"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Phenotype (Source Text)').should('exist');
  
    cy.get('[id="phenotype"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Interpretation').should('exist');

    cy.get('[id="phenotype"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Age').should('exist');

    cy.get('[id="phenotype"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('HPO Term').should('exist');
  });

  it('Masquer/Afficher une colonne affichée', () => {
    cy.get('[id="phenotype"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Phenotype (HPO)').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Phenotype (HPO)')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('[id="phenotype"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Phenotype (HPO)').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Phenotype (HPO)')
      .find('[type="checkbox"]').check({force: true});

    cy.get('[id="phenotype"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Phenotype (HPO)').should('exist');
  });
});

describe('Page d\'un participant - Colonnes du tableau Biospecimens', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('PT0000010');
    cy.resetColumns('biospecimen');
  });

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