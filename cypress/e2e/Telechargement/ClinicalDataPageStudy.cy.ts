/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudyEntity('STUDY1', 1);
  cy.get('[class*="EntityTitle"] button[class*="ant-btn-default"]').eq(0).click({force: true});
  cy.waitUntilFile(oneMinute);
});

describe('Page d\'une étude - Télécharger le clinical data', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName(`cqdg_clinicalData_${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}.xlsx`);
  });

  it('Valider le contenu du fichier [CQDG-889]', () => {
    cy.validateXlsxFileContent('DownloadClinicalDataStudy.json');
  });
});