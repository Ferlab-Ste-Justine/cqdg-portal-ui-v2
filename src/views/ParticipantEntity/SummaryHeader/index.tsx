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
    <Button className={styles.button} size="large" block>
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
        <ReadOutlined className={styles.icon} />
        <div className={styles.alignBaseline}>
          <span className={styles.count}>{1}</span>
          <span className={styles.name}>{intl.get('entities.study.study')}</span>
        </div>
      </Link>
    </Button>
    <Button className={styles.button} size="large" block>
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
        <ExperimentOutlined className={styles.icon} />
        <div className={styles.alignBaseline}>
          <span className={styles.count}>{participant?.biospecimens?.hits?.total}</span>
          <span className={styles.name}>
            {intl.get('entities.biospecimen.biospecimensAuto', {
              count: participant?.biospecimens?.hits?.total,
            })}
          </span>
        </div>
      </Link>
    </Button>
    <Button className={styles.button} size="large" block>
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
        <FileTextOutlined className={styles.icon} />
        <div className={styles.alignBaseline}>
          <span className={styles.count}>{participant?.files?.hits?.total}</span>
          <span className={styles.name}>
            {intl.get('entities.file.filesAuto', { count: participant?.files?.hits?.total })}
          </span>
        </div>
      </Link>
    </Button>
  </div>
);

export default SummaryHeader;
