import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { useParticipantsFromField } from 'graphql/participants/actions';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

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

const getDiagnosesColumns = (): ProColumnType<any>[] => [
  {
    key: 'observed_phenotypes.name',
    dataIndex: 'name',
    title: intl.get('entities.participant.phenotype_code'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'observed_phenotypes.source_text',
    dataIndex: 'source_text',
    title: intl.get('entities.participant.phenotype_source_text'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'observed_phenotypes.is_tagged',
    dataIndex: 'is_tagged',
    title: intl.get('entities.participant.interpretation'),
    render: (label: string) =>
      label
        ? intl.get('entities.participant.observed')
        : intl.get('entities.participant.no_observed'),
  },
  {
    key: 'observed_phenotypes.age_at_event',
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

export default getDiagnosesColumns;
