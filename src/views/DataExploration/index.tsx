import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { ExperimentOutlined, FileSearchOutlined, UserOutlined } from '@ant-design/icons';
import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { Spin } from 'antd';
import { INDEXES } from 'graphql/constants';
import { ExtendedMappingResults } from 'graphql/models';
import PageContent from 'views/DataExploration/components/PageContent';
import { BiospecimenSampleSearch } from 'views/DataExploration/components/Searchs/BiospecimenSearch';
import BiospecimenSetSearch from 'views/DataExploration/components/Searchs/BiospecimenSetSearch';
import FileSearch from 'views/DataExploration/components/Searchs/FileSearch';
import FileSetSearch from 'views/DataExploration/components/Searchs/FileSetSearch';
import ParticipantSearch from 'views/DataExploration/components/Searchs/ParticipantSearch';
import ParticipantSetSearch from 'views/DataExploration/components/Searchs/ParticipantSetSearch';
import TreeFacet from 'views/DataExploration/components/TreeFacet';
import BiospecimenUploadIds from 'views/DataExploration/components/UploadIds/BiospecimenUploadIds';
import FileUploadIds from 'views/DataExploration/components/UploadIds/FileUploadIds';
import ParticipantUploadIds from 'views/DataExploration/components/UploadIds/ParticipantUploadIds';
import {
  DATA_EXPLORATION_QB_ID,
  SCROLL_WRAPPER_ID,
  TAB_IDS,
} from 'views/DataExploration/utils/constant';

import FilterList, { TCustomFilterMapper } from 'components/uiKit/FilterList';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import {
  mapFilterForBiospecimen,
  mapFilterForFiles,
  mapFilterForParticipant,
} from 'utils/fieldMapper';

import { formatHpoTitleAndCode, formatMondoTitleAndCode } from './utils/helper';

import styles from './index.module.scss';

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
              'study_id',
              <TreeFacet
                type={'hpoTree'}
                field={'observed_phenotypes'}
                key={'observed_phenotypes'}
                titleFormatter={formatHpoTitleAndCode}
                queryBuilderId={DATA_EXPLORATION_QB_ID}
              />,
              <TreeFacet
                type={'mondoTree'}
                field={'mondo'}
                key={'mondo'}
                titleFormatter={formatMondoTitleAndCode}
                queryBuilderId={DATA_EXPLORATION_QB_ID}
              />,
              'icd_tagged__name',
              'gender',
              'age_at_recruitment',
              'age_at_diagnosis',
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
          <BiospecimenSampleSearch key={1} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
          <BiospecimenSetSearch key={2} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
          <BiospecimenUploadIds key={3} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
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
  const { tab } = useParams<{ tab: string }>();
  const participantMappingResults = useGetExtendedMappings(INDEXES.PARTICIPANT);
  const fileMappingResults = useGetExtendedMappings(INDEXES.FILE);
  const biospecimenMappingResults = useGetExtendedMappings(INDEXES.BIOSPECIMEN);

  const menuItems: ISidebarMenuItem[] = [
    {
      key: TAB_IDS.PARTICIPANTS,
      title: intl.get('screen.dataExploration.sidemenu.participant'),
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
      title: intl.get('screen.dataExploration.sidemenu.biospecimen'),
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
      title: intl.get('screen.dataExploration.sidemenu.datafiles'),
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
      <SidebarMenu className={styles.sideMenu} menuItems={menuItems} />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <PageContent
          fileMapping={fileMappingResults}
          participantMapping={participantMappingResults}
          tabId={tab}
        />
      </ScrollContent>
    </div>
  );
};

export default DataExploration;
