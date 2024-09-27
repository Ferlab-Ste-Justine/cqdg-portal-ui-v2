/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../support/utils';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Biospecimens) - Vérifier les informations affichées', () => {
  beforeEach(() => {
    cy.visitDataExploration('biospecimens', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
  });

  it('Titre', () => {
    cy.get('[data-cy="Title_DataExploration"]').contains('Data Explorer');
  });

  it('Tableau', () => {
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(1).contains('SR0000214').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(2).contains('SP0000179').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(3).contains('PT0000010').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(4).contains('T-DEE').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(5).contains('DNA').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(5).contains('NCIT:').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(5).contains('C449').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).contains('Blood').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).contains('NCIT:').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).contains('C12434').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(7).contains('-').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(8).contains(/^5$/).should('exist');
  });
});

describe('Page Data Exploration (Biospecimens) - Valider les liens disponibles', () => {
  beforeEach(() => {
    cy.visitDataExploration('biospecimens', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
  });

  it('Lien Participant du tableau', () => {
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(3).find('[href]').clickAndWait({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('PT0000010');
  });

  it('Lien Study du tableau', () => {
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(4).find('[href]').clickAndWait({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Lien NCIT de Sample Type du tableau', () => {
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(5).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/NCIT_C449');
  });

  it('Lien NCIT de Tissue du tableau', () => {
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/NCIT_C12434');
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(8).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('SR0000214').should('exist');
    cy.validateTableResultsCount(/^5$/);
  });
});

describe('Page Data Exploration (Biospecimens) - Valider les fonctionnalités du tableau', () => {
  beforeEach(() => {
    cy.visitDataExploration('biospecimens');
  });

  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    cy.sortTableAndWait('Study');
    cy.validateTableFirstRow('STUDY1', 4, true);
    cy.sortTableAndWait('Study');
    cy.validateTableFirstRow('T-DEE', 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Sample Type', () => {
    cy.sortTableAndWait('Sample Type');
    cy.validateTableFirstRow('C449', 5, true);
    cy.sortTableAndWait('Sample Type');
    cy.validateTableFirstRow('C449', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Tissue', () => {
    cy.sortTableAndWait('Tissue');
    cy.validateTableFirstRow('C12434', 6, true);
    cy.sortTableAndWait('Tissue');
    cy.validateTableFirstRow('Unknown', 6, true);
    cy.sortTableAndWait('Tissue');
  });

  it('Valider les fonctionnalités du tableau - Tri Age', () => {
    cy.sortTableAndIntercept('Age', 1);
    cy.validateTableFirstRow('Congenital', 7, true);
    cy.sortTableAndIntercept('Age', 1);
    cy.validateTableFirstRow('Young Adult', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Sample Type', 1);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('STUDY1', 4, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('20').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql1');
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql2');
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql3');
    cy.get('button[type="button"]').contains('Previous').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql3');
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('First').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
  