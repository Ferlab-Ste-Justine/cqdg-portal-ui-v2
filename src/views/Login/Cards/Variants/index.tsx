import React from 'react';
import intl from 'react-intl-universal';
import { ArrowRightOutlined } from '@ant-design/icons';
import GeneIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/GeneSpotIcon';
import { useKeycloak } from '@react-keycloak/web';
import { Button } from 'antd';

import { STATIC_ROUTES } from '../../../../utils/routes';
import TextIcon from '../../TextIcon';

import styles from './index.module.scss';

// TODO: add redirect and plug real data
const Variants = () => {
  const { keycloak } = useKeycloak();
  const handleSignin = async () => {
    const url = keycloak.createLoginUrl({
      redirectUri: `${window.location.origin}/${STATIC_ROUTES.VARIANTS}`,
      locale: intl.getInitOptions().currentLocale,
    });
    window.location.assign(url);
  };

  return (
    <div className={styles.container}>
      <TextIcon
        IconComponent={GeneIcon}
        title="124M"
        subTitle={intl.get('screen.loginPage.cards.variants.title')}
        size="large"
      />
      <div className={styles.description}>
        {intl.get('screen.loginPage.cards.variants.description')}
      </div>
      <div>
        <Button type="primary" size="large" className={styles.exploreButton} onClick={handleSignin}>
          {intl.get('screen.loginPage.cards.variants.explore')}
          <ArrowRightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default Variants;
