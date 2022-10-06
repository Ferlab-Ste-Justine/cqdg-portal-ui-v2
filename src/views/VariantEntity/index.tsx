import { useParams } from 'react-router-dom';
import AnchorMenu, { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import { useVariant } from 'graphql/variants/actions';
import Consequences from 'views/VariantEntity/Consequences';
import Frequencies from 'views/VariantEntity/Frequencies';
import Summary from 'views/VariantEntity/Summary';

import styles from './index.module.scss';

const VariantEntity = () => {
  const { locus } = useParams<{ locus: string }>();

  const { data, loading } = useVariant({
    field: 'locus',
    values: [locus],
  });

  console.log('locus==', locus);
  console.log('variant data==', data);

  const scrollContainerId = 'variant-entity-scroll-wrapper';

  const links: IAnchorLink[] = [
    { href: '#summary', title: 'Summary' },
    { href: '#consequences', title: 'Consequences' },
    { href: '#frequencies', title: 'Frequencies' },
  ];

  return (
    <div className={styles.variantEntityContainer}>
      <div id={scrollContainerId} className={styles.scrollContent}>
        <Summary id={'summary'} variant={data} loading={loading} />
        <Consequences id={'consequences'} variant={data} loading={loading} />
        <Frequencies id={'frequencies'} variant={data} loading={loading} />
      </div>
      <AnchorMenu
        scrollContainerId={scrollContainerId}
        links={links}
        className={styles.anchorMenu}
      />
    </div>
  );
};

export default VariantEntity;
