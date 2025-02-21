/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudiesPage();
});

describe('Page des études - Filtrer avec les facettes', () => {
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

  it('Domain - Rare Diseases', () => {
    cy.validateFacetFilter('Domain', 'Rare diseases', 'rare diseases', /^1 Result$/, false);
    cy.validateFacetRank(0, 'Domain');
  });

  it('Population - Pediatric and adult', () => {
    cy.validateFacetFilter('Population', 'Pediatric and adult', 'Pediatric and adult', /\d{1} Results/, false);
    cy.validateFacetRank(1, 'Population');
  });

  it('Access Limitation - Health or medical or biomedical research (DUO:0000006)', () => {
    cy.validateFacetFilter('Access Limitation', 'Health or medical or biomedical research (DUO:0000006)', 'health or medical or biomedical research (DUO:0000006)', /\d{1} Results/, false);
    cy.validateFacetRank(2, 'Access Limitation');
  });

  it('Access Requirement - Genetic studies only (DUO:0000016)', () => {
    cy.validateFacetFilter('Access Requirement', 'Genetic studies only (DUO:0000016)', 'genetic studies only (DUO:0000016)', /\d{1} Results/, false);
    cy.validateFacetRank(3, 'Access Requirement');
  });

  it('Data Category - Genomics', () => {
    cy.validateFacetFilter('Data Category', 'Genomics', 'Genomics', /\d{1} Results/, false);
    cy.validateFacetRank(4, 'Data Category');
  });

  it('Overall Design - Case only', () => {
    cy.validateFacetFilter('Overall Design', 'Case only', 'Case only', /\d{1} Results/, false);
    cy.validateFacetRank(5, 'Overall Design');
  });

  it('Data Collection Method - Medical Records', () => {
    cy.validateFacetFilter('Data Collection Method', 'Medical Records', 'Medical Records', /\d{1} Results/, false);
    cy.validateFacetRank(6, 'Data Collection Method');
  });
});
