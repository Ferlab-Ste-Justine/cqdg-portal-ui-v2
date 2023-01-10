import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { Card, Tag } from 'antd';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { IFileEntity } from 'graphql/files/models';
import { ArrangerResultsTree } from 'graphql/models';

// import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatFileSize } from 'utils/formatFileSize';
import { STATIC_ROUTES } from 'utils/routes';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.scss';

const getDefaultColumns = (): ProColumnType<any>[] => [
  {
    key: 'file_id',
    dataIndex: 'file_id',
    title: intl.get('entities.file.file_id'),
    render: (file_id: string) => <Link to={`${STATIC_ROUTES.FILES}/${file_id}`}>{file_id}</Link>,
  },
  {
    key: 'file_name',
    dataIndex: 'file_name',
    title: intl.get('entities.file.file_name'),
    render: (file_name) => file_name,
  },
  {
    key: 'data_type',
    dataIndex: 'data_type',
    title: intl.get('entities.file.data_type'),
    render: (sample_id: string) => sample_id,
  },
  {
    key: 'file_format',
    dataIndex: 'file_format',
    title: intl.get('entities.file.file_format'),
    render: (file_format: string) => <Tag className={styles.tag}>{file_format}</Tag>,
  },
  {
    key: 'file_size',
    dataIndex: 'file_size',
    title: intl.get('entities.file.file_size'),
    render: (file_size) => formatFileSize(file_size, { output: 'string' }),
  },
  {
    key: 'biospecimens.sample_id',
    dataIndex: 'biospecimens',
    title: intl.get('entities.biospecimen.sample_id'),
    render: (biospecimens: ArrangerResultsTree<IBiospecimenEntity>) => (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={biospecimens?.hits?.edges?.map((b) => b?.node?.sample_id) || []}
      />
    ),
  },
];

interface IAnalysisFilesProps {
  file?: IFileEntity;
  loading: boolean;
  id: string;
}

const AnalysisFiles = ({ file, loading, id }: IAnalysisFilesProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  //todo: create query to get files by analysis

  const dataSource: IFileEntity[] = file ? [{ key: file.file_id, ...file }] : [];

  return (
    <div id={id} className={styles.container}>
      <Collapse defaultActiveKey={['1']} className={styles.collapse} arrowIcon="caretFilled">
        <CollapsePanel
          header={intl.get('entities.file.analysisFiles')}
          key="1"
          className={styles.panel}
        >
          <Card loading={loading} className={styles.card}>
            <ProTable
              tableId="file_files_table"
              dataSource={dataSource}
              columns={getDefaultColumns()}
              loading={loading}
              initialColumnState={userInfo?.config.files?.tables?.files?.columns}
              headerConfig={{
                itemCount: {
                  pageIndex: 1,
                  pageSize: 1,
                  total: 1,
                },
                enableTableExport: true,
                // onTableExportClick: () =>
                //   dispatch(
                //     fetchTsvReport({
                //       columnStates: userInfo?.config.files?.tables?.files?.columns,
                //       columns: getDefaultColumns(),
                //       index: INDEXES.BIOSPECIMEN,
                //       sqon: getCurrentSqon(),
                //     }),
                //   ),
                enableColumnSort: true,
                onColumnSortChange: (newState) =>
                  dispatch(
                    updateUserConfig({
                      files: {
                        tables: {
                          files: {
                            columns: newState,
                          },
                        },
                      },
                    }),
                  ),
              }}
              bordered
              size="small"
              dictionary={getProTableDictionary()}
            />
          </Card>
        </CollapsePanel>
      </Collapse>
    </div>
  );
};

export default AnalysisFiles;
