import Rare from './Rare';
import SecureData from './SecureData';
import Stats from './Stats';
import Variants from './Variants';

import styles from './index.module.scss';

const Cards = () => (
  <div className={styles.cardsContainer}>
    <div className={styles.cardsGrid}>
      <Stats />
      <Rare />
      <SecureData />
      <Variants />
    </div>
  </div>
);

export default Cards;
