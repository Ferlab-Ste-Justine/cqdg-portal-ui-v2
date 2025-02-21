/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage();
});

describe('Page des variants - Consultation du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('chr1:g.100000723G>A', 1, true);
    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('chr1:g.99999849A>G', 1, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('SNV', 2, true);
    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('Ins', 2, true);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    cy.sortTableAndIntercept(/^gnomAD$/, 1);
    cy.validateTableFirstRow('-', 10, true);
    cy.sortTableAndIntercept(/^gnomAD$/, 1);
    cy.validateTableFirstRow('1.00e+0', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow(/^0$/, 11, true);
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('152K', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Part.', () => {
    cy.sortTableAndIntercept('Part.', 1);
    cy.validateTableFirstRow(/^1/, 12, true);
    cy.sortTableAndIntercept('Part.', 1);
    cy.validateTableFirstRow(/^6/, 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Freq.', () => {
    cy.showColumn('Freq.');

    cy.sortTableAndIntercept('Freq.', 1);
    cy.validateTableFirstRow('8.33e-2', 14, true);
    cy.sortTableAndIntercept('Freq.', 1);
    cy.validateTableFirstRow('1.00e+0', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri ALT', () => {
    cy.showColumn(/^ALT$/);

    cy.sortTableAndIntercept(/^ALT$/, 1);
    cy.validateTableFirstRow(/^1$/, 14, true);
    cy.sortTableAndIntercept(/^ALT$/, 1);
    cy.validateTableFirstRow(/^12$/, 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Homo.', () => {
    cy.showColumn('Homo.');

    cy.sortTableAndIntercept('Homo.', 1);
    cy.validateTableFirstRow(/^0$/, 14, true);
    cy.sortTableAndIntercept('Homo.', 1);
    cy.validateTableFirstRow(/^6$/, 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndWait('Type');
    cy.sortTableAndWait('Type');
    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('chr1:g.100002795dup', 1, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('20').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Previous').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('First').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
