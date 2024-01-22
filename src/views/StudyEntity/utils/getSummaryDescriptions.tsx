import intl from 'react-intl-universal';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';
import capitalize from 'lodash/capitalize';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from '../index.module.scss';

const getSummaryDescriptions = (study?: IStudyEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.study.study_code'),
    value: study?.study_code || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.name'),
    value: study?.name || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.domain'),
    value: study?.domain ? (
      <Tag className={styles.tagGold}>{study.domain}</Tag>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.study.population'),
    value: study?.population ? (
      <Tag className={styles.tagCyan}>{study.population}</Tag>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.study.keywords'),
    value: study?.keyword
      ? study.keyword.map((key) => (
          <Tag key={key} className={styles.tag}>
            {key
              ?.split(' ')
              .map((word) => capitalize(word))
              .join(' ')}
          </Tag>
        ))
      : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.description'),
    value:
      study?.description.split('|').map((desc, index) => (
        <div key={index} className={styles.whiteSpace}>
          {desc}
        </div>
      )) || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getSummaryDescriptions;
