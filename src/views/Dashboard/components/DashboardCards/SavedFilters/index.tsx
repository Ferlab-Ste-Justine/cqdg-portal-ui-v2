import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { FileSearchOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { List, Tabs, Typography } from 'antd';
import cx from 'classnames';
import CardErrorPlaceholder from 'views/Dashboard/components/CardErrorPlaceHolder';
import CardHeader from 'views/Dashboard/components/CardHeader';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';

import LineStyleIcon from 'components/Icons/LineStyleIcon';
import { SavedFilterTag, TUserSavedFilter } from 'services/api/savedFilter/models';
import { SUPPORT_EMAIL } from 'store/report/thunks';
import { useSavedFilter } from 'store/savedFilter';
import { STATIC_ROUTES } from 'utils/routes';

import ListItem from './ListItem';

import styles from './index.module.scss';

const { Text } = Typography;

const getItemList = (
  savedFilters: TUserSavedFilter[],
  fetchingError: boolean,
  isLoading: boolean,
) => (
  <List<TUserSavedFilter>
    className={styles.savedFiltersList}
    bordered
    locale={{
      emptyText: fetchingError ? (
        <CardErrorPlaceholder
          title={intl.get('screen.dashboard.cards.error.failedFetch')}
          subTitle={
            <Text>
              {intl.get('screen.dashboard.cards.pleaseRefresh')}
              <ExternalLink href={`mailto:${SUPPORT_EMAIL}`}>
                <Text>{intl.get('screen.dashboard.cards.savedFilters.contact')}</Text>
              </ExternalLink>
              .
            </Text>
          }
        />
      ) : (
        <Empty
          imageType="grid"
          // @ts-ignore cuz the type description is a string
          description={
            <>
              {intl.get('screen.dashboard.cards.savedFilters.noSaved')}
              <Link to={`${STATIC_ROUTES.DATA_EXPLORATION}`}>
                {intl.get('screen.dataExploration.dataExploration')}
              </Link>
              {intl.get('screen.dashboard.cards.and')}
              <Link to={`${STATIC_ROUTES.VARIANTS}`}>
                {intl.get('screen.variants.variantsExploration')}
              </Link>
              {intl.get('screen.dashboard.cards.pages')}
            </>
          }
        />
      ),
    }}
    dataSource={fetchingError ? [] : savedFilters}
    loading={isLoading}
    renderItem={(item) => <ListItem data={item} />}
  />
);

const SavedFilters = ({ id, key, className = '' }: DashboardCardProps) => {
  const { savedFilters, isLoading, fetchingError } = useSavedFilter();

  const dataExplorationFilters = savedFilters.filter(
    (s) => s.tag === SavedFilterTag.DataExplorationPage,
  );
  const variantFilters = savedFilters.filter(
    (s) => s.tag === SavedFilterTag.VariantsExplorationPage,
  );

  const items = [
    {
      label: (
        <div data-cy="Tab_DataExploration">
          <FileSearchOutlined />
          {intl.get('screen.dataExploration.dataExploration')} ({dataExplorationFilters.length})
        </div>
      ),
      key: SavedFilterTag.DataExplorationPage,
      children: getItemList(dataExplorationFilters, fetchingError, isLoading),
    },
    {
      label: (
        <div data-cy="Tab_Variants">
          <LineStyleIcon height={16} width={16} className={styles.iconSvg} />
          {intl.get('entities.variant.variants')} ({variantFilters.length})
        </div>
      ),
      key: SavedFilterTag.VariantsExplorationPage,
      children: getItemList(variantFilters, fetchingError, isLoading),
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
          title={intl.get('screen.dashboard.cards.savedFilters.title')}
          withHandle
          infoPopover={{
            title: intl.get('screen.dashboard.cards.savedFilters.popoverTitle'),
            content: (
              <Text>
                {intl.get('screen.dashboard.cards.savedFilters.popoverContent')}
                <Link to={`${STATIC_ROUTES.DATA_EXPLORATION}`}>
                  {intl.get('screen.dataExploration.dataExploration')}
                </Link>
                {intl.get('screen.dashboard.cards.and')}
                <Link to={`${STATIC_ROUTES.VARIANTS}`}>
                  {intl.get('screen.variants.variantsExploration')}
                </Link>
                {intl.get('screen.dashboard.cards.pages')}
              </Text>
            ),
          }}
        />
      }
      content={
        <Tabs
          className={cx(styles.setTabs, 'navNoMarginBtm')}
          defaultActiveKey={SavedFilterTag.DataExplorationPage}
          data-cy="SavedFilters"
          items={items}
        />
      }
    />
  );
};

export default SavedFilters;
