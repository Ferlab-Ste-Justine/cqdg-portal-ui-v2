import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { List, Typography } from 'antd';
import CardErrorPlaceholder from 'views/Dashboard/components/CardErrorPlaceHolder';
import CardHeader from 'views/Dashboard/components/CardHeader';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';

import PopoverContentLink from 'components/uiKit/PopoverContentLink';
import { TUserSavedFilter } from 'services/api/savedFilter/models';
import { SUPPORT_EMAIL } from 'store/report/thunks';
import { useSavedFilter } from 'store/savedFilter';
import { STATIC_ROUTES } from 'utils/routes';

import SavedFiltersListItem from './ListItem';

import styles from './index.module.scss';

const { Text } = Typography;

const SavedFilters = ({ id, key, className = '' }: DashboardCardProps) => {
  const { savedFilters, isLoading, fetchingError } = useSavedFilter();

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
      content={
        <List<TUserSavedFilter>
          className={styles.savedFiltersList}
          key="2"
          bordered
          locale={{
            emptyText: fetchingError ? (
              <CardErrorPlaceholder
                title="Failed to Fetch Saved Filters"
                subTitle={
                  <Text>
                    Please refresh and try again or{' '}
                    <ExternalLink href={`mailto:${SUPPORT_EMAIL}`}>
                      <Text>contact our support</Text>
                    </ExternalLink>
                    .
                  </Text>
                }
              />
            ) : (
              <Empty
                imageType="grid"
                description={intl.get('screen.dashboard.cards.savedFilters.noSavedFilters')}
              />
            ),
          }}
          dataSource={fetchingError ? [] : savedFilters}
          loading={isLoading}
          renderItem={(item) => <SavedFiltersListItem id={item.id} data={item} />}
        />
      }
    />
  );
};

export default SavedFilters;
