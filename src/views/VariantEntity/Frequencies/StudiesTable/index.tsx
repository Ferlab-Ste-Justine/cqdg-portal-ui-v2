import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { Table, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import {
  FreqCombined,
  IVariantEntity,
  IVariantFrequencies,
  IVariantStudyFrequencies,
} from 'graphql/variants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import EmptyMessage from 'views/VariantEntity/Frequencies/EmptyMessage';
import StudiesTableSummary from 'views/VariantEntity/Frequencies/StudiesTable/StudiesTableSummary';

import { formatQuotientOrElse, formatQuotientToExponentialOrElse } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

type InternalRow = {
  frequencies: IVariantFrequencies;
  key: string;
  participantTotalNumber: number;
  participant_ids: null | string[];
  participant_number: number;
  study_id: string;
};

const MIN_N_OF_PARTICIPANTS_FOR_LINK = 10;

const canMakeParticipantsLink = (nOfParticipants: number) =>
  nOfParticipants && nOfParticipants >= MIN_N_OF_PARTICIPANTS_FOR_LINK;

const getInternalColumns = () => [
  {
    key: 'study_id',
    title: intl.get('screen.variants.frequencies.studies'),
    dataIndex: 'study_id',
    render: (study_id: string) => study_id,
  },
  {
    key: 'participants',
    title: (
      <Tooltip title={intl.get('screen.variants.frequencies.participantsTooltip')}>
        {intl.get('screen.variants.frequencies.participants')}
      </Tooltip>
    ),
    render: (row: InternalRow) => {
      const participantsNumber = row.participant_number;
      const participantsTotal = row.participantTotalNumber;
      return canMakeParticipantsLink(participantsNumber) ? (
        <>
          <Link
            to={STATIC_ROUTES.DATA_EXPLORATION}
            onClick={() => {
              updateActiveQueryField({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                field: 'participant_id',
                value: row.participant_ids || [],
                index: INDEXES.PARTICIPANT,
              });
            }}
          >
            {participantsNumber}
          </Link>
          {participantsTotal ? ` / ${participantsTotal}` : ''}
        </>
      ) : (
        formatQuotientOrElse(participantsNumber, participantsTotal)
      );
    },
  },
  {
    key: 'frequency',
    title: (
      <Tooltip title={intl.get('screen.variants.frequencies.frequencyTooltip')}>
        {intl.get('screen.variants.frequencies.frequency')}
      </Tooltip>
    ),
    render: (row: InternalRow) => {
      const participantsNumber = row.participant_number;
      const participantsTotal = row.participantTotalNumber;
      return formatQuotientToExponentialOrElse(participantsNumber, participantsTotal);
    },
  },
  {
    key: 'upper_bound_kf_ac',
    title: (
      <Tooltip title={intl.get('screen.variants.frequencies.altAllelesTooltip')}>
        {`# ${intl.get('screen.variants.frequencies.altAlleles')}`}
      </Tooltip>
    ),
    dataIndex: 'frequencies',
    render: (frequencies: IVariantStudyFrequencies) => frequencies?.upper_bound_kf?.ac,
    width: '14%',
  },
  {
    key: 'upper_bound_kf_homozygotes',
    title: (
      <Tooltip title={intl.get('screen.variants.frequencies.homozygotesTooltip')}>
        {`# ${intl.get('screen.variants.frequencies.homozygotes')}`}
      </Tooltip>
    ),
    dataIndex: 'frequencies',
    render: (frequencies: IVariantStudyFrequencies) => frequencies?.upper_bound_kf?.homozygotes,
    width: '14%',
  },
];

interface IStudiesTableProps {
  loading: boolean;
  variant?: IVariantEntity;
}

const StudiesTable = ({ loading, variant }: IStudiesTableProps) => {
  const variantStudies =
    variant?.studies?.hits?.edges.map((e: any, index: number) => ({
      key: index,
      ...e.node,
      participantTotalNumber: variant?.participant_total_number || 0,
    })) || [];

  if (!loading && !variantStudies.length) {
    return <EmptyMessage />;
  }

  const participantTotalNumber = variant?.participant_total_number || 0;
  const participantNumber = variant?.participant_number || 0;

  const variantFrequencies: FreqCombined | undefined =
    variant?.frequencies?.internal?.upper_bound_kf;

  return (
    <Table
      loading={loading}
      dataSource={variantStudies}
      columns={getInternalColumns()}
      size="small"
      pagination={false}
      rowClassName={styles.notStriped}
      bordered
      summary={() => (
        <StudiesTableSummary
          variantStudies={variantStudies}
          participantNumber={participantNumber}
          altAlleles={variantFrequencies?.ac}
          homozygotes={variantFrequencies?.homozygotes}
          participantTotalNumber={participantTotalNumber}
        />
      )}
    />
  );
};

export default StudiesTable;
