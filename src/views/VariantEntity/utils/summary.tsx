import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IVariantEntity } from '@ferlab/ui/core/pages//EntityPage/type';
import { IEntitySummaryColumns } from '@ferlab/ui/core/pages/EntityPage/EntitySummary';
import { toExponentialNotation } from '@ferlab/ui/core/utils/numberUtils';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from '../index.module.scss';

export const getSummaryItems = (variant?: IVariantEntity): IEntitySummaryColumns[] => [
  {
    column: {
      lg: 12,
      md: 24,
      xs: 24,
    },
    rows: [
      {
        title: '',
        data: [
          {
            label: intl.get('entities.variant.variant'),
            value: variant?.hgvsg || TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.type'),
            value: variant?.variant_class || TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.cytoband'),
            value: variant?.genes?.hits?.edges[0]
              ? variant.genes.hits.edges[0].node.location
              : TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.referenceGenome'),
            value: variant?.genome_build || TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.genes'),
            value: variant?.genes?.hits?.edges?.length
              ? variant.genes.hits.edges.map((gene) => (
                  <ExternalLink
                    key={gene.node.symbol}
                    className={styles.geneExternalLink}
                    href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${gene.node.symbol}`}
                  >
                    {gene.node.symbol}
                  </ExternalLink>
                ))
              : TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.consequences.omim'),
            value: variant?.genes?.hits?.edges?.length
              ? variant.genes.hits.edges.map((gene) => (
                  <ExternalLink
                    key={gene.node.omim_gene_id}
                    href={`https://omim.org/entry/${variant.genes.hits.edges[0].node.omim_gene_id}`}
                  >
                    {variant.genes.hits.edges[0].node.omim_gene_id}
                  </ExternalLink>
                ))
              : TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.pathogenicity.clinVar'),
            value:
              removeUnderscoreAndCapitalize(
                variant?.clinvar?.clin_sig.join(', ') || TABLE_EMPTY_PLACE_HOLDER,
              ) || TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.participant.participants'),
            value: variant?.participant_number || TABLE_EMPTY_PLACE_HOLDER,
          },
        ],
      },
    ],
  },
  {
    column: {
      lg: 12,
      md: 24,
      xs: 24,
    },
    rows: [
      {
        title: intl.get('entities.variant.frequencies.frequencies'),
        data: [
          {
            label: intl.get('entities.variant.gnomadGenome311'),
            value:
              toExponentialNotation(variant?.frequencies?.gnomad_genomes_3_1_1?.af) ||
              TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.study.studies'),
            value: variant?.studies?.hits?.edges?.length || TABLE_EMPTY_PLACE_HOLDER,
          },
        ],
      },
      {
        title: 'External Reference',
        data: [
          {
            label: intl.get('entities.variant.pathogenicity.clinVar'),
            value: variant?.clinvar?.clinvar_id ? (
              <ExternalLink
                href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${variant.clinvar.clinvar_id}`}
              >
                {variant?.clinvar?.clinvar_id}
              </ExternalLink>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            ),
          },
          {
            label: intl.get('entities.variant.dbSNP'),
            value: variant?.rsnumber ? (
              <ExternalLink href={`https://www.ncbi.nlm.nih.gov/snp/${variant?.rsnumber}`}>
                {variant?.rsnumber}
              </ExternalLink>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            ),
          },
        ],
      },
    ],
  },
];
