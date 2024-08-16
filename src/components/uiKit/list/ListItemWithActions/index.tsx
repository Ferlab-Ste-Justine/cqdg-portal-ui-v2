import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, List, Typography } from 'antd';
import cx from 'classnames';

import styles from './index.module.css';

interface OwnProps {
  onEditCb: () => void;
  onDeleteCb: () => void;
  extra?: ReactNode;
  className?: string;
  linkProps: {
    className?: string;
    to:
      | string
      | {
          pathname: string;
          search: string;
        };
    onClick?: (e: any) => void;
    content: ReactNode;
  };
  description?: ReactNode;
}

const { Text } = Typography;

const ListItemWithActions = ({
  onEditCb,
  onDeleteCb,
  className = '',
  extra,
  linkProps,
  description,
}: OwnProps) => {
  const { content: linkTitle, ...linkPropsRest } = linkProps;

  return (
    <List.Item
      className={cx(styles.listItemWithActions, 'with-action-on-hover', className)}
      actions={[
        <Button
          key={1}
          type="text"
          size="small"
          icon={<EditFilled />}
          onClick={onEditCb}
          className={styles.actionBtn}
        />,
        <Button
          key={2}
          className={styles.actionBtn}
          type="text"
          size="small"
          icon={<DeleteFilled />}
          onClick={onDeleteCb}
        />,
      ]}
      extra={extra && <div className={styles.extra}>{extra}</div>}
    >
      <List.Item.Meta
        title={
          <Link {...linkPropsRest} className={cx(styles.setLink, linkPropsRest.className)}>
            {linkTitle}
          </Link>
        }
        description={description && <Text type="secondary">{description}</Text>}
        className={styles.itemMeta}
      />
    </List.Item>
  );
};

export default ListItemWithActions;
