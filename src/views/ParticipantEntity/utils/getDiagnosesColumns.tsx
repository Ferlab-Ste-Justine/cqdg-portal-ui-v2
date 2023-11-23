import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { useParticipantsFromField } from 'graphql/participants/actions';
import { ageCategories, IDiagnoses } from 'graphql/participants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import {
  extractIcdTitleAndCode,
  extractMondoTitleAndCode,
} from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';

import styles from '../index.module.scss';

const ParticipantsMondoCount = ({
  diagnosis_mondo_display,
}: {
  diagnosis_mondo_display: string;
}) => {
  const { loading, total } = useParticipantsFromField({
    field: 'mondo.name',
    value: diagnosis_mondo_display,
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
                field: 'mondo.name',
                value: [diagnosis_mondo_display],
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
    key: 'diagnosis_mondo_display',
    dataIndex: 'diagnosis_mondo_display',
    title: intl.get('entities.participant.diagnosis_mondo'),
    render: (diagnosis_mondo_code: string) => {
      if (!diagnosis_mondo_code) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractMondoTitleAndCode(diagnosis_mondo_code);
      return (
        <>
          {title} (MONDO:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/MONDO_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'diagnosis_icd_display',
    dataIndex: 'diagnosis_icd_display',
    title: intl.get('entities.participant.diagnosis_icd'),
    render: (diagnosis_ICD_code: string) => {
      if (!diagnosis_ICD_code) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractIcdTitleAndCode(diagnosis_ICD_code);
      return (
        <>
          {title} (
          <ExternalLink href={`http://purl.bioontology.org/ontology/ICD10CM/${code}`}>
            {code}
          </ExternalLink>
          )
        </>
      );
    },
  },
  {
    key: 'diagnosis_source_text',
    dataIndex: 'diagnosis_source_text',
    title: intl.get('entities.participant.diagnosis_source_text'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_at_diagnosis',
    dataIndex: 'age_at_diagnosis',
    title: intl.get('entities.participant.age_at_diagnosis'),
    tooltip: intl.get('entities.participant.age_at_diagnosis_tooltip'),
    render: (age_at_diagnosis: string) => {
      const category = ageCategories.find((cat) => cat.key === age_at_diagnosis);
      if (!category) return TABLE_EMPTY_PLACE_HOLDER;
      return category.tooltip ? (
        <Tooltip title={category.tooltip} className={styles.tooltip}>
          {category.label}
        </Tooltip>
      ) : (
        category.label
      );
    },
  },
  {
    key: 'cancer',
    dataIndex: 'cancer',
    title: intl.get('entities.participant.cancer'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'mondo_term',
    title: intl.get('entities.participant.mondo_term'),
    tooltip: intl.get('entities.participant.mondo_term_tooltip'),
    render: (diagnosis: IDiagnoses) => {
      const { diagnosis_mondo_display, diagnosis_mondo_code } = diagnosis;
      return diagnosis_mondo_code && diagnosis_mondo_display ? (
        <ParticipantsMondoCount diagnosis_mondo_display={diagnosis_mondo_display} />
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      );
    },
  },
];

export default getDiagnosesColumns;
