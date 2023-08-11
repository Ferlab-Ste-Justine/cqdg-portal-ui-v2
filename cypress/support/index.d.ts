/// <reference types="Cypress" />
/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    checkValueFacetAndApply(facetRank: number, value: string|RegExp): cy & CyEventEmitter;
    clickAndIntercept(selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number, eq?: number): cy & CyEventEmitter;
    closePopup(): cy & CyEventEmitter;
    login(): cy & CyEventEmitter;
    logout(): cy & CyEventEmitter;
    removeFilesFromFolder(folder: string): cy & CyEventEmitter;
    resetColumns(table_id?: string): cy & CyEventEmitter;
    showColumn(column: string): cy & CyEventEmitter;
    typeAndIntercept(selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    validateFileContent(fixture: string, replacements?: Replacement[]): cy & CyEventEmitter;
    validateFileHeaders(fixture: string): cy & CyEventEmitter;
    validateFileName(namePattern: string): cy & CyEventEmitter;
    visitAndIntercept(url: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    visitCommunityPage(): cy & CyEventEmitter;
    visitDashboard(): cy & CyEventEmitter;
    visitDataExploration(tab?: string, sharedFilterOption?: string): cy & CyEventEmitter;
    visitFileEntity(fileId: string): cy & CyEventEmitter;
    visitParticipantEntity(participantId: string): cy & CyEventEmitter;
    visitProfileSettingsPage(): cy & CyEventEmitter;
    visitStudyEntity(studyId: string): cy & CyEventEmitter;
    visitStudiesPage(): cy & CyEventEmitter;
    visitVariantEntityPage(locusId: string, nbGraphqlCalls: number): cy & CyEventEmitter;
    visitVariantsPage(sharedFilterOption?: string): cy & CyEventEmitter;

    loginByGoogleApi(): cy & CyEventEmitter;
  }
}