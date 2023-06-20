/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Participants) - Vérifier les informations affichées', () => {
  beforeEach(() => {
    cy.visitFileEntity('FI0188666'); // CQDG-301
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').find('[href]').click({force: true}); // CQDG-301
    cy.get('[data-cy="ProTable_Participants"]').should('exist'); // CQDG-301
    cy.resetColumns(); // CQDG-301
//    cy.visitDataExploration('participants', '?sharedFilterId=6bd9c618-87bb-49a9-a4ea-d793601f944d');
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
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(5).contains('Spasticity').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(5).contains('HP:').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(5).contains('0001257').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(6).contains('10622').should('exist');
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(7).contains(/^8$/).should('exist');
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
    cy.visitFileEntity('FI0188666'); // CQDG-301
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').find('[href]').click({force: true}); // CQDG-301
    cy.get('[data-cy="ProTable_Participants"]').should('exist'); // CQDG-301
    cy.resetColumns(); // CQDG-301
//    cy.visitDataExploration('participants', '?sharedFilterId=6bd9c618-87bb-49a9-a4ea-d793601f944d');
    cy.showColumn('Diagnosis (ICD)');
  });

  it('Lien Participant du tableau', () => {
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('PT1007374');
  });

  it('Lien Study du tableau', () => {
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(2).find('[href]').click({force: true});
    cy.get('[data-cy="Title_Studies"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('NEURODEV').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });

  it('Lien Mondo de Diagnosis (MONDO) du tableau', () => {
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(4).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/MONDO_0003847');
  });

  it('Lien HP de Phenotype (HPO) du tableau', () => {
    cy.get('tr[data-row-key="PT1007374"]').find('[class*="ant-table-cell"]').eq(5).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/HP_0001257');
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
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^8$/).should('exist');
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
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('thead[class="ant-table-thead"]').contains('Study').click({force: true});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('NEURODEV').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('thead[class="ant-table-thead"]').contains('Study').click({force: true});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('T-DEE').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Study').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql3');
    cy.get('thead[class="ant-table-thead"]').contains('Gender').click({force: true});
    cy.wait('@getPOSTgraphql3', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('Female').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql4');
    cy.get('thead[class="ant-table-thead"]').contains('Gender').click({force: true});
    cy.wait('@getPOSTgraphql4', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('Male').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Gender').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql5');
    cy.get('thead[class="ant-table-thead"]').contains('Age').click({force: true});
    cy.wait('@getPOSTgraphql5', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('-').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql6');
    cy.get('thead[class="ant-table-thead"]').contains('Age').click({force: true});
    cy.wait('@getPOSTgraphql6', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('10622').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Age').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql7');
    cy.get('thead[class="ant-table-thead"]').contains('Ethnicity').click({force: true});
    cy.wait('@getPOSTgraphql7', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('-').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql8');
    cy.get('thead[class="ant-table-thead"]').contains('Ethnicity').click({force: true});
    cy.wait('@getPOSTgraphql8', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('-').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Ethnicity').click({force: true});

    cy.intercept('POST', '**/graphql').as('getPOSTgraphql9');
    cy.get('thead[class="ant-table-thead"]').contains('Vital Status').click({force: true});
    cy.wait('@getPOSTgraphql9', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('Alive').should('exist');
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql10');
    cy.get('thead[class="ant-table-thead"]').contains('Vital Status').click({force: true});
    cy.wait('@getPOSTgraphql10', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('Unknown').should('exist');
    cy.get('thead[class="ant-table-thead"]').contains('Vital Status').click({force: true});
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('thead[class="ant-table-thead"]').contains('Vital Status').click({force: true});
    cy.wait('@getPOSTgraphql1', {timeout: 20*1000});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql2');
    cy.get('thead[class="ant-table-thead"]').contains('Study').click({force: true});
    cy.wait('@getPOSTgraphql2', {timeout: 20*1000});
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql3');
    cy.get('thead[class="ant-table-thead"]').contains('Study').click({force: true});
    cy.wait('@getPOSTgraphql3', {timeout: 20*1000});
    cy.get('tr[class*="ant-table-row"]').eq(0).contains('RAPIDOMICS').should('exist');
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
  