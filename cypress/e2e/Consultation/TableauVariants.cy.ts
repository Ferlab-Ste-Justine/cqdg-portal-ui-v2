/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../support/utils';

beforeEach(() => {
  cy.login();
});

describe('Page des variants - Consultation du tableau', () => {
  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=782f8a5e-f7b7-42e7-9061-49411ead5f79');
    cy.showColumn('Freq.');
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
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(14).contains(/^1.67e-1$/).should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(15).contains(/^11.75$/).should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(16).contains('-').should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(17).contains(/^2$/).should('exist');
    cy.get('tr[data-row-key]').eq(9).find('[class*="ant-table-cell"]').eq(18).contains('0').should('exist');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.visitVariantsPage('?sharedFilterId=782f8a5e-f7b7-42e7-9061-49411ead5f79');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('not.exist');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-copy"]').should('exist');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[data-row-key]').eq(9).contains('chr1:g.11846011A>G').clickAndWait({force: true});
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
    cy.get('tr[data-row-key]').eq(9).find('td').eq(5).find('[data-icon="plus"]').clickAndWait({force: true});
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
      cy.get('tr[data-row-key]').eq(9).find('td').eq(12).find('a[href]').clickAndWait({force: true});
      cy.get('[data-cy="ProTable_Participants"]').should('exist');
      cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
      cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT').should('exist');
    });
 
  it('Valider les liens disponibles Lien Studies', () => {
    cy.get('tr[data-row-key]').eq(9).find('td').eq(13).find('a[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('STUDY1').should('exist');
  });
});

describe('Page des variants - Consultation du tableau', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
  });

  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('chr1:g.100000723G>A', 1, true);
    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('chr1:g.99999849A>G', 1, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('SNV', 2, true);
    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('Ins', 2, true);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    cy.sortTableAndIntercept(/^gnomAD$/, 1);
    cy.validateTableFirstRow('-', 10, true);
    cy.sortTableAndIntercept(/^gnomAD$/, 1);
    cy.validateTableFirstRow('1.00e+0', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow(/^0$/, 11, true);
    cy.sortTableAndIntercept('gnomAD ALT', 1);
    cy.validateTableFirstRow('152K', 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Part.', () => {
    cy.sortTableAndIntercept('Part.', 1);
    cy.validateTableFirstRow(/^1/, 12, true);
    cy.sortTableAndIntercept('Part.', 1);
    cy.validateTableFirstRow(/^6/, 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Freq.', () => {
    cy.showColumn('Freq.');

    cy.sortTableAndIntercept('Freq.', 1);
    cy.validateTableFirstRow('8.33e-2', 14, true);
    cy.sortTableAndIntercept('Freq.', 1);
    cy.validateTableFirstRow('1.00e+0', 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri ALT', () => {
    cy.showColumn(/^ALT$/);

    cy.sortTableAndIntercept(/^ALT$/, 1);
    cy.validateTableFirstRow(/^1$/, 14, true);
    cy.sortTableAndIntercept(/^ALT$/, 1);
    cy.validateTableFirstRow(/^12$/, 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Homo.', () => {
    cy.showColumn('Homo.');

    cy.sortTableAndIntercept('Homo.', 1);
    cy.validateTableFirstRow(/^0$/, 14, true);
    cy.sortTableAndIntercept('Homo.', 1);
    cy.validateTableFirstRow(/^6$/, 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndWait('Type');
    cy.sortTableAndWait('Type');
    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('chr1:g.100002795dup', 1, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('20').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Previous').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('First').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Previous').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
  