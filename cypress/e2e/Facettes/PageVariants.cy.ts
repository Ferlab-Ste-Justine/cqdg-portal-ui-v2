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
  });

  it('Study Code - KF-NBL', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Study Code').should('exist');
    cy.checkValueFacetAndApply(0, 'KF-NBL');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('KF-NBL').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^4585$/).should('exist');
  });

  it('Study Code - KF-SCD', () => {
    cy.checkValueFacetAndApply(0, 'KF-SCD');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('KF-SCD').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^2403$/).should('exist');
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
  });

  it('Variant Type - SNV', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Variant Type').should('exist');
    cy.checkValueFacetAndApply(0, 'SNV');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('SNV').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^10167$/).should('exist');
  });

  it('Variant Type - Indel', () => {
    cy.checkValueFacetAndApply(0, 'Indel');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Variant Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Indel').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^45$/).should('exist');
  });

  it('Consequence - Intron Variant', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('Consequence').should('exist');
    cy.checkValueFacetAndApply(1, 'Intron Variant');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Consequence').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Intron Variant').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^5372$/).should('exist');
  });

  it('Consequence - Missense Variant', () => {
    cy.checkValueFacetAndApply(1, 'Missense Variant');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Consequence').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Missense Variant').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^77$/).should('exist');
  });

  it('External Reference - DBSNP', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('External Reference').should('exist');
    cy.checkValueFacetAndApply(2, 'DBSNP');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DBSNP').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^6693$/).should('exist');
  });

  it('External Reference - Clinvar', () => {
    cy.checkValueFacetAndApply(2, 'Clinvar');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Clinvar').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^15$/).should('exist');
  });

  it('Chromosome - 1', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('Chromosome').should('exist');
    cy.checkValueFacetAndApply(3, /^1$/);
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Chromosome').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains(/^1$/).should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^500$/).should('exist');
  });

  it('Chromosome - 20', () => {
    cy.checkValueFacetAndApply(3, '20');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Chromosome').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('20').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^500$/).should('exist');
  });

  it('Position', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(4).contains('Position').should('exist');
    // TODO Filtrer
  });

  it('Zygosity - HET', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(5).contains('Zygosity').should('exist');
    cy.checkValueFacetAndApply(5, 'HET');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Zygosity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HET').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^11727$/).should('exist');
  });

  it('Zygosity - HOM', () => {
    cy.checkValueFacetAndApply(5, 'HOM');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Zygosity').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HOM').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1651$/).should('exist');
  });

  it('Transmission - Autosomal Dominant De Novo', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(6).contains('Transmission').should('exist');
    cy.checkValueFacetAndApply(6, 'Autosomal Dominant De Novo');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Transmission').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Autosomal Dominant De Novo').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^838$/).should('exist');
  });

  it('Transmission - X Linked Dominant De Novo', () => {
    cy.checkValueFacetAndApply(6, 'X Linked Dominant De Novo');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Transmission').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('X Linked Dominant De Novo').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^62$/).should('exist');
  });
});

describe('Page Variants (Gene) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('li[data-key="category_genomic"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
  });

  it('Gene Type - Protein Coding', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('Gene Type').should('exist');
    cy.checkValueFacetAndApply(0, 'Protein Coding');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Protein Coding').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^4640$/).should('exist');
  });

  it('Gene Type - Processed Pseudogene', () => {
    cy.checkValueFacetAndApply(0, 'Processed Pseudogene');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Gene Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Processed Pseudogene').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^397$/).should('exist');
  });

  it('External Reference - OMIM', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('External Reference').should('exist');
    cy.checkValueFacetAndApply(1, 'OMIM');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('OMIM').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1463$/).should('exist');
  });

  it('External Reference - Orphanet', () => {
    cy.checkValueFacetAndApply(1, 'Orphanet');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('External Reference').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Orphanet').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1384$/).should('exist');
  });

  it('HPO - Autosomal recessive inheritance (HP:0000007)', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('HPO').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply(2, 'Autosomal recessive inheritance (HP:0000007)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('HPO').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Autosomal recessive inheritance (HP:0000007)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^863$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('HPO - Short stature (HP:0004322)', () => {
    cy.checkValueFacetAndApply(2, 'Short stature (HP:0004322)');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('HPO').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Short stature (HP:0004322)').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^368$/).should('exist');
  });

  it('ORPHANET - West syndrome', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('ORPHANET').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply(3, 'West syndrome');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ORPHANET').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('West syndrome').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^43$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('ORPHANET - Ochoa syndrome', () => {
    cy.checkValueFacetAndApply(3, 'Ochoa syndrome');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ORPHANET').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Ochoa syndrome').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^24$/).should('exist');
  });

  // Fait planter Cypress
  it('OMIM - 5-fluorouracil toxicity', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(4).contains('OMIM').should('exist');
    /* Fait planter Cypress
    cy.checkValueFacetAndApply(4, '5-fluorouracil toxicity');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('OMIM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('5-fluorouracil toxicity').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^37$/).should('exist');
    */
  });

  // Fait planter Cypress
  it.skip('OMIM - Cohen syndrome', () => {
    cy.checkValueFacetAndApply(4, 'Cohen syndrome');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('OMIM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Cohen syndrome').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^16$/).should('exist');
  });

  it('DDD - UROFACIAL SYNDROME', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(5).contains('DDD').should('exist');
    cy.checkValueFacetAndApply(5, 'UROFACIAL SYNDROME');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('DDD').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('UROFACIAL SYNDROME').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^24$/).should('exist');
  });

  it('DDD - COHEN SYNDROME', () => {
    cy.checkValueFacetAndApply(5, 'COHEN SYNDROME');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('DDD').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('COHEN SYNDROME').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^16$/).should('exist');
  });

  it('COSMIC - Leukaemia', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(6).contains('COSMIC').should('exist');
    cy.checkValueFacetAndApply(6, 'Leukaemia');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('COSMIC').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Leukaemia').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^10$/).should('exist');
  });

  it('COSMIC - Meningioma', () => {
    cy.checkValueFacetAndApply(6, 'Meningioma');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('COSMIC').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Meningioma').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^4$/).should('exist');
  });
});

describe('Page Variants (Pathogenicity) - Filtrer avec les facettes', () => {
  beforeEach(() => {
    cy.visitVariantsPage();
    cy.get('li[data-key="category_pathogenicity"]').click();
    cy.get('[data-cy="ExpandAll"]').click({force: true});
  });

  it('ClinVar - Likely Benign', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(0).contains('ClinVar').should('exist');
    cy.checkValueFacetAndApply(0, 'Likely Benign');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ClinVar').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Likely Benign').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^4$/).should('exist');
  });

  it('ClinVar - Uncertain Significance', () => {
    cy.checkValueFacetAndApply(0, 'Uncertain Significance');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('ClinVar').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Uncertain Significance').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^3$/).should('exist');
  });

  it('VEP - MODIFIER', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(1).contains('VEP').should('exist');
    cy.checkValueFacetAndApply(1, 'MODIFIER');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('VEP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('MODIFIER').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^11954$/).should('exist');
  });

  it('VEP - HIGH', () => {
    cy.checkValueFacetAndApply(1, 'HIGH');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('VEP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HIGH').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^4$/).should('exist');
  });

  it('CADD', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(2).contains('CADD').should('exist');
    // TODO Filtrer
  });

  it('DANN', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(3).contains('DANN').should('exist');
    // TODO Filtrer
  });

  it('LRT - Neutral [CQDG-238,CQDG-258]', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(4).contains('LRT').should('exist');
    cy.checkValueFacetAndApply(4, 'Neutral');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('LRT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Neutral').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^31$/).should('exist');
  });

  it('LRT - Deleterious [CQDG-238,CQDG-258]', () => {
    cy.checkValueFacetAndApply(4, 'Deleterious');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('LRT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Deleterious').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^23$/).should('exist');
  });

  it('PolyPhen-2 HVAR - Benign [CQDG-238,CQDG-258]', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(5).contains('PolyPhen-2 HVAR').should('exist');
    cy.checkValueFacetAndApply(5, 'Benign');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('PolyPhen-2 HVAR').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Benign').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^44$/).should('exist');
  });

  it('PolyPhen-2 HVAR - Possibily Damaging [CQDG-238,CQDG-258]', () => {
    cy.checkValueFacetAndApply(5, 'Possibily Damaging');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('PolyPhen-2 HVAR').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Possibily Damaging').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^13$/).should('exist');
  });

  it('FATHMM - Tolerated [CQDG-238,CQDG-258]', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(6).contains('FATHMM').should('exist');
    cy.checkValueFacetAndApply(6, 'Tolerated');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('FATHMM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Tolerated').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^59$/).should('exist');
  });

  it('FATHMM - Deleterious [CQDG-238,CQDG-258]', () => {
    cy.checkValueFacetAndApply(6, 'Deleterious');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('FATHMM').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Deleterious').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^13$/).should('exist');
  });

  it('REVEL', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(7).contains('REVEL').should('exist');
    // TODO Filtrer
  });

  it('SIFT - Tolerated [CQDG-258]', () => {
    cy.get('div[class*="Filters_customFilterContainer"]').eq(8).contains('SIFT').should('exist');
    cy.checkValueFacetAndApply(8, 'Tolerated');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('SIFT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Tolerated').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^40$/).should('exist');
  });

  it('SIFT - Deleterious [CQDG-258]', () => {
    cy.checkValueFacetAndApply(8, 'Deleterious');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('SIFT').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Deleterious').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^33$/).should('exist');
  });
});
