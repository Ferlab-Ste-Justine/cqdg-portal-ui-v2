/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Participants) - Téléverser une liste d\'identifiants', () => {

  beforeEach(() => {
    cy.login();
    cy.visitDataExploration('participants');
    cy.get('[data-cy="SidebarMenuItem_Participant"]').click({force: true});
    cy.get('button[class*="UploadIdsButton"]').click({force: true});
    cy.get('[class*="UploadModal"] textarea').type('pt0000010,s03510 unknown');
  });

  it('Vérifier les informations affichées - Popover', () => {
    cy.get('[class*="UploadModal"] [class*="anticon-info-circle"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});

    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').should('not.have.class', 'ant-popover-hidden');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Identifiers and File Formats').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Identifiers').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Participant ID, External Participant ID').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Separated by').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('comma, space, new line').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Upload file formats').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('.txt, .csv, .tsv').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Bouton Supprimer', () => {
    cy.get('[class*="UploadModal"] textarea').contains('pt0000010').should('exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').click({force: true});

    cy.get('[class*="UploadModal"] textarea').contains('pt0000010').should('not.exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Annuler', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').click({force: true});

    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Section Résumé masquable [CQDG-754]', () => {
    cy.get('[class*="UploadModal"] [class="ant-collapse-header-text"]').contains('Summary Table (2 matched, 1 unmatched)').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-active"]').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Reconnus) [CQDG-754,CQDG-762]', () => {
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});

    cy.get('[class*="UploadModal_tablesMessages"]').contains('3 submitted identifiers mapped to 1 unique system identifiers').should('exist');
    cy.get('[data-node-key="matched"]').contains('Matched (2)').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Submitted participant identifiers').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Mapped to').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Participant ID').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Study Code').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="PT0000010:0"] td').eq(0).contains('pt0000010').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="PT0000010:0"] td').eq(1).contains('PT0000010').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="PT0000010:0"] td').eq(2).contains('T-DEE').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="PT0000010:1"] td').eq(0).contains('s03510').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="PT0000010:1"] td').eq(1).contains('PT0000010').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="PT0000010:1"] td').eq(2).contains('T-DEE').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Inconnus) [CQDG-754,CQDG-762]', () => {
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-node-key="unmatched"]').click({force: true});

    cy.get('[data-node-key="unmatched"]').contains('Unmatched (1)').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Submitted participant identifiers').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Mapped to').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Participant ID').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Study Code').should('not.exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(0).contains('unknown').should('exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(1).should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Téléverser', () => {
    cy.wait(2000);
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/graphql', 3);

    cy.validatePillSelectedQuery('Participant ID', ['Uploaded List']);
    cy.validateTotalSelectedQuery('1');
    cy.validateTableResultsCount('1');
    cy.get('[class*="ant-select-show-search"] [class="ant-tag"]').should('not.exist');

    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('Uploaded List').click({force:true});
    cy.get('[class*="filtersDropdown"]').should('not.exist');
  });
});

describe('Page Data Exploration (Biospecimens) - Téléverser une liste d\'identifiants', () => {

  beforeEach(() => {
    cy.login();
    cy.visitDataExploration('biospecimens');
    cy.get('[data-cy="SidebarMenuItem_Biospecimen"]').click({force: true});
    cy.get('button[class*="UploadIdsButton"]').click({force: true});
    cy.get('[class*="UploadModal"] textarea').type('sr0000214,s03510 unknown');
  });

  it('Vérifier les informations affichées - Popover', () => {
    cy.get('[class*="UploadModal"] [class*="anticon-info-circle"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});

    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').should('not.have.class', 'ant-popover-hidden');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Identifiers and File Formats').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Identifiers').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Sample ID, External Sample ID').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Separated by').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('comma, space, new line').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Upload file formats').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('.txt, .csv, .tsv').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Bouton Supprimer', () => {
    cy.get('[class*="UploadModal"] textarea').contains('sr0000214').should('exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').click({force: true});

    cy.get('[class*="UploadModal"] textarea').contains('sr0000214').should('not.exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Annuler', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').click({force: true});

    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Section Résumé masquable', () => {
    cy.get('[class*="UploadModal"] [class="ant-collapse-header-text"]').contains('Summary Table (2 matched, 1 unmatched)').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-active"]').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Reconnus) [CQDG-762]', () => {
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});

    cy.get('[class*="UploadModal_tablesMessages"]').contains('3 submitted identifiers mapped to 1 unique system identifiers').should('exist');
    cy.get('[data-node-key="matched"]').contains('Matched (2)').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Submitted sample identifiers').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Mapped to').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Sample ID').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Study Code').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="SR0000214:0"] td').eq(0).contains('sr0000214').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="SR0000214:0"] td').eq(1).contains('SR0000214').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="SR0000214:0"] td').eq(2).contains('T-DEE').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="SR0000214:1"] td').eq(0).contains('s03510').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="SR0000214:1"] td').eq(1).contains('SR0000214').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="SR0000214:1"] td').eq(2).contains('T-DEE').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Inconnus) [CQDG-762]', () => {
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-node-key="unmatched"]').click({force: true});

    cy.get('[data-node-key="unmatched"]').contains('Unmatched (1)').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Submitted sample identifiers').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Mapped to').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Sample ID').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Study Code').should('not.exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(0).contains('unknown').should('exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(1).should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Téléverser', () => {
    cy.wait(2000);
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/graphql', 3);

    cy.validatePillSelectedQuery('Sample ID', ['Uploaded List']);
    cy.validateTotalSelectedQuery('0');
    cy.validateTableResultsCount('1');
    cy.get('[class*="ant-select-show-search"] [class="ant-tag"]').should('not.exist');

    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('Uploaded List').click({force:true});
    cy.get('[class*="filtersDropdown"]').should('not.exist');
  });
});

describe('Page Data Exploration (Data Files) - Téléverser une liste d\'identifiants', () => {

  beforeEach(() => {
    cy.login();
    cy.visitDataExploration('datafiles');
    cy.get('[data-cy="SidebarMenuItem_Data File"]').click({force: true});
    cy.get('button[class*="UploadIdsButton"]').click({force: true});
    cy.get('[class*="UploadModal"] textarea').type('fi0000572,unknown');
  });

  it('Vérifier les informations affichées - Popover', () => {
    cy.get('[class*="UploadModal"] [class*="anticon-info-circle"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});

    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').should('not.have.class', 'ant-popover-hidden');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Identifiers and File Formats').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Identifiers').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('File ID').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Separated by').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('comma, space, new line').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Upload file formats').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('.txt, .csv, .tsv').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Bouton Supprimer', () => {
    cy.get('[class*="UploadModal"] textarea').contains('fi0000572').should('exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').click({force: true});

    cy.get('[class*="UploadModal"] textarea').contains('fi0000572').should('not.exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Annuler', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').click({force: true});

    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Section Résumé masquable', () => {
    cy.get('[class*="UploadModal"] [class="ant-collapse-header-text"]').contains('Summary Table (1 matched, 1 unmatched)').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-active"]').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Reconnus) [CQDG-762]', () => {
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});

    cy.get('[class*="UploadModal_tablesMessages"]').contains('2 submitted identifiers mapped to 1 unique system identifiers').should('exist');
    cy.get('[data-node-key="matched"]').contains('Matched (1)').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Submitted file identifiers').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Mapped to').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('File ID').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Study Code').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="FI0000572:0"] td').eq(0).contains('fi0000572').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="FI0000572:0"] td').eq(1).contains('FI0000572').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="FI0000572:0"] td').eq(2).contains('T-DEE').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Inconnus) [CQDG-762]', () => {
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-node-key="unmatched"]').click({force: true});

    cy.get('[data-node-key="unmatched"]').contains('Unmatched (1)').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Submitted file identifiers').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Mapped to').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('File ID').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Study Code').should('not.exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(0).contains('unknown').should('exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(1).should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Téléverser', () => {
    cy.wait(2000);
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/graphql', 3);

    cy.validatePillSelectedQuery('File ID', ['Uploaded List']);
    cy.validateTotalSelectedQuery('1');
    cy.validateTableResultsCount('1');
    cy.get('[class*="ant-select-show-search"] [class="ant-tag"]').should('not.exist');

    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('Uploaded List').click({force:true});
    cy.get('[class*="filtersDropdown"]').should('not.exist');
  });
});
