/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudyEntity('T-DEE', 5);
});

describe('Page d\'une étude - Valider les redirections', () => {
  it('Participants', () => {
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });

  it('Families', () => {
    cy.get('[data-cy="SummaryHeader_Families_Button"]').find('[href]').should('not.exist');
  });
  
  it('Biospecimens', () => {
    cy.get('[data-cy="SummaryHeader_Biospecimens_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });
  
  it('Files', () => {
    cy.get('[data-cy="SummaryHeader_Files_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });
});

describe('Page d\'une étude - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Panneau Summary', () => {
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains(/^588$/);
    cy.get('[data-cy="SummaryHeader_Participants_Button"]').contains('Participants');
    cy.get('[data-cy="SummaryHeader_Families_Button"]').contains(/^196$/);
    cy.get('[data-cy="SummaryHeader_Families_Button"]').contains('Families');
    cy.get('[data-cy="SummaryHeader_Biospecimens_Button"]').contains(/^588$/);
    cy.get('[data-cy="SummaryHeader_Biospecimens_Button"]').contains('Biospecimens');
    cy.get('[data-cy="SummaryHeader_Files_Button"]').contains(/^2,940$/);
    cy.get('[data-cy="SummaryHeader_Files_Button"]').contains('Files');
    cy.get('[id="summary"]').find('[class="ant-collapse-header"]').contains('Summary').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Study Code').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('T-DEE').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Name').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('Developmental and epileptic encephalopathies').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Domain').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('Neurodevelopmental Conditions').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).find('[class*="StudyEntity_tagGold"]').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('Population').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('Pediatric and adult').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).find('[class*="StudyEntity_tagCyan"]').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(4).contains('Keywords').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('Epilepsy').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('Developmental Disorder').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('Family Trios').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).find('[class*="StudyEntity_tag_"]').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(5).contains('Description').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('Case-parent trio study on developmental and epileptic encephalopaties (DEE)').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data_access"]').find('[class*="EntityDescriptions_title"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-collapse-header"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Access Limitation').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('Health or medical or biomedical research').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('DUO:').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('0000006').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Access Requirement').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('Genetic studies only').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('DUO:').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('0000016').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('Ethics approval required').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('DUO:').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('0000021').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('User specific restriction').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('DUO:').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('0000026').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Access Authority').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('jacques.michaud.med@ssss.gouv.qc.ca').should('exist');
  });

  it('Panneau Files [CQDG-261]', () => {
    cy.get('[id="data_file"]').find('[class*="EntityTable_title"]').contains('Data File').should('exist');
    cy.get('[id="data_file"]').find('[class="ant-collapse-header"]').contains('Data Files').should('exist');
    cy.get('[id="data_file"]').find('[class="ant-collapse-header"]').contains('(2940)').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_subTitle"]').eq(0).contains('File counts by Data Type').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(0).find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Data Type').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(0).find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(0).find('thead').find('th[class="ant-table-cell"]').eq(2).contains('(n=2940)').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Germline Structural Variant"]').find('td[class="ant-table-cell"]').eq(1).contains(/^588$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Germline Structural Variant"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Germline CNV"]').find('td[class="ant-table-cell"]').eq(1).contains(/^588$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Germline CNV"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="SNV"]').find('td[class="ant-table-cell"]').eq(1).contains(/^588$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="SNV"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Sequencing Data Supplement"]').find('td[class="ant-table-cell"]').eq(1).contains(/^588$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Sequencing Data Supplement"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Aligned Reads"]').find('td[class="ant-table-cell"]').eq(1).contains(/^588$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Aligned Reads"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');

    cy.get('[id="data_file"]').find('[class*="EntityTable_subTitle"]').eq(1).contains('File counts by Experimental Strategy').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Experimental Strategy').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(2).contains('(n=2940)').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="WGS"]').find('td[class="ant-table-cell"]').eq(1).contains(/^2940$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="WGS"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 100%"]').should('exist');
  });

  it('Panneau data1 [CQDG-261]', () => {
    cy.visitStudyEntity('STUDY1', 1);
    cy.get('[id="dataset"]').eq(0).find('[class*="Datasets_title"]').contains('Available Datasets').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class="ant-collapse-header"]').contains('GenoRef-Q').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(0).contains('Description').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(0).contains('Congenital malformations description').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(1).contains('Data Type').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('SNV').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('Aligned Reads').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('Germline Structural Variant').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).contains('Sequencing Data Supplement').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(1).find('[class*="StudyEntity_tag_"]').eq(4).should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class="ant-descriptions-item-label"]').eq(2).contains('Experimental Strategy').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(2).contains('WGS').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class="ant-descriptions-item-content"]').eq(2).find('[class*="StudyEntity_tag_"]').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class*="EntityDataset_rowCountCard"]').eq(0).find('svg[data-icon="user"]').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class*="EntityDataset_rowCountCard"]').eq(0).contains(/^3$/).should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class*="EntityDataset_rowCountCard"]').eq(0).contains('Participants').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class*="EntityDataset_rowCountCard"]').eq(1).find('svg[data-icon="file-text"]').should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class*="EntityDataset_rowCountCard"]').eq(1).contains(/^12$/).should('exist');
    cy.get('[id="dataset"]').eq(0).find('[id="dataset"]').eq(1).find('[class*="EntityDataset_rowCountCard"]').eq(1).contains('Files').should('exist');
  });

  it('Panneau Summary Statistics', () => {
    cy.get('[id="statistic"]').find('[class*="EntityDescriptions_title"]').contains('Summary Statistic').should('exist');
    cy.get('[id="statistic"]').find('[class="ant-collapse-header"]').contains('Summary Statistics').should('exist');
    cy.get('[id="statistic"]').find('[class="ant-collapse-header"]').contains('View in Data Exploration').should('exist');
    cy.get('[id="statistic"]').find('[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="statistic"]').find('[aria-label="Observed Phenotypes (HPO)"]').should('exist');
    cy.get('[id="statistic"]').find('[aria-label="Diagnosis (MONDO)"]').should('exist');
    cy.get('[id="statistic"]').find('[aria-label="Participants by Data Type"]').should('exist');
    cy.get('[id="statistic"]').find('[aria-label="Demographics"]').should('exist');
    cy.get('[id="statistic"]').find('[aria-label="Experimental Strategy"]').should('exist');
  });
});

describe('Page d\'une étude - Valider les liens disponibles', () => {
  it('Lien Duo de l\'Access Limitations du panneau Data Access', () => {
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000006');
  });

  it('Lien Duo de l\'Access Requirements du panneau Data Access', () => {
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000016');
  });

  it('Lien de l\'Access Authority du panneau Data Access [CQDG-267]', () => {
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(2).find('[href]')
      .should('have.attr', 'href', 'mailto:jacques.michaud.med@ssss.gouv.qc.ca');
  });

  it('Lien Files de Germline CNV du panneau Files [CQDG-261]', () => {
    cy.get('[id="data_file"]').find('[data-row-key="Germline CNV"]').find('td[class="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('T-DEE').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Germline CNV').should('exist');
  });

  it('Lien Files de WGS du panneau Files', () => {
    cy.get('[id="data_file"]').find('[data-row-key="WGS"]').find('td[class="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Experimental Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('T-DEE').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('WGS').should('exist');
  });

  it('Lien DataExploration du panneau Summary Statistics', () => {
    cy.get('a[class*="EntityTableRedirectLink"]').click({force: true});
    cy.get('[data-cy="Title_DataExploration"]').contains('Data Exploration');
    cy.get('div[aria-selected="true"]').find('[data-cy="Tab_Summary"]').should('exist');
  });
});

describe('Page d\'une étude - Valider les panneaux masquables', () => {
  it('Panneau Summary', () => {
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data_access"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_access"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_access"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_access"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_access"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Files', () => {
    cy.get('[id="data_file"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_file"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_file"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_file"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_file"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau data1', () => {
    cy.visitStudyEntity('STUDY1', 1);
    cy.get('[id="dataset"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="dataset"]').eq(1).find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="dataset"]').eq(1).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="dataset"]').eq(1).find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="dataset"]').eq(1).find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Summary Statistics', () => {
    cy.get('[id="statistic"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="statistic"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="statistic"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="statistic"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="statistic"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});
