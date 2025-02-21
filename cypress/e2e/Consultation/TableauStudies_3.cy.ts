/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudiesPage();
  cy.showColumn('Population');
  cy.showColumn('Access Limitation');
  cy.showColumn('Access Requirement');
  cy.showColumn('Overall Design');
  cy.showColumn('Data Collection Method');
  cy.showColumn('Principal Investigators');
  cy.showColumn('Contact Persons');
  cy.showColumn('Affiliated Institutions');
  cy.showColumn('Inclusion and Exclusion Criteria');
  cy.showColumn('Description');
});

describe('Page des études - Valider les fonctionnalités du tableau', () => {
  it('Tri Code', () => {
    cy.sortTableAndWait('Code');
    cy.validateTableFirstRow('STUDY1', 0);
    cy.sortTableAndWait('Code');
    cy.validateTableFirstRow('T-DEE', 0);
  });

  it('Tri Name', () => {
    cy.sortTableAndWait('Name');
    cy.validateTableFirstRow('Congenital malformations', 1);
    cy.sortTableAndWait('Name');
    cy.validateTableFirstRow('Developmental and epileptic encephalopathies', 1);
  });
    
  it('Tri Domain', () => {
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow('Neurodevelopmental Conditions', 2);
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow('Rare Diseases', 2);
  });
    
  it('Tri Population', () => {
    cy.sortTableAndWait('Population');
    cy.validateTableFirstRow('Pediatric and adult', 3);
    cy.sortTableAndWait('Population');
    cy.validateTableFirstRow('Pediatric and adult', 3);
  });

  it('Tri multiple', () => {
    cy.sortTableAndWait('Population');
    cy.sortTableAndWait('Domain');
    cy.validateTableFirstRow('Neurodevelopmental Conditions', 2);
  });
});
