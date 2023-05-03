import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ReadOutlined, UserOutlined } from '@ant-design/icons';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { IVariantEntity as IVariantEntityFerlab } from '@ferlab/ui/core/pages/EntityPage/type';
import { Button } from 'antd';
import { INDEXES } from 'graphql/constants';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

interface ISummaryBarProps {
  variant?: IVariantEntityFerlab;
}

const SummaryHeader = ({ variant }: ISummaryBarProps) => (
  <div className={styles.buttonGroup}>
    <Button className={styles.button} size="large" block>
      <Link
        className={styles.link}
        to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
        onClick={() =>
          variant &&
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'study_id',
                  value: variant?.studies?.hits?.edges?.map((e) => e.node.study_id) || [],
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
        to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
        onClick={() =>
          variant &&
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'participant_id',
                  value: [], //todo: add future participant_id or variant_id/locus field
                  index: INDEXES.PARTICIPANT,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <UserOutlined className={styles.icon} />
        <div className={styles.alignBaseline}>
          <span className={styles.count}>{variant?.participant_number}</span>
          <span className={styles.name}>
            {intl.get('entities.participant.participantAuto', {
              count: variant?.participant_number,
            })}
          </span>
        </div>
      </Link>
    </Button>
  </div>
);

export default SummaryHeader;
