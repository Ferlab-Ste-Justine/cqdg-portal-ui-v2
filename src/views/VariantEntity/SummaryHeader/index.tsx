import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ReadOutlined, UserOutlined } from '@ant-design/icons';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { numberWithCommas } from '@ferlab/ui/core/utils/numberUtils';
import { Button } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IVariantEntity } from 'graphql/variants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

interface ISummaryHeaderProps {
  variant?: IVariantEntity;
}

const SummaryHeader = ({ variant }: ISummaryHeaderProps) => {
  const studyCount = variant?.studies.hits.total || 0;
  const participantCount = variant?.internal_frequencies?.total?.pc || 0;
  const studyCodes = variant?.studies.hits.edges.map((e) => e?.node?.study_code) || [];

  const participantsIdsFromAllStudies = variant?.studies.hits.edges.reduce((xs: string[], x) => {
    if (x.node.participant_ids?.length) {
      return [...xs, ...x.node.participant_ids];
    }
    return xs;
  }, []);
  const uniqueParticipantsFromAllStudies = [...new Set(participantsIdsFromAllStudies)];

  return (
    <div className={styles.buttonGroup}>
      <Button className={styles.button} size="large" data-cy="SummaryHeader_Studies_Button" block>
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          className={styles.link}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study_code',
                    value: studyCodes,
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
            <span className={styles.count}>{numberWithCommas(studyCount)}</span>
            <span className={styles.name}>
              {intl.get('entities.study.studyAuto', { count: studyCount })}
            </span>
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
          to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          className={styles.link}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: uniqueParticipantsFromAllStudies,
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
            <span className={styles.count}>{numberWithCommas(participantCount)}</span>
            <span className={styles.name}>
              {intl.get('entities.participant.participantAuto', {
                count: participantCount,
              })}
            </span>
          </div>
        </Link>
      </Button>
    </div>
  );
};

export default SummaryHeader;
