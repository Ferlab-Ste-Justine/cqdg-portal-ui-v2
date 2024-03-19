import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ExternalLinkIcon from '@ferlab/ui/core/components/ExternalLink/ExternalLinkIcon';
import EnvVariables from 'helpers/EnvVariables';

import styles from './index.module.scss';

const ExternalDataTypeLink = () => (
  <ExternalLink
    className={styles.dataTypeLink}
    href={`${EnvVariables.configFor('CQDG_DOCUMENTATION')}/docs/pipelines-bioinformatique`}
  >
    {intl.get('entities.file.data_type_info')}
    <ExternalLinkIcon />
  </ExternalLink>
);

export default ExternalDataTypeLink;
