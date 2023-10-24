import intl from 'react-intl-universal';
import { InfoCircleOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IEntitySummaryColumns } from '@ferlab/ui/core/pages/EntityPage/EntitySummary';
import { toExponentialNotation } from '@ferlab/ui/core/utils/numberUtils';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Tag, Tooltip } from 'antd';
import { IVariantEntity } from 'graphql/variants/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from '../index.module.scss';

const handleOmimValues = (variant?: IVariantEntity) => {
  const genes = variant?.genes?.hits?.edges || [];
  const genesOmimFiltered = genes.filter((gene) => gene?.node?.omim_gene_id);
  return genesOmimFiltered.length
    ? genesOmimFiltered.map((gene) => (
        <ExternalLink
          key={gene.node.omim_gene_id}
          className={styles.geneExternalLink}
          href={`https://omim.org/entry/${genesOmimFiltered[0].node.omim_gene_id}`}
          data-cy="Summary_OMIM_ExternalLink"
        >
          {gene.node.omim_gene_id}
        </ExternalLink>
      ))
    : TABLE_EMPTY_PLACE_HOLDER;
};

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
            value: variant?.variant_class
              ? removeUnderscoreAndCapitalize(variant.variant_class)
              : TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.cytoband'),
            value: variant?.genes?.hits?.edges[0]
              ? variant.genes.hits.edges[0].node.location
              : TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.referenceGenome'),
            value: variant?.assembly_version || TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.source'),
            value: variant?.source || TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.genes'),
            value: variant?.genes?.hits?.edges?.length
              ? variant.genes.hits.edges.map((gene) => {
                  if (!gene?.node?.symbol) return;
                  return (
                    <ExternalLink
                      key={gene.node.symbol}
                      className={styles.geneExternalLink}
                      href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${gene.node.symbol}`}
                      data-cy="Summary_Gene_ExternalLink"
                    >
                      {gene.node.symbol}
                    </ExternalLink>
                  );
                })
              : TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: intl.get('entities.variant.consequences.omim'),
            value: handleOmimValues(variant),
          },
          {
            label: intl.get('entities.variant.pathogenicity.pathoClinvar'),
            value: variant?.clinvar?.clin_sig?.length
              ? variant.clinvar.clin_sig.map((c, index) => {
                  const value = removeUnderscoreAndCapitalize(c);
                  const getClinvarClassByValue = (clinvar: string) => {
                    switch (clinvar) {
                      case 'Pathogenic':
                      case 'Likely Pathogenic':
                        return 'clinvarRedTag';
                      case 'Benign':
                      case 'Likely Benign':
                        return 'clinvarGreenTag';
                      default:
                        return '';
                    }
                  };
                  const clinvarClass = getClinvarClassByValue(value);
                  return (
                    <Tag className={clinvarClass && styles[clinvarClass]} key={c + index}>
                      {value || TABLE_EMPTY_PLACE_HOLDER}
                    </Tag>
                  );
                })
              : TABLE_EMPTY_PLACE_HOLDER,
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
            label: intl.get('entities.variant.gnomadGenome3'),
            value:
              toExponentialNotation(variant?.external_frequencies?.gnomad_genomes_3?.af) ||
              TABLE_EMPTY_PLACE_HOLDER,
          },
          {
            label: (
              <>
                {intl.get('entities.study.CQDGStudies')}{' '}
                <Tooltip title={intl.get('entities.variant.frequencies.frequencyTooltip')}>
                  <InfoCircleOutlined className={styles.infoIcon} />
                </Tooltip>
              </>
            ),
            value:
              toExponentialNotation(variant?.internal_frequencies?.total?.af) ||
              TABLE_EMPTY_PLACE_HOLDER,
          },
        ],
      },
      {
        title: intl.get('entities.variant.variant_external_references'),
        data: [
          {
            label: intl.get('entities.variant.pathogenicity.clinVar'),
            value: variant?.clinvar?.clinvar_id ? (
              <ExternalLink
                href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${variant.clinvar.clinvar_id}`}
                data-cy="Summary_ClinVar_ExternalLink"
              >
                {variant?.clinvar?.clinvar_id}
              </ExternalLink>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            ),
          },
          {
            label: intl.get('entities.variant.dbsnp'),
            value: variant?.rsnumber ? (
              <ExternalLink
                href={`https://www.ncbi.nlm.nih.gov/snp/${variant?.rsnumber}`}
                data-cy="Summary_dbSNP_ExternalLink"
              >
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
