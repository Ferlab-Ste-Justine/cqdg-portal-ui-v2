import intl from 'react-intl-universal';
import { FileSearchOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { List, Tabs, Typography } from 'antd';
import cx from 'classnames';
import CardErrorPlaceholder from 'views/Dashboard/components/CardErrorPlaceHolder';
import CardHeader from 'views/Dashboard/components/CardHeader';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';
import { DATA_EXPLORATION_FILTER_TAG } from 'views/DataExploration/utils/constant';
import { VARIANT_FILTER_TAG } from 'views/Variants/utils/constants';

import LineStyleIcon from 'components/Icons/LineStyleIcon';
import PopoverContentLink from 'components/uiKit/PopoverContentLink';
import { TUserSavedFilter } from 'services/api/savedFilter/models';
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
          title={intl.get('screen.dashboard.cards.savedFilters.failedFetch')}
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
          description={intl.get('screen.dashboard.cards.savedFilters.noSaved')}
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

  const dataExplorationFilters = savedFilters.filter((s) => s.tag === DATA_EXPLORATION_FILTER_TAG);
  const variantFilters = savedFilters.filter((s) => s.tag === VARIANT_FILTER_TAG);

  const items = [
    {
      label: (
        <div data-cy="Tab_DataExploration">
          <FileSearchOutlined />
          {intl.get('screen.dashboard.cards.savedFilters.dataExploration')} (
          {dataExplorationFilters.length})
        </div>
      ),
      key: 'dataExplorationFilters',
      children: getItemList(dataExplorationFilters, fetchingError, isLoading),
    },
    {
      label: (
        <div data-cy="Tab_Variants">
          <LineStyleIcon height={16} width={16} className={styles.iconSvg} />
          {intl.get('screen.dashboard.cards.savedFilters.variants')} ({variantFilters.length})
        </div>
      ),
      key: 'variantFilters',
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
                <PopoverContentLink
                  to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
                  title={intl.get('screen.dashboard.cards.savedFilters.popoverContentLink')}
                />
                .
              </Text>
            ),
          }}
        />
      }
      // @ts-ignore
      content={
        <Tabs
          className={cx(styles.setTabs, 'navNoMarginBtm')}
          defaultActiveKey="dataExplorationFilters"
          data-cy="SavedFilters"
          items={items}
        />
      }
    />
  );
};

export default SavedFilters;
