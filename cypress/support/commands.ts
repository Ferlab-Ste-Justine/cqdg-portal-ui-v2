/// <reference types="Cypress" />
import '@testing-library/cypress/add-commands';
import createUUID from './createUUID';

export interface Replacement {
  placeholder: string;
  value: string;
}

Cypress.Commands.add('checkValueFacetAndApply', (facetTitle: string, value: string) => {
  cy.get(`[aria-expanded="true"] [data-cy="FilterContainer_${facetTitle}"]`).should('exist');
  cy.wait(1000);
  cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__O6v-O')
    .find('button').then(($button) => {
    if ($button.hasClass('ant-btn-link')) {
      cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__O6v-O')
        .find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
      cy.wait(1000);
    };
  });
 
  cy.get(`[data-cy="Checkbox_${facetTitle}_${value}"]`).check({force: true});
  cy.clickAndIntercept(`[data-cy="Apply_${facetTitle}"]`, 'POST', '**/graphql', 3);
});

Cypress.Commands.add('checkValueFacet', (facetTitle: string, value: string) => {
  cy.get(`[aria-expanded="true"] [data-cy="FilterContainer_${facetTitle}"]`).should('exist');
  cy.waitWhileSpin(1000);
  cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__O6v-O')
    .find('button').then(($button) => {
    if ($button.hasClass('ant-btn-link')) {
      cy.get(`[data-cy="FilterContainer_${facetTitle}"]`).parentsUntil('.FilterContainer_filterContainer__O6v-O')
        .find('button[class*="CheckboxFilter_filtersTypesFooter"]').click({force: true});
        cy.waitWhileSpin(1000);
      };
  });

  cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
  cy.get(`[data-cy="Checkbox_${facetTitle}_${value}"]`).check({force: true});
  for (let i = 0; i < 8; i++) {
    cy.wait('@getPOSTgraphql', {timeout: 20*1000});
  };
});

Cypress.Commands.add('clickAndIntercept', (selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number, eq?: number) => {
  if (!eq) {
    eq = 0;
  }

  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.get(selector).eq(eq).click({force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: 20*1000});
  };
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
  cy.session(['user'], () => {
    cy.visit('/dashboard');

    cy.request({
      url: `https://auth.qa.juno.cqdg.ferlab.bio/realms/CQDG/protocol/openid-connect/auth`,
      qs: {
        client_id: 'cqdg-client',
        redirect_uri: Cypress.config('baseUrl'),
        kc_idp_hint: null,
        scope: 'openid',
        state: createUUID(),
        nonce: createUUID(),
        response_type: 'code',
        response_mode: 'fragment',
      },
    }).then((response) => {
      const html: HTMLElement = document.createElement('html');
      html.innerHTML = response.body;

      const script = html.getElementsByTagName('script')[0] as HTMLScriptElement;

      eval(script.textContent ?? '');

      const loginUrl: string = (window as any).kcContext.url.loginAction;

      return cy.request({
        form: true,
        method: 'POST',
        url: loginUrl,
        followRedirect: false,
        body: {
          username: Cypress.env('user_username'),
          password: Cypress.env('user_password'),
        },
      });
    });
    cy.wait(2000);
 });
 cy.visit('/dashboard');

 cy.get('[data-cy*="LangButton"]').invoke('text').then((invokeText) => {
   if (invokeText.includes("EN")) {
//     cy.intercept('PUT', '**/user').as('getPOSTuser');
     cy.get('[data-cy*="LangButton"]').click();
//     cy.wait('@getPOSTuser', {timeout: 20*1000});
   };
 });
});

Cypress.Commands.add('logout', () => {
    cy.visit('/');
    cy.wait(5*1000);

    cy.get('div').then(($div) => {
        if ($div.hasClass('appContainer')) {
            cy.get('[data-cy="UserName"]').click({force: true});
            cy.get('[data-menu-id*="logout"]').click({force: true});
        };
    });

//  cy.exec('npm cache clear --force');
  cy.wait(1000);
});

Cypress.Commands.add('removeFilesFromFolder', (folder: string) => {
  cy.exec(`/bin/rm ${folder}/*`, {failOnNonZeroExit: false});
});

Cypress.Commands.add('resetColumns', (table_id?: string) => {
  let cySettings: Cypress.Chainable;

  if (table_id == undefined) {
    cySettings = cy.get('svg[data-icon="setting"]');
  }
  else {
    cySettings = cy.get(`[id="${table_id}"]`).find('svg[data-icon="setting"]');
  }

  cySettings.click({force: true});
  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').click({force: true});
  cy.get('button[class*="ProTablePopoverColumnResetBtn"]').should('be.disabled', {timeout: 20*1000});
  cySettings.click({force: true});
  cy.get('[class*="Header_logo"]').click({force: true});
});

Cypress.Commands.add('showColumn', (column: string|RegExp) => {
  cy.intercept('PUT', '**/user').as('getPOSTuser');

  cy.get('div[class="ant-popover-inner"]')
    .find('div[class="ant-space-item"]').contains(column)
    .find('[type="checkbox"]').check({force: true});
  cy.wait('@getPOSTuser', {timeout: 20*1000});
  cy.get('[class*="Header_logo"]').click({force: true});
});

Cypress.Commands.add('sortTableAndIntercept', (column: string|RegExp, nbCalls: number) => {
  cy.intercept('POST', '**/graphql').as('getPOSTgraphql');

  cy.get('thead[class="ant-table-thead"]').contains(column).click({force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getPOSTgraphql', {timeout: 60*1000});
  };

  cy.waitWhileSpin(1000);
});

Cypress.Commands.add('sortTableAndWait', (column: string) => {
  cy.get('thead[class="ant-table-thead"]').contains(column).click({force: true});
  cy.wait(1000);
});

Cypress.Commands.add('typeAndIntercept', (selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.get(selector).find('input').type(text, {force: true});

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: 60*1000});
  };
});

Cypress.Commands.add('validateClearAllButton', (shouldExist: boolean) => {
  const strExist = shouldExist ? 'exist' : 'not.exist';
  cy.get('[id="query-builder-header-tools"]').contains('Clear all').should(strExist);
});

Cypress.Commands.add('validateFacetFilter', (facetTitle: string, valueFront: string, valueBack: string, expectedCount: string|RegExp, applyButton: boolean = true) => {
  if (applyButton) {
    cy.checkValueFacetAndApply(facetTitle, valueBack);
    cy.validatePillSelectedQuery(facetTitle, [valueFront]);
  }
  else {
    cy.checkValueFacet(facetTitle, valueBack);
  }

  cy.validateTableResultsCount(expectedCount);
});

Cypress.Commands.add('validateFacetNumFilter', (facetTitle: string, value: string, expectedCount: string|RegExp) => {
  cy.wait(2000);
  cy.get(`[data-cy="InputNumber_Max_${facetTitle}"]`).type(value, {force: true});
  cy.get(`[data-cy="Button_Apply_${facetTitle}"]`).click({force: true});

  cy.validatePillSelectedQuery(facetTitle, [value]);
  cy.get('body').contains(expectedCount).should('exist');
});

Cypress.Commands.add('validateFacetRank', (facetRank: number, facetTitle: string) => {
  cy.get('div[class*="Filter_facetCollapse"], div[class*="Filters_customFilterContainer"]').eq(facetRank).contains(facetTitle).should('exist');
});

Cypress.Commands.add('validateFileContent', (fixture: string, replacements?: Replacement[]) => {
  const arrReplacements = replacements !== undefined ? replacements : [];
  cy.fixture(fixture).then((expectedData) => {
    cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/*`).then((result) => {
      const filename = result.stdout.trim();
      cy.readFile(`${filename}`).then((file) => {
        let fileWithData = file;
        arrReplacements.forEach((replacement) => {
          fileWithData = fileWithData.replace(replacement.placeholder, replacement.value);
        });
        expectedData.content.forEach((value: any) => {
          let valueWithData = value
          arrReplacements.forEach((replacement) => {
            valueWithData = valueWithData.replace(replacement.placeholder, replacement.value);
          });
          expect(fileWithData).to.include(valueWithData);
        });
      });
    });
  });
});

Cypress.Commands.add('validateFileHeaders', (fixture: string) => {
  cy.fixture(fixture).then((expectedData) => {
    cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/*`).then((result) => {
      const filename = result.stdout.trim();
      cy.readFile(`${filename}`).then((file) => {
        expectedData.headers.forEach((header: any) => {
          expect(file).to.include(header);
        });
      });
    });
  });
});

Cypress.Commands.add('validateFileName', (namePattern: string) => {
  cy.exec(`/bin/ls ${Cypress.config('downloadsFolder')}/`+namePattern).then((result) => {
    const filename = result.stdout.trim();
    cy.readFile(`${filename}`).should('exist');
  });
});

Cypress.Commands.add('validateOperatorSelectedQuery', (expectedOperator: string) => {
  cy.get('[class*="QueryBar_selected"]').find('[class*="Combiner_operator"]').contains(expectedOperator).should('exist');
});

Cypress.Commands.add('validatePillSelectedQuery', (facetTitle: string|RegExp, values: (string|RegExp)[], eq: number = 0) => {
  if (facetTitle == '') {
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').should('not.exist');
  }
  else {
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').eq(eq).contains(facetTitle).should('exist');
  }

  for (let i = 0; i < values.length; i++) {
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_queryValuesContainer"]').eq(eq).contains(values[i]).should('exist');
    }
});

Cypress.Commands.add('validateTableFirstRow', (expectedValue: string|RegExp, eq: number) => {
  cy.get('.ant-spin-container').should('not.have.class', 'ant-spin-blur', {timeout: 5*1000});
  cy.get('tr[class*="ant-table-row"]').eq(0)
  .then(($firstRow) => {
    cy.wrap($firstRow).find('td').eq(eq).contains(expectedValue).should('exist');
  });
});

Cypress.Commands.add('validateTableResultsCount', (expectedCount: string|RegExp, shouldExist: boolean = true) => {
  const strExist = shouldExist ? 'exist' : 'not.exist';
  cy.get('div[class*="ProTableHeader"]').contains(expectedCount).should(strExist);
});

Cypress.Commands.add('validateTotalSelectedQuery', (expectedCount: string|RegExp) => {
  cy.get('[class*="QueryBar_selected"]').find('[class*="QueryBar_total"]').contains(expectedCount).should('exist');
});

Cypress.Commands.add('visitAndIntercept', (url: string, methodHTTP: string, routeMatcher: string, nbCalls: number) => {
  cy.intercept(methodHTTP, routeMatcher).as('getRouteMatcher');

  cy.visit(url);

  for (let i = 0; i < nbCalls; i++) {
    cy.wait('@getRouteMatcher', {timeout: 20*1000});
  };
});

Cypress.Commands.add('visitCommunityPage', () => {
  cy.visit('/community');
  cy.get('[data-cy="Title_Community"]', {timeout: 60 * 1000})
});

Cypress.Commands.add('visitDashboard', () => {
  cy.visit('/dashboard');
  cy.get('[data-cy="Title_Dashboard"]', {timeout: 60 * 1000})
});

Cypress.Commands.add('visitDataExploration', (tab?: string, sharedFilterOption?: string) => {
  const strTab = tab !== undefined ? tab : '';
  const strSharedFilterOption = sharedFilterOption !== undefined ? sharedFilterOption : '';
  
  cy.visitAndIntercept(`/data-exploration/${strTab}${strSharedFilterOption}`,
                       'POST',
                       '**/graphql',
                       6);
  if (tab !== undefined) {
    cy.resetColumns();
  };
});

Cypress.Commands.add('visitFileEntity', (fileId: string) => {
  cy.visitAndIntercept(`/files/${fileId}`,
                       'POST',
                       '**/graphql',
                       2);
});

Cypress.Commands.add('visitParticipantEntity', (participantId: string) => {
  cy.visitAndIntercept(`/participants/${participantId}`,
                       'POST',
                       '**/graphql',
                       3);
});

Cypress.Commands.add('visitProfileSettingsPage', () => {
  cy.visit('/profile/settings');
  cy.get('[data-cy="Title_ProfileSettings"]', {timeout: 60 * 1000})
});

Cypress.Commands.add('visitStudyEntity', (studyId: string, nbCalls: number) => {
  cy.visitAndIntercept(`/studies/${studyId}`,
                       'POST',
                       '**/graphql',
                       nbCalls);
});

Cypress.Commands.add('visitStudiesPage', () => {
  cy.visitAndIntercept('/studies',
                       'POST',
                       '**/graphql',
                       4);
  cy.resetColumns();
});

Cypress.Commands.add('visitVariantEntityPage', (locusId: string, nbGraphqlCalls: number) => {
  cy.visitAndIntercept(`/variants/${locusId}`,
                       'POST',
                       '**/graphql',
                       nbGraphqlCalls);
});

Cypress.Commands.add('visitVariantsPage', (sharedFilterOption?: string) => {
  const strSharedFilterOption = sharedFilterOption !== undefined ? sharedFilterOption : '';
  cy.visitAndIntercept('/variants'+strSharedFilterOption,
                       'POST',
                       '**/graphql',
                       3);
  cy.resetColumns();
});

Cypress.Commands.add('waitWhileSpin', (ms: number) => {
  cy.get('body').should(($body) => {
    if ($body.hasClass('ant-spin-container')) {
      cy.get('.ant-spin-container').should('not.have.class', 'ant-spin-blur', {timeout: ms});
    }
  });
});

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));