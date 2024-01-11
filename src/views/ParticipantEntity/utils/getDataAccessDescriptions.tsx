import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { IParticipantEntity } from 'graphql/participants/models';
import { extractDuoTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import { EMAIL_REGEX } from '../../../utils/helper';

import styles from '../index.module.scss';

const getDataAccessDescriptions = (participant?: IParticipantEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.study.access_limitations'),
    value: participant?.study?.data_access_codes?.access_limitations?.length ? (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={participant.study.data_access_codes.access_limitations}
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
        className={styles.forceLinkUnderline}
        renderItem={(access_limitation, index) => {
          const limitation = extractDuoTitleAndCode(access_limitation);
          return limitation ? (
            <div key={index}>
              {limitation.title} (DUO:{' '}
              <ExternalLink
                href={`http://purl.obolibrary.org/obo/DUO_${limitation.code}`}
                className={styles.link}
              >
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
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
        className={styles.forceLinkUnderline}
        renderItem={(access_requirement, index) => {
          const requirement = extractDuoTitleAndCode(access_requirement);
          return requirement ? (
            <div key={index}>
              {requirement.title} (DUO:{' '}
              <ExternalLink
                href={`http://purl.obolibrary.org/obo/DUO_${requirement.code}`}
                className={styles.link}
              >
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
      <ExternalLink
        href={
          EMAIL_REGEX.test(participant.study.contact.value)
            ? `mailto:${participant.study.contact.value}`
            : participant.study.contact.value
        }
        className={styles.link}
      >
        {participant.study.contact.value}
      </ExternalLink>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
];

export default getDataAccessDescriptions;
