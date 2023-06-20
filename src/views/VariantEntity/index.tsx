import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { hydrateResults } from '@ferlab/ui/core/graphql/utils';
import EntityPageWrapper, {
  EntityGeneConsequences,
  EntityPublicCohortTable,
  EntitySummary,
  EntityTable,
  EntityTitle,
} from '@ferlab/ui/core/pages/EntityPage';
import {
  makeClinvarRows,
  makeGenesOrderedRow,
} from '@ferlab/ui/core/pages/EntityPage/utils/pathogenicity';
import { Space, Tag } from 'antd';
import { useVariantEntity } from 'graphql/variants/actions';

import LineStyleIcon from 'components/Icons/LineStyleIcon';
import { getEntityExpandableTableMultiple } from 'utils/translation';

import { getConsequencesProColumn } from './utils/consequences';
import {
  getFrequenciesItems,
  getFrequenciesTableSummaryColumns,
  getPublicCohorts,
} from './utils/frequencies';
import { getClinvarColumns, getGenePhenotypeColumns } from './utils/pathogenicity';
import { getSummaryItems } from './utils/summary';
import SummaryHeader from './SummaryHeader';

import styles from './index.module.scss';

enum SectionId {
  SUMMARY = 'summary',
  CONSEQUENCE = 'consequence',
  FREQUENCIES = 'frequencies',
  PATHOGENICITY = 'pathogenicity',
}

const VariantEntity = () => {
  const { locus } = useParams<{ locus: string }>();

  const links: IAnchorLink[] = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('global.summary') },
    {
      href: `#${SectionId.CONSEQUENCE}`,
      title: intl.get('entities.variant.consequences.consequence'),
    },
    {
      href: `#${SectionId.FREQUENCIES}`,
      title: intl.get('entities.variant.frequencies.frequency'),
    },
    {
      href: `#${SectionId.PATHOGENICITY}`,
      title: intl.get('entities.variant.pathogenicity.pathogenicity'),
    },
  ];

  const { data, loading } = useVariantEntity({
    field: 'locus',
    values: [locus],
  });

  const variantStudies = hydrateResults(data?.studies.hits.edges || []).map(
    (e: any, index: number) => ({
      ...e,
      key: index,
      participant_total_number: data?.participant_total_number || 0,
    }),
  );

  return (
    <EntityPageWrapper
      pageId="variant-entity-page"
      links={links}
      data={data}
      loading={loading}
      emptyText={intl.get('no.data.available')}
    >
      <>
        <EntityTitle
          text={data?.hgvsg}
          icon={<LineStyleIcon className={styles.titleIcon} />}
          loading={loading}
          tag={<Tag className={styles.variantTag}>Germline</Tag>}
        />

        <EntitySummary
          id={SectionId.SUMMARY}
          title={intl.get('global.summary')}
          header={<SummaryHeader variant={data} />}
          data={getSummaryItems(data)}
          loading={loading}
        />

        <EntityGeneConsequences
          id={SectionId.CONSEQUENCE}
          dictionary={getEntityExpandableTableMultiple()}
          loading={loading}
          title={intl.get('entities.variant.consequences.consequence')}
          header={intl.get('entities.variant.consequences.geneConsequences')}
          columns={getConsequencesProColumn()}
          genes={data?.genes.hits.edges}
          consequences={data?.consequences.hits.edges}
        />

        <EntityTable
          id={SectionId.FREQUENCIES}
          columns={getFrequenciesItems()}
          data={variantStudies}
          title={intl.get('entities.variant.frequencies.frequency')}
          header={intl.get('entities.variant.frequencies.frequency')}
          loading={loading}
          summaryColumns={getFrequenciesTableSummaryColumns(data, variantStudies)}
        />

        <EntityPublicCohortTable
          id="EntityPublicCohortTable"
          columns={getPublicCohorts()}
          frequencies={data?.frequencies}
          locus={data?.locus}
          header={intl.get('entities.variant.frequencies.publicCohorts')}
          loading={loading}
          emptyMessage={intl.get('entities.variant.frequencies.noDataAvailable')}
        />

        <EntityTable
          id={SectionId.PATHOGENICITY}
          loading={loading}
          title={intl.get('entities.variant.pathogenicity.pathogenicity')}
          header={
            <Space size={4}>
              {intl.get('entities.variant.pathogenicity.clinVar')}
              {data?.clinvar?.clinvar_id && (
                <ExternalLink
                  hasIcon
                  href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${data?.clinvar.clinvar_id}`}
                  data-cy={`Pathogenicity_ClinVar_${data?.clinvar.clinvar_id}_ExternalLink`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {data?.clinvar?.clinvar_id}
                </ExternalLink>
              )}
            </Space>
          }
          data={makeClinvarRows(data?.clinvar)}
          columns={getClinvarColumns()}
        />

        <EntityTable
          id="genePhenotype"
          loading={loading}
          header={intl.get('entities.variant.genePhenotype')}
          data={makeGenesOrderedRow(data?.genes)}
          columns={getGenePhenotypeColumns()}
        />
      </>
    </EntityPageWrapper>
  );
};

export default VariantEntity;
