import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Checkbox, Form, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { researchDomainsOptions } from 'views/Community/contants';

import { useUser } from 'store/user';
import { updateUser } from 'store/user/thunks';
import { lowerAll } from 'utils/array';

import BaseCard from '../BaseCard';
import BaseForm from '../BaseForm';
import { OTHER_KEY, removeOtherKey } from '../utils';

import formStyles from '../form.module.scss';

enum FORM_FIELDS {
  RESEARCH_DOMAIN = 'research_domain',
  OTHER_RESEARCH_DOMAIN = 'other_research_domain',
}

const initialChangedValues = {
  [FORM_FIELDS.RESEARCH_DOMAIN]: false,
  [FORM_FIELDS.OTHER_RESEARCH_DOMAIN]: false,
};

const hasOtherResearchDomains = (userResearchDomains: string[]) =>
  userResearchDomains.filter(
    (item) =>
      !researchDomainsOptions.find(
        (defaultResearchDomains) =>
          defaultResearchDomains.value.toLowerCase() === item.toLowerCase(),
      ),
  );

const ResearchDomain = () => {
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

  useEffect(() => {
    initialValues.current = {
      [FORM_FIELDS.RESEARCH_DOMAIN]: hasOtherResearchDomains(
        lowerAll(userInfo?.research_domains ?? []),
      ).length
        ? [...lowerAll(userInfo?.research_domains ?? []), OTHER_KEY]
        : lowerAll(userInfo?.research_domains ?? []),
      [FORM_FIELDS.OTHER_RESEARCH_DOMAIN]: hasOtherResearchDomains(
        userInfo?.research_domains ?? [],
      )[0],
    };
    form.setFieldsValue(initialValues.current);
    setHasChanged(initialChangedValues);
  }, [form, userInfo]);

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
          const otherResearchDomains = hasOtherResearchDomains(values[FORM_FIELDS.RESEARCH_DOMAIN]);
          dispatch(
            updateUser({
              data: {
                research_domains: removeOtherKey(
                  values[FORM_FIELDS.RESEARCH_DOMAIN].filter(
                    (val: string) => !otherResearchDomains.includes(val),
                  ),
                  values[FORM_FIELDS.OTHER_RESEARCH_DOMAIN],
                ),
              },
            }),
          );
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
            <span className={formStyles.help}>Check all that apply</span>
            <Space direction="vertical">
              {researchDomainsOptions.map((option) => (
                <Checkbox key={option.key} value={option.value.toLowerCase()}>
                  {option.label}
                </Checkbox>
              ))}
              <Checkbox value={OTHER_KEY}>Other</Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>
      </BaseForm>
    </BaseCard>
  );
};

export default ResearchDomain;
