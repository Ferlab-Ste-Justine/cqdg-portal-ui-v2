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
    cy.get('[data-cy="FilterContainer_Study Code"]').should('exist');
    cy.checkValueFacetAndApply('Study Code', 'STUDY1');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('STUDY1').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^442$/).should('exist');
  });

  it.skip('Study Code - DS-PCGC', () => {
    cy.checkValueFacetAndApply('Study Code', 'DS-PCGC');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS-PCGC').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^39K$/).should('exist');
  });

  it.skip('Study Name - TODO', () => {
    cy.get('[data-cy="FilterContainer_Study Name"]').should('exist');
    cy.checkValueFacetAndApply('Study Name', 'TODO');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Name').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('TODO').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^TODO$/).should('exist');
  });

  it.skip('Study Name - TODO', () => {
    cy.checkValueFacetAndApply('Study Name', 'TODO');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Name').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('TODO').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^TODO$/).should('exist');
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

  it('Variant Type - SNV', () => {
    cy.get('[data-cy="FilterContainer_Variant Type"]').should('exist');
    cy.checkValueFacetAndApply('Variant Type', 'SNV');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SNV').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^226$/).should('exist');
  });

  it('Variant Type - Indel', () => {
    cy.checkValueFacetAndApply('Variant Type', 'indel');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Indel').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^41$/).should('exist');
  });

  it('Consequence - Intron', () => {
    cy.get('[data-cy="FilterContainer_Consequence"]').should('exist');
    cy.checkValueFacetAndApply('Consequence', 'intron');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Consequence').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Intron').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^270$/).should('exist');
  });

  it('Consequence - Missense', () => {
    cy.checkValueFacetAndApply('Consequence', 'missense');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Consequence').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Missense').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^35$/).should('exist');
  });

  it('External Reference - DBSNP [CQDG-439]', () => {
    cy.get('[data-cy="FilterContainer_External Reference"]').should('exist');
    cy.checkValueFacetAndApply('External Reference', 'DBSNP');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DbSNP').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^209$/).should('exist');
  });

  it('External Reference - Clinvar [CQDG-439]', () => {
    cy.checkValueFacetAndApply('External Reference', 'Clinvar');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('ClinVar').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^19$/).should('exist');
  });

  it('Chromosome - 1', () => {
    cy.get('[data-cy="FilterContainer_Chromosome"]').should('exist');
    cy.checkValueFacetAndApply('Chromosome', '1');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Chromosome').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains(/^1$/).should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^442$/).should('exist');
  });

  it.skip('Chromosome - 20', () => {
    cy.checkValueFacetAndApply('Chromosome', '20');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Chromosome').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('20').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^500$/).should('exist');
  });

  it('Position', () => {
    cy.get('[data-cy="FilterContainer_Position"]').should('exist');
    // TODO Filtrer
  });

  it('Zygosity - Heterozygote', () => {
    cy.get('[data-cy="FilterContainer_Zygosity"]').should('exist');
    cy.checkValueFacetAndApply('Zygosity', 'HET');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Zygosity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Heterozygote').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^387$/).should('exist');
  });

  it('Zygosity - Homozygote', () => {
    cy.checkValueFacetAndApply('Zygosity', 'HOM');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Zygosity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Homozygote').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^80$/).should('exist');
  });

  it('Sources - WGS', () => {
    cy.get('[data-cy="FilterContainer_Sources"]').should('exist');
    cy.checkValueFacetAndApply('Sources', 'WGS');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Sources').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('WGS').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^442$/).should('exist');
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

  it('Gene Type - Protein Coding', () => {
    cy.get('[data-cy="FilterContainer_Gene Type"]').should('exist');
    cy.checkValueFacetAndApply('Gene Type', 'protein_coding');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Protein Coding').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^309$/).should('exist');
  });

  it('Gene Type - NcRNA', () => {
    cy.checkValueFacetAndApply('Gene Type', 'ncRNA');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('NcRNA').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^52$/).should('exist');
  });

  it('External Reference - OMIM', () => {
    cy.get('[data-cy="FilterContainer_External Reference"]').should('exist');
    cy.checkValueFacetAndApply('External Reference', 'OMIM');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('OMIM').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^81$/).should('exist');
  });

  it('External Reference - Orphanet', () => {
    cy.checkValueFacetAndApply('External Reference', 'Orphanet');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Orphanet').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^88$/).should('exist');
  });

  it('gnomAD pLI', () => {
    cy.get('[data-cy="FilterContainer_gnomAD pLI"]').should('exist');
    // TODO Filtrer
  });

  it('gnomAD LOEUF', () => {
    cy.get('[data-cy="FilterContainer_gnomAD LOEUF"]').should('exist');
    // TODO Filtrer
  });

  it('HPO - Autosomal recessive inheritance (HP:0000007)', () => {
    cy.get('[data-cy="FilterContainer_HPO"]').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply('HPO', 'Autosomal recessive inheritance (HP:0000007)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('HPO').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Autosomal recessive inheritance (HP:0000007)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^863$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('HPO - Short stature (HP:0004322)', () => {
    cy.checkValueFacetAndApply('HPO', 'Short stature (HP:0004322)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('HPO').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Short stature (HP:0004322)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^368$/).should('exist');
  });

  it('ORPHANET - West syndrome', () => {
    cy.get('[data-cy="FilterContainer_ORPHANET"]').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply('ORPHANET', 'West syndrome');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ORPHANET').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('West syndrome').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^43$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('ORPHANET - Ochoa syndrome', () => {
    cy.checkValueFacetAndApply('ORPHANET', 'Ochoa syndrome');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ORPHANET').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Ochoa syndrome').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^24$/).should('exist');
  });

  it('OMIM - 5-fluorouracil toxicity', () => {
    cy.get('[data-cy="FilterContainer_OMIM"]').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply('OMIM', '5-fluorouracil toxicity');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('OMIM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('5-fluorouracil toxicity').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^37$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('OMIM - Cohen syndrome', () => {
    cy.checkValueFacetAndApply('OMIM', 'Cohen syndrome');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('OMIM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Cohen syndrome').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^16$/).should('exist');
  });

  it('DDD - Macrocephaly with intellectual disability', () => {
    cy.get('[data-cy="FilterContainer_DDD"]').should('exist');
    cy.checkValueFacetAndApply('DDD', 'Macrocephaly with intellectual disability');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('DDD').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Macrocephaly with intellectual disability').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^4$/).should('exist');
  });

  it('DDD - TMEM240-associated spinocerebellar ataxia and intellectual disability', () => {
    cy.checkValueFacetAndApply('DDD', 'TMEM240-associated spinocerebellar ataxia and intellectual disability');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('DDD').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('TMEM240-associated spinocerebellar ataxia and intellectual disability').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3$/).should('exist');
  });

  it('COSMIC - Paraganglioma', () => {
    cy.get('[data-cy="FilterContainer_COSMIC"]').should('exist');
    cy.checkValueFacetAndApply('COSMIC', 'paraganglioma');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('COSMIC').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Paraganglioma').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^4$/).should('exist');
  });

  it('COSMIC - Pheochromocytoma', () => {
    cy.checkValueFacetAndApply('COSMIC', 'pheochromocytoma');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('COSMIC').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Pheochromocytoma').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^4$/).should('exist');
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
    cy.get('[data-cy="FilterContainer_ClinVar"]').should('exist');
    cy.checkValueFacetAndApply('ClinVar', 'Likely_benign');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ClinVar').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Likely Benign').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3$/).should('exist');
  });

  it('ClinVar - Likely Pathogenic', () => {
    cy.checkValueFacetAndApply('ClinVar', 'Likely_pathogenic');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ClinVar').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Likely Pathogenic').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });

  it('VEP - MODIFIER', () => {
    cy.get('[data-cy="FilterContainer_VEP"]').should('exist');
    cy.checkValueFacetAndApply('VEP', 'MODIFIER');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('VEP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('MODIFIER').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^305$/).should('exist');
  });

  it('VEP - HIGH', () => {
    cy.checkValueFacetAndApply('VEP', 'HIGH');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('VEP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HIGH').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^24$/).should('exist');
  });

  it('CADD (Raw)', () => {
    cy.get('[data-cy="FilterContainer_CADD (Raw)"]').should('exist');
    // TODO Filtrer
  });

  it('CADD (Phred)', () => {
    cy.get('[data-cy="FilterContainer_CADD (Phred)"]').should('exist');
    // TODO Filtrer
  });

  it('DANN', () => {
    cy.get('[data-cy="FilterContainer_DANN"]').should('exist');
    // TODO Filtrer
  });

  it('FATHMM - Tolerated', () => {
    cy.get('[data-cy="FilterContainer_FATHMM"]').should('exist');
    cy.checkValueFacetAndApply('FATHMM', 'T');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('FATHMM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Tolerated').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^20$/).should('exist');
  });

  it('FATHMM - Damaging', () => {
    cy.checkValueFacetAndApply('FATHMM', 'D');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('FATHMM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Damaging').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3$/).should('exist');
  });

  it('LRT - Neutral', () => {
    cy.get('[data-cy="FilterContainer_LRT"]').should('exist');
    cy.checkValueFacetAndApply('LRT', 'N');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('LRT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Neutral').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^19$/).should('exist');
  });

  it('LRT - Deleterious', () => {
    cy.checkValueFacetAndApply('LRT', 'D');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('LRT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Deleterious').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2$/).should('exist');
  });

  it('PolyPhen-2 HVAR - Benign', () => {
    cy.get('[data-cy="FilterContainer_PolyPhen-2 HVAR"]').should('exist');
    cy.checkValueFacetAndApply('PolyPhen-2 HVAR', 'B');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('PolyPhen-2 HVAR').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Benign').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^21$/).should('exist');
  });

  it('PolyPhen-2 HVAR - Possibly Damaging', () => {
    cy.checkValueFacetAndApply('PolyPhen-2 HVAR', 'P');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('PolyPhen-2 HVAR').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Possibly Damaging').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^4$/).should('exist');
  });

  it('REVEL', () => {
    cy.get('[data-cy="FilterContainer_REVEL"]').should('exist');
    // TODO Filtrer
  });

  it('SpliceAI', () => {
    cy.get('[data-cy="FilterContainer_SpliceAI"]').should('exist');
    // TODO Filtrer
  });

  it('SIFT - Tolerated', () => {
    cy.get('[data-cy="FilterContainer_SIFT"]').should('exist');
    cy.checkValueFacetAndApply('SIFT', 'T');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('SIFT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Tolerated').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^14$/).should('exist');
  });

  it('SIFT - Damaging', () => {
    cy.checkValueFacetAndApply('SIFT', 'D');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('SIFT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Damaging').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^10$/).should('exist');
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
    cy.get('[data-cy="FilterContainer_CQDG Allele Frequency"]').should('exist');
    // TODO Filtrer
  });

  it('gnomAD Genome 2.1', () => {
    cy.get('[data-cy="FilterContainer_gnomAD Genome 2.1"]').should('exist');
    // TODO Filtrer
  });

  it('gnomAD Genome 3.1.2', () => {
    cy.get('[data-cy="FilterContainer_gnomAD Genome 3.1.2"]').should('exist');
    // TODO Filtrer
  });

  it('gnomAD Exome 2.1', () => {
    cy.get('[data-cy="FilterContainer_gnomAD Exome 2.1"]').should('exist');
    // TODO Filtrer
  });

  it('TopMed', () => {
    cy.get('[data-cy="FilterContainer_TopMed"]').should('exist');
    // TODO Filtrer
  });

  it('1000 Genomes', () => {
    cy.get('[data-cy="FilterContainer_1000 Genomes"]').should('exist');
    // TODO Filtrer
  });
});