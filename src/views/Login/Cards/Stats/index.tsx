import React from 'react';
import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink/index';
import BiospecimenIcon from '@ferlab/ui/core/components/Icons/Futuro/BiospecimenIcon';
import ExomesIcon from '@ferlab/ui/core/components/Icons/Futuro/ExomesIcon';
import FileIcon from '@ferlab/ui/core/components/Icons/Futuro/FileIcon';
import GeneIcon from '@ferlab/ui/core/components/Icons/Futuro/GeneIcon';
import ParticipantIcon from '@ferlab/ui/core/components/Icons/Futuro/ParticipantIcon';
import StudyIcon from '@ferlab/ui/core/components/Icons/Futuro/StudyIcon';
import { Card } from 'antd';

import { useGlobals } from 'store/global';

import TextIcon from '../../TextIcon';

import styles from './index.module.scss';

// TODO: Changelog data, exomes, genomes
const Stats = () => {
  const { stats } = useGlobals();
  const { studies = 0, participants = 0, samples = 0, fileSize = '', variants = 0 } = stats || {};

  return (
    <div className={styles.cardContainer}>
      <Card
        title={
          <span className={styles.cardTitle}>
            {intl.get('screen.loginPage.cards.stats.release')}
          </span>
        }
        className={styles.card}
        extra={
          <ExternalLink href="https://docs.cqdg.ca/changelog" hasIcon>
            14 mars 2024
          </ExternalLink>
        }
      >
        <div className={styles.cardContent}>
          <TextIcon
            color="dark"
            IconComponent={StudyIcon}
            title={studies}
            subTitle={intl.get('screen.loginPage.cards.stats.studies')}
          />
          <TextIcon
            color="dark"
            IconComponent={ParticipantIcon}
            title={participants}
            subTitle={intl.get('screen.loginPage.cards.stats.participants')}
          />
          <TextIcon
            color="dark"
            IconComponent={BiospecimenIcon}
            title={samples}
            subTitle={intl.get('screen.loginPage.cards.stats.biospecimens')}
          />
          <TextIcon
            color="dark"
            IconComponent={FileIcon}
            title={fileSize}
            subTitle={intl.get('screen.loginPage.cards.stats.files')}
          />
          <TextIcon
            color="dark"
            IconComponent={GeneIcon}
            title={variants}
            subTitle={intl.get('screen.loginPage.cards.stats.genomes')}
          />
          <TextIcon
            color="dark"
            IconComponent={ExomesIcon}
            title={variants}
            subTitle={intl.get('screen.loginPage.cards.stats.exomes')}
          />
        </div>
      </Card>
    </div>
  );
};

export default Stats;
