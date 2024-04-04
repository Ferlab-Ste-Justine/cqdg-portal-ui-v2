import React from 'react';
import intl from 'react-intl-universal';
import StudyIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/StudySpotIcon';

import { useGlobals } from 'store/global';

import TextIcon from '../../TextIcon';

import styles from './index.module.scss';

const Summary = () => {
  const { stats } = useGlobals();
  const { studies = 0 } = stats || {};
  return (
    <div className={styles.container}>
      <TextIcon
        IconComponent={StudyIcon}
        title={studies}
        subTitle={intl.get('screen.loginPage.studies.title')}
        size="large"
      />
      <div className={styles.description}>{intl.get('screen.loginPage.studies.summary')}</div>
    </div>
  );
};

export default Summary;
