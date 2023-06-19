import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import TableHeader from '@ferlab/ui/core/components/ProTable/Header';
import useDebounce from '@ferlab/ui/core/hooks/useDebounce';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { List, Space, Typography } from 'antd';

import { MAIN_SCROLL_WRAPPER_ID } from 'common/constants';
import { UserApi } from 'services/api/user';
import { TUser } from 'services/api/user/models';
import { scrollToTop } from 'utils/helper';

import FiltersBox from './components/Filters/Box';
import { getSortItems } from './components/Filters/Sorter';
import MemberCard from './components/MemberCard';

import styles from './index.module.scss';

const { Title } = Typography;
const DEFAULT_PAGE_SIZE = 25;

const CommunityPage = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [match, setMatch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [researchDomainFilter, setResearchDomainFilter] = useState('');
  const sortItems = getSortItems();
  const [sort, setSort] = useState(sortItems[0].sort);
  const debouncedMatchValue = useDebounce(match, 300);

  useEffect(() => {
    setIsLoading(true);
    UserApi.search({
      pageIndex: currentPage,
      pageSize: DEFAULT_PAGE_SIZE,
      match,
      sort,
      roles: roleFilter,
      researchDomains: researchDomainFilter,
    }).then(({ data }) => {
      setUsers(data?.users || []);
      setCount(data?.total || 0);
      setIsLoading(false);
    });
  }, [currentPage, sort, debouncedMatchValue, roleFilter, match, researchDomainFilter]);

  return (
    <Space direction="vertical" size={24} className={styles.communityWrapper}>
      <Title className={styles.title} level={4}>
        {intl.get('screen.community.title')}
      </Title>
      <FiltersBox
        onMatchFilterChange={setMatch}
        onRoleFilterChange={setRoleFilter}
        onResearchDomainFilterChange={setResearchDomainFilter}
        onSortChange={setSort}
        hasFilters={!!(roleFilter || researchDomainFilter)}
      />
      <Space className={styles.usersListWrapper} size={24} direction="vertical">
        <TableHeader
          pageIndex={currentPage + 1}
          pageSize={DEFAULT_PAGE_SIZE}
          total={count}
          dictionary={{
            itemCount: {
              results: intl.get('screen.community.resultsMember'),
              noResults: intl.get('screen.community.noMember'),
              clear: '',
              of: '',
              selectAllResults: '',
              selected: '',
              selectedPlural: '',
            },
            numberFormat: numberFormat,
          }}
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
              <MemberCard user={item} match={match} />
            </List.Item>
          )}
        />
      </Space>
    </Space>
  );
};

export default CommunityPage;
