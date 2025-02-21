/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage();
  cy.get('[data-cy="SidebarMenuItem_Gene"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
});

describe('Page des variants (Gene) - Filtrer avec les facettes', () => {
  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Search by gene symbol - PRDX1', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by gene').should('exist');

    cy.get('[data-cy="SearchLabel_InfoCircleOutlined"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"]').contains('Enter Gene Symbol, Gene Alias or Ensembl ID').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'prdx1', 'POST', '*/grapgql', 3);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('PRDX1').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_PRDX1"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Gene').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PRDX1').should('exist');
    cy.validateTableResultsCount(/^133$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_PRDX1"]').should('not.exist');
  });

  it('Search by gene alias - NKEFA', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'nkefa', 'POST', '*/grapgql', 3);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('PRDX1').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_PRDX1"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Gene').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PRDX1').should('exist');
    cy.validateTableResultsCount(/^133$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_PRDX1"]').should('not.exist');
  });

  it('Search by Ensembl ID - ENSG00000117450', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'ensg00000117450', 'POST', '*/grapgql', 3);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('PRDX1').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_PRDX1"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Gene').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PRDX1').should('exist');
    cy.validateTableResultsCount(/^133$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_PRDX1"]').should('not.exist');
  });

  it('Gene Type - Protein Coding', () => {
    cy.validateFacetFilter('Gene Type', 'Protein Coding', 'protein_coding', /^290K$/);
    cy.validateFacetRank(0, 'Gene Type');
  });

  it('External Reference - OMIM', () => {
    cy.validateFacetFilter('External Reference', 'OMIM', 'OMIM', /^87.7K$/);
    cy.validateFacetRank(1, 'External Reference');
  });

  it('gnomAD pLI', () => {
    cy.validateFacetNumFilter('gnomAD pLI', '0.01', /^135K$/);
    cy.validateFacetRank(2, 'gnomAD pLI');
  });

  it('gnomAD LOEUF', () => {
    cy.validateFacetNumFilter('gnomAD LOEUF', '0.1', /^3,646$/);
    cy.validateFacetRank(3, 'gnomAD LOEUF');
  });

  it('HPO - Autosomal recessive inheritance (HP:0000007)', () => {
    cy.get('[data-cy="FilterContainer_HPO"]').should('exist');
    cy.validateFacetRank(4, 'HPO');
    /* Fait planter Cypress
    cy.validateFacetFilter('HPO', 'Autosomal recessive inheritance (HP:0000007)', 'Autosomal recessive inheritance (HP:0000007)', /^863$/);
    */
  });

  it('ORPHANET - West syndrome', () => {
    cy.get('[data-cy="FilterContainer_ORPHANET"]').should('exist');
    cy.validateFacetRank(5, 'ORPHANET');
    /* Fait planter Cypress
    cy.validateFacetFilter('ORPHANET', 'West syndrome', 'West syndrome', /^43$/);
    */
  });

  it('OMIM - 5-fluorouracil toxicity', () => {
    cy.get('[data-cy="FilterContainer_OMIM"]').should('exist');
    cy.validateFacetRank(6, 'OMIM');
    /* Fait planter Cypress
    cy.validateFacetFilter('OMIM', '5-fluorouracil toxicity', '5-fluorouracil toxicity', /^37$/);
    */
  });

  it('DDD - Macrocephaly with intellectual disability', () => {
    cy.validateFacetRank(7, 'DDD');
    /* Fait planter Cypress
    cy.validateFacetFilter('DDD', 'Macrocephaly with intellectual disability', 'Macrocephaly with intellectual disability', /^4$/);
    */
  });

  it('COSMIC - Paraganglioma', () => {
    cy.validateFacetFilter('COSMIC', 'Paraganglioma', 'paraganglioma', /^194$/);
    cy.validateFacetRank(8, 'COSMIC');
  });
});
