import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { Button, Input, Select, Space, Tag, Typography } from 'antd';
import { roleOptions, usageOptions } from 'views/Community/contants';

import Sorter from '../Sorter';

import styles from './index.module.scss';

interface OwnProps {
  onMatchFilterChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onUsageFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
  hasFilters: boolean;
}

const FiltersBox = ({
  onMatchFilterChange,
  onRoleFilterChange,
  onUsageFilterChange,
  onSortChange,
  hasFilters = false,
}: OwnProps) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [usageFilter, setUsageFilter] = useState<string[]>([]);

  useEffect(() => onRoleFilterChange(roleFilter.join(',')), [roleFilter]);

  useEffect(() => onUsageFilterChange(usageFilter.join(',')), [usageFilter]);

  return (
    <Space direction="vertical" size={16} className={styles.filtersContainer}>
      <Space direction="vertical" className={styles.searchBarContainer}>
        <ProLabel title={intl.get('screen.community.search.barPlaceholder')} />
        <div className={styles.filterContentWrapper}>
          <Input
            onChange={(e) => onMatchFilterChange(e.currentTarget.value)}
            placeholder="e.g. Watson, Linda Crnic Institute"
          />
          <Button onClick={() => setFiltersVisible(!filtersVisible)}>
            {intl.get('screen.community.search.filters')}{' '}
            {filtersVisible ? <CaretUpFilled /> : <CaretDownFilled />}
          </Button>
          <Sorter onSortChange={onSortChange} />
        </div>
      </Space>
      {filtersVisible && (
        <Space className={styles.filterContentWrapper} size={16} align="end">
          <Space direction="vertical">
            <ProLabel title={intl.get('screen.community.search.role')} />
            <Select
              className={styles.filterMultiSelect}
              mode="multiple"
              allowClear
              placeholder={intl.get('screen.community.search.selectPlaceholder')}
              maxTagCount={1}
              value={roleFilter}
              onSelect={(value: string) => setRoleFilter([...roleFilter, value])}
              onDeselect={(value: string) =>
                setRoleFilter((prev) => prev.filter((val) => val !== value))
              }
              options={[
                ...roleOptions.map((option) => ({
                  label: option.label,
                  value: option.value,
                })),
                {
                  label: intl.get('global.other'),
                  value: 'other',
                },
              ]}
              tagRender={({ onClose, label }) => (
                <Tag
                  className={styles.filterTag}
                  closable
                  onClose={onClose}
                  style={{ marginRight: 3 }}
                >
                  <Typography.Text className={styles.filterTagText}>{label}</Typography.Text>
                </Tag>
              )}
            />
          </Space>
          <Space direction="vertical">
            <ProLabel title={intl.get('screen.community.search.dataUse')} />
            <Select
              className={styles.filterMultiSelect}
              mode="multiple"
              allowClear
              placeholder={intl.get('screen.community.search.selectPlaceholder')}
              maxTagCount={1}
              value={usageFilter}
              onSelect={(value: string) => setUsageFilter([...usageFilter, value])}
              onDeselect={(value: string) =>
                setUsageFilter((prev) => prev.filter((val) => val !== value))
              }
              options={[
                ...usageOptions.map((option) => ({
                  label: option.label,
                  value: option.value,
                })),
                {
                  label: intl.get('global.other'),
                  value: 'other',
                },
              ]}
              tagRender={({ onClose, label }) => (
                <Tag
                  className={styles.filterTag}
                  closable
                  onClose={onClose}
                  style={{ marginRight: 3 }}
                >
                  <Typography.Text className={styles.filterTagText}>{label}</Typography.Text>
                </Tag>
              )}
            />
          </Space>
          <Button
            disabled={!hasFilters}
            onClick={() => {
              setRoleFilter([]);
              setUsageFilter([]);
            }}
          >
            {intl.get('screen.community.search.clearFilters')}
          </Button>
        </Space>
      )}
    </Space>
  );
};

export default FiltersBox;
