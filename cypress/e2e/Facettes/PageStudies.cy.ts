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
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');
  });

  it('Study Code - STUDY1', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by study').should('exist');

    cy.get('[data-cy="SearchLabel_InfoCircleOutlined"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"]').contains('Search by study code, name or domain').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'STUDY1', 'POST', '*/grapgql', 3);
    cy.wait(1000);
    cy.get('[data-cy="Search_Dropdown"]').contains('STUDY1').should('exist');
    cy.get('[data-cy="Search_Dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_STUDY1"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('STUDY1').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1 Results$/).should('exist');

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[data-cy="Tag_STUDY1"]').should('not.exist');
  });

  it('Study Code - T-DEE', () => {
    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'T-DEE', 'POST', '*/grapgql', 5);
    cy.wait(1000);
    cy.get('[data-cy="Search_Dropdown"]').contains('T-DEE').should('exist');
    cy.get('[data-cy="Search_Dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_T-DEE"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('T-DEE').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1 Results$/).should('exist');

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[data-cy="Tag_T-DEE"]').should('not.exist');
  });

  it('Domain - Rare Diseases [CQDG-472]', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Rare Diseases').should('exist');
    cy.checkValueFacet(0, 'Rare Diseases');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Domain').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Rare Diseases').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1 Results$/).should('exist');
  });

  it('Domain - Neurodevelopmental conditions', () => {
    cy.checkValueFacet(0, 'Neurodevelopmental conditions');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Domain').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Neurodevelopmental conditions').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2 Results$/).should('exist');
  });

  it('Population - Pediatric and adult', () => {
    cy.checkValueFacet(1, 'Pediatric and adult');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Population').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Pediatric and adult').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3 Results$/).should('exist');
  });

  it('Access Limitation - Health or medical or biomedical research (DUO:0000006)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('Access Limitation').should('exist');
    cy.checkValueFacet(2, 'Health or medical or biomedical research (DUO:0000006)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Access Limitation').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Health or medical or biomedical research (DUO:0000006)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3 Results$/).should('exist');
  });

  it('Access Requirement - Genetic studies only (DUO:0000016)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('Access Requirement').should('exist');
    cy.checkValueFacet(3, 'Genetic studies only (DUO:0000016)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Access Requirement').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Genetic studies only (DUO:0000016)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3 Results$/).should('exist');
  });

  it('Access Requirement - User specific restriction (DUO:0000026)', () => {
    cy.checkValueFacet(3, 'User specific restriction (DUO:0000026)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Access Requirement').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('User specific restriction (DUO:0000026)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3 Results$/).should('exist');
  });
});
