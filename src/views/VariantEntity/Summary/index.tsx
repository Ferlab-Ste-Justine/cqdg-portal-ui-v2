import intl from 'react-intl-universal';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Card, Col, Descriptions, Row, Tooltip } from 'antd';
import { IVariantEntity } from 'graphql/variants/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { toExponentialNotation } from 'utils/helper';

import styles from './index.module.scss';

interface ISummaryProps {
  variant?: IVariantEntity;
  loading: boolean;
  id: string;
}

const Summary = ({ variant, loading, id }: ISummaryProps) => (
  <div id={id} className={styles.container}>
    <Collapse defaultActiveKey={['1']} className={styles.collapse} arrowIcon="caretFilled">
      <CollapsePanel
        header={intl.get('screen.variants.summary.summary')}
        key="1"
        className={styles.panel}
      >
        <Card loading={loading} className={styles.card}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={8}>
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label={intl.get('screen.variants.summary.type')}>
                  {variant?.variant_class}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.chromosome')}>
                  {variant?.chromosome}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.position')}>
                  {variant?.start}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.cytobande')}>
                  {variant?.genes?.hits?.edges[0]
                    ? variant.genes.hits.edges[0].node.location
                    : TABLE_EMPTY_PLACE_HOLDER}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Tooltip title={intl.get('screen.variants.summary.alternativeAllele')}>
                      {intl.get('screen.variants.summary.altAllele')}
                    </Tooltip>
                  }
                >
                  {variant?.alternate}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Tooltip title={intl.get('screen.variants.summary.referenceAllele')}>
                      {intl.get('screen.variants.summary.refAllele')}
                    </Tooltip>
                  }
                >
                  {variant?.reference}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.referenceGenome')}>
                  {variant?.genome_build}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.studies')}>
                  {variant?.studies?.hits?.edges?.length || TABLE_EMPTY_PLACE_HOLDER}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.participants')}>
                  {variant?.participant_number}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8}>
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label={intl.get('screen.variants.summary.genes')}>
                  {variant?.genes?.hits?.edges?.length
                    ? variant.genes.hits.edges.map((gene) => gene.node.symbol)
                    : TABLE_EMPTY_PLACE_HOLDER}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.omim')}>
                  {(variant?.genes?.hits?.edges[0] &&
                    variant.genes.hits.edges[0].node.omim_gene_id) ||
                    TABLE_EMPTY_PLACE_HOLDER}
                </Descriptions.Item>
              </Descriptions>
              <br />
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label={intl.get('screen.variants.summary.clinVar')}>
                  {variant?.clinvar?.clin_sig || TABLE_EMPTY_PLACE_HOLDER}
                </Descriptions.Item>
              </Descriptions>
              <br />
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label={intl.get('screen.variants.summary.gnomadGenome311')}>
                  {toExponentialNotation(variant?.frequencies?.gnomad_genomes_3_1_1?.af)}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8}>
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label={intl.get('screen.variants.summary.clinVar')}>
                  {variant?.clinvar?.clinvar_id ? (
                    <ExternalLink
                      href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${variant.clinvar.clinvar_id}`}
                    >
                      {variant?.clinvar?.clinvar_id}
                    </ExternalLink>
                  ) : (
                    TABLE_EMPTY_PLACE_HOLDER
                  )}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.dbSNP')}>
                  {variant?.rsnumber ? (
                    <ExternalLink href={`https://www.ncbi.nlm.nih.gov/snp/${variant.rsnumber}`}>
                      {variant?.rsnumber}
                    </ExternalLink>
                  ) : (
                    TABLE_EMPTY_PLACE_HOLDER
                  )}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
      </CollapsePanel>
    </Collapse>
  </div>
);

export default Summary;
