import intl from 'react-intl-universal';
import { Typography } from 'antd';

const { Text } = Typography;

const EmptyMessage = () => (
  <Text type={'secondary'}>{intl.get('screen.variants.noDataVariant')}</Text>
);

export default EmptyMessage;
