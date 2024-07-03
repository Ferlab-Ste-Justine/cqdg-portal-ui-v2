import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  DownOutlined,
  FileSearchOutlined,
  HomeOutlined,
  LogoutOutlined,
  MailOutlined,
  ReadOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import UserAvatar from '@ferlab/ui/core/components/UserAvatar';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Dropdown, MenuProps, PageHeader, Space, Tag } from 'antd';
import EnvVariables, { getFTEnvVarByKey } from 'helpers/EnvVariables';

import { LANG } from 'common/constants';
import { IncludeKeycloakTokenParsed } from 'common/tokenTypes';
import { AlterTypes } from 'common/types';
import CQDGLogo from 'components/assets/cqdg-logo.svg';
import NotificationBanner from 'components/featureToggle/NotificationBanner';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import LineStyleIcon from 'components/Icons/LineStyleIcon';
import HeaderLink from 'components/Layout/Header/HeaderLink';
import { globalActions, useLang } from 'store/global';
import { SUPPORT_EMAIL } from 'store/report/thunks';
import { useUser } from 'store/user';
import { userActions } from 'store/user/slice';
import { updateUser } from 'store/user/thunks';
import { getDocLang } from 'utils';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

const iconSize = { width: 14, height: 14 };
const FT_FLAG_KEY = 'SITE_WIDE_BANNER';
const BANNER_TYPE_KEY = FT_FLAG_KEY + '_TYPE';
const BANNER_MSG_KEY = FT_FLAG_KEY + '_MSG';

export const getTargetLang = (lang: LANG) => (lang === LANG.FR ? LANG.EN : LANG.FR);

const Header = () => {
  const lang = useLang();
  const { userInfo } = useUser();
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const location = useLocation();
  const currentPathName = location.pathname;
  const tokenParsed = keycloak.tokenParsed as IncludeKeycloakTokenParsed;
  const DATA_EXPLORATION_ROUTES = [
    STATIC_ROUTES.DATA_EXPLORATION,
    STATIC_ROUTES.DATA_EXPLORATION_SUMMARY,
    STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS,
    STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS,
    STATIC_ROUTES.DATA_EXPLORATION_DATAFILES,
  ];

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

  const resourcesMenu: MenuProps = {
    items: [
      {
        key: 'dictionary',
        label: (
          <ExternalLink
            href={EnvVariables.configFor('CQDG_DICTIONARY')}
            data-cy="HeaderLink_Dictionary"
          >
            <Space>
              <ExternalLinkIcon {...iconSize} />
              {intl.get('layout.main.menu.dictionary')}
            </Space>
          </ExternalLink>
        ),
      },
      {
        key: 'documentation',
        label: (
          <ExternalLink
            href={EnvVariables.configFor('CQDG_DOCUMENTATION') + getDocLang()}
            data-cy="HeaderLink_Documentation"
          >
            <Space>
              <ExternalLinkIcon {...iconSize} />
              {intl.get('layout.main.menu.documentation')}
            </Space>
          </ExternalLink>
        ),
      },
      {
        key: 'cqdg-website',
        label: (
          <ExternalLink href={EnvVariables.configFor('CQDG_WEB_SITE')} data-cy="HeaderLink_Website">
            <Space>
              <ExternalLinkIcon {...iconSize} />
              {intl.get('layout.main.menu.website')}
            </Space>
          </ExternalLink>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: 'contact',
        label: (
          <ExternalLink href={`mailto:${SUPPORT_EMAIL}`} data-cy="HeaderLink_Contact">
            <Space>
              <MailOutlined {...iconSize} />
              {intl.get('layout.main.menu.contact')}
            </Space>
          </ExternalLink>
        ),
      },
    ],
  };

  const userMenu: MenuProps = {
    items: [
      {
        key: 'title',
        type: 'group',
        label: (
          <span className={styles.titleUserDropdown}>
            {intl.get('layout.user.menu.signedWith') + ' '}
            <b>{tokenParsed.email || tokenParsed.identity_provider_identity}</b>
          </span>
        ),
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
    ],
  };

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
            <img src={CQDGLogo} className={styles.logo} />
            {EnvVariables.configFor('IS_BETA') === 'true' && (
              <Tag color="blue" className={styles.tagBeta}>
                Beta
              </Tag>
            )}
            <nav className={styles.headerNavList}>
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
              <HeaderLink
                to={STATIC_ROUTES.DASHBOARD}
                icon={<HomeOutlined />}
                title={intl.get('layout.main.menu.dashboard')}
                currentPathName={currentPathName}
              />
            </nav>
          </div>
        }
        extra={
          <Space size={16}>
            <HeaderLink
              currentPathName={currentPathName}
              to={STATIC_ROUTES.COMMUNITY}
              icon={<TeamOutlined />}
              title={intl.get('layout.main.menu.community')}
            />
            <Dropdown trigger={['click']} menu={resourcesMenu}>
              <div className={styles.menuTrigger}>
                <span className={styles.userName} data-cy="Resources">
                  {intl.get('layout.main.menu.resources')}
                </span>
                <DownOutlined />
              </div>
            </Dropdown>
            <Dropdown trigger={['click']} menu={userMenu}>
              <div className={styles.menuTrigger}>
                <UserAvatar
                  src={userInfo?.profile_image_key}
                  userName={`${userInfo?.first_name} ${userInfo?.last_name}`}
                  size={24}
                  className={styles.userAvatar}
                />
                <span className={styles.userName} data-cy="UserName">
                  {userInfo?.first_name}
                </span>
                <DownOutlined />
              </div>
            </Dropdown>
            <Button
              shape="circle"
              className={styles.langButton}
              onClick={handleChangeLang}
              data-cy={`LangButton_${getTargetLang(lang).toUpperCase()}`}
            >
              {getTargetLang(lang).toUpperCase()}
            </Button>
          </Space>
        }
      />
    </>
  );
};

export default Header;
