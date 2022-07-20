import intl from 'react-intl-universal';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Space, Typography } from 'antd';

import { REDIRECT_URI_KEY } from 'common/constants';
import CQDGLogoFull from 'components/Icons/CQDGLogoFull';
import useQueryParams from 'hooks/useQueryParams';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

const { Title, Text } = Typography;

const Login = (): React.ReactElement => {
  const { keycloak } = useKeycloak();
  const query = useQueryParams();

  const handleSignin = async () => {
    const url = keycloak.createLoginUrl({
      // eslint-disable-next-line max-len
      redirectUri: `${window.location.origin}/${
        query.get(REDIRECT_URI_KEY) || STATIC_ROUTES.DASHBOARD
      }`,
    });
    window.location.assign(url);
  };

  return (
    <div className={styles.loginPageContent}>
      <div className={styles.loginContainer}>
        <Space size={24} direction="vertical">
          <div className={styles.logoContainer}>
            <CQDGLogoFull className={styles.logo} />
          </div>
          <Title level={3} className={styles.loginTitle}>
            Portail de données
          </Title>
          <Text className={styles.loginDescText}>
            Le Centre québécois de données génomiques est une plateforme d'harmonisation et de
            diffusion des données génomiques générées par les études cliniques et de recherche du
            Québec.
          </Text>
          <Space className={styles.loginButtons} size={16}>
            <Button type={'primary'} onClick={handleSignin} size={'large'}>
              {intl.get('screen.loginPage.login')}
            </Button>
            <Button onClick={handleSignin} size={'large'}>
              {intl.get('screen.loginPage.signup')}
            </Button>
          </Space>
        </Space>
      </div>
    </div>
  );
};
export default Login;
