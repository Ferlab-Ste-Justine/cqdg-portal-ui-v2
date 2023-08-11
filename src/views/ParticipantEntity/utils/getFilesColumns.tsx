import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { blue } from '@ant-design/colors';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Progress } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';

interface IFileInfoByType {
  key: string;
  value: string;
  nb_files: number;
  proportion_of_files: number;
  participant_id: string;
}

/** Join files by data_type */
export const getFilesDataTypeInfo = (files: IFileEntity[], participant_id?: string) => {
  const filesInfosData: IFileInfoByType[] = [];
  for (const file of files) {
    const filesFound = files.filter(({ data_type }) => data_type === file.data_type);
    if (!filesInfosData.find((f) => f.value === file.data_type)) {
      filesInfosData.push({
        key: file.data_type,
        value: file.data_type,
        nb_files: filesFound.length,
        proportion_of_files: (filesFound.length / files.length) * 100,
        participant_id: participant_id || '',
      });
    }
  }
  return filesInfosData;
};

/** Join files by sequencing_experiment key (ex: experimental_strategy) */
export const getFilesInfoByKey = (files: IFileEntity[], key: string, participant_id?: string) => {
  const filesInfosData: IFileInfoByType[] = [];
  for (const file of files) {
    // @ts-ignore
    const valueOfKey: string = file.sequencing_experiment[key];
    const filesFound = files.filter(
      // @ts-ignore
      ({ sequencing_experiment }) => sequencing_experiment[key] === valueOfKey,
    );
    if (!filesInfosData.find((file) => file.value === valueOfKey)) {
      filesInfosData.push({
        key: valueOfKey,
        value: valueOfKey,
        nb_files: filesFound.length,
        proportion_of_files: (filesFound.length / files.length) * 100,
        participant_id: participant_id || '',
      });
    }
  }
  return filesInfosData;
};

export const getExperimentalStrategyColumns = (files_nb: number): ProColumnType<any>[] => [
  {
    key: 'value',
    dataIndex: 'value',
    title: intl.get('entities.file.sequencing_experiment.experimental_strategy'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_files',
    title: intl.get('entities.file.files'),
    render: (filesInfo: IFileInfoByType) =>
      (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: [filesInfo.participant_id],
                    index: INDEXES.PARTICIPANT,
                  }),
                  generateValueFilter({
                    field: 'sequencing_experiment.experimental_strategy',
                    value: [filesInfo.value],
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {filesInfo.nb_files}
        </Link>
      ) || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'proportion_of_files',
    dataIndex: 'proportion_of_files',
    title: intl.get('entities.file.n=2', { count: files_nb }),
    tooltip: intl.get('entities.file.nTooltipParticipant'),
    render: (percent: number) => (
      <Progress percent={percent} showInfo={false} strokeColor={blue[5]} />
    ),
  },
];

export const getDataTypeColumns = (files_nb: number): ProColumnType<any>[] => [
  {
    key: 'value',
    dataIndex: 'value',
    title: intl.get('entities.file.data_type'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_files',
    title: intl.get('entities.file.files'),
    render: (filesInfo: IFileInfoByType) =>
      (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: [filesInfo.participant_id],
                    index: INDEXES.PARTICIPANT,
                  }),
                  generateValueFilter({
                    field: 'data_type',
                    value: [filesInfo.value],
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {filesInfo.nb_files}
        </Link>
      ) || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'proportion_of_files',
    dataIndex: 'proportion_of_files',
    title: intl.get('entities.file.n=2', { count: files_nb }),
    tooltip: intl.get('entities.file.nTooltipParticipant'),
    render: (percent: number) => (
      <Progress percent={percent} showInfo={false} strokeColor={blue[5]} />
    ),
  },
];
