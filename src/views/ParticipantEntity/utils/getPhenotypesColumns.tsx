import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink/index';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { useParticipantsFromField } from 'graphql/participants/actions';
import { ageCategories } from 'graphql/participants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { extractPhenotypeTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { IProColumnExport } from 'common/types';
import { STATIC_ROUTES } from 'utils/routes';

import styles from '../index.module.css';

const ParticipantsPhenotypesCount = ({ phenotypeName }: { phenotypeName: string }) => {
  const { loading, total } = useParticipantsFromField({
    field: 'observed_phenotypes.name',
    value: phenotypeName,
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
                field: 'observed_phenotypes.name',
                value: [phenotypeName],
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

const getPhenotypesColumns = (): IProColumnExport[] => [
  {
    key: 'name',
    dataIndex: 'name',
    title: intl.get('entities.participant.phenotype_code'),
    render: (name: string) => {
      const phenotypeInfo = extractPhenotypeTitleAndCode(name);
      return phenotypeInfo ? (
        <>
          {phenotypeInfo.title} (HP:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/HP_${phenotypeInfo.code}`}>
            {phenotypeInfo.code}
          </ExternalLink>
          )
        </>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      );
    },
  },
  {
    key: 'source_text',
    dataIndex: 'source_text',
    title: intl.get('entities.participant.phenotype_source_text'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'is_observed',
    dataIndex: 'is_observed',
    title: intl.get('entities.participant.interpretation'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_at_event',
    dataIndex: 'age_at_event',
    exportValue: (row) => {
      const category = ageCategories.find((cat) => cat.key === row?.age_at_event);
      return category ? `${category.label}: ${category.tooltip}` : row?.age_at_event;
    },
    title: intl.get('entities.participant.age'),
    popoverProps: {
      title: <b>{intl.get('entities.participant.age_at_phenotype')}</b>,
      content: ageCategories.map((category) => (
        <div key={category.key}>
          <b>{category.label}:</b>
          {` ${category.tooltip}`}
          <br />
        </div>
      )),
    },
    render: (age_at_event: string) => {
      const category = ageCategories.find((cat) => cat.key === age_at_event);
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
    key: 'hpo_term',
    dataIndex: 'name',
    title: intl.get('entities.participant.hpo_term'),
    tooltip: intl.get('entities.participant.hpo_term_tooltip'),
    render: (name: string) =>
      name ? <ParticipantsPhenotypesCount phenotypeName={name} /> : TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getPhenotypesColumns;
