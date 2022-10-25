import intl from 'react-intl-universal';
import { Table } from 'antd';
import { IClinVar, IVariantEntity } from 'graphql/variants/models';

import styles from './index.module.scss';

export const getColumnsClinVar = [
  {
    title: () => intl.get('interpretation'),
    dataIndex: 'interpretation',
  },
  {
    title: () => intl.get('condition'),
    dataIndex: 'condition',
    width: '33%',
  },
  {
    title: () => intl.get('inheritance'),
    dataIndex: 'inheritance',
    width: '33%',
  },
];

export const makeClinVarRows = (clinvar?: IClinVar) => {
  if (!clinvar || !clinvar.conditions?.length) {
    return [];
  }
  const inheritance = (clinvar.inheritance || [])[0] || '';
  const interpretation = (clinvar.clin_sig || [])[0] || '';

  return clinvar.conditions.map((condition: string, index: number) => ({
    key: `${index}`,
    inheritance,
    interpretation,
    condition,
  }));
};

interface IStudiesTableProps {
  loading: boolean;
  variant?: IVariantEntity;
}

const ClinvarTable = ({ loading, variant }: IStudiesTableProps) => (
  <Table
    loading={loading}
    dataSource={makeClinVarRows(variant?.clinvar)}
    columns={getColumnsClinVar}
    size="small"
    pagination={false}
    rowClassName={styles.notStriped}
    bordered
  />
);
export default ClinvarTable;
