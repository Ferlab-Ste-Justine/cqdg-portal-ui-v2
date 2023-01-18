import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

const getDiagnosesColumns = (): ProColumnType<any>[] => [
  {
    key: 'diagnosis_mondo_code',
    dataIndex: 'diagnosis_mondo_code',
    title: intl.get('entities.participant.diagnosis_mondo'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'diagnosis_ICD_code',
    dataIndex: 'diagnosis_ICD_code',
    title: intl.get('entities.participant.diagnosis_ICD'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
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
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'cancer',
    dataIndex: 'cancer',
    title: intl.get('entities.participant.cancer'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nbOfParticipantsWithMondo',
    dataIndex: 'nbOfParticipantsWithMondo',
    title: intl.get('entities.participant.mondo_term'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getDiagnosesColumns;
