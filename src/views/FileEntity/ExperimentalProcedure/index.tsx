import intl from 'react-intl-universal';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import { Card, Descriptions } from 'antd';
import { IFileEntity } from 'graphql/files/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from './index.module.scss';

interface IExperimentalProcedureProps {
  file?: IFileEntity;
  loading: boolean;
  id: string;
}

const ExperimentalProcedure = ({ file, loading, id }: IExperimentalProcedureProps) => (
  <div id={id} className={styles.container}>
    <Collapse defaultActiveKey={['1']} className={styles.collapse} arrowIcon="caretFilled">
      <CollapsePanel
        header={intl.get('entities.file.experimentalProcedure')}
        key="1"
        className={styles.panel}
      >
        <Card loading={loading} className={styles.card}>
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item
              label={intl.get('entities.file.sequencing_experiment.experimental_strategy')}
            >
              {file?.sequencing_experiment?.experimental_strategy || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.get('entities.file.sequencing_experiment.type_of_sequencing')}
            >
              {file?.sequencing_experiment?.type_of_sequencing || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.sequencing_experiment.read_length')}>
              {file?.sequencing_experiment?.read_length || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.sequencing_experiment.platform')}>
              {file?.sequencing_experiment?.platform || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.sequencing_experiment.capture_kit')}>
              {file?.sequencing_experiment?.capture_kit || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.sequencing_experiment.sequencer_id')}>
              {file?.sequencing_experiment?.sequencer_id || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.sequencing_experiment.run_date')}>
              {file?.sequencing_experiment?.run_date || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.sequencing_experiment.run_name')}>
              {file?.sequencing_experiment?.run_name || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.sequencing_experiment.labAliquotID')}>
              {file?.sequencing_experiment?.labAliquotID || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </CollapsePanel>
    </Collapse>
  </div>
);

export default ExperimentalProcedure;
