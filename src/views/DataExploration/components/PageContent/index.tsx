import { ReactElement, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ExperimentOutlined,
  FileTextOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { TExtendedMapping } from '@ferlab/ui/core/components/filters/types';
import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import { ISavedFilter } from '@ferlab/ui/core/components/QueryBuilder/types';
import { dotToUnderscore } from '@ferlab/ui/core/data/arranger/formatting';
import { IRemoteComponent, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { isEmptySqon, resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { IExtendedMappingResults } from '@ferlab/ui/core/graphql/types';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Space, Tabs, Typography } from 'antd';
import copy from 'copy-to-clipboard';
import { useTotalBiospecimens } from 'graphql/biospecimens/actions';
import { INDEXES } from 'graphql/constants';
import { useTotalDataFiles } from 'graphql/files/actions';
import { useTotalParticipants } from 'graphql/participants/actions';
import { IParticipantResultTree } from 'graphql/participants/models';
import { GET_PARTICIPANTS_COUNT } from 'graphql/participants/queries';
import EnvVariables from 'helpers/EnvVariables';
import get from 'lodash/get';
import DataFilesTabs from 'views/DataExploration/components/PageContent/tabs/DataFiles';
import ParticipantsTab from 'views/DataExploration/components/PageContent/tabs/Participants';
import SummaryTab from 'views/DataExploration/components/PageContent/tabs/Summary';
import {
  DATA_EXPLORATION_FILTER_TAG,
  DATA_EXPLORATION_QB_ID,
  TAB_IDS,
} from 'views/DataExploration/utils/constant';

import { SHARED_FILTER_ID_QUERY_PARAM_KEY } from 'common/constants';
import GenericFilters from 'components/uiKit/FilterList/GenericFilters';
import useQBStateWithSavedFilters from 'hooks/useQBStateWithSavedFilters';
import { SavedFilterTag } from 'services/api/savedFilter/models';
import { WrapperApi } from 'services/api/wrapper';
import { globalActions } from 'store/global';
import { remoteSliceActions } from 'store/remote/slice';
import {
  createSavedFilter,
  deleteSavedFilter,
  setSavedFilterAsDefault,
  updateSavedFilter,
} from 'store/savedFilter/thunks';
import { useSavedSet } from 'store/savedSet';
import { getDocLang } from 'utils';
import {
  combineExtendedMappings,
  mapFilterForBiospecimen,
  mapFilterForFiles,
  mapFilterForParticipant,
  mapFilterForStudies,
} from 'utils/fieldMapper';
import { getCurrentUrl } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { getFacetsDictionary, getQueryBuilderDictionary } from 'utils/translation';

import BiospecimensTab from './tabs/Biospecimens';

import styles from './index.module.scss';

const { Title, Text } = Typography;

const addTagToFilter = (filter: ISavedFilter) => ({
  ...filter,
  tag: DATA_EXPLORATION_FILTER_TAG,
});

const resolveSqonForParticipants = (queryList: ISyntheticSqon[], activeQuery: ISyntheticSqon) =>
  mapFilterForParticipant(resolveSyntheticSqon(queryList, activeQuery));

const resolveSqonForFiles = (queryList: ISyntheticSqon[], activeQuery: ISyntheticSqon) =>
  mapFilterForFiles(resolveSyntheticSqon(queryList, activeQuery));

const resolveSqonForBiospecimens = (queryList: ISyntheticSqon[], activeQuery: ISyntheticSqon) =>
  mapFilterForBiospecimen(resolveSyntheticSqon(queryList, activeQuery));

const resolveSqonForStudies = (queryList: ISyntheticSqon[], activeQuery: ISyntheticSqon) =>
  mapFilterForStudies(resolveSyntheticSqon(queryList, activeQuery));

interface IPageContentProps {
  fileMapping: IExtendedMappingResults;
  biospecimenMapping: IExtendedMappingResults;
  participantMapping: IExtendedMappingResults;
  studyMapping: IExtendedMappingResults;
  tabId?: string;
}

const PageContent = ({
  fileMapping,
  participantMapping,
  biospecimenMapping,
  studyMapping,
  tabId = TAB_IDS.SUMMARY,
}: IPageContentProps) => {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const navigate = useNavigate();
  const { savedSets } = useSavedSet();
  const { queryList, activeQuery, selectedSavedFilter, savedFilterList } =
    useQBStateWithSavedFilters(DATA_EXPLORATION_QB_ID, SavedFilterTag.DataExplorationPage);

  const [selectedFilterContent, setSelectedFilterContent] = useState<ReactElement | undefined>(
    undefined,
  );

  const participantResolvedSqon = resolveSqonForParticipants(queryList, activeQuery);
  const biospecimenResolvedSqon = resolveSqonForBiospecimens(queryList, activeQuery);
  const fileResolvedSqon = resolveSqonForFiles(queryList, activeQuery);
  const studyResolvedSqon = resolveSqonForStudies(queryList, activeQuery);

  const facetTransResolver = (key: string) => {
    const title = get(getFacetsDictionary(), key, key);
    return title
      ? title
      : combineExtendedMappings([participantMapping, fileMapping, biospecimenMapping])?.data?.find(
          (mapping: TExtendedMapping) => key === mapping.field,
        )?.displayName || key;
  };

  const getSqonAndMappingByIndex = (index: INDEXES) => {
    switch (index) {
      case INDEXES.FILE:
        return {
          sqon: fileResolvedSqon,
          mapping: fileMapping,
        };
      case INDEXES.PARTICIPANT:
        return {
          sqon: participantResolvedSqon,
          mapping: participantMapping,
        };
      case INDEXES.BIOSPECIMEN:
        return {
          sqon: biospecimenResolvedSqon,
          mapping: biospecimenMapping,
        };
      case INDEXES.STUDY:
        return {
          sqon: studyResolvedSqon,
          mapping: studyMapping,
        };
      default:
        return {
          sqon: participantResolvedSqon,
          mapping: participantMapping,
        };
    }
  };

  const handleOnUpdateFilter = (filter: ISavedFilter) => dispatch(updateSavedFilter(filter));
  const handleOnSaveFilter = (filter: ISavedFilter) =>
    dispatch(createSavedFilter(addTagToFilter(filter)));
  const handleOnDeleteFilter = (id: string) => dispatch(deleteSavedFilter(id));
  const handleOnSaveAsFavorite = (filter: ISavedFilter) =>
    dispatch(setSavedFilterAsDefault(addTagToFilter(filter)));
  const handleOnShareFilter = (filter: ISavedFilter) => {
    copy(`${getCurrentUrl()}?${SHARED_FILTER_ID_QUERY_PARAM_KEY}=${filter.id}`);
    dispatch(
      globalActions.displayMessage({
        content: 'Copied share url',
        type: 'success',
      }),
    );
  };

  const items = [
    {
      label: (
        <span data-cy="Tab_Summary">
          <PieChartOutlined />
          {intl.get('screen.dataExploration.tabs.summary.title')}
        </span>
      ),
      key: TAB_IDS.SUMMARY,
      children: <SummaryTab />,
    },
    {
      label: (
        <span data-cy="Tab_Participants">
          <UserOutlined />
          {intl.get('screen.dataExploration.tabs.participants.title', {
            count: numberFormat(useTotalParticipants({ sqon: participantResolvedSqon })),
          })}
        </span>
      ),
      key: TAB_IDS.PARTICIPANTS,
      children: <ParticipantsTab sqon={participantResolvedSqon} />,
    },
    {
      label: (
        <span data-cy="Tab_Biospecimens">
          <ExperimentOutlined />
          {intl.get('screen.dataExploration.tabs.biospecimens.title', {
            count: numberFormat(useTotalBiospecimens({ sqon: biospecimenResolvedSqon })),
          })}
        </span>
      ),
      key: TAB_IDS.BIOSPECIMENS,
      children: <BiospecimensTab sqon={biospecimenResolvedSqon} />,
    },
    {
      label: (
        <span data-cy="Tab_DataFiles">
          <FileTextOutlined />
          {intl.get('screen.dataExploration.tabs.datafiles.title', {
            count: numberFormat(useTotalDataFiles({ sqon: fileResolvedSqon })),
          })}
        </span>
      ),
      key: TAB_IDS.DATA_FILES,
      children: <DataFilesTabs sqon={fileResolvedSqon} />,
    },
  ];

  return (
    <Space direction="vertical" size={24} className={styles.dataExplorePageContent}>
      <div>
        <Title className={styles.title} level={4} data-cy="Title_DataExploration">
          {intl.get('screen.dataExploration.title')}
        </Title>
        <Text className={styles.subTitle}>
          {intl.get('screen.dataExploration.subTitle')}
          <ExternalLink
            className={styles.docExternalLink}
            hasIcon
            href={`${EnvVariables.configFor(
              'CQDG_DOCUMENTATION',
            )}/docs/fonctionnalités-générales-du-portail${getDocLang()}`}
          >
            {intl.get('layout.main.menu.documentation')}
          </ExternalLink>
        </Text>
      </div>
      <QueryBuilder
        id={DATA_EXPLORATION_QB_ID}
        className="data-exploration-repo__query-builder"
        headerConfig={{
          showHeader: true,
          showTools: true,
          defaultTitle: intl.get('components.querybuilder.defaultTitle'),
          options: {
            enableEditTitle: true,
            enableDuplicate: true,
            enableFavoriteFilter: false,
            enableShare: true,
            enableUndoChanges: true,
          },
          selectedSavedFilter: selectedSavedFilter,
          savedFilters: savedFilterList,
          onShareFilter: handleOnShareFilter,
          onUpdateFilter: handleOnUpdateFilter,
          onSaveFilter: handleOnSaveFilter,
          onDeleteFilter: handleOnDeleteFilter,
          onSetAsFavorite: handleOnSaveAsFavorite,
        }}
        facetFilterConfig={{
          enable: true,
          onFacetClick: (filter) => {
            const index = filter.content.index!;
            const field = filter.content.field;
            const { sqon, mapping } = getSqonAndMappingByIndex(index as INDEXES);
            setSelectedFilterContent(
              <GenericFilters
                queryBuilderId={DATA_EXPLORATION_QB_ID}
                index={index}
                field={dotToUnderscore(field)}
                sqon={sqon}
                extendedMappingResults={mapping}
              />,
            );
          },
          selectedFilterContent: selectedFilterContent,
          blacklistedFacets: [
            'participant_id',
            'participant_2_id',
            'sample_id',
            'sample_2_id',
            'file_id',
            'file_2_id',
          ],
        }}
        enableCombine
        enableShowHideLabels
        IconTotal={<UserOutlined size={18} />}
        currentQuery={isEmptySqon(activeQuery) ? {} : activeQuery}
        dictionary={getQueryBuilderDictionary(facetTransResolver, savedSets)}
        getResolvedQueryForCount={(sqon) => resolveSqonForParticipants(queryList, sqon)}
        fetchQueryCount={async (sqon) => {
          const { data } = await WrapperApi.graphqlRequest<{ data: IParticipantResultTree }>({
            query: GET_PARTICIPANTS_COUNT.loc?.source.body,
            variables: {
              sqon: resolveSqonForParticipants(queryList, sqon),
            },
          });

          return data?.data?.Participant.hits.total ?? 0;
        }}
        remoteComponentMapping={(remoteComponent: IRemoteComponent) => {
          dispatch(remoteSliceActions.openRemoteComponent(remoteComponent));
        }}
      />
      <Tabs
        type="card"
        className="navNoMarginBtm"
        activeKey={tabId || TAB_IDS.SUMMARY}
        onChange={(key) => {
          if (!location.pathname.includes(key)) {
            navigate(`${STATIC_ROUTES.DATA_EXPLORATION}/${key}${window.location.search}`);
          }
        }}
        items={items}
      />
    </Space>
  );
};

export default PageContent;
