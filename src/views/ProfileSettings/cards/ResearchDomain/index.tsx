import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Checkbox, Form, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import { IOption } from 'services/api/user/models';
import { useUser } from 'store/user';
import { updateUser } from 'store/user/thunks';

import BaseCard from '../BaseCard';
import BaseForm from '../BaseForm';
import { sortOptionsLabelsByName } from '../utils';

import formStyles from '../form.module.css';

enum FORM_FIELDS {
  RESEARCH_DOMAIN = 'research_domain',
}

const initialChangedValues = {
  [FORM_FIELDS.RESEARCH_DOMAIN]: false,
};

const ResearchDomain = ({ researchDomainOptions }: { researchDomainOptions: IOption[] }) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const [hasChanged, setHasChanged] = useState<Record<FORM_FIELDS, boolean>>(initialChangedValues);
  const initialValues = useRef<Record<FORM_FIELDS, any>>();

  const isValueChanged = () => Object.values(hasChanged).some((val) => val);

  const onDiscardChanges = () => {
    setHasChanged(initialChangedValues);
    form.setFieldsValue(initialValues.current);
  };

  const researchDomainOptionsSorted = sortOptionsLabelsByName(
    researchDomainOptions,
    'researchDomainOptions',
  );

  useEffect(() => {
    initialValues.current = {
      [FORM_FIELDS.RESEARCH_DOMAIN]: userInfo?.research_domains ?? [],
    };
    form.setFieldsValue(initialValues.current);
    setHasChanged(initialChangedValues);
  }, [form, researchDomainOptions, userInfo]);

  return (
    <BaseCard
      form={form}
      title={intl.get('screen.profileSettings.cards.researchDomain.title')}
      isValueChanged={isValueChanged()}
      onDiscardChanges={onDiscardChanges}
    >
      <BaseForm
        form={form}
        onHasChanged={setHasChanged}
        initialValues={initialValues}
        hasChangedInitialValue={hasChanged}
        onFinish={(values: any) => {
          const research_domains = values[FORM_FIELDS.RESEARCH_DOMAIN];
          dispatch(updateUser({ data: { research_domains } }));
        }}
      >
        <Form.Item
          className={formStyles.withCustomHelp}
          name={FORM_FIELDS.RESEARCH_DOMAIN}
          label={intl.get('screen.profileSettings.cards.researchDomain.label')}
          required={false}
          rules={[{ required: true }]}
        >
          <Checkbox.Group className={formStyles.checkBoxGroup}>
            <span className={formStyles.help}>
              {intl.get('screen.profileSettings.cards.researchDomain.checkAll')}
            </span>
            <Space direction="vertical">
              {researchDomainOptionsSorted.map((option) => (
                <Checkbox key={option.value} value={option.value}>
                  {option.label}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Form.Item>
      </BaseForm>
    </BaseCard>
  );
};

export default ResearchDomain;
