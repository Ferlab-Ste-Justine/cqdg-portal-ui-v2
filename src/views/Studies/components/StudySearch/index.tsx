import intl from 'react-intl-universal';
import { ReadOutlined } from '@ant-design/icons';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { INDEXES } from 'graphql/constants';
import { IStudyEntity } from 'graphql/studies/models';
import { SEARCH_STUDIES_BY_ID_AND_NAME_QUERY } from 'graphql/studies/queries';

import GlobalSearch, { ICustomSearchProps } from 'components/uiKit/search/GlobalSearch';
import { highlightSearchMatch } from 'components/uiKit/search/GlobalSearch/utils';
import SelectItem from 'components/uiKit/select/SelectItem';

const StudySearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const { activeQuery } = useQueryBuilderState(queryBuilderId);

  return (
    <GlobalSearch<IStudyEntity>
      queryBuilderId={queryBuilderId}
      searchFields={['study_code', 'name', 'domain', 'description', 'keyword']}
      field="study_code"
      tooltipText={intl.get('global.search.study.tooltip')}
      index={INDEXES.STUDY}
      placeholder={intl.get(`global.search.study.placeholder`)}
      emptyDescription={intl.get(`global.search.study.emptyText`)}
      query={SEARCH_STUDIES_BY_ID_AND_NAME_QUERY}
      sqon={activeQuery as ISqonGroupFilter}
      optionsFormatter={(options, matchRegex, search) =>
        options.map((option) => ({
          label: (
            <SelectItem
              icon={<ReadOutlined />}
              title={highlightSearchMatch(option.study_code, matchRegex, search)}
              caption={highlightSearchMatch(option.name, matchRegex, search)}
              isTooltip
            />
          ),
          value: option.study_code,
        }))
      }
      title={intl.get(`global.search.study.title`)}
    />
  );
};

export default StudySearch;
