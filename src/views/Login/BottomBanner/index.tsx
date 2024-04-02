import React from 'react';
import intl from 'react-intl-universal';
import CloudDatabaseIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/CloudDatabaseSpotIcon';
import InformationIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/InformationSpotIcon';

import BannerItem from './BannerItem';

import styles from './index.module.scss';

const BottomBanner = () => (
  <div className={styles.bottomBanner}>
    <div className={styles.content}>
      <BannerItem
        IconComponent={InformationIcon}
        title={intl.get('screen.loginPage.documentation.title')}
        description={intl.get('screen.loginPage.documentation.description')}
        buttonText={intl.get('screen.loginPage.documentation.button')}
        buttonUrl="https://docs.cqdg.ca/"
      />
      <BannerItem
        IconComponent={CloudDatabaseIcon}
        title={intl.get('screen.loginPage.hosting.title')}
        description={intl.get('screen.loginPage.hosting.description')}
        buttonText={intl.get('screen.loginPage.hosting.button')}
        buttonUrl="https://docs.cqdg.ca/docs/comment-soumettre-vos-donn%C3%A9es"
      />
    </div>
  </div>
);

export default BottomBanner;
