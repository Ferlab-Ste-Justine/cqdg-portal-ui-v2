import intl from 'react-intl-universal';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import Empty from '@ferlab/ui/core/components/Empty';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import ExpandableTable from '@ferlab/ui/core/components/tables/ExpandableTable';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Card, Space, Tag, Tooltip, Typography } from 'antd';
import { ArrangerEdge } from 'graphql/models';
import { Impact, IVariantConsequence, IVariantEntity, IVariantGene } from 'graphql/variants/models';
import capitalize from 'lodash/capitalize';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import CanonicalIcon from 'components/Icons/CanonicalIcon';
const { Title } = Typography;

import styles from './index.module.scss';

export const getVepImpactTag = (score: number | string) => {
  switch (score) {
    case 1:
    case 'modifier':
      return <Tag>{intl.get('screen.variants.consequences.impactTag.modifier')}</Tag>;
    case 2:
    case 'low':
      return <Tag color="green">{intl.get('screen.variants.consequences.impactTag.low')}</Tag>;
    case 3:
    case 'moderate':
      return <Tag color="gold">{intl.get('screen.variants.consequences.impactTag.moderate')}</Tag>;
    case 4:
    case 'high':
      return <Tag color="red">{intl.get('screen.variants.consequences.impactTag.high')}</Tag>;
  }
};

type TableGroup = {
  consequences: ArrangerEdge<IVariantConsequence>[];
  omim: string;
  symbol: string;
  ensembleGeneId: string;
};

type SymbolToConsequences = {
  [key: string]: TableGroup;
};

const { Text } = Typography;

const INDEX_IMPACT_PREDICTION_FIELD = 0;
const INDEX_IMPACT_PREDICTION_SHORT_LABEL = 1;
const INDEX_IMPACT_SCORE = 2;

const shortToLongPrediction: Record<string, string> = {
  'sift.d': 'damaging',
  'sift.t': 'tolerated',
  'polyphen2.p': 'possibly damaging',
  'polyphen2.d': 'probably damaging',
  'polyphen2.b': 'benign',
  'fathmm.d': 'damaging',
  'fathmm.t': 'tolerated',
  'lrt.d': 'deleterious',
  'lrt.n': 'neutral',
  'lrt.u': 'unknown',
};

const getLongPredictionLabelIfKnown = (predictionField: string, predictionShortLabel: string) => {
  if (!predictionField || !predictionShortLabel) {
    return null;
  }
  const dictionaryPath = `${predictionField.toLowerCase()}.${predictionShortLabel.toLowerCase()}`;
  const longPrediction = shortToLongPrediction[dictionaryPath];
  return longPrediction || null;
};

const groupConsequencesBySymbol = (
  consequences: ArrangerEdge<IVariantConsequence>[],
  genes: ArrangerEdge<IVariantGene>[],
) => {
  if (!consequences.length) {
    return {};
  }
  return consequences.reduce(
    (acc: SymbolToConsequences, consequence: ArrangerEdge<IVariantConsequence>) => {
      const symbol = consequence.node.symbol;
      if (!symbol) {
        return acc;
      }
      const gene = genes.find((g) => g.node.symbol === symbol);
      const omim = gene ? gene.node.omim_gene_id : '';
      const ensembleGeneId = consequence.node.ensembl_gene_id || '';
      const oldConsequences = acc[symbol]?.consequences || [];

      return {
        ...acc,
        [symbol]: {
          consequences: [...oldConsequences, { ...consequence }],
          omim,
          symbol,
          ensembleGeneId,
        },
      };
    },
    {},
  );
};

const orderGenes = (mSymbolToConsequences: SymbolToConsequences) => {
  if (!mSymbolToConsequences || Object.keys(mSymbolToConsequences).length === 0) {
    return [];
  }
  return Object.entries(mSymbolToConsequences).map(([, values]) => ({
    ...values,
  }));
};

const orderConsequencesForTable = (tableGroups: TableGroup[]) => {
  if (!tableGroups || tableGroups.length === 0) {
    return [];
  }

  return tableGroups.map((tableGroup: TableGroup) => {
    const consequences = tableGroup.consequences;
    return {
      ...tableGroup,
      consequences: consequences,
    };
  });
};

const makeTables = (
  rawConsequences: ArrangerEdge<IVariantConsequence>[],
  rawGenes: ArrangerEdge<IVariantGene>[],
) => {
  if (!rawConsequences?.length) {
    return [];
  }
  const symbolToConsequences = groupConsequencesBySymbol(rawConsequences, rawGenes);
  const orderedGenes = orderGenes(symbolToConsequences);
  return orderConsequencesForTable(orderedGenes);
};

const makeRows = (consequences: ArrangerEdge<IVariantConsequence>[]) =>
  consequences.map((consequence: ArrangerEdge<IVariantConsequence>, index: number) => ({
    key: `${index + 1}`,
    aa: consequence.node.aa_change,
    consequences: consequence.node.consequences?.filter((c) => c || c.length > 0),
    codingDna: consequence.node.coding_dna_change,
    strand: consequence.node.strand,
    vep: consequence.node.vep_impact,
    impact: [
      [
        'Sift',
        consequence.node.predictions?.sift_pred,
        consequence.node.predictions?.sift_converted_rankscore,
      ],
      [
        'Polyphen2',
        consequence.node.predictions?.polyphen2_hvar_pred,
        consequence.node.predictions?.sift_converted_rankscore,
      ],
      [
        'Fathmm',
        consequence.node.predictions?.fathmm_pred,
        consequence.node.predictions?.fathmm_converted_rankscore,
      ],
      ['Cadd', null, consequence.node.predictions?.cadd_rankscore],
      ['Dann', null, consequence.node.predictions?.dann_rankscore],
      [
        'Lrt',
        consequence.node.predictions?.lrt_pred,
        consequence.node.predictions?.lrt_converted_rankscore,
      ],
      ['Revel', null, consequence.node.predictions?.revel_rankscore],
    ].filter(([, , score]) => score),
    conservation: consequence.node.conservations?.phylo_p17way_primate_rankscore,
    transcript: {
      ids: consequence.node.refseq_mrna_id
        ? Array.isArray(consequence.node.refseq_mrna_id)
          ? consequence.node.refseq_mrna_id
          : [consequence.node.refseq_mrna_id]
        : [],
      transcriptId: consequence.node.ensembl_transcript_id || '',
      isCanonical: consequence.node.canonical || false,
    },
  }));

const columns = [
  {
    title: () => intl.get('screen.variants.consequences.AAColumn'),
    dataIndex: 'aa',
    render: (aa: string) => (
      <div className={styles.longValue}>{aa || TABLE_EMPTY_PLACE_HOLDER}</div>
    ),
    className: `${styles.longValue}`,
    width: '10%',
  },
  {
    title: () => intl.get('screen.variants.consequences.consequence'),
    dataIndex: 'consequences',
    render: (consequences: string[]) => {
      if (consequences.length === 0) {
        return '';
      }
      return (
        <ExpandableCell
          dataSource={consequences}
          renderItem={(item: any, id) => (
            <StackLayout key={id} horizontal className={styles.cellList}>
              <Text>{item}</Text>
            </StackLayout>
          )}
        />
      );
    },
    width: '15%',
  },
  {
    title: () => intl.get('screen.variants.consequences.CDNAChangeColumn'),
    dataIndex: 'codingDna',
    render: (codingDna: string) => (
      <div className={styles.longValue}>{codingDna || TABLE_EMPTY_PLACE_HOLDER}</div>
    ),
    width: '12%',
  },
  {
    title: () => intl.get('screen.variants.consequences.strand'),
    dataIndex: 'strand',
    render: (strand: string) => strand || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    title: () => intl.get('screen.variants.consequences.vep'),
    dataIndex: 'vep_impact',
    render: (vep: Impact) => getVepImpactTag(vep?.toLowerCase()) || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    title: () => intl.get('screen.variants.consequences.prediction'),
    dataIndex: 'impact',
    render: (impact: string[][]) => {
      if (!impact?.length) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={2}
          dataSource={impact}
          renderItem={(item: any, id) => {
            const predictionField = item[INDEX_IMPACT_PREDICTION_FIELD];
            const score = item[INDEX_IMPACT_SCORE];
            const predictionShortLabel = item[INDEX_IMPACT_PREDICTION_SHORT_LABEL];

            const predictionLongLabel = getLongPredictionLabelIfKnown(
              predictionField,
              predictionShortLabel,
            );

            const label = predictionLongLabel || predictionShortLabel;

            const description = label ? `${capitalize(label)} - ${score}` : score;
            return (
              <StackLayout key={id} horizontal className={styles.cellList}>
                <Text type={'secondary'}>{predictionField}:</Text>
                <Text>{description}</Text>
              </StackLayout>
            );
          }}
        />
      );
    },
    width: '15%',
  },
  {
    title: () => intl.get('screen.variants.consequences.conservationColumn'),
    dataIndex: 'conservation',
    render: (conservation: number) =>
      conservation == null ? TABLE_EMPTY_PLACE_HOLDER : conservation,
  },
  {
    title: () => intl.get('screen.variants.consequences.transcript'),
    dataIndex: 'transcript',
    render: (transcript: { transcriptId: string; isCanonical?: boolean }) => (
      <Space>
        {transcript.transcriptId}
        {transcript.isCanonical && (
          <Tooltip title={intl.get('screen.variants.consequences.canonical')}>
            <CanonicalIcon className={styles.canonicalIcon} height="14" width="14" />
          </Tooltip>
        )}
      </Space>
    ),
    width: '15%',
  },
  {
    title: () => intl.get('screen.variants.consequences.refSeq'),
    dataIndex: 'transcript',
    width: '15%',
    render: (transcript: { ids: string[] }) =>
      transcript?.ids?.map((id) => (
        <div key={id} className={styles.transcriptId}>
          <ExternalLink
            href={`https://www.ncbi.nlm.nih.gov/nuccore/${id}?report=graph`}
            className={styles.transcriptLink}
          >
            {id}
          </ExternalLink>
        </div>
      )) || TABLE_EMPTY_PLACE_HOLDER,
  },
];

const sortConsequences = (data: ArrangerEdge<IVariantConsequence>[]) =>
  data
    .sort((a, b) => b.node.impact_score! - a.node.impact_score!)
    .sort((a, b) => (a.node.canonical === b.node.canonical ? 0 : a.node.canonical ? -1 : 1));

interface IConsequencesProps {
  variant?: IVariantEntity;
  loading: boolean;
  id: string;
}

const Consequences = ({ variant, loading, id }: IConsequencesProps) => {
  const consequences = variant?.consequences?.hits?.edges || [];
  const genes = variant?.genes?.hits?.edges || [];

  const tables = makeTables(consequences, genes);

  return (
    <div id={id} className={styles.container}>
      <Title level={5} className={styles.title}>
        {intl.get('screen.variants.consequences.geneConsequences')}
      </Title>
      <Collapse defaultActiveKey={['1']} className={styles.collapse} arrowIcon="caretFilled">
        <CollapsePanel
          header={intl.get('screen.variants.consequences.geneConsequences')}
          key="1"
          className={styles.panel}
        >
          <Card loading={loading} className={styles.card}>
            <Space className={styles.consequenceCards} direction="vertical" size={48}>
              {tables.length > 0 ? (
                tables.map((tableData: TableGroup, index: number) => {
                  const symbol = tableData.symbol;
                  const omim = tableData.omim;
                  const orderedConsequences = sortConsequences(tableData.consequences);

                  return (
                    <Space
                      key={index}
                      direction="vertical"
                      className={styles.consequenceTableWrapper}
                      size={12}
                    >
                      <Space size={12}>
                        <Space size={4}>
                          <span>
                            <ExternalLink
                              href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${symbol}`}
                            >
                              {symbol}
                            </ExternalLink>
                          </span>
                        </Space>
                        <Space size={4}>
                          {omim && (
                            <>
                              <span>{intl.get('screen.variants.consequences.omim')}</span>
                              <span>
                                <ExternalLink href={`https://omim.org/entry/${omim}`}>
                                  {omim}
                                </ExternalLink>
                              </span>
                            </>
                          )}
                        </Space>
                      </Space>
                      <ExpandableTable
                        bordered={true}
                        nOfElementsWhenCollapsed={1}
                        buttonText={(showAll, hiddenNum) =>
                          showAll
                            ? intl.get('screen.variants.consequences.hidetranscript')
                            : intl.get('screen.variants.consequences.showtranscript', {
                                count: hiddenNum,
                              })
                        }
                        key={index}
                        dataSource={makeRows(orderedConsequences)}
                        columns={columns}
                        pagination={false}
                        size="small"
                      />
                    </Space>
                  );
                })
              ) : (
                <Empty
                  showImage={false}
                  noPadding
                  align="left"
                  description={intl.get('no.data.available')}
                />
              )}
            </Space>
          </Card>
        </CollapsePanel>
      </Collapse>
    </div>
  );
};

export default Consequences;
