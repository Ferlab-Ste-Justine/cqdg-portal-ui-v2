import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { IStudyEntity } from 'graphql/studies/models';
import capitalize from 'lodash/capitalize';
import { extractDuoTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from '../index.module.scss';

type INonExpandableCellProps = {
  dataSource: string[];
  className?: string;
};
const NonExpandableCell = ({ dataSource }: INonExpandableCellProps) => (
  <>
    {dataSource.map((d, index) => {
      const duoTerm = extractDuoTitleAndCode(d);
      return duoTerm ? (
        <div key={index}>
          {capitalize(duoTerm.title)} (DUO:{' '}
          <ExternalLink
            href={`http://purl.obolibrary.org/obo/DUO_${duoTerm.code}`}
            className={styles.link}
          >
            {duoTerm.code}
          </ExternalLink>
          )
        </div>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      );
    })}
  </>
);

const getDataAccessDescriptions = (study?: IStudyEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.study.access_limitation'),
    value: study?.data_access_codes?.access_limitations?.length ? (
      <NonExpandableCell
        className={styles.forceLinkUnderline}
        dataSource={study?.data_access_codes.access_limitations}
      ></NonExpandableCell>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.study.access_requirement'),
    value: study?.data_access_codes?.access_requirements?.length ? (
      <NonExpandableCell
        className={styles.forceLinkUnderline}
        dataSource={study?.data_access_codes.access_requirements}
      ></NonExpandableCell>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.study.access_authority'),
    value: study?.contact?.value ? (
      <ExternalLink href={study.contact.value} className={styles.link}>
        {study.contact.value}
      </ExternalLink>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
];

export default getDataAccessDescriptions;
