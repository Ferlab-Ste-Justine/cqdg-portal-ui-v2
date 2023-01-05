import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ExperimentOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Button, Card, Descriptions, Tag } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { STUDIES_EXPLORATION_QB_ID } from 'views/Studies/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { formatFileSize } from 'utils/formatFileSize';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

interface ISummaryProps {
  file?: IFileEntity;
  loading: boolean;
  id: string;
}

const Summary = ({ file, loading, id }: ISummaryProps) => (
  <div id={id} className={styles.container}>
    <Collapse defaultActiveKey={['1']} className={styles.collapse} arrowIcon="caretFilled">
      <CollapsePanel header={intl.get('entities.file.summary')} key="1" className={styles.panel}>
        <Card loading={loading} className={styles.card}>
          <div className={styles.buttonGroup}>
            <Button className={styles.button} icon={<ReadOutlined />} size="large" block>
              <Link
                className={styles.link}
                to={STATIC_ROUTES.STUDIES}
                onClick={() =>
                  file &&
                  addQuery({
                    queryBuilderId: STUDIES_EXPLORATION_QB_ID,
                    query: generateQuery({
                      newFilters: [
                        generateValueFilter({
                          field: 'study_code',
                          value: [file.study_code],
                          index: INDEXES.STUDY,
                        }),
                      ],
                    }),
                    setAsActive: true,
                  })
                }
              >
                <div className={styles.count}>{1}</div>
                <div className={styles.name}>{intl.get('entities.file.study')}</div>
              </Link>
            </Button>
            <Button className={styles.button} icon={<UserOutlined />} size="large" block>
              <Link
                className={styles.link}
                to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
                onClick={() =>
                  file &&
                  addQuery({
                    queryBuilderId: DATA_EXPLORATION_QB_ID,
                    query: generateQuery({
                      newFilters: [
                        generateValueFilter({
                          field: 'study_code',
                          value: [file.study_code],
                          index: INDEXES.STUDY,
                        }),
                      ],
                    }),
                    setAsActive: true,
                  })
                }
              >
                <div className={styles.count}>{file?.participants?.hits?.total}</div>
                <div className={styles.name}>{intl.get('entities.file.participants')}</div>
              </Link>
            </Button>
            <Button className={styles.button} icon={<ExperimentOutlined />} size="large" block>
              <Link
                className={styles.link}
                to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
                onClick={() =>
                  file &&
                  addQuery({
                    queryBuilderId: DATA_EXPLORATION_QB_ID,
                    query: generateQuery({
                      newFilters: [
                        generateValueFilter({
                          field: 'study_code',
                          value: [file.study_code],
                          index: INDEXES.STUDY,
                        }),
                      ],
                    }),
                    setAsActive: true,
                  })
                }
              >
                <div className={styles.count}>{file?.biospecimens?.hits?.total}</div>
                <div className={styles.name}>{intl.get('entities.file.samples')}</div>
              </Link>
            </Button>
          </div>

          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label={intl.get('entities.file.file_id')}>
              {file?.file_id || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.file_name')}>
              {file?.file_name || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.file_format')}>
              <Tag className={styles.tag}>{file?.file_format || TABLE_EMPTY_PLACE_HOLDER}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.file_size')}>
              {formatFileSize(file?.file_size, { output: 'string' }) || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.ferload_url')}>
              <ExternalLink href={file?.ferload_url}>
                {file?.ferload_url || TABLE_EMPTY_PLACE_HOLDER}
              </ExternalLink>
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.file_hash')}>
              {file?.file_hash || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </CollapsePanel>
    </Collapse>
  </div>
);

export default Summary;
