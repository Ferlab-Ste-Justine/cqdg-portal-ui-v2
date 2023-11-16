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

const addToQuery = (field: string, key: string, queryId: string) =>
  updateActiveQueryField({
    queryBuilderId: queryId,
    field,
    value: [key.toLowerCase() === 'no data' ? ArrangerValues.missing : key],
    index: INDEXES.PARTICIPANT,
  });

const DemographicsGraphCard = ({
  gridUID,
  id,
  queryId,
  isPlayable = true,
}: {
  gridUID: string;
  id: string;
  queryId: string;
  isPlayable?: boolean;
}) => {
  const sqon = useParticipantResolvedSqon(queryId);
  const { loading, result } = useLazyResultQuery(DEMOGRAPHIC_QUERY, {
    variables: { sqon },
  });
  const genderData = aggregationToChartData(
    result?.Participant?.aggregations?.gender?.buckets,
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
        data: [genderData, ethnicityData],
      }}
      modalContent={
        <Row gutter={[12, 24]} className={styles.graphRowWrapper}>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get('screen.dataExploration.tabs.summary.demographic.genderTitle')}
              data={genderData}
              onClick={(datum) => isPlayable && addToQuery('gender', datum.id as string, queryId)}
              colors={colors}
              legends={[
                {
                  anchor: 'bottom',
                  translateX: 0,
                  translateY: 0,
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
              title={intl.get('screen.dataExploration.tabs.summary.demographic.ethnicityTitle')}
              data={ethnicityData}
              onClick={(datum) =>
                isPlayable && addToQuery('ethnicity', datum.id as string, queryId)
              }
              colors={colors}
              legends={[
                {
                  anchor: 'bottom',
                  translateX: 0,
                  translateY: 0,
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
      content={
        <Row gutter={[12, 24]} className={styles.graphRowWrapper}>
          <Col sm={12} md={12} lg={8}>
            {!genderData?.length ? (
              <Empty imageType="grid" description={intl.get('api.noData')} />
            ) : (
              <PieChart
                title={intl.get('screen.dataExploration.tabs.summary.demographic.genderTitle')}
                data={genderData}
                onClick={(datum) => isPlayable && addToQuery('gender', datum.id as string, queryId)}
                colors={colors}
                {...graphSetting}
              />
            )}
          </Col>
          <Col sm={12} md={12} lg={8}>
            {!ethnicityData?.length ? (
              <Empty imageType="grid" description={intl.get('api.noData')} />
            ) : (
              <PieChart
                title={intl.get('screen.dataExploration.tabs.summary.demographic.ethnicityTitle')}
                data={ethnicityData}
                onClick={(datum) =>
                  isPlayable && addToQuery('ethnicity', datum.id as string, queryId)
                }
                colors={colors}
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
