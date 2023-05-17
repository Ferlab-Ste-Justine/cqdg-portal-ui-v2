import intl from 'react-intl-universal';
import ExternalLinkIcon from '@ferlab/ui/core/components/ExternalLink/ExternalLinkIcon';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTableMultiple } from '@ferlab/ui/core/pages/EntityPage';
import { EntityTableRedirectLink } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { IParticipantEntity } from 'graphql/participants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import {
  getDataTypeColumns,
  getExperimentalStrategyColumns,
  getFilesDataTypeInfo,
  getFilesInfoByKey,
} from 'views/ParticipantEntity/utils/getFilesColumns';

import { STATIC_ROUTES } from 'utils/routes';

interface IFilesTableProps {
  participant?: IParticipantEntity;
  id: string;
  loading: boolean;
}

const FilesTable = ({ participant, id, loading }: IFilesTableProps) => {
  const files: IFileEntity[] = participant?.files?.hits.edges.map(({ node }) => node) || [];

  const dataTypeInfoData = getFilesDataTypeInfo(files, participant?.participant_id);
  const experimentalStrategyData = getFilesInfoByKey(
    files,
    'experimental_strategy',
    participant?.participant_id,
  );

  return (
    <EntityTableMultiple
      id={id}
      loading={loading}
      title={intl.get('entities.file.datafile')}
      titleExtra={[
        <EntityTableRedirectLink
          key="1"
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          icon={<ExternalLinkIcon width="14" />}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: participant?.participant_id ? [participant.participant_id] : [],
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {intl.get('global.viewInDataExploration')}
        </EntityTableRedirectLink>,
      ]}
      header={intl.get('entities.file.files')}
      total={files.length}
      tables={[
        {
          columns: getDataTypeColumns(files.length),
          data: dataTypeInfoData,
          subTitle: intl.get('entities.file.numberByDataTypes'),
        },
        {
          columns: getExperimentalStrategyColumns(files.length),
          data: experimentalStrategyData,
          subTitle: intl.get('entities.file.numberByExperimentalStrategy'),
        },
      ]}
    />
  );
};
export default FilesTable;
