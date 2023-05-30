import React from 'react';
import intl from 'react-intl-universal';
import { IDictionary as FiltersDict } from '@ferlab/ui/core/components/filters/types';
import { IProTableDictionary } from '@ferlab/ui/core/components/ProTable/types';
import { IDictionary as QueryBuilderDict } from '@ferlab/ui/core/components/QueryBuilder/types';
import { SET_ID_PREFIX } from '@ferlab/ui/core/data/sqon/types';

import { IUserSetOutput } from 'services/api/savedSet/models';

export const getEntityExpandableTableMultiple = () => ({
  hideTranscript: intl.get('entities.variant.consequences.hideTranscript'),
  showTranscript: (count: number) =>
    intl.get('entities.variant.consequences.showTranscript', { count }),
  seeLess: intl.get('see.less'),
  seeMore: intl.get('see.more'),
  noDataAvailable: intl.get('no.data.available'),
});

export const getEntityConsequenceDictionary = () => ({
  consequence: intl.get('entities.variant.consequences.consequence'),
  impactTag: {
    modifier: intl.get('entities.variant.consequences.impactTag.modifier'),
    low: intl.get('entities.variant.consequences.impactTag.low'),
    moderate: intl.get('entities.variant.consequences.impactTag.moderate'),
    high: intl.get('entities.variant.consequences.impactTag.high'),
  },
  aaColumnTooltip: intl.get('entities.variant.consequences.aaColumnTooltip'),
  aaColumn: intl.get('entities.variant.consequences.aaColumn'),
  cdnaChangeColumn: intl.get('entities.variant.consequences.cdnaChangeColumn'),
  strand: intl.get('entities.variant.consequences.strand'),
  vep: intl.get('entities.variant.consequences.vep'),
  predictions: {
    predictions: intl.get('entities.variant.consequences.predictions.predictions'),
    sift: intl.get('entities.variant.consequences.predictions.sift'),
    polyphen2: intl.get('entities.variant.consequences.predictions.polyphen2'),
    fathmm: intl.get('entities.variant.consequences.predictions.fathmm'),
    cadd: intl.get('entities.variant.consequences.predictions.cadd'),
    dann: intl.get('entities.variant.consequences.predictions.dann'),
    lrt: intl.get('entities.variant.consequences.predictions.lrt'),
    revel: intl.get('entities.variant.consequences.predictions.revel'),
  },
  conservationColumn: intl.get('entities.variant.consequences.conservationColumn'),
  transcript: intl.get('entities.variant.consequences.transcript'),
  canonical: intl.get('entities.variant.consequences.canonical'),
  refSeq: intl.get('entities.variant.consequences.refSeq'),
  geneConsequence: intl.get('entities.variant.consequences.geneConsequence'),
  gene: intl.get('entities.variant.gene'),
  omim: intl.get('entities.variant.consequences.omim'),
});

export const getProTableDictionary = (): IProTableDictionary => ({
  itemCount: {
    results: intl.get('global.proTable.results'),
    noResults: intl.get('global.proTable.noResult'),
    of: intl.get('global.proTable.of'),
    selected: intl.get('global.proTable.selected'),
    selectedPlural: intl.get('global.proTable.selectedPlural'),
    selectAllResults: intl.get('global.proTable.selectAllResults'),
    clear: intl.get('global.proTable.clear'),
  },
  tooltips: {
    tableExport: intl.get('global.proTable.tableExport'),
  },
  columnSelector: {
    reset: intl.get('global.proTable.reset'),
    tooltips: {
      columns: intl.get('global.proTable.columns'),
    },
  },
  pagination: {
    first: intl.get('global.proTable.first'),
    previous: intl.get('global.proTable.previous'),
    next: intl.get('global.proTable.next'),
    view: intl.get('global.proTable.view'),
  },
});

export const getFiltersDictionary = (): FiltersDict => ({
  actions: {
    all: intl.get('global.filters.actions.all'),
    apply: intl.get('global.filters.actions.apply'),
    clear: intl.get('global.filters.actions.clear'),
    less: intl.get('global.filters.actions.less'),
    more: intl.get('global.filters.actions.more'),
    none: intl.get('global.filters.actions.none'),
    dictionary: intl.get('global.filters.actions.dictionary'),
  },
  operators: {
    allOf: intl.get('global.filters.operators.allOf'),
    anyOf: intl.get('global.filters.operators.anyOf'),
    noneOf: intl.get('global.filters.operators.noneOf'),
    between: intl.get('global.filters.operators.between'),
    lessThan: intl.get('global.filters.operators.lessthan'),
    lessThanOfEqual: intl.get('global.filters.operators.lessthanorequal'),
    greaterThan: intl.get('global.filters.operators.greaterthan'),
    greaterThanOrEqual: intl.get('global.filters.operators.greaterthanorequal'),
  },
  range: {
    from: intl.get('global.filters.range.from'),
    to: intl.get('global.filters.range.to'),
    actualInterval: intl.get('global.filters.range.actualInterval'),
    is: intl.get('global.filters.range.is'),
    min: 'min',
    max: 'max',
    noData: intl.get('api.noData'),
  },
  checkBox: {
    noData: intl.get('api.noData'),
    searchPlaceholder: intl.get('global.filters.checkbox.placeholder'),
  },
  messages: {
    errorNoData: intl.get('global.filters.messages.empty'),
  },
});

export const getQueryBuilderDictionary = (
  facetResolver: (key: string) => React.ReactNode,
  savedSets?: IUserSetOutput[],
): QueryBuilderDict => ({
  queryBuilderHeader: {
    modal: {
      edit: {
        title: intl.get('components.querybuilder.header.modal.edit.title'),
        okText: intl.get('components.querybuilder.header.modal.edit.okText'),
        cancelText: intl.get('components.querybuilder.header.modal.edit.cancelText'),
        content: '',
        input: {
          label: intl.get('components.querybuilder.header.modal.edit.input.label'),
          placeholder: intl.get('components.querybuilder.header.modal.edit.input.placeholder'),
          maximumLength: intl.get('components.querybuilder.header.modal.edit.input.maximumLength'),
        },
      },
      saveThisFilter: intl.get('components.querybuilder.header.modal.saveThisFilter'),
      confirmUnsaved: {
        title: intl.get('components.querybuilder.header.modal.confirmUnsaved.title'),
        openSavedFilter: {
          okText: intl.get(
            'components.querybuilder.header.modal.confirmUnsaved.openSavedFilter.okText',
          ),
          cancelText: intl.get(
            'components.querybuilder.header.modal.confirmUnsaved.openSavedFilter.cancelText',
          ),
          content: intl.get(
            'components.querybuilder.header.modal.confirmUnsaved.openSavedFilter.content',
          ),
        },
        createNewFilter: {
          okText: intl.get(
            'components.querybuilder.header.modal.confirmUnsaved.createNewFilter.okText',
          ),
          cancelText: intl.get(
            'components.querybuilder.header.modal.confirmUnsaved.createNewFilter.cancelText',
          ),
          content: intl.get(
            'components.querybuilder.header.modal.confirmUnsaved.createNewFilter.content',
          ),
        },
      },
    },
    popupConfirm: {
      delete: {
        title: intl.get('components.querybuilder.header.popupConfirm.delete.title'),
        okText: intl.get('components.querybuilder.header.popupConfirm.delete.okText'),
        cancelText: intl.get('components.querybuilder.header.popupConfirm.delete.cancelText'),
        content: intl.get('components.querybuilder.header.popupConfirm.delete.content'),
      },
    },
    tooltips: {
      newQueryBuilder: intl.get('components.querybuilder.header.tooltips.newQueryBuilder'),
      save: intl.get('components.querybuilder.header.tooltips.save'),
      saveChanges: intl.get('components.querybuilder.header.tooltips.saveChanges'),
      delete: intl.get('components.querybuilder.header.tooltips.delete'),
      duplicateQueryBuilder: intl.get(
        'components.querybuilder.header.tooltips.duplicateQueryBuilder',
      ),
      share: intl.get('components.querybuilder.header.tooltips.share'),
      setAsDefaultFilter: intl.get('components.querybuilder.header.tooltips.setAsDefaultFilter'),
      unsetDefaultFilter: intl.get('components.querybuilder.header.tooltips.unsetDefaultFilter'),
      undoChanges: intl.get('components.querybuilder.header.tooltips.undoChanges'),
      noSavedFilters: intl.get('components.querybuilder.header.tooltips.noSavedFilters'),
    },
    myFiltersDropdown: {
      title: intl.get('components.querybuilder.header.myFiltersDropdown.title'),
      manageMyFilter: intl.get('components.querybuilder.header.myFiltersDropdown.manageMyFilter'),
    },
    duplicateFilterTitleSuffix: intl.get(
      'components.querybuilder.header.duplicateFilterTitleSuffix',
    ),
  },
  query: {
    combine: {
      and: intl.get('components.querybuilder.query.combine.and'),
      or: intl.get('components.querybuilder.query.combine.or'),
    },
    noQuery: intl.get('components.querybuilder.query.noQuery'),
    facet: facetResolver,
    facetValueMapping: {
      chromosome: {
        true: '1',
      },
    },
    setNameResolver: (setId: string) => {
      const set = savedSets?.find((set) => set.id === setId.replace(SET_ID_PREFIX, ''));
      return set ? set.tag : setId;
    },
  },
  actions: {
    new: intl.get('components.querybuilder.actions.new'),
    addQuery: intl.get('components.querybuilder.actions.addQuery'),
    combine: intl.get('components.querybuilder.actions.combine'),
    labels: intl.get('components.querybuilder.actions.labels'),
    changeOperatorTo: intl.get('components.querybuilder.actions.changeOperatorTo'),
    delete: {
      title: intl.get('components.querybuilder.actions.delete.title'),
      cancel: intl.get('components.querybuilder.actions.delete.cancel'),
      confirm: intl.get('components.querybuilder.actions.delete.confirm'),
    },
    clear: {
      title: intl.get('components.querybuilder.actions.clear.title'),
      cancel: intl.get('components.querybuilder.actions.clear.cancel'),
      confirm: intl.get('components.querybuilder.actions.clear.confirm'),
      buttonTitle: intl.get('components.querybuilder.actions.clear.buttonTitle'),
      description: intl.get('components.querybuilder.actions.clear.description'),
    },
  },
});

export const getFacetsDictionary = () => ({
  study_code: intl.get('entities.study.study_code'),
  domain: intl.get('entities.study.domain'),
  biospecimen_id: intl.get('entities.biospecimen.biospecimen_id'),
  file_id: intl.get('entities.file.file_id'),
  file_2_id: intl.get('entities.file.file_id'),
  participant_id: intl.get('entities.participant.participant_id'),
  participant_2_id: intl.get('entities.participant.participant_id'),
  sample_id: intl.get('entities.biospecimen.sample_id'),
  sample_2_id: intl.get('entities.biospecimen.sample_id'),
  data_access_codes: {
    access_limitations: intl.get('entities.study.data_access_codes.access_limitations'),
    access_requirements: intl.get('entities.study.data_access_codes.access_requirements'),
  },
  study: {
    study_code: intl.get('entities.study.study_code'),
    external_id: 'dbGaP Accession Number',
  },
  studies: {
    study_code: intl.get('entities.study.study_code'),
  },
  start: 'Position',
  acl: 'ACL',
  transmissions: 'Transmission',
  controlled_access: 'Access',
  is_harmonized: 'Harmonized Data',
  is_proband: 'Proband',
  diagnosis: {
    affected_status: 'Clinical Status',
    age_at_event_days: 'Age at Diagnosis',
    mondo_id_diagnosis: 'Diagnosis (MONDO)',
    ncit_id_diagnosis: 'Diagnosis (NCIT)',
    source_text: 'Diagnosis (Source Text)',
    source_text_tumor_location: 'Tumor Location (Source Text)',
  },
  outcomes: {
    vital_status: intl.get('entities.participant.vital_status'),
    age_at_event_days: {
      value: intl.get('entities.participant.age_at_outcome'),
    },
  },
  phenotype: {
    // age_at_event_days: intl.get('entities.participant.ageAtObservedPhenotype'),
  },
  observed_phenotypes: {
    name: intl.get('entities.participant.phenotype'),
  },
  observed_phenotype_tagged: {
    source_text: intl.get('entities.participant.phenotype_source_text'),
  },
  icd_tagged: {
    name: intl.get('entities.participant.diagnosis_icd'),
  },
  gender: intl.get('entities.participant.gender'),
  age_at_recruitment: intl.get('entities.participant.age_at_recruitment'),
  ethnicity: intl.get('entities.participant.ethnicity'),
  mondo_tagged: {
    name: intl.get('entities.participant.diagnosis_mondo'),
    source_text: intl.get('entities.participant.diagnosis_source_text'),
    age_at_event: intl.get('entities.participant.age_at_diagnosis_tooltip'),
  },
  mondo: {
    name: intl.get('entities.participant.diagnosis_mondo'),
  },
  sample_type: intl.get('entities.biospecimen.sample_type'),
  biospecimen_tissue_source: intl.get('entities.biospecimen.biospecimen_tissue_source'),
  age_biospecimen_collection: intl.get('entities.biospecimen.age_biospecimen_collection_tooltip'),
  clinvar: {
    clin_sig: 'ClinVar',
  },
  data_category: intl.get('entities.file.data_category'),
  data_type: intl.get('entities.file.data_type'),
  file_format: intl.get('entities.file.file_format'),
  sequencing_experiment: {
    experimental_strategy: intl.get('entities.file.sequencing_experiment.experimental_strategy'),
    analysis_id: intl.get('entities.file.sequencing_experiment.analysis_id'),
  },
  variant_class: intl.get('entities.variant.variant_class'),
  variant_external_reference: intl.get('entities.variant.variant_external_reference'),
  consequences: {
    consequences: intl.get('entities.variant.consequences.consequence'),
    biotype: intl.get('entities.variant.biotype'),
    vep_impact: 'VEP',
    predictions: {
      sift_pred: 'SIFT',
      polyphen2_hvar_pred: 'PolyPhen-2 HVAR',
      fathmm_pred: 'FATHMM',
      cadd_rankscore: 'CADD',
      lrt_pred: 'LRT',
      revel_rankscore: 'REVEL',
      dann_rankscore: 'DANN',
    },
  },
  genes: {
    hpo: {
      hpo_term_label: 'HPO',
    },
    orphanet: {
      panel: 'ORPHANET',
    },
    omim: {
      name: 'OMIM',
    },
    ddd: {
      disease_name: 'DDD',
    },
    cosmic: {
      tumour_types_germline: 'COSMIC',
    },
  },
  frequencies: {
    internal: {
      upper_bound_kf: {
        af: 'KF Allele Frequency',
      },
    },
    gnomad_genomes_2_1: {
      af: 'gnomAD Genome 2.1',
    },
    gnomad_genomes_3_0: {
      af: 'gnomAD Genome 3.0',
    },
    gnomad_genomes_3_1_1: {
      af: 'gnomAD Genome 3.1',
    },
    gnomad_exomes_2_1: {
      af: 'gnomAD Exome 2.1',
    },
    topmed: {
      af: 'TopMed',
    },
    one_thousand_genomes: {
      af: '1000 Genomes',
    },
  },
  tooltips: {
    consequences: {
      vep_impact: 'Ensembl Variant Effect Predictor',
      predictions: {
        cadd_rankscore: 'Combined Annotation Dependent Depletion',
        dann_rankscore: 'Deleterious Annotation of genetic variants using Neural Networks',
        fathmm_pred: 'Functional Analysis Through Hidden Markov Models',
        lrt_pred: 'Likelihood Ratio Test',
        polyphen2_hvar_pred: 'Polymorphism Phenotyping v2 HumVar',
        revel_rankscore: 'Rare Exome Variant Ensemble Learner',
        sift_pred: 'Sorting Intolerant From Tolerant',
      },
    },
    genes: {
      hpo: {
        hpo_term_label: 'Human Phenotype Ontology',
      },
      orphanet: {
        panel: 'ORPHANET',
      },
      omim: {
        name: 'Online Mendelian Inheritance in Man ',
      },
      ddd: {
        disease_name: 'Deciphering Developmental Disorders',
      },
      cosmic: {
        tumour_types_germline: 'Catalogue Of Somatic Mutations In Cancer',
      },
    },
  },
  chromosome: intl.get('entities.variant.chromosome'),
  zygosity: intl.get('entities.variant.zygosity'),
  gene_external_reference: intl.get('entities.variant.variant_external_reference'),
  gene: {
    panels: intl.get('entities.variant.panels'),
  },
  population: intl.get('entities.study.population'),
});
