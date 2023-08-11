import intl from 'react-intl-universal';
import PieChart from '@ferlab/ui/core/components/Charts/Pie';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import ResizableGridCard from '@ferlab/ui/core/layout/ResizableGridLayout/ResizableGridCard';
import { aggregationToChartData } from '@ferlab/ui/core/layout/ResizableGridLayout/utils';
import { Col, Row } from 'antd';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { STUDIESPIE_QUERY } from 'graphql/summary/queries';

import { getCommonColors } from 'common/charts';
import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';
import { getResizableGridDictionary } from 'utils/translation';

import styles from './index.module.scss';

const colors = getCommonColors();

const addToQuery = (field: string, key: string, index: string, queryId: string) =>
  updateActiveQueryField({
    queryBuilderId: queryId,
    field,
    value: [key.toLowerCase() === intl.get('api.noData') ? ArrangerValues.missing : key],
    index,
  });

const StudiesGraphCard = ({
  gridUID,
  id,
  queryId,
}: {
  gridUID: string;
  id: string;
  queryId: string;
}) => {
  const sqon = useParticipantResolvedSqon(queryId);
  const { loading, result } = useLazyResultQuery(STUDIESPIE_QUERY, {
    variables: { sqon },
  });
  const studyCodeData = aggregationToChartData(
    result?.Participant?.aggregations?.study__study_code.buckets,
    result?.Participant?.hits?.total,
  );
  const domainData = aggregationToChartData(
    result?.Participant?.aggregations?.study__domain.buckets,
    result?.Participant?.hits?.total,
  );
  const populationData = aggregationToChartData(
    result?.Participant?.aggregations?.study__population.buckets,
    result?.Participant?.hits?.total,
  );

  return (
    <ResizableGridCard
      gridUID={gridUID}
      id={id}
      dictionary={getResizableGridDictionary()}
      contentClassName={styles.graphContentWrapper}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      headerTitle={intl.get('entities.study.studies')}
      tsvSettings={{
        data: [studyCodeData, domainData, populationData],
      }}
      modalContent={
        <Row gutter={[12, 24]} className={styles.graphRowWrapper}>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              onClick={(datum) => addToQuery('domain', datum.id as string, INDEXES.STUDY, queryId)}
              title={intl.get('screen.dataExploration.tabs.summary.studiespie.domainTitle')}
              data={domainData}
              colors={colors}
              margin={{
                top: 12,
                bottom: 96,
                left: 12,
                right: 12,
              }}
              legends={[
                {
                  anchor: 'bottom',
                  translateX: 0,
                  translateY: 92,
                  direction: 'column',
                  itemWidth: 100,
                  itemHeight: 18,
                },
              ]}
            />
          </Col>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get('screen.dataExploration.tabs.summary.studiespie.popTitle')}
              data={populationData}
              onClick={(datum) =>
                addToQuery('population', datum.id as string, INDEXES.STUDY, queryId)
              }
              colors={colors}
            />
          </Col>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get('screen.dataExploration.tabs.summary.studiespie.partTitle')}
              data={studyCodeData}
              onClick={(datum) =>
                addToQuery('study_code', datum.id as string, INDEXES.STUDY, queryId)
              }
              colors={colors}
            />
          </Col>
        </Row>
      }
      content={
        <Row gutter={[12, 24]} className={styles.graphRowWrapper}>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get('screen.dataExploration.tabs.summary.studiespie.domainTitle')}
              data={domainData}
              onClick={(datum) => addToQuery('domain', datum.id as string, INDEXES.STUDY, queryId)}
              colors={colors}
            />
          </Col>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get('screen.dataExploration.tabs.summary.studiespie.popTitle')}
              data={populationData}
              onClick={(datum) =>
                addToQuery('population', datum.id as string, INDEXES.STUDY, queryId)
              }
              colors={colors}
            />
          </Col>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get('screen.dataExploration.tabs.summary.studiespie.partTitle')}
              data={studyCodeData}
              onClick={(datum) =>
                addToQuery('study_code', datum.id as string, INDEXES.STUDY, queryId)
              }
              colors={colors}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default StudiesGraphCard;
