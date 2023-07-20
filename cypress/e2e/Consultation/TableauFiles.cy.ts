/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Data Files) - Vérifier les informations affichées', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('PT1007374'); // CQDG-301
    cy.get('[data-cy="SummaryHeader_Files_Button"]').find('[href]').click({force: true}); // CQDG-301
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist'); // CQDG-301
    cy.resetColumns(); // CQDG-301
//    cy.visitDataExploration('datafiles', '?sharedFilterId=6bd9c618-87bb-49a9-a4ea-d793601f944d');
    cy.showColumn('File Name');
    cy.showColumn('Platform');
  });

  it('Titre', () => {
    cy.get('[data-cy="Title_DataExploration"]').contains('Data Exploration');
  });

  it('Tableau [CQDG-261]', () => {
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(1).find('svg[data-icon="lock"]').should('exist');
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(2).contains('C').should('exist');
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(2).find('[class*="ant-tag-geekblue"]').should('exist');
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(3).contains('FI0188666').should('exist');
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(4).contains('NEURODEV').should('exist');
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(5).contains('Genomics').should('exist');
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(6).contains('Sequencing Data Supplement').should('exist');
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(7).contains('WGS').should('exist');
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(8).contains('TGZ').should('exist');
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(9).contains('0 B').should('exist');
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(10).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(11).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(12).contains('mpsMetrics_15684.tar.gz').should('exist');
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(13).contains('Illumina NovaSeq 6000').should('exist');
  });
});

describe('Page Data Exploration (Data Files) - Valider les liens disponibles', () => {
  beforeEach(() => {
    cy.visitParticipantEntity('PT1007374'); // CQDG-301
    cy.get('[data-cy="SummaryHeader_Files_Button"]').find('[href]').click({force: true}); // CQDG-301
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist'); // CQDG-301
    cy.resetColumns(); // CQDG-301
//    cy.visitDataExploration('datafiles', '?sharedFilterId=6bd9c618-87bb-49a9-a4ea-d793601f944d');
  });

  it('Lien File du tableau', () => {
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(3).find('[href]').click({force: true});
    cy.get('[id="file-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('FI0188666');
  });

  it('Lien Study du tableau', () => {
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(4).find('[href]').click({force: true});
    cy.get('[data-cy="Title_Studies"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('NEURODEV').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });

  it('Lien Participants du tableau', () => {
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(10).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FI0188666').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="FI01886660"]').find('[class*="ant-table-cell"]').eq(11).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FI0188666').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });
});

describe('Page Data Exploration (Data Files) - Valider les fonctionnalités du tableau', () => {
  beforeEach(() => {
    cy.visitDataExploration('datafiles');
    cy.showColumn('Platform');
  });

  it('Valider les fonctionnalités du tableau - Tris [CQDG-261]', () => {
    cy.get('thead[class="ant-table-thead"]').contains('Study').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('NEURODEV').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Study').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('T-DEE').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Study').click({force: true});

    cy.get('thead[class="ant-table-thead"]').contains('Data Category').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('Genomics').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Data Category').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('Genomics').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Data Category').click({force: true});

    cy.get('thead[class="ant-table-thead"]').contains('Data Type').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('Aligned Reads').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Data Type').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('Sequencing Data Supplement').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Data Type').click({force: true});

    cy.get('thead[class="ant-table-thead"]').contains('Data Type').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('WGS').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Data Type').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('WGS').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Data Type').click({force: true});

    cy.get('thead[class="ant-table-thead"]').contains('Format').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('CRAM').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Format').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('gVCF').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Format').click({force: true});

    cy.get('thead[class="ant-table-thead"]').contains('Size').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('0 B').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Size').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('0 B').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Size').click({force: true});

    cy.get('thead[class="ant-table-thead"]').contains('Platform').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('Illumina HiSeq 2000 PE100').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Platform').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('Illumina NovaSeq 6000').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Platform').click({force: true});
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.get('thead[class="ant-table-thead"]').contains('Format').click({force: true});
    cy.wait(1000);
    cy.get('thead[class="ant-table-thead"]').contains('Study').click({force: true});
    cy.wait(1000);
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('NEURODEV').should('exist');
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
  