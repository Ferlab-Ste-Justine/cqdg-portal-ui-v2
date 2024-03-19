import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { blue } from '@ant-design/colors';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Progress } from 'antd';
import { INDEXES } from 'graphql/constants';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import ExternalDataTypeLink from 'components/utils/ExternalDataTypeLink';
import { STATIC_ROUTES } from 'utils/routes';

interface IFileInfoByType {
  key: string;
  value: string;
  nb_files: number;
  proportion_of_files: number;
}

export const getExperimentalStrategyColumns = (
  files_nb: number,
  study_code: string,
): ProColumnType<any>[] => [
  {
    key: 'value',
    dataIndex: 'value',
    title: intl.get('entities.file.strategy'),
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
                    field: 'study_code',
                    value: [study_code],
                    index: INDEXES.STUDY,
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
    tooltip: intl.get('entities.file.nTooltipFile'),
    render: (percent: number) => (
      <Progress percent={percent} showInfo={false} strokeColor={blue[5]} />
    ),
  },
];

export const getDataTypeColumns = (files_nb: number, study_code: string): ProColumnType<any>[] => [
  {
    key: 'value',
    dataIndex: 'value',
    title: intl.get('entities.file.data_type'),
    tooltip: <ExternalDataTypeLink />,
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
                    field: 'study_code',
                    value: [study_code],
                    index: INDEXES.STUDY,
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
    tooltip: intl.get('entities.file.nTooltipFile'),
    render: (percent: number) => (
      <Progress percent={percent} showInfo={false} strokeColor={blue[5]} />
    ),
  },
];
