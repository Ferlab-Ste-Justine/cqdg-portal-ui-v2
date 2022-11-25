import intl from 'react-intl-universal';
import { ExperimentOutlined } from '@ant-design/icons';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { BIOSPECIMEN_SEARCH_BY_ID_QUERY } from 'graphql/biospecimens/queries';
import useBiospecimenResolvedSqon from 'graphql/biospecimens/useBiospecimenResolvedSqon';
import { INDEXES } from 'graphql/constants';

import GlobalSearch, { ICustomSearchProps } from 'components/uiKit/search/GlobalSearch';
import { highlightSearchMatch } from 'components/uiKit/search/GlobalSearch/utils';
import SelectItem from 'components/uiKit/select/SelectItem';
import { uniqBy } from 'utils/array';

const BiospecimenSampleSearch = ({ queryBuilderId }: ICustomSearchProps) => {
  const { sqon } = useBiospecimenResolvedSqon(queryBuilderId);

  return (
    <GlobalSearch<IBiospecimenEntity>
      queryBuilderId={queryBuilderId}
      field="sample_id"
      index={INDEXES.BIOSPECIMEN}
      placeholder={'SR0250715'}
      emptyDescription={intl.get('screen.dataExploration.noBiospecimenSampleFound')}
      query={BIOSPECIMEN_SEARCH_BY_ID_QUERY}
      sqon={sqon}
      optionsFormatter={(options, matchRegex, search) =>
        uniqBy(options, (opt: { sample_id: string }) => opt.sample_id).map((option) => ({
          label: (
            <SelectItem
              icon={<ExperimentOutlined />}
              title={highlightSearchMatch(option.sample_id, matchRegex, search)}
            />
          ),
          value: option.sample_id,
        }))
      }
      title={intl.get('screen.dataExploration.searchByBiospecimenSampleId')}
    />
  );
};

export { BiospecimenSampleSearch };
