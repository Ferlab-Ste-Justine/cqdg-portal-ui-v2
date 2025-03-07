import intl from 'react-intl-universal';
import BarChart from '@ferlab/ui/core/components/Charts/Bar';
import Empty from '@ferlab/ui/core/components/Empty';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import { RangeOperators } from '@ferlab/ui/core/data/sqon/operators';
import ResizableGridCard from '@ferlab/ui/core/layout/ResizableGridLayout/ResizableGridCard';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { AGE_AT_DIAGNOSIS_QUERY } from 'graphql/summary/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';
import { getResizableGridDictionary } from 'utils/translation';

type DiagnosisQueryResult = {
  data: {
    [key: string]: {
      [key: string]: {
        total: number;
      };
    };
  };
};

const KEY_TO_IGNORES = ['hits'];

const transformAgeAtDiagnosis = (results: DiagnosisQueryResult, total?: number) =>
  Object.keys(results?.data?.participant || {})
    .map((key) => ({
      id: intl.get(`screen.dataExploration.tabs.summary.ageAtDiagnosis.${key}`),
      label: key,
      value: results?.data?.participant[key]?.total || 0,
      frequency: total ? (results?.data?.participant[key]?.total || 0 * 100) / total : 0,
    }))
    .filter((e) => !KEY_TO_IGNORES.includes(e.label));

const buildSqonFromRange = (rangeValue: string) => {
  switch (rangeValue) {
    case '_0to1':
      return {
        op: RangeOperators['<='],
        value: [364],
      };

    case '_1to5':
      return {
        op: RangeOperators['between'],
        value: [365, 1824],
      };
    case '_5to10':
      return {
        op: RangeOperators['between'],
        value: [1825, 3649],
      };

    case '_10to15':
      return {
        op: RangeOperators['between'],
        value: [3650, 5474],
      };
    case '_15to18':
      return {
        op: RangeOperators['between'],
        value: [5475, 6569],
      };

    case '_18plus':
      return {
        op: RangeOperators['>='],
        value: [6570],
      };
    default:
      return {
        op: undefined,
        value: [ArrangerValues.missing],
      };
  }
};

const addToQuery = (field: string, key: string, queryId: string) => {
  const sqon = buildSqonFromRange(key);
  return updateActiveQueryField({
    queryBuilderId: queryId,
    field,
    value: sqon.value,
    operator: sqon.op,
    index: INDEXES.PARTICIPANT,
  });
};

const AgeAtDiagnosisGraphCard = ({
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
  const { loading, result } = useLazyResultQuery(AGE_AT_DIAGNOSIS_QUERY, {
    variables: { sqon },
  });
  const ageAtDiagnosisresults = transformAgeAtDiagnosis(result, result?.hits?.total);

  return (
    <ResizableGridCard
      gridUID={gridUID}
      id={id}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      dictionary={getResizableGridDictionary().download}
      headerTitle={intl.get('screen.dataExploration.tabs.summary.ageAtDiagnosis.cardTitle')}
      tsvSettings={{
        data: [ageAtDiagnosisresults],
      }}
      titleTruncateThresholdWidth={70}
      modalContent={
        <BarChart
          data={ageAtDiagnosisresults}
          tooltipLabel={(node: any) => `Participant${node.data.value > 1 ? 's' : ''}`}
          axisLeft={{
            legend: intl.get('screen.dataExploration.tabs.summary.availableData.axis'),
            legendPosition: 'middle',
            legendOffset: -45,
          }}
          axisBottom={{
            legend: intl.get('entities.participant.age_at_diagnosis'),
            legendPosition: 'middle',
            legendOffset: 35,
          }}
          onClick={(datum: any) =>
            isPlayable &&
            addToQuery('diagnosis.age_at_event_days', datum.data.label as string, queryId)
          }
          margin={{
            top: 12,
            bottom: 45,
            left: 60,
            right: 24,
          }}
          layout="vertical"
        />
      }
      modalSettings={{
        width: 800,
        height: 300,
      }}
      content={
        <>
          {!ageAtDiagnosisresults?.length ? (
            <Empty imageType="grid" size="large" description={intl.get('api.noData')} />
          ) : (
            <BarChart
              data={ageAtDiagnosisresults}
              tooltipLabel={(node: any) => `Participant${node.data.value > 1 ? 's' : ''}`}
              axisLeft={{
                legend: intl.get('screen.dataExploration.tabs.summary.availableData.axis'),
                legendPosition: 'middle',
                legendOffset: -45,
              }}
              axisBottom={{
                legend: intl.get('entities.participant.age_at_diagnosis'),
                legendPosition: 'middle',
                legendOffset: 35,
              }}
              onClick={(datum: any) =>
                isPlayable &&
                addToQuery('diagnosis.age_at_event_days', datum.data.label as string, queryId)
              }
              margin={{
                top: 12,
                bottom: 45,
                left: 60,
                right: 24,
              }}
              layout="vertical"
            />
          )}
        </>
      }
    />
  );
};

export default AgeAtDiagnosisGraphCard;
