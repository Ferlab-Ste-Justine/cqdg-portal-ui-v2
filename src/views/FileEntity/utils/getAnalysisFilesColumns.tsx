import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { Tag } from 'antd';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { ArrangerResultsTree } from 'graphql/models';
import { pageId } from 'views/FileEntity/index';

import { formatFileSize } from 'utils/formatFileSize';
import { STATIC_ROUTES } from 'utils/routes';

import styles from 'views/FileEntity/index.module.scss';

const getAnalysisFilesColumns = (): ProColumnType<any>[] => [
  {
    key: 'file_id',
    dataIndex: 'file_id',
    title: intl.get('entities.file.file'),
    render: (file_id: string) => (
      <Link
        to={`${STATIC_ROUTES.FILES}/${file_id}`}
        onClick={() => document.getElementById(pageId)?.scrollTo(0, 0)}
      >
        {file_id}
      </Link>
    ),
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
    title: intl.get('entities.file.type'),
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

export default getAnalysisFilesColumns;
