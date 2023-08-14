/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudiesPage();
  cy.showColumn('Population');
  cy.showColumn('Access Limitation');
  cy.showColumn('Access Requirement');
  cy.showColumn('Description');
});

describe('Page Studies - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[data-cy="Title_Studies"]').contains('Studies');
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(0).contains('NEURODEV').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(1).contains('CHUSJ-NeuroDev').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(2).contains('Rare Diseases').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(3).contains('Pediatric and adult').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(4).contains('382').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(5).contains('130').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(6).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(7).contains('-').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(8).contains('-').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(9).contains('3,056').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(10).contains('health or medical or biomedical research').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(10).contains('DUO:').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(10).contains('0000006').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(11).contains('genetic studies only').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(11).contains('DUO:').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(11).contains('0000016').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(12).contains('Case study on neurod').should('exist');
  });
});

describe('Page Studies - Valider les liens disponibles', () => {
  it('Lien Code du tableau', () => {
    cy.get('tr[data-row-key="NEURODEV"]').find('[class*="ant-table-cell"]').eq(0).find('[href]').click({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('CHUSJ-NeuroDev');
  });

  it('Lien Participants du tableau', () => {
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(4).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('NEURODEV').should('exist');
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(9).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('NEURODEV').should('exist');
  });

  it('Lien Duo de l\'Access Limitation du tableau', () => {
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(10).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000006');
  });

  it('Lien Duo de l\'Access Requirement du tableau', () => {
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(11).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000016');
  });
  
  // Fait planter Cypress
  it.skip('Lien \'See more\' de l\'Access Requirement du tableau', () => {
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(11).contains('See more').click({force: true});
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(11).contains('ethics approval required').should('exist');
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(11).contains('See less').click({force: true});
    cy.get('tr[data-row-key="NEURODEV"]').find('[class="ant-table-cell"]').eq(11).contains('ethics approval required').should('not.exist');
  });
});

describe('Page Studies - Valider les fonctionnalités du tableau', () => {
  it('Tris [CQDG-277]', () => {
    cy.sortTableAndWait('Code');
    cy.validateTableFirstRow('NEURODEV', 0);
    cy.sortTableAndWait('Code');
    cy.validateTableFirstRow('NEURODEV', 0);
    cy.sortTableAndWait('Code');

    cy.sortTableAndWait('Name');
    cy.validateTableFirstRow('CARTaGENE', 1);
    cy.sortTableAndWait('Name');
    cy.validateTableFirstRow('Developmental and epileptic encephalopathies', 1);
    cy.sortTableAndWait('Name');
    
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow('General health', 2);
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow('Rare Diseases', 2);
    cy.sortTableAndWait('Domain');
    
    cy.sortTableAndWait('Population');
    cy.validateTableFirstRow('Adult', 3);
    cy.sortTableAndWait('Population');
    cy.validateTableFirstRow('Pediatric and adult', 3);
    cy.sortTableAndWait('Population');
  });

  it('Tri multiple', () => {
    cy.sortTableAndWait('Population');
    cy.sortTableAndWait('Population');
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow('Neurodevelopmental conditions', 2);
  });
});
