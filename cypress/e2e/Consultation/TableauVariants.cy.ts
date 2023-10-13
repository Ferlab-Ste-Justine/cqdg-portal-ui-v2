/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page des variants - Consultation du tableau', () => {
  beforeEach(() => {
    cy.visitVariantsPage('?sharedFilterId=6bb34310-ad4f-4515-ab43-fe4b27cb5068');
  });

  it('Vérifier les informations affichées', () => {
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(1).contains('chr1:g.108937337G>A').should('exist');
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(2).contains('SNV').should('exist');
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(3).contains('rs56223817').should('exist');
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(4).find('[class*="moderateImpact"]').should('exist');
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(4).contains('Missense').should('exist');
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(4).contains('CLCC1').should('exist');
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(4).contains('p.Arg254Trp').should('exist');
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(5).contains('Benign').should('exist');
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(6).contains('1.55e-2').should('exist');
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(7).contains(/^3$/).should('exist');
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(8).contains(/^31$/).should('exist');
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(9).contains('1.62e-2').should('exist');
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(10).contains(/^31$/).should('exist');
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('[class*="ant-table-cell"]').eq(11).contains(/^0$/).should('exist');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').contains('chr1:g.108937337G>A').invoke('removeAttr', 'target').click({force: true});
    cy.get('[class*="EntityTitle"]').contains('chr1:g.108937337G>A');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('td').eq(3).find('a[href]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs56223817');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('td').eq(4).find('a[href]')
    .should('have.attr', 'href', 'https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=CLCC1');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('td').eq(5).find('a[href]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/1165732');
  });
 
  it('Valider les liens disponibles Lien Studies', () => {
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('td').eq(7).find('a[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS-COG-ALL').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS-PCGC').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS360-CHD').should('exist');
  });
 
  it('Valider les liens disponibles Lien Part.', () => {
    cy.get('tr[data-row-key="KlsW_4kBLkZLL8Dg3RI4"]').find('td').eq(8).find('a[href]').click({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT 99J46FH5').should('exist');
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
    cy.validateTableFirstRow('chr1:g.99998333T>A', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri Type [CQDG-417]', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('-', 2);
    cy.sortTableAndWait('Type');
    cy.validateTableFirstRow('Sequence Alteration', 2);
  });

  it('Valider les fonctionnalités du tableau - Tri dbSNP', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('dbSNP', 1);
    cy.validateTableFirstRow('-', 3);
    cy.sortTableAndIntercept('dbSNP', 1);
    cy.validateTableFirstRow('rs999976573', 3);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndWait('Type');
    cy.sortTableAndWait('Type');
    cy.sortTableAndWait('Variant');
    cy.sortTableAndWait('Variant');
    cy.validateTableFirstRow('chr1:g.97134042T>A', 1);
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
  