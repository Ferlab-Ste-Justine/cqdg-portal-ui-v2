import intl from 'react-intl-universal';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { BasicTooltip } from '@nivo/tooltip';
import { Col, Row } from 'antd';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { SOCIODEMOGRAPHIC_QUERY } from 'graphql/summary/queries';
import capitalize from 'lodash/capitalize';
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
    genderData: (aggs?.gender.buckets || []).map(toChartData),
    enthicityData: (aggs?.ethnicity.buckets || []).map(toChartData),
    familyData: (aggs?.familyData.buckets || []).map(toChartData),
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

const addToQuery = (field: string, key: string) =>
  updateActiveQueryField({
    queryBuilderId: DATA_EXPLORATION_QB_ID,
    field,
    value: [key.toLowerCase() === intl.get('api.noData') ? ArrangerValues.missing : key],
    index: INDEXES.PARTICIPANT,
  });

const SociodemographicsGraphCard = ({ id, className = '' }: OwnProps) => {
  const sqon = useParticipantResolvedSqon(DATA_EXPLORATION_QB_ID);
  const { loading, result } = useLazyResultQuery(SOCIODEMOGRAPHIC_QUERY, {
    variables: { sqon },
  });
  const { genderData, enthicityData, familyData } = transformData(result);

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
          title={intl.get('screen.dataExploration.tabs.summary.sociodemographics.cardTitle')}
          withHandle
        />
      }
      content={
        <Row gutter={[12, 24]} className={styles.graphRowWrapper}>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get('screen.dataExploration.tabs.summary.sociodemographics.genderTitle')}
              data={genderData}
              onClick={(datum) => addToQuery('gender', datum.id as string)}
              tooltip={(value) => (
                <BasicTooltip
                  id={capitalize(value.datum.id.toString())}
                  value={value.datum.value}
                  color={value.datum.color}
                />
              )}
              {...graphSetting}
            />
          </Col>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get(
                'screen.dataExploration.tabs.summary.sociodemographics.ethnicityTitle',
              )}
              data={enthicityData}
              onClick={(datum) => addToQuery('ethnicity', datum.id as string)}
              {...graphSetting}
            />
          </Col>
          <Col sm={12} md={12} lg={8}>
            <PieChart
              title={intl.get(
                'screen.dataExploration.tabs.summary.sociodemographics.compositionFamilyTitle',
              )}
              data={familyData}
              onClick={(datum) => addToQuery('family', datum.id as string)}
              {...graphSetting}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default SociodemographicsGraphCard;
