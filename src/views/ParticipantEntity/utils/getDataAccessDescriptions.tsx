import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { IParticipantEntity } from 'graphql/participants/models';
import capitalize from 'lodash/capitalize';
import { extractDuoTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

const getDataAccessDescriptions = (participant?: IParticipantEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.study.access_limitations'),
    value: participant?.study?.data_access_codes?.access_limitations?.length ? (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={participant.study.data_access_codes.access_limitations}
        renderItem={(access_limitation, index) => {
          const limitation = extractDuoTitleAndCode(access_limitation);
          return limitation ? (
            <div key={index}>
              {capitalize(limitation.title)} (DUO:{' '}
              <ExternalLink href={`http://purl.obolibrary.org/obo/DUO_${limitation.code}`}>
                {limitation.code}
              </ExternalLink>
              )
            </div>
          ) : (
            TABLE_EMPTY_PLACE_HOLDER
          );
        }}
      />
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.study.access_requirements'),
    value: participant?.study?.data_access_codes?.access_requirements?.length ? (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={participant.study.data_access_codes.access_requirements}
        renderItem={(access_requirement, index) => {
          const requirement = extractDuoTitleAndCode(access_requirement);
          return requirement ? (
            <div key={index}>
              {capitalize(requirement.title)} (DUO:{' '}
              <ExternalLink href={`http://purl.obolibrary.org/obo/DUO_${requirement.code}`}>
                {requirement.code}
              </ExternalLink>
              )
            </div>
          ) : (
            TABLE_EMPTY_PLACE_HOLDER
          );
        }}
      />
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.study.access_authority'),
    value: participant?.study?.contact?.value ? (
      <ExternalLink href={participant.study.contact.value}>
        {participant.study.contact.value}
      </ExternalLink>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
];

export default getDataAccessDescriptions;
