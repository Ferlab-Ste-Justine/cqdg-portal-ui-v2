import { Link } from 'react-router-dom';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Button, Table } from 'antd';
import { IVariantStudyEntity } from 'graphql/variants/models';

import { addToSqons } from 'common/sqonUtils';
import { formatQuotientOrElse, formatQuotientToExponentialOrElse } from 'utils/helper';

import style from './TableSummaryKfStudies.module.scss';

type EnhancedVariantStudy = IVariantStudyEntity & { participantTotalNumber: number };

//todo: onClickStudyLink currentVirtualStudy
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

const TableSummaryKfStudies = (props: OwnProps) => {
  const {
    variantStudies,
    onClickStudyLink,
    currentVirtualStudy,
    participantNumber,
    altAlleles,
    homozygotes,
    participantTotalNumber,
  } = props;
  const hasParticipantLink: boolean = variantStudies.some(
    (s: IVariantStudyEntity) => s.participant_number >= MIN_N_OF_PARTICIPANTS_FOR_LINK,
  );

  const allParticipants: string[] = [
    ...variantStudies.map((s: EnhancedVariantStudy) => s.participant_ids || []),
  ].flat();

  return (
    <Table.Summary.Row>
      <Table.Summary.Cell className={style.cell} index={0}>
        Total
      </Table.Summary.Cell>
      <Table.Summary.Cell index={1}>{''}</Table.Summary.Cell>
      <Table.Summary.Cell className={style.cell} index={2}>
        {hasParticipantLink ? (
          <>
            <Link
              to={'/explore'}
              href={'#top'}
              onClick={() => {
                // onClickStudyLink(
                //   addToSqons({
                //     fieldsWValues: [{ field: 'kf_id', value: allParticipants }],
                //     sqons: currentVirtualStudy,
                //   }),
                // );
                // const toTop = document.getElementById('main-page-container');
                // toTop?.scrollTo(0, 0);
              }}
            >
              <Button type="link">
                <div className={style.participantNumLink}>{participantNumber}</div>
              </Button>
            </Link>
            {participantTotalNumber ? ` / ${participantTotalNumber}` : ''}
          </>
        ) : (
          formatQuotientOrElse(participantNumber, participantTotalNumber)
        )}
      </Table.Summary.Cell>
      <Table.Summary.Cell className={style.cell} index={3}>
        {formatQuotientToExponentialOrElse(participantNumber, participantTotalNumber)}
      </Table.Summary.Cell>
      <Table.Summary.Cell className={style.cell} index={4}>
        {altAlleles}
      </Table.Summary.Cell>
      <Table.Summary.Cell className={style.cell} index={5}>
        {homozygotes}
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );
};

export default TableSummaryKfStudies;
