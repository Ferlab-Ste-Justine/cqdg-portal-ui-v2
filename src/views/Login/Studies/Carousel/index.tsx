import React from 'react';
import intl from 'react-intl-universal';
import { Carousel as AntCarousel } from 'antd';

import CartageneLogo from 'components/assets/cartagene.png';

import styles from './index.module.scss';

const studies = ['cartagene', 'dee', 'bacq', 'pragmatiq', 'neurodev'];

// TODO: Check for text overflow
const Carousel = () => (
  <AntCarousel
    className={styles.carousel}
    // autoplay
    // autoplaySpeed={5000}
    dots={{ className: styles.dots }}
  >
    {studies.map((study) => (
      <div className={styles.contentStyle} key={study}>
        <div className={styles.title}>
          {intl.get(`screen.loginPage.studies.${study}.title`) !== '' ? (
            intl.get(`screen.loginPage.studies.${study}.title`)
          ) : (
            <img src={CartageneLogo} alt="Cartagene Logo" className={styles.cartageneLogo} />
          )}
        </div>
        <div className={styles.subTitle}>
          {intl.get(`screen.loginPage.studies.${study}.subtitle`)}
        </div>
        <div className={styles.description}>
          {intl.getHTML(`screen.loginPage.studies.${study}.description`)}
        </div>
      </div>
    ))}
  </AntCarousel>
);

export default Carousel;
