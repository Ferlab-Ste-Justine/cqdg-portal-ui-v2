/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page des variants - Consultation du tableau', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
  });

  it('Vérifier les informations affichées', () => {
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(1).contains('chr1:g.114693436G>A').should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(2).contains('SNV').should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(3).contains('WGS').should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(3).find('[class*="ant-tag-purple"]').should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(4).contains('rs17602729').should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(5).find('[class*="highImpact"]').should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(5).contains('Stop gained').should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(5).contains('AMPD1').should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(5).contains('p.Gln12Ter').should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(6).contains('Conflicting Interpretations').should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(7).contains('8.50e-2').should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(8).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(9).contains(/^2$/).should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(9).find('[href]').should('not.exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(10).contains('3.33e-1').should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(11).contains(/^2$/).should('exist');
    cy.get('tr[data-row-key]').eq(7).find('[class*="ant-table-cell"]').eq(12).contains(/^0$/).should('exist');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.visitVariantsPage('?sharedFilterId=ef7ef916-6ab4-469e-a42c-52669e583d34');
    cy.get('[class*="QueryBar_selected"]').find('[class*="anticon-save"]').should('not.exist');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[data-row-key]').eq(7).contains('chr1:g.114693436G>A').click({force: true});
    cy.get('[class*="EntityTitle"]').contains('chr1:g.114693436G>A');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    cy.get('tr[data-row-key]').eq(7).find('td').eq(4).find('a[href]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs17602729');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    cy.get('tr[data-row-key]').eq(7).find('td').eq(5).find('a[href]')
    .should('have.attr', 'href', 'https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=AMPD1');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    cy.get('tr[data-row-key]').eq(7).find('td').eq(6).find('a[href]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/18271');
  });
 
  it('Valider les liens disponibles Lien Studies', () => {
    cy.get('tr[data-row-key]').eq(7).find('td').eq(8).find('a[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('STUDY1').should('exist');
  });
 
// Pas de donnée
  it.skip('Valider les liens disponibles Lien Part.', () => {
    cy.get('tr[data-row-key]').eq(7).find('td').eq(9).find('a[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT').should('exist');
  });
});

describe('Page des variants - Consultation du tableau', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
  });
  
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('-', 1);
    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('chr1:g.99999082C>T', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('-', 2);
    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('Sequence Alteration', 2);
  });

  it('Valider les fonctionnalités du tableau - Tri dbSNP', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('dbSNP', 1);
    cy.validateTableFirstRow('-', 4);
    cy.sortTableAndIntercept('dbSNP', 1);
    cy.validateTableFirstRow('rs999765', 4);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndWait('Type');
    cy.sortTableAndWait('Type');
    cy.sortTableAndWait('Variant');
    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('chr1:g.976747del', 1);
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
  