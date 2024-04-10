/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page des variants (Participant) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Participant"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Study Code - STUDY1', () => {
    cy.validateFacetFilter('Study Code', 'STUDY1', 'STUDY1', /^554K$/);
    cy.validateFacetRank(0, 'Study Code');
  });
});

describe('Page des variants (Variant) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Variant"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Search by variant - 1-11846011-A-G', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by variant').should('exist');

    cy.get('[data-cy="SearchLabel_InfoCircleOutlined"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"]').contains('Enter Variant Locus, Gene Symbol, Gene Alias, Gene AA Change, dbSNP ID, ClinVar ID, Ensembl ID, refseq ID').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', '1-11846011-A-G', 'POST', '*/grapgql', 3);
    cy.wait(1000);
    cy.get('[data-cy="Search_Dropdown"]').contains('1-11846011-A-G').should('exist');
    cy.get('[data-cy="Search_Dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_1-11846011-A-G"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('1-11846011-A-G').should('exist');
    cy.validateTableResultsCount(/^1 Result$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[data-cy="Tag_1-11846011-A-G"]').should('not.exist');
  });

  it('Variant Type - SNV', () => {
    cy.validateFacetFilter('Variant Type', 'SNV', 'SNV', /^425K$/);
    cy.validateFacetRank(0, 'Variant Type');
  });

  it('Consequence - Intron', () => {
    cy.validateFacetFilter('Consequence', 'Intron', 'intron', /^325K$/);
    cy.validateFacetRank(1, 'Consequence');
  });

  it('Consequence - Missense', () => {
    cy.validateFacetFilter('Consequence', 'Missense', 'missense', /^1,949$/);
  });

  it('External Reference - DbSNP', () => {
    cy.validateFacetFilter('External Reference', 'DbSNP', 'DBSNP', /^333K$/);
    cy.validateFacetRank(2, 'External Reference');
  });

  it('Chromosome - 1', () => {
    cy.validateFacetFilter('Chromosome', '1', '1', /^554K$/);
    cy.validateFacetRank(3, 'Chromosome');
  });

  it('Position', () => {
    cy.validateFacetNumFilter('Position', '100000', /^56$/);
    cy.validateFacetRank(4, 'Position');
  });

  it('Zygosity - Heterozygote', () => {
    cy.validateFacetFilter('Zygosity', 'Heterozygote', 'HET', /^492K$/);
    cy.validateFacetRank(5, 'Zygosity');
  });

  it('Sources - WGS', () => {
    cy.validateFacetFilter('Sources', 'WGS', 'WGS', /^554K$/);
    cy.validateFacetRank(6, 'Sources');
  });
});

describe('Page des variants (Gene) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Gene"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Search by gene - FCGR3B', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by gene').should('exist');

    cy.get('[data-cy="SearchLabel_InfoCircleOutlined"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"]').contains('Enter Gene Symbol, Gene Alias or Ensembl ID').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', 'FCGR3B', 'POST', '*/grapgql', 3);
    cy.wait(1000);
    cy.get('[data-cy="Search_Dropdown"]').contains('FCGR3B').should('exist');
    cy.get('[data-cy="Search_Dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_FCGR3B"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('FCGR3B').should('exist');
    cy.validateTableResultsCount(/^63$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[data-cy="Tag_FCGR3B"]').should('not.exist');
  });

  it('Gene Type - Protein Coding', () => {
    cy.validateFacetFilter('Gene Type', 'Protein Coding', 'protein_coding', /^290K$/);
    cy.validateFacetRank(0, 'Gene Type');
  });

  it('External Reference - OMIM', () => {
    cy.validateFacetFilter('External Reference', 'OMIM', 'OMIM', /^87.7K$/);
    cy.validateFacetRank(1, 'External Reference');
  });

  it('gnomAD pLI', () => {
    cy.validateFacetNumFilter('gnomAD pLI', '0.01', /^135K$/);
    cy.validateFacetRank(2, 'gnomAD pLI');
  });

  it('gnomAD LOEUF', () => {
    cy.validateFacetNumFilter('gnomAD LOEUF', '0.1', /^3,646$/);
    cy.validateFacetRank(3, 'gnomAD LOEUF');
  });

  it('HPO - Autosomal recessive inheritance (HP:0000007)', () => {
    cy.get('[data-cy="FilterContainer_HPO"]').should('exist');
    cy.validateFacetRank(4, 'HPO');
    /* Fait planter Cypress
    cy.validateFacetFilter('HPO', 'Autosomal recessive inheritance (HP:0000007)', 'Autosomal recessive inheritance (HP:0000007)', /^863$/);
    */
  });

  it('ORPHANET - West syndrome', () => {
    cy.get('[data-cy="FilterContainer_ORPHANET"]').should('exist');
    cy.validateFacetRank(5, 'ORPHANET');
    /* Fait planter Cypress
    cy.validateFacetFilter('ORPHANET', 'West syndrome', 'West syndrome', /^43$/);
    */
  });

  it('OMIM - 5-fluorouracil toxicity', () => {
    cy.get('[data-cy="FilterContainer_OMIM"]').should('exist');
    cy.validateFacetRank(6, 'OMIM');
    /* Fait planter Cypress
    cy.validateFacetFilter('OMIM', '5-fluorouracil toxicity', '5-fluorouracil toxicity', /^37$/);
    */
  });

  it('DDD - Macrocephaly with intellectual disability', () => {
    cy.validateFacetRank(7, 'DDD');
    /* Fait planter Cypress
    cy.validateFacetFilter('DDD', 'Macrocephaly with intellectual disability', 'Macrocephaly with intellectual disability', /^4$/);
    */
  });

  it('COSMIC - Paraganglioma', () => {
    cy.validateFacetFilter('COSMIC', 'Paraganglioma', 'paraganglioma', /^194$/);
    cy.validateFacetRank(8, 'COSMIC');
  });
});

describe('Page des variants (Pathogenicity) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Pathogenicity"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('ClinVar - Likely Benign', () => {
    cy.validateFacetFilter('ClinVar', 'Likely Benign', 'Likely_benign', /^314$/);
    cy.validateFacetRank(0, 'ClinVar');
  });

  it('VEP - MODIFIER', () => {
    cy.validateFacetFilter('VEP', 'MODIFIER', 'MODIFIER', /^552K$/);
    cy.validateFacetRank(1, 'VEP');
  });

  it('CADD (Raw)', () => {
    cy.validateFacetNumFilter('CADD (Raw)', '0.01', /^376$/);
    cy.validateFacetRank(2, 'CADD (Raw)');
  });

  it('CADD (Phred)', () => {
    cy.validateFacetNumFilter('CADD (Phred)', '0.01', /^81$/);
    cy.validateFacetRank(3, 'CADD (Phred)');
  });

  it('DANN', () => {
    cy.validateFacetNumFilter('DANN', '0.1', /^31$/);
    cy.validateFacetRank(4, 'DANN');
  });

  it('FATHMM - Tolerated', () => {
    cy.validateFacetFilter('FATHMM', 'Tolerated', 'T', /^1,424$/);
    cy.validateFacetRank(5, 'FATHMM');
  });

  it('LRT - Neutral', () => {
    cy.validateFacetFilter('LRT', 'Neutral', 'N', /^1,081$/);
    cy.validateFacetRank(6, 'LRT');
  });

  it('PolyPhen-2 HVAR - Benign', () => {
    cy.validateFacetFilter('PolyPhen-2 HVAR', 'Benign', 'B', /^1,267$/);
    cy.validateFacetRank(7, 'PolyPhen-2 HVAR');
  });

  it('REVEL', () => {
    cy.validateFacetNumFilter('REVEL', '0.01', /^55$/);
    cy.validateFacetRank(8, 'REVEL');
  });

  it('SpliceAI', () => {
    cy.validateFacetNumFilter('SpliceAI', '0.01', /^172K$/);
    cy.validateFacetRank(9, 'SpliceAI');
  });

  it('SIFT - Tolerated', () => {
    cy.validateFacetFilter('SIFT', 'Tolerated', 'T', /^1,255$/);
    cy.validateFacetRank(10, 'SIFT');
  });
});

describe('Page des variants (Frequency) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Frequency"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('CQDG Allele Frequency (WGS)', () => {
    cy.validateFacetNumFilter('CQDG Allele Frequency (WGS)', '0.5', /^366K$/);
    cy.validateFacetRank(0, 'CQDG Allele Frequency (WGS)');
  });

  it('gnomAD Genome 2.1', () => {
    cy.validateFacetNumFilter('gnomAD Genome 2.1', '0.01', /^21.8K$/);
    cy.validateFacetRank(1, 'gnomAD Genome 2.1');
  });

  it('gnomAD Genome 3.1.2', () => {
    cy.validateFacetNumFilter('gnomAD Genome 3.1.2', '0.01', /^26.6K$/);
    cy.validateFacetRank(2, 'gnomAD Genome 3.1.2');
  });

  it('gnomAD Exome 2.1', () => {
    cy.validateFacetNumFilter('gnomAD Exome 2.1', '0.01', /^542$/);
    cy.validateFacetRank(3, 'gnomAD Exome 2.1');
  });

  it('TopMed', () => {
    cy.validateFacetNumFilter('TopMed', '0.01', /^26.1K$/);
    cy.validateFacetRank(4, 'TopMed');
  });

  it('1000 Genomes', () => {
    cy.validateFacetNumFilter('1000 Genomes', '0.01', /^1,324$/);
    cy.validateFacetRank(5, '1000 Genomes');
  });
});