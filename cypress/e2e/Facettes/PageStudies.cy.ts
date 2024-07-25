/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page des études - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitStudiesPage();
  });

  it('Expand all/Collapse all', () => {
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');
  });

  it('Search by study code - STUDY1', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search study').should('exist');

    cy.get('[data-cy="SearchLabel_InfoCircleOutlined"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"]').contains('Search by study code, name, domain or keyword').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'study1', 'POST', '*/grapgql', 3);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('STUDY1').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).clickAndWait({force: true});

    cy.get('[data-cy="Tag_STUDY1"]').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_STUDY1"]').should('not.exist');
  });

  it('Search by study name - Congenital', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'congenital', 'POST', '*/grapgql', 5);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('STUDY1').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).clickAndWait({force: true});

    cy.get('[data-cy="Tag_STUDY1"]').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_STUDY1"]').should('not.exist');
  });

  it('Search by study domain - Diseases', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'diseases', 'POST', '*/grapgql', 5);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('STUDY1').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).clickAndWait({force: true});

    cy.get('[data-cy="Tag_STUDY1"]').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy="Tag_STUDY1"]').should('not.exist');
  });

  it('Search by study keyword - family', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'FAMILY', 'POST', '*/grapgql', 5);
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').contains('STUDY2').should('exist');
    cy.get('[data-cy="Search_Dropdown"] [class*="ant-select-item"]').eq(0).clickAndWait({force: true});

    cy.get('[data-cy*="Tag_"]').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').clickAndWait({force: true});
    cy.get('[data-cy*="Tag_"]').should('not.exist');
  });

  it('Domain - Rare Diseases', () => {
    cy.validateFacetFilter('Domain', 'Rare diseases', 'rare diseases', /^1 Result$/, false);
    cy.validateFacetRank(0, 'Domain');
  });

  it('Population - Pediatric and adult', () => {
    cy.validateFacetFilter('Population', 'Pediatric and adult', 'Pediatric and adult', /^3 Results$/, false);
    cy.validateFacetRank(1, 'Population');
  });

  it('Access Limitation - Health or medical or biomedical research (DUO:0000006)', () => {
    cy.validateFacetFilter('Access Limitation', 'Health or medical or biomedical research (DUO:0000006)', 'health or medical or biomedical research (DUO:0000006)', /^3 Results$/, false);
    cy.validateFacetRank(2, 'Access Limitation');
  });

  it('Access Requirement - Genetic studies only (DUO:0000016)', () => {
    cy.validateFacetFilter('Access Requirement', 'Genetic studies only (DUO:0000016)', 'genetic studies only (DUO:0000016)', /^3 Results$/, false);
    cy.validateFacetRank(3, 'Access Requirement');
  });
});
