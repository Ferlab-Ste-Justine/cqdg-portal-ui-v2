import React from 'react';

import Carousel from './Carousel';
import Summary from './Summary';

import styles from './index.module.scss';

const Studies = () => (
  <div className={styles.container}>
    <div className={styles.layout}>
      <Summary />
      <Carousel />
    </div>
  </div>
);
export default Studies;
