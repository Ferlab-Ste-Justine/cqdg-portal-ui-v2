import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty';
import { Col, Row, Spin } from 'antd';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import {
  extractMondoTitleAndCode,
  extractPhenotypeTitleAndCode,
} from 'views/DataExploration/utils/helper';
import { lightTreeNodeConstructor, TreeNode } from 'views/DataExploration/utils/OntologyTree';
import {
  generateNavTreeFormKey,
  PhenotypeStore,
  RegexExtractPhenotype,
  TARGET_ROOT_PHENO,
} from 'views/DataExploration/utils/PhenotypeStore';

import { getCommonColors } from 'common/charts';
import getStoreConfig from 'store';

import TreePanel from '../TreePanel';
import SunburstD3 from '../utils/sunburst-d3';

import styles from './index.module.scss';

interface OwnProps {
  field: string;
  width?: number;
  height?: number;
  previewMode?: boolean;
}

const SunburstGraph = ({ field, previewMode = false, width = 335, height = 335 }: OwnProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [treeData, setTreeData] = useState<TreeNode[]>();
  const [currentNode, setCurrentNode] = useState<TreeNode>();
  const phenotypeStore = useRef<PhenotypeStore | undefined>(new PhenotypeStore());
  const sunburstRef = useRef<SVGSVGElement>(null);
  const updateSunburst = useRef<(key: any) => void>();
  const sqon = useParticipantResolvedSqon(DATA_EXPLORATION_QB_ID);
  const { store } = getStoreConfig();
  const locale = store.getState().global.lang;

  useEffect(() => {
    setIsLoading(true);
    phenotypeStore.current?.fetch({ field, sqon }).then(() => {
      const rootNode = phenotypeStore.current?.getRootNode();
      const targetRootIndex =
        rootNode?.children.findIndex((e) => e.name === TARGET_ROOT_PHENO) || 0;
      const targetedRootNode =
        targetRootIndex >= 0 ? rootNode?.children[targetRootIndex] : rootNode;

      setCurrentNode(targetedRootNode);
      setTreeData(rootNode ? [lightTreeNodeConstructor(rootNode.key!)] : []);

      updateSunburst.current = SunburstD3(
        sunburstRef,
        targetedRootNode,
        {
          depth: 2,
          width: width,
          height: height,
          colors: getCommonColors(),
        },
        getSelectedPhenotype,
        {
          centerTitleFormatter: (data: TreeNode) => data.results,
          centerSubtitleFormatter: () =>
            intl.get(`screen.dataExploration.tabs.summary.global.centerSubtitleFormatter`),
          centerDescriptionFormatter: (data: TreeNode) =>
            field === 'observed_phenotypes'
              ? `HP:${extractPhenotypeTitleAndCode(data.title!)?.code}`
              : `MONDO:${extractMondoTitleAndCode(data.title!)?.code}`,
          tooltipFormatter: (data: TreeNode) =>
            `<div>
              ${data.title}<br/><br/>
              Participants: <strong>${data.results}</strong>
            </div>`,
          legendFormatter: (data: TreeNode) => {
            const phenotype = (data.key.match(RegexExtractPhenotype) || []).reverse();
            return phenotype.join('-');
          },
        },
        field,
        previewMode,
      );
    });

    setIsLoading(false);
    return () => {
      updateSunburst.current = undefined;
    };
    // eslint-disable-next-line
  }, [JSON.stringify(sqon), locale]);

  const getSelectedPhenotype = (node: TreeNode) => {
    const phenoReversed = (node.key.match(RegexExtractPhenotype) || []).reverse();
    setCurrentNode(node);
    setTreeData(generateNavTreeFormKey(phenoReversed));
  };

  if (isLoading) {
    return (
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}>
          <Spin />
        </div>
      </div>
    );
  }

  if (!treeData || treeData?.length === 0) {
    return (
      <Empty
        imageType="grid"
        size="large"
        description={intl.get(`screen.dataExploration.tabs.summary.${field}.empty`)}
      />
    );
  }

  if (previewMode) {
    return (
      <div className={styles.previewMode}>
        <svg ref={sunburstRef} />
      </div>
    );
  }

  return (
    <Row gutter={[24, 24]} id={`tooltip-wrapper-${field}`} className={styles.sunburstRowWrapper}>
      <Col lg={12} xl={10}>
        <svg
          className={styles.sunburstChart}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          ref={sunburstRef}
        />
      </Col>
      <Col lg={12} xl={14}>
        <TreePanel
          currentNode={currentNode!}
          treeData={treeData!}
          getSelectedPhenotype={getSelectedPhenotype}
          updateSunburst={updateSunburst.current!}
          field={field}
        />
      </Col>
    </Row>
  );
};

export default SunburstGraph;
