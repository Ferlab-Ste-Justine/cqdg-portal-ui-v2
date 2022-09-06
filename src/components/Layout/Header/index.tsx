import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FileSearchOutlined, HomeOutlined, ReadOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import Gravatar from '@ferlab/ui/core/components/Gravatar';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Dropdown, Menu, PageHeader } from 'antd';
import EnvVariables, { getFTEnvVarByKey } from 'helpers/EnvVariables';

import { LANG } from 'common/constants';
import { IncludeKeycloakTokenParsed } from 'common/tokenTypes';
import { AlterTypes } from 'common/types';
import NotificationBanner from 'components/featureToggle/NotificationBanner';
import CQDGLogoFullPortal from 'components/Icons/CQDGLogoFullPortal';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import LineStyleIcon from 'components/Icons/LineStyleIcon';
import HeaderLink from 'components/Layout/Header/HeaderLink';
import style from 'components/Layout/Header/index.module.scss';
import { globalActions, useLang } from 'store/global';
import { useUser } from 'store/user';
import { userActions } from 'store/user/slice';
import { STATIC_ROUTES } from 'utils/routes';

const iconSize = { width: 14, height: 14 };
const FT_FLAG_KEY = 'SITE_WIDE_BANNER';
const BANNER_TYPE_KEY = FT_FLAG_KEY + '_TYPE';
const BANNER_MSG_KEY = FT_FLAG_KEY + '_MSG';

const getTargetLang = (lang: LANG) => (lang === LANG.FR ? LANG.EN : LANG.FR);

const Header = () => {
  const lang = useLang();
  const { userInfo } = useUser();
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const history = useHistory();
  const currentPathName = history.location.pathname;
  const tokenParsed = keycloak.tokenParsed as IncludeKeycloakTokenParsed;

  return (
    <>
      <NotificationBanner
        className={style.siteWideBanner}
        featureToggleKey={FT_FLAG_KEY}
        type={getFTEnvVarByKey<AlterTypes>(BANNER_TYPE_KEY, 'warning')}
        message={getFTEnvVarByKey(BANNER_MSG_KEY)}
        banner
        closable
      />
      <PageHeader
        className={style.mainHeader}
        title={<CQDGLogoFullPortal className={style.logo} />}
        subTitle={
          <nav className={style.headerList}>
            <HeaderLink
              key="dashboard"
              currentPathName={currentPathName}
              to={STATIC_ROUTES.DASHBOARD}
              icon={<HomeOutlined />}
              title={intl.get('layout.main.menu.dashboard')}
              className={style.headerBtn}
            />
            <HeaderLink
              key="studies"
              currentPathName={currentPathName}
              to={STATIC_ROUTES.STUDIES}
              icon={<ReadOutlined />}
              title={intl.get('layout.main.menu.studies')}
              className={style.headerBtn}
            />
            <HeaderLink
              key="explore-data"
              currentPathName={currentPathName}
              to={[
                STATIC_ROUTES.DATA_EXPLORATION,
                STATIC_ROUTES.DATA_EXPLORATION_SUMMARY,
                STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS,
                STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS,
                STATIC_ROUTES.DATA_EXPLORATION_DATAFILES,
              ]}
              icon={<FileSearchOutlined />}
              title={intl.get('layout.main.menu.explore')}
              className={style.headerBtn}
            />
            <HeaderLink
              key="variant-data"
              currentPathName={currentPathName}
              to={[
                STATIC_ROUTES.VARIANT,
                STATIC_ROUTES.VARIANT_SUMMARY,
                STATIC_ROUTES.VARIANT_VARIANTS,
              ]}
              icon={<LineStyleIcon height={14} width={14} />}
              title={intl.get('layout.main.menu.variants')}
              className={style.headerBtn}
            />
          </nav>
        }
        extra={[
          <ExternalLink key="cqdg-website" href={EnvVariables.configFor('CQDG_WEB_SITE')}>
            <Button key="external-website" className={style.headerBtn}>
              {intl.get('layout.main.menu.website')}{' '}
              <ExternalLinkIcon className={style.icon} {...iconSize} />
            </Button>
          </ExternalLink>,
          <ExternalLink key="documentation" href={EnvVariables.configFor('CQDG_WEB_APP')}>
            <Button key="external-help" className={style.headerBtn}>
              {intl.get('layout.main.menu.documentation')}
              <ExternalLinkIcon className={style.icon} {...iconSize} />
            </Button>
          </ExternalLink>,
          <Dropdown
            key="user-menu"
            trigger={['click']}
            overlay={
              <Menu
                items={[
                  {
                    key: 'logout',
                    label: intl.get('layout.user.menu.logout'),
                    onClick: () => dispatch(userActions.cleanLogout()),
                  },
                ]}
              />
            }
          >
            <a className={style.userMenuTrigger} onClick={(e) => e.preventDefault()} href="">
              <Gravatar
                circle
                placeholder={'mp'}
                className={style.userGravatar}
                email={tokenParsed.email || tokenParsed.identity_provider_identity}
              />
              <span className={style.userName}>{userInfo?.first_name}</span>
              <DownOutlined />
            </a>
          </Dropdown>,
          <Button
            key="change-lang-button"
            shape="circle"
            className={style.langButton}
            onClick={() => dispatch(globalActions.changeLang(getTargetLang(lang)))}
          >
            {getTargetLang(lang).toUpperCase()}
          </Button>,
        ]}
      />
    </>
  );
};

export default Header;
