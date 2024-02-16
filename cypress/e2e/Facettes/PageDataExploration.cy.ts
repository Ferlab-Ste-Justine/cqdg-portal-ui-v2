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

  it('Search by participant ID - PT0000010', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by participant ID').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'PT0000010', 'POST', '*/grapgql', 1);
    cy.wait(1000);
    cy.get('[data-cy="Search_Dropdown"]').contains('PT0000010').should('exist');
    cy.get('[data-cy="Search_Dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_PT0000010"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT0000010').should('exist');
    cy.validateTableResultsCount(/^1 Results$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[data-cy="Tag_PT0000010"]').should('not.exist');
  });

  it('Study Code - STUDY1', () => {
    cy.validateFacetFilter('Study Code', 'STUDY1', 'STUDY1', /^6$/);
    cy.validateFacetRank(0, 'Study Code');
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
    cy.validateFacetFilter('Diagnosis (ICD-10)', 'Generalized idiopathic epilepsy and epileptic syndromes, intractable (G40.31)', 'Generalized idiopathic epilepsy and epileptic syndromes, intractable (G40.31)', /^205$/);
    cy.validateFacetRank(1, 'Diagnosis (ICD-10)');
  });

  it('Family Position - Proband', () => {
    cy.validateFacetFilter('Family Position', 'Proband', 'Proband', /^200$/);
    cy.validateFacetRank(2, 'Family Position');
  });

  it('Gender - Female', () => {
    cy.validateFacetFilter('Gender', 'Female', 'female', /^283$/);
    cy.validateFacetRank(3, 'Gender');
  });

  it('Age at Recruitment - Congenital', () => {
    cy.validateFacetFilter('Age at Recruitment', 'Congenital', 'B-congenital', /^2$/);
    cy.validateFacetRank(4, 'Age at Recruitment');
  });

  it('Age at Diagnosis - Congenital', () => {
    cy.validateFacetFilter('Age at Diagnosis', 'Congenital', 'B-congenital', /^3$/);
    cy.validateFacetRank(5, 'Age at Diagnosis');
  });

  it('Ethnicity - French Canadian', () => {
    cy.get('[data-cy="FilterContainer_Ethnicity"]').should('exist');
    cy.validateFacetRank(6, 'Ethnicity');
    /* Pas de données
    cy.validateFacetFilter('Ethnicity', 'French Canadian', 'French Canadian', /^1750$/);
    */
  });

  it('Phenotype (Source Text) - Intractable Seizures', () => {
    cy.validateFacetFilter('Phenotype (Source Text)', 'Intractable Seizures', 'Intractable Seizures', /^202$/);
    cy.validateFacetRank(7, 'Phenotype (Source Text)');
  });

  it('Diagnosis (Source Text) - Intractable Epilepsy', () => {
    cy.validateFacetFilter('Diagnosis (Source Text)', 'Intractable Epilepsy', 'Intractable Epilepsy', /^205$/);
    cy.validateFacetRank(8, 'Diagnosis (Source Text)');
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

  it('Search by sample ID - SR0000214', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by sample ID').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'SR0000214', 'POST', '*/grapgql', 1);
    cy.wait(1000);
    cy.get('[data-cy="Search_Dropdown"]').contains('SR0000214').should('exist');
    cy.get('[data-cy="Search_Dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_SR0000214"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SR0000214').should('exist');
    cy.validateTableResultsCount(/^1 Results$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[data-cy="Tag_SR0000214"]').should('not.exist');
  });

  it('Sample Type - DNA (NCIT:C449)', () => {
    cy.validateFacetFilter('Sample Type', 'DNA (NCIT:C449)', 'DNA (NCIT:C449)', /^598$/);
    cy.validateFacetRank(0, 'Sample Type');
  });

  it('Tissue - Blood (NCIT:C12434)', () => {
    cy.validateFacetFilter('Tissue', 'Blood (NCIT:C12434)', 'Blood (NCIT:C12434)', /^592$/);
    cy.validateFacetRank(1, 'Tissue');
  });

  it('Age at Biospecimen Collection - Congenital', () => {
    cy.validateFacetFilter('Age at Biospecimen Collection', 'Congenital', 'B-congenital', /^2$/);
    cy.validateFacetRank(2, 'Age at Biospecimen Collection');
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

  it('Search by file ID - FI0000572', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by file ID').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'FI0000572', 'POST', '*/grapgql', 1);
    cy.wait(1000);
    cy.get('[data-cy="Search_Dropdown"]').contains('FI0000572').should('exist');
    cy.get('[data-cy="Search_Dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_FI0000572"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FI0000572').should('exist');
    cy.validateTableResultsCount(/^1 Results$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[data-cy="Tag_FI0000572"]').should('not.exist');
  });

  it('Data Category - Genomics', () => {
    cy.validateFacetFilter('Data Category', 'Genomics', 'Genomics', /^2,984$/);
    cy.validateFacetRank(0, 'Data Category');
  });

  it('Data Type - Aligned Reads', () => {
    cy.validateFacetFilter('Data Type', 'Aligned Reads', 'Aligned Reads', /^598$/);
    cy.validateFacetRank(1, 'Data Type');
  });

  it('Strategy - WGS', () => {
    cy.validateFacetFilter('Strategy', 'WGS', 'WGS', /^2,984$/);
    cy.validateFacetRank(2, 'Strategy');
  });

  it('Format - gVCF', () => {
    cy.validateFacetFilter('Format', 'GVCF', 'gVCF', /^588$/);
    cy.validateFacetRank(3, 'Format');
  });
});
