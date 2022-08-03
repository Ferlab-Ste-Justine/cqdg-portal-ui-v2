import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { Spin } from 'antd';
import { INDEXES } from 'graphql/constants';
import { ExtendedMappingResults } from 'graphql/models';
import ApolloProvider from 'provider/ApolloProvider';
import { GraphqlBackend } from 'provider/types';
import ParticipantSearch from 'views/DataExploration/components/ParticipantSearch';
import TreeFacet from 'views/DataExploration/components/TreeFacet';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { formatHpoTitleAndCode, formatMondoTitleAndCode } from 'views/DataExploration/utils/helper';
import VariantSearch from 'views/Variants/components/VariantSearch';
import { VARIANT_REPO_QB_ID } from 'views/Variants/utils/constants';

import DiseaseIcon from 'components/Icons/DiseaseIcon';
import FrequencyIcon from 'components/Icons/FrequencyIcon';
import GeneIcon from 'components/Icons/GeneIcon';
import LineStyleIcon from 'components/Icons/LineStyleIcon';
import FilterList, { TCustomFilterMapper } from 'components/uiKit/FilterList';
import { FilterInfo } from 'components/uiKit/FilterList/types';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { SuggestionType } from 'services/api/arranger/models';
import { mapFilterForParticipant, mapFilterForVariant } from 'utils/fieldMapper';

import PageContent from './components/PageContent';
import { SCROLL_WRAPPER_ID } from './utils/constants';

import styles from 'views/Variants/index.module.scss';
interface OwnProps {
  tab?: string;
}

enum FilterTypes {
  Participant,
  Variant,
  Gene,
  Frequency,
  Pathogenicity,
}

const filterGroups: {
  [type: string]: FilterInfo;
} = {
  [FilterTypes.Participant]: {
    customSearches: [<ParticipantSearch key={0} queryBuilderId={DATA_EXPLORATION_QB_ID} />],
    groups: [
      {
        facets: [
          <TreeFacet
            type={'mondoTree'}
            field={'mondo'}
            titleFormatter={formatMondoTitleAndCode}
            key={'mondo'}
          />,
          <TreeFacet
            type={'hpoTree'}
            field={'observed_phenotype'}
            titleFormatter={formatHpoTitleAndCode}
            key={'observed_phenotype'}
          />,
          'study',
        ],
      },
    ],
  },
  [FilterTypes.Variant]: {
    customSearches: [<VariantSearch key={0} queryBuilderId={VARIANT_REPO_QB_ID} />],
    groups: [
      {
        facets: [
          'variant_class',
          'consequences__consequences',
          'variant_external_reference',
          'chromosome',
          'zygosity',
          'transmissions',
        ],
      },
    ],
  },
};

const FiltersContainer = (
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
      queryBuilderId={VARIANT_REPO_QB_ID}
      extendedMappingResults={mappingResults}
      filterInfo={filterGroups[type]}
      filterMapper={filterMapper}
    />
  );
};

const Variants = (props: OwnProps) => {
  const { tab } = useParams<{ tab: string }>();
  const participantMappingResults = useGetExtendedMappings(INDEXES.PARTICIPANT);
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);

  const menuItems: ISidebarMenuItem[] = [
    {
      key: '1',
      title: intl.get('screen.variants.sidemenu.participant'),
      icon: <UserOutlined className={styles.sideMenuIcon} />,
      panelContent: FiltersContainer(
        participantMappingResults,
        FilterTypes.Participant,
        INDEXES.PARTICIPANT,
        mapFilterForParticipant,
      ),
    },
    {
      key: '2',
      title: intl.get('screen.variants.sidemenu.variant'),
      icon: <LineStyleIcon className={styles.sideMenuIcon} />,
      panelContent: FiltersContainer(
        variantMappingResults,
        FilterTypes.Variant,
        INDEXES.VARIANT,
        mapFilterForVariant,
      ),
    },
    {
      key: '3',
      title: intl.get('screen.variants.sidemenu.gene'),
      icon: <GeneIcon className={styles.sideMenuIcon} />,
      panelContent: () => {},
    },
    {
      key: '4',
      title: intl.get('screen.variants.sidemenu.frequency'),
      icon: <FrequencyIcon className={styles.sideMenuIcon} />,
      panelContent: () => {},
    },
    {
      key: '5',
      title: intl.get('screen.variants.sidemenu.pathogenicity'),
      icon: <DiseaseIcon className={styles.sideMenuIcon} />,
      panelContent: () => {},
    },
  ];

  return (
    <div className={styles.variantsLayout}>
      <SidebarMenu className={styles.sideMenu} menuItems={menuItems} />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <PageContent
          variantMapping={{
            data: [],
            loading: false,
          }}
          tabId={tab}
        />
      </ScrollContent>
    </div>
  );
};

const VariantWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <Variants {...props} />
  </ApolloProvider>
);

export default VariantWrapper;
