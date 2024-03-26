import React from 'react';
import intl from 'react-intl-universal';
import { MailOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import sd4hLogo from '../../../../components/assets/sd4h.png';

import styles from './index.module.scss';

const SecureData = () => (
  <div className={styles.container}>
    <img src={sd4hLogo} className={styles.logo} />
    <div className={styles.title}>{intl.get('screen.loginPage.cards.secureData.title')}</div>
    <div className={styles.text}>{intl.get('screen.loginPage.cards.secureData.description')}</div>
    <div>
      <Button
        type="ghost"
        size="large"
        href="mailto:support@cqdg.ca"
        className={styles.contactButton}
      >
        {intl.get('screen.loginPage.cards.secureData.contact')}
        <MailOutlined />
      </Button>
    </div>
  </div>
);

export default SecureData;
