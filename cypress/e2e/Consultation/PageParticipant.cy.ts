/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitParticipantEntity('PT1007374');
});

describe('Page d\'un participant - Valider les redirections', () => {
  it('Studies', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('NEURODEV').should('exist');
  });
  
  it('Biospecimens', () => {
    cy.get('[data-cy="SummaryHeader_Biospecimens_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('PT1007374').should('exist');
  });
  
  it('Files', () => {
    cy.get('[data-cy="SummaryHeader_Files_Button"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('PT1007374').should('exist');
  });
});

describe('Page d\'un participant - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitle"]').contains('PT1007374');
  });

  it('Panneau Summary', () => {
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Studies_Button"]').contains('Study');
    cy.get('[data-cy="SummaryHeader_Biospecimens_Button"]').contains(/^1$/);
    cy.get('[data-cy="SummaryHeader_Biospecimens_Button"]').contains(/^Biospecimen$/);
    cy.get('[data-cy="SummaryHeader_Files_Button"]').contains(/^8$/);
    cy.get('[data-cy="SummaryHeader_Files_Button"]').contains('Files');
    cy.get('[id="summary"]').find('[class="ant-collapse-header"]').contains('Summary').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('PT1007374').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('1160.1').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('CHUSJ-NeuroDev (NEURODEV)').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('Case-parent trio').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).find('[class*="ant-tag-cyan"]').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('Is the proband').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).find('[class*="ant-tag-purple"]').should('exist');
  });

  it('Panneau Profile', () => {
    cy.get('[id="profile"]').find('[class*="EntityDescriptions_title"]').contains('Profile').should('exist');
    cy.get('[id="profile"]').find('[class="ant-collapse-header"]').contains('Profile').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('Female').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(0).find('[class*="ant-tag-blue"]').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('-').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('10622').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('Alive').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(3).find('[class*="ant-tag-red"]').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(4).contains('-').should('exist');
    cy.get('[id="profile"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('-').should('exist');
  });
  
  // Pas de données d'un participant sans famille
  it.skip('Panneau Family (sans famille) [CQDG-198]', () => {
    cy.visitParticipantEntity('TODO');
    cy.get('[id="family"]').should('not.exist');
  });

  it('Panneau Family (avec famille)', () => {
    cy.get('[id="family"]').find('[class*="EntityTable_title"]').contains('Family').should('exist');
    cy.get('[id="family"]').find('[class="ant-collapse-header"]').contains('Family (1160ST0000044)').should('exist');
    cy.get('[data-row-key="PT1007374"]').find('td[class="ant-table-cell"]').eq(0).contains('PT1007374').should('exist');
    cy.get('[data-row-key="PT1007374"]').find('td[class="ant-table-cell"]').eq(1).contains('Is the proband').should('exist');
    cy.get('[data-row-key="PT1007374"]').find('td[class="ant-table-cell"]').eq(2).contains('Yes').should('exist');
    cy.get('[data-row-key="PT1007632"]').find('td[class="ant-table-cell"]').eq(0).contains('PT1007632').should('exist');
    cy.get('[data-row-key="PT1007632"]').find('td[class="ant-table-cell"]').eq(1).contains('Mother').should('exist');
    cy.get('[data-row-key="PT1007632"]').find('td[class="ant-table-cell"]').eq(2).contains('No').should('exist');
    cy.get('[data-row-key="PT1007633"]').find('td[class="ant-table-cell"]').eq(0).contains('PT1007633').should('exist');
    cy.get('[data-row-key="PT1007633"]').find('td[class="ant-table-cell"]').eq(1).contains('Father').should('exist');
    cy.get('[data-row-key="PT1007633"]').find('td[class="ant-table-cell"]').eq(2).contains('No').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data_access"]').find('[class*="EntityDescriptions_title"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-collapse-header"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('-').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('-').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('jacques.michaud.med@ssss.gouv.qc.ca').should('exist');
  });
  
  it('Panneau Diagnoses [CQDG-259]', () => {
    cy.get('[id="diagnosis"]').find('[class*="EntityTable_title"]').contains('Diagnosis').should('exist');
    cy.get('[id="diagnosis"]').find('[class="ant-collapse-header"]').contains('Diagnoses').should('exist');
    cy.get('[id="diagnosis"]').find('[class="ant-collapse-header"]').contains('(1)').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(0).contains('inherited genetic disease').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(0).contains('MONDO:').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(0).contains('0003847').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(1).contains('()').should('not.exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(2).contains('Mendelian disease').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(4).contains('-').should('exist');
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(5).contains('639').should('exist');
  });
  
  it('Panneau Phenotypes [CQDG-240, CQDG-263, CQDG-264]', () => {
    cy.get('[id="phenotype"]').find('[class*="EntityTable_title"]').contains('Phenotype').should('exist');
    cy.get('[id="phenotype"]').find('[class="ant-collapse-header"]').contains('Phenotypes').should('exist');
    cy.get('[id="phenotype"]').find('[class="ant-collapse-header"]').contains('(4)').should('exist');
    cy.get('[data-row-key="PH0003852"]').find('td[class="ant-table-cell"]').eq(0).contains('Spasticity (HP:0001257)').should('exist');
    cy.get('[data-row-key="PH0003852"]').find('td[class="ant-table-cell"]').eq(1).contains('Spasticity').should('exist');
    cy.get('[data-row-key="PH0003852"]').find('td[class="ant-table-cell"]').eq(2).contains('-').should('exist');
    cy.get('[data-row-key="PH0003852"]').find('td[class="ant-table-cell"]').eq(3).contains('-').should('exist');
    cy.get('[data-row-key="PH0003852"]').find('td[class="ant-table-cell"]').eq(4).contains('14').should('exist');
  });
  
  it('Panneau Biospecimens', () => {
    cy.get('[id="biospecimen"]').find('[class*="EntityTable_title"]').contains('Biospecimen').should('exist');
    cy.get('[id="biospecimen"]').find('[class="ant-collapse-header"]').contains('Biospecimens').should('exist');
    cy.get('[id="biospecimen"]').find('[class="ant-collapse-header"]').contains('(1)').should('exist');
    cy.get('[id="biospecimen"]').find('[class="ant-collapse-header"]').contains('View in Data Exploration').should('exist');
    cy.get('[id="biospecimen"]').find('[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(0).contains('SR0463655').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(1).contains('DNA').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(1).contains('NCIT:').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(1).contains('C449').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(2).contains('Blood').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(2).contains('NCIT:').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(2).contains('C12434').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(3).contains('SP0565109').should('exist');
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(4).contains('-').should('exist');
  });
  
  it('Panneau Files [CQDG-261]', () => {
    cy.get('[id="data_file"]').find('[class*="EntityTable_title"]').contains('Data File').should('exist');
    cy.get('[id="data_file"]').find('[class="ant-collapse-header"]').contains('Files').should('exist');
    cy.get('[id="data_file"]').find('[class="ant-collapse-header"]').contains('(8)').should('exist');
    cy.get('[id="data_file"]').find('[class="ant-collapse-header"]').contains('View in Data Exploration').should('exist');
    cy.get('[id="data_file"]').find('[class="ant-collapse-header"]').find('svg[class="anticon"]').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_subTitle"]').eq(0).contains('File counts by Data Type').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Germline CNV"]').find('td[class="ant-table-cell"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Germline CNV"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 12.5%"]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="SNV"]').find('td[class="ant-table-cell"]').eq(1).contains(/^2$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="SNV"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 25%"]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Sequencing Data Supplement"]').find('td[class="ant-table-cell"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Sequencing Data Supplement"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 12.5%"]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Germline Structural Variant"]').find('td[class="ant-table-cell"]').eq(1).contains(/^2$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Germline Structural Variant"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 25%"]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Aligned Reads"]').find('td[class="ant-table-cell"]').eq(1).contains(/^1$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="Aligned Reads"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 12.5%"]').should('exist');

    cy.get('[id="data_file"]').find('[class*="EntityTable_subTitle"]').eq(1).contains('File counts by Experimental Strategy').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="WGS"]').find('td[class="ant-table-cell"]').eq(1).contains(/^8$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="WGS"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: 100%"]').should('exist');
  });
});

describe('Page d\'un participant - Valider les liens disponibles', () => {
  it('Lien Study du panneau Summary', () => {
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).find('[href]').click({force: true});
    cy.get('[data-cy="Title_Studies"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('NEURODEV').should('exist');
  });

  it('Lien Family du panneau Family [CQDG-266]', () => {
    cy.get('[data-cy="FamilyLink"]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Family ID').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('1160ST0000044').should('exist');
  });

  it('Lien Mother du panneau Family', () => {
    cy.get('[data-row-key="PT1007632"]').find('td[class="ant-table-cell"]').eq(0).find('[href]').click({force: true});
    cy.get('[class*="EntityTitle"]').contains('PT1007632');
  });

  // Pas de données
  it.skip('Lien Duo de l\'Access Limitations du panneau Data Access', () => {
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains('DUO:TODO').should('exist');
  });

  // Pas de données
  it.skip('Lien Duo de l\'Access Requirements du panneau Data Access', () => {
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains('DUO:TODO').should('exist');
  });
  
  // Pas de données
  it.skip('Lien \'See more\' de l\'Access Requirements du panneau Data Access', () => {
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('See more').click({force: true});
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('TODO').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('See less').click({force: true});
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('TODO').should('not.exist');
  });

  it.skip('Lien de l\'Access Authority du panneau Data Access [CQDG-267]', () => {
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(2).invoke('removeAttr', 'target').click({force: true});
    cy.url().should('include', 'TODO');
  });

  it.skip('Lien Mondo du panneau Diagnoses', () => {
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(0).invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains('MONDO:0003847').should('exist');
  });

  it('Lien ICD-10 du panneau Diagnoses [CQDG-259]', () => {
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(1).invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains(/^TODO$/).should('exist');
  });

  it('Lien #Participants du panneau Diagnoses', () => {
    cy.get('[id="diagnosis"]').find('td[class="ant-table-cell"]').eq(5).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Diagnosis (MONDO)').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('Inherited genetic disease (MONDO:0003847)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^789$/).should('exist');
  });

  it('Lien #Participants du panneau Phenotypes', () => {
    cy.get('[data-row-key="PH0003852"]').find('td[class="ant-table-cell"]').eq(4).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Phenotype').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('Spasticity (HP:0001257)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^14$/).should('exist');
  });

  it('Lien DataExploration du panneau Biospecimens', () => {
    cy.get('[data-cy="Biospecimens_RedirectLink"]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('PT1007374').should('exist');
  });

  it('Lien NCIT du Sample Type du panneau Biospecimens', () => {
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(1).invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains('C449').should('exist');
  });

  it('Lien NCIT du Tissue du panneau Biospecimens', () => {
    cy.get('[id="biospecimen"]').find('td[class="ant-table-cell"]').eq(2).invoke('removeAttr', 'target').click({force: true});
    cy.get('body').contains('C12434').should('exist');
  });

  it('Lien DataExploration du panneau Files', () => {
    cy.get('[data-cy="Files_RedirectLink"]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('PT1007374').should('exist');
  });

  it('Lien Files de Germline CNV du panneau Files [CQDG-261]', () => {
    cy.get('[id="data_file"]').find('[data-row-key="Germline CNV"]').find('td[class="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('PT1007374').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('Germline CNV').should('exist');
  });

  it('Lien Files de WGS du panneau Files', () => {
    cy.get('[id="data_file"]').find('[data-row-key="WGS"]').find('td[class="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryPill_field"]').contains('Experimental Strategy').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('PT1007374').should('exist');
    cy.get('[class*="QueryValues_value"]').contains('WGS').should('exist');
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
