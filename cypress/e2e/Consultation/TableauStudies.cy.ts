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

describe('Page des études - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[data-cy="Title_Studies"]').contains('Studies');
  });

  it('Tableau [CQDG-493]', () => {
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(0).contains('T-DEE').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(1).contains('Developmental and epileptic encephalopathies').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(2).contains('Neurodevelopmental Conditions').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(3).contains('Pediatric and adult').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(4).contains('588').should('exist');
    cy.get('tr[data-row-key="STUDY2"]').find('[class="ant-table-cell"]').eq(4).find('[href]').should('not.exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(5).contains('196').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(6).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(7).contains('-').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(8).contains('-').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(9).contains('2,940').should('exist');
    cy.get('tr[data-row-key="STUDY2"]').find('[class="ant-table-cell"]').eq(9).find('[href]').should('not.exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(10).contains('health or medical or biomedical research').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(10).contains('DUO:').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(10).contains('0000006').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(11).contains('genetic studies only').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(11).contains('DUO:').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(11).contains('0000016').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(12).contains('Case-parent trio stu').should('exist');
  });
});

describe('Page des études - Valider les liens disponibles', () => {
  it('Lien Code du tableau', () => {
    cy.get('tr[data-row-key="T-DEE"]').find('[class*="ant-table-cell"]').eq(0).find('[href]').click({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Lien Participants du tableau', () => {
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(4).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(9).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });

  it('Lien Duo de l\'Access Limitation du tableau', () => {
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(10).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000006');
  });

  it('Lien Duo de l\'Access Requirement du tableau', () => {
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(11).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000016');
  });
  
  // Fait planter Cypress
  it.skip('Lien \'See more\' de l\'Access Requirement du tableau', () => {
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(11).contains('See more').click({force: true});
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(11).contains('ethics approval required').should('exist');
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(11).contains('See less').click({force: true});
    cy.get('tr[data-row-key="T-DEE"]').find('[class="ant-table-cell"]').eq(11).contains('ethics approval required').should('not.exist');
  });
});

describe('Page des études - Valider les fonctionnalités du tableau', () => {
  it('Tri Code', () => {
    cy.sortTableAndWait('Code');
    cy.validateTableFirstRow('STUDY1', 0);
    cy.sortTableAndWait('Code');
    cy.validateTableFirstRow('T-DEE', 0);
  });

  it('Tri Name', () => {
    cy.sortTableAndWait('Name');
    cy.validateTableFirstRow('Congenital malformations', 1);
    cy.sortTableAndWait('Name');
    cy.validateTableFirstRow('Developmental and epileptic encephalopathies', 1);
  });
    
  it('Tri Domain [CQDG-472]', () => {
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow('Neurodevelopmental Conditions', 2);
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow('Rare Diseases', 2);
  });
    
  it('Tri Population', () => {
    cy.sortTableAndWait('Population');
    cy.validateTableFirstRow('Pediatric and adult', 3);
    cy.sortTableAndWait('Population');
    cy.validateTableFirstRow('Pediatric and adult', 3);
  });

  it('Tri multiple', () => {
    cy.sortTableAndWait('Population');
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow('Neurodevelopmental Conditions', 2);
  });
});
