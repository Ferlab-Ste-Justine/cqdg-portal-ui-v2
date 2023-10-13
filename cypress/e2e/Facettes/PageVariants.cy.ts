/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Variants (Participant) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('li[data-key="category_participant"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');
  });

  it('Study Code - DS360-CHD', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Study Code').should('exist');
    cy.checkValueFacetAndApply(0, 'DS360-CHD');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS360-CHD').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^68.6K$/).should('exist');
  });

  it('Study Code - DS-PCGC', () => {
    cy.checkValueFacetAndApply(0, 'DS-PCGC');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS-PCGC').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^39K$/).should('exist');
  });

  it.skip('Study Name - TODO', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('Study Name').should('exist');
    cy.checkValueFacetAndApply(1, 'TODO');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Name').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('TODO').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^TODO$/).should('exist');
  });

  it.skip('Study Name - TODO', () => {
    cy.checkValueFacetAndApply(1, 'TODO');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Name').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('TODO').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^TODO$/).should('exist');
  });
});

describe('Page Variants (Variant) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('li[data-key="category_variant"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');
  });

  it('Variant Type - SNV', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Variant Type').should('exist');
    cy.checkValueFacetAndApply(0, 'SNV');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SNV').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^80.2K$/).should('exist');
  });

  it('Variant Type - Indel', () => {
    cy.checkValueFacetAndApply(0, 'Indel');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Indel').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^535$/).should('exist');
  });

  it('Consequence - Intron', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('Consequence').should('exist');
    cy.checkValueFacetAndApply(1, 'Intron');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Consequence').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Intron').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^37.5K$/).should('exist');
  });

  it('Consequence - Missense', () => {
    cy.checkValueFacetAndApply(1, 'Missense');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Consequence').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Missense').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^680$/).should('exist');
  });

  it('External Reference - DBSNP [CQDG-299]', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('External Reference').should('exist');
    cy.checkValueFacetAndApply(2, 'DBSNP');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DBSNP').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^71.7K$/).should('exist');
  });

  it('External Reference - Clinvar [CQDG-299]', () => {
    cy.checkValueFacetAndApply(2, 'Clinvar');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Clinvar').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^439$/).should('exist');
  });

  it('Chromosome - 1', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('Chromosome').should('exist');
    cy.checkValueFacetAndApply(3, /^1$/);
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Chromosome').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains(/^1$/).should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^100K$/).should('exist');
  });

  it.skip('Chromosome - 20', () => {
    cy.checkValueFacetAndApply(3, '20');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Chromosome').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('20').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^500$/).should('exist');
  });

  it('Transmission - Unknown Parents Genotype', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(4).contains('Transmission').should('exist');
    cy.checkValueFacetAndApply(4, 'Unknown Parents Genotype');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Transmission').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Unknown Parents Genotype').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^99K$/).should('exist');
  });

  it('Transmission - Autosomal Dominant De Novo', () => {
    cy.checkValueFacetAndApply(4, 'Autosomal Dominant De Novo');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Transmission').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Autosomal Dominant De Novo').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^7,632$/).should('exist');
  });

  it('Position', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(5).contains('Position').should('exist');
    // TODO Filtrer
  });

  it('Zygosity - Heterozygote', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(6).contains('Zygosity').should('exist');
    cy.checkValueFacetAndApply(6, 'Heterozygote');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Zygosity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Heterozygote').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^98.6K$/).should('exist');
  });

  it('Zygosity - Homozygote', () => {
    cy.checkValueFacetAndApply(6, 'Homozygote');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Zygosity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Homozygote').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^22.1K$/).should('exist');
  });
});

describe('Page Variants (Gene) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('li[data-key="category_genomic"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');
  });

  it('Gene Type - Protein Coding', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Gene Type').should('exist');
    cy.checkValueFacetAndApply(0, 'Protein Coding');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Protein Coding').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^40.9K$/).should('exist');
  });

  it('Gene Type - SnoRNA', () => {
    cy.checkValueFacetAndApply(0, 'SnoRNA');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SnoRNA').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^60$/).should('exist');
  });

  it('External Reference - OMIM', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('External Reference').should('exist');
    cy.checkValueFacetAndApply(1, 'OMIM');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('OMIM').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^12K$/).should('exist');
  });

  it('External Reference - Orphanet', () => {
    cy.checkValueFacetAndApply(1, 'Orphanet');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Orphanet').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^12.1K$/).should('exist');
  });

  it('gnomAD pLI', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('gnomAD pLI').should('exist');
    // TODO Filtrer
  });

  it('gnomAD LOEUF', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('gnomAD LOEUF').should('exist');
    // TODO Filtrer
  });

  it('HPO - Autosomal recessive inheritance (HP:0000007)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(4).contains('HPO').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply(4, 'Autosomal recessive inheritance (HP:0000007)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('HPO').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Autosomal recessive inheritance (HP:0000007)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^863$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('HPO - Short stature (HP:0004322)', () => {
    cy.checkValueFacetAndApply(4, 'Short stature (HP:0004322)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('HPO').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Short stature (HP:0004322)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^368$/).should('exist');
  });

  it('ORPHANET - West syndrome', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(5).contains('ORPHANET').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply(5, 'West syndrome');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ORPHANET').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('West syndrome').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^43$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('ORPHANET - Ochoa syndrome', () => {
    cy.checkValueFacetAndApply(5, 'Ochoa syndrome');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ORPHANET').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Ochoa syndrome').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^24$/).should('exist');
  });

  // Fait planter Cypress
  it('OMIM - 5-fluorouracil toxicity', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(6).contains('OMIM').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply(6, '5-fluorouracil toxicity');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('OMIM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('5-fluorouracil toxicity').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^37$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('OMIM - Cohen syndrome', () => {
    cy.checkValueFacetAndApply(6, 'Cohen syndrome');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('OMIM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Cohen syndrome').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^16$/).should('exist');
  });

  it('DDD - CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(7).contains('DDD').should('exist');
    cy.checkValueFacetAndApply(7, 'CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('DDD').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('CEREBELLAR ATAXIA, NONPROGRESSIVE, WITH INTELLECTUAL DEVELOPMENTAL DISORDER').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^371$/).should('exist');
  });

  it('DDD - UROFACIAL SYNDROME', () => {
    cy.checkValueFacetAndApply(7, 'UROFACIAL SYNDROME');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('DDD').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('UROFACIAL SYNDROME').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^29$/).should('exist');
  });

  it('COSMIC - Paraganglioma', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(8).contains('COSMIC').should('exist');
    cy.checkValueFacetAndApply(8, 'Paraganglioma');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('COSMIC').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Paraganglioma').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^43$/).should('exist');
  });

  it('COSMIC - Leiomyomatosis', () => {
    cy.checkValueFacetAndApply(8, 'Leiomyomatosis');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('COSMIC').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Leiomyomatosis').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^8$/).should('exist');
  });
});

describe('Page Variants (Pathogenicity) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('li[data-key="category_pathogenicity"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');
  });

  it('ClinVar - Likely Benign', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('ClinVar').should('exist');
    cy.checkValueFacetAndApply(0, 'Likely Benign');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ClinVar').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Likely Benign').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^126$/).should('exist');
  });

  it('ClinVar - Drug Response', () => {
    cy.checkValueFacetAndApply(0, 'Drug Response');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ClinVar').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Drug Response').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });

  it('VEP - MODIFIER', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('VEP').should('exist');
    cy.checkValueFacetAndApply(1, 'MODIFIER');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('VEP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('MODIFIER').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^87.6K$/).should('exist');
  });

  it('VEP - HIGH', () => {
    cy.checkValueFacetAndApply(1, 'HIGH');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('VEP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HIGH').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^78$/).should('exist');
  });

  it('CADD (Raw)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('CADD (Raw)').should('exist');
    // TODO Filtrer
  });

  it('CADD (Phred)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('CADD (Phred)').should('exist');
    // TODO Filtrer
  });

  it('DANN', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(4).contains('DANN').should('exist');
    // TODO Filtrer
  });

  it('FATHMM - Tolerated', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(5).contains('FATHMM').should('exist');
    cy.checkValueFacetAndApply(5, 'Tolerated');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('FATHMM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Tolerated').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^486$/).should('exist');
  });

  it('FATHMM - Damaging', () => {
    cy.checkValueFacetAndApply(5, 'Damaging');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('FATHMM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Damaging').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^92$/).should('exist');
  });

  it('LRT - Neutral', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(6).contains('LRT').should('exist');
    cy.checkValueFacetAndApply(6, 'Neutral');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('LRT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Neutral').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^389$/).should('exist');
  });

  it('LRT - Deleterious', () => {
    cy.checkValueFacetAndApply(6, 'Deleterious');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('LRT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Deleterious').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^114$/).should('exist');
  });

  it('PolyPhen-2 HVAR - Benign', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(7).contains('PolyPhen-2 HVAR').should('exist');
    cy.checkValueFacetAndApply(7, 'Benign');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('PolyPhen-2 HVAR').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Benign').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^409$/).should('exist');
  });

  it('PolyPhen-2 HVAR - Possibly Damaging', () => {
    cy.checkValueFacetAndApply(7, 'Possibly Damaging');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('PolyPhen-2 HVAR').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Possibly Damaging').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^81$/).should('exist');
  });

  it('REVEL', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(8).contains('REVEL').should('exist');
    // TODO Filtrer
  });

  it('SpliceAI', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(9).contains('SpliceAI').should('exist');
    // TODO Filtrer
  });

  it('SIFT - Tolerated', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(10).contains('SIFT').should('exist');
    cy.checkValueFacetAndApply(10, 'Tolerated');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('SIFT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Tolerated').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^415$/).should('exist');
  });

  it('SIFT - Damaging', () => {
    cy.checkValueFacetAndApply(10, 'Damaging');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('SIFT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Damaging').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^196$/).should('exist');
  });
});

describe('Page Variants (Frequency) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('li[data-key="category_cohort"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  });

  it('Expand all/Collapse all', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="true"]').should('exist');

    cy.get('[data-cy="ExpandAll"]').click({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).find('[aria-expanded="false"]').should('exist');
  });

  it('CQDG Allele Frequency', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('CQDG Allele Frequency').should('exist');
    // TODO Filtrer
  });

  it('gnomAD Genome 2.1', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('gnomAD Genome 2.1').should('exist');
    // TODO Filtrer
  });

  it('gnomAD Genome 3.1.2', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('gnomAD Genome 3.1.2').should('exist');
    // TODO Filtrer
  });

  it('gnomAD Exome 2.1', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('gnomAD Exome 2.1').should('exist');
    // TODO Filtrer
  });

  it('TopMed', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(4).contains('TopMed').should('exist');
    // TODO Filtrer
  });

  it('1000 Genomes', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(5).contains('1000 Genomes').should('exist');
    // TODO Filtrer
  });
});