/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('participants');
  cy.get('[data-cy="SidebarMenuItem_Participant"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
});

describe('Page Data Exploration (Participants) - Filtrer avec les facettes', () => {
  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').its('length').should('eq', 2);

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Search by participant ID - PT0000010', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by IDs').should('exist');

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('div[class="ant-tooltip-inner"]').contains('Search by participant ID or external participant ID').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'pt0000010', 'POST', '*/grapgql', 1);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('PT0000010').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_PT0000010"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000010').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_PT0000010"]').should('not.exist');
  });

  it('Search by external participant ID - HSJ-1005-389', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'hsj-1005-389', 'POST', '*/grapgql', 1);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('PT0000010').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_PT0000010"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000010').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_PT0000010"]').should('not.exist');
  });

  it('Study Code - STUDY1', () => {
    cy.validateFacetFilter('Study Code', 'STUDY1', 'STUDY1', /^9$/);
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
    cy.validateFacetFilter('Family Position', 'Proband', 'Proband', /^201$/);
    cy.validateFacetRank(2, 'Family Position');
  });

  it('Family Type - Case-parent trio', () => {
    cy.validateFacetFilter('Family Type', 'Case-parent trio', 'Case-parent trio', /^594$/);
    cy.validateFacetRank(3, 'Family Type');
  });

  it('Sex - Female', () => {
    cy.validateFacetFilter('Sex', 'Female', 'female', /^287$/);
    cy.validateFacetRank(4, 'Sex');
  });

  it('Age at Recruitment - Congenital', () => {
    cy.validateFacetFilter('Age at Recruitment', 'Congenital', 'B-congenital', /^2$/);
    cy.validateFacetRank(5, 'Age at Recruitment');
  });

  it('Age at Diagnosis - Congenital', () => {
    cy.validateFacetFilter('Age at Diagnosis', 'Congenital', 'B-congenital', /^3$/);
    cy.validateFacetRank(6, 'Age at Diagnosis');
  });

  it('Ethnicity - French Canadian', () => {
    cy.get('[data-cy="FilterContainer_Ethnicity"]').should('exist');
    cy.validateFacetRank(7, 'Ethnicity');
    /* Pas de données
    cy.validateFacetFilter('Ethnicity', 'French Canadian', 'French Canadian', /^1750$/);
    */
  });

  it('Phenotype (Source Text) - Intractable Seizures', () => {
    cy.validateFacetFilter('Phenotype (Source Text)', 'Intractable Seizures', 'Intractable Seizures', /^203$/);
    cy.validateFacetRank(8, 'Phenotype (Source Text)');
  });

  it('Diagnosis (Source Text) - Intractable Epilepsy', () => {
    cy.validateFacetFilter('Diagnosis (Source Text)', 'Intractable Epilepsy', 'Intractable Epilepsy', /\d{1}/);
    cy.validateFacetRank(9, 'Diagnosis (Source Text)');
  });
});
