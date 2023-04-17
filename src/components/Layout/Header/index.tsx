import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  DownOutlined,
  FileSearchOutlined,
  HomeOutlined,
  LogoutOutlined,
  ReadOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import Gravatar from '@ferlab/ui/core/components/Gravatar';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Dropdown, Menu, PageHeader } from 'antd';
import { Space } from 'antd';
import EnvVariables, { getFTEnvVarByKey } from 'helpers/EnvVariables';

import { LANG } from 'common/constants';
import { IncludeKeycloakTokenParsed } from 'common/tokenTypes';
import { AlterTypes } from 'common/types';
import NotificationBanner from 'components/featureToggle/NotificationBanner';
import CQDGLogoFullPortal from 'components/Icons/CQDGLogoFullPortal';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import LineStyleIcon from 'components/Icons/LineStyleIcon';
import HeaderLink from 'components/Layout/Header/HeaderLink';
import { globalActions, useLang } from 'store/global';
import { useUser } from 'store/user';
import { userActions } from 'store/user/slice';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

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
  const DATA_EXPLORATION_ROUTES = [
    STATIC_ROUTES.DATA_EXPLORATION,
    STATIC_ROUTES.DATA_EXPLORATION_SUMMARY,
    STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS,
    STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS,
    STATIC_ROUTES.DATA_EXPLORATION_DATAFILES,
  ];

  return (
    <>
      <NotificationBanner
        className={styles.siteWideBanner}
        featureToggleKey={FT_FLAG_KEY}
        type={getFTEnvVarByKey<AlterTypes>(BANNER_TYPE_KEY, 'warning')}
        message={getFTEnvVarByKey(BANNER_MSG_KEY)}
        banner
        closable
      />
      <PageHeader
        className={styles.mainHeader}
        title={
          <div className={styles.headerNavList}>
            <CQDGLogoFullPortal className={styles.logo} />
            <nav className={styles.headerNavList}>
              <HeaderLink
                to={STATIC_ROUTES.DASHBOARD}
                icon={<HomeOutlined />}
                title={intl.get('layout.main.menu.dashboard')}
                currentPathName={currentPathName}
              />
              <HeaderLink
                to={STATIC_ROUTES.STUDIES}
                icon={<ReadOutlined />}
                title={intl.get('layout.main.menu.studies')}
                currentPathName={currentPathName}
              />
              <HeaderLink
                to={DATA_EXPLORATION_ROUTES}
                icon={<FileSearchOutlined />}
                title={intl.get('layout.main.menu.explore')}
                currentPathName={currentPathName}
              />
              <HeaderLink
                to={[STATIC_ROUTES.VARIANTS]}
                icon={<LineStyleIcon height={16} width={16} className={styles.iconSvg} />}
                title={intl.get('layout.main.menu.variants')}
                currentPathName={currentPathName}
              />
            </nav>
          </div>
        }
        extra={[
          <HeaderLink
            key="community"
            currentPathName={currentPathName}
            to={STATIC_ROUTES.COMMUNITY}
            icon={<TeamOutlined />}
            title={intl.get('layout.main.menu.community')}
          />,
          <ExternalLink key="cqdg-website" href={EnvVariables.configFor('CQDG_WEB_SITE')}>
            <Button key="external-website" className={styles.headerBtn}>
              {intl.get('layout.main.menu.website')}{' '}
              <ExternalLinkIcon className={styles.icon} {...iconSize} />
            </Button>
          </ExternalLink>,
          <ExternalLink key="documentation" href={EnvVariables.configFor('CQDG_DOCUMENTATION')}>
            <Button key="external-help" className={styles.headerBtn}>
              {intl.get('layout.main.menu.documentation')}
              <ExternalLinkIcon className={styles.icon} {...iconSize} />
            </Button>
          </ExternalLink>,
          <Dropdown
            key="user-menu"
            trigger={['click']}
            overlay={
              <Menu
                items={[
                  {
                    label: (
                      <span className={styles.titleUserDropdown}>
                        {intl.get('layout.user.menu.signedWith') + ' '}
                        <b>{tokenParsed.email || tokenParsed.identity_provider_identity}</b>
                      </span>
                    ),
                    key: 'title',
                    type: 'group',
                  },
                  {
                    type: 'divider',
                  },
                  {
                    key: 'profile_settings',
                    label: (
                      <Link to={STATIC_ROUTES.PROFILE_SETTINGS}>
                        <Space>
                          <UserOutlined />
                          {intl.get('layout.user.menu.settings')}
                        </Space>
                      </Link>
                    ),
                  },
                  {
                    key: 'logout',
                    label: intl.get('layout.user.menu.logout'),
                    onClick: () => dispatch(userActions.cleanLogout()),
                    icon: <LogoutOutlined />,
                  },
                ]}
              />
            }
          >
            <a className={styles.userMenuTrigger} onClick={(e) => e.preventDefault()} href="">
              <Gravatar
                circle
                placeholder={'mp'}
                className={styles.userGravatar}
                email={tokenParsed.email || tokenParsed.identity_provider_identity}
              />
              <span className={styles.userName}>{userInfo?.first_name}</span>
              <DownOutlined />
            </a>
          </Dropdown>,
          <Button
            key="change-lang-button"
            shape="circle"
            className={styles.langButton}
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
