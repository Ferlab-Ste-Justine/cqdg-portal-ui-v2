import cx from 'classnames';
import EnvironmentVariables from 'helpers/EnvVariables';
import { uniqueId } from 'lodash';

import { DEFAULT_GRAVATAR_PLACEHOLDER } from 'common/constants';

import styles from './index.module.scss';

const profileImageBaseUrl = EnvironmentVariables.configFor('PROFILE_IMAGE_BASE_URL');

interface OwnProps {
  size?: number;
  shape?: 'square' | 'round';
  className?: string;
  imageKey: string | undefined | null;
}

const UserAvatar = ({ size = 24, shape = 'round', imageKey, className }: OwnProps) => (
  <img
    className={cx(shape === 'round' && styles.userAvatarRound, className)}
    width={size}
    height={size}
    src={
      imageKey ? `${profileImageBaseUrl}/${imageKey}?v=${uniqueId()}` : DEFAULT_GRAVATAR_PLACEHOLDER
    }
  />
);

export default UserAvatar;
