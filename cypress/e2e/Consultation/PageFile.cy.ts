/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitFileEntity('FI0000981');
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
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FI0000981').should('exist');
  });
  
  it('Sample', () => {
    cy.get('[data-cy="SummaryHeader_Samples_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FI0000981').should('exist');
  });
});

describe('Page d\'un fichier - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('FI0000981');
  });

  it('Panneau Summary', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains('Study');
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains(/^Participant$/);
    cy.get('[data-cy="SummaryHeader_Samples_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Samples_Button"]').contains(/^Sample$/);
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('FI0000981').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Name').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('S15906.hard-filtered.gvcf.gz').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Format').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).contains(/^gVCF$/).should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).find('[class*="FileEntity_tag"]').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('Size').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('0 B').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').contains('URL').should('not.exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').contains('https://ferload.qa.cqdg.ferlab.bio/').should('not.exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').contains('Hash').should('not.exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').contains(/^-$/).should('not.exist');
  });

  it('Panneau Data Type', () => {
    cy.get('[id="data_type"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Category').should('exist');
    cy.get('[id="data_type"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('Genomics').should('exist');
    cy.get('[id="data_type"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Type').should('exist');
    cy.get('[id="data_type"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('SNV').should('exist');
  });

  it('Panneau Participants-Samples', () => {
    cy.resetColumns('biospecimens');
    cy.get('[id="biospecimens"]').find('[class="ant-collapse-header"]').contains('(1)').should('exist');
    cy.get('[id="biospecimens"]').find('[class="ant-collapse-header"]').contains('View in Data Explorer').should('exist');
    cy.get('[id="biospecimens"]').find('[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="biospecimens"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Participant').should('exist');
    cy.get('[id="biospecimens"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Study').should('exist');
    cy.get('[id="biospecimens"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Sample').should('exist');
    cy.get('[id="biospecimens"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Sample Type').should('exist');
    cy.get('[id="biospecimens"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Biospecimen').should('exist');
    cy.get('[id="biospecimens"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('Tissue').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(0).contains('PT0000458').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(1).contains('T-DEE').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(2).contains('SR0000084').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(3).contains('DNA').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(3).contains('NCIT:').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(3).contains('C449').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(4).contains('SP0000519').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(5).contains('Blood').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(5).contains('NCIT:').should('exist');
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(5).contains('C12434').should('exist');
  });

  it('Panneau Experimental Procedure', () => {
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Strategy').should('exist');
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
    cy.get('[id="experimental_procedure"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('2004-05-14').should('exist');
  });

  it('Panneau Analysis Properties', () => {
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('AN0000934').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Analysis Type').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('Germline Genome Bioinformatic Analysis').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Pipeline').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('Dragen').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('Version').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('3.9.3').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-label"]').eq(4).contains('Genome Build').should('exist');
    cy.get('[id="analysis"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('GRCh38').should('exist');
  });

  it('Panneau Files Generated by the Analysis', () => {
    cy.get('[id="analysis_files"]').find('[class="ant-collapse-header"]').contains('(5)').should('exist');
    cy.get('[id="analysis_files"]').find('[class="ant-collapse-header"]').contains('View in Data Explorer').should('exist');
    cy.get('[id="analysis_files"]').find('[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="analysis_files"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('File').should('exist');
    cy.get('[id="analysis_files"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Name').should('exist');
    cy.get('[id="analysis_files"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Type').should('exist');
    cy.get('[id="analysis_files"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Format').should('exist');
    cy.get('[id="analysis_files"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Size').should('exist');
    cy.get('[id="analysis_files"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('Sample').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0001222"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(1).contains('S15906.extra.tgz').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0001222"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(2).contains('Supplement').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0001222"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(3).contains('TGZ').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0001222"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(3).find('[class*="FileEntity_tag"]').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0001222"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(4).contains('0 B').should('exist');
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0001222"]').parents('tr')
      .find('td[class="ant-table-cell"]').eq(5).contains('SR0000084').should('exist');
  });
});

describe('Page d\'un fichier - Valider les liens disponibles', () => {
  it.skip('Lien URL du panneau Summary', () => {
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).find('[href]')
    .should('have.attr', 'href', 'https://ferload.qa.cqdg.ferlab.bio/386624e38c2371a2cf8e6daddc5fa4a2a03b1d33');
  });

  it('Lien DataExploration du panneau Participants-Samples', () => {
    cy.get('[id="biospecimens"] a[class*="EntityTableRedirectLink"]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FI0000981').should('exist');
  });

  it('Lien Participant du panneau Participants-Samples', () => {
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(0).find('[href]').click({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('PT0000458');
  });

  it('Lien Study du panneau Participants-Samples', () => {
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Lien NCIT du Sample Type du panneau Participants-Samples', () => {
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(3).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/NCIT_C449');
  });

  it('Lien NCIT du Tissue du panneau Participants-Samples', () => {
    cy.get('[id="biospecimens"]').find('td[class="ant-table-cell"]').eq(5).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/NCIT_C12434');
  });

  it('Lien DataExploration du panneau Files Generated by the Analysis', () => {
    cy.get('[id="analysis_files"] a[class*="EntityTableRedirectLink"]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Analysis ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('AN0000934').should('exist');
  });

  it('Lien File du panneau Files Generated by the Analysis', () => {
    cy.get('[id="analysis_files"]').find('[data-cy="Link_File_FI0001222"]').click({force: true});
    cy.get('[id="file-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('FI0001222');
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
