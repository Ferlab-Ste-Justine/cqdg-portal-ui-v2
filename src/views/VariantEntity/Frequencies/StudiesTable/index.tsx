import { Link } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Table, Tooltip } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';
import {
  FreqCombined,
  IVariantEntity,
  IVariantFrequencies,
  IVariantStudyFrequencies,
} from 'graphql/variants/models';
import StudiesTableSummary from 'views/VariantEntity/Frequencies/StudiesTable/StudiesTableSummary';

import EmptyMessage, { DISPLAY_WHEN_EMPTY_DATUM } from 'components/Variants/Empty';
import { formatQuotientOrElse, formatQuotientToExponentialOrElse } from 'utils/helper';

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

const hasAtLeastOneParticipantsLink = (rows: InternalRow[]) =>
  (rows || []).some((row: InternalRow) => canMakeParticipantsLink(row.participant_number));

const internalColumns = (globalStudies: IStudyEntity[], hasParticipantsLinks: boolean) => [
  {
    key: 'study_id',
    title: 'Studies',
    dataIndex: 'study_id',
    render: (study_id: string) => study_id,
  },
  {
    key: 'study_id_domain',
    title: 'Domain',
    dataIndex: 'study_id',
    render: (variantStudyId: string) => {
      const study = globalStudies.find((s) => s.id === variantStudyId);
      return study?.domain || DISPLAY_WHEN_EMPTY_DATUM;
    },
  },
  {
    key: 'participants',
    title: hasParticipantsLinks ? (
      <>
        Participants{' '}
        <Tooltip
          title={
            'Due to participant confidentiality, links may return a smaller number than displayed.'
          }
        >
          <InfoCircleOutlined />
        </Tooltip>
      </>
    ) : (
      'Participants'
    ),
    dataIndex: '',
    render: (row: InternalRow) => {
      const participantsNumber = row.participant_number;
      const participantsTotal = row.participantTotalNumber;
      return canMakeParticipantsLink(participantsNumber) ? (
        <>
          <Link
            to={'/explore'}
            href={'#top'}
            onClick={() => {
              const study = globalStudies.find((s) => s.id === row.study_id);
              if (study) {
                console.log('onLinkClick todo');
                // onLinkClick(
                //   addToSqons({
                //     fieldsWValues: [{ field: 'kf_id', value: row.participant_ids || [] }],
                //     sqons: sqons,
                //   }),
                // );
              }
              const toTop = document.getElementById('main-page-container');
              toTop?.scrollTo(0, 0);
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
    title: 'Frequency',
    render: (row: InternalRow) => {
      const participantsNumber = row.participant_number;
      const participantsTotal = row.participantTotalNumber;
      return formatQuotientToExponentialOrElse(participantsNumber, participantsTotal);
    },
  },
  {
    key: 'upper_bound_kf_ac',
    title: 'ALT Alleles',
    dataIndex: 'frequencies',
    render: (frequencies: IVariantStudyFrequencies) => frequencies?.upper_bound_kf?.ac,
    width: '14%',
  },
  {
    key: 'upper_bound_kf_homozygotes',
    title: 'Homozygotes',
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

  //const  participant_ids= variant?.participant_ids || [];
  // const globalStudies = variant?.map((n: IStudyEntity) => n.node);
  const globalStudies: IStudyEntity[] = [];
  const participantTotalNumber = variant?.participant_total_number || 0;
  const participantNumber = variant?.participant_number || 0;

  const variantFrequencies: FreqCombined | undefined =
    variant?.frequencies?.internal?.upper_bound_kf;

  return (
    <Table
      loading={loading}
      dataSource={variantStudies}
      columns={internalColumns(globalStudies, hasAtLeastOneParticipantsLink(variantStudies))}
      size="small"
      pagination={false}
      rowClassName={styles.notStriped}
      summary={() => (
        <StudiesTableSummary
          variantStudies={variantStudies}
          // onClickStudyLink={props.onClickStudyLink}
          // currentVirtualStudy={props.currentVirtualStudy}
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
