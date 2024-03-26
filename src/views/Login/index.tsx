import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchStats } from '../../store/global/thunks';

import BottomBanner from './BottomBanner';
import Cards from './Cards';
import Footer from './Footer';
import Studies from './Studies';
import TopBanner from './TopBanner';

import styles from './index.module.scss';

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
      <Footer />
    </div>
  );
};
export default Login;
