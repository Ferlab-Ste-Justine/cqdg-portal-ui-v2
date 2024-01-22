import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Divider, Space, Typography } from 'antd';

import { REDIRECT_URI_KEY } from 'common/constants';
import FCI from 'components/assets/FCI.svg';
import FRQS from 'components/assets/FRQS.svg';
import genome_qc from 'components/assets/genome_qc.svg';
import CQDGLogoFull from 'components/Icons/CQDGLogoFull';
import { getTargetLang } from 'components/Layout/Header';
import DataRelease from 'components/uiKit/DataRelease';
import useQueryParams from 'hooks/useQueryParams';
import { globalActions, useLang } from 'store/global';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

const { Title, Text } = Typography;

const Login = () => {
  const { keycloak } = useKeycloak();
  const query = useQueryParams();
  const lang = useLang();
  const dispatch = useDispatch();

  const handleSignin = async () => {
    const url = keycloak.createLoginUrl({
      redirectUri: `${window.location.origin}/${
        query.get(REDIRECT_URI_KEY) || STATIC_ROUTES.STUDIES
      }`,
      locale: intl.getInitOptions().currentLocale,
    });
    window.location.assign(url);
  };

  return (
    <div className={styles.loginPageContent}>
      <Button
        type="primary"
        className={styles.switchLang}
        onClick={() => dispatch(globalActions.changeLang(getTargetLang(lang)))}
      >
        {getTargetLang(lang).toUpperCase()}
      </Button>

      <div className={styles.loginContainer}>
        <Space size={24} direction="vertical">
          <div className={styles.logoContainer}>
            <CQDGLogoFull className={styles.logo} />
          </div>
          <div className={styles.loginStats}>
            <Title level={4} className={styles.statsTitle}>
              {intl.get('components.dataRelease.title')}
            </Title>
            <Divider className={styles.statsDivider} />
            <DataRelease className={styles.dataRelease} />
          </div>
          <Title level={3} className={styles.loginTitle}>
            {intl.get('screen.loginPage.title')}
          </Title>
          <Text className={styles.loginDescText}>{intl.get('screen.loginPage.resume')}</Text>
          <Space className={styles.loginButtons} size={16}>
            <Button type={'primary'} onClick={handleSignin} size={'large'} data-cy="Login">
              {intl.get('screen.loginPage.login')}
            </Button>
            <Button onClick={handleSignin} size={'large'} data-cy="Signup">
              {intl.get('screen.loginPage.signup')}
            </Button>
          </Space>
        </Space>
      </div>

      <div className={styles.bottomLogoContainer}>
        <img src={genome_qc} />
        <img src={FRQS} />
        <img src={FCI} />
      </div>
    </div>
  );
};
export default Login;
