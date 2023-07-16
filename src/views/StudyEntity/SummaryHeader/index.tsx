import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import {
  ExperimentOutlined,
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Button } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IStudyEntity } from 'graphql/studies/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

interface ISummaryBarProps {
  study?: IStudyEntity;
}

const SummaryHeader = ({ study }: ISummaryBarProps) => (
  <div className={styles.buttonGroup}>
    <Button className={styles.button} size="large" block>
      <Link
        className={styles.link}
        to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
        onClick={() =>
          study &&
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'study_code',
                  value: [study.study_code],
                  index: INDEXES.STUDY,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <UserOutlined className={styles.icon} />
        <div className={styles.alignBaseline}>
          <span className={styles.count}>{study?.participant_count}</span>
          <span className={styles.name}>{intl.get('entities.participant.participants')}</span>
        </div>
      </Link>
    </Button>
    <Button className={styles.button} size="large" block>
      <Link
        className={styles.link}
        to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
        onClick={() =>
          study &&
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'study_code',
                  value: [study.study_code],
                  index: INDEXES.STUDY,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <TeamOutlined className={styles.icon} />
        <div className={styles.alignBaseline}>
          <span className={styles.count}>{study?.family_count || '-'}</span>
          <span className={styles.name}>{intl.get('entities.participant.families')}</span>
        </div>
      </Link>
    </Button>
    <Button className={styles.button} size="large" block>
      <Link
        className={styles.link}
        to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
        onClick={() =>
          study &&
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'study_code',
                  value: [study.study_code],
                  index: INDEXES.STUDY,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <ExperimentOutlined className={styles.icon} />
        <div className={styles.alignBaseline}>
          <span className={styles.count}>{study?.sample_count || '-'}</span>
          <span className={styles.name}>{intl.get('entities.biospecimen.samples')}</span>
        </div>
      </Link>
    </Button>
    <Button className={styles.button} size="large" block>
      <Link
        className={styles.link}
        to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
        onClick={() =>
          study &&
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'study_code',
                  value: [study.study_code],
                  index: INDEXES.STUDY,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <FileTextOutlined className={styles.icon} />
        <div className={styles.alignBaseline}>
          <span className={styles.count}>{study?.file_count}</span>
          <span className={styles.name}>{intl.get('entities.file.files')}</span>
        </div>
      </Link>
    </Button>
  </div>
);

export default SummaryHeader;
