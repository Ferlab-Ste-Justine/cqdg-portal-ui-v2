import React from 'react';
import intl from 'react-intl-universal';
import { MailOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import sd4hLogo from 'components/assets/sd4h.png';
import { SUPPORT_EMAIL } from 'store/report/thunks';

import styles from './index.module.css';

const SecureData = () => (
  <div className={styles.container}>
    <img src={sd4hLogo} className={styles.logo} />
    <div className={styles.title}>{intl.get('screen.loginPage.cards.secureData.title')}</div>
    <div className={styles.text}>{intl.get('screen.loginPage.cards.secureData.description')}</div>
    <div>
      <Button type="default" size="large" href={`mailto:${SUPPORT_EMAIL}`}>
        {intl.get('screen.loginPage.cards.secureData.contact')}
        <MailOutlined />
      </Button>
    </div>
  </div>
);

export default SecureData;
