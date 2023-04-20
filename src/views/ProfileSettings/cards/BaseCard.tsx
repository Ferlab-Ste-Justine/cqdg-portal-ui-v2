import { PropsWithChildren } from 'react';
import intl from 'react-intl-universal';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Button, FormInstance, Space, Typography } from 'antd';

interface OwnProps {
  title: string;
  form: FormInstance;
  isValueChanged: boolean;
  onDiscardChanges: () => void;
}

const { Title } = Typography;

const BaseCard = ({
  title,
  isValueChanged,
  form,
  onDiscardChanges,
  children,
}: PropsWithChildren<OwnProps>) => (
  <GridCard
    title={<Title level={4}>{title}</Title>}
    footer={
      <Space>
        <Button type="primary" disabled={!isValueChanged} onClick={form.submit}>
          {intl.get('screen.profileSettings.cards.saveChanges')}
        </Button>
        {isValueChanged && (
          <Button type="text" onClick={onDiscardChanges}>
            {intl.get('screen.profileSettings.cards.discardChanges')}
          </Button>
        )}
      </Space>
    }
    content={children}
  />
);

export default BaseCard;
