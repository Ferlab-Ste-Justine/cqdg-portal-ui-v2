import intl from 'react-intl-universal';
import { IResizableGridLayoutConfig } from '@ferlab/ui/core/layout/ResizableGridLayout';
import {
  // ageAtDiagnosisDefaultGridConfig,
  // dataCategoryDefaultGridConfig,
  // dataTypeDefaultGridConfig,
  // demographicsDefaultGridConfig,
  mondoDefaultGridConfig,
  observedPhenotypeDefaultGridConfig,
  // studiesDefaultGridConfig,
} from '@ferlab/ui/core/layout/ResizableGridLayout/utils';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import DataTypeGraphCard from 'components/graphs/DataTypeGraphCard';
import EthnicityGraphCard from 'components/graphs/EthnicityGraphCard';
import ExperimentalStrategyGraphCard from 'components/graphs/ExperimentalStrategyGraphCard';
import SexGraphCard from 'components/graphs/SexGraphCard';
import StudyDomainGraphCard from 'components/graphs/StudyDomainGraphCard';
import StudyParticipantsGraphCard from 'components/graphs/StudyParticipantsGraphCard';
import StudyPopulationGraphCard from 'components/graphs/StudyPopulationGraphCard';
import SunburstGraphCard from 'components/graphs/SunburstGraphCard';

export const UID = 'summaryLayout';
const OBSERVED_PHENOTYPE_ID = 'observed_phenotype';
const MONDO_ID = 'mondo';
const SEX_GRAPH_CARD_ID = 'sex-graph-card';
const ETHNICITY_GRAPH_CARD_ID = 'ethnicity-graph-card';
const STUDY_DOMAIN_GRAPH_CARD_ID = 'study-domain-graph-card';
const STUDY_POPULATION_GRAPH_CARD_ID = 'study-population-graph-card';
const STUDY_PARTICIPANTS_GRAPH_CARD_ID = 'study-participants-graph-card';
const DATA_TYPE_GRAPH_CARD_ID = 'data-type-graph-card';
const EXPERIMENTAL_STRATEGY_GRAPH_CARD_ID = 'experimental-strategy-graph-card';

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
    ...observedPhenotypeDefaultGridConfig,
    base: { h: 4, w: 6, x: 0, y: 0, minH: 4, minW: 5, isResizable: true },
    md: { h: 4, w: 6, x: 0, y: 0 },
    sm: { h: 4, w: 6, x: 0, y: 0 },
    xs: { h: 4, w: 6, x: 0, y: 0 },
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
    ...mondoDefaultGridConfig,
    base: { h: 4, w: 6, x: 6, y: 0, minH: 4, minW: 5, isResizable: true },
    md: { h: 4, w: 6, x: 6, y: 0 },
    sm: { h: 4, w: 6, x: 0, y: 4 },
    xs: { h: 4, w: 6, x: 0, y: 4 },
  },
  {
    title: intl.get('entities.participant.participantsBySex'),
    id: SEX_GRAPH_CARD_ID,
    component: (
      <SexGraphCard gridUID={UID} id={SEX_GRAPH_CARD_ID} queryId={DATA_EXPLORATION_QB_ID} />
    ),
    base: { h: 2, w: 2, x: 0, y: 4, minH: 2, minW: 2, isResizable: true },
    md: { h: 2, w: 2, x: 0, y: 4, minH: 2, minW: 2 },
    sm: { h: 2, w: 2, x: 0, y: 4, minH: 2, minW: 2 },
    xs: { h: 2, w: 2, x: 0, y: 4, minH: 2, minW: 2 },
  },
  {
    title: intl.get('entities.participant.participantsByEthnicity'),
    id: ETHNICITY_GRAPH_CARD_ID,
    component: (
      <EthnicityGraphCard
        gridUID={UID}
        id={ETHNICITY_GRAPH_CARD_ID}
        queryId={DATA_EXPLORATION_QB_ID}
      />
    ),
    base: { h: 2, w: 2, x: 2, y: 4, minH: 2, minW: 2, isResizable: true },
    md: { h: 2, w: 2, x: 2, y: 4, minH: 2, minW: 2 },
    sm: { h: 2, w: 2, x: 2, y: 4, minH: 2, minW: 2 },
    xs: { h: 2, w: 2, x: 2, y: 4, minH: 2, minW: 2 },
  },
  {
    title: intl.get('entities.participant.participantsByStudy'),
    id: STUDY_PARTICIPANTS_GRAPH_CARD_ID,
    component: (
      <StudyParticipantsGraphCard
        id={STUDY_PARTICIPANTS_GRAPH_CARD_ID}
        gridUID={UID}
        queryId={DATA_EXPLORATION_QB_ID}
      />
    ),
    base: { h: 2, w: 2, x: 4, y: 4, minH: 2, minW: 2, isResizable: true },
    md: { h: 2, w: 2, x: 4, y: 4, minH: 2, minW: 2 },
    sm: { h: 2, w: 2, x: 4, y: 4, minH: 2, minW: 2 },
    xs: { h: 2, w: 2, x: 4, y: 4, minH: 2, minW: 2 },
  },
  {
    title: intl.get('entities.participant.participantsByDomain'),
    id: STUDY_DOMAIN_GRAPH_CARD_ID,
    component: (
      <StudyDomainGraphCard
        id={STUDY_DOMAIN_GRAPH_CARD_ID}
        gridUID={UID}
        queryId={DATA_EXPLORATION_QB_ID}
      />
    ),
    base: { h: 2, w: 2, x: 6, y: 4, minH: 2, minW: 2, isResizable: true },
    md: { h: 2, w: 2, x: 6, y: 4, minH: 2, minW: 2 },
    sm: { h: 2, w: 2, x: 0, y: 6, minH: 2, minW: 2 },
    xs: { h: 2, w: 2, x: 0, y: 6, minH: 2, minW: 2 },
  },
  {
    title: intl.get('entities.participant.participantsByPopulation'),
    id: STUDY_POPULATION_GRAPH_CARD_ID,
    component: (
      <StudyPopulationGraphCard
        id={STUDY_POPULATION_GRAPH_CARD_ID}
        gridUID={UID}
        queryId={DATA_EXPLORATION_QB_ID}
      />
    ),
    base: { h: 2, w: 2, x: 8, y: 4, minH: 2, minW: 2, isResizable: true },
    md: { h: 2, w: 2, x: 8, y: 4, minH: 2, minW: 2 },
    sm: { h: 2, w: 2, x: 2, y: 6, minH: 2, minW: 2 },
    xs: { h: 2, w: 2, x: 2, y: 6, minH: 2, minW: 2 },
  },
  {
    title: intl.get('entities.participant.participantsByStrategy'),
    id: EXPERIMENTAL_STRATEGY_GRAPH_CARD_ID,
    component: (
      <ExperimentalStrategyGraphCard
        gridUID={UID}
        id={EXPERIMENTAL_STRATEGY_GRAPH_CARD_ID}
        queryId={DATA_EXPLORATION_QB_ID}
      />
    ),
    base: { h: 2, w: 2, x: 10, y: 4, minH: 2, minW: 2, isResizable: true },
    md: { h: 2, w: 2, x: 10, y: 4, minH: 2, minW: 2 },
    sm: { h: 2, w: 2, x: 4, y: 4, minH: 2, minW: 2 },
    xs: { h: 2, w: 2, x: 4, y: 6, minH: 2, minW: 2 },
  },
  {
    title: intl.get('entities.participant.participantsByDataType'),
    id: DATA_TYPE_GRAPH_CARD_ID,
    component: (
      <DataTypeGraphCard
        id={DATA_TYPE_GRAPH_CARD_ID}
        gridUID={UID}
        queryId={DATA_EXPLORATION_QB_ID}
      />
    ),
    base: { h: 3, w: 6, x: 0, y: 6, minH: 3, minW: 6, isResizable: true },
    md: { h: 3, w: 6, x: 0, y: 10 },
    sm: { h: 3, w: 6, x: 0, y: 10 },
    xs: { h: 3, w: 6, x: 0, y: 10 },
  },
];

export default getSummaryLayout;
