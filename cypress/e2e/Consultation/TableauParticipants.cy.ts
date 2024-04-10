/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Participants) - Vérifier les informations affichées', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=a80b4939-38c4-415e-9189-27f79ab37cb5');
    cy.showColumn('Ethnicity');
    cy.showColumn('Diagnosis (ICD)');
    cy.showColumn('Diagnosis (Source Text)');
    cy.showColumn('External Participant');
    cy.showColumn('Vital Status');
  });

  it('Titre', () => {
    cy.get('[data-cy="Title_DataExploration"]').contains('Data Explorer');
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(1).contains('PT0000010').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(2).contains('T-DEE').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(3).contains('Male').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(4).contains('epilepsy').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(4).contains('MONDO:').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(4).contains('0005027').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(5).contains('Seizure').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(5).contains('HP:').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(5).contains('0001250').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(6).contains('Proband').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(7).contains('Case-parent trio').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(8).contains('-').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(9).contains(/^5$/).should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(10).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(11).contains('-').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(12).contains('Generalized idiopathic epilepsy and epileptic syndromes, intractable').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(12).contains('G40.31').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(13).contains('Intractable Epilepsy').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(14).contains('HSJ-1005-389').should('exist');
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(15).contains('Unknown').should('exist');
  });
});

describe('Page Data Exploration (Participants) - Valider les liens disponibles', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=a80b4939-38c4-415e-9189-27f79ab37cb5');
    cy.showColumn('Diagnosis (ICD)');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.get('[class*="QueryBar_selected"]').find('[class*="anticon-save"]').should('not.exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="anticon-copy"]').should('exist');
  });

  it('Lien Participant du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('PT0000010');
  });

  it('Lien Study du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(2).find('[href]').click({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Lien Mondo de Diagnosis (MONDO) du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(4).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/MONDO_0005027');
  });

  it('Lien HP de Phenotype (HPO) du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(5).find('[href]')
      .should(($element) => {
        const hrefValue = $element.attr('href');
        const regex = /http:\/\/purl\.obolibrary\.org\/obo\/HP_000/;
        expect(hrefValue).to.match(regex);
      });
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(9).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT0000010').should('exist');
    cy.validateTableResultsCount(/^5$/);
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(10).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT0000010').should('exist');
    cy.validateTableResultsCount(/^1$/);
  });

  it('Lien ICD de Diagnosis (ICD) du tableau', () => {
    cy.get('tr[data-row-key="PT0000010"]').find('[class*="ant-table-cell"]').eq(11).find('[href]')
      .should('have.attr', 'href', 'http://purl.bioontology.org/ontology/ICD10CM/G40.31');
  });
});

describe('Page Data Exploration (Participants) - Valider les fonctionnalités du tableau', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants');
    cy.showColumn('Ethnicity');
    cy.showColumn('Vital Status');
  });

  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('STUDY1', 2);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('T-DEE', 2);
  });

  it('Valider les fonctionnalités du tableau - Tri Sex', () => {
    cy.sortTableAndIntercept('Sex', 1);
    cy.validateTableFirstRow('Female', 3);
    cy.sortTableAndIntercept('Sex', 1);
    cy.validateTableFirstRow('Male', 3);
  });

  it('Valider les fonctionnalités du tableau - Tri Family Position', () => {
    cy.sortTableAndIntercept('Family Position', 1);
    cy.validateTableFirstRow('-', 6);
    cy.sortTableAndIntercept('Family Position', 1);
    cy.validateTableFirstRow('Proband', 6);
  });

  it('Valider les fonctionnalités du tableau - Tri Family Type', () => {
    cy.sortTableAndIntercept('Family Type', 1);
    cy.validateTableFirstRow('-', 7);
    cy.sortTableAndIntercept('Family Type', 1);
    cy.validateTableFirstRow('Other', 7);
  });

  it('Valider les fonctionnalités du tableau - Tri Age', () => {
    cy.sortTableAndIntercept('Age', 1);
    cy.validateTableFirstRow('-', 8);
    cy.sortTableAndIntercept('Age', 1);
    cy.validateTableFirstRow('Senior', 8);
  });

  it('Valider les fonctionnalités du tableau - Tri Ethnicity', () => {
    cy.sortTableAndIntercept('Ethnicity', 1);
    cy.validateTableFirstRow('-', 11);
    cy.sortTableAndIntercept('Ethnicity', 1);
    cy.validateTableFirstRow('-', 11);
  });

  it('Valider les fonctionnalités du tableau - Tri Vital Status', () => {
    cy.sortTableAndIntercept('Vital Status', 1);
    cy.validateTableFirstRow('Alive', 12);
    cy.sortTableAndIntercept('Vital Status', 1);
    cy.validateTableFirstRow('Unknown', 12);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Vital Status', 1);
    cy.sortTableAndIntercept('Vital Status', 1);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('STUDY1', 2);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('body').find('span[class*="ant-select-selection-item"]').click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('20').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Previous').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('First').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
  