/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantEntityPage('16-3606492-C-T', 1);
});

describe('Page d\'un variant - Valider les redirections', () => {
  it('Studies [CQDG-135]', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SD 46SK55A3').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SD DYPMEHHF').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SD BHJXBDQK').should('exist');
  });
  
  it('Participants [CQDG-135]', () => {
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('TODO').should('exist');
  });
});

describe('Page d\'un variant - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('chr16:g.3606492C>T');
    cy.get('[class*="EntityTitle"]').contains('Germline');
    cy.get('[class*="EntityTitle"]').find('[class*="variantTag"]').should('exist');
  });
  
  it('Panneau Summary [CQDG-135]', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains('6');
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains('Studies');
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains('12');
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains('Participants');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Variant').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('chr16:g.3606492C>T').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Type').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('SNV').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Cytoband').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('16p13.3').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Reference Genome').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('GRCh38').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Genes').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('SLX4').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('OMIM').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('613278').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('ClinVar').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(6).contains('Conflicting Interpretations Of Pathogenicity').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Participants').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(7).contains('12').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('gnomAD Genome (v3.1.1)').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(8).contains('2.30e-4').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Studies').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(9).contains('6').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('ClinVar').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(10).contains('319184').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('dbSNP').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(11).contains('rs148547201').should('exist');
  });
  
  it('Panneau Gene Consequences [CQDG-135]', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('SLX4').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('Omim').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('613278').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('AA').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('p.Glu248Lys').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Consequence').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('Missense Variant').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Coding DNA').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('c.742G>A').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Strand').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).contains('-1').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('VEP').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).contains('MODERATE').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).find('[class*="ant-tag-gold"]').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('Predictions').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('Sift:').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('Damaging').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('0.56456').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('Polyphen2:').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('Benign').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('0.56456').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(6).contains('Conservation').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(6).contains('0.325').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(7).contains('Transcript').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(7).contains('ENST00000294008').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(7).find('svg[class*="anticon"]').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(8).contains('RefSeq').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(8).contains('NM_032444').should('exist');
    cy.get('[id="consequence"]').contains('2 other transcripts +').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(1).should('not.exist');
  });
  
  it('Panneau Frequency', () => {
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Studies').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Participants').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Frequency').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('ALT Alleles').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Homozygotes').should('exist');
    cy.get('[id="frequencies"]').find('[data-row-key="0"]').find('td[class="ant-table-cell"]').eq(0).contains('KF-CDH').should('exist');
    cy.get('[id="frequencies"]').find('[data-row-key="0"]').find('td[class="ant-table-cell"]').eq(1).contains('4 / 11030').should('exist');
    cy.get('[id="frequencies"]').find('[data-row-key="0"]').find('td[class="ant-table-cell"]').eq(2).contains('3.63e-4').should('exist');
    cy.get('[id="frequencies"]').find('[data-row-key="0"]').find('td[class="ant-table-cell"]').eq(3).contains('4').should('exist');
    cy.get('[id="frequencies"]').find('[data-row-key="0"]').find('td[class="ant-table-cell"]').eq(4).contains('0').should('exist');
    cy.get('[id="frequencies"]').find('[data-row-key="1"]').find('td[class="ant-table-cell"]').eq(0).contains('KF-NBL').should('exist');
    cy.get('[id="frequencies"]').find('[data-row-key="1"]').find('td[class="ant-table-cell"]').eq(1).contains('1 / 11030').should('exist');
    cy.get('[id="frequencies"]').find('[data-row-key="1"]').find('td[class="ant-table-cell"]').eq(2).contains('9.07e-5').should('exist');
    cy.get('[id="frequencies"]').find('[data-row-key="1"]').find('td[class="ant-table-cell"]').eq(3).contains('1').should('exist');
    cy.get('[id="frequencies"]').find('[data-row-key="1"]').find('td[class="ant-table-cell"]').eq(4).contains('0').should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(1).contains('12 / 11030').should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(2).contains('1.09e-3').should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(3).contains('12').should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(4).contains('0').should('exist');
  });
  
  it('Panneau Public Cohorts', () => {
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Cohort').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('ALT Alleles').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Alleles (ALT + REF)').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Homozygotes').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Frequency').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(1).contains('29').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(2).contains('126K').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(4).contains('2.31e-4').should('exist');
    cy.get('[data-row-key="gnomadGenomes3_1_1"]').find('td[class="ant-table-cell"]').eq(1).contains('35').should('exist');
    cy.get('[data-row-key="gnomadGenomes3_1_1"]').find('td[class="ant-table-cell"]').eq(2).contains('152K').should('exist');
    cy.get('[data-row-key="gnomadGenomes3_1_1"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="gnomadGenomes3_1_1"]').find('td[class="ant-table-cell"]').eq(4).contains('2.30e-4').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(1).contains('33').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(2).contains('143K').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(4).contains('2.30e-4').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(1).contains('9').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(2).contains('31.4K').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(4).contains('2.87e-4').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(1).contains('72').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(2).contains('250K').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(4).contains('2.88e-4').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(1).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(2).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(4).contains('-').should('exist');
  });
  
  it('Panneau ClinVar [CQDG-135]', () => {
    cy.get('[id="pathogenicity"]').find('div[class="ant-collapse-header"]').contains('319184').should('exist');
    cy.get('[id="pathogenicity"]').find('div[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="pathogenicity"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Interpretation').should('exist');
    cy.get('[id="pathogenicity"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Condition').should('exist');
    cy.get('[id="pathogenicity"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Inheritance').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('Conflicting Interpretations Of Pathogenicity').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('Fanconi anemia complementation group P').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(0).contains('Conflicting Interpretations Of Pathogenicity').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains('Fanconi anemia').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(0).contains('Conflicting Interpretations Of Pathogenicity').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(1).contains('not specified').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(0).contains('Conflicting Interpretations Of Pathogenicity').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(1).contains('not provided').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(3).find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
  });
  
  it('Panneau Gene - Phenotype', () => {
    cy.get('[id="genePhenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Source').should('exist');
    cy.get('[id="genePhenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Gene').should('exist');
    cy.get('[id="genePhenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Condition').should('exist');
    cy.get('[id="genePhenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Inheritance').should('exist');
    cy.get('[data-row-key="0-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(0).contains('Orphanet').should('exist');
    cy.get('[data-row-key="0-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(1).contains('SLX4').should('exist');
    cy.get('[data-row-key="0-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(2).contains('Fanconi Anemia').should('exist');
    cy.get('[data-row-key="0-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(3).contains('Autosomal recessive, X-linked recessive').should('exist');
    cy.get('[data-row-key*="1-s-l-x-4-613278"]').find('td[class="ant-table-cell"]').eq(0).contains('OMIM').should('exist');
    cy.get('[data-row-key*="1-s-l-x-4-613278"]').find('td[class="ant-table-cell"]').eq(1).contains('SLX4 (MIM:').should('exist');
    cy.get('[data-row-key*="1-s-l-x-4-613278"]').find('td[class="ant-table-cell"]').eq(2).contains('Fanconi Anemia, Complementation Group P').should('exist');
    cy.get('[data-row-key*="1-s-l-x-4-613278"]').find('td[class="ant-table-cell"]').eq(3).contains('Autosomal recessive').should('exist');
    cy.get('[data-row-key*="2-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(0).contains('HPO').should('exist');
    cy.get('[data-row-key*="2-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(1).contains('SLX4').should('exist');
    cy.get('[data-row-key*="2-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(2).contains('Toe Syndactyly').should('exist');
    cy.get('[data-row-key*="2-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key*="3-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(0).contains('DDD').should('exist');
    cy.get('[data-row-key*="3-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(1).contains('SLX4').should('exist');
    cy.get('[data-row-key*="3-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(2).contains('FANCONI ANEMIA COMPLEMENTATION GROUP P').should('exist');
    cy.get('[data-row-key*="3-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
  });
});

describe('Page d\'un variant - Valider les liens disponibles', () => {
  it('Lien Genes du panneau Summary', () => {
    cy.get('[data-cy="Summary_Gene_ExternalLink"]')
      .should('have.attr', 'href', 'https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=SLX4');
  });

  it('Lien Omim du panneau Summary', () => {
    cy.get('[data-cy="Summary_OMIM_ExternalLink"]')
    .should('have.attr', 'href', 'https://omim.org/entry/613278');
  });

  it('Lien ClinVar du panneau Summary', () => {
    cy.get('[data-cy="Summary_ClinVar_ExternalLink"]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/319184');
  });

  it('Lien dbSNP du panneau Summary', () => {
    cy.get('[data-cy="Summary_dbSNP_ExternalLink"]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs148547201');
  });

  it('Lien du gène du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').find('[href]').eq(0)
    .should('have.attr', 'href', 'https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=SLX4');
  });

  it('Lien Omim du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').find('[href]').eq(1)
    .should('have.attr', 'href', 'https://omim.org/entry/613278');
  });
  
  it('Lien ENST du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(7).find('[href]')
    .should('have.attr', 'href', 'https://www.ensembl.org/id/ENST00000294008');
  });

  it('Lien RefSeq du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(8).find('[href]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/nuccore/NM_032444?report=graph');
  });

  it('Lien \'2 other transcripts\' du panneau Gene Consequences [CQDG-135]', () => {
    cy.get('[id="consequence"]').contains('2 other transcripts +').click({force: true});
    cy.get('[id="consequence"]').find('tr[class*="ant-table-row"]').eq(1).should('exist');
    cy.get('[id="consequence"]').contains('Show less -').click({force: true});
    cy.get('[id="consequence"]').find('tr[class*="ant-table-row"]').eq(1).should('not.exist');
  });

  it('Lien TopMed du panneau Public Cohort', () => {
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(0).find('[href]').should('have.attr', 'href', 'https://bravo.sph.umich.edu/freeze8/hg38/variant/snv/16-3606492-C-T');
  });

  it('Lien gnomAD Genome (v3.1.1) du panneau Public Cohort', () => {
    cy.get('[data-row-key="gnomadGenomes3_1_1"]').find('td[class="ant-table-cell"]').eq(0).find('[href]')
    .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/variant/16-3606492-C-T?dataset=gnomad_r3');
  });
  
  it('Lien ClinVar du panneau ClinVar', () => {
    cy.get('[data-cy="Pathogenicity_ClinVar_319184_ExternalLink"]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/319184');
  });
  
  it('Lien de la condition Orphanet du panneau Gene - Phenotype', () => {
    cy.get('[data-row-key="0-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(2).find('[href]')
    .should('have.attr', 'href', 'https://www.orpha.net/consor/cgi-bin/Disease_Search.php?lng=EN&data_id=634');
  });
  
  it('Lien OMIM du gène du panneau Gene - Phenotype', () => {
    cy.get('[data-row-key*="1-s-l-x-4-613278"]').find('td[class="ant-table-cell"]').eq(1).find('[href]')
    .should('have.attr', 'href', 'https://www.omim.org/entry/613278');
  });
  
  it('Lien OMIM de la condition du panneau Gene - Phenotype', () => {
    cy.get('[data-row-key*="1-s-l-x-4-613278"]').find('td[class="ant-table-cell"]').eq(2).find('[href]').first()
    .should('have.attr', 'href', 'https://www.omim.org/entry/613951');
  });
  
  it('Lien HPO de la condition du panneau Gene - Phenotype', () => {
    cy.get('[data-row-key*="2-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(2).find('[href]').eq(0)
    .should('have.attr', 'href', 'https://hpo.jax.org/app/browse/term/HP:0001770');
  });

  it('Lien \'See more\' de la condition du panneau Gene - Phenotype', () => {
    cy.get('[data-row-key="2-s-l-x-4"]').contains('See more').click({force: true});
    cy.get('[data-row-key="2-s-l-x-4"]').contains('Leukopenia').should('exist');
    cy.get('[data-row-key="2-s-l-x-4"]').contains('See less').click({force: true});
    cy.get('[data-row-key="2-s-l-x-4"]').contains('Leukopenia').should('not.exist');
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
