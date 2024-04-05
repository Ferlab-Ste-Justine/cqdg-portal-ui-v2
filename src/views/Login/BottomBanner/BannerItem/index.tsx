import React, { ComponentType } from 'react';
import ExternalLinkIcon from '@ferlab/ui/core/components/ExternalLink/ExternalLinkIcon';
import { IIconProps } from '@ferlab/ui/core/components/Icons/type';
import { Button } from 'antd';

import TextIcon from '../../TextIcon';

import styles from './index.module.scss';

type BannerItemProps = {
  IconComponent: ComponentType<IIconProps>;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
};
const BannerItem = ({
  IconComponent,
  title,
  description,
  buttonText,
  buttonUrl,
}: BannerItemProps) => (
  <div className={styles.container}>
    <TextIcon IconComponent={IconComponent} title={title} size="medium" />
    <div className={styles.text}>{description}</div>
    <div>
      <Button ghost type="default" size="large" href={buttonUrl}>
        {buttonText}
        <ExternalLinkIcon height="14" width="14" />
      </Button>
    </div>
  </div>
);

export default BannerItem;
