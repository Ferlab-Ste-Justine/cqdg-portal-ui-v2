import intl from 'react-intl-universal';
import PieChart from '@ferlab/ui/core/components/Charts/Pie';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import ResizableGridCard from '@ferlab/ui/core/layout/ResizableGridLayout/ResizableGridCard';
import { aggregationToChartData } from '@ferlab/ui/core/layout/ResizableGridLayout/utils';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { STUDIESPIE_QUERY } from 'graphql/summary/queries';

import { getCommonColors } from 'common/charts';
import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';
import { getResizableGridDictionary } from 'utils/translation';

import { graphModalSettings, graphSetting } from '../common';

const colors = getCommonColors();

const addToQuery = (field: string, key: string, index: string, queryId: string) =>
  updateActiveQueryField({
    queryBuilderId: queryId,
    field,
    value: [key.toLowerCase() === intl.get('api.noData') ? ArrangerValues.missing : key],
    index,
  });

const StudyParticipantsGraphCard = ({
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

  const data = aggregationToChartData(
    result?.Participant?.aggregations?.study__study_code.buckets,
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
      headerTitle={`${intl.get('entities.study.study')} - ${intl.get(
        'entities.participant.participants',
      )}`}
      tsvSettings={{ data: [data] }}
      modalContent={
        <PieChart
          data={data}
          onClick={(datum) => addToQuery('study_code', datum.id as string, INDEXES.STUDY, queryId)}
          colors={colors}
          {...graphModalSettings}
        />
      }
      content={
        <PieChart
          data={data}
          onClick={(datum) => addToQuery('study_code', datum.id as string, INDEXES.STUDY, queryId)}
          colors={colors}
          {...graphSetting}
        />
      }
    />
  );
};

export default StudyParticipantsGraphCard;
