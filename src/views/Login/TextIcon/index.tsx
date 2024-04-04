import React, { ComponentType, ReactNode } from 'react';
import { IIconProps } from '@ferlab/ui/core/components/Icons/type';

import styles from './index.module.scss';

type RenderIconProps = {
  IconComponent: ComponentType<IIconProps>;
  title?: ReactNode;
  subTitle?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: 'light' | 'dark';
};

const TextIcon = ({
  IconComponent,
  title,
  subTitle,
  size = 'small',
  color = 'light',
}: RenderIconProps) => (
  <div className={`${styles[size]} ${styles[color]}`}>
    <div className={styles.layout}>
      <IconComponent className={styles.icon} spotClassName={styles.iconSpot} />
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
      </div>
    </div>
  </div>
);

export default TextIcon;
