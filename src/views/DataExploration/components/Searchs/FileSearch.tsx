import intl from 'react-intl-universal';
import { FileTextOutlined } from '@ant-design/icons';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { GET_FILE_BY_ID } from 'graphql/files/queries';

import GlobalSearch, { ICustomSearchProps } from 'components/uiKit/search/GlobalSearch';
import { highlightSearchMatch } from 'components/uiKit/search/GlobalSearch/utils';
import SelectItem from 'components/uiKit/select/SelectItem';

const FileSearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const { activeQuery } = useQueryBuilderState(queryBuilderId);

  return (
    <GlobalSearch<IFileEntity>
      queryBuilderId={queryBuilderId}
      field="file_id"
      index={INDEXES.FILE}
      title={intl.get('components.search.searchByFileId')}
      placeholder={intl.get('components.search.filePlaceholder')}
      emptyDescription={intl.get('components.search.noFileFound')}
      query={GET_FILE_BY_ID}
      sqon={activeQuery as ISqonGroupFilter}
      optionsFormatter={(options, matchRegex, search) =>
        options.map((option) => ({
          label: (
            <SelectItem
              icon={<FileTextOutlined />}
              title={highlightSearchMatch(option.file_id, matchRegex, search)}
            />
          ),
          value: option.file_id,
        }))
      }
    />
  );
};

export default FileSearch;
