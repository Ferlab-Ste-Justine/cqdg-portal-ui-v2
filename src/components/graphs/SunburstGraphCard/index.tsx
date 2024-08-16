import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import ResizableGridCard from '@ferlab/ui/core/layout/ResizableGridLayout/ResizableGridCard';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { TreeNode } from 'views/DataExploration/utils/OntologyTree';
import { PhenotypeStore } from 'views/DataExploration/utils/PhenotypeStore';

import { getResizableGridDictionary } from 'utils/translation';

import SunburstGraph from './GraphContent';

interface ISunburstGraphCardProps {
  id: string;
  gridUID: string;
  field: string;
  queryId: string;
  isPlayable?: boolean;
}

const SunburstGraphCard = ({
  gridUID,
  id,
  field,
  queryId,
  isPlayable,
}: ISunburstGraphCardProps) => {
  const [currentNode, setCurrentNode] = useState<TreeNode>();
  const phenotypeStore = useRef<PhenotypeStore | undefined>(new PhenotypeStore());
  const updateModalSunburst = useRef<(key: any) => void>();
  const updateSunburst = useRef<(key: any) => void>();
  const sqon = useParticipantResolvedSqon(queryId);

  useEffect(() => {
    phenotypeStore.current?.fetch({ field, sqon }).then(() => {
      const rootNode = phenotypeStore.current?.getRootNode();
      setCurrentNode(rootNode);
    });

    return () => {
      updateSunburst.current = undefined;
      updateModalSunburst.current = undefined;
    };
    // eslint-disable-next-line
  }, [JSON.stringify(sqon)]);

  const tsvData = [
    {
      id: currentNode?.key,
      label: currentNode?.name,
      value: currentNode?.results,
    },
  ];

  return (
    <ResizableGridCard
      gridUID={gridUID}
      id={id}
      dictionary={getResizableGridDictionary().download}
      theme="shade"
      loading={false}
      headerTitle={intl.get(`screen.dataExploration.tabs.summary.${field}.cardTitle`)}
      downloadSettings={{
        tsv: false,
        svg: true,
        png: true,
      }}
      tsvSettings={{
        headers: ['Value', 'Count'],
        data: [tsvData],
      }}
      modalContent={
        <SunburstGraph
          field={field}
          previewMode
          width={480}
          height={480}
          queryId={queryId}
          isPlayable={isPlayable}
        />
      }
      content={<SunburstGraph field={field} queryId={queryId} isPlayable={isPlayable} />}
    />
  );
};

export default SunburstGraphCard;
