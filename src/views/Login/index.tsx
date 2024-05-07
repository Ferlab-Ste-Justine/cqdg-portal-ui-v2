import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import kid from 'components/assets/kid.jpg';
import { fetchStats } from 'store/global/thunks';

import TopBanner from './TopBanner';

import styles from './index.module.scss';

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <div className={styles.mainLayout}>
      <div className={styles.kidImgContainer}>
        <img src={kid} className={styles.kidImg} />
      </div>
      <TopBanner />
    </div>
  );
};

export default Login;
