/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudyEntity('T-DEE', 1);
});

describe('Page d\'une étude - Bouton Request Access', () => {
  beforeEach(() => {
    cy.get('[class*="EntityTitle"] [data-cy="RequestAccess_Button"]').click({force: true});
  });

  it('Vérifier les informations affichées - Modal', () => {
    cy.get('[class="ant-modal-title"]').contains('Request access').should('exist');
    cy.get('[class="ant-modal-body"]').contains('To obtain access to the data from this study, please submit your request to the study’s Access Authority:').should('exist');
    cy.get('[class="ant-modal-body"]').contains('jacques.michaud.med@ssss.gouv.qc.ca').should('exist');
    cy.get('[class="ant-modal-body"]').contains('Before submitting your request, please ensure you are able to comply with the study’s Access Limitations and Access Requirements listed in the “Data Access” section.').should('exist');
    cy.get('[class="ant-modal-body"]').contains('To find out more, please read the page').should('exist');
    cy.get('[class="ant-modal-body"]').contains('Data Access Request').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] thead th').eq(0).contains('Study').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] thead th').eq(1).contains('Study Code').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] thead th').eq(2).contains('Files').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] [data-row-key="T-DEE"] td').eq(0).contains('Developmental and epileptic encephalopathies').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] [data-row-key="T-DEE"] td').eq(1).contains('T-DEE').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] [data-row-key="T-DEE"] td').eq(2).contains('2940').should('exist');

    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').contains('Cancel').should('exist');
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').contains('Download').should('exist');
  });

  it('Valider les liens disponibles - Lien Access Authority', () => {
    cy.get('[class*="ant-modal-body"] [href="mailto:jacques.michaud.med@ssss.gouv.qc.ca"]').contains('jacques.michaud.med@ssss.gouv.qc.ca').should('exist');
  });

  it('Valider les liens disponibles - Lien Documentation', () => {
    cy.get('[class="ant-modal-body"] a').eq(1).should('have.attr', 'href', 'https://docs.cqdg.ca/docs/faire-une-demande-daccès-aux-données-du-cqdg?ljs=en-CA');
  });

  it('Valider les fonctionnalités - Bouton Cancel', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').click({force: true});
    cy.get('[class*="DownloadRequestAccessModal_modal"]').should('have.css', 'display', 'none');
    cy.wait(5000);
    cy.task('fileExists', `${Cypress.config('downloadsFolder')}`).then((exists) => {
      assert.isTrue(!exists);
    });
  });

  it('Valider les fonctionnalités - Bouton Download', () => {
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-manifest', 1);
    cy.get('[class*="DownloadRequestAccessModal_modal"]').should('have.css', 'display', 'none');
    cy.waitUntilFile(oneMinute);
    cy.validateFileName('*.tsv');
  });
});

describe('Page d\'une étude - Télécharger le Request Access', () => {
  beforeEach(() => {
    cy.get('[class*="EntityTitle"] [data-cy="RequestAccess_Button"]').click({force: true});
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-manifest', 1);
    cy.waitUntilFile(oneMinute);
  });

  it('Valider le nom du fichier', () => {
    cy.validateFileName('cqdg_fileRequestAccess_'+`${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('DownloadRequestAccessFamily.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('DownloadRequestAccessFamily.json');
  });
});
