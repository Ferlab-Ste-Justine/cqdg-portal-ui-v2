import { useState } from 'react';
import intl from 'react-intl-universal';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Button, Tooltip } from 'antd';

import CavaticaModal from './CavaticaModal';

interface IDownloadFileManifestProps {
  sqon: ISyntheticSqon;
  buttonType?: 'default' | 'primary';
  isDisabled?: boolean;
  hasTooManyFiles?: boolean;
}

const CavaticaButton = ({
  sqon,
  buttonType = 'primary',
  isDisabled = false,
  hasTooManyFiles = false,
}: IDownloadFileManifestProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Tooltip
      title={intl.get('screen.dataExploration.youMustSelect')}
      trigger={isDisabled ? 'hover' : 'none'}
    >
      <Button
        icon={<CloudUploadOutlined />}
        onClick={() => setIsModalOpen(true)}
        type={buttonType}
        disabled={isDisabled}
        data-cy="Cavatica_Button"
      >
        {intl.get('screen.cavatica.analyseModal.title')}
      </Button>
      {isModalOpen && (
        <CavaticaModal
          hasTooManyFiles={hasTooManyFiles}
          sqon={sqon}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
    </Tooltip>
  );
};

export default CavaticaButton;
