/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage();
  cy.get('[data-cy="SidebarMenuItem_Variant"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
});

describe('Page des variants (Variant) - Filtrer avec les facettes', () => {
  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Search by variant locus - 1-11846011-A-G', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by variant').should('exist');

    cy.get('[data-cy="SearchLabel_InfoCircleOutlined"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"]').contains('Enter Variant Locus, Gene Symbol, Gene Alias, Gene AA Change, dbSNP ID, ClinVar ID, Ensembl ID, refseq ID').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', '1-11846011-a-g', 'POST', '*/grapgql', 3);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('1-11846011-A-G').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_1-11846011-A-G"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('1-11846011-A-G').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_1-11846011-A-G"]').should('not.exist');
  });

  it('Search by gene symbol - PRDX1', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'prdx1', 'POST', '*/grapgql', 3);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('1-').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy*="Tag_"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy*="Tag_"]').should('not.exist');
  });

  it('Search by gene alias - NKEFA [CQDG-750]', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'nkefa', 'POST', '*/grapgql', 3);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('1-').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy*="Tag_"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy*="Tag_"]').should('not.exist');
  });

  it('Search by gene AA change - p.Ter152Arg', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'p.ter152arg', 'POST', '*/grapgql', 3);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('1-11846011-A-G').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_1-11846011-A-G"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('1-11846011-A-G').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_1-11846011-A-G"]').should('not.exist');
  });

  it('Search by dbSNP ID - rs5065', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'RS5065', 'POST', '*/grapgql', 3);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('1-11846011-A-G').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_1-11846011-A-G"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('1-11846011-A-G').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_1-11846011-A-G"]').should('not.exist');
  });

  it('Search by ClinVar ID - 226855', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', '226855', 'POST', '*/grapgql', 3);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('1-11846011-A-G').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_1-11846011-A-G"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('1-11846011-A-G').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_1-11846011-A-G"]').should('not.exist');
  });

  it('Search by Ensembl ID - ENST00000376480', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'enst00000376480', 'POST', '* /grapgql', 3);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('1-').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy*="Tag_"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy*="Tag_"]').should('not.exist');
  });

  it('Search by refseq ID - NM_006172.4', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'nm_006172.4', 'POST', '* /grapgql', 3);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('1-').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy*="Tag_"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy*="Tag_"]').should('not.exist');
  });

  it('Variant Type - SNV', () => {
    cy.validateFacetFilter('Variant Type', 'SNV', 'SNV', /^425K$/);
    cy.validateFacetRank(0, 'Variant Type');
  });

  it('Consequence - Intron', () => {
    cy.validateFacetFilter('Consequence', 'Intron', 'intron', /^325K$/);
    cy.validateFacetRank(1, 'Consequence');
  });

  it('Consequence - Missense', () => {
    cy.validateFacetFilter('Consequence', 'Missense', 'missense', /^1,918$/);
  });

  it('External Reference - DbSNP', () => {
    cy.validateFacetFilter('External Reference', 'DbSNP', 'DBSNP', /^333K$/);
    cy.validateFacetRank(2, 'External Reference');
  });

  it('Chromosome - 1', () => {
    cy.validateFacetFilter('Chromosome', '1', '1', /^554K$/);
    cy.validateFacetRank(3, 'Chromosome');
  });

  it('Position', () => {
    cy.validateFacetNumFilter('Position', '100000', /^56$/);
    cy.validateFacetRank(4, 'Position');
  });

  it('Zygosity - Heterozygote', () => {
    cy.validateFacetFilter('Zygosity', 'Heterozygote', 'HET', /^492K$/);
    cy.validateFacetRank(5, 'Zygosity');
  });

  it('Sources - WGS', () => {
    cy.validateFacetFilter('Sources', 'WGS', 'WGS', /^554K$/);
    cy.validateFacetRank(6, 'Sources');
  });
});
