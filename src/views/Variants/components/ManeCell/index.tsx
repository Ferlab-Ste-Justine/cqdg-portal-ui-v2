import intl from 'react-intl-universal';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import CanonicalIcon from '@ferlab/ui/core/components/Icons/CanonicalIcon';
import ManePlusIcon from '@ferlab/ui/core/components/Icons/ManePlusIcon';
import ManeSelectIcon from '@ferlab/ui/core/components/Icons/ManeSelectIcon';
import { Space, Tooltip } from 'antd';
import { IConsequenceEntity } from 'graphql/variants/models';

import styles from './index.module.scss';

interface IManeCellProps {
  consequence: IConsequenceEntity;
}

const ManeCell = ({ consequence }: IManeCellProps) => {
  const { mane_select, canonical, mane_plus } = consequence;
  const haveResult = mane_select || canonical || mane_plus;

  if (!haveResult) return <>{TABLE_EMPTY_PLACE_HOLDER}</>;

  return (
    <Space size={4}>
      {canonical && (
        <Tooltip title={intl.get('entities.variant.canonical')}>
          <>
            <CanonicalIcon className={styles.canonicalIcon} height={16} width={16} />
          </>
        </Tooltip>
      )}
      {mane_select && (
        <Tooltip title={intl.get('entities.variant.maneSelect')}>
          <>
            <ManeSelectIcon className={styles.canonicalIcon} height={16} width={16} />
          </>
        </Tooltip>
      )}
      {mane_plus && (
        <Tooltip title={intl.get('entities.variant.manePlus')}>
          <>
            <ManePlusIcon className={styles.canonicalIcon} height={16} width={16} />
          </>
        </Tooltip>
      )}
    </Space>
  );
};
export default ManeCell;
