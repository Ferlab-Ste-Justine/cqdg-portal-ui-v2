import intl from 'react-intl-universal';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { IFileEntity } from 'graphql/files/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

const getDataTypeDescriptions = (file?: IFileEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.file.category'),
    value: file?.data_category || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.type'),
    value: file?.data_type || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getDataTypeDescriptions;
