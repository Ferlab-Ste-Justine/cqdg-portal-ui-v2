import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Button, Space, Typography } from 'antd';

import { useUser } from 'store/user';

import DeleteCard from './cards/DeleteCard';
import IdentificationCard from './cards/Identification';
import ResearchAndUsagesCard from './cards/ResearchAndUsage';
import RoleAndAffiliationCard from './cards/RoleAndAffiliation';

import styles from './index.module.scss';

const { Title } = Typography;

const ProfileSettings = () => {
  const { userInfo } = useUser();

  return (
    <div className={styles.profileSettingsWrapper}>
      <Space size={16} direction="vertical" className={styles.profileSettings}>
        <div className={styles.profileSettingsHeader}>
          <Title level={4}>{intl.get('screen.profileSettings.title')}</Title>
          <Link to={`/member/${userInfo?.keycloak_id}`}>
            <Button type="primary">{intl.get('screen.profileSettings.viewProfile')}</Button>
          </Link>
        </div>
        <Space size={24} direction="vertical" className={styles.cardsWrapper}>
          <IdentificationCard />
          <RoleAndAffiliationCard />
          <ResearchAndUsagesCard />
          <DeleteCard />
        </Space>
      </Space>
    </div>
  );
};

export default ProfileSettings;
