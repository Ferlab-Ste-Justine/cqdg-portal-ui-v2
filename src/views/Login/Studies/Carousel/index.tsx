import React from 'react';
import intl from 'react-intl-universal';
import { Carousel as AntCarousel } from 'antd';

import CartageneLogo from 'components/assets/cartagene.png';

import styles from './index.module.scss';

const studies = [
  { name: 'cartagene', logo: CartageneLogo },
  { name: 'dee' },
  { name: 'bacq' },
  { name: 'pragmatiq' },
  { name: 'neurodev' },
];

const Carousel = () => (
  <AntCarousel
    className={styles.carousel}
    autoplay
    autoplaySpeed={5000}
    dots={{ className: styles.dots }}
  >
    {studies.map((study) => (
      <div className={styles.contentStyle} key={study.name}>
        <div className={styles.title}>
          {study.logo ? (
            <img src={study.logo} alt="Study Logo" className={styles.logo} />
          ) : (
            intl.get(`screen.loginPage.studies.${study.name}.title`)
          )}
        </div>
        <div className={styles.subTitle}>
          {intl.get(`screen.loginPage.studies.${study.name}.subtitle`)}
        </div>
        <div className={styles.description}>
          {intl.getHTML(`screen.loginPage.studies.${study.name}.description`)}
        </div>
      </div>
    ))}
  </AntCarousel>
);

export default Carousel;
