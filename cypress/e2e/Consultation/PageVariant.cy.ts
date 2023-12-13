/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantEntityPage('1-114693436-G-A', 1);
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
    cy.get('[class*="EntityTitle"]').contains('chr1:g.114693436G>A');
    cy.get('[class*="EntityTitle"]').contains('Germline');
    cy.get('[class*="EntityTitle"]').find('[class*="variantTag"]').should('exist');
  });
  
  it('Panneau Summary', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains('1');
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains('Study');
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains('2');
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains('Participants');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Variant').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('chr1:g.114693436G>A').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Type').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('SNV').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Cytoband').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('1p13.2').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('Reference Genome').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('GRCh38').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(4).contains('Sources').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('WGS').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).find('[class*="ant-tag-purple"]').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(5).contains('Genes').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('AMPD1').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('RN7SL432P').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(6).contains('OMIM').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(6).contains('102770').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(7).contains('Pathogenicity (ClinVar)').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(7).contains('Conflicting Interpretations Of Pathogenicity').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(7).find('[class="ant-tag"]').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(8).contains('gnomAD Genome (v3.1.2)').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(8).contains('8.50e-2').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(9).contains('CQDG Studies').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(9).contains('3.33e-1').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(10).contains('ClinVar').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(10).contains('18271').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(11).contains('dbSNP').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(11).contains('rs17602729').should('exist');
  });
  
  it('Panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('AMPD1').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('Omim').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('102770').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('Protein Coding').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('SpliceAI').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains(/^0.06$/).should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('gnomAD pLI').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('1.9099e-21').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('gnomAD LOEUF').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').contains('1.202').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('AA').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('p.Gln12Ter').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Consequence').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('Stop gained').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('Splice region').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Coding DNA').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('c.34C>T').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Strand').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).contains(/^-1$/).should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('VEP').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).contains('HIGH').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).find('[class*="ant-tag-red"]').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('Predictions').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('Cadd:').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('7.474317').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('Dann:').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('0.99660861544519').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(6).contains('Conservation').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(6).contains('0.676').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(7).contains('Transcript').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(7).contains('ENST00000520113').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(7).find('svg[class*="anticon"]').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(8).contains('RefSeq').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(8).contains('NM_000036.3').should('exist');
    cy.get('[id="consequence"]').contains('4 other transcripts +').should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').eq(0).find('tr[class*="ant-table-row"]').eq(1).should('not.exist');
  });
  
  it('Panneau Frequency', () => {
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Studies').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Domain').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Participants').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Frequency').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('# ALT Alleles').should('exist');
    cy.get('[id="frequencies"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('# Homozygotes').should('exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('STUDY1').should('exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('Rare Diseases').should('exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('2 / 3').should('exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).find('[href]').should('not.exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).contains('3.33e-1').should('exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).contains('2').should('exist');
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('0').should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(1).contains(/^$/).should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(2).contains('2 / 3').should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(3).contains('6.67e-1').should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(4).contains('2').should('exist');
    cy.get('[id="frequencies"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(5).contains('0').should('exist');
  });
  
  it('Panneau Public Cohorts', () => {
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Cohort').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('# ALT Alleles').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('# Alleles (ALT + REF)').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('# Homozygotes').should('exist');
    cy.get('[id="EntityPublicCohortTable"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Frequency').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(1).contains('10.1K').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(2).contains('126K').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(3).contains('583').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(4).contains('8.07e-2').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(1).contains('12.9K').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(2).contains('152K').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(3).contains('761').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(4).contains('8.50e-2').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(1).contains('3,004').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(2).contains('31.2K').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(3).contains('199').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(4).contains('9.62e-2').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(1).contains('21.6K').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(2).contains('251K').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(3).contains('1,271').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(4).contains('8.60e-2').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(1).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(2).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(4).contains('-').should('exist');
  });
  
  it('Panneau ClinVar', () => {
    cy.get('[id="pathogenicity"]').find('div[class="ant-collapse-header"]').contains('18271').should('exist');
    cy.get('[id="pathogenicity"]').find('div[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="pathogenicity"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Interpretation').should('exist');
    cy.get('[id="pathogenicity"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Condition').should('exist');
    cy.get('[id="pathogenicity"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Inheritance').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('Conflicting Interpretations Of Pathogenicity').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('not specified').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(0).contains('Conflicting Interpretations Of Pathogenicity').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains('not provided').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(0).contains('Conflicting Interpretations Of Pathogenicity').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(1).contains('Muscle AMP deaminase deficiency').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(2).find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
  });
  
  it('Panneau Gene - Phenotype', () => {
    cy.get('[id="genePhenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Source').should('exist');
    cy.get('[id="genePhenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Gene').should('exist');
    cy.get('[id="genePhenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Condition').should('exist');
    cy.get('[id="genePhenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Inheritance').should('exist');
    cy.get('[data-row-key="0-a-m-p-d-1"]').find('td[class="ant-table-cell"]').eq(0).contains('Orphanet').should('exist');
    cy.get('[data-row-key="0-a-m-p-d-1"]').find('td[class="ant-table-cell"]').eq(1).contains('AMPD1').should('exist');
    cy.get('[data-row-key="0-a-m-p-d-1"]').find('td[class="ant-table-cell"]').eq(2).contains('Adenosine Monophosphate Deaminase Deficiency').should('exist');
    cy.get('[data-row-key="0-a-m-p-d-1"]').find('td[class="ant-table-cell"]').eq(3).contains('Autosomal recessive').should('exist');
    cy.get('[data-row-key="1-a-m-p-d-1-102770"]').find('td[class="ant-table-cell"]').eq(0).contains('OMIM').should('exist');
    cy.get('[data-row-key="1-a-m-p-d-1-102770"]').find('td[class="ant-table-cell"]').eq(1).contains('AMPD1').should('exist');
    cy.get('[data-row-key="1-a-m-p-d-1-102770"]').find('td[class="ant-table-cell"]').eq(1).contains('102770').should('exist');
    cy.get('[data-row-key="1-a-m-p-d-1-102770"]').find('td[class="ant-table-cell"]').eq(2).contains('Myopathy Due To Myoadenylate Deaminase Deficiency').should('exist');
    cy.get('[data-row-key="1-a-m-p-d-1-102770"]').find('td[class="ant-table-cell"]').eq(2).contains('615511').should('exist');
    cy.get('[data-row-key="1-a-m-p-d-1-102770"]').find('td[class="ant-table-cell"]').eq(3).contains('Autosomal recessive').should('exist');
    cy.get('[data-row-key="2-a-m-p-d-1"]').find('td[class="ant-table-cell"]').eq(0).contains('HPO').should('exist');
    cy.get('[data-row-key="2-a-m-p-d-1"]').find('td[class="ant-table-cell"]').eq(1).contains('AMPD1').should('exist');
    cy.get('[data-row-key="2-a-m-p-d-1"]').find('td[class="ant-table-cell"]').eq(2).contains('Skeletal Muscle Atrophy').should('exist');
    cy.get('[data-row-key="2-a-m-p-d-1"]').find('td[class="ant-table-cell"]').eq(2).contains('HP:0003202').should('exist');
    cy.get('[data-row-key="2-a-m-p-d-1"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
  });
});

describe('Page d\'un variant - Valider les liens disponibles', () => {
  it('Lien Genes du panneau Summary', () => {
    cy.get('[data-cy="Summary_Gene_ExternalLink"]')
      .should('have.attr', 'href', 'https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=AMPD1');
  });

  it('Lien Omim du panneau Summary', () => {
    cy.get('[data-cy="Summary_OMIM_ExternalLink"]')
    .should('have.attr', 'href', 'https://omim.org/entry/102770');
  });

  it('Lien ClinVar du panneau Summary', () => {
    cy.get('[data-cy="Summary_ClinVar_ExternalLink"]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/18271');
  });

  it('Lien dbSNP du panneau Summary', () => {
    cy.get('[data-cy="Summary_dbSNP_ExternalLink"]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs17602729');
  });

  it('Lien du gène du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').find('[href]').eq(0)
    .should('have.attr', 'href', 'https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=AMPD1');
  });

  it('Lien Omim du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityGeneConsequenceSubtitle_wrapper"]').find('[href]').eq(1)
    .should('have.attr', 'href', 'https://omim.org/entry/102770');
  });
  
  it('Lien ENST du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(7).find('[href]')
    .should('have.attr', 'href', 'https://www.ensembl.org/id/ENST00000520113');
  });

  it('Lien RefSeq du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(8).find('[href]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/nuccore/NM_000036.3?report=graph');
  });

  it('Lien \'4 other transcripts\' du panneau Gene Consequences', () => {
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').eq(0).contains('4 other transcripts +').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').eq(0).find('tr[class*="ant-table-row"]').eq(1).should('exist');
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').eq(0).contains('Show less -').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="EntityTable_contentTable"]').eq(0).find('tr[class*="ant-table-row"]').eq(1).should('not.exist');
  });

  it('Lien Studies du panneau CQDG Studies', () => {
    cy.get('[id="frequencies"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('STUDY1').should('exist');
  });

  it('Lien TopMed du panneau Public Cohort', () => {
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(0).find('[href]').should('have.attr', 'href', 'https://bravo.sph.umich.edu/freeze8/hg38/variant/snv/1-114693436-G-A');
  });

  it('Lien gnomAD Genome (v3.1.2) du panneau Public Cohort', () => {
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(0).find('[href]')
    .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/variant/1-114693436-G-A?dataset=gnomad_r3');
  });
  
  it('Lien ClinVar du panneau ClinVar', () => {
    cy.get('[data-cy="Pathogenicity_ClinVar_18271_ExternalLink"]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/18271');
  });
  
  it('Lien de la condition Orphanet du panneau Gene - Phenotype', () => {
    cy.get('[data-row-key="0-a-m-p-d-1"]').find('td[class="ant-table-cell"]').eq(2).find('[href]')
    .should('have.attr', 'href', 'https://www.orpha.net/consor/cgi-bin/Disease_Search.php?lng=EN&data_id=458');
  });
  
  it('Lien OMIM du Gene du panneau Gene - Phenotype', () => {
    cy.get('[data-row-key="1-a-m-p-d-1-102770"]').find('td[class="ant-table-cell"]').eq(1).find('[href]').eq(0)
    .should('have.attr', 'href', 'https://www.omim.org/entry/102770');
  });
  
  it('Lien OMIM de la condition du panneau Gene - Phenotype', () => {
    cy.get('[data-row-key="1-a-m-p-d-1-102770"]').find('td[class="ant-table-cell"]').eq(2).find('[href]').eq(0)
    .should('have.attr', 'href', 'https://www.omim.org/entry/615511');
  });
  
  it('Lien HPO de la condition du panneau Gene - Phenotype', () => {
    cy.get('[data-row-key="2-a-m-p-d-1"]').find('td[class="ant-table-cell"]').eq(2).find('[href]').eq(0)
    .should('have.attr', 'href', 'https://hpo.jax.org/app/browse/term/HP:0003202');
  });

  it('Lien \'See more\' de la condition du panneau Gene - Phenotype', () => {
    cy.get('[data-row-key="2-a-m-p-d-1"]').contains('See more').click({force: true});
    cy.get('[data-row-key="2-a-m-p-d-1"]').contains('Myopathy').should('exist');
    cy.get('[data-row-key="2-a-m-p-d-1"]').contains('See less').click({force: true});
    cy.get('[data-row-key="2-a-m-p-d-1"]').contains('Myopathy').should('not.exist');
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
