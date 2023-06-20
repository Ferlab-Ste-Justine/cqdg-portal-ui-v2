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

  it('Study Code - T-DEE', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Study Code').should('exist');
    cy.checkValueFacetAndApply(0, 'T-DEE');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('T-DEE').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^480$/).should('exist');
  });

  it('Study Code - NEURODEV', () => {
    cy.checkValueFacetAndApply(0, 'NEURODEV');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('NEURODEV').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^382$/).should('exist');
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
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^159$/).should('exist');
  });

  // Code à valider
  it('Diagnosis (ICD-10) - Intellectual Disabilities (F70-F79)', () => {
    cy.checkValueFacetAndApply(1, 'Intellectual Disabilities (F70-F79)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Diagnosis (ICD-10)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Intellectual Disabilities (F70-F79)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^639$/).should('exist');
  });

  it('Gender - Female', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('Gender').should('exist');
    cy.checkValueFacetAndApply(2, 'Female');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gender').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Female').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^527$/).should('exist');
  });

  it('Gender - Male', () => {
    cy.checkValueFacetAndApply(2, /^Male$/);
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gender').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains(/^Male$/).should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^592$/).should('exist');
  });

  it('Age at Recruitment (days)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('Age at Recruitment (days)').should('exist');
    // TODO Filtrer
  });

  it('Age at Diagnosis (days)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(4).contains('Age at Diagnosis (days)').should('exist');
    // TODO Filtrer
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

  // Pas de données
  it.skip('Ethnicity - Mixed', () => {
    cy.checkValueFacetAndApply(5, 'Mixed');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Ethnicity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Mixed').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^19$/).should('exist');
  });

  it('Phenotype (Source Text) - Intractable Seizures', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(6).contains('Phenotype (Source Text)').should('exist');
    cy.checkValueFacetAndApply(6, 'Intractable Seizures');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Phenotype (Source Text)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Intractable Seizures').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^159$/).should('exist');
  });

  it('Phenotype (Source Text) - Microcephaly', () => {
    cy.checkValueFacetAndApply(6, 'Microcephaly');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Phenotype (Source Text)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Microcephaly').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^21$/).should('exist');
  });

  it('Diagnosis (Source Text) - Intractable Epilepsy', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(7).contains('Diagnosis (Source Text)').should('exist');
    cy.checkValueFacetAndApply(7, 'Intractable Epilepsy');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Diagnosis (Source Text)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Intractable Epilepsy').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^159$/).should('exist');
  });

  it('Diagnosis (Source Text) - Mendelian disease', () => {
    cy.checkValueFacetAndApply(7, 'Mendelian disease');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Diagnosis (Source Text)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Mendelian disease').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^639$/).should('exist');
  });
});

describe('Page Data Exploration (Biospecimens) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitDataExploration('biospecimens');
    cy.get('li[data-key="biospecimens"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
  });

  it('Sample Type - DNA (NCIT:C449)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Sample Type').should('exist');
    cy.checkValueFacetAndApply(0, 'DNA (NCIT:C449)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Sample Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DNA (NCIT:C449)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1119$/).should('exist');
  });

  it('Tissue - Blood (NCIT:C12434)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('Tissue').should('exist');
    cy.checkValueFacetAndApply(1, 'Blood (NCIT:C12434)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Tissue').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Blood (NCIT:C12434)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1119$/).should('exist');
  });

  // Pas de données
  it.skip('Tissue - Saliva (NCIT:C13275)', () => {
    cy.checkValueFacetAndApply(1, 'Saliva (NCIT:C13275)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Tissue').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Saliva (NCIT:C13275)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^19$/).should('exist');
  });

  it('Age at Biospecimen Collection (days)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('Age at Biospecimen Collection (days)').should('exist');
    // TODO Filtrer
  });
});

describe('Page Data Exploration (Data Files) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitDataExploration('datafiles');
    cy.get('li[data-key="datafiles"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
  });

  it('Data Category - Genomics', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Data Category').should('exist');
    cy.checkValueFacetAndApply(0, 'Genomics');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Category').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Genomics').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^8952$/).should('exist');
  });

  it('Data Type - Aligned Reads [CQDG-261]', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('Data Type').should('exist');
    cy.checkValueFacetAndApply(1, 'Aligned Reads');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Aligned Reads').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1119$/).should('exist');
  });

  it('Data Type - Germline CNV [CQDG-261]', () => {
    cy.checkValueFacetAndApply(1, 'Germline CNV');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Germline CNV').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2238$/).should('exist');
  });

  it('Experimental Strategy - WGS', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('Experimental Strategy').should('exist');
    cy.checkValueFacetAndApply(2, 'WGS');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Experimental Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('WGS').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^8952$/).should('exist');
  });

  it('Format - gVCF [CQDG-256]', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('Format').should('exist');
    cy.checkValueFacetAndApply(3, 'gVCF');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Format').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('gVCF').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1119$/).should('exist');
  });

  it('Format - TBI', () => {
    cy.checkValueFacetAndApply(3, 'TBI');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Format').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('TBI').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3357$/).should('exist');
  });
});
