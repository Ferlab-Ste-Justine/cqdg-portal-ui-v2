import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ExperimentOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Button } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

interface ISummaryBarProps {
  file?: IFileEntity;
}

const SummaryHeader = ({ file }: ISummaryBarProps) => (
  <div className={styles.buttonGroup}>
    <Button className={styles.button} size="large" data-cy="SummaryHeader_Studies_Button" block>
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
                  field: 'study.study_code',
                  value: [file.study_code],
                  index: INDEXES.PARTICIPANT,
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
    <Button
      className={styles.button}
      size="large"
      data-cy="SummaryHeader_Participants_Button"
      block
    >
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
                  field: 'file_id',
                  value: [file.file_id],
                  index: INDEXES.FILE,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <UserOutlined className={styles.icon} />
        <div className={styles.alignBaseline}>
          <span className={styles.count}>{file?.participants?.hits?.total}</span>
          <span className={styles.name}>
            {intl.get('entities.participant.participantAuto', {
              count: file?.participants?.hits?.total,
            })}
          </span>
        </div>
      </Link>
    </Button>
    <Button className={styles.button} size="large" data-cy="SummaryHeader_Samples_Button" block>
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
                  field: 'file_id',
                  value: [file.file_id],
                  index: INDEXES.FILE,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <ExperimentOutlined className={styles.icon} />
        <div className={styles.alignBaseline}>
          <span className={styles.count}>{file?.biospecimens?.hits?.total}</span>
          <span className={styles.name}>
            {intl.get('entities.biospecimen.samplesAuto', {
              count: file?.biospecimens?.hits?.total,
            })}
          </span>
        </div>
      </Link>
    </Button>
  </div>
);

export default SummaryHeader;
