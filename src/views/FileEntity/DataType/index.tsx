import intl from 'react-intl-universal';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import { Card, Descriptions } from 'antd';
import { IFileEntity } from 'graphql/files/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from './index.module.scss';

interface IDataTypeProps {
  file?: IFileEntity;
  loading: boolean;
  id: string;
}

const DataType = ({ file, loading, id }: IDataTypeProps) => (
  <div id={id} className={styles.container}>
    <Collapse defaultActiveKey={['1']} className={styles.collapse} arrowIcon="caretFilled">
      <CollapsePanel header={intl.get('entities.file.dataType')} key="1" className={styles.panel}>
        <Card loading={loading} className={styles.card}>
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label={intl.get('entities.file.data_category')}>
              {file?.data_category || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
            <Descriptions.Item label={intl.get('entities.file.data_type')}>
              {file?.data_type || TABLE_EMPTY_PLACE_HOLDER}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </CollapsePanel>
    </Collapse>
  </div>
);

export default DataType;
