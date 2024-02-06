/// <reference types="Cypress" />
import '../../support/commands';

describe('Navigation', () => {

  beforeEach(() => {
    cy.login();
  });

  it('Boutons de la header', () => {
    cy.visitDashboard();
    cy.get('[data-cy="Title_Dashboard"]').should('exist');

    cy.get('[data-cy="HeaderLink_Studies"]').click();
    cy.get('[data-cy="Title_Studies"]').should('exist');

    cy.get('[data-cy="HeaderLink_Data Exploration"]').click();
    cy.get('[data-cy="Title_DataExploration"]').should('exist');

    cy.get('[data-cy="HeaderLink_Variants"]').click();
    cy.get('[data-cy="Title_Variants"]').should('exist');

    cy.get('[data-cy="HeaderLink_Dashboard"]').click();
    cy.get('[data-cy="Title_Dashboard"]').should('exist');

    cy.get('[data-cy="HeaderLink_Community"]').click();
    cy.get('[data-cy="Title_Community"]').should('exist');

    cy.get('[data-cy="UserName"]').click({force: true});
    cy.get('[data-menu-id*="profile_settings"]').find('[href]').click({force: true});
    cy.get('[data-cy="Title_ProfileSettings"]').should('exist');

    cy.get('[data-cy="LangButton_FR"]').click();
    cy.get('body').contains('Prénom').should('exist');
  });

  it('Lien externe de la header - Website', () => {
    cy.visitDashboard();
    cy.get('[data-cy="HeaderLink_Website"]').invoke('removeAttr', 'target').click({force: true});
    cy.origin('https://cqdg.ca', () => {
      cy.get('body').contains(/^The Quebec Genomic Data Center|Centre quebécois de données génomiques$/).should('exist');
    });
  });

  it('Lien externe de la header - Documentation', () => {
    cy.visitDashboard();
    cy.get('[data-cy="HeaderLink_Documentation"]')
      .should('have.attr', 'href', 'https://docs.qa.juno.cqdg.ferlab.bio');
  });

  it('Lien externe de la header - Dictionary', () => {
    cy.visitDashboard();
    cy.get('[data-cy="HeaderLink_Dictionary"]')
      .should('have.attr', 'href', 'https://dict.qa.juno.cqdg.ferlab.bio');
  });

  it('Lien externe du Dashboard - Data Release', () => {
    cy.visitDashboard();
    cy.get('[data-cy="ExternalLink_DataRelease"]')
      .should('have.attr', 'href', 'https://docs.qa.juno.cqdg.ferlab.bio');
  });

  it('Redirections de la page Dashboard', () => {
    cy.visitDashboard();
    cy.get('[data-cy="GridCard_Studies"]').find('[href]').click({force: true});
    cy.get('[data-cy="Title_Studies"]').should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="GridCard_Participants"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="GridCard_Biospecimens"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="GridCard_DataFiles"]').find('[href]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
  });

  it('Liens Saved Sets de la page Dashboard', () => {
    cy.visitDashboard();
    cy.get('[data-cy="SavedSets"]').contains('Cypress Participants').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Cypress Participants').should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="Tab_Biospecimens"]').click({force: true});
    cy.get('[data-cy="SavedSets"]').contains('Cypress Biospecimens').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Cypress Biospecimens').should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="Tab_Files"]').click({force: true});
    cy.get('[data-cy="SavedSets"]').contains('Cypress Data Files').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Cypress Data Files').should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="SavedSets"] [data-cy="Tab_Variants"]').click({force: true});
    cy.get('[data-cy="SavedSets"]').contains('Cypress Variants').click({force: true});
    cy.get('[data-cy="Title_Variants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Cypress Variants').should('exist');
  });

  it('Liens Saved Filters de la page Dashboard', () => {
    cy.visitDashboard();
    cy.get('[data-cy="SavedFilters"]').contains('Cypress Gender Filter').click({force: true});
    cy.get('[data-cy="Title_DataExploration"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gender').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Female').should('exist');

    cy.visitDashboard();
    cy.get('[data-cy="SavedFilters"] [data-cy="Tab_Variants"]').click({force: true});
    cy.get('[data-cy="SavedFilters"]').contains('Cypress Variant Type Filter').click({force: true});
    cy.get('[data-cy="Title_Variants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SNV').should('exist');
  });

  it('Modals de la page Dashboard [CQDG-139]', () => {
    cy.visitDashboard();
    cy.get('[data-cy="SavedSets"] svg[data-icon="edit"]').eq(0).click({force: true});
    cy.contains('Edit set').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.visitDashboard();
    cy.get('[data-cy="SavedSets"] svg[data-icon="delete"]').eq(0).click({force: true});
    cy.contains('Permanently delete this set?').should('exist');
    cy.get('button[type="button"]').contains('Cancel').click({force: true});

    cy.visitDashboard();
    cy.get('[data-cy="SavedFilters"] svg[data-icon="edit"]').eq(0).click({force: true});
    cy.contains('Edit filter').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.visitDashboard();
    cy.get('[data-cy="SavedFilters"] svg[data-icon="delete"]').eq(0).click({force: true});
    cy.contains('Permanently delete this filter?').should('exist');
    cy.get('button[type="button"]').contains('Cancel').click({force: true});
  });

  it('Onglets de la page Data Exploration', () => {
    cy.visitDataExploration();
    cy.get('[aria-label="Studies"]').should('exist');

    cy.get('[data-cy="Tab_Participants"]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');

    cy.get('[data-cy="Tab_Biospecimens"]').click({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');

    cy.get('[data-cy="Tab_DataFiles"]').click({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
  });

  it('Modals de la page Data Exploration', () => {
    cy.visitDataExploration();

    // Facettes
    cy.get('[data-cy="SidebarMenuItem_Participant"]').click();

    cy.get('button[class*="UploadIdsButton"]').click({force: true});
    cy.get('[class="ant-modal-header"]').contains('participant').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('div[class*="Filters_filter"]').contains('Phenotype (HPO)').click({force: true});
    cy.get('[data-cy="TreeFacet_Modal_hpoTree"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('div[class*="Filters_filter"]').contains('Diagnosis (MONDO)').click({force: true});
    cy.get('[data-cy="TreeFacet_Modal_mondoTree"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').click();

    cy.get('button[class*="UploadIdsButton"]').click({force: true});
    cy.get('[class="ant-modal-header"]').contains('sample').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('[data-cy="SidebarMenuItem_Data File"]').click();

    cy.get('button[class*="UploadIdsButton"]').click({force: true});
    cy.get('[class="ant-modal-header"]').contains('file').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    // Query Builder
    cy.get('button[class*="Header_iconBtnAction"]').click({force: true});
    cy.contains('Save this filter').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    // Onglet Data Files
    cy.visitDataExploration('datafiles');
    cy.get('[class*="ant-table-row"]').eq(0).find('input[type="checkbox"]').check({force: true});

    cy.get('[data-cy="FileManifest_Button"]').click({force: true});
    cy.get('[data-cy="FileManifest_Modal"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('[data-cy="RequestAccess_Button"]').click({force: true});
    cy.get('[data-cy="RequestAccess_Modal"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Modals de la page des variants', () => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Gene"]').click();

    cy.get('button[class*="UploadIdsButton"]').click({force: true});
    cy.get('[class="ant-modal-header"]').contains('gene').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('button[class*="Header_iconBtnAction"]').click({force: true});
    cy.contains('Save this filter').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Modals de la page d\'une étude', () => {
    cy.visitStudyEntity('T-DEE', 5);

    cy.get('[data-cy="FileManifest_Button"]').click({force: true});
    cy.get('[data-cy="FileManifest_Modal"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');

    cy.get('[data-cy="RequestAccess_Button"]').click({force: true});
    cy.get('[data-cy="RequestAccess_Modal"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Modals de la page d\'un fichier', () => {
    cy.visitFileEntity('FI0000981');

    cy.get('[data-cy="FileManifest_Button"]').click({force: true});
    cy.get('[data-cy="FileManifest_Modal"]').should('exist');
    cy.get('button[class="ant-modal-close"]').invoke('click');
  });
 
  it('Liens des page Profile', () => {
    cy.visitProfileSettingsPage();
    cy.get('[data-cy="ViewProfileButton"]').click({force: true});
    cy.get('[data-cy="AvatarHeader"]').should('exist');

    cy.get('[data-cy="EditProfileButton"]').click({force: true});
    cy.get('[data-cy="Title_ProfileSettings"]').should('exist');

    cy.get('[data-cy="ViewProfileButton"]').click({force: true});
    cy.get('[data-cy="CommunityButton"]').click({force: true});
    cy.get('[data-cy="Title_Community"]').should('exist');
  });
 
  it('Liens de la page Community', () => {
    cy.visitCommunityPage();
    cy.get('[data-cy="MemberCard"]').eq(0).click({force: true});
    cy.get('[data-cy="AvatarHeader"]').should('exist');
  });

});
