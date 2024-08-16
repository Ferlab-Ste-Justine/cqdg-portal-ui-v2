import intl from 'react-intl-universal';
import { ExperimentOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Form, Row, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';

import LineStyleIcon from 'components/Icons/LineStyleIcon';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';

import styles from './index.module.css';

const UserSetsFormIcon = ({ type }: { type: SetType }) => {
  switch (type) {
    case SetType.PARTICIPANT:
      return <UserOutlined />;
    case SetType.FILE:
      return <FileTextOutlined />;
    case SetType.BIOSPECIMEN:
      return <ExperimentOutlined />;
    case SetType.VARIANT:
      return <LineStyleIcon height={16} className={styles.iconSvg} />;
    default:
      return <UserOutlined />;
  }
};

interface IUserSetsFormProps {
  formName: string;
  userSets: IUserSetOutput[];
  onFinish: (values: Store) => void;
  onSelectionChange: (values: string) => void;
  form: FormInstance;
  type: SetType;
}

const UserSetsForm = ({
  form,
  formName,
  userSets,
  onFinish,
  onSelectionChange,
  type,
}: IUserSetsFormProps) => (
  <Form form={form} name={formName} onFinish={onFinish} layout="vertical">
    <Form.Item
      label={`${type} ${intl.get('screen.dataExploration.set')}`}
      name="setId"
      className={styles.setEditFormItem}
    >
      <Select
        placeholder={intl.get('screen.dataExploration.chooseSet')}
        onSelect={(value: string) => onSelectionChange(value)}
      >
        {userSets.map((s: IUserSetOutput) => (
          <Select.Option key={s.id} value={s.id}>
            <Row>
              <Col style={{ paddingRight: 15 }}>{s.tag}</Col>
              <Col style={{ paddingRight: 2 }}>
                <UserSetsFormIcon type={type} />
              </Col>
              <Col>
                <div className={'secondary-text-color'}>{s.size}</div>
              </Col>
            </Row>
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  </Form>
);

export default UserSetsForm;
