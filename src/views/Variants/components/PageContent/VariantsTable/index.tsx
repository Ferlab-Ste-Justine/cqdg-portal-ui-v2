import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
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
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Tooltip } from 'antd';
import cx from 'classnames';
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
} from 'graphql/variants/models';
import { DATA_EXPLORATION_QB_ID, DEFAULT_PAGE_INDEX } from 'views/DataExploration/utils/constant';
import ConsequencesCell from 'views/Variants/components/ConsequencesCell';
import { SCROLL_WRAPPER_ID } from 'views/Variants/utils/constants';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import SetsManagementDropdown from 'components/uiKit/SetsManagementDropdown';
import { SetType } from 'services/api/savedSet/models';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { truncateString } from 'utils/string';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.scss';

const isNumber = (n: number) => n && !Number.isNaN(n);

const getDefaultColumns = (): ProColumnType[] => [
  {
    key: 'hgvsg',
    title: intl.get('entities.variant.variant'),
    dataIndex: 'hgvsg',
    className: cx(styles.variantTableCell, styles.variantTableCellElipsis),
    sorter: {
      multiple: 1,
    },
    render: (hgvsg: string, entity: IVariantEntity) =>
      hgvsg ? (
        <Tooltip placement="topLeft" title={hgvsg}>
          <Link to={`${STATIC_ROUTES.VARIANTS}/${entity?.locus}`}>{hgvsg}</Link>
        </Tooltip>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'variant_class',
    title: intl.get('entities.variant.type'),
    dataIndex: 'variant_class',
    sorter: { multiple: 1 },
    render: (variant_class: string) => variant_class || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'rsnumber',
    title: intl.get('entities.variant.dbsnp'),
    dataIndex: 'rsnumber',
    className: styles.dbSnpTableCell,
    sorter: {
      multiple: 1,
    },
    render: (rsNumber: string) =>
      rsNumber ? (
        <ExternalLink href={`https://www.ncbi.nlm.nih.gov/snp/${rsNumber}`}>
          {rsNumber}
        </ExternalLink>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'consequences',
    title: intl.get('entities.variant.mostDeleteriousConsequence.title'),
    dataIndex: 'genes',
    tooltip: intl.get('entities.variant.mostDeleteriousConsequence.tooltip'),
    render: (genes: IArrangerResultsTree<IGeneEntity>) => {
      const geneWithPickedConsequence = genes?.hits?.edges?.find((e) =>
        (e.node.consequences || [])?.hits?.edges?.some((e) => e.node?.picked),
      )?.node;
      if (!geneWithPickedConsequence) {
        //must never happen or it is a bug
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      const consequences = geneWithPickedConsequence.consequences?.hits?.edges;
      return (
        <ConsequencesCell consequences={consequences} symbol={geneWithPickedConsequence.symbol} />
      );
    },
  },
  {
    key: 'clinvar',
    title: intl.get('entities.variant.pathogenicity.clinVar'),
    dataIndex: 'clinvar',
    className: cx(styles.variantTableCell, styles.variantTableCellElipsis),
    render: (clinVar: IClinVar) =>
      clinVar?.clin_sig && clinVar.clinvar_id ? (
        <Tooltip
          placement="topLeft"
          title={removeUnderscoreAndCapitalize(clinVar.clin_sig.join(', '))}
        >
          <ExternalLink
            href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinVar.clinvar_id}`}
          >
            {truncateString(removeUnderscoreAndCapitalize(clinVar.clin_sig.join(', ')), 29)}
          </ExternalLink>
        </Tooltip>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'gnomad_genomes_3.af',
    title: intl.get('entities.variant.gnomAd'),
    tooltip: intl.get('entities.variant.gnomAdTooltip'),
    dataIndex: 'external_frequencies',
    render: (externalFrequencies: IExternalFrequenciesEntity) =>
      externalFrequencies?.gnomad_genomes_3?.af
        ? toExponentialNotation(externalFrequencies?.gnomad_genomes_3.af)
        : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'studies',
    title: intl.get('entities.study.studies'),
    dataIndex: 'studies',
    render: (studies: IArrangerResultsTree<IVariantStudyEntity>) => {
      const total = studies?.hits?.total ?? 0;
      if (total === 0) {
        return total;
      }

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
    title: intl.get('entities.variant.participant.title'),
    tooltip: intl.get('entities.variant.participant.tooltip'),
    key: 'participant_number',
    render: (variant: IVariantEntity) => {
      const totalNbOfParticipants = variant.internal_frequencies?.total?.pc || 0;
      const studies = variant.studies;
      const participantIds =
        studies?.hits?.edges?.map((study) => study.node.participant_ids || [])?.flat() || [];
      if (participantIds.length < 10) {
        return totalNbOfParticipants;
      }
      return (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          onClick={() => {
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: participantIds,
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            });
          }}
        >
          {numberFormat(totalNbOfParticipants)}
        </Link>
      );
    },
  },
  {
    key: 'internal_frequencies',
    title: intl.get('entities.variant.frequence.title'),
    tooltip: intl.get('entities.variant.frequence.tooltip'),
    dataIndex: 'internal_frequencies',
    render: (internalFrequencies: IVariantInternalFrequencies) =>
      internalFrequencies?.total?.af && isNumber(internalFrequencies.total.af)
        ? toExponentialNotation(internalFrequencies?.total?.af)
        : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    title: intl.get('entities.variant.alt.title'),
    tooltip: intl.get('entities.variant.alt.tooltip'),
    dataIndex: ['internal_frequencies', 'total', 'ac'],
    key: 'ac',
    render: (ac: string) => ac || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    title: intl.get('entities.variant.homozygotes.title'),
    tooltip: intl.get('entities.variant.homozygotes.tooltip'),
    dataIndex: 'internal_frequencies',
    key: 'homozygotes',
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
                      variants: { ...userInfo?.config.variants?.tables?.variants, viewPerQuery },
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
      }
    />
  );
};

export default VariantsTable;
