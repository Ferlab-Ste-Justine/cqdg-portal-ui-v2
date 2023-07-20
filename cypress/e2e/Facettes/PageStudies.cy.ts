/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Studies - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitStudiesPage();
  });

  it('Study Code - CAG', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by study').should('exist');

    cy.get('[data-cy="SearchLabel_InfoCircleOutlined"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"]').contains('Search by study code or study name').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'cag', 'POST', '*/grapgql', 3);
    cy.wait(1000);
    cy.get('[data-cy="Search_Dropdown"]').contains('CAG').should('exist');
    cy.get('[data-cy="Search_Dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_CAG"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('CAG').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1 Results$/).should('exist');

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[data-cy="Tag_CAG"]').should('not.exist');
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

  it('Domain - General health', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('General health').should('exist');
    cy.checkValueFacetAndApply(0, 'General health');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Domain').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('General health').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1 Results$/).should('exist');
  });

  it('Domain - Neurodevelopmental conditions', () => {
    cy.checkValueFacetAndApply(0, 'Neurodevelopmental conditions');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Domain').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Neurodevelopmental conditions').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1 Results$/).should('exist');
  });

  it('Population - Adult', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('Population').should('exist');
    cy.checkValueFacetAndApply(1, 'Adult');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Population').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Adult').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1 Results$/).should('exist');
  });

  it('Population - Pediatric and adult', () => {
    cy.checkValueFacetAndApply(1, 'Pediatric and adult');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Population').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Pediatric and adult').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3 Results$/).should('exist');
  });

  it('Population - Adult', () => {
    cy.checkValueFacetAndApply(1, 'Adult');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Population').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Adult').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1 Results$/).should('exist');
  });

  it('Access Limitation - Health or medical or biomedical research (DUO:0000006)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('Access Limitation').should('exist');
    cy.checkValueFacetAndApply(2, 'Health or medical or biomedical research (DUO:0000006)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Access Limitation').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Health or medical or biomedical research (DUO:0000006)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3 Results$/).should('exist');
  });

  it('Access Limitation - No Data [CQDG-278]', () => {
    cy.checkValueFacetAndApply(2, 'No Data');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Access Limitation').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('No Data').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3 Results$/).should('exist');
  });

  it('Access Requirement - Genetic studies only (DUO:0000016)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('Access Requirement').should('exist');
    cy.checkValueFacetAndApply(3, 'Genetic studies only (DUO:0000016)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Access Requirement').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Genetic studies only (DUO:0000016)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3 Results$/).should('exist');
  });

  it('Access Requirement - Return to database or resource (DUO:0000029)', () => {
    cy.checkValueFacetAndApply(3, 'Return to database or resource (DUO:0000029)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Access Requirement').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Return to database or resource (DUO:0000029)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1 Results$/).should('exist');
  });
});
