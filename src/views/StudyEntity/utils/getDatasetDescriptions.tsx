import intl from 'react-intl-universal';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { IDataSet } from 'graphql/studies/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from '../index.module.scss';

const getDatasetDescriptions = (dataset?: IDataSet): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.study.description'),
    value: dataset?.description || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.data_type'),
    value: dataset?.data_type?.length
      ? dataset?.data_type.map((data_type) => (
          <Tag key={data_type} className={styles.tag}>
            {data_type}
          </Tag>
        ))
      : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.sequencing_experiment.experimental_strategy'),
    value: dataset?.experimental_strategy?.length
      ? dataset?.experimental_strategy.map((experimental_strategy) => (
          <Tag key={experimental_strategy} className={styles.tag}>
            {experimental_strategy}
          </Tag>
        ))
      : TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getDatasetDescriptions;
