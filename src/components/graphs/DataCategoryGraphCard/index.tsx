import intl from 'react-intl-universal';
import BarChart from '@ferlab/ui/core/components/Charts/Bar';
import Empty from '@ferlab/ui/core/components/Empty';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import ResizableGridCard from '@ferlab/ui/core/layout/ResizableGridLayout/ResizableGridCard';
import { aggregationToChartData } from '@ferlab/ui/core/layout/ResizableGridLayout/utils';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { DATA_CATEGORY_QUERY } from 'graphql/summary/queries';
import isEmpty from 'lodash/isEmpty';

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

const DataCategoryGraphCard = ({
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
  const { loading, result } = useLazyResultQuery(DATA_CATEGORY_QUERY, {
    variables: { sqon },
  });
  const dataCategoryResults = aggregationToChartData(
    result?.Participant?.aggregations?.files__data_category.buckets,
    result?.Participant?.hits?.total,
  );

  return (
    <ResizableGridCard
      gridUID={gridUID}
      id={id}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      dictionary={getResizableGridDictionary()}
      headerTitle={intl.get('screen.dataExploration.tabs.summary.availableData.dataCategoryTitle')}
      tsvSettings={{
        data: [dataCategoryResults],
      }}
      modalContent={
        <BarChart
          data={dataCategoryResults}
          axisLeft={{
            legend: intl.get('entities.file.data_category'),
            legendPosition: 'middle',
            legendOffset: -110,
            format: (title: string) => truncateString(title, 15),
          }}
          tooltipLabel={(node: any) => node.data.id}
          axisBottom={{
            legend: intl.get('screen.dataExploration.tabs.summary.availableData.axis'),
            legendPosition: 'middle',
            legendOffset: 35,
          }}
          onClick={(datum: any) =>
            isPlayable && addToQuery('data_category', datum.indexValue as string, queryId)
          }
          layout="horizontal"
          margin={{
            bottom: 45,
            left: 125,
            right: 12,
            top: 12,
          }}
        />
      }
      modalSettings={{
        width: 800,
        height: 300,
      }}
      content={
        <>
          {isEmpty(dataCategoryResults) ? (
            <Empty imageType="grid" size="large" />
          ) : (
            <BarChart
              data={dataCategoryResults}
              axisLeft={{
                legend: intl.get('entities.file.data_category'),
                legendPosition: 'middle',
                legendOffset: -110,
                format: (title: string) => truncateString(title, 15),
              }}
              tooltipLabel={(node: any) => node.data.id}
              axisBottom={{
                legend: intl.get('screen.dataExploration.tabs.summary.availableData.axis'),
                legendPosition: 'middle',
                legendOffset: 35,
              }}
              onClick={(datum: any) =>
                isPlayable && addToQuery('data_category', datum.indexValue as string, queryId)
              }
              layout="horizontal"
              margin={{
                bottom: 45,
                left: 125,
                right: 12,
                top: 12,
              }}
            />
          )}
        </>
      }
    />
  );
};

export default DataCategoryGraphCard;
