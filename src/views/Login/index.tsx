import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '@ferlab/ui/core/pages/LandingPage/Footer';

import ChuSjLogo from 'components/assets/logos-chusj-color.svg';
import FciLogo from 'components/assets/logos-FCI-color.svg';
import FerlabLogo from 'components/assets/logos-ferlab-color.svg';
import FrqsLogo from 'components/assets/logos-FRQS-color.png';
import GenomeQcLogo from 'components/assets/logos-genome_qc.svg';
import { fetchStats } from 'store/global/thunks';

import BottomBanner from './BottomBanner';
import Cards from './Cards';
import Studies from './Studies';
import TopBanner from './TopBanner';

import styles from './index.module.css';

const footerLogos = [GenomeQcLogo, ChuSjLogo, FrqsLogo, FciLogo, FerlabLogo];

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <div className={styles.mainLayout}>
      <TopBanner />
      <Studies />
      <Cards />
      <BottomBanner />
      <Footer logos={footerLogos} />
    </div>
  );
};
export default Login;
