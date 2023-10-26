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

  const {
    studies = 0,
    participants = 0,
    samples = 0,
    // fileSize = '',
  } = stats || {};

  //todo: Change after CAG implementation, temporarily added for CQDG-434
  const cagFilesCount = 2183;
  const totalFileSize = '11.3TB';

  return (
    <Spin spinning={false}>
      <Row className={cx(styles.dataReleaseContainer, className)} gutter={[40, 24]}>
        <Col xs={12} md={6} data-cy="DataRelease_Study">
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(studies)}
            Icon={<ReadOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('entities.study.studies')}
          />
        </Col>
        <Col xs={12} md={6} data-cy="DataRelease_Participant">
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(participants + cagFilesCount)}
            Icon={<UserOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('entities.participant.participants')}
          />
        </Col>
        <Col xs={12} md={6} data-cy="DataRelease_Biospecimen">
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={numberFormat(samples + cagFilesCount)}
            Icon={<ExperimentOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('entities.biospecimen.biospecimens')}
          />
        </Col>
        <Col xs={12} md={6} data-cy="DataRelease_File">
          <MultiLabel
            iconPosition={MultiLabelIconPositionEnum.Top}
            label={totalFileSize}
            Icon={<FileTextOutlined className={styles.dataReleaseIcon} />}
            className={styles.dataReleaseStatsLabel}
            subLabel={intl.get('entities.file.files')}
          />
        </Col>
      </Row>
    </Spin>
  );
};

export default DataRelease;
