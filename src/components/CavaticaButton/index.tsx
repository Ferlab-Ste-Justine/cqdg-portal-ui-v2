import { useState } from 'react';
import intl from 'react-intl-universal';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { Button, Tooltip } from 'antd';
import EnvVariables from 'helpers/EnvVariables';

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
  const isCavaticaDisabled: boolean = EnvVariables.configFor('CAVATICA_ENABLED') === 'false';
  const disabled: boolean = isDisabled || isCavaticaDisabled;

  return (
    <Tooltip
      title={
        isCavaticaDisabled
          ? intl.get('screen.dataExploration.comingSoon')
          : intl.get('screen.dataExploration.youMustSelect')
      }
      trigger={disabled ? 'hover' : 'none'}
    >
      <Button
        icon={<CloudUploadOutlined />}
        onClick={() => setIsModalOpen(true)}
        type={buttonType}
        disabled={disabled}
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
