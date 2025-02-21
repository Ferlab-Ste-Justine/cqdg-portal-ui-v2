/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudyEntity('T-DEE', 1);
});

describe('Page d\'une étude - Valider les panneaux masquables', () => {
  it('Panneau Summary', () => {
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data_access"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_access"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_access"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_access"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_access"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Files', () => {
    cy.get('[id="data_file"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_file"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_file"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_file"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_file"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau data1', () => {
    cy.visitStudyEntity('STUDY1', 1);
    cy.get('[id="dataset"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="dataset"]').eq(1).find('span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="dataset"]').eq(1).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="dataset"]').eq(1).find('span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="dataset"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});
