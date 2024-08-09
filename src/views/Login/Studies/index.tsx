import React from 'react';
import intl from 'react-intl-universal';
import Studies from '@ferlab/ui/core/pages/LandingPage/Studies';

import CartageneLogo from 'components/assets/cartagene.png';
import { useGlobals } from 'store/global';

import styles from './index.module.css';

const studies = [
  { code: 'cartagene', logo: CartageneLogo },
  { code: 'dee' },
  { code: 'bacq' },
  { code: 'pragmatiq' },
  { code: 'neurodev' },
];

const formatStudies = () =>
  studies.map((study) => ({
    code: study.code,
    title: study.logo ? (
      <img src={study.logo} alt="Study Logo" className={styles.logo} />
    ) : (
      intl.get(`screen.loginPage.studies.${study.code}.title`)
    ),
    subtitle: intl.get(`screen.loginPage.studies.${study.code}.subtitle`),
    description: intl.getHTML(`screen.loginPage.studies.${study.code}.description`),
  }));

const StudiesSection = () => {
  const { stats } = useGlobals();
  const { studies = 0 } = stats || {};
  const formattedStudies = formatStudies();

  return (
    <div className={styles.container}>
      <Studies
        studiesCount={studies}
        studies={formattedStudies}
        dictionary={{
          title: intl.get('screen.loginPage.studies.title'),
          summary: intl.get('screen.loginPage.studies.summary'),
        }}
      />
    </div>
  );
};
export default StudiesSection;
