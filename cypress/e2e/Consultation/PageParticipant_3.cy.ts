/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitParticipantEntity('PT0000010');
});

describe('Page d\'un participant - Valider les liens disponibles', () => {
  it('Lien Study du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).find('[href]').clickAndWait({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Lien Family du panneau Family', () => {
    cy.get('[data-cy="FamilyLink"]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Family ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('FM0000487').should('exist');
  });

  it('Lien Mother du panneau Family', () => {
    cy.get('[data-row-key="PT0000483"] td[class="ant-table-cell"]').eq(0).find('[href]').clickAndWait({force: true});
    cy.get('[class*="EntityTitle"]').contains('PT0000483');
  });

  it('Lien Duo de l\'Access Limitations du panneau Data Access', () => {
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000006');
  });

  it('Lien Duo de l\'Access Requirements du panneau Data Access', () => {
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000016');
  });
  
  it('Lien \'See more\' de l\'Access Requirements du panneau Data Access', () => {
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('See more').clickAndWait({force: true});
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('ethics approval required').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('See less').clickAndWait({force: true});
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('ethics approval required').should('not.exist');
  });

  it('Lien de l\'Access Authority du panneau Data Access', () => {
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(2).find('[href]')
      .should('have.attr', 'href', 'mailto:jacques.michaud.med@ssss.gouv.qc.ca');
  });

  it('Lien Mondo du panneau Diagnoses', () => {
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/MONDO_0005027');
  });

  it('Lien ICD-10 du panneau Diagnoses', () => {
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(1).find('[href]')
      .should('have.attr', 'href', 'http://purl.bioontology.org/ontology/ICD10CM/G40.31');
  });

  it('Lien MONDO Term du panneau Diagnoses', () => {
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(5).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Diagnosis (MONDO)').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Epilepsy (MONDO:0005027)').should('exist');
    cy.validateTableResultsCount(/^205$/);
  });

  it('Lien HPO du panneau Phenotypes', () => {
    cy.get('[data-row-key="PH0000196"] td[class="ant-table-cell"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/HP_0001250');
  });

  it('Lien HPO Term du panneau Phenotypes', () => {
    cy.get('[data-row-key="PH0000196"] td[class="ant-table-cell"]').eq(4).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Phenotype').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Seizure (HP:0001250)').should('exist');
    cy.validateTableResultsCount(/^202$/);
  });

  it('Lien DataExploration du panneau Biospecimens', () => {
    cy.get('[data-cy="Biospecimens_RedirectLink"]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000010').should('exist');
  });

  it('Lien NCIT du Sample Type du panneau Biospecimens', () => {
    cy.get('[id="biospecimen"] td[class="ant-table-cell"]').eq(1).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/NCIT_C449');
  });

  it('Lien NCIT du Tissue du panneau Biospecimens', () => {
    cy.get('[id="biospecimen"] td[class="ant-table-cell"]').eq(2).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/NCIT_C12434');
  });

  it('Lien DataExploration du panneau Files', () => {
    cy.get('[data-cy="Files_RedirectLink"]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000010').should('exist');
  });

  it('Lien Files de Germline CNV du panneau Files', () => {
    cy.get('[id="data_file"] [data-row-key="Germline CNV"] td[class="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000010').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Germline CNV').should('exist');
  });

  it('Lien Files de WGS du panneau Files', () => {
    cy.get('[id="data_file"] [data-row-key="WGS"] td[class="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000010').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('WGS').should('exist');
  });
});
