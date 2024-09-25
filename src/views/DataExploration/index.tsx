import { useCallback, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  ExperimentOutlined,
  FileSearchOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  IFilter,
  IFilterGroup,
  TExtendedMapping,
  VisualType,
} from '@ferlab/ui/core/components/filters/types';
import useQueryBuilderState, {
  updateActiveQueryField,
  updateActiveQueryFilters,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import {
  CheckboxQFOption,
  FacetOption,
  TitleQFOption,
} from '@ferlab/ui/core/components/SidebarMenu/QuickFilter';
import { underscoreToDot } from '@ferlab/ui/core/data/arranger/formatting';
import { getFilterGroup, getFilterType } from '@ferlab/ui/core/data/filters/utils';
import { TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import { MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { getSelectedFilters } from '@ferlab/ui/core/data/sqon/utils';
import { IExtendedMappingResults, TAggregationBuckets } from '@ferlab/ui/core/graphql/types';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { removeUnderscoreAndCapitalize, titleCase } from '@ferlab/ui/core/utils/stringUtils';
import { Spin } from 'antd';
import { INDEXES } from 'graphql/constants';
import { ExtendedMappingResults } from 'graphql/models';
import { AGGREGATION_QUERY } from 'graphql/queries';
import { GET_QUICK_FILTER_EXPLO } from 'graphql/quickFilter/queries';
import { getFilters } from 'graphql/utils/Filters';
import capitalize from 'lodash/capitalize';
import get from 'lodash/get';
import PageContent from 'views/DataExploration/components/PageContent';
import FileSearch from 'views/DataExploration/components/Searchs/FileSearch';
import FileSetSearch from 'views/DataExploration/components/Searchs/FileSetSearch';
import ParticipantSearch from 'views/DataExploration/components/Searchs/ParticipantSearch';
import ParticipantSetSearch from 'views/DataExploration/components/Searchs/ParticipantSetSearch';
import SampleSearch from 'views/DataExploration/components/Searchs/SampleSearch';
import SampleSetSearch from 'views/DataExploration/components/Searchs/SampleSetSearch';
import TreeFacet from 'views/DataExploration/components/TreeFacet';
import TreeFacetModal from 'views/DataExploration/components/TreeFacet/TreeFacetModal';
import FileUploadIds from 'views/DataExploration/components/UploadIds/FileUploadIds';
import ParticipantUploadIds from 'views/DataExploration/components/UploadIds/ParticipantUploadIds';
import SampleUploadIds from 'views/DataExploration/components/UploadIds/SampleUploadIds';
import {
  DATA_EXPLORATION_QB_ID,
  SCROLL_WRAPPER_ID,
  TAB_IDS,
} from 'views/DataExploration/utils/constant';

import FilterList, { TCustomFilterMapper } from 'components/uiKit/FilterList';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { WrapperApi } from 'services/api/wrapper';
import { remoteSliceActions } from 'store/remote/slice';
import { RemoteComponentList } from 'store/remote/types';
import {
  mapFilterForBiospecimen,
  mapFilterForFiles,
  mapFilterForParticipant,
} from 'utils/fieldMapper';
import {
  getFacetsDictionary,
  getFiltersDictionary,
  getQueryBuilderDictionary,
} from 'utils/translation';

import { formatHpoTitleAndCode, formatMondoTitleAndCode } from './utils/helper';
import {
  getFieldWithoutPrefix,
  getIndexFromQFValueFacet,
  getSelectedOptionsByQuery,
  getSqonForQuickFilterFacetValue,
  getSqonForQuickFilterFacetView,
} from './utils/quickFilter';

import styles from './index.module.css';

enum FilterTypes {
  Participant,
  Biospecimen,
  Datafiles,
}

const getFilterGroups = (type: FilterTypes) => {
  switch (type) {
    case FilterTypes.Participant:
      return {
        customSearches: [
          <ParticipantSearch key={0} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
          <ParticipantSetSearch key={1} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
          <ParticipantUploadIds key={2} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
        ],
        groups: [
          {
            facets: [
              'study__study_code',
              <TreeFacet
                key="observed_phenotypes"
                field="observed_phenotypes"
                type={RemoteComponentList.HPOTree}
                title={intl.get('entities.participant.phenotype_hpo')}
              />,
              <TreeFacet
                key="mondo"
                field="mondo"
                type={RemoteComponentList.MondoTree}
                title={intl.get('entities.participant.diagnosis_mondo')}
              />,
              'icd_tagged__name',
              'relationship_to_proband',
              'family_type',
              'sex',
              'age_at_recruitment',
              'mondo_tagged__age_at_event',
              'ethnicity',
              'observed_phenotype_tagged__source_text',
              'mondo_tagged__source_text',
            ],
          },
        ],
      };
    case FilterTypes.Biospecimen:
      return {
        customSearches: [
          <SampleSearch key={1} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
          <SampleSetSearch key={2} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
          <SampleUploadIds key={3} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
        ],
        groups: [
          {
            facets: ['sample_type', 'biospecimen_tissue_source', 'age_biospecimen_collection'],
          },
        ],
      };
    case FilterTypes.Datafiles:
      return {
        customSearches: [
          <FileSearch key={0} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
          <FileSetSearch key={1} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
          <FileUploadIds key={2} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
        ],
        groups: [
          {
            facets: [
              'dataset',
              'data_category',
              'data_type',
              'sequencing_experiment__experimental_strategy',
              'file_format',
            ],
          },
        ],
      };
  }
};

const filtersContainer = (
  mappingResults: ExtendedMappingResults,
  type: FilterTypes,
  index: string,
  filterMapper: TCustomFilterMapper,
) => {
  if (mappingResults.loading) {
    return <Spin className={styles.filterLoader} spinning />;
  }

  return (
    <FilterList
      key={index}
      index={index}
      queryBuilderId={DATA_EXPLORATION_QB_ID}
      extendedMappingResults={mappingResults}
      filterInfo={getFilterGroups(type)}
      filterMapper={filterMapper}
    />
  );
};

const DataExploration = () => {
  const dispatch = useDispatch();
  const { tab } = useParams<{ tab: string }>();
  const { activeQuery } = useQueryBuilderState(DATA_EXPLORATION_QB_ID);
  const participantMappingResults = useGetExtendedMappings(INDEXES.PARTICIPANT);
  const fileMappingResults = useGetExtendedMappings(INDEXES.FILE);
  const biospecimenMappingResults = useGetExtendedMappings(INDEXES.BIOSPECIMEN);
  const studyMappingResults = useGetExtendedMappings(INDEXES.STUDY);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quickFilterData, setQuickFilterData] = useState<{ Participant: { aggregations: any } }>();
  const [forceClose, setForceClose] = useState<boolean>(false);

  const quickfilterOpenRemote = (field: string): boolean => {
    if (field === 'observed_phenotype__name') {
      dispatch(
        remoteSliceActions.openRemoteComponent({
          id: RemoteComponentList.HPOTree,
          props: {
            visible: true,
          },
        }),
      );
      return true;
    }
    if (field === 'mondo__name') {
      dispatch(
        remoteSliceActions.openRemoteComponent({
          id: RemoteComponentList.MondoTree,
          props: {
            visible: true,
          },
        }),
      );

      return true;
    }

    return false;
  };

  const fetchFacets = useCallback(async () => {
    const { data } = await WrapperApi.graphqlRequest<{
      data: { Participant: { aggregations: any } };
    }>({
      query: GET_QUICK_FILTER_EXPLO.loc?.source.body,
      variables: {
        sqon: getSqonForQuickFilterFacetValue(activeQuery),
      },
    });
    if (data) setQuickFilterData(data?.data);
  }, [JSON.stringify(activeQuery)]);

  useEffect(() => {
    fetchFacets();
  }, [fetchFacets]);

  const getMappingByIndex = (index: string): IExtendedMappingResults => {
    switch (index) {
      case INDEXES.BIOSPECIMEN:
        return biospecimenMappingResults;
      case INDEXES.FILE:
        return fileMappingResults;
      case INDEXES.PARTICIPANT:
      default:
        return participantMappingResults;
    }
  };

  const getQFSuggestions = async (
    searchText: string,
    setOptions: React.Dispatch<React.SetStateAction<(TitleQFOption | CheckboxQFOption)[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number>>,
    setSelectedOptions: React.Dispatch<React.SetStateAction<CheckboxQFOption[]>>,
  ) => {
    setIsLoading(true);
    let totalResult = 0;
    const regexp = new RegExp('(?:^|\\W)' + searchText, 'gi');
    const facetDictionary = getFacetsDictionary();
    const suggestions: (TitleQFOption | CheckboxQFOption)[] = [];

    Object.entries(quickFilterData?.Participant.aggregations).forEach(([key, value]) => {
      const facetName = get(
        facetDictionary,
        underscoreToDot(getFieldWithoutPrefix(key)),
        removeUnderscoreAndCapitalize(getFieldWithoutPrefix(key)).replace('  ', ' '),
      );
      const facetType = participantMappingResults.data.find(
        (mapping) => mapping.field === underscoreToDot(key),
      )?.type;

      const facetValueMapping = getQueryBuilderDictionary(() => facetName).query
        ?.facetValueMapping?.[underscoreToDot(key)];

      const bucketFiltered: (TitleQFOption | CheckboxQFOption)[] = [];

      (value as TAggregationBuckets)?.buckets?.map((bucket: { key: string; doc_count: number }) => {
        const label = capitalize(facetValueMapping?.[bucket.key]) || titleCase(bucket.key);
        const index = getIndexFromQFValueFacet(key);

        if (regexp.exec(label)) {
          ++totalResult;
          bucketFiltered.push({
            key: bucket.key,
            label,
            docCount: bucket.doc_count,
            type: facetType ? getFilterType(facetType) : VisualType.Checkbox,
            facetKey: key,
            index: index,
          });
        }
      });

      const isFacetNameMatch = regexp.exec(facetName);
      if (isFacetNameMatch || bucketFiltered.length > 0) {
        if (isFacetNameMatch) ++totalResult;

        suggestions.push({
          key: key,
          label: facetName,
          type: 'title',
          index: getIndexFromQFValueFacet(key),
        });
        suggestions.push(...bucketFiltered);
      }
    });

    setSelectedOptions(getSelectedOptionsByQuery(activeQuery));
    setTotal(totalResult);
    setOptions(suggestions);
    setIsLoading(false);
  };

  const handleFacetClick = async (
    setFacetOptions: React.Dispatch<React.SetStateAction<FacetOption | undefined>>,
    option: TitleQFOption,
  ) => {
    setIsLoading(true);

    if (quickfilterOpenRemote(option.key)) {
      setForceClose(true);
      return;
    }

    const { data } = await WrapperApi.graphqlRequest<{
      data: any;
    }>({
      query: AGGREGATION_QUERY(
        option.index,
        [getFieldWithoutPrefix(option.key)],
        getMappingByIndex(option.index),
      ).loc?.source.body,

      variables: {
        sqon: getSqonForQuickFilterFacetView(activeQuery, option.index),
      },
    });

    const found = (getMappingByIndex(option.index)?.data || []).find(
      (f: TExtendedMapping) => f.field === underscoreToDot(getFieldWithoutPrefix(option.key)),
    );

    const getAgg = () => {
      switch (option.index) {
        case INDEXES.BIOSPECIMEN:
          return data?.data.biospecimen.aggregations[getFieldWithoutPrefix(option.key)];
        case INDEXES.FILE:
          return data?.data.file.aggregations[getFieldWithoutPrefix(option.key)];
        case INDEXES.PARTICIPANT:
        default:
          return data?.data.participant.aggregations[getFieldWithoutPrefix(option.key)];
      }
    };

    const aggregations = getAgg();

    const filterGroup = getFilterGroup({
      extendedMapping: found,
      aggregation: aggregations,
      rangeTypes: [],
      filterFooter: false,
      headerTooltip: false,
      dictionary: getFacetsDictionary(),
      noDataInputOption: false,
    });

    const filters =
      getFilters({ [`${option.key}`]: aggregations as TAggregationBuckets }, option.key) || [];

    const onChange = (fg: IFilterGroup, f: IFilter[]) => {
      updateActiveQueryFilters({
        queryBuilderId: DATA_EXPLORATION_QB_ID,
        filterGroup: fg,
        selectedFilters: f,
        index: getIndexFromQFValueFacet(option.key),
      });
    };

    const selectedFilters = getSelectedFilters({
      queryBuilderId: DATA_EXPLORATION_QB_ID,
      filters,
      filterGroup,
    });

    setFacetOptions({
      filterGroup,
      filters,
      onChange,
      selectedFilters,
    });
    setIsLoading(false);
  };

  const addQFOptionsToQB = (options: CheckboxQFOption[], operator: TermOperators) =>
    options.forEach((option: CheckboxQFOption) =>
      updateActiveQueryField({
        queryBuilderId: DATA_EXPLORATION_QB_ID,
        field: underscoreToDot(getFieldWithoutPrefix(option.facetKey)),
        value: [option.key],
        index: option.index,
        merge_strategy: MERGE_VALUES_STRATEGIES.APPEND_VALUES,
        operator,
      }),
    );

  const menuItems: ISidebarMenuItem[] = [
    {
      key: TAB_IDS.PARTICIPANTS,
      title: intl.get('entities.participant.participant'),
      icon: <UserOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        participantMappingResults,
        FilterTypes.Participant,
        INDEXES.PARTICIPANT,
        mapFilterForParticipant,
      ),
    },
    {
      key: TAB_IDS.BIOSPECIMENS,
      title: intl.get('entities.biospecimen.biospecimen'),
      icon: <ExperimentOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        biospecimenMappingResults,
        FilterTypes.Biospecimen,
        INDEXES.BIOSPECIMEN,
        mapFilterForBiospecimen,
      ),
    },
    {
      key: TAB_IDS.DATA_FILES,
      title: intl.get('screen.dataExploration.tabs.datafiles.facet'),
      icon: <FileSearchOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        fileMappingResults,
        FilterTypes.Datafiles,
        INDEXES.FILE,
        mapFilterForFiles,
      ),
    },
  ];

  return (
    <div className={styles.dataExplorationLayout}>
      <TreeFacetModal
        type={RemoteComponentList.HPOTree}
        modalField={'observed_phenotypes'}
        queryBuilderField={'observed_phenotypes.name'}
        titleFormatter={formatHpoTitleAndCode}
      />
      <TreeFacetModal
        type={RemoteComponentList.MondoTree}
        modalField={'mondo'}
        queryBuilderField={'mondo.name'}
        titleFormatter={formatMondoTitleAndCode}
      />
      <SidebarMenu
        className={styles.sideMenu}
        menuItems={menuItems}
        quickFilter={{
          dictionary: getFiltersDictionary(),
          handleFacetClick,
          getSuggestionsList: getQFSuggestions,
          handleOnApply: addQFOptionsToQB,
          enableQuickFilter: true,
          inputSuffixIcon: <SearchOutlined />,
          isLoading,
          forceClose,
          handleClear: () => setForceClose(false),
        }}
      />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <PageContent
          fileMapping={fileMappingResults}
          participantMapping={participantMappingResults}
          studyMapping={studyMappingResults}
          biospecimenMapping={biospecimenMappingResults}
          tabId={tab}
        />
      </ScrollContent>
    </div>
  );
};

export default DataExploration;
