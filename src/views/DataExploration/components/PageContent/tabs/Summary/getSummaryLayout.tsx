import intl from 'react-intl-universal';
import { IResizableGridLayoutConfig } from '@ferlab/ui/core/layout/ResizableGridLayout';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import DataCategoryGraphCard from 'components/graphs/DataCategoryGraphCard';
import DataTypeGraphCard from 'components/graphs/DataTypeGraphCard';
import DemographicsGraphCard from 'components/graphs/DemographicGraphCard';
import StudiesGraphCard from 'components/graphs/StudiesGraphCard';
import SunburstGraphCard from 'components/graphs/SunburstGraphCard';

export const UID = 'summaryLayout';
const OBSERVED_PHENOTYPE_ID = 'observed_phenotype';
const MONDO_ID = 'mondo';
const DEMOGRAPHICS_GRAPH_CARD_ID = 'demographics-graph-card';
const DATA_CATEGORY_GRAPH_CARD_ID = 'data-category-graph-card';
const STUDIES_GRAPH_CARD_ID = 'studies-graph-card';
const DATA_TYPE_GRAPH_CARD_ID = 'data-type-graph-card';

const getSummaryLayout = (): IResizableGridLayoutConfig[] => [
  {
    title: intl.get('screen.dataExploration.tabs.summary.observed_phenotypes.cardTitle'),
    id: OBSERVED_PHENOTYPE_ID,
    component: (
      <SunburstGraphCard
        gridUID={UID}
        id={OBSERVED_PHENOTYPE_ID}
        field="observed_phenotypes"
        queryId={DATA_EXPLORATION_QB_ID}
      />
    ),
    base: { h: 4, w: 6, x: 0, y: 0, minH: 4, minW: 5, isResizable: true },
    md: { h: 4, w: 6, x: 0, y: 0 },
    sm: { h: 4, w: 6, x: 0, y: 0 },
    xs: { h: 4, w: 6, x: 0, y: 0 },
    xss: { h: 4, w: 6, x: 0, y: 0 },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.mondo.cardTitle'),
    id: MONDO_ID,
    component: (
      <SunburstGraphCard
        gridUID={UID}
        id={MONDO_ID}
        field="mondo"
        queryId={DATA_EXPLORATION_QB_ID}
      />
    ),
    base: { h: 4, w: 6, x: 6, y: 0, minH: 4, minW: 5, isResizable: true },
    md: { h: 4, w: 6, x: 6, y: 0 },
    sm: { h: 4, w: 6, x: 0, y: 4 },
    xs: { h: 4, w: 6, x: 0, y: 4 },
    xss: { h: 4, w: 6, x: 0, y: 4 },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.demographic.cardTitle'),
    id: DEMOGRAPHICS_GRAPH_CARD_ID,
    component: (
      <DemographicsGraphCard
        gridUID={UID}
        id={DEMOGRAPHICS_GRAPH_CARD_ID}
        queryId={DATA_EXPLORATION_QB_ID}
      />
    ),
    base: { h: 2, w: 3, x: 0, y: 4, minH: 2, minW: 3, isResizable: true },
    md: { h: 2, w: 3, x: 0, y: 4 },
    sm: { h: 2, w: 3, x: 0, y: 4 },
    xs: { h: 3, w: 4, x: 0, y: 8 },
    xss: { h: 3, w: 4, x: 0, y: 8 },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.studies.cardTitle'),
    id: STUDIES_GRAPH_CARD_ID,
    component: (
      <StudiesGraphCard id={STUDIES_GRAPH_CARD_ID} gridUID={UID} queryId={DATA_EXPLORATION_QB_ID} />
    ),
    base: { h: 2, w: 3, x: 3, y: 4, minH: 2, minW: 3, isResizable: true },
    md: { h: 2, w: 3, x: 3, y: 4 },
    sm: { h: 2, w: 3, x: 3, y: 4 },
    xs: { h: 3, w: 4, x: 0, y: 11 },
    xss: { h: 3, w: 4, x: 0, y: 11 },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.dataTypeTitle'),
    id: DATA_TYPE_GRAPH_CARD_ID,
    component: (
      <DataTypeGraphCard
        id={DATA_TYPE_GRAPH_CARD_ID}
        gridUID={UID}
        queryId={DATA_EXPLORATION_QB_ID}
      />
    ),
    base: { h: 2, w: 3, x: 6, y: 4, minH: 2, minW: 3, isResizable: true },
    md: { h: 2, w: 3, x: 6, y: 4 },
    sm: { h: 2, w: 3, x: 0, y: 7 },
    xs: { h: 3, w: 4, x: 0, y: 14 },
    xss: { h: 3, w: 4, x: 0, y: 14 },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.dataCategoryTitle'),
    id: DATA_CATEGORY_GRAPH_CARD_ID,
    component: (
      <DataCategoryGraphCard
        id={DATA_CATEGORY_GRAPH_CARD_ID}
        gridUID={UID}
        queryId={DATA_EXPLORATION_QB_ID}
      />
    ),
    base: { h: 2, w: 3, x: 9, y: 4, minH: 2, minW: 3, isResizable: true },
    md: { h: 2, w: 3, x: 9, y: 4 },
    sm: { h: 2, w: 3, x: 3, y: 7 },
    xs: { h: 3, w: 4, x: 0, y: 14 },
    xss: { h: 3, w: 4, x: 0, y: 14 },
  },
];

export default getSummaryLayout;
