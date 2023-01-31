import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { useParticipantsFromField } from 'graphql/participants/actions';
import capitalize from 'lodash/capitalize';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import {
  extractIcdTitleAndCode,
  extractMondoTitleAndCode,
} from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';

const ParticipantsMondoCount = ({ diagnosis_mondo_code }: { diagnosis_mondo_code: string }) => {
  const { loading, total } = useParticipantsFromField({
    field: 'diagnoses.diagnosis_mondo_code',
    value: diagnosis_mondo_code,
  });
  if (loading) return <>{TABLE_EMPTY_PLACE_HOLDER}</>;
  return total ? (
    <Link
      to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
      onClick={() =>
        addQuery({
          queryBuilderId: DATA_EXPLORATION_QB_ID,
          query: generateQuery({
            newFilters: [
              generateValueFilter({
                field: 'diagnoses.diagnosis_mondo_code',
                value: [diagnosis_mondo_code],
                index: INDEXES.PARTICIPANT,
              }),
            ],
          }),
          setAsActive: true,
        })
      }
    >
      {total}
    </Link>
  ) : (
    <>0</>
  );
};

const getDiagnosesColumns = (): ProColumnType<any>[] => [
  {
    key: 'diagnoses.diagnosis_mondo_display',
    dataIndex: 'diagnosis_mondo_display',
    title: intl.get('entities.participant.diagnosis_mondo'),
    render: (diagnosis_mondo_code: string) => {
      if (!diagnosis_mondo_code) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractMondoTitleAndCode(diagnosis_mondo_code);
      return (
        <>
          {capitalize(title)} (MONDO:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/MONDO_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'diagnoses.diagnosis_icd_display',
    dataIndex: 'diagnosis_icd_display',
    title: intl.get('entities.participant.diagnosis_ICD'),
    render: (diagnosis_ICD_code: string) => {
      if (!diagnosis_ICD_code) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractIcdTitleAndCode(diagnosis_ICD_code);
      return (
        <>
          {capitalize(title)} (
          <ExternalLink href={`http://purl.bioontology.org/ontology/ICD9CM/${code}`}>
            {code}
          </ExternalLink>
          )
        </>
      );
    },
  },
  {
    key: 'diagnoses.diagnosis_source_text',
    dataIndex: 'diagnosis_source_text',
    title: intl.get('entities.participant.diagnosis_source_text'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'diagnoses.age_at_diagnosis',
    dataIndex: 'age_at_diagnosis',
    title: intl.get('entities.participant.age_at_diagnosis'),
    tooltip: intl.get('entities.participant.age_at_diagnosis_tooltip'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'diagnoses.cancer',
    dataIndex: 'cancer',
    title: intl.get('entities.participant.cancer'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'diagnoses.participantsCount',
    dataIndex: 'diagnosis_mondo_code',
    title: intl.get('entities.participant.mondo_term'),
    render: (diagnosis_mondo_code: string) =>
      diagnosis_mondo_code ? (
        <ParticipantsMondoCount diagnosis_mondo_code={diagnosis_mondo_code} />
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
];

export default getDiagnosesColumns;
