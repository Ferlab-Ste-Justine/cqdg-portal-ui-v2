import intl from 'react-intl-universal';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tooltip } from 'antd';
import { IFileEntity } from 'graphql/files/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import ExternalDataTypeLink from 'components/utils/ExternalDataTypeLink';

import styles from '../index.module.css';

const getDataTypeDescriptions = (file?: IFileEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.file.category'),
    value: file?.data_category || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: (
      <Tooltip className={styles.tooltip} title={<ExternalDataTypeLink />}>
        {intl.get('entities.file.type')}
      </Tooltip>
    ),
    value: file?.data_type || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getDataTypeDescriptions;
