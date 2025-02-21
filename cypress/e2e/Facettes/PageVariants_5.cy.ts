/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage();
  cy.get('[data-cy="SidebarMenuItem_Frequency"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
});

describe('Page des variants (Frequency) - Filtrer avec les facettes', () => {
  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('CQDG Allele Frequency (WGS)', () => {
    cy.validateFacetNumFilter('CQDG Allele Frequency (WGS)', '0.5', /^366K$/);
    cy.validateFacetRank(0, 'CQDG Allele Frequency (WGS)');
  });

  it('CQDG Participant Frequency (WGS)', () => {
    cy.validateFacetNumFilter('CQDG Participant Frequency (WGS)', '0.5', /^231K$/);
    cy.validateFacetRank(1, 'CQDG Participant Frequency (WGS)');
  });

  it('gnomAD Genome 2.1', () => {
    cy.validateFacetNumFilter('gnomAD Genome 2.1', '0.01', /^21.8K$/);
    cy.validateFacetRank(2, 'gnomAD Genome 2.1');
  });

  it('gnomAD Genome 3.1.2', () => {
    cy.validateFacetNumFilter('gnomAD Genome 3.1.2', '0.01', /^26.6K$/);
    cy.validateFacetRank(3, 'gnomAD Genome 3.1.2');
  });

  it('gnomAD Exome 2.1', () => {
    cy.validateFacetNumFilter('gnomAD Exome 2.1', '0.01', /^542$/);
    cy.validateFacetRank(4, 'gnomAD Exome 2.1');
  });

  it('TopMed', () => {
    cy.validateFacetNumFilter('TopMed', '0.01', /^26.1K$/);
    cy.validateFacetRank(5, 'TopMed');
  });

  it('1000 Genomes', () => {
    cy.validateFacetNumFilter('1000 Genomes', '0.01', /^1,324$/);
    cy.validateFacetRank(6, '1000 Genomes');
  });
});
