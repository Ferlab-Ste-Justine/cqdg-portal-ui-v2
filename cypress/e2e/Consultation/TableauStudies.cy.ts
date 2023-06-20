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

  it('Tableau [CQDG-281]', () => {
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(0).contains('CAG').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(1).contains('CARTaGENE').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(2).contains('General health').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(3).contains('Adult').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(4).contains('2,180').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(5).contains('-').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(6).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(7).contains('-').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(8).contains('-').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(9).contains('11.1K').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(10).contains('general research use').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(10).contains('DUO:').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(10).contains('0000042').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(11).contains('publication required').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(11).contains('DUO:').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(11).contains('0000019').should('exist');
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(12).contains('CARTaGENE is a publi').should('exist');
  });
});

describe('Page Studies - Valider les liens disponibles', () => {
  it('Lien Participants du tableau', () => {
    cy.get('tr[data-row-key="CAG"]').find('[class="ant-table-cell"]').eq(4).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('CAG').should('exist');
  });
});

describe('Page Studies - Valider les fonctionnalités du tableau', () => {
  it('Tris [CQDG-277]', () => {
    cy.get('thead[class="ant-table-thead"]').contains('Code').click({force: true});
//    cy.get('th[class*="ant-table-column-has-sorters"]').eq(0).should('have.attr', 'aria-sort', 'ascending');
//    cy.get('th[class*="ant-table-column-has-sorters"]').eq(0).find('[aria-sort="ascending"]', {timeout: 5000}).should('exist');
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('CAG').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Code').click({force: true});
//    cy.get('th[class*="ant-table-column-has-sorters"]').eq(0).should('have.attr', 'aria-sort', 'descending');
//    cy.get('th[class*="ant-table-column-has-sorters"]').eq(0).find('[aria-sort="descending"]', {timeout: 5000}).should('exist');
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('T-DEE').should('exist');
//    cy.get('thead[class="ant-table-thead"]').contains('Code').click({force: true});
    cy.wait(1000);

    cy.get('thead[class="ant-table-thead"]').contains('Name').click({force: true});
//    cy.get('th[class*="ant-table-column-has-sorters"]').eq(0).find('[aria-sort="ascending"]', {timeout: 5000}).should('exist');
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('CAG').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Name').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('T-DEE').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Name').click({force: true});
    cy.wait(1000);
    
    cy.get('thead[class="ant-table-thead"]').contains('Domain').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('CAG').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Domain').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('RAPIDOMICS').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Domain').click({force: true});
    cy.wait(1000);
    
    cy.get('thead[class="ant-table-thead"]').contains('Population').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('CAG').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Population').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('RAPIDOMICS').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Population').click({force: true});
    cy.wait(1000);
  });

  it('Tri multiple', () => {
    cy.get('thead[class="ant-table-thead"]').contains('Population').click({force: true});
    cy.wait(1000);
    cy.get('thead[class="ant-table-thead"]').contains('Population').click({force: true});
    cy.wait(1000);
    cy.get('thead[class="ant-table-thead"]').contains('Domain').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('T-DEE').should('exist');
  });
});
  