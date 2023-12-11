import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import EntityPageWrapper, {
  EntitySummary,
  EntityTable,
  EntityTitle,
} from '@ferlab/ui/core/pages/EntityPage';
import { makeClinvarRows } from '@ferlab/ui/core/pages/EntityPage/utils/pathogenicity';
import { Space, Tag } from 'antd';
import { useVariantEntity } from 'graphql/variants/actions';

import LineStyleIcon from 'components/Icons/LineStyleIcon';
import { getEntityExpandableTableMultiple } from 'utils/translation';

import EntityGeneConsequences from './FerlabComponent/EntityGeneConsequence';
import EntityPublicCohortTable from './FerlabComponent/EntityPublicCohortTable';
import { makeGenesOrderedRow } from './FerlabComponent/Pathogenecity.utils';
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

  const variantStudies = (data?.studies?.hits.edges || []).map((e) => ({
    ...e.node,
    key: e.node.study_code,
  }));

  return (
    <EntityPageWrapper
      pageId="variant-entity-page"
      links={links}
      data={data}
      loading={loading}
      emptyText={intl.get('api.noData')}
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
          genes={data?.genes?.hits?.edges}
        />

        <EntityTable
          id={SectionId.FREQUENCIES}
          columns={getFrequenciesItems()}
          data={variantStudies}
          title={intl.get('entities.variant.frequencies.frequency')}
          header={intl.get('entities.study.CQDGStudies')}
          loading={loading}
          summaryColumns={getFrequenciesTableSummaryColumns(data)}
          emptyMessage={intl.get('api.noData')}
        />

        <EntityPublicCohortTable
          id="EntityPublicCohortTable"
          columns={getPublicCohorts()}
          frequencies={data?.external_frequencies}
          locus={data?.locus}
          header={intl.get('entities.variant.frequencies.publicCohorts')}
          loading={loading}
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
          emptyMessage={intl.get('api.noData')}
        />

        <EntityTable
          id="genePhenotype"
          loading={loading}
          header={intl.get('entities.variant.genePhenotype')}
          data={makeGenesOrderedRow(data?.genes)}
          columns={getGenePhenotypeColumns()}
          emptyMessage={intl.get('api.noData')}
        />
      </>
    </EntityPageWrapper>
  );
};

export default VariantEntity;
