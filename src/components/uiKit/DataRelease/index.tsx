import { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import {
  ExperimentOutlined,
  FileTextOutlined,
  ReadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import MultiLabel, {
  MultiLabelIconPositionEnum,
} from '@ferlab/ui/core/components/labels/MultiLabel';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Col, Row, Spin } from 'antd';
import cx from 'classnames';

import styles from 'components/uiKit/DataRelease/index.module.scss';
import { useGlobals } from 'store/global';
import { fetchStats } from 'store/global/thunks';

interface IDataReleaseProps {
  className?: string;
}

const DataRelease = ({ className = '' }: IDataReleaseProps) => {
  const dispatch = useDispatch();
  const { stats } = useGlobals();

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <Spin spinning={false}>
      <Row className={cx(styles.dataReleaseContainer, className)} gutter={[40, 24]}>
        <Col xs={12} md={6}>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(stats?.studies!)}
            Icon={<ReadOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('components.dataRelease.studies')}
          />
        </Col>
        <Col xs={12} md={6}>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(stats?.participants!)}
            Icon={<UserOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('components.dataRelease.participants')}
          />
        </Col>
        <Col xs={12} md={6}>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(stats?.samples!)}
            Icon={<ExperimentOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('components.dataRelease.biospecimens')}
          />
        </Col>
        <Col xs={12} md={6}>
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={stats?.fileSize || '0TB'}
            Icon={<FileTextOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('components.dataRelease.datafiles')}
          />
        </Col>
      </Row>
    </Spin>
  );
};

export default DataRelease;
