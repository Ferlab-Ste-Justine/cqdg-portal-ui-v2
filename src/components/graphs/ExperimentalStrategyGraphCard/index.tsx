import intl from 'react-intl-universal';
import PieChart from '@ferlab/ui/core/components/Charts/Pie';
import Empty from '@ferlab/ui/core/components/Empty';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import ResizableGridCard from '@ferlab/ui/core/layout/ResizableGridLayout/ResizableGridCard';
import { aggregationToChartData } from '@ferlab/ui/core/layout/ResizableGridLayout/utils';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { EXPERIMENTAL_STRATEGY_QUERY } from 'graphql/summary/queries';

import { getCommonColors } from 'common/charts';
import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';
import { getResizableGridDictionary } from 'utils/translation';

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
    index: INDEXES.FILE,
  });

const ExperimentalStrategyGraphCard = ({
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
  const { loading, result } = useLazyResultQuery(EXPERIMENTAL_STRATEGY_QUERY, {
    variables: { sqon },
  });

  const data = aggregationToChartData(
    result?.Participant?.aggregations?.files__sequencing_experiment__experimental_strategy.buckets,
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
      headerTitle={intl.get('entities.file.sequencing_experiment.experimental_strategy')}
      tsvSettings={{
        data: [data],
      }}
      modalContent={
        <PieChart
          data={data}
          onClick={(datum) =>
            isPlayable &&
            addToQuery('sequencing_experiment.experimental_strategy', datum.id as string, queryId)
          }
          colors={colors}
          legends={[
            {
              anchor: 'bottom',
              translateX: 0,
              translateY: 100,
              direction: 'column',
              itemWidth: 100,
              itemHeight: LEGEND_ITEM_HEIGHT,
            },
          ]}
          {...graphModalSettings}
        />
      }
      modalSettings={{
        width: 1000,
        height: 600,
      }}
      content={
        !data?.length ? (
          <Empty imageType="grid" description={intl.get('api.noData')} />
        ) : (
          <PieChart
            data={data}
            onClick={(datum) =>
              isPlayable &&
              addToQuery('sequencing_experiment.experimental_strategy', datum.id as string, queryId)
            }
            colors={colors}
            {...graphSetting}
          />
        )
      }
    />
  );
};

export default ExperimentalStrategyGraphCard;
