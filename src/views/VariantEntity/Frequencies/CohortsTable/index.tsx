import intl from 'react-intl-universal';
import { Table } from 'antd';
import { IVariantEntity, IVariantFrequencies } from 'graphql/variants/models';

import EmptyMessage, { DISPLAY_WHEN_EMPTY_DATUM } from 'components/Variants/Empty';
import { toExponentialNotation } from 'utils/helper';

import styles from './index.module.scss';

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

const displayDefaultIfNeeded = (datum: ExternalCohortDatum) =>
  datum == null ? DISPLAY_WHEN_EMPTY_DATUM : datum;

const externalColumns = [
  {
    key: 'cohort',
    title: intl.get('screen.variants.frequencies.cohort'),
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
    title: intl.get('screen.variants.frequencies.altAlleles'),
    dataIndex: 'alt',
    render: displayDefaultIfNeeded,
  },
  {
    key: 'altRef',
    title: intl.get('screen.variants.frequencies.altRef'),
    dataIndex: 'altRef',
    render: displayDefaultIfNeeded,
  },
  {
    key: 'homozygotes',
    title: intl.get('screen.variants.frequencies.Homozygotes'),
    dataIndex: 'homozygotes',
    render: displayDefaultIfNeeded,
  },
  {
    key: 'frequency',
    title: intl.get('screen.variants.frequencies.frequency'),
    dataIndex: 'frequency',
    render: displayDefaultIfNeeded,
  },
];

const makeRowFromFrequencies = (
  frequencies: IVariantFrequencies | undefined,
  locus: string,
): Row[] => {
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

const isExternalCohortsTableEmpty = (rows: Row[]) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rows.every(({ cohort, key, ...visibleRow }: Row) => !hasAtLeastOneTruthyProperty(visibleRow));

interface ICohortsTableProps {
  loading: boolean;
  variant?: IVariantEntity;
}

const CohortsTable = ({ loading, variant }: ICohortsTableProps) => {
  const frequencies = variant?.frequencies;
  const locus = variant?.locus || '';
  const externalCohortsRows = makeRowFromFrequencies(frequencies, locus);
  const hasEmptyCohorts = isExternalCohortsTableEmpty(externalCohortsRows);

  if (!loading && hasEmptyCohorts) {
    return <EmptyMessage />;
  }

  return (
    <Table
      loading={loading}
      dataSource={externalCohortsRows}
      columns={externalColumns}
      pagination={false}
      size="small"
      rowClassName={styles.notStriped}
    />
  );
};

export default CohortsTable;
