import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { Button, Input, Select, Space, Tag, Typography } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { sortOptionsLabelsByName } from 'views/ProfileSettings/cards/utils';

import useApi from 'hooks/useApi';
import { USERS_API_URL } from 'services/api/user';
import { IUserOptions } from 'services/api/user/models';

import Sorter from '../Sorter';

import styles from './index.module.scss';

interface IFiltersBoxProps {
  onMatchFilterChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onResearchDomainFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
  hasFilters: boolean;
}

const FiltersBox = ({
  onMatchFilterChange,
  onRoleFilterChange,
  onResearchDomainFilterChange,
  onSortChange,
  hasFilters = false,
}: IFiltersBoxProps) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [researchDomainFilter, setResearchDomainFilter] = useState<string[]>([]);

  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `${USERS_API_URL}/userOptions`,
  };

  const { result } = useApi<IUserOptions>({ config });
  const roleOptions = result?.roleOptions || [];
  const researchDomainOptions = result?.researchDomainOptions || [];

  const roleOptionsSorted = sortOptionsLabelsByName(roleOptions, 'roleOptions');
  const researchDomainOptionsSorted = sortOptionsLabelsByName(
    researchDomainOptions,
    'researchDomainOptions',
  );

  useEffect(() => onRoleFilterChange(roleFilter.join(',')), [onRoleFilterChange, roleFilter]);
  useEffect(
    () => onResearchDomainFilterChange(researchDomainFilter.join(',')),
    [onResearchDomainFilterChange, researchDomainFilter],
  );

  return (
    <Space direction="vertical" size={16} className={styles.filtersContainer}>
      <Space direction="vertical" className={styles.searchBarContainer}>
        <ProLabel title={intl.get('screen.community.search.barPlaceholder')} />
        <div className={styles.filterContentWrapper}>
          <Input
            onChange={(e) => onMatchFilterChange(e.currentTarget.value)}
            placeholder={intl.get('screen.community.search.inputPlaceholder')}
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
              onClear={() => setRoleFilter([])}
              placeholder={intl.get('screen.community.search.selectPlaceholder')}
              maxTagCount={1}
              value={roleFilter}
              onSelect={(value: string) => setRoleFilter([...roleFilter, value])}
              onDeselect={(value: string) =>
                setRoleFilter((prev) => prev.filter((val) => val !== value))
              }
              options={roleOptionsSorted}
              optionFilterProp="label"
              notFoundContent={intl.get('screen.community.search.noResult')}
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
            <ProLabel title={intl.get('screen.community.search.researchDomain')} />
            <Select
              className={styles.filterMultiSelect}
              mode="multiple"
              allowClear
              onClear={() => setResearchDomainFilter([])}
              placeholder={intl.get('screen.community.search.selectPlaceholder')}
              maxTagCount={1}
              value={researchDomainFilter}
              onSelect={(value: string) =>
                setResearchDomainFilter([...researchDomainFilter, value])
              }
              onDeselect={(value: string) =>
                setResearchDomainFilter((prev) => prev.filter((val) => val !== value))
              }
              options={researchDomainOptionsSorted}
              optionFilterProp="label"
              notFoundContent={intl.get('screen.community.search.noResult')}
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
              setResearchDomainFilter([]);
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
