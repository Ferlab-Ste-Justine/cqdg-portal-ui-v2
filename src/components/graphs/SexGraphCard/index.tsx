import intl from 'react-intl-universal';
import PieChart from '@ferlab/ui/core/components/Charts/Pie';
import Empty from '@ferlab/ui/core/components/Empty';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import ResizableGridCard from '@ferlab/ui/core/layout/ResizableGridLayout/ResizableGridCard';
import { aggregationToChartData } from '@ferlab/ui/core/layout/ResizableGridLayout/utils';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { PARTICIPANT_AGG_QUERY } from 'graphql/summary/queries';

import { getCommonColors } from 'common/charts';
import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';
import { getResizableGridDictionary } from 'utils/translation';

import { graphModalSettings, graphSetting } from '../common';

const colors = getCommonColors();

const addToQuery = (field: string, key: string, queryId: string) =>
  updateActiveQueryField({
    queryBuilderId: queryId,
    field,
    value: [key.toLowerCase() === 'no data' ? ArrangerValues.missing : key],
    index: INDEXES.PARTICIPANT,
  });

const SexGraphCard = ({
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
  const { loading, result } = useLazyResultQuery(PARTICIPANT_AGG_QUERY, {
    variables: { sqon },
  });

  const data = aggregationToChartData(
    result?.Participant?.aggregations?.sex?.buckets,
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
      headerTitle={intl.get('entities.participant.participantsBySex')}
      tsvSettings={{ data: [data] }}
      titleTruncateThresholdWidth={70}
      modalContent={
        <PieChart
          data={data}
          onClick={(datum) => isPlayable && addToQuery('sex', datum.id as string, queryId)}
          colors={colors}
          {...graphModalSettings}
        />
      }
      content={
        !data?.length ? (
          <Empty description={intl.get('api.noData')} />
        ) : (
          <PieChart
            data={data}
            onClick={(datum) => isPlayable && addToQuery('sex', datum.id as string, queryId)}
            colors={colors}
            {...graphSetting}
          />
        )
      }
    />
  );
};

export default SexGraphCard;
