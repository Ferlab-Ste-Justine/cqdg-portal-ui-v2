import intl from 'react-intl-universal';
import BarChart from '@ferlab/ui/core/components/Charts/Bar';
import Empty from '@ferlab/ui/core/components/Empty';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import ResizableGridCard from '@ferlab/ui/core/layout/ResizableGridLayout/ResizableGridCard';
import { aggregationToChartData } from '@ferlab/ui/core/layout/ResizableGridLayout/utils';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { PARTICIPANT_AGG_QUERY } from 'graphql/summary/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';
import { truncateString } from 'utils/string';
import { getResizableGridDictionary } from 'utils/translation';

const addToQuery = (field: string, key: string, queryId: string) =>
  updateActiveQueryField({
    queryBuilderId: queryId,
    field,
    value: [key.toLowerCase() === 'no data' ? ArrangerValues.missing : key],
    index: INDEXES.FILE,
  });

const DataTypeGraphCard = ({
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
    result?.Participant?.aggregations?.files__data_type.buckets,
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
      headerTitle={intl.get('entities.participant.participantsByDataType')}
      tsvSettings={{
        data: [data],
      }}
      modalContent={
        <BarChart
          data={data}
          axisLeft={{
            legend: intl.get('entities.file.data_type'),
            legendPosition: 'middle',
            legendOffset: -128,
            format: (title: string) => truncateString(title, 15),
          }}
          tooltipLabel={(node: any) => node.data.id}
          axisBottom={{
            legend: intl.get('screen.dataExploration.tabs.summary.availableData.axis'),
            legendPosition: 'middle',
            legendOffset: 35,
          }}
          onClick={(datum: any) =>
            isPlayable && addToQuery('data_type', datum.indexValue as string, queryId)
          }
          margin={{
            bottom: 45,
            left: 140,
            right: 12,
            top: 12,
          }}
          layout="horizontal"
        />
      }
      modalSettings={{
        width: 800,
        height: 400,
      }}
      content={
        <>
          {!data?.length ? (
            <Empty imageType="grid" size="large" description={intl.get('api.noData')} />
          ) : (
            <BarChart
              data={data}
              axisLeft={{
                legend: intl.get('entities.file.data_type'),
                legendPosition: 'middle',
                legendOffset: -128,
                format: (title: string) => truncateString(title, 15),
              }}
              tooltipLabel={(node: any) => node.data.id}
              axisBottom={{
                legend: intl.get('screen.dataExploration.tabs.summary.availableData.axis'),
                legendPosition: 'middle',
                legendOffset: 35,
              }}
              onClick={(datum: any) =>
                isPlayable && addToQuery('data_type', datum.indexValue as string, queryId)
              }
              margin={{
                bottom: 45,
                left: 140,
                right: 12,
                top: 12,
              }}
              layout="horizontal"
            />
          )}
        </>
      }
    />
  );
};

export default DataTypeGraphCard;
