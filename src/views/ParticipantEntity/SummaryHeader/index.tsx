import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ExperimentOutlined, FileTextOutlined, ReadOutlined } from '@ant-design/icons';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Button } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { STUDIES_EXPLORATION_QB_ID } from 'views/Studies/utils/constant';

import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

interface ISummaryBarProps {
  participant?: IParticipantEntity;
}

const SummaryHeader = ({ participant }: ISummaryBarProps) => (
  <div className={styles.buttonGroup}>
    <Button className={styles.button} icon={<ReadOutlined />} size="large" block>
      <Link
        className={styles.link}
        to={STATIC_ROUTES.STUDIES}
        onClick={() =>
          participant &&
          addQuery({
            queryBuilderId: STUDIES_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'study_code',
                  value: [participant.study_code],
                  index: INDEXES.STUDY,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <div className={styles.count}>{1}</div>
        <div className={styles.name}>{intl.get('entities.study.study')}</div>
      </Link>
    </Button>
    <Button className={styles.button} icon={<ExperimentOutlined />} size="large" block>
      <Link
        className={styles.link}
        to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
        onClick={() =>
          participant &&
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'participant_id',
                  value: [participant.participant_id],
                  index: INDEXES.PARTICIPANT,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <div className={styles.count}>{participant?.biospecimens?.hits?.total}</div>
        <div className={styles.name}>
          {intl.get('entities.biospecimen.biospecimens', {
            count: participant?.biospecimens?.hits?.total,
          })}
        </div>
      </Link>
    </Button>
    <Button className={styles.button} icon={<FileTextOutlined />} size="large" block>
      <Link
        className={styles.link}
        to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
        onClick={() =>
          participant &&
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'participant_id',
                  value: [participant.participant_id],
                  index: INDEXES.PARTICIPANT,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <div className={styles.count}>{participant?.files?.hits?.total}</div>
        <div className={styles.name}>
          {intl.get('entities.file.files', { count: participant?.files?.hits?.total })}
        </div>
      </Link>
    </Button>
  </div>
);

export default SummaryHeader;
