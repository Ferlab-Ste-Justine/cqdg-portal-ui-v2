/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('biospecimens');
  cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
});

describe('Page Data Exploration (Biospecimens) - Filtrer avec les facettes', () => {
  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Search by sample ID - SR0000214', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by IDs').should('exist');

    cy.get('[class*="SearchLabel_tooltipIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true}); //data-cy="SearchLabel_InfoCircleOutlined"
    cy.get('div[class="ant-tooltip-inner"]').contains('Search by sample ID or external sample ID').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'sr0000214', 'POST', '*/grapgql', 1);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('SR0000214').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_SR0000214"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('SR0000214').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_SR0000214"]').should('not.exist');
  });

  it('Search by external sample ID - S03510', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 's03510', 'POST', '*/grapgql', 1);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('SR0000214').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_SR0000214"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('SR0000214').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_SR0000214"]').should('not.exist');
  });

  it('Sample Type - DNA (NCIT:C449)', () => {
    cy.validateFacetFilter('Sample Type', 'DNA (NCIT:C449)', 'DNA (NCIT:C449)', /^602$/);
    cy.validateFacetRank(0, 'Sample Type');
  });

  it('Tissue - Blood (NCIT:C12434)', () => {
    cy.validateFacetFilter('Tissue', 'Blood (NCIT:C12434)', 'Blood (NCIT:C12434)', /^593$/);
    cy.validateFacetRank(1, 'Tissue');
  });

  it('Age at Biospecimen Collection - Congenital', () => {
    cy.validateFacetFilter('Age at Biospecimen Collection', 'Congenital', 'B-congenital', /^2$/);
    cy.validateFacetRank(2, 'Age at Biospecimen Collection');
  });
});
