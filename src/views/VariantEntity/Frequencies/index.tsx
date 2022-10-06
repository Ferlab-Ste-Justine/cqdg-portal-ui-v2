import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Card, Collapse, Table, Tooltip, Typography } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';
import { IVariantStudyEntity, IVariantStudyFrequencies } from 'graphql/variants/models';
import {
  FreqCombined,
  IVariantEntity,
  IVariantFrequencies,
  // IVariantFrequenciesInterval,
} from 'graphql/variants/models';

// import { addToSqons } from 'common/sqonUtils';
import EmptyMessage, { DISPLAY_WHEN_EMPTY_DATUM } from 'components/Variants/Empty';
import {
  formatQuotientOrElse,
  formatQuotientToExponentialOrElse,
  toExponentialNotation,
} from 'utils/helper';

// import { createQueryInCohortBuilder } from '../../store/actionCreators/virtualStudies';
// import { DispatchVirtualStudies } from '../../store/virtualStudiesTypes';
import TableSummaryKfStudies from './TableSummaryKfStudies';

import styles from './index.module.scss';

const { Title } = Typography;

const MIN_N_OF_PARTICIPANTS_FOR_LINK = 10;

type InternalRow = {
  frequencies: IVariantFrequencies;
  key: string;
  participantTotalNumber: number;
  participant_ids: null | string[];
  participant_number: number;
  study_id: string;
};

type ExternalCohortDatum = string | number | null;

type Row = {
  cohort: {
    cohortName: string;
    link?: string;
  };
  alt: ExternalCohortDatum;
  altRef: ExternalCohortDatum;
  homozygotes: ExternalCohortDatum;
  frequency: ExternalCohortDatum;
  key: string;
};

type Rows = Row[];

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

const displayDefaultIfNeeded = (datum: ExternalCohortDatum) =>
  datum == null ? DISPLAY_WHEN_EMPTY_DATUM : datum;

const externalColumns = [
  {
    key: 'cohort',
    title: 'Cohort',
    dataIndex: 'cohort',
    render: (cohort: { cohortName: string; link?: string }) => {
      const cohortName = cohort.cohortName;
      if (['TopMed', 'Gnomad Genomes (v3)'].includes(cohortName)) {
        return (
          <a href={cohort.link} target="_blank" rel="noopener noreferrer">
            {cohortName}
          </a>
        );
      }
      return cohortName;
    },
  },
  {
    key: 'alt',
    title: 'ALT Allele',
    dataIndex: 'alt',
    render: displayDefaultIfNeeded,
    width: '14%',
  },
  {
    key: 'altRef',
    title: 'Alleles (ALT + REF)',
    dataIndex: 'altRef',
    render: displayDefaultIfNeeded,
    width: '14%',
  },
  {
    key: 'homozygotes',
    title: 'Homozygote',
    dataIndex: 'homozygotes',
    render: displayDefaultIfNeeded,
    width: '14%',
  },
  {
    key: 'frequency',
    title: 'Frequency',
    dataIndex: 'frequency',
    render: displayDefaultIfNeeded,
    width: '14%',
  },
];

const makeRowFromFrequencies = (
  frequencies: IVariantFrequencies | undefined,
  locus: string,
): Rows => {
  if (!frequencies) return [];

  const topmed = frequencies.topmed || {};
  const gnomadGenomes3 = frequencies.gnomad_genomes_3_0 || {};
  const gnomadGenomes2_1 = frequencies.gnomad_genomes_2_1 || {};
  const gnomadExomes2_1 = frequencies.gnomad_exomes_2_1 || {};
  const oneThousandsGenomes = frequencies.one_thousand_genomes || {};

  return [
    {
      key: 'topmed',
      cohort: {
        cohortName: 'TopMed',
        link: `https://bravo.sph.umich.edu/freeze8/hg38/variant/snv/${locus}`,
      },
      alt: topmed.ac,
      altRef: topmed.an,
      homozygotes: topmed.homozygotes,
      frequency: toExponentialNotation(topmed.af),
    },
    {
      key: 'gnomadGenomes3',
      cohort: {
        cohortName: 'Gnomad Genomes (v3)',
        link: `https://gnomad.broadinstitute.org/variant/${locus}?dataset=gnomad_r3`,
      },
      alt: gnomadGenomes3.ac,
      altRef: gnomadGenomes3.an,
      homozygotes: gnomadGenomes3.homozygotes,
      frequency: toExponentialNotation(gnomadGenomes3.af),
    },
    {
      key: 'gnomadGenomes2_1',
      cohort: {
        cohortName: 'Gnomad Genomes (v2.1)',
      },
      alt: gnomadGenomes2_1.ac,
      altRef: gnomadGenomes2_1.an,
      homozygotes: gnomadGenomes2_1.homozygotes,
      frequency: toExponentialNotation(gnomadGenomes2_1.af),
    },
    {
      key: 'gnomadExomes2_1',
      cohort: {
        cohortName: 'Gnomad Exomes (v2.1)',
      },
      alt: gnomadExomes2_1.ac,
      altRef: gnomadExomes2_1.an,
      homozygotes: gnomadExomes2_1.homozygotes,
      frequency: toExponentialNotation(gnomadExomes2_1.af),
    },
    {
      key: 'oneThousandsGenomes',
      cohort: {
        cohortName: '1000 Genomes',
      },
      alt: oneThousandsGenomes.ac,
      altRef: oneThousandsGenomes.an,
      homozygotes: oneThousandsGenomes.homozygotes,
      frequency: toExponentialNotation(oneThousandsGenomes.af),
    },
  ];
};

const hasAtLeastOneTruthyProperty = (obj: Omit<Row, 'key' | 'cohort'>) =>
  Object.values(obj).some((e) => e);

const isExternalCohortsTableEmpty = (rows: Rows) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rows.every(({ cohort, key, ...visibleRow }: Row) => !hasAtLeastOneTruthyProperty(visibleRow));

// const mapDispatch = (dispatch: DispatchVirtualStudies) => ({
//   onClickStudyLink: (sqons: Sqon[]) => dispatch(createQueryInCohortBuilder(sqons)),
// });
//
// const mapState = (state: RootState): FrequencyTabTableContainerState => ({
//   currentVirtualStudy: state.currentVirtualStudy.sqons,
// });

interface IFrequenciesProps {
  variant: IVariantEntity | null;
  loading: boolean;
  id: string;
}

const Frequencies = ({ variant, loading, id }: IFrequenciesProps) => {
  const frequencies = variant?.frequencies;
  const locus = variant?.locus || '';
  const variantStudies =
    variant?.studies?.hits?.edges.map((e: any, index: number) => ({
      key: index,
      ...e.node,
      participantTotalNumber: variant?.participant_total_number || 0,
    })) || [];
  const participantTotalNumber = variant?.participant_total_number || 0;
  const participantNumber = variant?.participant_number || 0;
  //const  participant_ids= variant?.participant_ids || [];
  // const globalStudies = variant?.map((n: IStudyEntity) => n.node);
  const globalStudies: IStudyEntity[] = [];
  const internalFrequencies: FreqCombined | undefined =
    variant?.frequencies?.internal?.upper_bound_kf;

  const externalCohortsRows = makeRowFromFrequencies(frequencies, locus);
  const hasEmptyCohorts = isExternalCohortsTableEmpty(externalCohortsRows);

  return (
    <div id={id} className={styles.container}>
      <Title level={5} className={styles.title}>
        {intl.get('frequencies')} Frequencies
      </Title>
      <Collapse defaultActiveKey={['1']} className={styles.collapse}>
        <Collapse.Panel header="CQDG Studies" key="1" className={styles.panel}>
          <Card loading={loading} className={styles.card}>
            {variantStudies.length > 0 ? (
              <Table
                dataSource={variantStudies}
                columns={internalColumns(
                  globalStudies,
                  hasAtLeastOneParticipantsLink(variantStudies),
                )}
                // summary={() => (
                //   <TableSummaryKfStudies
                //     variantStudies={variantStudies}
                //     // onClickStudyLink={props.onClickStudyLink}
                //     // currentVirtualStudy={props.currentVirtualStudy}
                //     participantNumber={participantNumber}
                //     altAlleles={internalFrequencies?.ac}
                //     homozygotes={internalFrequencies?.homozygotes}
                //     participantTotalNumber={participantTotalNumber}
                //   />
                // )}
                pagination={false}
              />
            ) : (
              <EmptyMessage />
            )}
          </Card>
        </Collapse.Panel>
      </Collapse>
      <Collapse defaultActiveKey={['2']} className={styles.collapse}>
        <Collapse.Panel header="External Cohorts" key="2" className={styles.panel}>
          <Card loading={loading} className={styles.card}>
            {hasEmptyCohorts ? (
              <EmptyMessage />
            ) : (
              <Table
                dataSource={externalCohortsRows}
                columns={externalColumns}
                pagination={false}
              />
            )}
          </Card>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default Frequencies;
