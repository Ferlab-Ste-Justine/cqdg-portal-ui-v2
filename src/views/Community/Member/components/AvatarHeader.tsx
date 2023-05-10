import UserAvatar from '@ferlab/ui/core/components/UserAvatar';
import { Skeleton, Space, Typography } from 'antd';

import { TUser } from 'services/api/user/models';

import { formatName } from '../../utils';

import styles from '../index.module.scss';

interface OwnProps {
  user?: TUser;
  isLoading?: boolean;
}

const AvatarHeader = ({ user, isLoading = false }: OwnProps) => (
  <Space size={16} direction="vertical" align="center" className={styles.avatarContainer}>
    {isLoading ? (
      <Skeleton.Avatar active size={140} />
    ) : (
      <UserAvatar
        src={user?.profile_image_key}
        userName={`${user?.first_name} ${user?.last_name}`}
        size={140}
        style={{ fontSize: '80px' }}
      />
    )}
    <Space direction="vertical" size={8} align="center">
      {isLoading ? (
        <>
          <Skeleton paragraph={false} loading active className={styles.memberNameSkeleton} />
          <Skeleton paragraph={false} loading active className={styles.memberAssoSkeleton} />
        </>
      ) : (
        <>
          <Typography.Title level={3} className={styles.memberName}>
            {user && formatName(user)}
          </Typography.Title>
          {user?.affiliation && (
            <Typography.Text type="secondary">{user?.affiliation}</Typography.Text>
          )}
        </>
      )}
    </Space>
  </Space>
);

export default AvatarHeader;
