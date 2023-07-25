import intl from 'react-intl-universal';
import { IResizableGridLayoutConfig } from '@ferlab/ui/core/layout/ResizableGridLayout';

import DataCategoryGraphCard from 'components/graphs/DataCategoryGraphCard';
import DataTypeGraphCard from 'components/graphs/DataTypeGraphCard';
import DemographicsGraphCard from 'components/graphs/DemographicGraphCard';
import SunburstGraphCard from 'components/graphs/SunburstGraphCard';

export const UID = 'studyEntityLayout';
const OBSERVED_PHENOTYPE_ID = 'observed_phenotype';
const MONDO_ID = 'mondo';
const DEMOGRAPHICS_GRAPH_CARD_ID = 'demographics-graph-card';
const DATA_CATEGORY_GRAPH_CARD_ID = 'data-category-graph-card';
const DATA_TYPE_GRAPH_CARD_ID = 'data-type-graph-card';
export const queryId = 'cqdg-study-repo-key';

const getStudyEntityLayout = (): IResizableGridLayoutConfig[] => [
  {
    title: intl.get('screen.dataExploration.tabs.summary.observed_phenotype.cardTitle'),
    id: OBSERVED_PHENOTYPE_ID,
    component: (
      <SunburstGraphCard
        gridUID={UID}
        id={OBSERVED_PHENOTYPE_ID}
        field="observed_phenotypes"
        queryId={queryId}
        isPlayable={false}
      />
    ),
    base: { h: 4, w: 8, x: 0, y: 0, minW: 5, minH: 4, isResizable: true },
    md: { h: 4, w: 6, x: 0 },
    sm: { h: 4, w: 5, x: 0 },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.mondo.cardTitle'),
    id: MONDO_ID,
    component: (
      <SunburstGraphCard
        gridUID={UID}
        id={MONDO_ID}
        field="mondo"
        queryId={queryId}
        isPlayable={false}
      />
    ),
    base: { h: 4, w: 8, x: 8, y: 0, minW: 5, minH: 4, isResizable: true },
    md: { h: 4, w: 6, x: 8 },
    sm: { h: 4, w: 5, x: 0 },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.dataTypeTitle'),
    id: DATA_TYPE_GRAPH_CARD_ID,
    component: (
      <DataTypeGraphCard
        id={DATA_TYPE_GRAPH_CARD_ID}
        gridUID={UID}
        queryId={queryId}
        isPlayable={false}
      />
    ),
    base: { h: 4, w: 8, x: 0, y: 0, minW: 5, minH: 4, isResizable: true },
    md: { h: 4, w: 6, x: 0 },
    sm: { h: 4, w: 5, x: 0 },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.availableData.dataCategoryTitle'),
    id: DATA_CATEGORY_GRAPH_CARD_ID,
    component: (
      <DataCategoryGraphCard
        id={DATA_CATEGORY_GRAPH_CARD_ID}
        gridUID={UID}
        queryId={queryId}
        isPlayable={false}
      />
    ),
    base: { h: 4, w: 8, x: 8, y: 0, minW: 5, minH: 4, isResizable: true },
    md: { h: 4, w: 6, x: 8 },
    sm: { h: 4, w: 5, x: 0 },
  },
  {
    title: intl.get('screen.dataExploration.tabs.summary.demographic.cardTitle'),
    id: DEMOGRAPHICS_GRAPH_CARD_ID,
    component: (
      <DemographicsGraphCard
        gridUID={UID}
        id={DEMOGRAPHICS_GRAPH_CARD_ID}
        queryId={queryId}
        isPlayable={false}
      />
    ),
    base: { h: 4, w: 8, x: 0, y: 0, minW: 5, minH: 4, isResizable: true },
    md: { h: 4, w: 6, x: 0 },
    sm: { h: 4, w: 5, x: 0 },
  },
];

export default getStudyEntityLayout;
