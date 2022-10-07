import intl from 'react-intl-universal';
import Collapse, { CollapsePanel } from '@ferlab/ui/core/components/Collapse';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Space, Typography } from 'antd';
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
      <Title level={5} className={styles.title}>
        {intl.get('pathogenicity')} Pathogenicity
      </Title>
      <Collapse defaultActiveKey={['1']} className={styles.collapse} arrowIcon="caretFilled">
        <CollapsePanel
          header={
            clinvarId ? (
              <ExternalLink
                onClick={(e) => e.stopPropagation()}
                className={styles.externalLink}
                href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinvarId}`}
                hasIcon={true}
              >
                ClinVar {clinvarId}
              </ExternalLink>
            ) : (
              'ClinVar'
            )
          }
          key="1"
          className={styles.panel}
        >
          <ClinvarTable loading={loading} variant={variant} />
        </CollapsePanel>
      </Collapse>
      <Collapse defaultActiveKey={['2']} className={styles.collapse} arrowIcon="caretFilled">
        <CollapsePanel header="Gene - Phenotype" key="2" className={styles.panel}>
          <GeneTable loading={loading} variant={variant} />
        </CollapsePanel>
      </Collapse>
    </div>
  );
};
export default Pathogenicity;
