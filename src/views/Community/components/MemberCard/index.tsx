import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import UserAvatar from '@ferlab/ui/core/components/UserAvatar';
import { Card, Space, Typography } from 'antd';
import { formatName } from 'views/Community/utils';

import { TUser } from 'services/api/user/models';

import styles from './index.module.scss';

interface OwnProps {
  user: TUser;
  match: string;
}

const MemberCard = ({ user, match }: OwnProps) => (
  <Link key={user.id} className={styles.memberLink} to={`/member/${user.keycloak_id}`}>
    <Card className={styles.memberCard}>
      <Space direction="vertical" align="center">
        <UserAvatar
          src={user.profile_image_key}
          userName={`${user?.first_name} ${user?.last_name}`}
          size={56}
        />
        <Typography.Title className={styles.memberCardName} level={5}>
          <Highlighter textToHighlight={formatName(user) ?? ''} searchWords={[match]} />
        </Typography.Title>
        {user.affiliation && (
          <Typography.Text type="secondary" className={styles.memberAffiliation}>
            <Highlighter textToHighlight={user.affiliation} searchWords={[match]} />
          </Typography.Text>
        )}
      </Space>
    </Card>
  </Link>
);

export default MemberCard;
