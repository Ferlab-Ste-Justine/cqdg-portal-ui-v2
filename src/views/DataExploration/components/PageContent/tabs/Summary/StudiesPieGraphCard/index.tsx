import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { BasicTooltip } from '@nivo/tooltip';
import { Col, Row } from 'antd';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { STUDIESPIE_QUERY } from 'graphql/summary/queries';
import capitalize from 'lodash/capitalize';
import isEmpty from 'lodash/isEmpty';
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
  const aggs1 = results?.Study?.aggregations;
  const aggs2 = results?.Participant?.aggregations;
  return {
    domain: (aggs1?.domain.buckets || []).map(toChartData),
    population: (aggs1?.population.buckets || []).map(toChartData),
    study__name: (aggs2?.study__name.buckets || []).map(toChartData),
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
    value: [key.toLowerCase() === 'no data' ? ArrangerValues.missing : key],
    index,
  });

const StudiesPieGraphCard = ({ id, className = '' }: OwnProps) => {
  const sqon = useParticipantResolvedSqon(DATA_EXPLORATION_QB_ID);
  const { loading, result } = useLazyResultQuery(STUDIESPIE_QUERY, {
    variables: { sqon },
  });
  const { domain, population, study__name } = transformData(result);

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
            {isEmpty(domain) ? (
              <Empty imageType="grid" />
            ) : (
              <PieChart
                title={intl.get('screen.dataExploration.tabs.summary.studiespie.domainTitle')}
                data={domain}
                onClick={(datum) => addToQuery('domain', datum.id as string, INDEXES.STUDY)}
                tooltip={(value) => (
                  <BasicTooltip
                    id={capitalize(value.datum.id.toString())}
                    value={value.datum.value}
                    color={value.datum.color}
                  />
                )}
                {...graphSetting}
              />
            )}
          </Col>
          <Col sm={12} md={12} lg={8}>
            {isEmpty(population) ? (
              <Empty imageType="grid" />
            ) : (
              <PieChart
                title={intl.get('screen.dataExploration.tabs.summary.studiespie.popTitle')}
                data={population}
                onClick={(datum) => addToQuery('population', datum.id as string, INDEXES.STUDY)}
                {...graphSetting}
              />
            )}
          </Col>
          <Col sm={12} md={12} lg={8}>
            {isEmpty(study__name) ? (
              <Empty imageType="grid" />
            ) : (
              <PieChart
                title={intl.get('screen.dataExploration.tabs.summary.studiespie.partTitle')}
                data={study__name}
                onClick={(datum) =>
                  addToQuery('study__name', datum.id as string, INDEXES.PARTICIPANT)
                }
                {...graphSetting}
              />
            )}
          </Col>
        </Row>
      }
    />
  );
};

export default StudiesPieGraphCard;
