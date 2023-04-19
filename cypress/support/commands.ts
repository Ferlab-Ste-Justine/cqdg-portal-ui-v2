/// <reference types="Cypress" />
import '@testing-library/cypress/add-commands';

// Add Custom commands here and their types in `./index.d.ts`

Cypress.Commands.add('checkValueFacet', (facetRank: number, value: string|RegExp) => {
  cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
    .find('button').then(($button) => {
      if ($button.hasClass('ant-btn-link')) {
          cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
            .find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
      };
  });

  cy.intercept('POST', '**/graphql').as('getPOSTgraphql');

  cy.get('div[class="Filter_facetCollapse__ft2Q2"]').eq(facetRank)
    .find('div[class*="CheckboxFilter_checkboxFilterItem"]').contains(value)
    .find('[type="checkbox"]').check({force: true});

  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
});

Cypress.Commands.add('clickAndIntercept', (selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.get(selector).click({force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: 20*1000});
  };
});

Cypress.Commands.add('clickApplyFacet', () => {
  cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
  
  cy.get('span[data-key="apply"]', {timeout: 20*1000}).click({force: true});
  
  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
  cy.wait('@getPOSTgraphql', {timeout: 20*1000});
});

Cypress.Commands.add('closePopup', () => {
  cy.get('body')
    .find('button').then(($button) => {
      if ($button.hasClass('close')) {
          cy.get('body').find('button[class="close"]').click({force: true});
      };
  });
});

Cypress.Commands.add('login', () => {
  ///////////////////////////////////////////
  ///// C'est shaky, mais ça fonctionne /////
  ///// À exécuter avec firefox         /////
  ///// cypress run -b firefox          /////
  ///// Pas avec npm run cypress:open   /////
  ///////////////////////////////////////////
  cy.session(['user'], () => {
    cy.visit('/dashboard');
    cy.get('button[class*="ant-btn-primary"]').click({force: true});
    cy.get('[id="social-google"]').click({force: true});

    cy.origin('https://accounts.google.com/', () => {
      cy.wait(2000);
      cy.get('input[type="email"]').type(Cypress.env('google_Username'));
      cy.get('button[type="button"]').contains('Suivant').click({force: true});
      });

    cy.origin('https://accounts.google.com/', () => {
      Cypress.on('uncaught:exception', (err) => !err.message.includes('ResizeObserver loop'));
      cy.wait(5000);
      cy.get('input[type="password"]').type(Cypress.env('google_Password'), {log: false});
      cy.get('button[type="button"]').contains('Suivant').click({force: true});
    });

    cy.wait(2000);
    cy.visit('/variants/');

    cy.wait(2000);
    cy.get('button[class*="ant-btn-primary"]').click({force: true});
    cy.get('[id="social-google"]').click({force: true});
 });
});

Cypress.Commands.add('logout', () => {
    cy.visit('/');
    cy.wait(5*1000);

    cy.get('div').then(($div) => {
        if ($div.hasClass('App')) {
            cy.get('span[class="anticon anticon-down"]').click({force: true});
            cy.get('[data-menu-id*="logout"]').click({force: true});
        };
    });

  cy.exec('npm cache clear --force');
  cy.wait(1000);
});

Cypress.Commands.add('resetColumns', (eq: number) => {
  cy.get('svg[data-icon="setting"]').eq(eq).click({force: true});
  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').eq(eq).click({force: true});

  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').should('be.disabled', {timeout: 20*1000});
});

Cypress.Commands.add('typeAndIntercept', (selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.get(selector).type(text, {force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: 60*1000});
  };
});

Cypress.Commands.add('visitAndIntercept', (url: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.visit(url);

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: 20*1000});
  };
});

Cypress.Commands.add('visitVariantEntityPage', (locusId: string, nbGraphqlCalls: number) => {
  cy.visitAndIntercept('/variants/' + locusId + '/summary',
                       'POST',
                       '**/graphql',
                       nbGraphqlCalls);
});

Cypress.Commands.add('visitVariantsPage', () => {
  cy.visitAndIntercept('/variants',
                       'POST',
                       '**/graphql',
                       3);
  cy.resetColumns(0);
});

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));