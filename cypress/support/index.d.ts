/// <reference types="Cypress" />
/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    checkValueFacetAndApply(facetRank: number, value: string|RegExp): cy & CyEventEmitter;
    clickAndIntercept(selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    closePopup(): cy & CyEventEmitter;
    login(): cy & CyEventEmitter;
    logout(): cy & CyEventEmitter;
    resetColumns(): cy & CyEventEmitter;
    showColumn(column: string): cy & CyEventEmitter;
    typeAndIntercept(selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    visitAndIntercept(url: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    visitCommunityPage(): cy & CyEventEmitter;
    visitDashboard(): cy & CyEventEmitter;
    visitDataExploration(tab?: string): cy & CyEventEmitter;
    visitFileEntity(fileId: string): cy & CyEventEmitter;
    visitParticipantEntity(participantId: string): cy & CyEventEmitter;
    visitProfileSettingsPage(): cy & CyEventEmitter;
    visitStudiesPage(): cy & CyEventEmitter;
    visitVariantEntityPage(locusId: string, nbGraphqlCalls: number): cy & CyEventEmitter;
    visitVariantsPage(): cy & CyEventEmitter;

    loginByGoogleApi(): cy & CyEventEmitter;
  }
}