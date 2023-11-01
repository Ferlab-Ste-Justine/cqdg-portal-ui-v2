import intl from 'react-intl-universal';
import { UserOutlined } from '@ant-design/icons';
import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { INDEXES } from 'graphql/constants';
import GenesUploadIds from 'views/Variants/components/GeneUploadIds';
import VariantGeneSearch from 'views/Variants/components/VariantGeneSearch';
import { VARIANT_REPO_QB_ID } from 'views/Variants/utils/constants';

import DiseaseIcon from 'components/Icons/DiseaseIcon';
import FrequencyIcon from 'components/Icons/FrequencyIcon';
import GeneIcon from 'components/Icons/GeneIcon';
import LineStyleIcon from 'components/Icons/LineStyleIcon';
import FilterList from 'components/uiKit/FilterList';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { SuggestionType } from 'services/api/arranger/models';

import PageContent from './components/PageContent';
import { SCROLL_WRAPPER_ID } from './utils/constants';

import styles from 'views/Variants/index.module.scss';

enum FilterTypes {
  Participant,
  Variant,
  Gene,
  Frequency,
  Pathogenicity,
}

enum FilterKeys {
  PARTICIPANT = 'participant',
  VARIANTS = 'variants',
  GENES = 'genes',
  PATHOGENICITY = 'pathogenicity',
  FREQUENCY = 'frequency',
}

const getFilterGroups = (type: FilterTypes) => {
  switch (type) {
    case FilterTypes.Participant:
      return {
        groups: [
          {
            facets: ['studies__study_code'],
          },
        ],
      };
    case FilterTypes.Variant:
      return {
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
              'genes__consequences__consequence',
              'variant_external_reference',
              'chromosome',
              'studies__transmission',
              'start',
              'studies__zygosity',
            ],
            noDataOption: ['start'],
            intervalDecimal: {
              start: 0,
            },
          },
        ],
      };
    case FilterTypes.Gene:
      return {
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
            facets: [
              'genes__biotype',
              'gene_external_reference',
              'genes__gnomad__pli',
              'genes__gnomad__loeuf',
            ],
            noDataOption: ['genes__gnomad__pli', 'genes__gnomad__loeuf'],
          },
          {
            title: intl.get('entities.variant.panels'),
            facets: [
              'genes__hpo__hpo_term_label',
              'genes__orphanet__panel',
              'genes__omim__name',
              'genes__ddd__disease_name',
              'genes__cosmic__tumour_types_germline',
            ],
            tooltips: [
              'genes__hpo__hpo_term_label',
              'genes__omim__name',
              'genes__ddd__disease_name',
              'genes__cosmic__tumour_types_germline',
            ],
          },
        ],
      };
    case FilterTypes.Pathogenicity:
      return {
        groups: [
          {
            facets: ['clinvar__clin_sig', 'genes__consequences__vep_impact'],
            tooltips: ['genes__consequences__vep_impact'],
          },
          {
            title: intl.get('entities.variant.consequences.predictions.predictions'),
            facets: [
              'genes__consequences__predictions__cadd_score',
              'genes__consequences__predictions__cadd_phred',
              'genes__consequences__predictions__dann_score',
              'genes__consequences__predictions__fathmm_pred',
              'genes__consequences__predictions__lrt_pred',
              'genes__consequences__predictions__polyphen2_hvar_pred',
              'genes__consequences__predictions__revel_score',
              'genes__spliceai__ds',
              'genes__consequences__predictions__sift_pred',
            ],
            tooltips: [
              'genes__consequences__predictions__cadd_score',
              'genes__consequences__predictions__cadd_phred',
              'genes__consequences__predictions__dann_score',
              'genes__consequences__predictions__fathmm_pred',
              'genes__consequences__predictions__lrt_pred',
              'genes__consequences__predictions__polyphen2_hvar_pred',
              'genes__consequences__predictions__revel_score',
              'genes__consequences__predictions__sift_pred',
            ],
            noDataOption: [
              'genes__consequences__predictions__cadd_score',
              'genes__consequences__predictions__cadd_phred',
              'genes__consequences__predictions__dann_score',
              'genes__consequences__predictions__revel_score',
              'genes__spliceai__ds',
              'genes__consequences__predictions__sift_pred',
            ],
          },
        ],
      };
    case FilterTypes.Frequency:
      return {
        groups: [
          {
            facets: [
              'internal_frequencies_wgs__total__af',
              'external_frequencies__gnomad_genomes_2_1_1__af',
              'external_frequencies__gnomad_genomes_3__af',
              'external_frequencies__gnomad_exomes_2_1_1__af',
              'external_frequencies__topmed_bravo__af',
              'external_frequencies__thousand_genomes__af',
            ],
            noDataOption: [
              'internal_frequencies_wgs__total__af',
              'external_frequencies__gnomad_genomes_2_1_1__af',
              'external_frequencies__gnomad_genomes_3__af',
              'external_frequencies__gnomad_exomes_2_1_1__af',
              'external_frequencies__topmed_bravo__af',
              'external_frequencies__thousand_genomes__af',
            ],
          },
        ],
      };
  }
};

const Variants = () => {
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);
  const menuItems: ISidebarMenuItem[] = [
    {
      key: 'category_participant',
      title: intl.get('screen.variants.sidemenu.participant'),
      icon: <UserOutlined />,
      panelContent: (
        <FilterList
          key={FilterKeys.PARTICIPANT}
          index={INDEXES.VARIANT}
          queryBuilderId={VARIANT_REPO_QB_ID}
          extendedMappingResults={variantMappingResults}
          filterInfo={getFilterGroups(FilterTypes.Participant)}
        />
      ),
    },
    {
      key: 'category_variant',
      title: intl.get('screen.variants.sidemenu.variant'),
      icon: <LineStyleIcon />,
      panelContent: (
        <FilterList
          key={FilterKeys.VARIANTS}
          index={INDEXES.VARIANT}
          queryBuilderId={VARIANT_REPO_QB_ID}
          extendedMappingResults={variantMappingResults}
          filterInfo={getFilterGroups(FilterTypes.Variant)}
        />
      ),
    },
    {
      key: 'category_genomic',
      title: intl.get('screen.variants.sidemenu.gene'),
      icon: <GeneIcon />,
      panelContent: (
        <FilterList
          key={FilterKeys.GENES}
          index={INDEXES.VARIANT}
          queryBuilderId={VARIANT_REPO_QB_ID}
          extendedMappingResults={variantMappingResults}
          filterInfo={getFilterGroups(FilterTypes.Gene)}
        />
      ),
    },
    {
      key: 'category_pathogenicity',
      title: intl.get('screen.variants.sidemenu.pathogenicity'),
      icon: <DiseaseIcon />,
      panelContent: (
        <FilterList
          key={FilterKeys.PATHOGENICITY}
          index={INDEXES.VARIANT}
          queryBuilderId={VARIANT_REPO_QB_ID}
          extendedMappingResults={variantMappingResults}
          filterInfo={getFilterGroups(FilterTypes.Pathogenicity)}
        />
      ),
    },
    {
      key: 'category_cohort',
      title: intl.get('screen.variants.sidemenu.frequency'),
      icon: <FrequencyIcon />,
      panelContent: (
        <FilterList
          key={FilterKeys.FREQUENCY}
          index={INDEXES.VARIANT}
          queryBuilderId={VARIANT_REPO_QB_ID}
          extendedMappingResults={variantMappingResults}
          filterInfo={getFilterGroups(FilterTypes.Frequency)}
        />
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
