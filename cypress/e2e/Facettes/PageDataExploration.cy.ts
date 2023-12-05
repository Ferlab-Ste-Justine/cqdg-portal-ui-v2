/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Participants) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants');
    cy.get('[data-cy="SidebarMenuItem_Participant"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').its('length').should('eq', 2);

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Study Code - T-DEE', () => {
    cy.get('[data-cy="FilterContainer_Study Code"]').should('exist');
    cy.checkValueFacetAndApply('Study Code', 'T-DEE');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('T-DEE').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^588$/).should('exist');
  });

  it('Study Code - STUDY1', () => {
    cy.checkValueFacetAndApply('Study Code', 'STUDY1');
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
    cy.get('[data-cy="FilterContainer_Diagnosis (ICD-10)"]').should('exist');
    cy.checkValueFacetAndApply('Diagnosis (ICD-10)', 'Generalized idiopathic epilepsy and epileptic syndromes, intractable (G40.31)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Diagnosis (ICD-10)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Generalized idiopathic epilepsy and epileptic syndromes, intractable (G40.31)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^205$/).should('exist');
  });

  it('Gender - Female', () => {
    cy.get('[data-cy="FilterContainer_Gender"]').should('exist');
    cy.checkValueFacetAndApply('Gender', 'female');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gender').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Female').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^283$/).should('exist');
  });

  it('Gender - Male', () => {
    cy.checkValueFacetAndApply('Gender', 'male');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gender').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains(/^Male$/).should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^315$/).should('exist');
  });

  it('Age at Recruitment - Congenital', () => {
    cy.get('[data-cy="FilterContainer_Age at Recruitment"]').should('exist');
    cy.checkValueFacetAndApply('Age at Recruitment', 'B-congenital');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Age at Recruitment').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Congenital').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2$/).should('exist');
  });

  it('Age at Recruitment - Young Adult', () => {
    cy.checkValueFacetAndApply('Age at Recruitment', 'G-young adult');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Age at Recruitment').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Young Adult').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });

  it('Age at Diagnosis - Congenital', () => {
    cy.get('[data-cy="FilterContainer_Age at Diagnosis"]').should('exist');
    cy.checkValueFacetAndApply('Age at Diagnosis', 'B-congenital');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Age at Diagnosis').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Congenital').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3$/).should('exist');
  });

  it('Age at Diagnosis - Young Adult', () => {
    cy.checkValueFacetAndApply('Age at Diagnosis', 'G-young adult');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Age at Diagnosis').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Young Adult').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });

  it('Ethnicity - French Canadian', () => {
    cy.get('[data-cy="FilterContainer_Ethnicity"]').should('exist');
    /* Pas de données
    cy.checkValueFacetAndApply('Ethnicity', 'French Canadian');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Ethnicity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('French Canadian').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1750$/).should('exist');
    */
  });

  it('Phenotype (Source Text) - Intractable Seizures', () => {
    cy.get('[data-cy="FilterContainer_Phenotype (Source Text)"]').should('exist');
    cy.checkValueFacetAndApply('Phenotype (Source Text)', 'Intractable Seizures');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Phenotype (Source Text)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Intractable Seizures').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^202$/).should('exist');
  });

  it('Diagnosis (Source Text) - Intractable Epilepsy', () => {
    cy.get('[data-cy="FilterContainer_Diagnosis (Source Text)"]').should('exist');
    cy.checkValueFacetAndApply('Diagnosis (Source Text)', 'Intractable Epilepsy');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Diagnosis (Source Text)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Intractable Epilepsy').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^205$/).should('exist');
  });
});

describe('Page Data Exploration (Biospecimens) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitDataExploration('biospecimens');
    cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Sample Type - DNA (NCIT:C449)', () => {
    cy.get('[data-cy="FilterContainer_Sample Type"]').should('exist');
    cy.checkValueFacetAndApply('Sample Type', 'DNA (NCIT:C449)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Sample Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DNA (NCIT:C449)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^598$/).should('exist');
  });

  it('Tissue - Blood (NCIT:C12434)', () => {
    cy.get('[data-cy="FilterContainer_Tissue"]').should('exist');
    cy.checkValueFacetAndApply('Tissue', 'Blood (NCIT:C12434)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Tissue').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Blood (NCIT:C12434)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^592$/).should('exist');
  });

  it('Tissue - Unknown', () => {
    cy.checkValueFacetAndApply('Tissue', 'Unknown');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Tissue').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Unknown').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^6$/).should('exist');
  });

  it('Age at Biospecimen Collection - Congenital', () => {
    cy.get('[data-cy="FilterContainer_Age at Biospecimen Collection"]').should('exist');
    cy.checkValueFacetAndApply('Age at Biospecimen Collection', 'B-congenital');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Age at Biospecimen Collection').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Congenital').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2$/).should('exist');
  });

  it('Age at Biospecimen Collection - Young Adult', () => {
    cy.checkValueFacetAndApply('Age at Biospecimen Collection', 'G-young adult');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Age at Biospecimen Collection').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Young Adult').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });
});

describe('Page Data Exploration (Data Files) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitDataExploration('datafiles');
    cy.get('[data-cy="SidebarMenuItem_Data File"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Data Category - Genomics', () => {
    cy.get('[data-cy="FilterContainer_Data Category"]').should('exist');
    cy.checkValueFacetAndApply('Data Category', 'Genomics');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Category').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Genomics').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,984$/).should('exist');
  });

  it('Data Type - Aligned Reads [CQDG-261]', () => {
    cy.get('[data-cy="FilterContainer_Data Type"]').should('exist');
    cy.checkValueFacetAndApply('Data Type', 'Aligned Reads');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Aligned Reads').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^598$/).should('exist');
  });

  it('Data Type - Germline CNV [CQDG-261]', () => {
    cy.checkValueFacetAndApply('Data Type', 'Germline CNV');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Germline CNV').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^592$/).should('exist');
  });

  it('Experimental Strategy - WGS', () => {
    cy.get('[data-cy="FilterContainer_Experimental Strategy"]').should('exist');
    cy.checkValueFacetAndApply('Experimental Strategy', 'WGS');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Experimental Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('WGS').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2,984$/).should('exist');
  });

  it('Format - gVCF', () => {
    cy.get('[data-cy="FilterContainer_Format"]').should('exist');
    cy.checkValueFacetAndApply('Format', 'gVCF');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Format').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('GVCF').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^598$/).should('exist');
  });

  it('Format - CRAM', () => {
    cy.checkValueFacetAndApply('Format', 'CRAM');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Format').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('CRAM').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^598$/).should('exist');
  });
});
