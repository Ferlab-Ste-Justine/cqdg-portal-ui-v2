import { ReactNode } from 'react';
import { Space, Tooltip, Typography } from 'antd';

import styles from './index.module.scss';

const { Text } = Typography;

interface ISelectItemProps {
  icon?: ReactNode;
  title: ReactNode;
  caption?: ReactNode;
}

const SelectItem = ({ icon, title, caption }: ISelectItemProps) => (
  <Tooltip title={caption} color="white">
    <Space size={10} align="start">
      {icon ? <div className={styles.iconWrapper}>{icon}</div> : undefined}
      <Space direction="vertical" size={0}>
        {title}
        <Text type="secondary">{caption}</Text>
      </Space>
    </Space>
  </Tooltip>
);

export default SelectItem;
