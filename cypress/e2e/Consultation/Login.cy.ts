/// <reference types="Cypress" />
import '../../support/commands';

describe('Page Login', () => {
  it('Vérifier les informations affichées', () => {
    cy.visit('/');

    cy.contains(/(Données disponibles|Available Data)/).should('exist');
    cy.get('[data-cy="DataRelease_Study"]').contains(/\d{1}/).should('exist');
    cy.get('[data-cy="DataRelease_Study"]').contains(/(Étude|Studies)/).should('exist');
    cy.get('[data-cy="DataRelease_Participant"]').contains(/\d{1}/).should('exist');
    cy.get('[data-cy="DataRelease_Participant"]').contains('Participants').should('exist');
    cy.get('[data-cy="DataRelease_Biospecimen"]').contains(/\d{1}/).should('exist');
    cy.get('[data-cy="DataRelease_Biospecimen"]').contains(/Biosp(é|e)cimens/).should('exist');
    cy.get('[data-cy="DataRelease_File"]').contains(/\.\d{1}TB/).should('exist');
    cy.get('[data-cy="DataRelease_File"]').contains(/(Fichiers|Files)/).should('exist');

    cy.contains(/(Portail de données|Data Portal)/).should('exist');
    cy.contains(/(Le Centre québécois de données génomiques est une plateforme d'harmonisation et de diffusion des données génomiques générées par les études cliniques et de recherche du Québec.|The Quebec Center for Genomic Data is a platform for the harmonization and dissemination of genomic data generated by clinical and research studies in Quebec.)/).should('exist');
    cy.get('[data-cy="Login"]').contains(/(Connexion|Login)/).should('exist');
    cy.get('[data-cy="Signup"]').contains(/(Créer un compte|Sign up)/).should('exist');
  });
});
