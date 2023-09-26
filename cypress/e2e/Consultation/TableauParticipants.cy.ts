/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Participants) - Vérifier les informations affichées', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=d9b0e27c-d2d4-4f3e-8a9f-859f6a32faea');
    cy.showColumn('Ethnicity');
    cy.showColumn('Diagnosis (ICD)');
    cy.showColumn('Diagnosis (Source Text)');
    cy.showColumn('External Participant');
    cy.showColumn('Vital Status');
  });

  it('Titre', () => {
    cy.get('[data-cy="Title_DataExploration"]').contains('Data Exploration');
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(1).contains('PT1007374').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(2).contains('NEURODEV').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(3).contains('Female').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(4).contains('inherited genetic disease').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(4).contains('MONDO:').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(4).contains('0003847').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(5).contains('Generalized hirsutism').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(5).contains('HP:').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(5).contains('0002230').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(5).contains('See more').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(6).contains('10.6K').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(7).contains(/^6$/).should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(8).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(9).contains('-').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(10).contains('Intellectual Disabilities').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(10).contains('F70-F79').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(11).contains('Mendelian disease').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(12).contains('1160.1').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(13).contains('Alive').should('exist');
  });
});

describe('Page Data Exploration (Participants) - Valider les liens disponibles', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=d9b0e27c-d2d4-4f3e-8a9f-859f6a32faea');
    cy.showColumn('Diagnosis (ICD)');
  });

  it('Lien Participant du tableau', () => {
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('PT1007374');
  });

  it('Lien Study du tableau', () => {
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(2).find('[href]').click({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('CHUSJ-NeuroDev');
  });

  it('Lien Mondo de Diagnosis (MONDO) du tableau', () => {
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(4).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/MONDO_0003847');
  });

  it('Lien HP de Phenotype (HPO) du tableau', () => {
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(5).find('[href]')
      .should(($element) => {
        const hrefValue = $element.attr('href');
        const regex = /http:\/\/purl\.obolibrary\.org\/obo\/HP_000/;
        expect(hrefValue).to.match(regex);
      });
  });
  
// Fait planter Cypress
  it.skip('Lien \'See more\' de Phenotype (HPO) du tableau', () => {
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(5).contains('See more').click({force: true});
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(5).contains('Upper limb spasticity').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(5).contains('See less').click({force: true});
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(5).contains('Upper limb spasticity').should('not.exist');
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(7).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT1007374').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^6$/).should('exist');
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(8).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT1007374').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });

  it('Lien ICD de Diagnosis (ICD) du tableau', () => {
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(9).find('[href]')
      .should('have.attr', 'href', 'http://purl.bioontology.org/ontology/ICD10CM/F70-F79');
  });
});

describe('Page Data Exploration (Participants) - Valider les fonctionnalités du tableau', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants');
    cy.showColumn('Ethnicity');
    cy.showColumn('Vital Status');
  });

  it('Valider les fonctionnalités du tableau - Tris', () => {
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('NEURODEV', 2);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('T-DEE', 2);
    cy.sortTableAndWait('Study');

    cy.sortTableAndIntercept('Gender', 1);
    cy.validateTableFirstRow('Female', 3);
    cy.sortTableAndIntercept('Gender', 1);
    cy.validateTableFirstRow('Male', 3);
    cy.sortTableAndWait('Gender');

    cy.sortTableAndIntercept('Age', 1);
    cy.validateTableFirstRow('-', 6);
    cy.sortTableAndIntercept('Age', 1);
    cy.validateTableFirstRow('10.6K', 6);
    cy.sortTableAndWait('Age');

    cy.sortTableAndIntercept('Ethnicity', 1);
    cy.validateTableFirstRow('-', 9);
    cy.sortTableAndIntercept('Ethnicity', 1);
    cy.validateTableFirstRow('-', 9);
    cy.sortTableAndWait('Ethnicity');

    cy.sortTableAndIntercept('Vital Status', 1);
    cy.validateTableFirstRow('Alive', 10);
    cy.sortTableAndIntercept('Vital Status', 1);
    cy.validateTableFirstRow('Unknown', 10);
    cy.sortTableAndWait('Vital Status');
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Vital Status', 1);
    cy.sortTableAndIntercept('Study', 1);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('RAPIDOMICS', 2);
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
  