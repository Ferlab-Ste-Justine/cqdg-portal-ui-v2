import { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { FileTextOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Button, Col, Row } from 'antd';
import CardHeader from 'views/Dashboard/components/CardHeader';

import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import { useGlobals } from 'store/global';
import { fetchStats } from 'store/global/thunks';
import { STATIC_ROUTES } from 'utils/routes';

import LinkBox from './LinkBox';

import styles from './index.module.scss';

const DataExplorationLinks = () => {
  const dispatch = useDispatch();
  const { stats } = useGlobals();

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <GridCard
      wrapperClassName={styles.dataExplorationLinksWrapper}
      title={
        <CardHeader
          id="data-exploration"
          title="Data Exploration"
          extra={[
            <ExternalLink href="" key="data-release">
              <Button type="link" className={styles.releaseNoteBtn}>
                Data release 1.0
                <ExternalLinkIcon />
              </Button>
            </ExternalLink>,
          ]}
        />
      }
      className={styles.dataExplorationLinksCard}
      content={
        <Row gutter={[16, 16]}>
          <Col flex="auto" className={styles.customCol}>
            <LinkBox
              href={STATIC_ROUTES.STUDIES}
              multiLabelClassName={styles.dataReleaseStatsLabel}
              label={numberFormat(stats?.studies!)}
              subLabel={intl.get('components.dataRelease.studies')}
              icon={<ReadOutlined className={styles.dataReleaseIcon} />}
            />
          </Col>
          <Col flex="auto" className={styles.customCol}>
            <LinkBox
              href={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
              multiLabelClassName={styles.dataReleaseStatsLabel}
              label={numberFormat(stats?.participants!)}
              subLabel={intl.get('components.dataRelease.participants')}
              icon={<UserOutlined className={styles.dataReleaseIcon} />}
            />
          </Col>
          <Col flex="auto" className={styles.customCol}>
            <LinkBox
              href={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
              multiLabelClassName={styles.dataReleaseStatsLabel}
              label={numberFormat(stats?.samples!)}
              subLabel={intl.get('components.dataRelease.biospecimens')}
              icon={<FileTextOutlined className={styles.dataReleaseIcon} />}
            />
          </Col>
          <Col flex="auto" className={styles.customCol}>
            <LinkBox
              href={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
              multiLabelClassName={styles.dataReleaseStatsLabel}
              label={stats?.fileSize || '0TB'}
              subLabel={intl.get('components.dataRelease.datafiles')}
              icon={<FileTextOutlined className={styles.dataReleaseIcon} />}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default DataExplorationLinks;
