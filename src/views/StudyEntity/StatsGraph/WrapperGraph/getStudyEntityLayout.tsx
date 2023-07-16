import intl from 'react-intl-universal';
import { IResizableGridLayoutConfig } from '@ferlab/ui/core/layout/ResizableGridLayout';

import AgeAtDiagnosisGraphCard from 'components/graphs/AgeAtDiagnosisGraphCard';
import DataCategoryGraphCard from 'components/graphs/DataCategoryGraphCard';
import DataTypeGraphCard from 'components/graphs/DataTypeGraphCard';
import DemographicsGraphCard from 'components/graphs/DemographicGraphCard';
import SunburstGraphCard from 'components/graphs/SunburstGraphCard';

export const UID = 'studyEntityLayout';
const OBSERVED_PHENOTYPE_ID = 'observed_phenotype';
const MONDO_ID = 'mondo';
const DEMOGRAPHICS_GRAPH_CARD_ID = 'demographics-graph-card';
const AGE_AT_DIAGNOSIS_GRAPH_CARD_ID = 'age-at-diagnosis-graph-card';
const DATA_CATEGORY_GRAPH_CARD_ID = 'data-category-graph-card';
const DATA_TYPE_GRAPH_CARD_ID = 'data-type-graph-card';

const getStudyEntityLayout = (): IResizableGridLayoutConfig[] => [
  {
    title: intl.get('screen.dataExploration.tabs.summary.observed_phenotype.cardTitle'),
    id: OBSERVED_PHENOTYPE_ID,
    component: (
      <SunburstGraphCard gridUID={UID} id={OBSERVED_PHENOTYPE_ID} field="observed_phenotypes" />
    ),
    base: {
      h: 4,
      w: 8,
      x: 0,
      y: 0,
      minW: 5,
      minH: 4,
      isResizable: false,
    },
    md: {
      h: 4,
      w: 6,
      x: 0,
    },
    sm: {
      h: 4,
      w: 5,
      x: 0,
    },
    xs: {
      h: 4,
      w: 6,
      x: 0,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.mondo.cardTitle'),
    id: MONDO_ID,
    component: <SunburstGraphCard gridUID={UID} id={MONDO_ID} field="mondo" />,
    base: {
      h: 4,
      w: 8,
      x: 8,
      y: 0,
      minW: 5,
      minH: 4,
      isResizable: false,
    },
    md: {
      h: 4,
      w: 6,
      x: 6,
    },
    sm: {
      h: 4,
      w: 5,
      x: 5,
    },
    xs: {
      h: 4,
      w: 6,
      x: 0,
      y: 4,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.demographic.cardTitle'),
    id: DEMOGRAPHICS_GRAPH_CARD_ID,
    component: <DemographicsGraphCard gridUID={UID} id={DEMOGRAPHICS_GRAPH_CARD_ID} />,
    base: {
      h: 2,
      w: 6,
      x: 0,
      y: 4,
      minW: 4,
      minH: 2,
    },
    md: {
      h: 2,
      w: 4,
      x: 0,
    },
    sm: {
      h: 2,
      w: 5,
      x: 0,
    },
    xs: {
      h: 2,
      w: 6,
      x: 0,
      y: 8,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.ageAtDiagnosis.cardTitle'),
    id: AGE_AT_DIAGNOSIS_GRAPH_CARD_ID,
    component: <AgeAtDiagnosisGraphCard id={AGE_AT_DIAGNOSIS_GRAPH_CARD_ID} gridUID={UID} />,
    base: {
      h: 2,
      w: 5,
      x: 6,
      y: 4,
      minW: 3,
      minH: 2,
    },
    md: {
      h: 2,
      w: 4,
      x: 4,
    },
    sm: {
      h: 2,
      w: 5,
      x: 5,
    },
    xs: {
      h: 2,
      w: 6,
      x: 0,
      y: 10,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.dataCategoryTitle'),
    id: DATA_CATEGORY_GRAPH_CARD_ID,
    component: <DataCategoryGraphCard id={DATA_CATEGORY_GRAPH_CARD_ID} gridUID={UID} />,
    base: {
      h: 2,
      w: 5,
      x: 11,
      y: 4,
      minW: 2,
      minH: 2,
    },
    md: {
      h: 2,
      w: 4,
      x: 8,
    },
    sm: {
      h: 2,
      w: 5,
      x: 0,
      y: 6,
    },
    xs: {
      h: 2,
      w: 6,
      x: 0,
      y: 12,
    },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.dataTypeTitle'),
    id: DATA_TYPE_GRAPH_CARD_ID,
    component: <DataTypeGraphCard id={DATA_TYPE_GRAPH_CARD_ID} gridUID={UID} />,
    base: {
      h: 3,
      w: 6,
      x: 4,
      y: 6,
      minW: 2,
      minH: 2,
    },
    md: {
      h: 3,
      w: 7,
      x: 4,
    },
    sm: {
      h: 4,
      w: 10,
      x: 0,
      y: 8,
    },
    xs: {
      h: 4,
      w: 6,
      x: 0,
      y: 18,
    },
  },
];

export default getStudyEntityLayout;
