import intl from 'react-intl-universal';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { BasicTooltip } from '@nivo/tooltip';
import { Col, Row } from 'antd';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { STUDIESPIE_QUERY } from 'graphql/summary/queries';
import CardHeader from 'views/Dashboard/components/CardHeader';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import PieChart from 'components/uiKit/charts/Pie';
import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';
import { toChartData } from 'utils/charts';

import styles from './index.module.scss';

interface OwnProps {
  id: string;
  className?: string;
}

const transformData = (results: any) => {
  const aggs = results?.Participant?.aggregations;
  return {
    domainData: (aggs?.study__domain.buckets || []).map(toChartData),
    populationData: (aggs?.study__population.buckets || []).map(toChartData),
    studyCodeData: (aggs?.study__study_code.buckets || []).map(toChartData),
  };
};

const graphSetting = {
  height: 175,
  margin: {
    top: 12,
    bottom: 12,
    left: 12,
    right: 12,
  },
};

const addToQuery = (field: string, key: string, index: string) =>
  updateActiveQueryField({
    queryBuilderId: DATA_EXPLORATION_QB_ID,
    field,
    value: [key.toLowerCase() === intl.get('api.noData') ? ArrangerValues.missing : key],
    index,
  });

const StudiesPieGraphCard = ({ id, className = '' }: OwnProps) => {
  const sqon = useParticipantResolvedSqon(DATA_EXPLORATION_QB_ID);
  const { loading, result } = useLazyResultQuery(STUDIESPIE_QUERY, {
    variables: { sqon },
  });
  const { domainData, populationData, studyCodeData } = transformData(result);

  return (
    <GridCard
      wrapperClassName={className}
      contentClassName={styles.graphContentWrapper}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      title={
        <CardHeader
          id={id}
          title={intl.get('screen.dataExploration.tabs.summary.studiespie.cardTitle')}
          withHandle
        />
      }
      content={
        <Row gutter={[12, 24]} className={styles.graphRowWrapper}>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get('screen.dataExploration.tabs.summary.studiespie.domainTitle')}
              data={domainData}
              onClick={(datum) => addToQuery('domain', datum.id as string, INDEXES.STUDY)}
              tooltip={(value) => (
                <BasicTooltip id={value.datum.id} value={1} color={value.datum.color} />
              )}
              {...graphSetting}
            />
          </Col>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get('screen.dataExploration.tabs.summary.studiespie.popTitle')}
              data={populationData}
              onClick={(datum) => addToQuery('population', datum.id as string, INDEXES.STUDY)}
              tooltip={(value) => (
                <BasicTooltip id={value.datum.id} value={1} color={value.datum.color} />
              )}
              {...graphSetting}
            />
          </Col>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get('screen.dataExploration.tabs.summary.studiespie.partTitle')}
              data={studyCodeData}
              onClick={(datum) => addToQuery('study_code', datum.id as string, INDEXES.STUDY)}
              {...graphSetting}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default StudiesPieGraphCard;
