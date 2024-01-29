/// <reference types="Cypress" />
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

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');
  });

  it('Search by study - STUDY1', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by study').should('exist');

    cy.get('[data-cy="SearchLabel_InfoCircleOutlined"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"]').contains('Search by study code, name or domain').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'STUDY1', 'POST', '*/grapgql', 3);
    cy.wait(1000);
    cy.get('[data-cy="Search_Dropdown"]').contains('STUDY1').should('exist');
    cy.get('[data-cy="Search_Dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_STUDY1"]').should('exist');
    cy.validateTableResultsCount(/^1 Results$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[data-cy="Tag_STUDY1"]').should('not.exist');
  });

  it('Search by study - T-DEE', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'T-DEE', 'POST', '*/grapgql', 5);
    cy.wait(1000);
    cy.get('[data-cy="Search_Dropdown"]').contains('T-DEE').should('exist');
    cy.get('[data-cy="Search_Dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_T-DEE"]').should('exist');
    cy.validateTableResultsCount(/^1 Results$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[data-cy="Tag_T-DEE"]').should('not.exist');
  });

  it('Domain - Rare Diseases', () => {
    cy.validateFacetFilter('Domain', 'Rare diseases', 'rare diseases', /^1 Results$/, false);
    cy.validateFacetRank(0, 'Domain');
  });

  it('Domain - Neurodevelopmental conditions', () => {
    cy.validateFacetFilter('Domain', 'Neurodevelopmental conditions', 'neurodevelopmental conditions', /^2 Results$/, false);
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

  it('Access Requirement - User specific restriction (DUO:0000026)', () => {
    cy.validateFacetFilter('Access Requirement', 'User specific restriction (DUO:0000026)', 'user specific restriction (DUO:0000026)', /^3 Results$/, false);
  });
});
