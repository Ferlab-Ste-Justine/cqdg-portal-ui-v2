import React from 'react';
import intl from 'react-intl-universal';
import BiospecimenIcon from '@ferlab/ui/core/components/Icons/Futuro/BiospecimenIcon';
import ExomesIcon from '@ferlab/ui/core/components/Icons/Futuro/ExomesIcon';
import FileIcon from '@ferlab/ui/core/components/Icons/Futuro/FileIcon';
import GeneIcon from '@ferlab/ui/core/components/Icons/Futuro/GeneIcon';
import ParticipantIcon from '@ferlab/ui/core/components/Icons/Futuro/ParticipantIcon';
import StudyIcon from '@ferlab/ui/core/components/Icons/Futuro/StudyIcon';
import TextIcon from '@ferlab/ui/core/pages/LandingPage/TextIcon';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import GridCard from '@ferlab/ui/core/view/v2/GridCard/index';
import { Typography } from 'antd';

import { useGlobals } from 'store/global';

import styles from './index.module.css';

const { Title } = Typography;

const Stats = () => {
  const { stats } = useGlobals();
  const {
    studies = 0,
    participants = 0,
    samples = 0,
    fileSize = '',
    exomes = 0,
    genomes = 0,
  } = stats || {};

  return (
    <GridCard
      wrapperClassName={styles.wrapper}
      theme="shade"
      title={<Title level={4}>{intl.get('screen.loginPage.cards.stats.release')}</Title>}
      content={
        <div className={styles.cardContent}>
          <TextIcon
            color="dark"
            IconComponent={StudyIcon}
            title={numberFormat(studies)}
            subtitle={intl.get('entities.study.studies')}
          />
          <TextIcon
            color="dark"
            IconComponent={ParticipantIcon}
            title={numberFormat(participants)}
            subtitle={intl.get('entities.participant.participants')}
          />
          <TextIcon
            color="dark"
            IconComponent={BiospecimenIcon}
            title={numberFormat(samples)}
            subtitle={intl.get('entities.biospecimen.biospecimens')}
          />
          <TextIcon
            color="dark"
            IconComponent={FileIcon}
            title={fileSize}
            subtitle={intl.get('entities.file.files')}
          />
          <TextIcon
            color="dark"
            IconComponent={GeneIcon}
            title={numberFormat(genomes)}
            subtitle={intl.get('screen.loginPage.cards.stats.genomes')}
          />
          <TextIcon
            color="dark"
            IconComponent={ExomesIcon}
            title={numberFormat(exomes)}
            subtitle={intl.get('screen.loginPage.cards.stats.exomes')}
          />
        </div>
      }
    />
  );
};

export default Stats;
