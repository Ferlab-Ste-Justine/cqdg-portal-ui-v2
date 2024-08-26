import { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import {
  ExperimentOutlined,
  FileTextOutlined,
  ReadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Button, Col, Row } from 'antd';
import EnvVariables from 'helpers/EnvVariables';
import CardHeader from 'views/Dashboard/components/CardHeader';

import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import { useGlobals } from 'store/global';
import { fetchStats } from 'store/global/thunks';
import { getDocLang } from 'utils/doc';
import { STATIC_ROUTES } from 'utils/routes';

import LinkBox from './LinkBox';

import styles from './index.module.css';

const DataExplorationLinks = () => {
  const dispatch = useDispatch();
  const { stats } = useGlobals();

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  const { studies = 0, participants = 0, samples = 0, fileSize = '' } = stats || {};

  return (
    <GridCard
      wrapperClassName={styles.dataExplorationLinksWrapper}
      title={
        <CardHeader
          id="data-exploration"
          title={intl.get('components.dataRelease.dataExploration')}
          extra={[
            <ExternalLink
              href={`${EnvVariables.configFor(
                'CQDG_DOCUMENTATION',
              )}/changelog/data-release-1${getDocLang()}`}
              key="data-release"
              data-cy="ExternalLink_DataRelease"
            >
              <Button type="link" className={styles.releaseNoteBtn}>
                {intl.get('components.dataRelease.dataReleaseLink')}
                <ExternalLinkIcon />
              </Button>
            </ExternalLink>,
          ]}
        />
      }
      className={styles.dataExplorationLinksCard}
      content={
        <Row gutter={[16, 16]}>
          <Col flex="auto" className={styles.customCol} data-cy="GridCard_Studies">
            <LinkBox
              href={STATIC_ROUTES.STUDIES}
              multiLabelClassName={styles.dataReleaseStatsLabel}
              label={numberFormat(studies)}
              subLabel={intl.get('entities.study.studies')}
              icon={<ReadOutlined className={styles.dataReleaseIcon} />}
            />
          </Col>
          <Col flex="auto" className={styles.customCol} data-cy="GridCard_Participants">
            <LinkBox
              href={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
              multiLabelClassName={styles.dataReleaseStatsLabel}
              label={numberFormat(participants)}
              subLabel={intl.get('entities.participant.participants')}
              icon={<UserOutlined className={styles.dataReleaseIcon} />}
            />
          </Col>
          <Col flex="auto" className={styles.customCol} data-cy="GridCard_Biospecimens">
            <LinkBox
              href={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
              multiLabelClassName={styles.dataReleaseStatsLabel}
              label={numberFormat(samples)}
              subLabel={intl.get('entities.biospecimen.biospecimens')}
              icon={<ExperimentOutlined className={styles.dataReleaseIcon} />}
            />
          </Col>
          <Col flex="auto" className={styles.customCol} data-cy="GridCard_DataFiles">
            <LinkBox
              href={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
              multiLabelClassName={styles.dataReleaseStatsLabel}
              label={fileSize}
              subLabel={intl.get('entities.file.datafiles')}
              icon={<FileTextOutlined className={styles.dataReleaseIcon} />}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default DataExplorationLinks;
