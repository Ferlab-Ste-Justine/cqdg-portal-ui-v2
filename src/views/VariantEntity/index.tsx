import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import AnchorMenu, { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { Tag, Typography } from 'antd';
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

  const SUMMARY = 'SUMMARY';
  const CONSEQUENCE = 'CONSEQUENCE';
  const FREQUENCY = 'FREQUENCY';
  const PATHOGENICITY = 'PATHOGENICITY';

  const links: IAnchorLink[] = [
    { href: `#${SUMMARY}`, title: intl.get('screen.variants.summary.summary') },
    { href: `#${CONSEQUENCE}`, title: intl.get('screen.variants.consequences.consequence') },
    { href: `#${FREQUENCY}`, title: intl.get('screen.variants.frequencies.frequency') },
    { href: `#${PATHOGENICITY}`, title: intl.get('screen.variants.pathogenicity.pathogenicity') },
  ];

  /** Enable AnchorMenu with simple-bar lib used by ScrollContent -> add id to good wrapper div */
  const simplebarContent = document.getElementsByClassName('simplebar-content-wrapper');
  const scrollContainerId = 'variant-entity-scroll-wrapper';
  simplebarContent[1] && simplebarContent[1].setAttribute('id', scrollContainerId);

  return (
    <div className={styles.variantEntityContainer}>
      <ScrollContent className={styles.scrollContent} key={scrollContainerId}>
        {data && (
          <div className={styles.titleHeader}>
            <LineStyleIcon />
            <Title
              level={4}
              className={styles.title}
            >{`${data?.hgvsg} ${data?.variant_class} `}</Title>
            <Tag className={styles.variantTag}>Germline</Tag>
          </div>
        )}
        <Summary id={SUMMARY} variant={data} loading={loading} />
        <Consequences id={CONSEQUENCE} variant={data} loading={loading} />
        <Frequencies id={FREQUENCY} variant={data} loading={loading} />
        <Pathogenicity id={PATHOGENICITY} variant={data} loading={loading} />
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
