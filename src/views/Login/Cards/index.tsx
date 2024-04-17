import intl from 'react-intl-universal';
import VariantCard from '@ferlab/ui/core/pages/LandingPage/VariantCard';
import { useKeycloak } from '@react-keycloak/web';

import { useGlobals } from '../../../store/global';
import { STATIC_ROUTES } from '../../../utils/routes';

import Rare from './Rare';
import SecureData from './SecureData';
import Stats from './Stats';

import styles from './index.module.scss';

const Cards = () => {
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
    <div className={styles.cardsContainer}>
      <div className={styles.cardsGrid}>
        <Stats />
        <Rare />
        <SecureData />
        <VariantCard
          variantsCount={variants}
          buttonProps={{
            onClick: handleSignin,
            ghost: true,
            type: 'primary',
          }}
          dictionary={{
            title: intl.get('screen.loginPage.cards.variants.title'),
            description: intl.get('screen.loginPage.cards.variants.description'),
            button: intl.get('screen.loginPage.cards.variants.explore'),
          }}
        />
      </div>
    </div>
  );
};

export default Cards;
