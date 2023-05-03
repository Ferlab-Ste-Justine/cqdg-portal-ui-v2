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
    noResults: intl.get('global.proTable.noResults'),
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
