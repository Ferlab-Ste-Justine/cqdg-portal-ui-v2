/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('datafiles');
  cy.showColumn('Dataset');
  cy.showColumn('File Name');
  cy.showColumn('Platform');
});

describe('Page Data Exploration (Data Files) - Valider les fonctionnalités du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    cy.sortTableAndWait('Study');
    cy.validateTableFirstRow('STUDY1', 4, true);
    cy.sortTableAndWait('Study');
    cy.validateTableFirstRow('T-DEE', 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Dataset', () => {
    cy.sortTableAndWait('Dataset');
    cy.validateTableFirstRow('Data1', 5, true);
    cy.sortTableAndWait('Dataset');
    cy.validateTableFirstRow('Data2', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Data Category', () => {
    cy.sortTableAndWait('Data Category');
    cy.validateTableFirstRow('Genomics', 6, true);
    cy.sortTableAndWait('Data Category');
    cy.validateTableFirstRow('Genomics', 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Data Type', () => {
    cy.sortTableAndWait('Data Type');
    cy.validateTableFirstRow('Aligned Reads', 7, true);
    cy.sortTableAndWait('Data Type');
    cy.validateTableFirstRow('Supplement', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Strategy', () => {
    cy.sortTableAndWait('Strategy');
    cy.validateTableFirstRow('WGS', 8, true);
    cy.sortTableAndWait('Strategy');
    cy.validateTableFirstRow('WGS', 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Format', () => {
    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow('CRAM', 9, true);
    cy.sortTableAndWait('Format');
    cy.validateTableFirstRow('gVCF', 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Size', () => {
    cy.sortTableAndWait('Size');
    cy.validateTableFirstRow('0 B', 10, true);
    cy.sortTableAndWait('Size');
    cy.validateTableFirstRow('10.7 GB', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Platform', () => {
    cy.sortTableAndWait('Platform');
    cy.validateTableFirstRow('Illumina HiSeq 2000 PE100', 14, true);
    cy.sortTableAndWait('Platform');
    cy.validateTableFirstRow('NovaSeq S4 PE150', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndWait('Format');
    cy.sortTableAndWait('Study');
    cy.sortTableAndWait('Study');
    cy.validateTableFirstRow('T-DEE', 4, true);
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
