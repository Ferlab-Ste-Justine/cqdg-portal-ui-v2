import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Table, Typography } from 'antd';
import { ArrangerEdge, ArrangerResultsTree } from 'graphql/models';
import {
  ClinicalGenesTableSource,
  Conditions,
  CosmicConditions,
  CosmicEntity,
  DddConditions,
  DddEntity,
  HpoConditions,
  HpoEntity,
  Inheritance,
  IVariantEntity,
  IVariantGene,
  OmimConditions,
  OmimEntity,
  OmimGene,
  OmimInheritance,
  OrphanetConditions,
  OrphanetEntity,
  OrphanetInheritance,
  SingleValuedInheritance,
} from 'graphql/variants/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { toKebabCase } from 'utils/helper';

import CosmicConditionCell from './conditions/CosmicConditionCell';
import DddConditionCell from './conditions/DddConditionCell';
import HpoConditionCell from './conditions/HpoConditionCell';
import OmimConditionCell from './conditions/OmimConditionCell';
import OrphanetConditionCell from './conditions/OrphanetConditionCell';

import styles from './index.module.scss';

type Record = {
  source: ClinicalGenesTableSource;
  gene: string | OmimGene;
  conditions: Conditions;
  inheritance: Inheritance;
};

export const columnsPhenotypes = [
  {
    title: intl.get('screen.variants.pathogenicity.source'),
    dataIndex: 'source',
  },
  {
    title: intl.get('screen.variants.pathogenicity.gene'),
    dataIndex: 'gene',
    render: (text: Conditions, record: Record) => {
      const source = record.source;
      if (source === ClinicalGenesTableSource.omim) {
        const [geneName, omimId] = record.gene as OmimGene;
        return (
          <>
            {`${geneName} (OMIM:`}
            <ExternalLink href={`https://www.omim.org/entry/${omimId}`}>{omimId}</ExternalLink>)
          </>
        );
      }
      return record.gene;
    },
  },
  {
    title: intl.get('screen.variants.pathogenicity.condition'),
    dataIndex: 'conditions',
    render: (text: Conditions, record: Record) => {
      switch (record.source) {
        case ClinicalGenesTableSource.omim:
          return <OmimConditionCell conditions={record.conditions as OmimConditions} />;
        case ClinicalGenesTableSource.orphanet:
          return <OrphanetConditionCell conditions={record.conditions as OrphanetConditions} />;
        case ClinicalGenesTableSource.hpo:
          return <HpoConditionCell conditions={record.conditions as HpoConditions} />;
        case ClinicalGenesTableSource.ddd:
          return <DddConditionCell conditions={record.conditions as DddConditions} />;
        default:
          return <CosmicConditionCell conditions={record.conditions as CosmicConditions} />;
      }
    },
    width: '33%',
  },
  {
    title: intl.get('screen.variants.pathogenicity.inheritance'),
    dataIndex: 'inheritance',
    render: (text: Inheritance, record: Record) => {
      const source = record.source;
      if (source === ClinicalGenesTableSource.orphanet) {
        const orphanetInheritance = (record.inheritance || []) as OrphanetInheritance;
        return (
          <>
            {orphanetInheritance.map((inheritance: string[], index: number) => (
              <StackLayout key={index}>
                <Typography.Text>
                  {inheritance ? inheritance.join(',') : TABLE_EMPTY_PLACE_HOLDER}
                </Typography.Text>
              </StackLayout>
            ))}
          </>
        );
      } else if (source === ClinicalGenesTableSource.omim) {
        const omimInheritance = record.inheritance as OmimInheritance;
        return (
          <>
            {omimInheritance.map((inheritance: string[], index: number) => (
              <StackLayout key={index}>
                <Typography.Text>
                  {inheritance ? inheritance.join(',') : TABLE_EMPTY_PLACE_HOLDER}
                </Typography.Text>
              </StackLayout>
            ))}
          </>
        );
      }
      const inheritance = record.inheritance as SingleValuedInheritance;
      return inheritance || TABLE_EMPTY_PLACE_HOLDER;
    },
    width: '33%',
  },
];

const orphanetFromEdges = (
  gene: ArrangerEdge<IVariantGene>,
  orphanetEdges: ArrangerEdge<OrphanetEntity>[],
) =>
  orphanetEdges.length > 0
    ? {
        source: ClinicalGenesTableSource.orphanet,
        gene: gene.node.symbol,
        conditions: orphanetEdges.map((orphanetNode) => ({
          panel: orphanetNode.node.panel,
          disorderId: orphanetNode.node.disorder_id,
        })),
        inheritance: orphanetEdges.map((orphanetNode) => orphanetNode.node.inheritance),
      }
    : null;

const omimFromEdges = (gene: ArrangerEdge<IVariantGene>, omimEdges: ArrangerEdge<OmimEntity>[]) =>
  omimEdges.length > 0
    ? {
        source: ClinicalGenesTableSource.omim,
        gene: [gene.node.symbol, gene.node.omim_gene_id],
        conditions: omimEdges.map((omimNode: ArrangerEdge<OmimEntity>) => ({
          omimName: omimNode.node.name,
          omimId: omimNode.node.omim_id,
        })),
        inheritance:
          omimEdges.map((omimNode: ArrangerEdge<OmimEntity>) => omimNode.node.inheritance) || [],
      }
    : null;

const hpoFromEdges = (gene: ArrangerEdge<IVariantGene>, hpoEdges: ArrangerEdge<HpoEntity>[]) =>
  hpoEdges.length > 0
    ? {
        source: ClinicalGenesTableSource.hpo,
        gene: gene.node.symbol,
        conditions: hpoEdges.map((hpoNode: ArrangerEdge<HpoEntity>) => ({
          hpoTermLabel: hpoNode.node.hpo_term_label,
          hpoTermTermId: hpoNode.node.hpo_term_id,
        })),
        inheritance: '',
      }
    : null;

const dddFromEdges = (gene: ArrangerEdge<IVariantGene>, dddEdges: ArrangerEdge<DddEntity>[]) =>
  dddEdges.length > 0
    ? {
        source: ClinicalGenesTableSource.ddd,
        gene: gene.node.symbol,
        conditions: dddEdges.map((dddNode: ArrangerEdge<DddEntity>) => dddNode.node.disease_name),
        inheritance: '',
      }
    : null;

const cosmicFromEdges = (
  gene: ArrangerEdge<IVariantGene>,
  cosmicEdges: ArrangerEdge<CosmicEntity>[],
) =>
  cosmicEdges.length > 0
    ? {
        source: ClinicalGenesTableSource.cosmic,
        gene: gene.node.symbol,
        conditions: cosmicEdges
          .map((cosmicNode: ArrangerEdge<CosmicEntity>) => cosmicNode.node.tumour_types_germline)
          .flat(),
        inheritance: '',
      }
    : null;

const keepOnlyOmimWithId = (arr: ArrangerEdge<OmimEntity>[]) =>
  arr.filter((omimNode: ArrangerEdge<OmimEntity>) => omimNode.node.omim_id);

export const makeUnGroupedDataRows = (genes: ArrangerEdge<IVariantGene>[]) => {
  if (!genes.length) {
    return [];
  }

  return genes.map((gene) => {
    const rowOrphanet = orphanetFromEdges(gene, gene.node.orphanet?.hits?.edges || []);
    const rowOmim = omimFromEdges(gene, keepOnlyOmimWithId(gene.node.omim?.hits?.edges || []));
    const rowCosmic = cosmicFromEdges(gene, gene.node.cosmic?.hits?.edges || []);
    const rowHpo = hpoFromEdges(gene, gene.node.hpo?.hits?.edges || []);
    const rowDdd = dddFromEdges(gene, gene.node.ddd?.hits?.edges || []);

    return [rowOrphanet, rowOmim, rowHpo, rowDdd, rowCosmic].filter((row) => row).flat();
  });
};

export const groupRowsBySource = (ungroupedDataTable: any[]) => {
  const orphanetRows = ungroupedDataTable
    .flat()
    .filter((row) => row.source === ClinicalGenesTableSource.orphanet);
  const omimRows = ungroupedDataTable
    .flat()
    .filter((row) => row.source === ClinicalGenesTableSource.omim);
  const hpoRows = ungroupedDataTable
    .flat()
    .filter((row) => row.source === ClinicalGenesTableSource.hpo);
  const dddRows = ungroupedDataTable
    .flat()
    .filter((row) => row.source === ClinicalGenesTableSource.ddd);
  const cosmicRows = ungroupedDataTable
    .flat()
    .filter((row) => row.source === ClinicalGenesTableSource.cosmic);

  return [...orphanetRows, ...omimRows, ...hpoRows, ...dddRows, ...cosmicRows];
};

const makeGenesOrderedRow = (genesHits?: ArrangerResultsTree<IVariantGene>) => {
  const genes = genesHits?.hits?.edges || [];

  if (!genes.length) {
    return [];
  }

  const ungroupedRows = makeUnGroupedDataRows(genes);
  const groupedRows = groupRowsBySource(ungroupedRows);

  return groupedRows.map((row, index) => ({
    source: row.source,
    gene: row.gene,
    conditions: row.conditions as Conditions,
    inheritance: row.inheritance as Inheritance,
    key: toKebabCase(`${index}-${[row.gene].flat().join('-')}`),
  }));
};

interface ICohortsTableProps {
  loading: boolean;
  variant?: IVariantEntity;
}

const CohortsTable = ({ loading, variant }: ICohortsTableProps) => (
  <Table
    loading={loading}
    dataSource={makeGenesOrderedRow(variant?.genes)}
    columns={columnsPhenotypes}
    pagination={false}
    size="small"
    rowClassName={styles.notStriped}
    bordered
  />
);

export default CohortsTable;
