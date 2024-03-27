import { ReactElement } from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ExperimentOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { List, Tabs, Typography } from 'antd';
import cx from 'classnames';
import EnvVariables from 'helpers/EnvVariables';
import CardErrorPlaceholder from 'views/Dashboard/components/CardErrorPlaceHolder';
import CardHeader from 'views/Dashboard/components/CardHeader';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';

import LineStyleIcon from 'components/Icons/LineStyleIcon';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';
import { SUPPORT_EMAIL } from 'store/report/thunks';
import { useSavedSet } from 'store/savedSet';
import { STATIC_ROUTES } from 'utils/routes';

import ListItem from './ListItem';

import styles from './index.module.scss';

const { Text } = Typography;

const Content = () => (
  <Text>
    {intl.get('screen.dashboard.cards.savedSets.noSaved')}
    <br />
    <br />
    {intl.get('screen.dashboard.cards.savedSets.noSaved2')}
    <Link to={`${STATIC_ROUTES.DATA_EXPLORATION}`}>{intl.get('screen.dataExploration.title')}</Link>
    {intl.get('screen.dashboard.cards.and')}
    <Link to={`${STATIC_ROUTES.VARIANTS}`}>{intl.get('screen.variants.title')}</Link>
    {intl.get('screen.dashboard.cards.pages')}
    <ExternalLink
      className={styles.docExternalLink}
      hasIcon
      href={`${EnvVariables.configFor(
        'CQDG_DOCUMENTATION',
      )}/docs/fonctionnalités-générales-du-portail`}
    >
      {intl.get('layout.main.menu.documentation')}
    </ExternalLink>
  </Text>
);

const getItemList = (
  type: SetType,
  savedSets: IUserSetOutput[],
  fetchingError: boolean,
  isLoading: boolean,
  icon: ReactElement,
) => (
  <List<IUserSetOutput>
    className={styles.savedSetsList}
    bordered
    locale={{
      emptyText: fetchingError ? (
        <CardErrorPlaceholder
          title={intl.get('screen.dashboard.cards.error.failedFetch')}
          subTitle={
            <Text>
              {intl.get('screen.dashboard.cards.pleaseRefresh')}
              <ExternalLink href={`mailto:${SUPPORT_EMAIL}`}>
                <Text>{intl.get('screen.dashboard.cards.contact')}</Text>
              </ExternalLink>
              .
            </Text>
          }
        />
      ) : (
        <Empty
          imageType="grid"
          size="mini"
          // @ts-ignore cuz the type description is a string
          description={<Content />}
        />
      ),
    }}
    dataSource={fetchingError ? [] : savedSets.filter((s) => s.setType === type)}
    loading={isLoading}
    renderItem={(item) => <ListItem data={item} icon={icon} />}
  />
);
const SavedSets = ({ id, key, className = '' }: DashboardCardProps) => {
  const { savedSets, isLoading, fetchingError } = useSavedSet();

  const items = [
    {
      label: (
        <div data-cy="Tab_Participants">
          <UserOutlined />
          {intl.get('entities.participant.participants')} (
          {savedSets.filter((s) => s.setType === SetType.PARTICIPANT).length})
        </div>
      ),
      key: 'participants',
      children: getItemList(
        SetType.PARTICIPANT,
        savedSets,
        fetchingError,
        isLoading,
        <UserOutlined />,
      ),
    },
    {
      label: (
        <div data-cy="Tab_Biospecimens">
          <ExperimentOutlined />
          {intl.get('entities.biospecimen.biospecimens')} (
          {savedSets.filter((s) => s.setType === SetType.BIOSPECIMEN).length})
        </div>
      ),
      key: 'biospecimens',
      children: getItemList(
        SetType.BIOSPECIMEN,
        savedSets,
        fetchingError,
        isLoading,
        <ExperimentOutlined />,
      ),
    },
    {
      label: (
        <div data-cy="Tab_Files">
          <FileTextOutlined />
          {intl.get('entities.file.files')} (
          {savedSets.filter((s) => s.setType === SetType.FILE).length})
        </div>
      ),
      key: 'files',
      children: getItemList(
        SetType.FILE,
        savedSets,
        fetchingError,
        isLoading,
        <FileTextOutlined />,
      ),
    },
    {
      label: (
        <div data-cy="Tab_Variants">
          <LineStyleIcon height={16} width={16} className={styles.iconSvg} />
          {intl.get('entities.variant.variants')} (
          {savedSets.filter((s) => s.setType === SetType.VARIANT).length})
        </div>
      ),
      key: 'variants',
      children: getItemList(
        SetType.VARIANT,
        savedSets,
        fetchingError,
        isLoading,
        <LineStyleIcon height={16} width={16} className={styles.iconSvg} />,
      ),
    },
  ];

  return (
    <GridCard
      theme="shade"
      wrapperClassName={className}
      title={
        <CardHeader
          id={id}
          key={key}
          title={intl.get('screen.dashboard.cards.savedSets.title')}
          withHandle
          infoPopover={{
            title: intl.get('screen.dashboard.cards.savedSets.popoverTitle'),
            content: <Content />,
          }}
        />
      }
      content={
        <Tabs
          className={cx(styles.setTabs, 'navNoMarginBtm')}
          defaultActiveKey="participants"
          data-cy="SavedSets"
          items={items}
        />
      }
    />
  );
};

export default SavedSets;
