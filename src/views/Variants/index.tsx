import intl from 'react-intl-universal';
import { UserOutlined } from '@ant-design/icons';
import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { Spin } from 'antd';
import { INDEXES } from 'graphql/constants';
import { ExtendedMappingResults } from 'graphql/models';
import ParticipantSearch from 'views/DataExploration/components/Searchs/ParticipantSearch';
import TreeFacet from 'views/DataExploration/components/TreeFacet';
import { formatHpoTitleAndCode, formatMondoTitleAndCode } from 'views/DataExploration/utils/helper';
import GenesUploadIds from 'views/Variants/components/GeneUploadIds';
import VariantGeneSearch from 'views/Variants/components/VariantGeneSearch';
import { VARIANT_REPO_QB_ID } from 'views/Variants/utils/constant';
import { SCROLL_WRAPPER_ID } from 'views/Variants/utils/constant';

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

import styles from 'views/Variants/index.module.scss';

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
    customSearches: [<ParticipantSearch key={0} queryBuilderId={VARIANT_REPO_QB_ID} />],
    groups: [
      {
        facets: [
          <TreeFacet
            type={'hpoTree'}
            field={'observed_phenotypes'}
            key={'observed_phenotypes'}
            titleFormatter={formatHpoTitleAndCode}
            queryBuilderId={VARIANT_REPO_QB_ID}
          />,
          <TreeFacet
            type={'mondoTree'}
            field={'mondo'}
            key={'mondo'}
            titleFormatter={formatMondoTitleAndCode}
            queryBuilderId={VARIANT_REPO_QB_ID}
          />,
        ],
      },
    ],
  },
  [FilterTypes.Variant]: {
    customSearches: [
      <VariantGeneSearch
        key="variants"
        type={SuggestionType.VARIANTS}
        queryBuilderId={VARIANT_REPO_QB_ID}
      />,
    ],
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
  [FilterTypes.Gene]: {
    customSearches: [
      <VariantGeneSearch
        key="genes"
        type={SuggestionType.GENES}
        queryBuilderId={VARIANT_REPO_QB_ID}
      />,
      <GenesUploadIds key="genes_upload_ids" queryBuilderId={VARIANT_REPO_QB_ID} />,
    ],
    groups: [
      {
        facets: ['consequences__biotype', 'gene_external_reference'],
      },
      {
        title: intl.get('facets.genePanels'),
        facets: [
          'genes__name',
          'genes__hpo__hpo_term_label',
          'genes__orphanet__panel',
          'genes__omim__name',
          'genes__ddd__disease_name',
          'genes__cosmic__tumour_types_germline',
        ],
      },
    ],
  },
  [FilterTypes.Frequency]: {
    groups: [
      {
        title: intl.get('screen.patientsnv.filter.grouptitle.publiccohorts'),
        facets: [
          'frequencies__gnomad_genomes_2_1__af',
          'frequencies__gnomad_genomes_3_0__af',
          'frequencies__gnomad_genomes_3_1_1__af',
          'frequencies__gnomad_exomes_2_1__af',
          'frequencies__topmed__af',
          'frequencies__one_thousand_genomes__af',
        ],
      },
    ],
  },
  [FilterTypes.Pathogenicity]: {
    groups: [
      {
        facets: ['clinvar__clin_sig', 'consequences__vep_impact'],
      },
      {
        title: 'Prédictions',
        facets: [
          'consequences__predictions__sift_pred',
          'consequences__predictions__polyphen2_hvar_pred',
          'consequences__predictions__fathmm_pred',
          'consequences__predictions__cadd_rankscore',
          'consequences__predictions__dann_rankscore',
          'consequences__predictions__lrt_pred',
          'consequences__predictions__revel_rankscore',
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

const Variants = () => {
  const participantMappingResults = useGetExtendedMappings(INDEXES.PARTICIPANT);
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);

  const menuItems: ISidebarMenuItem[] = [
    {
      key: '1',
      title: intl.get('entities.participant.participant'),
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
      title: intl.get('entities.variant.variant'),
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
      panelContent: FiltersContainer(
        variantMappingResults,
        FilterTypes.Gene,
        INDEXES.VARIANT,
        mapFilterForVariant,
      ),
    },
    {
      key: '4',
      title: intl.get('screen.variants.sidemenu.frequency'),
      icon: <FrequencyIcon className={styles.sideMenuIcon} />,
      panelContent: FiltersContainer(
        variantMappingResults,
        FilterTypes.Frequency,
        INDEXES.VARIANT,
        mapFilterForVariant,
      ),
    },
    {
      key: '5',
      title: intl.get('screen.variants.sidemenu.pathogenicity'),
      icon: <DiseaseIcon className={styles.sideMenuIcon} />,
      panelContent: FiltersContainer(
        variantMappingResults,
        FilterTypes.Pathogenicity,
        INDEXES.VARIANT,
        mapFilterForVariant,
      ),
    },
  ];

  return (
    <div className={styles.variantsLayout}>
      <SidebarMenu className={styles.sideMenu} menuItems={menuItems} />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <PageContent variantMapping={variantMappingResults} />
      </ScrollContent>
    </div>
  );
};

export default Variants;
