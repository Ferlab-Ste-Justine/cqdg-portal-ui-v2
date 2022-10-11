import intl from 'react-intl-universal';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import { Card, Col, Descriptions, Row } from 'antd';
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
                <Descriptions.Item label={intl.get('screen.variants.summary.altAllele')}>
                  {variant?.alternate}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.refAllele')}>
                  {variant?.reference}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.referenceGenome')}>
                  {variant?.genome_build}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.studies')}>
                  {'TODO'}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.participants')}>
                  {variant?.participant_number}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8}>
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label={intl.get('screen.variants.summary.genes')}>
                  {'TODO'}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.omim')}>
                  {variant?.genes?.hits?.edges[0] && variant.genes.hits.edges[0].node.omim_gene_id}
                </Descriptions.Item>
                <div style={{ height: '24px' }} />
                <Descriptions.Item label={intl.get('screen.variants.summary.clinVar')}>
                  {variant?.clinvar?.clin_sig}
                </Descriptions.Item>
                <div style={{ height: '24px' }} />
                <Descriptions.Item label={intl.get('screen.variants.summary.gnomadGenome311')}>
                  {toExponentialNotation(variant?.frequencies?.gnomad_genomes_3_1_1?.af)}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8}>
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item label={intl.get('screen.variants.summary.clinVar')}>
                  {variant?.clinvar?.clinvar_id}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.dbSNP')}>
                  {variant?.rsnumber}
                </Descriptions.Item>
                <Descriptions.Item label={intl.get('screen.variants.summary.gnomAD')}>
                  {'TODO'}
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
