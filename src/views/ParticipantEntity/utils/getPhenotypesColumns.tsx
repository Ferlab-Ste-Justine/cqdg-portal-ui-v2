import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink/index';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { useParticipantsFromField } from 'graphql/participants/actions';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { extractPhenotypeTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';

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

const getPhenotypesColumns = (): ProColumnType<any>[] => [
  {
    key: 'phenotypes_tagged.name',
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
    key: 'phenotypes_tagged.source_text',
    dataIndex: 'source_text',
    title: intl.get('entities.participant.phenotype_source_text'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'phenotypes_tagged.is_observed',
    dataIndex: 'is_observed',
    title: intl.get('entities.participant.interpretation'),
    render: (is_observed) =>
      is_observed
        ? intl.get('entities.participant.observed')
        : intl.get('entities.participant.not_observed'),
  },
  {
    key: 'phenotypes_tagged.age_at_event',
    dataIndex: 'age_at_event',
    title: intl.get('entities.participant.age_at_phenotype'),
    tooltip: intl.get('entities.participant.age_at_phenotype_tooltip'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'participantsCount',
    dataIndex: 'name',
    title: intl.get('entities.participant.hpo_term'),
    tooltip: intl.get('entities.participant.hpo_term_tooltip'),

    render: (name: string) =>
      name ? <ParticipantsPhenotypesCount phenotypeName={name} /> : TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getPhenotypesColumns;
