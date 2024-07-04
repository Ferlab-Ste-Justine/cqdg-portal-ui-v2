import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ConsequencesCell from '@ferlab/ui/core/components/Consequences/Cell';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import FixedSizeTable from '@ferlab/ui/core/components/FixedSizeTable';
import GeneCell from '@ferlab/ui/core/components/Gene/Cell';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { useFilters } from '@ferlab/ui/core/data/filters/utils';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import {
  IArrangerResultsTree,
  IQueryConfig,
  IQueryResults,
  TQueryConfigCb,
} from '@ferlab/ui/core/graphql/types';
import { numberFormat, toExponentialNotation } from '@ferlab/ui/core/utils/numberUtils';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Space, Tag, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { hydrateResults } from 'graphql/models';
import {
  IClinVar,
  IExternalFrequenciesEntity,
  IGeneEntity,
  ITableVariantEntity,
  IVariantEntity,
  IVariantInternalFrequencies,
  IVariantStudyEntity,
  Sources,
} from 'graphql/variants/models';
import capitalize from 'lodash/capitalize';
import { DATA_EXPLORATION_QB_ID, DEFAULT_PAGE_INDEX } from 'views/DataExploration/utils/constant';
import ManeCell from 'views/Variants/components/ManeCell';
import { SCROLL_WRAPPER_ID, VARIANT_REPO_QB_ID } from 'views/Variants/utils/constants';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import SetsManagementDropdown from 'components/uiKit/SetsManagementDropdown';
import { SetType } from 'services/api/savedSet/models';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import { GnomadCircle, renderClinvar, renderOmim } from './utils';

import styles from './index.module.scss';

const isNumber = (n: number) => n && !Number.isNaN(n);

export const getSourceTagColor = (value: string) => {
  switch (value) {
    case Sources.WGS:
      return 'purple';
    case Sources.WXS:
      return 'orange';
    default:
      return '';
  }
};

const getDefaultColumns = (): ProColumnType[] => [
  {
    key: 'hgvsg',
    title: intl.get('entities.variant.variant'),
    dataIndex: 'hgvsg',
    sorter: { multiple: 1 },
    fixed: 'left',
    width: 150,
    render: (hgvsg: string, entity: IVariantEntity) =>
      hgvsg ? (
        /** need a div there to keep the shadow effect when fixed */
        <div className={styles.fixedVariantTableCellElipsis}>
          <Tooltip placement="topLeft" title={hgvsg}>
            <Link to={`${STATIC_ROUTES.VARIANTS}/${entity?.locus}`}>{hgvsg}</Link>
          </Tooltip>
        </div>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'variant_class',
    title: intl.get('entities.variant.type'),
    dataIndex: 'variant_class',
    sorter: { multiple: 1 },
    width: 65,
    render: (variant_class: string) => {
      const type = variant_class?.toLowerCase() || null;
      return (
        <Tooltip
          className={styles.tooltip}
          title={
            intl.get(`entities.variant.typeAbrvTooltip.${type}`) || capitalize(type || undefined)
          }
        >
          {intl.get(`entities.variant.typeAbrv.${type}`) || capitalize(type || undefined)}
        </Tooltip>
      );
    },
  },
  {
    key: 'sources',
    title: intl.get('entities.variant.sources'),
    dataIndex: 'sources',
    align: 'center',
    width: 80,
    render: (sources: string[]) =>
      sources ? (
        <>
          {sources.map((value) => (
            <Tag color={getSourceTagColor(value)} key={value}>
              {value || TABLE_EMPTY_PLACE_HOLDER}
            </Tag>
          ))}
        </>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'rsnumber',
    title: intl.get('entities.variant.dbsnp'),
    dataIndex: 'rsnumber',
    className: styles.dbSnpTableCell,
    width: 65,
    render: (rsNumber: string) =>
      rsNumber ? (
        <ExternalLink href={`https://www.ncbi.nlm.nih.gov/snp/${rsNumber}`}>
          <ExternalLinkIcon />
        </ExternalLink>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    title: intl.get('entities.variant.gene'),
    key: 'genes',
    dataIndex: 'genes',
    width: 100,
    render: (genes: IArrangerResultsTree<IGeneEntity>) => {
      const geneWithPickedConsequence = genes?.hits?.edges?.find((e) =>
        (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
      )?.node;
      if (!geneWithPickedConsequence) return TABLE_EMPTY_PLACE_HOLDER;
      const geneSymbol = geneWithPickedConsequence.symbol;
      const geneInfo = genes.hits.edges.find(({ node }) => node.symbol === geneSymbol);
      return (
        <GeneCell
          queryBuilderId={VARIANT_REPO_QB_ID}
          queryValue={geneSymbol}
          queryIndex={INDEXES.VARIANT}
          symbol={geneSymbol}
          omimGeneId={geneInfo?.node.omim_gene_id}
        />
      );
    },
  },
  {
    key: 'consequences',
    title: intl.get('entities.variant.mostDeleteriousConsequence.title'),
    dataIndex: 'genes',
    tooltip: intl.get('entities.variant.mostDeleteriousConsequence.tooltip'),
    width: 180,
    render: (genes: IArrangerResultsTree<IGeneEntity>) => {
      const geneWithPickedConsequence = genes?.hits?.edges?.find((e) =>
        (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
      )?.node;
      if (!geneWithPickedConsequence) return TABLE_EMPTY_PLACE_HOLDER;
      const consequences = geneWithPickedConsequence.consequences?.hits?.edges;
      return (
        <ConsequencesCell
          consequences={consequences}
          emptyText={intl.get('api.noDataAvailable')}
          layoutClassName={styles.csqCellLayout}
          symbol={geneWithPickedConsequence.symbol}
          withoutSymbol
        />
      );
    },
  },
  {
    key: 'MANE',
    title: intl.get('entities.variant.mane'),
    dataIndex: 'genes',
    width: 80,
    render: (genes: IArrangerResultsTree<IGeneEntity>) => {
      const geneWithPickedConsequence = genes?.hits?.edges?.find((e) =>
        (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
      )?.node;
      if (!geneWithPickedConsequence) return TABLE_EMPTY_PLACE_HOLDER;
      const pickedConsequence = geneWithPickedConsequence.consequences?.hits?.edges?.find(
        (c) => c.node.picked,
      );
      return pickedConsequence ? (
        <ManeCell consequence={pickedConsequence.node} />
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      );
    },
  },
  {
    key: 'omim',
    title: intl.get('entities.variant.consequences.omim'),
    tooltip: intl.get('entities.variant.consequences.omimTooltip'),
    dataIndex: 'genes',
    width: 95,
    render: (genes: IArrangerResultsTree<IGeneEntity>) => {
      const geneWithPickedConsequence = genes?.hits?.edges?.find((e) =>
        (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
      )?.node;
      if (!geneWithPickedConsequence) return TABLE_EMPTY_PLACE_HOLDER;
      return renderOmim(genes, geneWithPickedConsequence.symbol);
    },
  },
  {
    key: 'clinvar',
    title: intl.get('entities.variant.pathogenicity.clinVar'),
    dataIndex: 'clinvar',
    width: 95,
    render: (clinVar: IClinVar) => renderClinvar(clinVar),
  },
  {
    key: 'external_frequencies.gnomad_genomes_3.af',
    title: intl.get('entities.variant.gnomAD'),
    tooltip: intl.get('entities.variant.gnomADTooltip'),
    dataIndex: 'external_frequencies',
    sorter: { multiple: 1 },
    width: 90,
    render: (externalFrequencies: IExternalFrequenciesEntity) => {
      const af = externalFrequencies?.gnomad_genomes_3?.af;
      if (!af) return TABLE_EMPTY_PLACE_HOLDER;
      return (
        <Space direction="horizontal">
          <GnomadCircle underOnePercent={af < 0.01} />
          <span>{toExponentialNotation(af)}</span>
        </Space>
      );
    },
  },
  {
    key: 'external_frequencies.gnomad_genomes_3.ac',
    title: intl.get('entities.variant.gnomADAlt'),
    tooltip: intl.get('entities.variant.gnomADAltTooltip'),
    dataIndex: 'external_frequencies',
    sorter: { multiple: 1 },
    width: 90,
    render: (externalFrequencies: IExternalFrequenciesEntity) =>
      externalFrequencies?.gnomad_genomes_3?.ac
        ? numberFormat(externalFrequencies?.gnomad_genomes_3?.ac)
        : externalFrequencies?.gnomad_genomes_3?.ac === 0
        ? 0
        : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'internal_frequencies_wgs.total.pc',
    title: intl.get('entities.variant.frequencies.part'),
    tooltip: intl.get('entities.variant.frequencies.participantsTooltip'),
    dataIndex: 'internal_frequencies_wgs',
    sorter: { multiple: 1 },
    width: 60,
    render: (internalFrequencies: IVariantInternalFrequencies) => (
      <>
        {internalFrequencies?.total?.pc || 0}
        {internalFrequencies?.total?.pf && isNumber(internalFrequencies.total.pf) && (
          <span className={styles.partCell}>
            ({toExponentialNotation(internalFrequencies.total.pf)})
          </span>
        )}
      </>
    ),
  },
  {
    key: 'studies',
    title: intl.get('entities.study.studies'),
    tooltip: intl.get('entities.variant.studiesTooltip'),
    dataIndex: 'studies',
    width: 80,
    render: (studies: IArrangerResultsTree<IVariantStudyEntity>) => {
      const total = studies?.hits?.total ?? 0;
      if (total === 0) return total;
      const ids = hydrateResults(studies?.hits?.edges || []).map(
        (node: IVariantStudyEntity) => node.study_code,
      );
      return (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          onClick={() => {
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study_code',
                    value: ids,
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            });
          }}
        >
          {numberFormat(total)}
        </Link>
      );
    },
  },
  {
    key: 'internal_frequencies_wgs.total.af',
    title: intl.get('entities.variant.frequencies.freq'),
    tooltip: intl.get('entities.variant.frequencies.freqTooltip'),
    dataIndex: 'internal_frequencies_wgs',
    sorter: { multiple: 1 },
    defaultHidden: true,
    width: 60,
    render: (internalFrequencies: IVariantInternalFrequencies) =>
      internalFrequencies?.total?.af
        ? toExponentialNotation(internalFrequencies.total.af)
        : internalFrequencies?.total?.af === 0
        ? 0
        : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'CADD',
    title: intl.get('entities.variant.consequences.predictions.cadd'),
    tooltip: intl.get('entities.variant.consequences.predictions.caddTooltip'),
    dataIndex: 'genes',
    defaultHidden: true,
    width: 90,
    render: (genes: IArrangerResultsTree<IGeneEntity>) => {
      const geneWithPickedConsequence = genes?.hits?.edges?.find((e) =>
        (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
      )?.node;
      if (!geneWithPickedConsequence) return TABLE_EMPTY_PLACE_HOLDER;
      const pickedConsequence = geneWithPickedConsequence.consequences?.hits?.edges?.find(
        (c) => c.node.picked,
      );
      return pickedConsequence?.node?.predictions?.cadd_phred
        ? pickedConsequence.node.predictions.cadd_phred
        : TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'REVEL',
    title: intl.get('entities.variant.consequences.predictions.revel'),
    dataIndex: 'genes',
    defaultHidden: true,
    width: 90,
    render: (genes: IArrangerResultsTree<IGeneEntity>) => {
      const geneWithPickedConsequence = genes?.hits?.edges?.find((e) =>
        (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
      )?.node;
      if (!geneWithPickedConsequence) return TABLE_EMPTY_PLACE_HOLDER;
      const pickedConsequence = geneWithPickedConsequence.consequences?.hits?.edges?.find(
        (c) => c.node.picked,
      );
      return pickedConsequence?.node?.predictions?.revel_score
        ? pickedConsequence.node.predictions.revel_score
        : TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    title: intl.get('entities.variant.alt.title'),
    tooltip: intl.get('entities.variant.alt.tooltip'),
    dataIndex: 'internal_frequencies_wgs',
    key: 'internal_frequencies_wgs.total.ac',
    defaultHidden: true,
    sorter: { multiple: 1 },
    width: 75,
    render: (internalFrequencies: IVariantInternalFrequencies) =>
      internalFrequencies?.total?.ac || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    title: intl.get('entities.variant.homozygotes.title'),
    tooltip: intl.get('entities.variant.homozygotes.tooltip'),
    dataIndex: 'internal_frequencies_wgs',
    key: 'internal_frequencies_wgs.total.hom',
    defaultHidden: true,
    sorter: { multiple: 1 },
    width: 75,
    render: (internalFrequencies: IVariantInternalFrequencies) =>
      internalFrequencies?.total?.hom ? numberFormat(internalFrequencies.total.hom) : 0,
  },
];

interface IVariantsTableProps {
  pageIndex: number;
  sqon?: ISqonGroupFilter;
  setPageIndex: (value: number) => void;
  results: IQueryResults<IVariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
}

const VariantsTable = ({
  results,
  sqon,
  setQueryConfig,
  queryConfig,
  pageIndex,
  setPageIndex,
}: IVariantsTableProps) => {
  const dispatch = useDispatch();
  const { filters }: { filters: ISyntheticSqon } = useFilters();
  const { userInfo } = useUser();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<IVariantEntity[]>([]);
  const [selectedAllResults, setSelectedAllResults] = useState(false);

  const getCurrentSqon = (): any =>
    selectedAllResults || !selectedKeys.length
      ? sqon
      : generateQuery({
          newFilters: [
            generateValueFilter({
              field: 'locus',
              index: INDEXES.VARIANT,
              value: selectedRows.map((row) => row.locus),
            }),
          ],
        });

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys([]);
      setSelectedRows([]);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(filters)]);

  return (
    <GridCard
      content={
        <FixedSizeTable
          elementId="query-builder-header-tools"
          fixedProTable={(dimension) => (
            <ProTable<ITableVariantEntity>
              tableId="variants_table"
              columns={getDefaultColumns()}
              enableRowSelection
              initialColumnState={userInfo?.config.variants?.tables?.variants?.columns}
              wrapperClassName={styles.variantTabWrapper}
              loading={results.loading}
              initialSelectedKey={selectedKeys}
              showSorterTooltip={false}
              onChange={(_pagination, _filter, sorter) => {
                setPageIndex(DEFAULT_PAGE_INDEX);
                setQueryConfig({
                  pageIndex: DEFAULT_PAGE_INDEX,
                  size: queryConfig.size,
                  sort: formatQuerySortList(sorter),
                } as IQueryConfig);
              }}
              headerConfig={{
                itemCount: {
                  pageIndex: pageIndex,
                  pageSize: queryConfig.size,
                  total: results.total,
                },
                enableColumnSort: true,
                onColumnSortChange: (newState) =>
                  dispatch(
                    updateUserConfig({ variants: { tables: { variants: { columns: newState } } } }),
                  ),
                onSelectAllResultsChange: setSelectedAllResults,
                onSelectedRowsChange: (keys, selectedRows) => {
                  setSelectedKeys(keys);
                  setSelectedRows(selectedRows);
                },
                extra: [
                  <SetsManagementDropdown
                    results={results}
                    selectedKeys={selectedKeys}
                    selectedAllResults={selectedAllResults}
                    sqon={getCurrentSqon()}
                    type={SetType.VARIANT}
                    key="variants-set-management"
                  />,
                ],
              }}
              bordered
              size="small"
              scroll={{ x: dimension.x, y: 'max-content' }}
              pagination={{
                current: pageIndex,
                queryConfig,
                setQueryConfig,
                onChange: (page: number) => {
                  scrollToTop(SCROLL_WRAPPER_ID);
                  setPageIndex(page);
                },
                searchAfter: results.searchAfter,
                onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
                  dispatch(
                    updateUserConfig({
                      variants: {
                        tables: {
                          variants: {
                            ...userInfo?.config.variants?.tables?.variants,
                            viewPerQuery,
                          },
                        },
                      },
                    }),
                  );
                },
                defaultViewPerQuery: queryConfig.size,
              }}
              dataSource={results.data.map((i) => ({ ...i, key: i.id }))}
              dictionary={getProTableDictionary()}
            />
          )}
        />
      }
    />
  );
};

export default VariantsTable;
