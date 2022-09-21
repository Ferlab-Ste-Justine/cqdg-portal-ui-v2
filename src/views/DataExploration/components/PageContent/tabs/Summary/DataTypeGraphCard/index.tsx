import intl from 'react-intl-universal';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { DATATYPE_QUERY } from 'graphql/summary/queries';
import CardHeader from 'views/Dashboard/components/CardHeader';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import BarChart from 'components/uiKit/charts/Bar';
import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';
import { toChartData } from 'utils/charts';
import { truncateString } from 'utils/string';

interface OwnProps {
  id: string;
  className?: string;
}

const transformData = (results: any) =>
  (results?.Participant?.aggregations?.files__data_type.buckets || []).map(toChartData);

const graphSetting: any = {
  height: 300,
  margin: {
    bottom: 45,
    left: 125,
  },
  enableLabel: false,
  layout: 'horizontal',
};

const addToQuery = (field: string, key: string) =>
  updateActiveQueryField({
    queryBuilderId: DATA_EXPLORATION_QB_ID,
    field,
    value: [key.toLowerCase() === intl.get('api.noData') ? ArrangerValues.missing : key],
    index: INDEXES.FILE,
  });

const DataTypeGraphCard = ({ id, className = '' }: OwnProps) => {
  const sqon = useParticipantResolvedSqon(DATA_EXPLORATION_QB_ID);
  const { loading, result } = useLazyResultQuery(DATATYPE_QUERY, {
    variables: { sqon },
  });
  const dataTypeResults = transformData(result);

  return (
    <GridCard
      wrapperClassName={className}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      title={
        <CardHeader
          id={id}
          title={intl.get('screen.dataExploration.tabs.summary.availableData.dataTypeTitle')}
          withHandle
        />
      }
      content={
        <>
          <BarChart
            data={dataTypeResults}
            axisLeft={{
              legend: intl.get('screen.dataExploration.tabs.summary.availableData.dataTypes'),
              legendPosition: 'middle',
              legendOffset: -120,
              format: (title: string) => truncateString(title, 15),
            }}
            tooltipLabel={(node) => node.data.id}
            axisBottom={{
              legend: intl.get('screen.dataExploration.tabs.summary.availableData.axis'),
              legendPosition: 'middle',
              legendOffset: 35,
            }}
            onClick={(datum) => addToQuery('data_type', datum.indexValue as string)}
            {...graphSetting}
          />
        </>
      }
    />
  );
};

export default DataTypeGraphCard;
