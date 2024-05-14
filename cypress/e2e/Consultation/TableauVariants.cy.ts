/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page des variants - Consultation du tableau', () => {
  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=ef7ef916-6ab4-469e-a42c-52669e583d34');
    cy.showColumn('CADD');
    cy.showColumn('REVEL');
    cy.showColumn(/^ALT$/);
    cy.showColumn('Homo.');
  });

  it('Vérifier les informations affichées', () => {
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(1).contains('chr1:g.11846011A>G').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(2).contains('SNV').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(3).contains('WGS').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(3).find('[class*="ant-tag-purple"]').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(4).find('[class*="anticon"]').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(5).contains('NPPA').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(6).find('[class*="highImpact"]').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(6).contains('Stop lost').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(6).contains('p.Ter152Arg').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(7).find('path[d*="M12.1872"]').should('exist'); // C
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(7).find('path[d*="0C5.37258"]').should('exist'); // M
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(8).contains('AD').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(8).contains('AR').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(8).find('[class*="ant-tag-blue"]').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(9).contains(/^B$/).should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(9).find('[class*="ant-tag-green"]').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(10).find('[class*="gnomadIndicatorDefault"]').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(10).contains('2.07e-1').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(11).contains('31.4K').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(12).contains(/^2/).should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(12).contains(/(3.\d{2}e-1)/).should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(13).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(14).contains(/^11.75$/).should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(15).contains('-').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(16).contains(/^2$/).should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(17).contains('0').should('exist');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.visitVariantsPage('?sharedFilterId=ef7ef916-6ab4-469e-a42c-52669e583d34');
    cy.get('[class*="QueryBar_selected"]').find('[class*="anticon-save"]').should('not.exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="anticon-copy"]').should('exist');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[data-row-key]').eq(9).contains('chr1:g.11846011A>G').click({force: true});
    cy.get('[class*="EntityTitle"]').contains('chr1:g.11846011A>G');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    cy.get('tr[data-row-key]').eq(9).find('td').eq(4).find('a[href]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs5065');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    cy.get('tr[data-row-key]').eq(9).find('td').eq(5).find('a[href]')
    .should('have.attr', 'href', 'https://www.omim.org/entry/108780');
  });
 
  it('Valider les liens disponibles Lien Gene Plus', () => {
    cy.get('tr[data-row-key]').eq(9).find('td').eq(5).find('[data-icon="plus"]').click({force: true});
    cy.validatePillSelectedQuery('Gene', ['NPPA']);
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    cy.get('tr[data-row-key]').eq(9).find('td').eq(8).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/108780');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    cy.get('tr[data-row-key]').eq(9).find('td').eq(9).find('a[href]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/226855');
  });
 
  // Pas de donnée
    it.skip('Valider les liens disponibles Lien Part.', () => {
      cy.get('tr[data-row-key]').eq(9).find('td').eq(12).find('a[href]').click({force: true});
      cy.get('[data-cy="ProTable_Participants"]', {timeout: 60*1000}).should('exist');
      cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
      cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT').should('exist');
    });
 
  it('Valider les liens disponibles Lien Studies', () => {
    cy.get('tr[data-row-key]').eq(9).find('td').eq(13).find('a[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]', {timeout: 60*1000}).should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('STUDY1').should('exist');
  });
});

describe('Page des variants - Consultation du tableau', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
  });

  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('chr1:g.100000723G>A', 1, true);
    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('chr1:g.99999849A>G', 1, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('SNV', 2, true);
    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('Ins', 2, true);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept(/^gnomAD$/, 1);
    cy.validateTableFirstRow('-', 10, true);
    cy.sortTableAndIntercept(/^gnomAD$/, 1);
    cy.validateTableFirstRow('1.00e+0', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('-', 11, true);
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('152K', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Part.', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Part.', 1);
    cy.validateTableFirstRow(/^1/, 12, true);
    cy.sortTableAndIntercept('Part.', 1);
    cy.validateTableFirstRow(/^6/, 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri ALT', () => {
    cy.showColumn(/^ALT$/);
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept(/^ALT$/, 1);
    cy.validateTableFirstRow(/^1$/, 14, true);
    cy.sortTableAndIntercept(/^ALT$/, 1);
    cy.validateTableFirstRow(/^12$/, 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Homo.', () => {
    cy.showColumn('Homo.');
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Homo.', 1);
    cy.validateTableFirstRow(/^0$/, 14, true);
    cy.sortTableAndIntercept('Homo.', 1);
    cy.validateTableFirstRow(/^6$/, 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndWait('Type');
    cy.sortTableAndWait('Type');
    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('chr1:g.100002795dup', 1, true);
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
  