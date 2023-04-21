/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitFileEntity('FI0000001');
});

describe('Page d\'un fichier - Valider les redirections', () => {
  it('Studies', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('CAG').should('exist');
  });
  
  it('Participant', () => {
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('FI0000001').should('exist');
  });
  
  it('Sample', () => {
    cy.get('[data-cy="SummaryHeader_Samples_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('FI0000001').should('exist');
  });
});

describe('Page d\'un fichier - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('FI0000001');
  });

  it('Panneau Summary', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains('Study');
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains(/^Participant$/);
    cy.get('[data-cy="SummaryHeader_Samples_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Samples_Button"]').contains(/^Sample$/);
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('FI0000001').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('NS.1661.IDT_i7_59---IDT_i5_59.11129610.gvcf.gz').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('gVCF').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).find('[class*="FileEntity_tag"]').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('5.72 GB').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('https://ferload.qa.cqdg.ferlab.bio/').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(5).invoke('text').should('have.length.at.least', 10);
  });

  it('Panneau Data Type', () => {
    cy.get('[id="data_type"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('Genomics').should('exist');
    cy.get('[id="data_type"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('SNV').should('exist');
  });

  it('Panneau Participants-Samples', () => {
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(0).contains('PT0025622').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(1).contains('CAG').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(2).contains('SR0029542').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(3).contains('DNA').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(3).contains('NCIT:').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(3).contains('C449').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(4).contains('SP0017636').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(5).contains('Blood').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(5).contains('NCIT:').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(5).contains('C12434').should('exist');
  });

  it('Panneau Experimental Procedure', () => {
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('WGS').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(0).find('[class*="FileEntity_tag"]').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('Paired Reads').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('151').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('NovaSeq S4 PE150').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('-').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('1970-01-01').should('exist');
  });

  it('Panneau Analysis Properties', () => {
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('AN0002236').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('Germline Genome Bioinformatic Analysis').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('Dragen').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('SW null').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('GRCh38').should('exist');
  });

  it('Panneau Files Generated by the Analysis [CQDG-261]', () => {
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0003006"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(1).contains('mpsMetrics_NS.1661.IDT_i7_59---IDT_i5_59.11129610.zip').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0003006"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(2).contains('Sequencing Data Supplement').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0003006"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(3).contains('TGZ').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0003006"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(3).find('[class*="FileEntity_tag"]').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0003006"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(4).contains('42.13 KB').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0003006"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(5).contains('SR0029542').should('exist');
  });
});

describe('Page d\'un fichier - Valider les liens disponibles', () => {
  it.skip('Lien URL du panneau Summary', () => {
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).find('[href]').click({force: true});
    cy.url().should('include', 'ferload.qa.cqdg.ferlab.bio');
  });

  it('Lien Participant du panneau Participants-Samples', () => {
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(0).find('[href]').click({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('PT0025622');
  });

  it('Lien NCIT du Sample Type du panneau Participants-Samples', () => {
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(3).invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains('C449').should('exist');
  });

  it('Lien NCIT du Tissue du panneau Participants-Samples', () => {
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(5).invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains('C12434').should('exist');
  });

  it('Lien File du panneau Files Generated by the Analysis', () => {
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0003006"]').click({force: true});
    cy.get('[id="file-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('FI0003006');
  });
});

describe('Page d\'un fichier - Valider les panneaux masquables', () => {
  it('Panneau Summary', () => {
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Data Type', () => {
    cy.get('[id="data_type"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_type"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_type"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_type"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_type"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Participants-Samples', () => {
    cy.get('[id="biospecimens"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="biospecimens"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="biospecimens"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="biospecimens"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="biospecimens"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Experimental Procedure', () => {
    cy.get('[id="experimental_procedure"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="experimental_procedure"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="experimental_procedure"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="experimental_procedure"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="experimental_procedure"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Analysis Properties', () => {
    cy.get('[id="analysis"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="analysis"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="analysis"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="analysis"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="analysis"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Files Generated by the Analysis', () => {
    cy.get('[id="analysis_files"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="analysis_files"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="analysis_files"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="analysis_files"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="analysis_files"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});
