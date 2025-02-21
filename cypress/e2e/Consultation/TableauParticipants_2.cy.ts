/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('participants', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
  cy.showColumn('Diagnosis (ICD)');
});

describe('Page Data Exploration (Participants) - Valider les liens disponibles', () => { 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('not.exist');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-copy"]').should('exist');
  });

  it('Lien Participant du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('PT0000010');
  });

  it('Lien Study du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(2).find('[href]').clickAndWait({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Lien Mondo de Diagnosis (MONDO) du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(4).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/MONDO_0005027');
  });

  it('Lien HP de Phenotype (HPO) du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(5).find('[href]')
      .should(($element) => {
        const hrefValue = $element.attr('href');
        const strHrefValue : string = hrefValue !== undefined ? hrefValue : "";
        const regex = /http:\/\/purl\.obolibrary\.org\/obo\/HP_000/;
        assert.match(strHrefValue, regex);
      });
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(9).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000010').should('exist');
    cy.validateTableResultsCount(/^5$/);
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(10).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000010').should('exist');
    cy.validateTableResultsCount(/^1$/);
  });

  it('Lien ICD de Diagnosis (ICD) du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(11).find('[href]')
      .should('have.attr', 'href', 'http://purl.bioontology.org/ontology/ICD10CM/G40.31');
  });
});
