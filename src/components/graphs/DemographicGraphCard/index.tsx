import intl from 'react-intl-universal';
import PieChart from '@ferlab/ui/core/components/Charts/Pie';
import Empty from '@ferlab/ui/core/components/Empty';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import ResizableGridCard from '@ferlab/ui/core/layout/ResizableGridLayout/ResizableGridCard';
import { aggregationToChartData } from '@ferlab/ui/core/layout/ResizableGridLayout/utils';
import { Col, Row } from 'antd';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { DEMOGRAPHIC_QUERY } from 'graphql/summary/queries';
import isEmpty from 'lodash/isEmpty';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { getCommonColors } from 'common/charts';
import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';
import { getResizableGridDictionary } from 'utils/translation';

import styles from './index.module.scss';

const colors = getCommonColors();

const graphSetting = {
  margin: {
    top: 0,
    bottom: 8,
    left: 12,
    right: 12,
  },
};

const graphModalSettings = {
  margin: {
    top: 0,
    bottom: 150,
    left: 12,
    right: 12,
  },
};

const LEGEND_ITEM_HEIGHT = 18;

const addToQuery = (field: string, key: string) =>
  updateActiveQueryField({
    queryBuilderId: DATA_EXPLORATION_QB_ID,
    field,
    value: [key.toLowerCase() === 'no data' ? ArrangerValues.missing : key],
    index: INDEXES.PARTICIPANT,
  });

const DemographicsGraphCard = ({ gridUID, id }: { gridUID: string; id: string }) => {
  const sqon = useParticipantResolvedSqon(DATA_EXPLORATION_QB_ID);
  const { loading, result } = useLazyResultQuery(DEMOGRAPHIC_QUERY, {
    variables: { sqon },
  });
  const genderData = aggregationToChartData(
    result?.Participant?.aggregations?.gender?.buckets,
    result?.Participant?.hits?.total,
  );
  const raceData = aggregationToChartData(
    result?.Participant?.aggregations?.race?.buckets,
    result?.Participant?.hits?.total,
  );
  const ethnicityData = aggregationToChartData(
    result?.Participant?.aggregations?.ethnicity?.buckets,
    result?.Participant?.hits?.total,
  );

  return (
    <ResizableGridCard
      gridUID={gridUID}
      id={id}
      dictionary={getResizableGridDictionary()}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      headerTitle={intl.get('screen.dataExploration.tabs.summary.demographic.cardTitle')}
      tsvSettings={{
        data: [genderData, raceData, ethnicityData],
      }}
      modalContent={
        <Row gutter={[12, 24]} className={styles.graphRowWrapper}>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              data={genderData}
              onClick={(datum) => addToQuery('sex', datum.id as string)}
              colors={colors}
              legends={[
                {
                  anchor: 'bottom',
                  translateX: 0,
                  translateY: (LEGEND_ITEM_HEIGHT * genderData.length - 1) / 2,
                  direction: 'column',
                  itemWidth: 100,
                  itemHeight: LEGEND_ITEM_HEIGHT,
                },
              ]}
              {...graphModalSettings}
            />
          </Col>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              data={ethnicityData}
              onClick={(datum) => addToQuery('ethnicity', datum.id as string)}
              colors={colors}
              legends={[
                {
                  anchor: 'bottom',
                  translateX: 0,
                  translateY: (LEGEND_ITEM_HEIGHT * ethnicityData.length - 1) / 2,
                  direction: 'column',
                  itemWidth: 100,
                  itemHeight: LEGEND_ITEM_HEIGHT,
                },
              ]}
              {...graphModalSettings}
            />
          </Col>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              data={raceData}
              colors={colors}
              onClick={(datum) => addToQuery('race', datum.id as string)}
              legends={[
                {
                  anchor: 'bottom',
                  translateX: 0,
                  translateY: (LEGEND_ITEM_HEIGHT * raceData.length - 1) / 2,
                  direction: 'column',
                  itemWidth: 100,
                  itemHeight: LEGEND_ITEM_HEIGHT,
                },
              ]}
              {...graphModalSettings}
            />
          </Col>
        </Row>
      }
      modalSettings={{
        width: 1000,
        height: 600,
      }}
      content={
        <Row gutter={[12, 24]} className={styles.graphRowWrapper}>
          <Col sm={12} md={12} lg={8}>
            {!genderData?.length ? (
              <Empty imageType="grid" />
            ) : (
              <PieChart
                title={intl.get('screen.dataExploration.tabs.summary.demographic.sexTitle')}
                data={genderData}
                onClick={(datum) => addToQuery('gender', datum.id as string)}
                colors={colors}
                {...graphSetting}
              />
            )}
          </Col>
          <Col sm={12} md={12} lg={8}>
            {isEmpty(ethnicityData) ? (
              <Empty imageType="grid" />
            ) : (
              <PieChart
                title={intl.get('screen.dataExploration.tabs.summary.demographic.ethnicityTitle')}
                data={ethnicityData}
                onClick={(datum) => addToQuery('ethnicity', datum.id as string)}
                colors={colors}
                {...graphSetting}
              />
            )}
          </Col>
          <Col sm={12} md={12} lg={8}>
            {isEmpty(raceData) ? (
              <Empty imageType="grid" />
            ) : (
              <PieChart
                title={intl.get('screen.dataExploration.tabs.summary.demographic.raceTitle')}
                data={raceData}
                colors={colors}
                onClick={(datum) => addToQuery('race', datum.id as string)}
                {...graphSetting}
              />
            )}
          </Col>
        </Row>
      }
    />
  );
};

export default DemographicsGraphCard;
