import React from 'react';
import intl from 'react-intl-universal';

import rareLogo from '../../../../components/assets/RARE.png';

import styles from './index.module.scss';

const Rare = () => (
  <div className={styles.container}>
    <img src={rareLogo} className={styles.logo} />
    <div className={styles.title}>{intl.get('screen.loginPage.cards.rare.title')}</div>
    <div className={styles.text}>{intl.get('screen.loginPage.cards.rare.description')}</div>
  </div>
);

export default Rare;
