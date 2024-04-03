/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Data Files) - Vérifier les informations affichées', () => {
  beforeEach(() => {
    cy.visitDataExploration('datafiles', '?sharedFilterId=a80b4939-38c4-415e-9189-27f79ab37cb5');
    cy.showColumn('Dataset');
    cy.showColumn('File Name');
    cy.showColumn('Platform');
  });

  it('Titre', () => {
    cy.get('[data-cy="Title_DataExploration"]').contains('Data Explorer');
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(1).find('svg[data-icon="lock"]').should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(2).contains('C').should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(2).find('[class*="ant-tag-geekblue"]').should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(3).contains('FI0000572').should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(4).contains('T-DEE').should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(5).contains('-').should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(6).contains('Genomics').should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(7).contains('Supplement').should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(8).contains('WGS').should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(9).contains('TGZ').should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(10).contains('0 B').should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(11).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(12).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(13).contains('S03510.extra.tgz').should('exist');
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(14).contains('Illumina HiSeq 2500 PE125').should('exist');
  });
});

describe('Page Data Exploration (Data Files) - Valider les liens disponibles', () => {
  beforeEach(() => {
    cy.visitDataExploration('datafiles', '?sharedFilterId=a80b4939-38c4-415e-9189-27f79ab37cb5');
  });

  it('Lien File du tableau', () => {
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(3).find('[href]').click({force: true});
    cy.get('[id="file-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('FI0000572');
  });

  it('Lien Study du tableau', () => {
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(4).find('[href]').click({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Lien Participants du tableau', () => {
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(10).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FI0000572').should('exist');
    cy.validateTableResultsCount(/^1$/);
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="FI00005720"]').find('[class*="ant-table-cell"]').eq(11).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FI0000572').should('exist');
    cy.validateTableResultsCount(/^1$/);
  });
});

describe('Page Data Exploration (Data Files) - Valider les fonctionnalités du tableau', () => {
  beforeEach(() => {
    cy.visitDataExploration('datafiles');
    cy.showColumn('Dataset');
    cy.showColumn('File Name');
    cy.showColumn('Platform');
  });

  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    cy.sortTableAndWait('Study');
    cy.validateTableFirstRow('STUDY1', 4);
    cy.sortTableAndWait('Study');
    cy.validateTableFirstRow('T-DEE', 4);
  });

  it('Valider les fonctionnalités du tableau - Tri Dataset', () => {
    cy.sortTableAndWait('Dataset');
    cy.validateTableFirstRow('-', 5);
    cy.sortTableAndWait('Dataset');
    cy.validateTableFirstRow('Data2', 5);
  });

  it('Valider les fonctionnalités du tableau - Tri Data Category', () => {
    cy.sortTableAndWait('Data Category');
    cy.validateTableFirstRow('Genomics', 6);
    cy.sortTableAndWait('Data Category');
    cy.validateTableFirstRow('Genomics', 6);
  });

  it('Valider les fonctionnalités du tableau - Tri Data Type', () => {
    cy.sortTableAndWait('Data Type');
    cy.validateTableFirstRow('Aligned Reads', 7);
    cy.sortTableAndWait('Data Type');
    cy.validateTableFirstRow('Supplement', 7);
  });

  it('Valider les fonctionnalités du tableau - Tri Strategy', () => {
    cy.sortTableAndWait('Strategy');
    cy.validateTableFirstRow('WGS', 8);
    cy.sortTableAndWait('Strategy');
    cy.validateTableFirstRow('WGS', 8);
  });

  it('Valider les fonctionnalités du tableau - Tri Format', () => {
    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow('CRAM', 9);
    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow('gVCF', 9);
  });

  it('Valider les fonctionnalités du tableau - Tri Size', () => {
    cy.sortTableAndWait('Size');
    cy.validateTableFirstRow('0 B', 10);
    cy.sortTableAndWait('Size');
    cy.validateTableFirstRow('10.7 GB', 10);
  });

  it('Valider les fonctionnalités du tableau - Tri Platform', () => {
    cy.sortTableAndWait('Platform');
    cy.validateTableFirstRow('Illumina HiSeq 2000 PE100', 14);
    cy.sortTableAndWait('Platform');
    cy.validateTableFirstRow('NovaSeq S4 PE150', 14);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndWait('Format');
    cy.sortTableAndWait('Study');
    cy.sortTableAndWait('Study');
    cy.validateTableFirstRow('T-DEE', 4);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('body').find('span[class*="ant-select-selection-item"]').click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('20').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Previous').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('First').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
  