import React from 'react';
import intl from 'react-intl-universal';
import { ArrowRightOutlined } from '@ant-design/icons';
import GeneIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/GeneSpotIcon';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { useKeycloak } from '@react-keycloak/web';
import { Button } from 'antd';

import { useGlobals } from 'store/global';
import { STATIC_ROUTES } from 'utils/routes';

import TextIcon from '../../TextIcon';

import styles from './index.module.scss';

const Variants = () => {
  const { keycloak } = useKeycloak();
  const { stats } = useGlobals();
  const { variants = 0 } = stats || {};
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
        title={numberFormat(variants)}
        subTitle={intl.get('screen.loginPage.cards.variants.title')}
        size="large"
      />
      <div className={styles.description}>
        {intl.get('screen.loginPage.cards.variants.description')}
      </div>
      <div>
        <Button
          ghost
          type="primary"
          size="large"
          className={styles.exploreButton}
          onClick={handleSignin}
        >
          {intl.get('screen.loginPage.cards.variants.explore')}
          <ArrowRightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default Variants;
