/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantEntityPage('1-156176849-G-A', 1);
});

describe('Page d\'un variant - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('chr1:g.156176849G>A');
    cy.get('[class*="EntityTitle"]').contains('GRCh38');
    cy.get('[class*="EntityTitle"]').find('[class="ant-tag"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('Germline');
    cy.get('[class*="EntityTitle"]').find('[class*="variantTag"]').should('exist');
  });

  it('Panneau Summary', () => {
    // Banner
    cy.get('a[class*="VariantEntity_symbolLink"]').eq(0).contains('SEMA4A').should('exist');
    cy.get('a[class*="VariantEntity_ensemblLink"]').eq(0).contains('Ensembl').should('exist');
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"]').find('[class="ant-space-item"]').eq(3).contains('p.Arg713Gln').should('exist');
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"]').find('[class="ant-space-item"]').eq(4).contains('Consequence').should('exist');
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"]').find('[class="ant-space-item"]').eq(5).find('svg[class*="Cell_moderateImpact"]').should('exist');
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"]').find('[class="ant-space-item"]').eq(5).contains('Missense').should('exist');
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"]').find('[class="ant-space-item"]').eq(6).contains('ClinVar').should('exist');
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"]').find('[class="ant-space-item"]').eq(7).find('[class*="ant-tag-green"]').contains('Benign').should('exist');
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"]').find('[class="ant-space-item"]').eq(7).find('[class*="ant-tag-lime"]').contains('Likely Benign').should('exist');
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"]').find('[class="ant-space-item"]').eq(10).contains('Participants').should('exist');
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"]').find('[class="ant-space-item"]').eq(11).contains('1 / 6(1.67e-1)').should('exist');
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"]').find('[class="ant-space-item"]').eq(12).contains('gnomAD').should('exist');
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"]').find('[class="ant-space-item"]').eq(13).contains('3.26e-2').should('exist');
    // Info
    cy.get('div[class*="EntityVariantSummary_infoWrapper"]').find('div[class*="ant-space-horizontal"]').eq(0).contains('ENST00000368285').should('exist');
    cy.get('div[class*="EntityVariantSummary_infoWrapper"]').find('svg[class*="VariantEntity_canonicalIcon"]').should('exist');
    cy.get('div[class*="EntityVariantSummary_infoWrapper"]').find('div[class*="ant-space-horizontal"]').eq(2).contains('NM_022367.4').should('exist');
    cy.get('div[class*="EntityVariantSummary_infoWrapper"]').contains('See more').should('exist');
    cy.get('div[class*="EntityVariantSummary_infoWrapper"]').find('[class*="ant-typography"]').eq(0).contains('c.2138G>A').should('exist');
    cy.get('div[class*="EntityVariantSummary_infoWrapper"]').find('div[class*="ant-space-horizontal"]').eq(3).contains('rs41265017').should('exist');
    // Details
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="VariantEntity_functionalScores"]').eq(0).contains('Functional Scores').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-label"]').eq(0).contains('SIFT').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-content"]').eq(0).contains('Tolerated').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-content"]').eq(0).contains('0.298').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-label"]').eq(1).contains('FATHMM').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-content"]').eq(1).contains('Tolerated').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-content"]').eq(1).contains('-1.41').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-label"]').eq(2).contains('CADD (Raw)').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-content"]').eq(2).contains('2.591949').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-label"]').eq(3).contains('CADD (Phred)').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-content"]').eq(3).contains('22.6').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-label"]').eq(4).contains('DANN').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-content"]').eq(4).contains('0.9805721474226299').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-label"]').eq(5).contains('LRT').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-content"]').eq(5).contains('Neutral').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-content"]').eq(5).contains('0.52363').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-label"]').eq(6).contains('REVEL').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-content"]').eq(6).contains('0.238').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-label"]').eq(7).contains('PolyPhen-2 HVAR').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-content"]').eq(7).contains('Benign').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-content"]').eq(7).contains('0.024').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-label"]').eq(8).contains('PhyloP17Way').should('exist');
    cy.get('div[class*="EntityVariantSummary_score"]').find('[class*="ant-descriptions-item-content"]').eq(8).contains('0.616').should('exist');
    cy.get('div[class*="EntityVariantSummary_geneSplice"]').find('[class*="EntityVariantSummary_detailsTitle"]').eq(0).contains('Gene Constraints').should('exist');
    cy.get('div[class*="EntityVariantSummary_geneSplice"]').find('[class*="ant-descriptions-item-label"]').eq(0).contains('pLI').should('exist');
    cy.get('div[class*="EntityVariantSummary_geneSplice"]').find('[class*="ant-descriptions-item-content"]').eq(0).contains('0.000018394').should('exist');
    cy.get('div[class*="EntityVariantSummary_geneSplice"]').find('[class*="ant-descriptions-item-label"]').eq(1).contains('LOEUF').should('exist');
    cy.get('div[class*="EntityVariantSummary_geneSplice"]').find('[class*="ant-descriptions-item-content"]').eq(1).contains('0.641').should('exist');
    cy.get('div[class*="EntityVariantSummary_geneSplice"]').find('[class*="EntityVariantSummary_detailsTitle"]').eq(1).contains('Splice Altering').should('exist');
    cy.get('div[class*="EntityVariantSummary_geneSplice"]').find('[class*="ant-descriptions-item-label"]').eq(2).contains('SpliceAI').should('exist');
    cy.get('div[class*="EntityVariantSummary_geneSplice"]').find('[class*="ant-descriptions-item-content"]').eq(2).contains('0.02').should('exist');
    cy.get('div[class*="EntityVariantSummary_geneSplice"]').find('[class*="ant-descriptions-item-content"]').eq(2).find('[class="ant-tag"]').contains('AL').should('exist');
    cy.get('div[class*="EntityVariantSummary_omim"]').find('[class*="EntityVariantSummary_detailsTitle"]').eq(0).contains('Associated Conditions (OMIM)').should('exist');
    cy.get('div[class*="EntityVariantSummary_omim"]').find('[class*="ant-descriptions-item-content"]').eq(0).contains('Retinitis pigmentosa 35').should('exist');
    cy.get('div[class*="EntityVariantSummary_omim"]').find('[class*="ant-descriptions-item-content"]').eq(0).find('[class*="ant-tag-blue"]').contains('AD').should('exist');
    cy.get('div[class*="EntityVariantSummary_omim"]').find('[class*="ant-descriptions-item-content"]').eq(0).find('[class*="ant-tag-blue"]').contains('AR').should('exist');
  });

  it('Panneau Transcripts', () => {
    cy.get('[id="consequence"]').find('h4[class*="EntityNestedTable_title"]').eq(0).contains('Consequence').should('exist');
    cy.get('[id="consequence"]').find('[class*="ant-collapse-header-text"]').find('div[class*="ant-space-item"]').eq(0).contains('Transcripts').should('exist');
    // Main table
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Gene').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Gene Type').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('pLI').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('LOEUF').should('exist');
    cy.get('[id="consequence"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('SpliceAI').should('exist');
    cy.get('[id="consequence"]').find('tbody').find('td[class="ant-table-cell"]').eq(0).contains('SEMA4A').should('exist');
    cy.get('[id="consequence"]').find('tbody').find('td[class="ant-table-cell"]').eq(0).find('[class*="VariantEntity_pickedIcon"]').should('exist');
    cy.get('[id="consequence"]').find('tbody').find('td[class="ant-table-cell"]').eq(1).contains('Protein Coding').should('exist');
    cy.get('[id="consequence"]').find('tbody').find('td[class="ant-table-cell"]').eq(2).contains('1.84e-5').should('exist');
    cy.get('[id="consequence"]').find('tbody').find('td[class="ant-table-cell"]').eq(3).contains('0.641').should('exist');
    cy.get('[id="consequence"]').find('tbody').find('td[class="ant-table-cell"]').eq(4).contains('0.02').should('exist');
    cy.get('[id="consequence"]').find('tbody').find('td[class="ant-table-cell"]').eq(4).find('[class="ant-tag"]').contains('AL').should('exist');
    // Nested table
    cy.get('[id="consequence"]').find('tbody').find('td[class*="ant-table-row-expand-icon-cell"]').eq(0).find('button').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('AA').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Consequence').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Coding DNA').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Prediction').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Conservation').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('Transcripts').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('thead').find('th[class="ant-table-cell"]').eq(6).contains('RefSeq').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(0).contains('p.Arg713Gln').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(1).find('svg[class*="Cell_moderateImpact"]').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(1).contains('Missense').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(2).contains('c.2138G>A').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(0).contains('SIFT').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(1).contains('Tolerated ').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(1).contains('0.298').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(2).contains('FATHMM').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(3).contains('Tolerated').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(3).contains('-1.41').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(3).find('[class*="ExpandableCell_fuiExpandableCellBtn"]').contains('See more').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(4).contains('PhyloP17Way').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(4).contains('0.616').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(5).contains('ENST00000368285').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(5).find('svg[class*="VariantEntity_canonicalIcon"]').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(6).contains('NM_022367.4').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class="ant-table-cell"]').eq(6).contains('See more').should('exist');
  });

  it('Panneau CQDG Studies', () => {
    cy.get('[id="frequency"]').find('h4[class*="EntityTable_title"]').eq(0).contains('Frequency (only WGS)').should('exist');
    cy.get('[id="frequency"]').find('[class*="ant-collapse-header-text"]').find('div[class*="ant-space-item"]').eq(0).contains('CQDG Studies').should('exist');
    cy.get('[id="frequency"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Studies').should('exist');
    cy.get('[id="frequency"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Domain').should('exist');
    cy.get('[id="frequency"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Participants').should('exist');
    cy.get('[id="frequency"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Frequency').should('exist');
    cy.get('[id="frequency"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('# ALT Alleles').should('exist');
    cy.get('[id="frequency"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('# Homozygotes').should('exist');
    cy.get('[id="frequency"]').find('[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).contains('STUDY1').should('exist');
    cy.get('[id="frequency"]').find('[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('Rare Diseases').should('exist');
    cy.get('[id="frequency"]').find('[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(2).contains('1 / 6').should('exist');
    cy.get('[id="frequency"]').find('[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(3).contains('8.33e-2').should('exist');
    cy.get('[id="frequency"]').find('[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(4).contains('1').should('exist');
    cy.get('[id="frequency"]').find('[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(5).contains('0').should('exist');
    cy.get('[id="frequency"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(1).contains(/$^/).should('exist');
    cy.get('[id="frequency"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(2).contains('1 / 6').should('exist');
    cy.get('[id="frequency"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(3).contains('1.67e-1').should('exist');
    cy.get('[id="frequency"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(4).contains('1').should('exist');
    cy.get('[id="frequency"]').find('tfoot[class="ant-table-summary"]').find('td[class*="ant-table-cell"]').eq(5).contains('0').should('exist');
  });

  it('Panneau Public Cohorts', () => {
    cy.get('[class*="EntityTable_container"]').eq(1).find('[class*="ant-collapse-header-text"]').find('div[class*="ant-space-item"]').eq(0).contains('Public Cohorts').should('exist');
    cy.get('[class*="EntityTable_container"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Cohort').should('exist');
    cy.get('[class*="EntityTable_container"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(1).contains('# ALT Alleles').should('exist');
    cy.get('[class*="EntityTable_container"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(2).contains('# Alleles (ALT + REF)').should('exist');
    cy.get('[class*="EntityTable_container"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(3).contains('# Homozygotes').should('exist');
    cy.get('[class*="EntityTable_container"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Frequency').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(1).contains('3,926').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(2).contains('126K').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(3).contains('89').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(4).contains('3.13e-2').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(1).contains('4,955').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(2).contains('152K').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(3).contains('132').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(4).contains('3.26e-2').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(1).contains('919').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(2).contains('31.4K').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(3).contains('20').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(4).contains('2.93e-2').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(1).contains('9,405').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(2).contains('251K').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(3).contains('279').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(4).contains('3.74e-2').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(1).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(2).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(4).contains('-').should('exist');
  });

  it('Panneau ClinVar', () => {
    cy.get('[id="pathogenicity"]').find('h4[class*="EntityTable_title"]').eq(0).contains('Pathogenicity').should('exist');
    cy.get('[id="pathogenicity"]').find('[class*="ant-collapse-header-text"]').contains('ClinVar').should('exist');
    cy.get('[id="pathogenicity"]').find('[class*="ant-collapse-header-text"]').contains('3362').should('exist');
    cy.get('[id="pathogenicity"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Interpretation').should('exist');
    cy.get('[id="pathogenicity"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Condition').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).find('[class*="ant-tag-green"]').contains('Benign').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).contains('Retinitis Pigmentosa Recessive').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(1).find('[class*="ColorTag_default"]').contains('GER').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(0).find('[class*="ant-tag-green"]').contains('Benign').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains('Not provided').should('exist');
    cy.get('[id="pathogenicity"]').find('tr[class*="ant-table-row"]').eq(1).find('td[class="ant-table-cell"]').eq(1).find('[class*="ColorTag_default"]').contains('GER').should('exist');
  });

  it('Panneau Gene - Phenotype Association', () => {
    cy.get('[id="condition"]').find('h4[class*="EntityTable_title"]').eq(0).contains('Condition').should('exist');
    cy.get('[id="condition"]').find('[class*="ant-collapse-header-text"]').contains('Gene - Phenotype Association').should('exist');
    cy.get('[id="condition"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Source').should('exist');
    cy.get('[id="condition"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Gene').should('exist');
    cy.get('[id="condition"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Condition').should('exist');
    cy.get('[data-row-key="0-s-e-m-a-4-a"]').find('td[class="ant-table-cell"]').eq(0).contains('Orphanet').should('exist');
    cy.get('[data-row-key="0-s-e-m-a-4-a"]').find('td[class="ant-table-cell"]').eq(1).contains('SEMA4A').should('exist');
    cy.get('[data-row-key="0-s-e-m-a-4-a"]').find('td[class="ant-table-cell"]').eq(2).contains('Familial Colorectal Cancer Type X').should('exist');
    cy.get('[data-row-key="0-s-e-m-a-4-a"]').find('td[class="ant-table-cell"]').eq(2).find('[class*="ColorTag_default"]').contains('AD').should('exist');
    cy.get('[data-row-key="1-s-e-m-a-4-a-607292"]').find('td[class="ant-table-cell"]').eq(0).contains('OMIM').should('exist');
    cy.get('[data-row-key="1-s-e-m-a-4-a-607292"]').find('td[class="ant-table-cell"]').eq(1).contains('SEMA4A (MIM:').should('exist');
    cy.get('[data-row-key="1-s-e-m-a-4-a-607292"]').find('td[class="ant-table-cell"]').eq(2).contains('Retinitis Pigmentosa 35 (MIM:').should('exist');
    cy.get('[data-row-key="1-s-e-m-a-4-a-607292"]').find('td[class="ant-table-cell"]').eq(2).find('[class*="ColorTag_default"]').contains('AD').should('exist');
    cy.get('[data-row-key="1-s-e-m-a-4-a-607292"]').find('td[class="ant-table-cell"]').eq(2).find('[class*="ColorTag_default"]').contains('AR').should('exist');
    cy.get('[data-row-key="2-s-e-m-a-4-a"]').find('td[class="ant-table-cell"]').eq(0).contains('HPO').should('exist');
    cy.get('[data-row-key="2-s-e-m-a-4-a"]').find('td[class="ant-table-cell"]').eq(1).contains('SEMA4A').should('exist');
    cy.get('[data-row-key="2-s-e-m-a-4-a"]').find('td[class="ant-table-cell"]').eq(2).contains('Cataract').should('exist');
    cy.get('[data-row-key="2-s-e-m-a-4-a"]').find('td[class="ant-table-cell"]').eq(2).contains('See more').should('exist');
  });
});

describe('Page d\'un variant - Valider les liens disponibles', () => {
  it('Lien Gene du panneau Summary', () => {
    // data-cy="Summary_Gene_ExternalLink"
    cy.get('a[class*="VariantEntity_symbolLink"]').eq(0).should('have.attr', 'href', 'https://omim.org/entry/607292');
  });

  it('Lien Ensembl du panneau Summary', () => {
    // data-cy="Summary_Ensembl_ExternalLink"
    cy.get('a[class*="VariantEntity_ensemblLink"]').eq(0).should('have.attr', 'href', 'https://www.ensembl.org/id/ENST00000368285');
  });

  it('Lien ClinVar du panneau Summary', () => {
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"]').find('[class="ant-space-item"]').eq(7).find('[class*="ant-tag-green"]').find('a') // data-cy="Summary_ClinVar_ExternalLink"
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/3362');
  });

  it('Lien gnomAD du panneau Summary', () => {
    cy.get('div[class*="EntityVariantSummary_bannerWrapper"]').find('[class="ant-space-item"]').eq(13).find('a') // data-cy="Summary_gnomAD_ExternalLink"
    .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/variant/1-156176849-G-A?dataset=gnomad_r3');
  });

  it('Lien Ensembl Transcript du panneau Summary', () => {
    cy.get('div[class*="EntityVariantSummary_infoWrapper"] a').eq(0) // data-cy="Summary_Ensembl_Transcript_ExternalLink"
    .should('have.attr', 'href', 'https://www.ensembl.org/id/ENST00000368285');
  });

  it('Lien RefSeq du panneau Summary', () => {
    cy.get('div[class*="EntityVariantSummary_infoWrapper"] a').eq(1)
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/nuccore/NM_022367.4?report=graph');
  });

  it('Popover \'See more\' du RefSeq du panneau Summary', () => {
    cy.get('div[class*="EntityVariantSummary_infoWrapper"] button').click({force: true});
    cy.get('[class="ant-popover-title"]').contains('RefSeq - ENST00000368285').should('exist');
    cy.get('[class="ant-popover-inner-content"] a')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/nuccore/NM_001193300.2?report=graph')
    .contains('NM_001193300.2').should('exist');
  });

  it('Lien dbSNP du panneau Summary', () => {
    cy.get('div[class*="EntityVariantSummary_infoWrapper"] a').eq(2) // data-cy="Summary_sbSNP_ExternalLink"
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs41265017');
  });

  it('Lien OMIM du panneau Summary', () => {
    cy.get('div[class*="EntityVariantSummary_omim"]').find('[class*="ant-descriptions-item-content"]').eq(0).find('a') // data-cy="Summary_Omim_ExternalLink"
    .should('have.attr', 'href', 'https://www.omim.org/entry/610282');
  });

  it('Ouvrir et refermer la nested table du panneau Transcripts', () => {
    cy.get('[id="consequence"]').find('tbody').find('td[class*="ant-table-row-expand-icon-cell"]').eq(0).find('button').click({force: true});
    cy.get('[id="consequence"]').find('tr[class*="ant-table-expanded-row"]').eq(0).should('have.css', 'display', 'table-row');
    cy.get('[id="consequence"]').find('tbody').find('td[class*="ant-table-row-expand-icon-cell"]').eq(0).find('button').click({force: true});
    cy.get('[id="consequence"]').find('tr[class*="ant-table-expanded-row"]').eq(0).should('have.css', 'display', 'none');
  });

  it('Lien du gène du panneau Transcripts', () => {
    cy.get('[id="consequence"]').find('tbody').find('td[class="ant-table-cell"]').eq(0).find('[href]').eq(0).should('have.attr', 'href', 'https://www.omim.org/entry/607292');
  });

  it('Lien \'See more\' de Predictions du panneau Transcripts', () => {
    cy.get('[id="consequence"]').find('tbody').find('td[class*="ant-table-row-expand-icon-cell"]').eq(0).find('button').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('[class*="ExpandableCell_fuiExpandableCellBtn"]').contains('See more').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(4).contains('CADD (Raw)').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(5).contains('2.591949').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(6).contains('CADD (Phred)').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(7).contains('22.6').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(8).contains('DANN').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(9).contains('0.9805721474226299').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(10).contains('LRT').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(11).contains('Neutral').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(11).contains('0.52363').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(12).contains('REVEL').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(13).contains('0.238').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(14).contains('PolyPhen-2 HVAR').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(15).contains('Benign').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(15).contains('0.024').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('[class*="ExpandableCell_fuiExpandableCellBtn"]').contains('See less').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(3).find('span[class*="ant-typography"]').eq(4).should('not.exist');
  });
  
  it('Lien du transcript du panneau Transcripts', () => {
    cy.get('[id="consequence"]').find('tbody').find('td[class*="ant-table-row-expand-icon-cell"]').eq(0).find('button').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(5).find('a').should('have.attr', 'href', 'https://www.ensembl.org/id/ENST00000368285');
  });
  
  it('Lien du RefSeq du panneau Transcripts', () => {
    cy.get('[id="consequence"]').find('tbody').find('td[class*="ant-table-row-expand-icon-cell"]').eq(0).find('button').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(6).find('a').should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/nuccore/NM_022367.4?report=graph');
  });

  it('Lien \'See more\' de RefSeq du panneau Transcripts', () => {
    cy.get('[id="consequence"]').find('tbody').find('td[class*="ant-table-row-expand-icon-cell"]').eq(0).find('button').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(6).find('[class*="ExpandableCell_fuiExpandableCellBtn"]').contains('See more').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(6).find('[class*="ant-space-item"]').eq(1).contains('NM_001193300.2').should('exist');
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(6).find('[class*="ExpandableCell_fuiExpandableCellBtn"]').contains('See less').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="VariantEntity_expandedTable"]').find('tbody').find('td[class*="ant-table-cell"]').eq(6).find('[class*="ant-space-item"]').eq(1).should('not.exist');
  });

  it('Lien Studies du panneau CQDG Studies', () => {
    cy.get('[id="frequency"]').find('tr[class*="ant-table-row"]').eq(0).find('td[class="ant-table-cell"]').eq(0).find('a').click({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('STUDY1').should('exist');
  });

  it('Lien TopMed du panneau Public Cohorts', () => {
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(0).find('[href]')
    .should('have.attr', 'href', 'https://bravo.sph.umich.edu/freeze8/hg38/variant/snv/1-156176849-G-A');
  });

  it('Lien gnomAD Genome (v3.1.2) du panneau Public Cohorts', () => {
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(0).find('[href]')
    .should('have.attr', 'href', 'https://gnomad.broadinstitute.org/variant/1-156176849-G-A?dataset=gnomad_r3');
  });

  it('Lien ClinVar du panneau ClinVar', () => {
    cy.get('[id="pathogenicity"]').find('div[class="ant-collapse-header"]').find('[href]') // data-cy="Pathogenicity_ClinVar_3362_ExternalLink"
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/3362');
  });

  it('Lien de la condition Orphanet du panneau Gene - Phenotype Association', () => {
    cy.get('[data-row-key="0-s-e-m-a-4-a"]').find('td[class="ant-table-cell"]').eq(2).find('[href]')
    .should('have.attr', 'href', 'https://www.orpha.net/consor/cgi-bin/Disease_Search.php?lng=EN&data_id=23409');
  });

  it('Lien OMIM du gène du panneau Gene - Phenotype Association', () => {
    cy.get('[data-row-key*="1-s-e-m-a-4-a-607292"]').find('td[class="ant-table-cell"]').eq(1).find('[href]')
    .should('have.attr', 'href', 'https://www.omim.org/entry/607292');
  });

  it('Lien OMIM de la condition du panneau Gene - Phenotype Association', () => {
    cy.get('[data-row-key*="1-s-e-m-a-4-a-607292"]').find('td[class="ant-table-cell"]').eq(2).find('[href]').first()
    .should('have.attr', 'href', 'https://www.omim.org/entry/610282');
  });

  it('Lien HPO de la condition du panneau Gene - Phenotype Association', () => {
    cy.get('[data-row-key*="2-s-e-m-a-4-a"]').find('td[class="ant-table-cell"]').eq(2).find('[href]').eq(0)
    .should('have.attr', 'href', 'https://hpo.jax.org/app/browse/term/HP:0000518');
  });

  it('Lien \'See more\' de la condition du panneau Gene - Phenotype Association', () => {
    cy.get('[data-row-key="2-s-e-m-a-4-a"]').contains('See more').click({force: true});
    cy.get('[data-row-key="2-s-e-m-a-4-a"]').contains('Flexion Contracture').should('exist');
    cy.get('[data-row-key="2-s-e-m-a-4-a"]').contains('See less').click({force: true});
    cy.get('[data-row-key="2-s-e-m-a-4-a"]').contains('Flexion Contracture').should('not.exist');
  });
});

describe('Page d\'un variant - Valider les panneaux masquables', () => {
  it('Panneau Transcripts', () => {
    cy.get('[id="consequence"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="consequence"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="consequence"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="consequence"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau CQDG Studies', () => {
    cy.get('[id="frequency"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="frequency"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="frequency"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="frequency"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="frequency"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Public Cohorts', () => {
    cy.get('[class*="EntityTable_container"]').eq(2).find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[class*="EntityTable_container"]').eq(2).find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="EntityTable_container"]').eq(2).find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[class*="EntityTable_container"]').eq(2).find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="EntityTable_container"]').eq(2).find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau ClinVar', () => {
    cy.get('[id="pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Gene - Phenotype Association', () => {
    cy.get('[id="condition"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="condition"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="condition"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="condition"]').find('[class*="Collapse_fuiCollapse"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="condition"]').find('[class*="Collapse_fuiCollapse"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});
