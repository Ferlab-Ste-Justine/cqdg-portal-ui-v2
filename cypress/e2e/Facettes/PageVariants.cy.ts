/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page des variants (Participant) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Participant"]').click();
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
    cy.validateFacetFilter('Study Code', 'STUDY1', 'STUDY1', /^19.5K$/);
    cy.validateFacetRank(0, 'Study Code');
  });
});

describe('Page des variants (Variant) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Variant"]').click();
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

  it('Search by variant - 1-114693436-G-A', () => {
    cy.get('[data-cy="SearchLabel_Title"]').contains('Search by variant').should('exist');

    cy.get('[data-cy="SearchLabel_InfoCircleOutlined"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"]').contains('Enter Variant Locus, Gene Symbol, Gene Alias, Gene AA Change, dbSNP ID, ClinVar ID, Ensembl ID, refseq ID').should('exist');

    cy.typeAndIntercept('[data-cy="SearchAutocomplete_Select"]', '1-114693436-G-A', 'POST', '*/grapgql', 3);
    cy.wait(1000);
    cy.get('[data-cy="Search_Dropdown"]').contains('1-114693436-G-A').should('exist');
    cy.get('[data-cy="Search_Dropdown"]').find('div[class*="ant-select-item"]').eq(0).click({force: true});

    cy.get('[data-cy="Tag_1-114693436-G-A"]').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('1-114693436-G-A').should('exist');
    cy.validateTableResultsCount(/^1 Results$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[data-cy="Tag_1-114693436-G-A"]').should('not.exist');
  });

  it('Variant Type - SNV', () => {
    cy.validateFacetFilter('Variant Type', 'SNV', 'SNV', /^15.2K$/);
    cy.validateFacetRank(0, 'Variant Type');
  });

  it('Variant Type - Indel', () => {
    cy.validateFacetFilter('Variant Type', 'Indel', 'indel', /^438$/);
  });

  it('Consequence - Intron', () => {
    cy.validateFacetFilter('Consequence', 'Intron', 'intron', /^14K$/);
    cy.validateFacetRank(1, 'Consequence');
  });

  it('Consequence - Missense', () => {
    cy.validateFacetFilter('Consequence', 'Missense', 'missense', /^1,549$/);
  });

  it('External Reference - DbSNP', () => {
    cy.validateFacetFilter('External Reference', 'DbSNP', 'DBSNP', /^10.9K$/);
    cy.validateFacetRank(2, 'External Reference');
  });

  it('External Reference - ClinVar', () => {
    cy.validateFacetFilter('External Reference', 'ClinVar', 'Clinvar', /^3,269$/);
  });

  it('Chromosome - 1', () => {
    cy.validateFacetFilter('Chromosome', '1', '1', /^19.5K$/);
    cy.validateFacetRank(3, 'Chromosome');
  });

  it.skip('Chromosome - 20', () => {
    cy.validateFacetFilter('Chromosome', '20', '20', /^5,526$/);
  });

  it('Position', () => {
    cy.validateFacetNumFilter('Position', '100000', /^13$/);
    cy.validateFacetRank(4, 'Position');
  });

  it('Zygosity - Heterozygote', () => {
    cy.validateFacetFilter('Zygosity', 'Heterozygote', 'HET', /^15.5K$/);
    cy.validateFacetRank(5, 'Zygosity');
  });

  it('Zygosity - Homozygote', () => {
    cy.validateFacetFilter('Zygosity', 'Homozygote', 'HOM', /^7,800$/);
  });

  it('Sources - WGS', () => {
    cy.validateFacetFilter('Sources', 'WGS', 'WGS', /^19.5K$/);
    cy.validateFacetRank(6, 'Sources');
  });
});

describe('Page des variants (Gene) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Gene"]').click();
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
    cy.validateTableResultsCount(/^23$/);

    cy.get('[data-icon="close-circle"]').click({force: true});
    cy.get('[data-cy="Tag_FCGR3B"]').should('not.exist');
  });

  it('Gene Type - Protein Coding', () => {
    cy.validateFacetFilter('Gene Type', 'Protein Coding', 'protein_coding', /^16.9K$/);
    cy.validateFacetRank(0, 'Gene Type');
  });

  it('Gene Type - NcRNA', () => {
    cy.validateFacetFilter('Gene Type', 'NcRNA', 'ncRNA', /^2,581$/);
  });

  it('External Reference - OMIM', () => {
    cy.validateFacetFilter('External Reference', 'OMIM', 'OMIM', /^5,261$/);
    cy.validateFacetRank(1, 'External Reference');
  });

  it('External Reference - Orphanet', () => {
    cy.validateFacetFilter('External Reference', 'Orphanet', 'Orphanet', /^5,346$/);
  });

  it('gnomAD pLI', () => {
    cy.validateFacetNumFilter('gnomAD pLI', '0.01', '10.5K');
    cy.validateFacetRank(2, 'gnomAD pLI');
  });

  it('gnomAD LOEUF', () => {
    cy.validateFacetNumFilter('gnomAD LOEUF', '0.1', '244');
    cy.validateFacetRank(3, 'gnomAD LOEUF');
  });

  it('HPO - Autosomal recessive inheritance (HP:0000007)', () => {
    cy.get('[data-cy="FilterContainer_HPO"]').should('exist');
    cy.validateFacetRank(4, 'HPO');
    /* Fait planter Cypress
    cy.validateFacetFilter('HPO', 'Autosomal recessive inheritance (HP:0000007)', 'Autosomal recessive inheritance (HP:0000007)', /^863$/);
    */
  });

  // Fait planter Cypress
  it.skip('HPO - Short stature (HP:0004322)', () => {
    cy.validateFacetFilter('HPO', 'Short stature (HP:0004322)', 'Short stature (HP:0004322)', /^368$/);
  });

  it('ORPHANET - West syndrome', () => {
    cy.get('[data-cy="FilterContainer_ORPHANET"]').should('exist');
    cy.validateFacetRank(5, 'ORPHANET');
    /* Fait planter Cypress
    cy.validateFacetFilter('ORPHANET', 'West syndrome', 'West syndrome', /^43$/);
    */
  });

  // Fait planter Cypress
  it.skip('ORPHANET - Ochoa syndrome', () => {
    cy.validateFacetFilter('ORPHANET', 'Ochoa syndrome', 'Ochoa syndrome', /^24$/);
  });

  it('OMIM - 5-fluorouracil toxicity', () => {
    cy.get('[data-cy="FilterContainer_OMIM"]').should('exist');
    cy.validateFacetRank(6, 'OMIM');
    /* Fait planter Cypress
    cy.validateFacetFilter('OMIM', '5-fluorouracil toxicity', '5-fluorouracil toxicity', /^37$/);
    */
  });

  // Fait planter Cypress
  it.skip('OMIM - Cohen syndrome', () => {
    cy.validateFacetFilter('OMIM', 'Cohen syndrome', 'Cohen syndrome', /^16$/);
  });

  it('DDD - Macrocephaly with intellectual disability', () => {
    cy.validateFacetRank(7, 'DDD');
    /* Fait planter Cypress
    cy.validateFacetFilter('DDD', 'Macrocephaly with intellectual disability', 'Macrocephaly with intellectual disability', /^4$/);
    */
  });

  // Fait planter Cypress
  it.skip('DDD - TMEM240-associated spinocerebellar ataxia and intellectual disability', () => {
    cy.validateFacetFilter('DDD', 'TMEM240-associated spinocerebellar ataxia and intellectual disability', 'TMEM240-associated spinocerebellar ataxia and intellectual disability', /^12$/);
  });

  // Pas de donnée
  it.skip('COSMIC - Paraganglioma', () => {
    cy.validateFacetFilter('COSMIC', 'Paraganglioma', 'paraganglioma', /^64$/);
    cy.validateFacetRank(8, 'COSMIC');
  });

  // Pas de donnée
  it.skip('COSMIC - Leukaemia', () => {
    cy.validateFacetFilter('COSMIC', 'Leukaemia', 'leukaemia', /^245$/);
  });
});

describe('Page des variants (Pathogenicity) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Pathogenicity"]').click();
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
    cy.validateFacetFilter('ClinVar', 'Likely Benign', 'Likely_benign', /^158$/);
    cy.validateFacetRank(0, 'ClinVar');
  });

  it('ClinVar - Likely Pathogenic', () => {
    cy.validateFacetFilter('ClinVar', 'Likely Pathogenic', 'Likely_pathogenic', /^2$/);
  });

  it('VEP - MODIFIER', () => {
    cy.validateFacetFilter('VEP', 'MODIFIER', 'MODIFIER', /^16.7K$/);
    cy.validateFacetRank(1, 'VEP');
  });

  it('VEP - HIGH', () => {
    cy.validateFacetFilter('VEP', 'HIGH', 'HIGH', /^128$/);
  });

  it('CADD (Raw)', () => {
    cy.validateFacetNumFilter('CADD (Raw)', '0.01', '306');
    cy.validateFacetRank(2, 'CADD (Raw)');
  });

  it('CADD (Phred)', () => {
    cy.validateFacetNumFilter('CADD (Phred)', '0.01', '60');
    cy.validateFacetRank(3, 'CADD (Phred)');
  });

  it('DANN', () => {
    cy.validateFacetNumFilter('DANN', '0.1', /^28$/);
    cy.validateFacetRank(4, 'DANN');
  });

  it('FATHMM - Tolerated', () => {
    cy.validateFacetFilter('FATHMM', 'Tolerated', 'T', /^1,177$/);
    cy.validateFacetRank(5, 'FATHMM');
  });

  it('FATHMM - Damaging', () => {
    cy.validateFacetFilter('FATHMM', 'Damaging', 'D', /^155$/);
  });

  it('LRT - Neutral', () => {
    cy.validateFacetFilter('LRT', 'Neutral', 'N', /^884$/);
    cy.validateFacetRank(6, 'LRT');
  });

  it('LRT - Deleterious', () => {
    cy.validateFacetFilter('LRT', 'Deleterious', 'D', /^203$/);
  });

  it('PolyPhen-2 HVAR - Benign', () => {
    cy.validateFacetFilter('PolyPhen-2 HVAR', 'Benign', 'B', /^1,060$/);
    cy.validateFacetRank(7, 'PolyPhen-2 HVAR');
  });

  it('PolyPhen-2 HVAR - Possibly Damaging', () => {
    cy.validateFacetFilter('PolyPhen-2 HVAR', 'Possibly Damaging', 'P', /^134$/);
  });

  it('REVEL', () => {
    cy.validateFacetNumFilter('REVEL', '0.01', '47');
    cy.validateFacetRank(8, 'REVEL');
  });

  it('SpliceAI', () => {
    cy.validateFacetNumFilter('SpliceAI', '0.01', '9,604');
    cy.validateFacetRank(9, 'SpliceAI');
  });

  it('SIFT - Tolerated', () => {
    cy.validateFacetFilter('SIFT', 'Tolerated', 'T', /^1,049$/);
    cy.validateFacetRank(10, 'SIFT');
  });

  it('SIFT - Damaging', () => {
    cy.validateFacetFilter('SIFT', 'Damaging', 'D', /^334$/);
  });
});

describe('Page des variants (Frequency) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Frequency"]').click();
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

  it('CQDG Allele Frequency', () => {
    cy.validateFacetNumFilter('CQDG Allele Frequency', '0.5', '11.4K');
    cy.validateFacetRank(0, 'CQDG Allele Frequency');
  });

  it('gnomAD Genome 2.1', () => {
    cy.validateFacetNumFilter('gnomAD Genome 2.1', '0.01', '1,312');
    cy.validateFacetRank(1, 'gnomAD Genome 2.1');
  });

  it('gnomAD Genome 3.1.2', () => {
    cy.validateFacetNumFilter('gnomAD Genome 3.1.2', '0.01', '1,683');
    cy.validateFacetRank(2, 'gnomAD Genome 3.1.2');
  });

  it('gnomAD Exome 2.1', () => {
    cy.validateFacetNumFilter('gnomAD Exome 2.1', '0.01', '685');
    cy.validateFacetRank(3, 'gnomAD Exome 2.1');
  });

  it('TopMed', () => {
    cy.validateFacetNumFilter('TopMed', '0.01', '1,016');
    cy.validateFacetRank(4, 'TopMed');
  });

  it('1000 Genomes', () => {
    cy.validateFacetNumFilter('1000 Genomes', '0.01', '50');
    cy.validateFacetRank(5, '1000 Genomes');
  });
});