import intl from 'react-intl-universal';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { IStudyEntity } from 'graphql/studies/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

const getDesignDescriptions = (study?: IStudyEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.study.design'),
    value: TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.collection_period'),
    value: TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.data_source'),
    value: TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.selection_criteria'),
    value: TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.follow_up'),
    value: TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.supplementary_information'),
    value: TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getDesignDescriptions;
