/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage();
  cy.get(`[data-cy="SidebarMenuItem_Gene"]`).click({force: true});
  cy.get('button[class*="UploadIdsButton"]').click({force: true});
  cy.get('[class*="UploadModal"] textarea').type('prdx1,nkefa ensg00000117450\nunknown');
});

describe('Page des variants - Téléverser une liste de gènes', () => {
  it('Vérifier les informations affichées - Popover', () => {
    cy.get('[class*="UploadModal"] [class*="anticon-info-circle"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});

    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').should('not.have.class', 'ant-popover-hidden');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Identifiers and File Formats').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Identifiers').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Gene Symbol, Gene Alias, Ensembl ID').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Separated by').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('comma, space, new line').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('Upload file formats').should('exist');
    cy.get('[class*="EntityUploadIds_entityUploadIdsPopover"]').contains('.txt, .csv, .tsv').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Bouton Supprimer', () => {
    cy.get('[class*="UploadModal"] textarea').contains('prdx1').should('exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').click({force: true});

    cy.get('[class*="UploadModal"] textarea').contains('prdx1').should('not.exist');
    cy.get('[class*="UploadModal"] button[class*="ant-btn-text"]').should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Annuler', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').click({force: true});

    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
  });

  it('Valider les fonctionnalités de la modal - Section Résumé masquable', () => {
    cy.get('[class*="UploadModal"] [class="ant-collapse-header-text"]').contains('Summary Table (3 matched, 1 unmatched)').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-active"]').should('exist');

    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="UploadModal"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Reconnus) [CQDG-762]', () => {
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});

    cy.get('[class*="UploadModal_tablesMessages"]').contains('4 submitted identifiers mapped to 1 unique system identifiers').should('exist');
    cy.get('[data-node-key="matched"]').contains('Matched (3)').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Submitted gene identifiers').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Mapped to').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Ensembl ID').should('exist');
    cy.get('[id*="panel-matched"] thead').contains('Symbol').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="176763:0"] td').eq(0).contains('prdx1').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="176763:0"] td').eq(1).contains('ENSG00000117450').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="176763:0"] td').eq(2).contains('PRDX1').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="176763:1"] td').eq(0).contains('nkefa').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="176763:1"] td').eq(1).contains('ENSG00000117450').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="176763:1"] td').eq(2).contains('PRDX1').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="176763:2"] td').eq(0).contains('ensg00000117450').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="176763:2"] td').eq(1).contains('ENSG00000117450').should('exist');
    cy.get('[id*="panel-matched"] [data-row-key="176763:2"] td').eq(2).contains('PRDX1').should('exist');
  });

  it('Vérifier les informations affichées - Section Résumé (onglet Inconnus)', () => {
    cy.get('[class*="UploadModal"] span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[data-node-key="unmatched"]').click({force: true});

    cy.get('[data-node-key="unmatched"]').contains('Unmatched (1)').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Submitted gene identifiers').should('exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Mapped to').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Ensembl ID').should('not.exist');
    cy.get('[id*="panel-unmatched"] thead').contains('Symbol').should('not.exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(0).contains('unknown').should('exist');
    cy.get('[id*="panel-unmatched"] [data-row-key="0"] td').eq(1).should('not.exist');
  });
  
  it('Valider les fonctionnalités de la modal - Bouton Téléverser', () => {
    cy.wait(2000);
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/graphql', 3);

    cy.validatePillSelectedQuery('Gene', ['PRDX1']);
    cy.validateTotalSelectedQuery('133');
    cy.validateTableResultsCount('133');
    cy.get('[class*="ant-select-show-search"] [class="ant-tag"]').should('not.exist');

    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('PRDX1').click({force:true});
    cy.get('[data-cy="Tag_PRDX1"]').should('exist');
  });
});
