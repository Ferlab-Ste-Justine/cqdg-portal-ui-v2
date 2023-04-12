import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Checkbox, Form, Input, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import cx from 'classnames';
import { roleOptions } from 'views/Community/contants';

import { useUser } from 'store/user';
import { updateUser } from 'store/user/thunks';
import { lowerAll } from 'utils/array';

import BaseCard from '../BaseCard';
import BaseForm from '../BaseForm';
import { OTHER_KEY, removeOtherKey } from '../utils';

import formStyles from '../form.module.scss';

enum FORM_FIELDS {
  ROLES = 'roles',
  OTHER_ROLE = 'other_role',
  AFFILIATION = 'affiliation',
  NO_AFFILIATION = 'no_affiliation',
  RESEARCH_AREA = 'reasearch_area',
}

const hasOtherRole = (userUsages: string[]) =>
  userUsages.filter(
    (usage) =>
      !roleOptions.find((roleOption) => roleOption.value.toLowerCase() === usage.toLowerCase()),
  );

const initialChangedValues = {
  [FORM_FIELDS.ROLES]: false,
  [FORM_FIELDS.OTHER_ROLE]: false,
  [FORM_FIELDS.AFFILIATION]: false,
  [FORM_FIELDS.NO_AFFILIATION]: false,
  [FORM_FIELDS.RESEARCH_AREA]: false,
};

const RoleAndAffiliationCard = () => {
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
      [FORM_FIELDS.ROLES]: hasOtherRole(lowerAll(userInfo?.roles ?? [])).length
        ? [...lowerAll(userInfo?.roles ?? []), OTHER_KEY]
        : lowerAll(userInfo?.roles ?? []),
      [FORM_FIELDS.OTHER_ROLE]: hasOtherRole(userInfo?.roles ?? [])[0],
      [FORM_FIELDS.AFFILIATION]: userInfo?.affiliation,
      [FORM_FIELDS.NO_AFFILIATION]: !userInfo?.affiliation,
      [FORM_FIELDS.RESEARCH_AREA]: userInfo?.research_area || '',
    };
    form.setFieldsValue(initialValues.current);
    setHasChanged(initialChangedValues);
  }, [form, userInfo]);

  return (
    <BaseCard
      form={form}
      title={intl.get('screen.profileSettings.cards.roleAffiliation.title')}
      isValueChanged={isValueChanged()}
      onDiscardChanges={onDiscardChanges}
    >
      <BaseForm
        form={form}
        onHasChanged={setHasChanged}
        initialValues={initialValues}
        hasChangedInitialValue={hasChanged}
        onFinish={(values: any) => {
          const otherRole = hasOtherRole(values[FORM_FIELDS.ROLES]);
          dispatch(
            updateUser({
              data: {
                roles: removeOtherKey(
                  values[FORM_FIELDS.ROLES].filter((val: string) => !otherRole.includes(val)),
                  values[FORM_FIELDS.OTHER_ROLE],
                ),
                affiliation: values[FORM_FIELDS.NO_AFFILIATION]
                  ? ''
                  : values[FORM_FIELDS.AFFILIATION],
                research_area: values[FORM_FIELDS.RESEARCH_AREA],
              },
            }),
          );
        }}
      >
        <Form.Item
          className={formStyles.withCustomHelp}
          name={FORM_FIELDS.ROLES}
          label={intl.get('screen.profileSettings.cards.roleAffiliation.iama')}
          required={false}
          rules={[{ required: true }]}
        >
          <Checkbox.Group className={formStyles.checkBoxGroup}>
            <span className={formStyles.help}>
              {intl.get('screen.profileSettings.cards.roleAffiliation.checkAllThatApply')}
            </span>
            <Space direction="vertical">
              {roleOptions.map((option, index) => (
                <Checkbox key={index} value={option.value.toLowerCase()}>
                  {option.label}
                </Checkbox>
              ))}
              <Checkbox value={OTHER_KEY}>{intl.get('global.other')}</Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues[FORM_FIELDS.ROLES] !== currentValues[FORM_FIELDS.ROLES]
          }
        >
          {({ getFieldValue }) =>
            getFieldValue(FORM_FIELDS.ROLES)?.includes(OTHER_KEY) ? (
              <Form.Item
                className={formStyles.dynamicField}
                name={FORM_FIELDS.OTHER_ROLE}
                label={intl.get('global.pleaseDescribe')}
                required={false}
                rules={[{ required: true, validateTrigger: 'onSubmit' }]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues[FORM_FIELDS.NO_AFFILIATION] !== currentValues[FORM_FIELDS.NO_AFFILIATION]
          }
        >
          {({ getFieldValue }) =>
            !getFieldValue(FORM_FIELDS.NO_AFFILIATION) ? (
              <Form.Item
                className={cx(formStyles.withCustomHelp, formStyles.affiliationField)}
                label={intl.get('screen.profileSettings.cards.roleAffiliation.affiliatedWith')}
              >
                <span className={formStyles.help}>
                  {intl.get('screen.profileSettings.cards.roleAffiliation.provideAffiliation')}
                </span>
                <Form.Item
                  name={FORM_FIELDS.AFFILIATION}
                  className={formStyles.noMargin}
                  required={false}
                  rules={[{ required: true, validateTrigger: 'onSubmit' }]}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues[FORM_FIELDS.NO_AFFILIATION] !== currentValues[FORM_FIELDS.NO_AFFILIATION]
          }
        >
          {() => (
            <Form.Item
              name={FORM_FIELDS.NO_AFFILIATION}
              label={
                form.getFieldValue(FORM_FIELDS.NO_AFFILIATION)
                  ? intl.get('screen.profileSettings.cards.roleAffiliation.affiliatedWith')
                  : ''
              }
              className={cx(
                formStyles.withCustomHelp,
                form.getFieldValue(FORM_FIELDS.NO_AFFILIATION) && formStyles.noAffiliationField,
              )}
              rules={[{ required: false }]}
              valuePropName="checked"
            >
              <Checkbox>
                {intl.get('screen.profileSettings.cards.roleAffiliation.dontHaveAffiliation')}
              </Checkbox>
            </Form.Item>
          )}
        </Form.Item>
        <Form.Item
          className={cx(
            formStyles.withCustomHelp,
            formStyles.researchAreaField,
            formStyles.noMargin,
          )}
          label={intl.get('screen.profileSettings.cards.roleAffiliation.describeResearchArea')}
          requiredMark="optional"
        >
          <span className={formStyles.help}>
            {intl.get('screen.profileSettings.cards.roleAffiliation.provideABriefLink')}
          </span>
          <Form.Item name={FORM_FIELDS.RESEARCH_AREA} className={formStyles.noMargin}>
            <Input.TextArea />
          </Form.Item>
        </Form.Item>
      </BaseForm>
    </BaseCard>
  );
};

export default RoleAndAffiliationCard;
