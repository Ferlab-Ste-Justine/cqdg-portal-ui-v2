/// <reference types="Cypress" />
/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    checkValueFacet(facetRank: number, value: string|RegExp): cy & CyEventEmitter;
    clickAndIntercept(selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    clickApplyFacet(): cy & CyEventEmitter;
    closePopup(): cy & CyEventEmitter;
    login(): cy & CyEventEmitter;
    logout(): cy & CyEventEmitter;
    resetColumns(eq: number): cy & CyEventEmitter;
    typeAndIntercept(selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    visitAndIntercept(url: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    visitVariantEntityPage(locusId: string, nbGraphqlCalls: number): cy & CyEventEmitter;
    visitVariantsPage(): cy & CyEventEmitter;

    loginByGoogleApi(): cy & CyEventEmitter;
  }
}