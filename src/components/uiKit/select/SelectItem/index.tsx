import { ReactNode } from 'react';
import { Space, Tooltip, Typography } from 'antd';

import styles from './index.module.scss';

const { Text } = Typography;

interface ISelectItemProps {
  icon?: ReactNode;
  title: ReactNode;
  caption?: ReactNode;
  isTooltip?: boolean;
  isEllipsis?: boolean;
}

const SelectItem = ({ icon, title, caption, isEllipsis }: ISelectItemProps) => (
  <Space size={10} align="start">
    {icon && <div className={styles.iconWrapper}>{icon}</div>}
    <Space direction="vertical" size={0}>
      {title}
      <Text
        type="secondary"
        ellipsis={isEllipsis}
        className={isEllipsis ? styles.textEllipsis : ''}
      >
        {caption}
      </Text>
    </Space>
  </Space>
);

export const SelectItemTooltipWrapper = ({ icon, title, caption, isTooltip }: ISelectItemProps) =>
  isTooltip ? (
    <Tooltip title={caption} placement="bottom">
      {/** Tooltip bug, needs empty div here */}
      <div>
        <SelectItem icon={icon} title={title} caption={caption} isEllipsis />
      </div>
    </Tooltip>
  ) : (
    <SelectItem icon={icon} title={title} caption={caption} />
  );

export default SelectItemTooltipWrapper;
