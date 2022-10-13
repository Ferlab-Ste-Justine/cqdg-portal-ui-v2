import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Button, Table } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IVariantStudyEntity } from 'graphql/variants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { formatQuotientOrElse, formatQuotientToExponentialOrElse } from 'utils/helper';

import styles from './index.module.scss';

type EnhancedVariantStudy = IVariantStudyEntity & { participantTotalNumber: number };

type OwnProps = {
  variantStudies: EnhancedVariantStudy[];
  onClickStudyLink?: (sqons: ISyntheticSqon[]) => void;
  currentVirtualStudy?: ISyntheticSqon[];
  participantNumber: number;
  altAlleles: number | undefined;
  homozygotes: number | undefined;
  participantTotalNumber: number;
};

const MIN_N_OF_PARTICIPANTS_FOR_LINK = 10;

const StudiesTableSummary = (props: OwnProps) => {
  const { variantStudies, participantNumber, altAlleles, homozygotes, participantTotalNumber } =
    props;

  const hasParticipantLink: boolean = variantStudies.some(
    (s: IVariantStudyEntity) => s.participant_number >= MIN_N_OF_PARTICIPANTS_FOR_LINK,
  );

  const allParticipants: string[] = [
    ...variantStudies.map((s: EnhancedVariantStudy) => s.participant_ids || []),
  ].flat();

  return (
    <Table.Summary.Row className={styles.row}>
      <Table.Summary.Cell className={styles.cell} index={0}>
        {intl.get('screen.variants.frequencies.total')}
      </Table.Summary.Cell>
      <Table.Summary.Cell index={1}>{''}</Table.Summary.Cell>
      <Table.Summary.Cell className={styles.cell} index={2}>
        {hasParticipantLink ? (
          <>
            <Link
              to={'/data-exploration'}
              href={'#top'}
              onClick={() => {
                updateActiveQueryField({
                  queryBuilderId: DATA_EXPLORATION_QB_ID,
                  field: 'participant_id',
                  value: allParticipants,
                  index: INDEXES.PARTICIPANT,
                });
              }}
            >
              <Button type="link">
                <div className={styles.participantNumLink}>{participantNumber}</div>
              </Button>
            </Link>
            {participantTotalNumber ? ` / ${participantTotalNumber}` : ''}
          </>
        ) : (
          formatQuotientOrElse(participantNumber, participantTotalNumber)
        )}
      </Table.Summary.Cell>
      <Table.Summary.Cell className={styles.cell} index={3}>
        {formatQuotientToExponentialOrElse(participantNumber, participantTotalNumber)}
      </Table.Summary.Cell>
      <Table.Summary.Cell className={styles.cell} index={4}>
        {altAlleles}
      </Table.Summary.Cell>
      <Table.Summary.Cell className={styles.cell} index={5}>
        {homozygotes}
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );
};

export default StudiesTableSummary;
