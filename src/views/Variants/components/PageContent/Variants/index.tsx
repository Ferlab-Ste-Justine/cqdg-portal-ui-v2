import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { useFilters } from '@ferlab/ui/core/data/filters/utils';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Tooltip } from 'antd';
import cx from 'classnames';
import { IQueryResults } from 'graphql/models';
import {
  IClinVar,
  ITableVariantEntity,
  IVariantConsequenceNode,
  IVariantEntity,
  IVariantFrequencies,
} from 'graphql/variants/models';
import ConsequencesCell from 'views/Variants/components/ConsequencesCell';
import { DEFAULT_PAGE_SIZE, SCROLL_WRAPPER_ID } from 'views/Variants/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { IQueryConfig, TQueryConfigCb } from 'common/searchPageTypes';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.scss';

interface OwnProps {
  results: IQueryResults<IVariantEntity[]>;
  setQueryConfig: TQueryConfigCb;
  queryConfig: IQueryConfig;
  sqon?: ISqonGroupFilter;
}

const defaultColumns: ProColumnType<any>[] = [
  {
    title: intl.get('screen.variants.table.variant'),
    key: 'hgvsg',
    dataIndex: 'hgvsg',
    className: cx(styles.variantTableCell, styles.variantTableCellElipsis),
    fixed: 'left',
    render: (hgvsg: string, entity: IVariantEntity) =>
      hgvsg ? (
        <Tooltip placement="topLeft" title={hgvsg}>
          <Link to={`${STATIC_ROUTES.VARIANTS}/${entity.locus}`}>{hgvsg}</Link>
        </Tooltip>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'variant_class',
    title: intl.get('screen.variants.table.type'),
    dataIndex: 'variant_class',
    sorter: {
      multiple: 1,
    },
  },
  {
    key: 'rsnumber',
    title: intl.get('screen.variants.table.dbsnp'),
    dataIndex: 'rsnumber',
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
    title: intl.get('screen.variants.table.consequences'),
    dataIndex: 'consequences',
    width: 300,
    render: (consequences: { hits: { edges: IVariantConsequenceNode[] } }) => (
      <ConsequencesCell consequences={consequences?.hits?.edges || []} />
    ),
  },
  {
    key: 'clinvar',
    title: intl.get('screen.variants.table.clinvar'),
    dataIndex: 'clinvar',
    className: cx(styles.variantTableCell, styles.variantTableCellElipsis),
    render: (clinVar: IClinVar) =>
      clinVar?.clin_sig && clinVar.clinvar_id ? (
        <ExternalLink href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinVar.clinvar_id}`}>
          {clinVar.clin_sig.join(', ')}
        </ExternalLink>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'external_frequencies',
    title: intl.get('screen.variants.table.gnomAd'),
    dataIndex: 'frequencies',
    render: (frequencies: IVariantFrequencies) =>
      frequencies?.gnomad_genomes_3_1_1?.af?.toExponential(3) || TABLE_EMPTY_PLACE_HOLDER,
  },
];

const VariantsTab = ({ results, setQueryConfig, queryConfig }: OwnProps) => {
  const { filters }: { filters: ISyntheticSqon } = useFilters();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys([]);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(filters)]);

  return (
    <ProTable<ITableVariantEntity>
      tableId="variants_table"
      columns={defaultColumns}
      initialColumnState={userInfo?.config.variants?.tables?.variants?.columns}
      wrapperClassName={styles.variantTabWrapper}
      loading={results.loading}
      enableRowSelection={true}
      initialSelectedKey={selectedKeys}
      showSorterTooltip={false}
      onChange={({ current, pageSize }, _, sorter) =>
        setQueryConfig({
          pageIndex: current!,
          size: pageSize!,
          sort: formatQuerySortList(sorter),
        })
      }
      headerConfig={{
        itemCount: {
          pageIndex: queryConfig.pageIndex,
          pageSize: queryConfig.size,
          total: results.total,
        },
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              variants: {
                tables: {
                  variants: {
                    columns: newState,
                  },
                },
              },
            }),
          ),
      }}
      bordered
      size="small"
      pagination={{
        current: queryConfig.pageIndex,
        pageSize: queryConfig.size,
        defaultPageSize: DEFAULT_PAGE_SIZE,
        total: results.total,
        onChange: () => scrollToTop(SCROLL_WRAPPER_ID),
      }}
      dataSource={results.data.map((i) => ({ ...i, key: i.id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default VariantsTab;
