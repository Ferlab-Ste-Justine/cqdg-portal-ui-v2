// Footer.js

import React from 'react';

import ChuSjLogo from 'components/assets/logos-chusj-color.svg';
import FciLogo from 'components/assets/logos-FCI-color.svg';
import FerlabLogo from 'components/assets/logos-ferlab-color.svg';
import FrqsLogo from 'components/assets/logos-FRQS-color.png';
import GenomeQcLogo from 'components/assets/logos-genome_qc.svg';

import styles from './index.module.scss';

const Footer = () => (
  <footer className={styles.footerContainer}>
    <div className={styles.image}>
      <img src={GenomeQcLogo} alt="GenomeQC Logo" />
    </div>
    <div className={styles.image}>
      <img src={ChuSjLogo} alt="ChuSj Logo" />
    </div>
    <div className={styles.image}>
      <img src={FrqsLogo} alt="Frqs Logo" className={styles.frqsLogo} />
    </div>
    <div className={styles.image}>
      <img src={FciLogo} alt="Fci Logo" />
    </div>
    <div className={styles.image}>
      <img src={FerlabLogo} alt="Ferlab Logo" />
    </div>
  </footer>
);

export default Footer;
