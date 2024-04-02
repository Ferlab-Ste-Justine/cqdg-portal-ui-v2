import React from 'react';
import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Tooltip } from 'antd';
import { ageCategories } from 'graphql/participants/models';
import { extractNcitTissueTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { IProColumnExport } from 'common/types';

import styles from '../index.module.scss';

const getDiagnosesColumns = (): IProColumnExport[] => [
  {
    key: 'sample_id',
    dataIndex: 'sample_id',
    title: intl.get('entities.biospecimen.sample'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sample_type',
    dataIndex: 'sample_type',
    title: intl.get('entities.biospecimen.sample_type'),
    render: (sample_type: string) => {
      if (!sample_type) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(sample_type);
      return (
        <>
          {title} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'biospecimen_tissue_source',
    dataIndex: 'biospecimen_tissue_source',
    title: intl.get('entities.biospecimen.biospecimen_tissue_source'),
    render: (biospecimen_tissue_source: string) => {
      if (!biospecimen_tissue_source) return TABLE_EMPTY_PLACE_HOLDER;
      if (biospecimen_tissue_source === 'Unknown') return intl.get('global.unknown');
      const { code, title } = extractNcitTissueTitleAndCode(biospecimen_tissue_source);
      return (
        <>
          {title} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'biospecimen_id',
    dataIndex: 'biospecimen_id',
    title: intl.get('entities.biospecimen.biospecimen'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_biospecimen_collection',
    dataIndex: 'age_biospecimen_collection',
    title: intl.get('entities.biospecimen.age'),
    popoverProps: {
      title: <b>{intl.get('entities.biospecimen.age_biospecimen_collection')}</b>,
      content: ageCategories.map((category) => (
        <div key={category.key}>
          <b>{category.label}:</b>
          {` ${category.tooltip}`}
          <br />
        </div>
      )),
    },
    exportValue: (row) => {
      const category = ageCategories.find((cat) => cat.key === row?.age_biospecimen_collection);
      return category ? `${category.label}: ${category.tooltip}` : row?.age_biospecimen_collection;
    },
    render: (age_biospecimen_collection: string) => {
      const category = ageCategories.find((cat) => cat.key === age_biospecimen_collection);
      if (!category) return TABLE_EMPTY_PLACE_HOLDER;
      return category.tooltip ? (
        <Tooltip title={category.tooltip} className={styles.tooltip}>
          {category.label}
        </Tooltip>
      ) : (
        category.label
      );
    },
  },
];

export default getDiagnosesColumns;
