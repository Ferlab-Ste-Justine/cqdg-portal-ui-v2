/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantEntityPage('1-161629781-T-C', 1);
});

describe('Page d\'un variant - Valider les redirections', () => {
  it('Studies', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('STUDY1').should('exist');
  });
});

describe('Page d\'un variant - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('chr1:g.161629781T>C');
    cy.get('[class*="EntityTitle"]').contains('Germline');
    cy.get('[class*="EntityTitle"]').find('[class*="variantTag"]').should('exist');
  });
  
  it('Panneau Summary', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains('1');
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains('Study');
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains('3');
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains('Participant');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Variant').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('chr1:g.161629781T>C').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Type').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('SNV').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Cytoband').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('1q23.3').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('Reference Genome').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('GRCh38').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(4).contains('Sources').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('WGS').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).find('[class*="ant-tag-purple"]').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(5).contains('Genes').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('FCGR3B').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(6).contains('OMIM').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(6).contains('610665').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(7).contains('Pathogenicity (ClinVar)').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(7).contains('Benign').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(7).find('[class*="ant-tag-green"]').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(8).contains('gnomAD Genome (v3.1.2)').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(8).contains('1.65e-2').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(9).contains('CQDG Studies').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(9).contains('6.67e-1').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(10).contains('ClinVar').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(10).contains('402858').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(11).contains('dbSNP').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(11).contains('rs2290834').should('exist');
  });
  
  it('Panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('FCGR3B').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('Omim').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('610665').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('Protein Coding').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('SpliceAI').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains(/^0.01$/).should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('gnomAD pLI').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('3.0294e-7').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('gnomAD LOEUF').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('1.651').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('AA').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('p.Ile106Val').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Consequence').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('Missense').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Coding DNA').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('c.316A>G').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Strand').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).contains(/^-1$/).should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('VEP').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).contains('MODERATE').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).find('[class*="ant-tag-gold"]').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('Predictions').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('Cadd:').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('-1.673349').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('Dann:').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('0.45924639878531787').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(6).contains('Conservation').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(6).contains('0.485').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(7).contains('Transcript').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(7).contains('ENST00000650385').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(7).find('svg[class*="anticon"]').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(8).contains('RefSeq').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(8).contains('NM_001244753.2').should('exist');
    cy.get('[id="consequence"]').contains('10 other transcripts +').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(1).should('not.exist');
  });
  
  it('Panneau Frequency [CQDG-472]', () => {
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Studies').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Domain').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Participants').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Frequency').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('# ALT Alleles').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('# Homozygotes').should('exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('STUDY1').should('exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('Rare diseases').should('exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('3 / 3').should('exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).find('[href]').should('not.exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).contains('6.67e-1').should('exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).contains('4').should('exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('1').should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(1).contains(/^$/).should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(2).contains('3 / 3').should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(3).contains('1.00e+0').should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(4).contains('4').should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(5).contains('1').should('exist');
  });
  
  it('Panneau Public Cohorts', () => {
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Cohort').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('# ALT Alleles').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('# Alleles (ALT + REF)').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('# Homozygotes').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Frequency').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(1).contains('25.9K').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(2).contains('126K').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(3).contains('1,977').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(4).contains('2.07e-1').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(1).contains('1,082').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(2).contains('65.6K').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(3).contains('4').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(4).contains('1.65e-2').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(1).contains('133').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(2).contains('13.4K').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(4).contains('9.96e-3').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(1).contains('51.7K').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(2).contains('194K').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(3).contains('10.6K').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(4).contains('2.67e-1').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(1).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(2).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(4).contains('-').should('exist');
  });
  
  it('Panneau ClinVar', () => {
    cy.get('[id="pathogenicity"]').find('div[class="ant-collapse-header"]').contains('402858').should('exist');
    cy.get('[id="pathogenicity"]').find('div[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="pathogenicity"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Interpretation').should('exist');
    cy.get('[id="pathogenicity"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Condition').should('exist');
    cy.get('[id="pathogenicity"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Inheritance').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('Benign').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('not specified').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
  });
  
  it('Panneau Gene - Phenotype', () => {
    cy.get('[id="genePhenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Source').should('exist');
    cy.get('[id="genePhenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Gene').should('exist');
    cy.get('[id="genePhenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Condition').should('exist');
    cy.get('[id="genePhenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Inheritance').should('exist');
    cy.get('[data-row-key="0-f-c-g-r-3-b"]').find('td[class="ant-table-cell"]').eq(0).contains('Orphanet').should('exist');
    cy.get('[data-row-key="0-f-c-g-r-3-b"]').find('td[class="ant-table-cell"]').eq(1).contains('FCGR3B').should('exist');
    cy.get('[data-row-key="0-f-c-g-r-3-b"]').find('td[class="ant-table-cell"]').eq(2).contains('Neonatal Alloimmune Neutropenia').should('exist');
    cy.get('[data-row-key="0-f-c-g-r-3-b"]').find('td[class="ant-table-cell"]').eq(3).contains('Not applicable').should('exist');
    cy.get('[data-row-key="1-f-c-g-r-3-b"]').find('td[class="ant-table-cell"]').eq(0).contains('HPO').should('exist');
    cy.get('[data-row-key="1-f-c-g-r-3-b"]').find('td[class="ant-table-cell"]').eq(1).contains('FCGR3B').should('exist');
    cy.get('[data-row-key="1-f-c-g-r-3-b"]').find('td[class="ant-table-cell"]').eq(2).contains('Severe Infection').should('exist');
    cy.get('[data-row-key="1-f-c-g-r-3-b"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
  });
});

describe('Page d\'un variant - Valider les liens disponibles', () => {
  it('Lien Genes du panneau Summary', () => {
    cy.get('[data-cy="Summary_Gene_ExternalLink"]')
      .should('have.attr', 'href', 'https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=FCGR3B');
  });

  it('Lien Omim du panneau Summary', () => {
    cy.get('[data-cy="Summary_OMIM_ExternalLink"]')
    .should('have.attr', 'href', 'https://omim.org/entry/610665');
  });

  it('Lien ClinVar du panneau Summary', () => {
    cy.get('[data-cy="Summary_ClinVar_ExternalLink"]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/402858');
  });

  it('Lien dbSNP du panneau Summary', () => {
    cy.get('[data-cy="Summary_dbSNP_ExternalLink"]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs2290834');
  });

  it('Lien du gène du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').find('[href]').eq(0)
    .should('have.attr', 'href', 'https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=FCGR3B');
  });

  it('Lien Omim du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').find('[href]').eq(1)
    .should('have.attr', 'href', 'https://omim.org/entry/610665');
  });
  
  it('Lien ENST du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(7).find('[href]')
    .should('have.attr', 'href', 'https://www.ensembl.org/id/ENST00000650385');
  });

  it('Lien RefSeq du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(8).find('[href]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/nuccore/NM_001244753.2,NM_001271036.2?report=graph');
  });

  it('Lien \'10 other transcripts\' du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').contains('10 other transcripts +').click({force: true});
    cy.get('[id="consequence"]').find('tr[class*="ant-table-row"]').eq(1).should('exist');
    cy.get('[id="consequence"]').contains('Show less -').click({force: true});
    cy.get('[id="consequence"]').find('tr[class*="ant-table-row"]').eq(1).should('not.exist');
  });

  it('Lien Studies du panneau CQDG Studies', () => {
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('STUDY1').should('exist');
  });

  it('Lien TopMed du panneau Public Cohort', () => {
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(0).find('[href]').should('have.attr', 'href', 'https://bravo.sph.umich.edu/freeze8/hg38/variant/snv/1-161629781-T-C');
  });

  it('Lien gnomAD Genome (v3.1.2) du panneau Public Cohort', () => {
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(0).find('[href]')
    .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/variant/1-161629781-T-C?dataset=gnomad_r3');
  });
  
  it('Lien ClinVar du panneau ClinVar', () => {
    cy.get('[data-cy="Pathogenicity_ClinVar_402858_ExternalLink"]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/402858');
  });
  
  it('Lien de la condition Orphanet du panneau Gene - Phenotype', () => {
    cy.get('[data-row-key="0-f-c-g-r-3-b"]').find('td[class="ant-table-cell"]').eq(2).find('[href]')
    .should('have.attr', 'href', 'https://www.orpha.net/consor/cgi-bin/Disease_Search.php?lng=EN&data_id=24024');
  });
  
  it('Lien HPO de la condition du panneau Gene - Phenotype', () => {
    cy.get('[data-row-key="1-f-c-g-r-3-b"]').find('td[class="ant-table-cell"]').eq(2).find('[href]').eq(0)
    .should('have.attr', 'href', 'https://hpo.jax.org/app/browse/term/HP:0032169');
  });

  it('Lien \'See more\' de la condition du panneau Gene - Phenotype', () => {
    cy.get('[data-row-key="1-f-c-g-r-3-b"]').contains('See more').click({force: true});
    cy.get('[data-row-key="1-f-c-g-r-3-b"]').contains('Meningitis').should('exist');
    cy.get('[data-row-key="1-f-c-g-r-3-b"]').contains('See less').click({force: true});
    cy.get('[data-row-key="1-f-c-g-r-3-b"]').contains('Meningitis').should('not.exist');
  });
});

describe('Page d\'un variant - Valider les panneaux masquables', () => {
  it('Panneau Summary', () => {
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="consequence"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="consequence"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Frequency', () => {
    cy.get('[id="frequencies"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="frequencies"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="frequencies"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="frequencies"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="frequencies"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Public Cohorts', () => {
    cy.get('[id="EntityPublicCohortTable"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="EntityPublicCohortTable"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="EntityPublicCohortTable"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau ClinVar', () => {
    cy.get('[id="pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Gene - Phenotype', () => {
    cy.get('[id="genePhenotype"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="genePhenotype"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="genePhenotype"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="genePhenotype"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="genePhenotype"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});
