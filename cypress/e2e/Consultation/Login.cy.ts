/// <reference types="Cypress" />
import '../../support/commands';

describe('Page Login', () => {
  it('Vérifier les informations affichées', () => {
    cy.visit('/');

    cy.contains('Données disponibles').should('exist');
    cy.get('[data-cy="DataRelease_Study"]').contains(/\d{1}/).should('exist');
    cy.get('[data-cy="DataRelease_Study"]').contains('Étude').should('exist');
    cy.get('[data-cy="DataRelease_Participant"]').contains(/\d{1}/).should('exist');
    cy.get('[data-cy="DataRelease_Participant"]').contains('Participants').should('exist');
    cy.get('[data-cy="DataRelease_Biospecimen"]').contains(/\d{1}/).should('exist');
    cy.get('[data-cy="DataRelease_Biospecimen"]').contains('Biospécimens').should('exist');
    cy.get('[data-cy="DataRelease_File"]').contains('TB').should('exist');
    cy.get('[data-cy="DataRelease_File"]').contains('Fichiers').should('exist');

    cy.contains('Portail de données').should('exist');
    cy.contains('Le Centre québécois de données génomiques est une plateforme d\'harmonisation et de diffusion des données génomiques générées par les études cliniques et de recherche du Québec.').should('exist');
    cy.get('[data-cy="Login"]').contains('Connexion').should('exist');
    cy.get('[data-cy="Signup"]').contains('Créer un compte').should('exist');
  });
});
