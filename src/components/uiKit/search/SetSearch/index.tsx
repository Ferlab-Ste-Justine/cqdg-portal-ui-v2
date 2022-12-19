import { useEffect, useState } from 'react';
import Empty from '@ferlab/ui/core/components/Empty';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import {
  ISqonGroupFilter,
  MERGE_VALUES_STRATEGIES,
  SET_ID_PREFIX,
} from '@ferlab/ui/core/data/sqon/types';
import { findSqonValueByField } from '@ferlab/ui/core/data/sqon/utils';
import { Select, Tag } from 'antd';
import { INDEXES } from 'graphql/constants';
import intersection from 'lodash/intersection';

import { SetType } from 'services/api/savedSet/models';
import { useSavedSet } from 'store/savedSet';
import { getIdFieldByType } from 'utils/fieldMapper';

import SearchLabel from '../SearchLabel';

import styles from './index.module.scss';

interface OptionsType {
  value: string;
  label: string;
}

const getDefaultValues = (field: string, sqon: ISqonGroupFilter) => {
  const selectedValue = (findSqonValueByField(field, sqon) ?? []).map((value: string) =>
    value.replace(SET_ID_PREFIX, ''),
  );
  return selectedValue;
};

interface ISetSearchProps {
  title: string;
  index: INDEXES;
  queryBuilderId: string;
  type: SetType;
  className?: string;
  tooltipText?: string;
  field?: string;
  sqon: ISqonGroupFilter;
  emptyDescription?: string;
  placeholder?: string;
}

const SetSearch = ({
  title,
  index,
  queryBuilderId,
  type,
  className = '',
  tooltipText,
  sqon,
  emptyDescription = 'You have no sets',
  placeholder = 'Select a saved set',
}: ISetSearchProps) => {
  const { savedSets } = useSavedSet();
  const [values, setValues] = useState<string[]>(getDefaultValues(getIdFieldByType(type), sqon));
  const [options, setOptions] = useState<OptionsType[]>([]);

  const getTypedSets = () => savedSets.filter((set) => set.setType === type);

  const getSetName = (setId: string) => getTypedSets().find(({ id }) => id === setId)?.tag;

  const getOptions = () =>
    getTypedSets().map((set) => ({
      label: set.tag,
      value: set.id,
    }));

  useEffect(() => {
    const selectedValue = (findSqonValueByField(getIdFieldByType(type), sqon) ?? []).map(
      (value: string) => value.replace(SET_ID_PREFIX, ''),
    );

    setValues(
      intersection(
        selectedValue,
        getTypedSets().map(({ id }) => id),
      ),
    );
    setOptions(getOptions());
    // eslint-disable-next-line
  }, [JSON.stringify(sqon), JSON.stringify(savedSets)]);

  return (
    <div className={`${styles.container} ${className}`}>
      <SearchLabel title={title} tooltipText={tooltipText} />
      <Select
        className={styles.search}
        allowClear
        filterOption={(input, option) =>
          option ? option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
        }
        placeholder={placeholder}
        mode="multiple"
        maxTagCount={1}
        value={values}
        options={options}
        onChange={(values: string[]) => {
          setValues(values);
          updateActiveQueryField({
            queryBuilderId,
            field: getIdFieldByType(type),
            value: values.map((value) => `${SET_ID_PREFIX}${value}`),
            index,
            merge_strategy: MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES,
          });
        }}
        notFoundContent={<Empty size="mini" showImage={false} description={emptyDescription} />}
        getPopupContainer={(trigger) => trigger.parentElement!}
        tagRender={({ onClose, value }) => (
          <Tag className={styles.tag} closable onClose={onClose} style={{ marginRight: 3 }}>
            {getSetName(value)}
          </Tag>
        )}
      />
    </div>
  );
};

export default SetSearch;
