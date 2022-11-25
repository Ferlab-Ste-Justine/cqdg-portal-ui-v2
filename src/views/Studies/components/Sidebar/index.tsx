import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { Spin } from 'antd';
import cx from 'classnames';
import { Aggregations } from 'graphql/models';
import { ExtendedMappingResults } from 'graphql/models';

import SidebarFilters from './Filter';

import styles from './index.module.scss';

export type SidebarData = {
  queryBuilderId: string;
  aggregations: Aggregations;
  extendedMapping: ExtendedMappingResults;
  isLoading?: boolean;
};

type StudiesSidebarProps = SidebarData & {
  filters: ISqonGroupFilter;
};

const StudiesSidebar = ({
  queryBuilderId,
  aggregations,
  extendedMapping,
  isLoading = false,
}: StudiesSidebarProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Spin className={styles.loader} spinning={isLoading}>
      <div className={cx(styles.siderContainer, collapsed ? styles.collapsed : '')}>
        {collapsed ? (
          <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
        ) : (
          <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
        )}
        <ScrollContent className={cx(styles.scrollWrapper, collapsed ? styles.collapsed : '')}>
          <SidebarFilters
            queryBuilderId={queryBuilderId}
            aggregations={aggregations}
            extendedMapping={extendedMapping}
          />
        </ScrollContent>
      </div>
    </Spin>
  );
};

export default StudiesSidebar;
