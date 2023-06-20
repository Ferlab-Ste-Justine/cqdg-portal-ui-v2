/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitFileEntity('FI0181945');
});

describe('Page d\'un fichier - Valider les redirections', () => {
  it('Studies', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });
  
  it('Participant', () => {
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FI0181945').should('exist');
  });
  
  it('Sample', () => {
    cy.get('[data-cy="SummaryHeader_Samples_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FI0181945').should('exist');
  });
});

describe('Page d\'un fichier - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('FI0181945');
  });

  it('Panneau Summary [CQDG-300]', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains('Study');
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains(/^Participant$/);
    cy.get('[data-cy="SummaryHeader_Samples_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Samples_Button"]').contains(/^Sample$/);
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('FI0181945').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Name').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('S15906.cnv.vcf.gz').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Format').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).contains(/^VCF$/).should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).find('[class*="FileEntity_tag"]').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('Size').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('0 B').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(4).contains('URL').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('https://ferload.qa.cqdg.ferlab.bio/').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(5).contains('Hash').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('-').should('exist');
  });

  it('Panneau Data Type', () => {
    cy.get('[id="data_type"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Category').should('exist');
    cy.get('[id="data_type"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('Genomics').should('exist');
    cy.get('[id="data_type"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Type').should('exist');
    cy.get('[id="data_type"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('Germline-CNV').should('exist');
  });

  it('Panneau Participants-Samples [CQDG-300]', () => {
    cy.get('[id="biospecimens"]').find('[class="ant-collapse-header"]').contains('(1)').should('exist');
    cy.get('[id="biospecimens"]').find('[class="ant-collapse-header"]').contains('View in Data Exploration').should('exist');
    cy.get('[id="biospecimens"]').find('[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="biospecimens"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Participant').should('exist');
    cy.get('[id="biospecimens"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Study').should('exist');
    cy.get('[id="biospecimens"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Sample').should('exist');
    cy.get('[id="biospecimens"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Sample Type').should('exist');
    cy.get('[id="biospecimens"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Biospecimen').should('exist');
    cy.get('[id="biospecimens"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('Tissue').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(0).contains('PT1006895').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(1).contains('T-DEE').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(2).contains('SR0462507').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(3).contains('DNA').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(3).contains('NCIT:').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(3).contains('C449').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(4).contains('SP0564508').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(5).contains('Blood').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(5).contains('NCIT:').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(5).contains('C12434').should('exist');
  });

  it('Panneau Experimental Procedure', () => {
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Experimental Strategy').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('WGS').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(0).find('[class*="FileEntity_tag"]').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Sequencing Type').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('Paired Reads').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Read Length').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('-').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('Platform').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('Illumina HiSeq 2000 PE100').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-label"]').eq(4).contains('Capture Kit').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('-').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-label"]').eq(5).contains('Date (yyyy-mm-dd)').should('exist');
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('1970-01-01').should('exist');
  });

  it('Panneau Analysis Properties', () => {
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('AN0003226').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Analysis Type').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('Germline Genome Bioinformatic Analysis').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Pipeline').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('Dragen').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('Version').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('3.9.3').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-label"]').eq(4).contains('Genome Build').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('GRCh38').should('exist');
  });

  it('Panneau Files Generated by the Analysis [CQDG-261]', () => {
    cy.get('[id="analysis_files"]').find('[class="ant-collapse-header"]').contains('(6)').should('exist');
    cy.get('[id="analysis_files"]').find('[class="ant-collapse-header"]').contains('View in Data Exploration').should('exist');
    cy.get('[id="analysis_files"]').find('[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="analysis_files"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('File').should('exist');
    cy.get('[id="analysis_files"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Name').should('exist');
    cy.get('[id="analysis_files"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Type').should('exist');
    cy.get('[id="analysis_files"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Format').should('exist');
    cy.get('[id="analysis_files"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Size').should('exist');
    cy.get('[id="analysis_files"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('Sample').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0185152"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(1).contains('mpsMetrics_S15906.tar.gz').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0185152"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(2).contains('Sequencing Data Supplement').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0185152"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(3).contains('TGZ').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0185152"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(3).find('[class*="FileEntity_tag"]').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0185152"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(4).contains('0 B').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0185152"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(5).contains('SR0462507').should('exist');
  });
});

describe('Page d\'un fichier - Valider les liens disponibles', () => {
  it('Lien URL du panneau Summary', () => {
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).find('[href]')
    .should('have.attr', 'href', 'https://ferload.qa.cqdg.ferlab.bio/e192c1a9174d4b2bf3dcad7aef1149eb7fb7015b');
  });

  it('Lien Participant du panneau Participants-Samples', () => {
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(0).find('[href]').click({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('PT1006895');
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
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0185152"]').click({force: true});
    cy.get('[id="file-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('FI0185152');
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
