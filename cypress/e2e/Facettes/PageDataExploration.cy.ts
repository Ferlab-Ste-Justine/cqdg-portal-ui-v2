/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Participants) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants');
    cy.get('li[data-key="participants"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');
  });

  it('Study Code - T-DEE', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Study Code').should('exist');
    cy.checkValueFacetAndApply(0, 'T-DEE');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('T-DEE').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^588$/).should('exist');
  });

  it('Study Code - STUDY1', () => {
    cy.checkValueFacetAndApply(0, 'STUDY1');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('STUDY1').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^6$/).should('exist');
  });

  it('Phenotype (HPO)', () => {
    cy.get('div[class*="CollapsePlaceHolderFacet_collapseLikeFacet"]').eq(0).contains('Phenotype (HPO)').should('exist');
    // TODO Filtrer
  });

  it('Diagnosis (MONDO)', () => {
    cy.get('div[class*="CollapsePlaceHolderFacet_collapseLikeFacet"]').eq(1).contains('Diagnosis (MONDO)').should('exist');
    // TODO Filtrer
  });

  it('Diagnosis (ICD-10) - Generalized idiopathic epilepsy and epileptic syndromes, intractable (G40.31)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('Diagnosis (ICD-10)').should('exist');
    cy.checkValueFacetAndApply(1, 'Generalized idiopathic epilepsy and epileptic syndromes, intractable (G40.31)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Diagnosis (ICD-10)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Generalized idiopathic epilepsy and epileptic syndromes, intractable (G40.31)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^205$/).should('exist');
  });

  it('Gender - Female', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('Gender').should('exist');
    cy.checkValueFacetAndApply(2, 'Female');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gender').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Female').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^283$/).should('exist');
  });

  it('Gender - Male', () => {
    cy.checkValueFacetAndApply(2, /^Male$/);
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gender').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains(/^Male$/).should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^315$/).should('exist');
  });

  it('Age at Recruitment (days) - Congenital', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('Age at Recruitment (days)').should('exist');
    cy.checkValueFacetAndApply(3, 'Congenital');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Age at Recruitment (days)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Congenital').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2$/).should('exist');
  });

  it('Age at Recruitment (days) - Young Adult (>= 16 years and < 40 years)', () => {
    cy.checkValueFacetAndApply(3, 'Young Adult (>= 16 years and < 40 years)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Age at Recruitment (days)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Young Adult (>= 16 years and < 40 years)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });

  it('Age at Diagnosis (days) - Congenital', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(4).contains('Age at Diagnosis (days)').should('exist');
    cy.checkValueFacetAndApply(4, 'Congenital');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Age at Diagnosis (days)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Congenital').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3$/).should('exist');
  });

  it('Age at Diagnosis (days) - Young Adult (>= 16 years and < 40 years)', () => {
    cy.checkValueFacetAndApply(4, 'Young Adult (>= 16 years and < 40 years)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Age at Diagnosis (days)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Young Adult (>= 16 years and < 40 years)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });

  it('Ethnicity - French Canadian', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(5).contains('Ethnicity').should('exist');
    /* Pas de données
    cy.checkValueFacetAndApply(5, 'French Canadian');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Ethnicity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('French Canadian').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1750$/).should('exist');
    */
  });

  it('Phenotype (Source Text) - Intractable Seizures', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(6).contains('Phenotype (Source Text)').should('exist');
    cy.checkValueFacetAndApply(6, 'Intractable Seizures');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Phenotype (Source Text)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Intractable Seizures').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^202$/).should('exist');
  });

  it('Diagnosis (Source Text) - Intractable Epilepsy', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(7).contains('Diagnosis (Source Text)').should('exist');
    cy.checkValueFacetAndApply(7, 'Intractable Epilepsy');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Diagnosis (Source Text)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Intractable Epilepsy').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^205$/).should('exist');
  });
});

describe('Page Data Exploration (Biospecimens) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitDataExploration('biospecimens');
    cy.get('li[data-key="biospecimens"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');
  });

  it('Sample Type - DNA (NCIT:C449)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Sample Type').should('exist');
    cy.checkValueFacetAndApply(0, 'DNA (NCIT:C449)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Sample Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DNA (NCIT:C449)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^598$/).should('exist');
  });

  it('Tissue - Blood (NCIT:C12434)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('Tissue').should('exist');
    cy.checkValueFacetAndApply(1, 'Blood (NCIT:C12434)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Tissue').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Blood (NCIT:C12434)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^592$/).should('exist');
  });

  it('Tissue - Unknown', () => {
    cy.checkValueFacetAndApply(1, 'Unknown');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Tissue').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Unknown').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^6$/).should('exist');
  });

  it('Age at Biospecimen Collection (days) - Congenital', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('Age at Biospecimen Collection (days)').should('exist');
    cy.checkValueFacetAndApply(2, 'Congenital');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Age at Biospecimen Collection (days)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Congenital').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2$/).should('exist');
  });

  it('Age at Biospecimen Collection (days) - Young Adult (>= 16 years and < 40 years)', () => {
    cy.checkValueFacetAndApply(2, 'Young Adult (>= 16 years and < 40 years)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Age at Biospecimen Collection (days)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Young Adult (>= 16 years and < 40 years)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });
});

describe('Page Data Exploration (Data Files) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitDataExploration('datafiles');
    cy.get('li[data-key="datafiles"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');
  });

  it('Data Category - Genomics', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Data Category').should('exist');
    cy.checkValueFacetAndApply(0, 'Genomics');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Category').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Genomics').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,984$/).should('exist');
  });

  it('Data Type - Aligned Reads [CQDG-261]', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('Data Type').should('exist');
    cy.checkValueFacetAndApply(1, 'Aligned Reads');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Aligned Reads').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^598$/).should('exist');
  });

  it('Data Type - Germline CNV [CQDG-261]', () => {
    cy.checkValueFacetAndApply(1, 'Germline CNV');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Germline CNV').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^592$/).should('exist');
  });

  it('Experimental Strategy - WGS', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('Experimental Strategy').should('exist');
    cy.checkValueFacetAndApply(2, 'WGS');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Experimental Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('WGS').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,984$/).should('exist');
  });

  it('Format - gVCF', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('Format').should('exist');
    cy.checkValueFacetAndApply(3, 'gVCF');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Format').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('GVCF').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^598$/).should('exist');
  });

  it('Format - CRAM', () => {
    cy.checkValueFacetAndApply(3, 'CRAM');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Format').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('CRAM').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^598$/).should('exist');
  });
});
