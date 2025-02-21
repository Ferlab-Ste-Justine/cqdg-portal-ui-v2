/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitParticipantEntity('PT0000010');
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
    cy.get('[id="summary"] [class="ant-collapse-header"]').contains('Summary').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(0).contains('ID').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(0).contains('PT0000010').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(1).contains('External Participant ID').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).contains('HSJ-1005-389').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(2).contains('Study').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).contains('Developmental and epileptic encephalopathies (T-DEE)').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(3).contains('Family Type').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).contains('Case-parent trio').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).find('[class*="ant-tag-cyan"]').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(4).contains('Family Position').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(4).contains('Proband').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(4).find('[class*="ant-tag-purple"]').should('exist');
  });

  it('Panneau Profile', () => {
    cy.get('[id="profile"] [class*="EntityDescriptions_title"]').contains('Profile').should('exist');
    cy.get('[id="profile"] [class="ant-collapse-header"]').contains('Profile').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-label"]').eq(0).contains('Sex').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(0).contains('Male').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(0).find('[class*="ant-tag-blue"]').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-label"]').eq(1).contains('Ethnicity').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(1).contains('-').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-label"]').eq(2).contains('Age at Recruitment').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(2).contains('-').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-label"]').eq(3).contains('Vital Status').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(3).contains('Unknown').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(3).find('[class*="ant-tag-red"]').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-label"]').eq(4).contains('Age at Death').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(4).contains('-').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-label"]').eq(5).contains('Cause of Death').should('exist');
    cy.get('[id="profile"] [class="ant-descriptions-item-content"]').eq(5).contains('-').should('exist');
  });
  
  it('Panneau Family (sans famille)', () => {
    cy.visitParticipantEntity('PT0000603');
    cy.get('[id="family"]').should('not.exist');
  });

  it('Panneau Family (avec famille)', () => {
    cy.resetColumns('family');
    cy.get('[id="family"] [class*="EntityTable_title"]').contains('Family').should('exist');
    cy.get('[id="family"] [class="ant-collapse-header"]').contains('Family ( ').should('exist');
    cy.get('[id="family"] [class="ant-collapse-header"]').contains('FM0000487').should('exist');
    cy.get('[id="family"] [class="ant-collapse-header"]').contains(' )').should('exist');
    cy.get('[id="family"] thead th[class="ant-table-cell"]').eq(0).contains('Participant').should('exist');
    cy.get('[id="family"] thead th[class="ant-table-cell"]').eq(1).contains('Family Position').should('exist');
    cy.get('[id="family"] thead th[class="ant-table-cell"]').eq(2).contains('Disease Status').should('exist');
    cy.get('[data-row-key="PT0000010"] td[class="ant-table-cell"]').eq(0).contains('PT0000010').should('exist');
    cy.get('[data-row-key="PT0000010"] td[class="ant-table-cell"]').eq(1).contains('Proband').should('exist');
    cy.get('[data-row-key="PT0000010"] td[class="ant-table-cell"]').eq(2).contains('Yes').should('exist');
    cy.get('[data-row-key="PT0000483"] td[class="ant-table-cell"]').eq(0).contains('PT0000483').should('exist');
    cy.get('[data-row-key="PT0000483"] td[class="ant-table-cell"]').eq(1).contains('Father').should('exist');
    cy.get('[data-row-key="PT0000483"] td[class="ant-table-cell"]').eq(2).contains('No').should('exist');
    cy.get('[data-row-key="PT0000091"] td[class="ant-table-cell"]').eq(0).contains('PT0000091').should('exist');
    cy.get('[data-row-key="PT0000091"] td[class="ant-table-cell"]').eq(1).contains('Mother').should('exist');
    cy.get('[data-row-key="PT0000091"] td[class="ant-table-cell"]').eq(2).contains('No').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data_access"] [class*="EntityDescriptions_title"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"] [class="ant-collapse-header"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-label"]').eq(0).contains('Access Limitations').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).contains('health or medical or biomedical research').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).contains('DUO:').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).contains('0000006').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-label"]').eq(1).contains('Access Requirements').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('genetic studies only').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('DUO:').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('0000016').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('See more').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-label"]').eq(2).contains('Access Authority').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(2).contains('jacques.michaud.med@ssss.gouv.qc.ca').should('exist');
  });
  
  it('Panneau Diagnoses', () => {
    cy.resetColumns('diagnosis');
    cy.get('[id="diagnosis"] [class*="EntityTable_title"]').contains('Diagnosis').should('exist');
    cy.get('[id="diagnosis"] [class="ant-collapse-header"]').contains('Diagnoses').should('exist');
    cy.get('[id="diagnosis"] [class="ant-collapse-header"]').contains('(1)').should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(0).contains('Diagnosis (MONDO)').should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(1).contains('Diagnosis (ICD-10)').should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(2).contains('Diagnosis (Source Text)').should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(3).contains('Age').should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(4).contains('Cancer').should('exist');
    cy.get('[id="diagnosis"] thead th[class="ant-table-cell"]').eq(5).contains('MONDO Term').should('exist');
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(0).contains('epilepsy').should('exist');
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(0).contains('MONDO:').should('exist');
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(0).contains('0005027').should('exist');
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(1).contains('Generalized idiopathic epilepsy and epileptic syndromes, intractable').should('exist');
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(1).contains('G40.31').should('exist');
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(2).contains('Intractable Epilepsy').should('exist');
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(4).contains('-').should('exist');
    cy.get('[id="diagnosis"] td[class="ant-table-cell"]').eq(5).contains('205').should('exist');
  });
  
  it('Panneau Phenotypes', () => {
    cy.resetColumns('phenotype');
    cy.get('[id="phenotype"] [class*="EntityTable_title"]').contains('Phenotype').should('exist');
    cy.get('[id="phenotype"] [class="ant-collapse-header"]').contains('Phenotypes').should('exist');
    cy.get('[id="phenotype"] [class="ant-collapse-header"]').contains('(1)').should('exist');
    cy.get('[id="phenotype"] thead th[class="ant-table-cell"]').eq(0).contains('Phenotype (HPO)').should('exist');
    cy.get('[id="phenotype"] thead th[class="ant-table-cell"]').eq(1).contains('Phenotype (Source Text)').should('exist');
    cy.get('[id="phenotype"] thead th[class="ant-table-cell"]').eq(2).contains('Interpretation').should('exist');
    cy.get('[id="phenotype"] thead th[class="ant-table-cell"]').eq(3).contains('Age').should('exist');
    cy.get('[id="phenotype"] thead th[class="ant-table-cell"]').eq(4).contains('HPO Term').should('exist');
    cy.get('[data-row-key="PH0000196"] td[class="ant-table-cell"]').eq(0).contains('Seizure').should('exist');
    cy.get('[data-row-key="PH0000196"] td[class="ant-table-cell"]').eq(0).contains('HP').should('exist');
    cy.get('[data-row-key="PH0000196"] td[class="ant-table-cell"]').eq(0).contains('0001250').should('exist');
    cy.get('[data-row-key="PH0000196"] td[class="ant-table-cell"]').eq(1).contains('Intractable Seizures').should('exist');
    cy.get('[data-row-key="PH0000196"] td[class="ant-table-cell"]').eq(2).contains('Observed').should('exist');
    cy.get('[data-row-key="PH0000196"] td[class="ant-table-cell"]').eq(3).contains('Neonatal').should('exist');
    cy.get('[data-row-key="PH0000196"] td[class="ant-table-cell"]').eq(4).contains('202').should('exist');
  });
  
  it('Panneau Biospecimens', () => {
    cy.resetColumns('biospecimen');
    cy.get('[id="biospecimen"] [class*="EntityTable_title"]').contains('Biospecimen').should('exist');
    cy.get('[id="biospecimen"] [class="ant-collapse-header"]').contains('Biospecimens').should('exist');
    cy.get('[id="biospecimen"] [class="ant-collapse-header"]').contains('(1)').should('exist');
    cy.get('[id="biospecimen"] [class="ant-collapse-header"]').contains('View in Data Explorer').should('exist');
    cy.get('[id="biospecimen"] [class="ant-collapse-header"] svg[class="anticon"]').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(0).contains('Sample').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(1).contains('Sample Type').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(2).contains('Tissue').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(3).contains('Biospecimen').should('exist');
    cy.get('[id="biospecimen"] thead th[class="ant-table-cell"]').eq(4).contains('Age').should('exist');
    cy.get('[id="biospecimen"] td[class="ant-table-cell"]').eq(0).contains('SR0000214').should('exist');
    cy.get('[id="biospecimen"] td[class="ant-table-cell"]').eq(1).contains('DNA').should('exist');
    cy.get('[id="biospecimen"] td[class="ant-table-cell"]').eq(1).contains('NCIT:').should('exist');
    cy.get('[id="biospecimen"] td[class="ant-table-cell"]').eq(1).contains('C449').should('exist');
    cy.get('[id="biospecimen"] td[class="ant-table-cell"]').eq(2).contains('Blood').should('exist');
    cy.get('[id="biospecimen"] td[class="ant-table-cell"]').eq(2).contains('NCIT:').should('exist');
    cy.get('[id="biospecimen"] td[class="ant-table-cell"]').eq(2).contains('C12434').should('exist');
    cy.get('[id="biospecimen"] td[class="ant-table-cell"]').eq(3).contains('SP0000179').should('exist');
    cy.get('[id="biospecimen"] td[class="ant-table-cell"]').eq(4).contains('-').should('exist');
  });
  
  it('Panneau Files', () => {
    cy.get('[id="data_file"] [class*="EntityTable_title"]').contains('Data File').should('exist');
    cy.get('[id="data_file"] [class="ant-collapse-header"]').contains('Data Files').should('exist');
    cy.get('[id="data_file"] [class="ant-collapse-header"]').contains('(5)').should('exist');
    cy.get('[id="data_file"] [class="ant-collapse-header"]').contains('View in Data Explorer').should('exist');
    cy.get('[id="data_file"] [class="ant-collapse-header"] svg[class="anticon"]').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_subTitle"]').eq(0).contains('File counts by Data Type').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(0).contains('Data Type').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(2).contains('(n=5)').should('exist');
    cy.get('[id="data_file"] [data-row-key="Germline CNV"] td[class="ant-table-cell"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="Germline CNV"] td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');
    cy.get('[id="data_file"] [data-row-key="SNV"] td[class="ant-table-cell"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="SNV"] td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');
    cy.get('[id="data_file"] [data-row-key="Supplement"] td[class="ant-table-cell"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="Supplement"] td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');
    cy.get('[id="data_file"] [data-row-key="Germline Structural Variant"] td[class="ant-table-cell"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="Germline Structural Variant"] td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');
    cy.get('[id="data_file"] [data-row-key="Aligned Reads"] td[class="ant-table-cell"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="Aligned Reads"] td[class="ant-table-cell"]').eq(2).find('[style*="width: 20%"]').should('exist');

    cy.get('[id="data_file"] [class*="EntityTable_subTitle"]').eq(1).contains('File counts by Strategy').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(0).contains('Strategy').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(2).contains('(n=5)').should('exist');
    cy.get('[id="data_file"] [data-row-key="WGS"] td[class="ant-table-cell"]').eq(1).contains(/^5$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="WGS"] td[class="ant-table-cell"]').eq(2).find('[style*="width: 100%"]').should('exist');
  });
});
