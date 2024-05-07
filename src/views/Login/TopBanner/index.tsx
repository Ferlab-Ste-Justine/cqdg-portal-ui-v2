import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Space } from 'antd';

import { REDIRECT_URI_KEY } from 'common/constants';
import SKIDSLogo from 'components/assets/skids-chusj-logo.svg';
import { getTargetLang } from 'components/Layout/Header';
import useQueryParams from 'hooks/useQueryParams';
import { globalActions, useLang } from 'store/global';
import { updateUser } from 'store/user/thunks';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

const TopBanner = () => {
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

  const handleChangeLang = () => {
    const targetLang = getTargetLang(lang);

    dispatch(
      updateUser({
        data: {
          locale: targetLang,
        },
      }),
    );
    dispatch(globalActions.changeLang(targetLang));
  };

  return (
    <div className={styles.topBanner}>
      <div className={styles.contentContainer}>
        <Button ghost type="default" className={styles.languageButton} onClick={handleChangeLang}>
          {getTargetLang(lang).toUpperCase()}
        </Button>
        <div className={styles.content}>
          <img src={SKIDSLogo} className={styles.logo} />
          <div className={styles.title}>{intl.get('screen.loginPage.title')}</div>
          <div className={styles.description}>{intl.get('screen.loginPage.resume')}</div>
          <Space size={8}>
            <Button ghost type="primary" size="large" data-cy="Login" onClick={handleSignin}>
              {intl.get('screen.loginPage.login')}
            </Button>
            <Button ghost type="default" size="large" data-cy="Signup" onClick={handleSignin}>
              {intl.get('screen.loginPage.signup')}
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
