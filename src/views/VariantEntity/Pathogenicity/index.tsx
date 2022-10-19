import intl from 'react-intl-universal';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Typography } from 'antd';
import { IVariantEntity } from 'graphql/variants/models';
import ClinvarTable from 'views/VariantEntity/Pathogenicity/ClinvarTable';
import GeneTable from 'views/VariantEntity/Pathogenicity/GeneTable';

import styles from './index.module.scss';

const { Title } = Typography;

interface IPathogenicityProps {
  variant?: IVariantEntity;
  loading: boolean;
  id: string;
}

const Pathogenicity = ({ variant, loading, id }: IPathogenicityProps) => {
  const clinvarId = variant?.clinvar?.clinvar_id;

  return (
    <div id={id} className={styles.container}>
      <Title level={4} className={styles.title}>
        {intl.get('screen.variants.pathogenicity.pathogenicity')}
      </Title>
      <Collapse defaultActiveKey={['1']} className={styles.collapse} arrowIcon="caretFilled">
        <CollapsePanel
          header={
            <>
              {intl.get('screen.variants.pathogenicity.clinVar')}{' '}
              {clinvarId && (
                <ExternalLink
                  onClick={(e) => e.stopPropagation()}
                  className={styles.externalLink}
                  href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinvarId}`}
                  hasIcon={true}
                >
                  {clinvarId}
                </ExternalLink>
              )}
            </>
          }
          key="1"
          className={styles.panel}
        >
          <ClinvarTable loading={loading} variant={variant} />
        </CollapsePanel>
      </Collapse>
      <Collapse defaultActiveKey={['2']} className={styles.collapse} arrowIcon="caretFilled">
        <CollapsePanel
          header={intl.get('screen.variants.pathogenicity.genePhenotype')}
          key="2"
          className={styles.panel}
        >
          <GeneTable loading={loading} variant={variant} />
        </CollapsePanel>
      </Collapse>
    </div>
  );
};
export default Pathogenicity;
