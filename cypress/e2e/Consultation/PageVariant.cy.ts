/// <reference types="Cypress" />
import '../../support/commands';
/*
beforeEach(() => {
  cy.login();
  cy.visitVariantEntityPage('16-3606492-C-T', 1);
});

describe('Page d\'un variant - Vérifier les informations affichées', () => {
  it('Panneau Summary', () => {
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('SNV').should('exist');
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('16').should('exist');
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('3606492').should('exist');
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('16p13.3').should('exist');
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('T').should('exist');
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('C').should('exist');
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(6).contains('GRCh38').should('exist');
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(7).contains('6').should('exist');
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(8).contains('12').should('exist');
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(9).contains('SLX4').should('exist');
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(10).contains('613278').should('exist');
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(11).contains('Conflicting_interpretations_of_pathogenicity').should('exist'); // CQDG-130
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(12).contains('2.30e-4').should('exist');
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(13).contains('319184').should('exist');
    cy.get('[data-cy="Summary"]').find('[class="ant-descriptions-item-content"]').eq(14).contains('rs148547201').should('exist');
  });
  
  it('Panneau Gene Consequences', () => {
    cy.get('[data-cy="Consequences_SLX4_Space"]').contains('SLX4').should('exist');
    cy.get('[data-cy="Consequences_SLX4_Space"]').contains('OMIM').should('exist');
    cy.get('[data-cy="Consequences_SLX4_Space"]').contains('613278').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(0).contains('E248K').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(1).contains('missense_variant').should('exist'); // CQDG-130
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(2).contains('742C>T').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(3).contains('-1').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(4).contains('MODERATE').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(4).find('[class*="ant-tag-gold"]').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(5).contains('Sift:').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(5).contains('Damaging').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(5).contains('0.56456').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(5).contains('Polyphen2:').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(5).contains('Benign').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(5).contains('0.56456').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(5).contains('See more').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(5).contains('Fathmm').should('not.exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(6).contains('-').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(7).contains('ENST00000294008').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(7).find('svg[class="anticon"]').should('exist');
    cy.get('[data-row-key="Consequences_SLX4_1"]').find('td[class="ant-table-cell"]').eq(8).contains('NM_032444').should('exist');
    cy.get('[data-cy="Consequences_SLX4_Space"]').contains('2 other transcripts +').should('exist');
    cy.get('[data-cy="Consequences_SLX4_Space"]').find('tr[class*="ant-table-row"]').eq(1).should('not.exist');
  });
  
  it('Panneau CQDG Studies', () => {
    cy.get('[data-row-key="0"]').find('td[class="ant-table-cell"]').eq(0).contains('KF-CDH').should('exist');
    cy.get('[data-row-key="0"]').find('td[class="ant-table-cell"]').eq(1).contains('-').should('exist');
    cy.get('[data-row-key="0"]').find('td[class="ant-table-cell"]').eq(2).contains('4 / 11030').should('exist');
    cy.get('[data-row-key="0"]').find('td[class="ant-table-cell"]').eq(3).contains('3.63e-4').should('exist');
    cy.get('[data-row-key="0"]').find('td[class="ant-table-cell"]').eq(4).contains('4').should('exist');
    cy.get('[data-row-key="0"]').find('td[class="ant-table-cell"]').eq(5).contains('0').should('exist');
    cy.get('[data-row-key="1"]').find('td[class="ant-table-cell"]').eq(0).contains('KF-NBL').should('exist');
    cy.get('[data-row-key="1"]').find('td[class="ant-table-cell"]').eq(1).contains('-').should('exist');
    cy.get('[data-row-key="1"]').find('td[class="ant-table-cell"]').eq(2).contains('1 / 11030').should('exist');
    cy.get('[data-row-key="1"]').find('td[class="ant-table-cell"]').eq(3).contains('9.07e-5').should('exist');
    cy.get('[data-row-key="1"]').find('td[class="ant-table-cell"]').eq(4).contains('1').should('exist');
    cy.get('[data-row-key="1"]').find('td[class="ant-table-cell"]').eq(5).contains('0').should('exist');
    cy.get('[data-cy="CQDG_Studies_Summary_Row"]').find('td[class*="ant-table-cell"]').eq(1).should('be.empty');
    cy.get('[data-cy="CQDG_Studies_Summary_Row"]').find('td[class*="ant-table-cell"]').eq(2).contains('12 / 11030').should('exist');
    cy.get('[data-cy="CQDG_Studies_Summary_Row"]').find('td[class*="ant-table-cell"]').eq(3).contains('1.09e-3').should('exist');
    cy.get('[data-cy="CQDG_Studies_Summary_Row"]').find('td[class*="ant-table-cell"]').eq(4).contains('12').should('exist');
    cy.get('[data-cy="CQDG_Studies_Summary_Row"]').find('td[class*="ant-table-cell"]').eq(5).contains('0').should('exist');
  });
  
  it('Panneau Public Cohorts', () => {
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(1).contains('29').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(2).contains('125568').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="topmed"]').find('td[class="ant-table-cell"]').eq(4).contains('2.31e-4').should('exist');
    cy.get('[data-row-key="gnomadGenomes3_1_1"]').find('td[class="ant-table-cell"]').eq(1).contains('35').should('exist');
    cy.get('[data-row-key="gnomadGenomes3_1_1"]').find('td[class="ant-table-cell"]').eq(2).contains('152226').should('exist');
    cy.get('[data-row-key="gnomadGenomes3_1_1"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="gnomadGenomes3_1_1"]').find('td[class="ant-table-cell"]').eq(4).contains('2.30e-4').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(1).contains('33').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(2).contains('143320').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="gnomadGenomes3"]').find('td[class="ant-table-cell"]').eq(4).contains('2.30e-4').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(1).contains('9').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(2).contains('31400').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="gnomadGenomes2_1"]').find('td[class="ant-table-cell"]').eq(4).contains('2.87e-4').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(1).contains('72').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(2).contains('250260').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="gnomadExomes2_1"]').find('td[class="ant-table-cell"]').eq(4).contains('2.88e-4').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(1).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(2).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="oneThousandsGenomes"]').find('td[class="ant-table-cell"]').eq(4).contains('-').should('exist');
  });
  
  it('Panneau ClinVar', () => {
    cy.get('[data-cy="Pathogenicity_ClinVar_319184_ExternalLink"]').contains('319184').should('exist');
    cy.get('[data-cy="Pathogenicity_ClinVar_319184_ExternalLink"]').find('svg[class="anticon"]').should('exist');
    cy.get('[data-row-key="ClinvarTable_0"]').find('td[class="ant-table-cell"]').eq(0).contains('Conflicting_interpretations_of_pathogenicity').should('exist'); // CQDG-130
    cy.get('[data-row-key="ClinvarTable_0"]').find('td[class="ant-table-cell"]').eq(1).contains('Fanconi anemia complementation group P').should('exist');
    cy.get('[data-row-key="ClinvarTable_0"]').find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
    cy.get('[data-row-key="ClinvarTable_1"]').find('td[class="ant-table-cell"]').eq(0).contains('Conflicting_interpretations_of_pathogenicity').should('exist'); // CQDG-130
    cy.get('[data-row-key="ClinvarTable_1"]').find('td[class="ant-table-cell"]').eq(1).contains('Fanconi anemia').should('exist');
    cy.get('[data-row-key="ClinvarTable_1"]').find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
    cy.get('[data-row-key="ClinvarTable_2"]').find('td[class="ant-table-cell"]').eq(0).contains('Conflicting_interpretations_of_pathogenicity').should('exist'); // CQDG-130
    cy.get('[data-row-key="ClinvarTable_2"]').find('td[class="ant-table-cell"]').eq(1).contains('not specified').should('exist');
    cy.get('[data-row-key="ClinvarTable_2"]').find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
    cy.get('[data-row-key="ClinvarTable_3"]').find('td[class="ant-table-cell"]').eq(0).contains('Conflicting_interpretations_of_pathogenicity').should('exist'); // CQDG-130
    cy.get('[data-row-key="ClinvarTable_3"]').find('td[class="ant-table-cell"]').eq(1).contains('not provided').should('exist');
    cy.get('[data-row-key="ClinvarTable_3"]').find('td[class="ant-table-cell"]').eq(2).contains('germline').should('exist');
  });
  
  it('Panneau - Phenotype', () => {
    cy.get('[data-row-key="0-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(0).contains('Orphanet').should('exist');
    cy.get('[data-row-key="0-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(1).contains('SLX4').should('exist');
    cy.get('[data-row-key="0-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(2).contains('Fanconi anemia').should('exist');
    cy.get('[data-row-key="0-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(3).contains('Autosomal recessive,X-linked recessive').should('exist');
    cy.get('[data-row-key*="1-s-l-x-4-613278"]').find('td[class="ant-table-cell"]').eq(0).contains('OMIM').should('exist');
    cy.get('[data-row-key*="1-s-l-x-4-613278"]').find('td[class="ant-table-cell"]').eq(1).contains('SLX4 (OMIM:').should('exist');
    cy.get('[data-row-key*="1-s-l-x-4-613278"]').find('td[class="ant-table-cell"]').eq(2).contains('Fanconi anemia, complementation group P').should('exist');
    cy.get('[data-row-key*="1-s-l-x-4-613278"]').find('td[class="ant-table-cell"]').eq(3).contains('Autosomal recessive').should('exist');
    cy.get('[data-row-key*="2-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(0).contains('HPO').should('exist');
    cy.get('[data-row-key*="2-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(1).contains('SLX4').should('exist');
    cy.get('[data-row-key*="2-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(2).contains('Toe syndactyly').should('exist');
    cy.get('[data-row-key*="2-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key*="3-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(0).contains('DDD').should('exist');
    cy.get('[data-row-key*="3-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(1).contains('SLX4').should('exist');
    cy.get('[data-row-key*="3-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(2).contains('FANCONI ANEMIA COMPLEMENTATION GROUP P').should('exist');
    cy.get('[data-row-key*="3-s-l-x-4"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
  });
});

describe.skip('Page d\'un variant - Valider les liens disponibles', () => {
  it('Lien ClinVar du panneau Summary', () => {
    cy.get('[data-cy="Summary_ClinVar_ExternalLink"]').invoke('removeAttr', 'target').click({force: true});
    cy.closePopup();
    cy.get('body').contains(/^319184$/).should('exist');
  });

  it('Lien dbSNP du panneau Summary', () => {
    cy.get('[data-cy="Summary_dbSNP_ExternalLink"]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains(/^rs148547201$/).should('exist');
  });

  it('Lien du gène du panneau Gene Consequences', () => {
    cy.get('[data-cy="Consequences_SLX4_Gene_ExternalLink"]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains(/^SLX4$/).should('exist');
  });
  
  it('Lien Omim du panneau Gene Consequences', () => {
    cy.get('[data-cy="Consequences_SLX4_Omim_ExternalLink"]').invoke('removeAttr', 'target').click({force: true});
    cy.closePopup();
    cy.get('body').contains(/^\*613278$/).should('exist');
  });
  
  it('Lien \'2 other transcripts\' du panneau Gene Consequences', () => {
    cy.get('[data-cy="Consequences_SLX4_Space"]').contains('2 other transcripts +').click({force: true});
    cy.get('[data-cy="Consequences_SLX4_Space"]').find('tr[class*="ant-table-row"]').eq(1).should('exist');
    cy.get('[data-cy="Consequences_SLX4_Space"]').contains('Show less -').click({force: true});
    cy.get('[data-cy="Consequences_SLX4_Space"]').find('tr[class*="ant-table-row"]').eq(1).should('not.exist');
  });
  
  it('Lien TopMed du panneau Public Cohort', () => {
    cy.get('[data-cy="ExternalCohort_TopMed_Link"]').should('have.attr', 'href', 'https://bravo.sph.umich.edu/freeze8/hg38/variant/snv/16-3606492-C-T');
  });
  
  it('Lien gnomAD Genome (v3.1.1) du panneau Public Cohort', () => {
    cy.get('[data-cy="ExternalCohort_gnomAD Genomes (v3.1.1)_Link"]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains('16-3606492-C-T').should('exist');
  });
  
  it('Lien gnomAD Genome (v3) du panneau Public Cohort', () => {
    cy.get('[data-cy="ExternalCohort_gnomAD Genomes (v3)_Link"]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains('16-3606492-C-T').should('exist');
  });
  
  it('Lien ClinVar du panneau ClinVar', () => {
    cy.get('[data-cy="Pathogenicity_ClinVar_319184_ExternalLink"]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains(/^319184$/).should('exist');
  });
  
  it('Lien de la condition Orphanet du panneau Gene - Phenotype', () => {
    cy.get('[data-cy="OrphanetConditionCell_634_ExternalLink"]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains('Fanconi anemia').should('exist');
  });
  
  it('Lien OMIM du gène du panneau Gene - Phenotype', () => {
    cy.get('[data-cy="OmimGeneCell_613278_ExternalLink"]').invoke('removeAttr', 'target').click({force: true});
    cy.closePopup();
    cy.get('body').contains(/^\*613278$/).should('exist');
  });
  
  it('Lien OMIM de la condition du panneau Gene - Phenotype', () => {
    cy.get('[data-cy="OmimConditionCell_613951_ExternalLink"]').first().invoke('removeAttr', 'target').click({force: true});
    cy.closePopup();
    cy.get('body').contains(/^\#613951$/).should('exist');
  });
  
  it('Lien HPO de la condition du panneau Gene - Phenotype', () => {
    cy.get('[data-cy="HpoConditionCell_HP:0001770_ExternalLink"]').invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains(/^HP:0001770$/).should('exist');
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
    cy.get('[data-cy="Summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="Summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="Summary"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="Summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="Summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Gene Consequences', () => {
    cy.get('[data-cy="Consequences"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="Consequences"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="Consequences"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="Consequences"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="Consequences"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau CQDG Studies', () => {
    cy.get('[data-cy="Frequencies"]').find('[class*="Collapse_fuiCollapse"]').eq(0).find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="Frequencies"]').find('[class*="Collapse_fuiCollapse"]').eq(0).find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="Frequencies"]').find('[class*="Collapse_fuiCollapse"]').eq(0).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="Frequencies"]').find('[class*="Collapse_fuiCollapse"]').eq(0).find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="Frequencies"]').find('[class*="Collapse_fuiCollapse"]').eq(0).find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Public Cohorts', () => {
    cy.get('[data-cy="Frequencies"]').find('[class*="Collapse_fuiCollapse"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="Frequencies"]').find('[class*="Collapse_fuiCollapse"]').eq(1).find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="Frequencies"]').find('[class*="Collapse_fuiCollapse"]').eq(1).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="Frequencies"]').find('[class*="Collapse_fuiCollapse"]').eq(1).find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="Frequencies"]').find('[class*="Collapse_fuiCollapse"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau ClinVar', () => {
    cy.get('[data-cy="Pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').eq(0).find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="Pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').eq(0).find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="Pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').eq(0).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="Pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').eq(0).find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="Pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').eq(0).find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Gene - Phenotype', () => {
    cy.get('[data-cy="Pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[data-cy="Pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').eq(1).find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="Pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').eq(1).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[data-cy="Pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').eq(1).find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-cy="Pathogenicity"]').find('[class*="Collapse_fuiCollapse"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});
*/