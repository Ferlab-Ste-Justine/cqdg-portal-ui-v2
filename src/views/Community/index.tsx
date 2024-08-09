import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import TableHeader from '@ferlab/ui/core/components/ProTable/Header';
import { List, Space, Typography } from 'antd';
import debounce from 'lodash/debounce';

import { MAIN_SCROLL_WRAPPER_ID } from 'common/constants';
import { ISearchParams, UserApi } from 'services/api/user';
import { TUser } from 'services/api/user/models';
import { scrollToTop } from 'utils/helper';
import { getProTableDictionary } from 'utils/translation';

import FiltersBox from './components/Filters/Box';
import { getSortItems } from './components/Filters/Sorter';
import MemberCard from './components/MemberCard';

import styles from './index.module.css';

const { Title } = Typography;
const DEFAULT_PAGE_SIZE = 25;

const CommunityPage = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState('');
  const [researchDomainFilter, setResearchDomainFilter] = useState('');
  const sortItems = getSortItems();
  const defaultActiveFilter: ISearchParams = {
    pageIndex: 0,
    sort: sortItems[0].sort,
    match: '',
  };
  const [activeFilter, setActiveFilter] = useState<ISearchParams>(defaultActiveFilter);
  const onMatchFilterChange = (match: string) => setActiveFilter({ ...defaultActiveFilter, match });
  const onSortChange = (sort: string) => setActiveFilter({ ...defaultActiveFilter, sort });
  const setCurrentPage = (pageIndex: number) => setActiveFilter({ ...activeFilter, pageIndex });

  useEffect(() => {
    setIsLoading(true);
    UserApi.search({
      pageIndex: activeFilter.pageIndex,
      pageSize: DEFAULT_PAGE_SIZE,
      match: activeFilter.match,
      sort: activeFilter.sort,
      roles: roleFilter,
      researchDomains: researchDomainFilter,
    }).then(({ data }) => {
      setUsers(data?.users || []);
      setCount(data?.total || 0);
      setIsLoading(false);
    });
  }, [roleFilter, researchDomainFilter, activeFilter]);

  return (
    <Space direction="vertical" size={24} className={styles.communityWrapper}>
      <Title className={styles.title} level={4} data-cy="Title_Community">
        {intl.get('screen.community.title')}
      </Title>
      <FiltersBox
        onMatchFilterChange={debounce((match) => onMatchFilterChange(match), 300)}
        onRoleFilterChange={setRoleFilter}
        onResearchDomainFilterChange={setResearchDomainFilter}
        onSortChange={onSortChange}
        hasFilters={!!(roleFilter || researchDomainFilter)}
      />
      <Space className={styles.usersListWrapper} size={24} direction="vertical">
        <TableHeader
          pageIndex={(activeFilter.pageIndex || 0) + 1}
          pageSize={DEFAULT_PAGE_SIZE}
          total={count}
          dictionary={getProTableDictionary()}
        />
        <List
          grid={{
            gutter: 24,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={users}
          className={styles.membersList}
          pagination={{
            total: count,
            current: (activeFilter.pageIndex || 0) + 1,
            pageSize: DEFAULT_PAGE_SIZE,
            onChange: (page) => {
              setCurrentPage(page - 1);
              scrollToTop(MAIN_SCROLL_WRAPPER_ID);
            },
            size: 'small',
            hideOnSinglePage: true,
            showSizeChanger: false,
          }}
          loading={isLoading}
          locale={{ emptyText: ' ' }}
          renderItem={(item) => (
            <List.Item className={styles.memberListItem}>
              <MemberCard user={item} match={activeFilter.match || ''} />
            </List.Item>
          )}
        />
      </Space>
    </Space>
  );
};

export default CommunityPage;
