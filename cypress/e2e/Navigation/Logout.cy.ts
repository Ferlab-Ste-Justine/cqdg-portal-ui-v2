/// <reference types="Cypress" />
import '../../support/commands';

describe('Page Logout', () => {

  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('Vérifier les informations affichées', () => {
    cy.logout();

    cy.contains('Available Data').should('exist');
    cy.get('[data-cy="DataRelease_Study"]').contains(/\d{1}/).should('exist');
    cy.get('[data-cy="DataRelease_Study"]').contains('Stud').should('exist');
    cy.get('[data-cy="DataRelease_Participant"]').contains(/\d{1}/).should('exist');
    cy.get('[data-cy="DataRelease_Participant"]').contains('Participants').should('exist');
    cy.get('[data-cy="DataRelease_Biospecimen"]').contains(/\d{1}/).should('exist');
    cy.get('[data-cy="DataRelease_Biospecimen"]').contains('Biospecimens').should('exist');
    cy.get('[data-cy="DataRelease_File"]').contains(/\.\d{1}TB/).should('exist');
    cy.get('[data-cy="DataRelease_File"]').contains('Data Files').should('exist');

    cy.contains('Data Portal').should('exist');
    cy.contains('The Quebec Genomic Data Center is a data harmonization and sharing platform for genomic datasets produced by Quebec\'s clinical and research studies.').should('exist');
    cy.get('[data-cy="Login"]').contains('Login').should('exist');
    cy.get('[data-cy="Signup"]').contains('Sign up').should('exist');

    cy.get('img[src*="/static/media/genome_qc."]').should('exist');
    cy.get('img[src*="/static/media/FRQS."]').should('exist');
    cy.get('img[src*="/static/media/FCI."]').should('exist');
  });
});
