import ExternalLink from '@ferlab/ui/core/components/ExternalLink';

import { EMAIL_REGEX } from 'utils/helper';

import styles from './index.module.scss';

const ExternalMailToLink = ({ email = '' }) => (
  <ExternalLink href={EMAIL_REGEX.test(email) ? `mailto:${email}` : email} className={styles.link}>
    {email}
  </ExternalLink>
);

export default ExternalMailToLink;
