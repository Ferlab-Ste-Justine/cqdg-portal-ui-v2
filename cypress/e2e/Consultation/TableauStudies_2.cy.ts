/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudiesPage();
  cy.showColumn('Population');
  cy.showColumn('Access Limitation');
  cy.showColumn('Access Requirement');
  cy.showColumn('Overall Design');
  cy.showColumn('Data Collection Method');
  cy.showColumn('Principal Investigators');
  cy.showColumn('Contact Persons');
  cy.showColumn('Affiliated Institutions');
  cy.showColumn('Inclusion and Exclusion Criteria');
  cy.showColumn('Description');
});

describe('Page des études - Valider les liens disponibles', () => {
  it('Lien Code du tableau', () => {
    cy.get('tr[data-row-key="T-DEE"] [class*="ant-table-cell"]').eq(0).find('[href]').clickAndWait({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Lien Participants du tableau', () => {
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(4).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(9).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });

  it('Lien Duo de l\'Access Limitation du tableau', () => {
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(10).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000006');
  });

  it('Lien Duo de l\'Access Requirement du tableau', () => {
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(11).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000016');
  });
  
  it('Lien \'See more\' de l\'Access Requirement du tableau', () => {
    cy.get('tr[data-row-key="T-DEE"] [class="ant-table-cell"]').eq(11).find('a[class*="ExpandableCell_fuiExpandableCellBtn"]').contains('See more').should('exist');
  });
});
