import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { STUDIES_EXPLORATION_QB_ID } from 'views/Studies/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';

import styles from 'views/FileEntity/index.module.scss';

const getSummaryDescriptions = (participant?: IParticipantEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.participant.participant_id'),
    value: participant?.participant_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: (
      <Tooltip title={intl.get('entities.participant.submitter_participant_id_tooltip')}>
        {intl.get('entities.participant.submitter_participant_id')}
      </Tooltip>
    ),
    value: participant?.submitter_participant_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.study'),
    value: (
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
        {`${participant?.study?.name} (${participant?.study?.study_code})`}
      </Link>
    ),
  },
  {
    label: intl.get('entities.participant.family_type'),
    value: (
      <Tag color="cyan" className={styles.tag}>
        {participant?.family_type || TABLE_EMPTY_PLACE_HOLDER}
      </Tag>
    ),
  },
  {
    label: intl.get('entities.participant.family_position'),
    value: (
      <Tag color="purple" className={styles.tag}>
        {participant?.family_position || TABLE_EMPTY_PLACE_HOLDER}
      </Tag>
    ),
  },
];

export default getSummaryDescriptions;
