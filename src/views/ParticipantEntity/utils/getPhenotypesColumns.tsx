import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

const getDiagnosesColumns = (): ProColumnType<any>[] => [
  {
    key: 'phenotype_code',
    dataIndex: 'phenotype_code',
    title: intl.get('entities.participant.phenotype_code'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'phenotype_source_text',
    dataIndex: 'phenotype_source_text',
    title: intl.get('entities.participant.phenotype_source_text'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'interpretation',
    dataIndex: 'interpretation',
    title: intl.get('entities.participant.interpretation'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_at_phenotype',
    dataIndex: 'age_at_phenotype',
    title: intl.get('entities.participant.age_at_phenotype'),
    tooltip: intl.get('entities.participant.age_at_phenotype_tooltip'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nbOfParticipantsWithMondo',
    dataIndex: 'nbOfParticipantsWithMondo',
    title: intl.get('entities.participant.hpo_term'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getDiagnosesColumns;
