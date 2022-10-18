import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import AnchorMenu, { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { Typography } from 'antd';
import { useVariant } from 'graphql/variants/actions';
import Consequences from 'views/VariantEntity/Consequences';
import Frequencies from 'views/VariantEntity/Frequencies';
import Pathogenicity from 'views/VariantEntity/Pathogenicity';
import Summary from 'views/VariantEntity/Summary';

import LineStyleIcon from 'components/Icons/LineStyleIcon';

import styles from './index.module.scss';

const { Title } = Typography;

const VariantEntity = () => {
  const { locus } = useParams<{ locus: string }>();

  const { data, loading } = useVariant({
    field: 'locus',
    values: [locus],
  });

  const links: IAnchorLink[] = [
    { href: '#summary', title: intl.get('screen.variants.summary.summary') },
    { href: '#consequences', title: intl.get('screen.variants.consequences.consequences') },
    { href: '#frequencies', title: intl.get('screen.variants.frequencies.frequencies') },
    { href: '#pathogenicity', title: intl.get('screen.variants.pathogenicity.pathogenicity') },
  ];

  /** Enable AnchorMenu with simple-bar lib used by ScrollContent -> add id to good wrapper div */
  const simplebarContent = document.getElementsByClassName('simplebar-content-wrapper');
  const scrollContainerId = 'variant-entity-scroll-wrapper';
  simplebarContent[1] && simplebarContent[1].setAttribute('id', scrollContainerId);

  return (
    <div className={styles.variantEntityContainer}>
      <ScrollContent className={styles.scrollContent} key={scrollContainerId}>
        {data && (
          <Title className={styles.titleHeader} level={4}>
            <LineStyleIcon />
            <div className={styles.title}>{`${data?.hgvsg} ${data?.variant_class}`}</div>
          </Title>
        )}
        <Summary id={'summary'} variant={data} loading={loading} />
        <Consequences id={'consequences'} variant={data} loading={loading} />
        <Frequencies id={'frequencies'} variant={data} loading={loading} />
        <Pathogenicity id={'pathogenicity'} variant={data} loading={loading} />
      </ScrollContent>
      <AnchorMenu
        scrollContainerId={scrollContainerId}
        links={links}
        className={styles.anchorMenu}
      />
    </div>
  );
};

export default VariantEntity;
