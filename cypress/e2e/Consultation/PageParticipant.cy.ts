/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitParticipantEntity('PT0000010');
});

describe('Page d\'un participant - Valider les redirections', () => {
  it('Studies', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });
  
  it('Biospecimens', () => {
    cy.get('[data-cy="SummaryHeader_Biospecimens_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT0000010').should('exist');
  });
  
  it('Files', () => {
    cy.get('[data-cy="SummaryHeader_Files_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT0000010').should('exist');
  });
});

describe('Page d\'un participant - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('PT0000010');
  });

  it('Panneau Summary', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains('Study');
    cy.get('[data-cy="SummaryHeader_Biospecimens_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Biospecimens_Button"]').contains(/^Biospecimen$/);
    cy.get('[data-cy="SummaryHeader_Files_Button"]').contains(/^5$/);
    cy.get('[data-cy="SummaryHeader_Files_Button"]').contains('Files');
    cy.get('[id="summary"]').find('[class="ant-collapse-header"]').contains('Summary').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('PT0000010').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('External Participant ID').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('HSJ-1005-389').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Study').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('Developmental and epileptic encephalopathies (T-DEE)').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('Family Type').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('Case-parent trio').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).find('[class*="ant-tag-cyan"]').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(4).contains('Family Position').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('Proband').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).find('[class*="ant-tag-purple"]').should('exist');
  });

  it('Panneau Profile', () => {
    cy.get('[id="profile"]').find('[class*="EntityDescriptions_title"]').contains('Profile').should('exist');
    cy.get('[id="profile"]').find('[class="ant-collapse-header"]').contains('Profile').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Sex').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('Male').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(0).find('[class*="ant-tag-blue"]').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Ethnicity').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('-').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Age at Recruitment').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('-').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('Vital Status').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('Unknown').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(3).find('[class*="ant-tag-red"]').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-label"]').eq(4).contains('Age at Death').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('-').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-label"]').eq(5).contains('Cause of Death').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('-').should('exist');
  });
  
  it('Panneau Family (sans famille)', () => {
    cy.visitParticipantEntity('PT0000603');
    cy.get('[id="family"]').should('not.exist');
  });

  it('Panneau Family (avec famille)', () => {
    cy.resetColumns('family');
    cy.get('[id="family"]').find('[class*="EntityTable_title"]').contains('Family').should('exist');
    cy.get('[id="family"]').find('[class="ant-collapse-header"]').contains('Family ( ').should('exist');
    cy.get('[id="family"]').find('[class="ant-collapse-header"]').contains('FM0000487').should('exist');
    cy.get('[id="family"]').find('[class="ant-collapse-header"]').contains(' )').should('exist');
    cy.get('[id="family"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Participant').should('exist');
    cy.get('[id="family"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Family Position').should('exist');
    cy.get('[id="family"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Disease Status').should('exist');
    cy.get('[data-row-key="PT0000010"]').find('td[class="ant-table-cell"]').eq(0).contains('PT0000010').should('exist');
    cy.get('[data-row-key="PT0000010"]').find('td[class="ant-table-cell"]').eq(1).contains('Proband').should('exist');
    cy.get('[data-row-key="PT0000010"]').find('td[class="ant-table-cell"]').eq(2).contains('Yes').should('exist');
    cy.get('[data-row-key="PT0000483"]').find('td[class="ant-table-cell"]').eq(0).contains('PT0000483').should('exist');
    cy.get('[data-row-key="PT0000483"]').find('td[class="ant-table-cell"]').eq(1).contains('Father').should('exist');
    cy.get('[data-row-key="PT0000483"]').find('td[class="ant-table-cell"]').eq(2).contains('No').should('exist');
    cy.get('[data-row-key="PT0000091"]').find('td[class="ant-table-cell"]').eq(0).contains('PT0000091').should('exist');
    cy.get('[data-row-key="PT0000091"]').find('td[class="ant-table-cell"]').eq(1).contains('Mother').should('exist');
    cy.get('[data-row-key="PT0000091"]').find('td[class="ant-table-cell"]').eq(2).contains('No').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data_access"]').find('[class*="EntityDescriptions_title"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-collapse-header"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Access Limitations').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('health or medical or biomedical research').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('DUO:').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('0000006').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Access Requirements').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('genetic studies only').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('DUO:').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('0000016').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('See more').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Access Authority').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('jacques.michaud.med@ssss.gouv.qc.ca').should('exist');
  });
  
  it('Panneau Diagnoses', () => {
    cy.resetColumns('diagnosis');
    cy.get('[id="diagnosis"]').find('[class*="EntityTable_title"]').contains('Diagnosis').should('exist');
    cy.get('[id="diagnosis"]').find('[class="ant-collapse-header"]').contains('Diagnoses').should('exist');
    cy.get('[id="diagnosis"]').find('[class="ant-collapse-header"]').contains('(1)').should('exist');
    cy.get('[id="diagnosis"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Diagnosis (MONDO)').should('exist');
    cy.get('[id="diagnosis"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Diagnosis (ICD-10)').should('exist');
    cy.get('[id="diagnosis"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Diagnosis (Source Text)').should('exist');
    cy.get('[id="diagnosis"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Age').should('exist');
    cy.get('[id="diagnosis"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Cancer').should('exist');
    cy.get('[id="diagnosis"]').find('thead').find('th[class="ant-table-cell"]').eq(5).contains('MONDO Term').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(0).contains('epilepsy').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(0).contains('MONDO:').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(0).contains('0005027').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(1).contains('Generalized idiopathic epilepsy and epileptic syndromes, intractable').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(1).contains('G40.31').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(2).contains('Intractable Epilepsy').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(4).contains('-').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(5).contains('205').should('exist');
  });
  
  it('Panneau Phenotypes', () => {
    cy.resetColumns('phenotype');
    cy.get('[id="phenotype"]').find('[class*="EntityTable_title"]').contains('Phenotype').should('exist');
    cy.get('[id="phenotype"]').find('[class="ant-collapse-header"]').contains('Phenotypes').should('exist');
    cy.get('[id="phenotype"]').find('[class="ant-collapse-header"]').contains('(1)').should('exist');
    cy.get('[id="phenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Phenotype (HPO)').should('exist');
    cy.get('[id="phenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Phenotype (Source Text)').should('exist');
    cy.get('[id="phenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Interpretation').should('exist');
    cy.get('[id="phenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Age').should('exist');
    cy.get('[id="phenotype"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('HPO Term').should('exist');
    cy.get('[data-row-key="PH0000196"]').find('td[class="ant-table-cell"]').eq(0).contains('Seizure').should('exist');
    cy.get('[data-row-key="PH0000196"]').find('td[class="ant-table-cell"]').eq(0).contains('HP').should('exist');
    cy.get('[data-row-key="PH0000196"]').find('td[class="ant-table-cell"]').eq(0).contains('0001250').should('exist');
    cy.get('[data-row-key="PH0000196"]').find('td[class="ant-table-cell"]').eq(1).contains('Intractable Seizures').should('exist');
    cy.get('[data-row-key="PH0000196"]').find('td[class="ant-table-cell"]').eq(2).contains('Observed').should('exist');
    cy.get('[data-row-key="PH0000196"]').find('td[class="ant-table-cell"]').eq(3).contains('Neonatal').should('exist');
    cy.get('[data-row-key="PH0000196"]').find('td[class="ant-table-cell"]').eq(4).contains('202').should('exist');
  });
  
  it('Panneau Biospecimens', () => {
    cy.resetColumns('biospecimen');
    cy.get('[id="biospecimen"]').find('[class*="EntityTable_title"]').contains('Biospecimen').should('exist');
    cy.get('[id="biospecimen"]').find('[class="ant-collapse-header"]').contains('Biospecimens').should('exist');
    cy.get('[id="biospecimen"]').find('[class="ant-collapse-header"]').contains('(1)').should('exist');
    cy.get('[id="biospecimen"]').find('[class="ant-collapse-header"]').contains('View in Data Explorer').should('exist');
    cy.get('[id="biospecimen"]').find('[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Sample').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Sample Type').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(2).contains('Tissue').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(3).contains('Biospecimen').should('exist');
    cy.get('[id="biospecimen"]').find('thead').find('th[class="ant-table-cell"]').eq(4).contains('Age').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(0).contains('SR0000214').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(1).contains('DNA').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(1).contains('NCIT:').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(1).contains('C449').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(2).contains('Blood').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(2).contains('NCIT:').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(2).contains('C12434').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(3).contains('SP0000179').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(4).contains('-').should('exist');
  });
  
  it('Panneau Files', () => {
    cy.get('[id="data_file"]').find('[class*="EntityTable_title"]').contains('Data File').should('exist');
    cy.get('[id="data_file"]').find('[class="ant-collapse-header"]').contains('Data Files').should('exist');
    cy.get('[id="data_file"]').find('[class="ant-collapse-header"]').contains('(5)').should('exist');
    cy.get('[id="data_file"]').find('[class="ant-collapse-header"]').contains('View in Data Explorer').should('exist');
    cy.get('[id="data_file"]').find('[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_subTitle"]').eq(0).contains('File counts by Data Type').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(0).find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Data Type').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(0).find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(0).find('thead').find('th[class="ant-table-cell"]').eq(2).contains('(n=5)').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Germline CNV"]').find('td[class="ant-table-cell"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Germline CNV"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="SNV"]').find('td[class="ant-table-cell"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="SNV"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Supplement"]').find('td[class="ant-table-cell"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Supplement"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Germline Structural Variant"]').find('td[class="ant-table-cell"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Germline Structural Variant"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Aligned Reads"]').find('td[class="ant-table-cell"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Aligned Reads"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');

    cy.get('[id="data_file"]').find('[class*="EntityTable_subTitle"]').eq(1).contains('File counts by Strategy').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Strategy').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(2).contains('(n=5)').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="WGS"]').find('td[class="ant-table-cell"]').eq(1).contains(/^5$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="WGS"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 100%"]').should('exist');
  });
});

describe('Page d\'un participant - Valider les liens disponibles', () => {
  it('Lien Study du panneau Summary', () => {
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).find('[href]').click({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Lien Family du panneau Family', () => {
    cy.get('[data-cy="FamilyLink"]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Family ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FM0000487').should('exist');
  });

  it('Lien Mother du panneau Family', () => {
    cy.get('[data-row-key="PT0000483"]').find('td[class="ant-table-cell"]').eq(0).find('[href]').click({force: true});
    cy.get('[class*="EntityTitle"]').contains('PT0000483');
  });

  it('Lien Duo de l\'Access Limitations du panneau Data Access', () => {
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000006');
  });

  it('Lien Duo de l\'Access Requirements du panneau Data Access', () => {
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000016');
  });
  
  it('Lien \'See more\' de l\'Access Requirements du panneau Data Access', () => {
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('See more').click({force: true});
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('ethics approval required').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('See less').click({force: true});
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('ethics approval required').should('not.exist');
  });

  it('Lien de l\'Access Authority du panneau Data Access', () => {
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(2).find('[href]')
      .should('have.attr', 'href', 'mailto:jacques.michaud.med@ssss.gouv.qc.ca');
  });

  it('Lien Mondo du panneau Diagnoses', () => {
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/MONDO_0005027');
  });

  it('Lien ICD-10 du panneau Diagnoses', () => {
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(1).find('[href]')
      .should('have.attr', 'href', 'http://purl.bioontology.org/ontology/ICD10CM/G40.31');
  });

  it('Lien MONDO Term du panneau Diagnoses', () => {
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(5).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Diagnosis (MONDO)').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Epilepsy (MONDO:0005027)').should('exist');
    cy.validateTableResultsCount(/^205$/);
  });

  it('Lien HPO du panneau Phenotypes', () => {
    cy.get('[data-row-key="PH0000196"]').find('td[class="ant-table-cell"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/HP_0001250');
  });

  it('Lien HPO Term du panneau Phenotypes', () => {
    cy.get('[data-row-key="PH0000196"]').find('td[class="ant-table-cell"]').eq(4).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Phenotype').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Seizure (HP:0001250)').should('exist');
    cy.validateTableResultsCount(/^202$/);
  });

  it('Lien DataExploration du panneau Biospecimens', () => {
    cy.get('[data-cy="Biospecimens_RedirectLink"]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT0000010').should('exist');
  });

  it('Lien NCIT du Sample Type du panneau Biospecimens', () => {
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(1).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/NCIT_C449');
  });

  it('Lien NCIT du Tissue du panneau Biospecimens', () => {
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(2).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/NCIT_C12434');
  });

  it('Lien DataExploration du panneau Files', () => {
    cy.get('[data-cy="Files_RedirectLink"]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT0000010').should('exist');
  });

  it('Lien Files de Germline CNV du panneau Files', () => {
    cy.get('[id="data_file"]').find('[data-row-key="Germline CNV"]').find('td[class="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT0000010').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Germline CNV').should('exist');
  });

  it('Lien Files de WGS du panneau Files', () => {
    cy.get('[id="data_file"]').find('[data-row-key="WGS"]').find('td[class="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT0000010').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('WGS').should('exist');
  });
});

describe('Page d\'un participant - Valider les panneaux masquables', () => {
  it('Panneau Summary', () => {
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Profile', () => {
    cy.get('[id="profile"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="profile"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="profile"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="profile"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="profile"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Family', () => {
    cy.get('[id="family"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="family"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="family"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="family"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="family"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data_access"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_access"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_access"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_access"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_access"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Diagnoses', () => {
    cy.get('[id="diagnosis"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="diagnosis"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="diagnosis"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="diagnosis"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="diagnosis"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Phenotypes', () => {
    cy.get('[id="phenotype"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="phenotype"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="phenotype"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="phenotype"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="phenotype"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Biospecimens', () => {
    cy.get('[id="biospecimen"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="biospecimen"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="biospecimen"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="biospecimen"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="biospecimen"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Files', () => {
    cy.get('[id="data_file"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_file"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_file"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_file"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_file"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});
