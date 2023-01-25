import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import capitalize from 'lodash/capitalize';
import {
  extractIcdTitleAndCode,
  extractMondoTitleAndCode,
} from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

const getDiagnosesColumns = (): ProColumnType<any>[] => [
  {
    key: 'diagnosis_mondo_code',
    dataIndex: 'diagnosis_mondo_code',
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
    key: 'diagnosis_ICD_code',
    dataIndex: 'diagnosis_ICD_code',
    title: intl.get('entities.participant.diagnosis_ICD'),
    render: (diagnosis_ICD_code: string) => {
      if (!diagnosis_ICD_code) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractIcdTitleAndCode(diagnosis_ICD_code);
      return (
        <>
          {capitalize(title)} (ICD:{' '}
          <ExternalLink href={`http://purl.bioontology.org/ontology/ICD9CM/${code}`}>
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
