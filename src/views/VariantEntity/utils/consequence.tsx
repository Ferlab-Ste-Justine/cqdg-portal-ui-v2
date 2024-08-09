import { ReactNode } from 'react';
import intl from 'react-intl-universal';
import { CheckCircleFilled } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { pickImpactBadge } from '@ferlab/ui/core/components/Consequences/Cell';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import CanonicalIcon from '@ferlab/ui/core/components/Icons/CanonicalIcon';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { hydrateResults } from '@ferlab/ui/core/graphql/utils';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import {
  getLongPredictionLabelIfKnown,
  INDEX_IMPACT_PREDICTION_FIELD,
  INDEX_IMPACT_PREDICTION_SHORT_LABEL,
  INDEX_IMPACT_SCORE,
} from '@ferlab/ui/core/pages/EntityPage/utils/consequences';
import { toExponentialNotation } from '@ferlab/ui/core/utils/numberUtils';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Space, Table, Tag, Tooltip, Typography } from 'antd';
import { ColumnType } from 'antd/lib/table';
import {
  IConsequenceEntity,
  IConservationsEntity,
  IGeneEntity,
  IPredictionEntity,
} from 'graphql/variants/models';
import capitalize from 'lodash/capitalize';

import { getEntityConsequenceDictionary } from 'utils/translation';

import style from '../index.module.css';

const { Text } = Typography;

export const getColumn = (geneSymbolOfPicked?: string): ProColumnType[] => [
  {
    key: 'symbol',
    title: intl.get('entities.variant.gene'),
    render: (gene: IGeneEntity) =>
      gene.symbol ? (
        <>
          <ExternalLink href={`https://www.omim.org/entry/${gene.omim_gene_id}`}>
            {gene.symbol}
          </ExternalLink>
          {gene.symbol === geneSymbolOfPicked && (
            <Tooltip title={intl.get('entities.variant.details.pickedTooltip')}>
              <CheckCircleFilled className={style.pickedIcon} />
            </Tooltip>
          )}
        </>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'biotype',
    dataIndex: 'biotype',
    title: intl.get('entities.variant.geneType'),
    render: (biotype: string) =>
      biotype ? removeUnderscoreAndCapitalize(biotype) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'pli',
    dataIndex: 'gnomad',
    title: intl.get('entities.variant.details.pli'),
    render: (gnomad: { pli: number }) =>
      gnomad?.pli ? toExponentialNotation(gnomad.pli) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'loeuf',
    dataIndex: 'gnomad',
    title: intl.get('entities.variant.details.loeuf'),
    render: (gnomad: { loeuf: string }) => gnomad?.loeuf || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'spliceai',
    dataIndex: 'spliceai',
    title: intl.get('entities.variant.details.spliceAi'),
    render: (spliceAi: { ds: number; type: string[] }) =>
      spliceAi?.ds ? (
        <>
          <span className={style.spliceAi}>{spliceAi.ds}</span>
          {spliceAi.type.map((t: string, index: number) => (
            <Tooltip key={index} title={intl.get(`entities.variant.details.spliceAiType.${t}`)}>
              <Tag>{t}</Tag>
            </Tooltip>
          ))}
        </>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
];

export const getPredictionScore = (
  predictions: IPredictionEntity,
  dictionary: {
    sift: string;
    fathmm: string;
    caddRaw: string;
    caddPhred: string;
    dann: string;
    lrt: string;
    revel: string;
    polyphen2: string;
  },
): (string | number | null)[][] =>
  [
    [dictionary.sift, predictions?.sift_pred, predictions?.sift_score],
    [dictionary.fathmm, predictions?.fathmm_pred, predictions?.fathmm_score],
    [dictionary.caddRaw, null, predictions?.cadd_score],
    [dictionary.caddPhred, null, predictions?.cadd_phred],
    [dictionary.dann, null, predictions?.dann_score],
    [dictionary.lrt, predictions?.lrt_pred, predictions?.lrt_score],
    [dictionary.revel, null, predictions?.revel_score],
    [dictionary.polyphen2, predictions?.polyphen2_hvar_pred, predictions?.polyphen2_hvar_score],
  ].filter(([, , score]) => score || score === 0);

export const getExpandedColumns = (): ColumnType<any>[] => [
  {
    key: 'aa_change',
    dataIndex: 'aa_change',
    title: (
      <Tooltip title={intl.get('entities.variant.consequences.aaColumnTooltip')}>
        <Text className={style.tooltip}>{intl.get('entities.variant.consequences.aaColumn')}</Text>
      </Tooltip>
    ),
    render: (aa_change: string) => aa_change || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'consequence',
    title: intl.get('entities.variant.consequences.consequence'),
    render: (consequence: IConsequenceEntity) => {
      if (!consequence.consequence?.length) return TABLE_EMPTY_PLACE_HOLDER;
      return (
        <>
          <Tooltip
            title={intl.get(
              `entities.variant.consequences.impactTooltip.${consequence.vep_impact}`,
            )}
          >
            <Text>{pickImpactBadge(consequence.vep_impact)}</Text>
          </Tooltip>
          <Text className={style.consequence}>
            {removeUnderscoreAndCapitalize(consequence.consequence[0])}
          </Text>
        </>
      );
    },
  },
  {
    key: 'coding_dna_change',
    dataIndex: 'coding_dna_change',
    title: intl.get('entities.variant.consequences.cdnaChangeColumn'),
    render: (coding_dna_change: string) => coding_dna_change || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'predictions',
    dataIndex: 'predictions',
    title: intl.get('entities.variant.consequences.predictions.predictions'),
    render: (predictions: IPredictionEntity) => {
      const impact = getPredictionScore(predictions, getEntityConsequenceDictionary().predictions);
      if (!impact?.length) return TABLE_EMPTY_PLACE_HOLDER;
      return (
        <ExpandableCell
          dataSource={impact}
          dictionnary={{
            'see.less': intl.get('global.seeLess'),
            'see.more': intl.get('global.seeMore'),
          }}
          nOfElementsWhenCollapsed={2}
          renderItem={(item: any, id) => {
            const predictionField = item[INDEX_IMPACT_PREDICTION_FIELD];
            const score = item[INDEX_IMPACT_SCORE];
            const predictionShortLabel = item[INDEX_IMPACT_PREDICTION_SHORT_LABEL];
            const predictionLongLabel = getLongPredictionLabelIfKnown(
              predictionField,
              predictionShortLabel,
            );
            const label = predictionLongLabel || predictionShortLabel;
            const description = label ? `${capitalize(label)} (${score})` : score;

            return (
              <StackLayout horizontal key={id}>
                <Text className={style.predictionLabel}>
                  {intl.get(
                    `entities.variant.details.${
                      predictionField[0].toLowerCase() + predictionField.slice(1)
                    }`,
                  )}
                  :
                </Text>
                <Text>{description}</Text>
              </StackLayout>
            );
          }}
        />
      );
    },
  },
  {
    key: 'conservations',
    dataIndex: 'conservations',
    title: intl.get('entities.variant.consequences.conservation'),
    render: (conservations: IConservationsEntity) =>
      conservations?.phyloP17way_primate ? (
        <StackLayout horizontal>
          <Text className={style.conservationLabel}>
            {intl.get('entities.variant.details.phyloP17Way')}:
          </Text>
          <Text>{conservations.phyloP17way_primate}</Text>
        </StackLayout>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'ensembl_transcript_id',
    title: intl.get('entities.variant.consequences.transcripts'),
    render: (consequence: IConsequenceEntity) => {
      const { ensembl_transcript_id, canonical } = consequence;
      return (
        <Space>
          <ExternalLink href={`https://www.ensembl.org/id/${ensembl_transcript_id}`}>
            {ensembl_transcript_id}
          </ExternalLink>
          {canonical && (
            <Tooltip title={intl.get('entities.variant.consequences.canonical')}>
              <div>
                <CanonicalIcon className={style.canonicalIcon} height={14} width={14} />
              </div>
            </Tooltip>
          )}
        </Space>
      );
    },
  },
  {
    title: intl.get('entities.variant.consequences.refSeq'),
    dataIndex: 'refseq_mrna_id',
    key: 'consequences',
    render: (refseq_mrna_id: string[]) => {
      if (!refseq_mrna_id?.length) return TABLE_EMPTY_PLACE_HOLDER;
      return (
        <ExpandableCell
          dataSource={refseq_mrna_id}
          dictionnary={{
            'see.less': intl.get('global.seeLess'),
            'see.more': intl.get('global.seeMore'),
          }}
          nOfElementsWhenCollapsed={1}
          renderItem={(item: string, id) => (
            <StackLayout horizontal key={id}>
              <ExternalLink href={`https://www.ncbi.nlm.nih.gov/nuccore/${item}?report=graph`}>
                {item}
              </ExternalLink>
            </StackLayout>
          )}
        />
      );
    },
  },
];

export const expandedRowRender = (row: IGeneEntity): ReactNode => (
  <Table
    className={style.expandedTable}
    columns={getExpandedColumns()}
    dataSource={hydrateResults(row.consequences?.hits?.edges || [])}
    pagination={false}
    bordered
  />
);
