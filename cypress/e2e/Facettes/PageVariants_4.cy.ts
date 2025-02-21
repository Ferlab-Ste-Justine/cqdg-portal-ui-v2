/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage();
  cy.get('[data-cy="SidebarMenuItem_Pathogenicity"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
});

describe('Page des variants (Pathogenicity) - Filtrer avec les facettes', () => {
  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('ClinVar - Likely Benign', () => {
    cy.validateFacetFilter('ClinVar', 'Likely Benign', 'Likely_benign', /^314$/);
    cy.validateFacetRank(0, 'ClinVar');
  });

  it('VEP - MODIFIER', () => {
    cy.validateFacetFilter('VEP', 'MODIFIER', 'MODIFIER', /^552K$/);
    cy.validateFacetRank(1, 'VEP');
  });

  it('CADD (Raw)', () => {
    cy.validateFacetNumFilter('CADD (Raw)', '0.01', /^377$/);
    cy.validateFacetRank(2, 'CADD (Raw)');
  });

  it('CADD (Phred)', () => {
    cy.validateFacetNumFilter('CADD (Phred)', '0.01', /^81$/);
    cy.validateFacetRank(3, 'CADD (Phred)');
  });

  it('DANN', () => {
    cy.validateFacetNumFilter('DANN', '0.1', /^31$/);
    cy.validateFacetRank(4, 'DANN');
  });

  it('FATHMM - Tolerated', () => {
    cy.validateFacetFilter('FATHMM', 'Tolerated', 'T', /^1,427$/);
    cy.validateFacetRank(5, 'FATHMM');
  });

  it('LRT - Neutral', () => {
    cy.validateFacetFilter('LRT', 'Neutral', 'N', /^1,083$/);
    cy.validateFacetRank(6, 'LRT');
  });

  it('PolyPhen-2 HVAR - Benign', () => {
    cy.validateFacetFilter('PolyPhen-2 HVAR', 'Benign', 'B', /^1,267$/);
    cy.validateFacetRank(7, 'PolyPhen-2 HVAR');
  });

  it('REVEL', () => {
    cy.validateFacetNumFilter('REVEL', '0.01', /^55$/);
    cy.validateFacetRank(8, 'REVEL');
  });

  it('SpliceAI', () => {
    cy.validateFacetNumFilter('SpliceAI', '0.01', /^172K$/);
    cy.validateFacetRank(9, 'SpliceAI');
  });

  it('SIFT - Tolerated', () => {
    cy.validateFacetFilter('SIFT', 'Tolerated', 'T', /^1,257$/);
    cy.validateFacetRank(10, 'SIFT');
  });
});
