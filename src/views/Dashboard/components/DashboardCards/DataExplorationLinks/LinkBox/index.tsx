import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import MultiLabel, {
  MultiLabelIconPositionEnum,
} from '@ferlab/ui/core/components/labels/MultiLabel';
import { Space } from 'antd';

import styles from './index.module.css';

interface OwnProps {
  multiLabelClassName?: string;
  icon: React.ReactNode;
  label: string | number;
  subLabel: string;
  href: string;
}

const LinkBox = ({ multiLabelClassName = '', label, subLabel, icon, href }: OwnProps) => (
  <Link to={href} className={styles.dataExploBox}>
    <Space direction="horizontal" size={16} align="start">
      <MultiLabel
        iconPosition={MultiLabelIconPositionEnum.Top}
        label={label}
        Icon={icon}
        className={multiLabelClassName}
        subLabel={subLabel}
      />
      <ArrowRightOutlined className={styles.linkArrow} />
    </Space>
  </Link>
);

export default LinkBox;
