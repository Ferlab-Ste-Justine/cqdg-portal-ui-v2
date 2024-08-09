import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { IStudyEntity } from 'graphql/studies/models';
import capitalize from 'lodash/capitalize';
import { extractDuoTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { EMAIL_REGEX } from 'utils/helper';

import styles from '../index.module.css';

const getDataAccessDescriptions = (study?: IStudyEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.study.access_limitation'),
    value: study?.data_access_codes?.access_limitations?.length ? (
      <ExpandableCell
        nOfElementsWhenCollapsed={10}
        dataSource={study.data_access_codes.access_limitations}
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
        className={styles.forceLinkUnderline}
        renderItem={(access_limitation, index) => {
          const limitation = extractDuoTitleAndCode(access_limitation);
          return limitation ? (
            <div key={index}>
              {capitalize(limitation.title)} (DUO:{' '}
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
    label: intl.get('entities.study.access_requirement'),
    value: study?.data_access_codes?.access_requirements?.length ? (
      <ExpandableCell
        nOfElementsWhenCollapsed={10}
        dataSource={study.data_access_codes.access_requirements}
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
        className={styles.forceLinkUnderline}
        renderItem={(access_requirement, index) => {
          const requirement = extractDuoTitleAndCode(access_requirement);
          return requirement ? (
            <div key={index}>
              {capitalize(requirement.title)} (DUO:{' '}
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
    value: study?.contact?.value ? (
      <ExternalLink
        href={
          EMAIL_REGEX.test(study.contact.value)
            ? `mailto:${study.contact.value}`
            : study.contact.value
        }
        className={styles.link}
      >
        {study.contact.value}
      </ExternalLink>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
];

export default getDataAccessDescriptions;
