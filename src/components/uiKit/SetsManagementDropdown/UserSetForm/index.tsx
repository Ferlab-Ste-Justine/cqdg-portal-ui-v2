import intl from 'react-intl-universal';
import { UserOutlined } from '@ant-design/icons';
import { Col, Form, Row, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';

import styles from 'components/uiKit/SetsManagementDropdown/UserSetForm/index.module.scss';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';

type OwnProps = {
  formName: string;
  userSets: IUserSetOutput[];
  onFinish: (values: Store) => void;
  onSelectionChange: (values: string) => void;
  form: FormInstance;
  type: SetType;
};

const UserSetsForm = ({
  form,
  formName,
  userSets,
  onFinish,
  onSelectionChange,
  type,
}: OwnProps) => (
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
                <UserOutlined />
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
