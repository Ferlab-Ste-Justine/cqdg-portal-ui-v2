import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import cx from 'classnames';

import styles from '../index.module.css';

interface IHeaderLinkProps {
  className?: string;
  to: string | string[];
  title: string;
  currentPathName: string;
  icon?: React.ReactElement;
}

const isActive = (current: string, to: string | string[]) =>
  to instanceof Array ? to.includes(current) : current === to;

const HeaderLink = ({
  className = '',
  to,
  currentPathName,
  icon,
  title,
  ...props
}: IHeaderLinkProps) => (
  <Link className={styles.headerLink} to={to instanceof Array ? to[0] : to} {...props}>
    <Button
      className={cx(
        styles.headerBtn,
        className,
        isActive(currentPathName, to) ? styles.headerBtnActive : '',
      )}
      icon={icon}
      data-cy={`HeaderLink_${title}`}
    >
      {title}
    </Button>
  </Link>
);

export default HeaderLink;
