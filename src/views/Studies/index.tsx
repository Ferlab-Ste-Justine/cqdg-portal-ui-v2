import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { INDEXES } from 'graphql/constants';
import SideBarFacet from 'views/Studies/components/SideBarFacet';
import StudySearch from 'views/Studies/components/StudySearch';

import { FilterInfo } from 'components/uiKit/FilterList/types';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';

import PageContent from './components/PageContent';
import { SCROLL_WRAPPER_ID, STUDIES_EXPLORATION_QB_ID } from './utils/constant';

import styles from './index.module.css';

const Studies = () => {
  const studyMappingResults = useGetExtendedMappings(INDEXES.STUDY);
  const filterInfo: FilterInfo = {
    customSearches: [<StudySearch key={1} queryBuilderId={STUDIES_EXPLORATION_QB_ID} />],
    defaultOpenFacets: [
      'domain',
      'population',
      'data_access_codes__access_limitations',
      'data_access_codes__access_requirements',
    ],
    groups: [
      {
        facets: [
          'domain',
          'population',
          'data_access_codes__access_limitations',
          'data_access_codes__access_requirements',
        ],
      },
    ],
  };

  return (
    <div className={styles.studiesExplorationLayout}>
      <SideBarFacet extendedMappingResults={studyMappingResults} filterInfo={filterInfo} />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <PageContent />
      </ScrollContent>
    </div>
  );
};

export default Studies;
