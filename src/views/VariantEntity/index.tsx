import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import { NO_GENE } from '@ferlab/ui/core/components/Consequences/Cell';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { hydrateResults } from '@ferlab/ui/core/graphql/utils';
import EntityPageWrapper, {
  EntityPublicCohortTable,
  EntityTable,
  EntityTitle,
} from '@ferlab/ui/core/pages/EntityPage';
import EntityNestedTable from '@ferlab/ui/core/pages/EntityPage/EntityNestedTable';
import EntityVariantSummary from '@ferlab/ui/core/pages/EntityPage/EntityVariantSummary';
import {
  makeClinvarRows,
  makeGenesOrderedRow,
} from '@ferlab/ui/core/pages/EntityPage/utils/pathogenicity';
import { Space, Tag } from 'antd';
import { useVariantEntity } from 'graphql/variants/actions';

import LineStyleIcon from 'components/Icons/LineStyleIcon';

import { expandedRowRender, getColumn } from './utils/consequence';
import {
  getFrequencyItems,
  getFrequencyTableSummaryColumns,
  getPublicCohorts,
} from './utils/frequency';
import { getClinvarColumns, getGenePhenotypeColumns } from './utils/pathogenicity';
import { getSummaryItems } from './utils/summary';

import styles from './index.module.scss';

enum SectionId {
  SUMMARY = 'summary',
  CONSEQUENCE = 'consequence',
  FREQUENCY = 'frequency',
  PATHOGENICITY = 'pathogenicity',
  CONDITION = 'condition',
}

export default function VariantEntity() {
  const { locus = '' } = useParams<{ locus: string }>();

  const links: IAnchorLink[] = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('global.summary') },
    {
      href: `#${SectionId.CONSEQUENCE}`,
      title: intl.get('entities.variant.consequences.consequence'),
    },
    {
      href: `#${SectionId.FREQUENCY}`,
      title: intl.get('entities.variant.frequencies.frequency'),
    },
    {
      href: `#${SectionId.PATHOGENICITY}`,
      title: intl.get('entities.variant.pathogenicity.pathogenicity'),
    },
    {
      href: `#${SectionId.CONDITION}`,
      title: intl.get('entities.variant.conditions.title'),
    },
  ];

  const { data, loading } = useVariantEntity({
    field: 'locus',
    values: locus ? [locus] : [],
  });

  const geneSymbolOfPicked = data?.genes?.hits?.edges?.find((e) =>
    (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
  )?.node?.symbol;

  const studyFrequencies = (data?.study_frequencies_wgs?.hits?.edges || []).map((edge) => ({
    key: edge.node.study_code,
    ...edge.node,
  }));

  const consequencesData = hydrateResults(data?.genes?.hits?.edges || []).filter(
    (gene) => gene.symbol !== NO_GENE,
  );

  return (
    <EntityPageWrapper
      pageId="variant-entity-page"
      links={links}
      data={data}
      loading={loading}
      emptyText={intl.get('api.noDataAvailable')}
    >
      <>
        <EntityTitle
          text={data?.hgvsg}
          icon={<LineStyleIcon className={styles.titleIcon} />}
          loading={loading}
          tag={
            <>
              <Tag>{data?.assembly_version}</Tag>
              <Tag className={styles.variantTag}>
                {intl.get('entities.variant.pathogenicity.germline')}
              </Tag>
            </>
          }
        />

        <EntityVariantSummary
          id={SectionId.SUMMARY}
          loading={loading}
          data={data ? getSummaryItems(data) : undefined}
          noDataLabel={intl.get('api.noDataAvailable')}
        />

        <EntityNestedTable
          columns={getColumn(geneSymbolOfPicked)}
          data={consequencesData.length ? consequencesData : undefined}
          expandedRowRender={expandedRowRender}
          id={SectionId.CONSEQUENCE}
          loading={loading}
          title={intl.get('entities.variant.consequences.consequence')}
          header={intl.get('entities.variant.consequences.transcripts')}
          noDataLabel={intl.get('api.noDataAvailable')}
        />

        <EntityTable
          id={SectionId.FREQUENCY}
          columns={getFrequencyItems()}
          data={studyFrequencies}
          title={intl.get('entities.variant.frequencies.frequency')}
          header={intl.get('entities.study.CQDGStudies')}
          loading={loading}
          summaryColumns={getFrequencyTableSummaryColumns(data)}
          emptyMessage={intl.get('api.noDataAvailable')}
        />

        <EntityPublicCohortTable
          id="EntityPublicCohortTable"
          columns={getPublicCohorts()}
          frequencies={data?.external_frequencies}
          locus={data?.locus}
          header={intl.get('entities.variant.frequencies.publicCohorts')}
          loading={loading}
          emptyMessage={intl.get('api.noDataAvailable')}
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
          emptyMessage={intl.get('api.noDataAvailable')}
        />

        <EntityTable
          id={SectionId.CONDITION}
          loading={loading}
          title={intl.get('entities.variant.conditions.title')}
          header={intl.get('entities.variant.conditions.tableTitle')}
          data={makeGenesOrderedRow(data?.genes)}
          columns={getGenePhenotypeColumns()}
          emptyMessage={intl.get('api.noDataAvailable')}
        />
      </>
    </EntityPageWrapper>
  );
}
