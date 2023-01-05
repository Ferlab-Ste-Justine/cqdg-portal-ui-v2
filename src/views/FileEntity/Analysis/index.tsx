import intl from 'react-intl-universal';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import { Card, Descriptions, Typography } from 'antd';
import { IFileEntity } from 'graphql/files/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from './index.module.scss';

interface IAnalysisProps {
  file?: IFileEntity;
  loading: boolean;
  id: string;
}

const Analysis = ({ file, loading, id }: IAnalysisProps) => (
  <div id={id} className={styles.container}>
    <Typography.Title level={4} className={styles.title}>
      {intl.get('entities.file.analysis')}
    </Typography.Title>
    <Collapse defaultActiveKey={['1']} className={styles.collapse} arrowIcon="caretFilled">
      <CollapsePanel
        header={intl.get('entities.file.analysisProperties')}
        key="1"
        className={styles.panel}
      >
        <Card loading={loading} className={styles.card}>
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item
              label={intl.get('entities.file.sequencing_experiment.bio_informatic_analysis')}
            >
              {file?.sequencing_experiment?.bio_informatic_analysis || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.get('entities.file.sequencing_experiment.workflow_name')}
            >
              {file?.sequencing_experiment?.workflow_name || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.get('entities.file.sequencing_experiment.workflow_version')}
            >
              {file?.sequencing_experiment?.workflow_version || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.sequencing_experiment.genome_build')}>
              {file?.sequencing_experiment?.genome_build || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </CollapsePanel>
    </Collapse>
  </div>
);

export default Analysis;
