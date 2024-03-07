import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import {
  DownOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Button, Dropdown, Tooltip } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { IQueryResults } from 'graphql/models';
import { IParticipantEntity } from 'graphql/participants/models';
import { IVariantEntity } from 'graphql/variants/models';
import CreateEditModal from 'views/Dashboard/components/DashboardCards/SavedSets/CreateEditModal';

import { MAX_ITEMS_QUERY } from 'common/constants';
import LineStyleIcon from 'components/Icons/LineStyleIcon';
import PlaylistAdd from 'components/Icons/PlaylistAdd';
import PlaylistRemove from 'components/Icons/PlaylistRemove';
import AddRemoveSaveSetModal from 'components/uiKit/SetsManagementDropdown/AddRemoveSaveSetModal';
import { SetType } from 'services/api/savedSet/models';
import { useSavedSet } from 'store/savedSet';

import styles from './index.module.scss';

export enum SetActionType {
  RENAME_TAG = 'RENAME_TAG',
  ADD_IDS = 'ADD_IDS',
  REMOVE_IDS = 'REMOVE_IDS',
  CREATE_SET = 'CREATE_SET',
  HIDDEN = 'HIDDEN',
  UPDATE_SET = 'UPDATE_SET',
}

type ModalState = {
  showModalSave: boolean;
  actionType: SetActionType;
  showModalAddDelete: boolean;
};

const modals = {
  create: {
    showModalSave: true,
    showModalAddDelete: false,
    actionType: SetActionType.CREATE_SET,
  },
  add_ids: {
    showModalSave: false,
    showModalAddDelete: true,
    actionType: SetActionType.ADD_IDS,
  },
  remove_ids: {
    showModalSave: false,
    showModalAddDelete: true,
    actionType: SetActionType.REMOVE_IDS,
  },
  hideAll: {
    showModalSave: false,
    showModalAddDelete: false,
    actionType: SetActionType.HIDDEN,
  },
};

const exceedLimit = (participantCount: number) => participantCount > MAX_ITEMS_QUERY;

const itemIcon = (type: string) => {
  switch (type) {
    case INDEXES.BIOSPECIMEN:
      return <ExperimentOutlined className={styles.icon} />;
    case INDEXES.FILE:
      return <FileTextOutlined className={styles.icon} />;
    case INDEXES.VARIANT:
      return <LineStyleIcon className={styles.icon} />;
    case INDEXES.PARTICIPANT:
      return <UserOutlined className={styles.icon} />;
    default:
      return '';
  }
};

const getLabel = (type: string, count: number): string => {
  switch (type) {
    case INDEXES.FILE:
      return count > 1
        ? `${numberFormat(count)} ${intl.get('screen.dataExploration.filesSelected')}`
        : `${numberFormat(count)} ${intl.get('screen.dataExploration.fileSelected')}`;
    case INDEXES.PARTICIPANT:
      return count > 1
        ? `${numberFormat(count)} ${intl.get('screen.dataExploration.participantsSelected')}`
        : `${numberFormat(count)} ${intl.get('screen.dataExploration.participantSelected')}`;
    case INDEXES.BIOSPECIMEN:
      return count > 1
        ? `${numberFormat(count)} ${intl.get('screen.dataExploration.biospecimensSelected')}`
        : `${numberFormat(count)} ${intl.get('screen.dataExploration.biospecimenSelected')}`;
    case INDEXES.VARIANT:
      return count > 1
        ? `${numberFormat(count)} ${intl.get('screen.dataExploration.variantsSelected')}`
        : `${numberFormat(count)} ${intl.get('screen.dataExploration.variantSelected')}`;
    default:
      return '';
  }
};

const getTitle = (type: string): string => {
  switch (type) {
    case INDEXES.FILE:
      return intl.get('screen.dataExploration.saveFilesSet');
    case INDEXES.PARTICIPANT:
      return intl.get('screen.dataExploration.saveParticipantsSet');
    case INDEXES.BIOSPECIMEN:
      return intl.get('screen.dataExploration.saveBiospecimensSet');
    case INDEXES.VARIANT:
      return intl.get('screen.dataExploration.saveVariantsSet');
    default:
      return '';
  }
};

interface IGetMenuProps {
  participantCount: number;
  onClick: any;
  isEditDisabled: boolean;
  type: string;
}

const getMenuProps = ({
  participantCount,
  onClick,
  isEditDisabled,
  type,
}: IGetMenuProps): MenuProps => ({
  className: styles.saveSetOptionMenu,
  onClick: onClick,
  items: [
    {
      key: 'participant-count',
      className: `${
        exceedLimit(participantCount)
          ? styles.saveSetOptionMenuInfoOver
          : styles.saveSetOptionMenuInfo
      }`,
      disabled: true,
      icon: itemIcon(type),
      label: (
        <>
          <span>{getLabel(type, participantCount)}</span>
          <Tooltip
            arrowPointAtCenter
            placement="topRight"
            title={intl.get('screen.dataExploration.maxLimit', {
              limit: numberFormat(MAX_ITEMS_QUERY),
            })}
          >
            <InfoCircleOutlined className={styles.infoCircle} />
          </Tooltip>
        </>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'create',
      icon: <PlusOutlined className={styles.icon} />,
      label: intl.get('screen.dataExploration.saveAsNewSet'),
    },
    {
      key: 'add_ids',
      icon: <PlaylistAdd />,
      label: intl.get('screen.dataExploration.addToExistingSet'),
      disabled: isEditDisabled,
    },
    {
      key: 'remove_ids',
      icon: <PlaylistRemove />,
      label: intl.get('screen.dataExploration.removeFromExistingSet'),
      disabled: isEditDisabled,
    },
  ],
});

const getSetCount = (selected: string[], total: number, allSelected: boolean) => {
  if (allSelected) {
    return total;
  } else {
    return selected.length;
  }
};

interface ISetsManagementDropdownProps {
  results: IQueryResults<
    IParticipantEntity[] | IFileEntity[] | IBiospecimenEntity[] | IVariantEntity[]
  >;
  sqon?: ISqonGroupFilter;
  selectedAllResults: boolean;
  selectedKeys?: string[];
  type: SetType;
}

const SetsManagementDropdown = ({
  results,
  sqon,
  type,
  selectedKeys = [],
  selectedAllResults,
}: ISetsManagementDropdownProps) => {
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [modal, setModal] = useState<ModalState>(modals.hideAll);
  const { savedSets, isLoading, fetchingError } = useSavedSet();
  const isDisabled = !selectedKeys?.length;

  useEffect(() => {
    if (savedSets && !isLoading && !fetchingError && sqon) {
      setIsEditDisabled(!(savedSets.length > 0 && sqon.content.length > 0));
    }
  }, [fetchingError, isLoading, savedSets, sqon]);

  const onClick = (e: { key: string }) => {
    // @ts-ignore
    const m = modals[e.key];
    return setModal(m);
  };

  return (
    <div id={`${type}-set-dropdown-container`}>
      {modal.showModalSave && sqon && (
        <CreateEditModal
          title={getTitle(type)}
          sqon={sqon}
          setType={type}
          hideModalCb={() => setModal(modals.hideAll)}
          saveSetActionType={SetActionType.CREATE_SET}
          hasSelectedKeys={selectedKeys?.length > 0 && !selectedAllResults}
        />
      )}
      {modal.showModalAddDelete && (
        <AddRemoveSaveSetModal
          sqon={sqon}
          setActionType={modal.actionType}
          hideModalCb={() => {
            setModal(modals.hideAll);
            // clearQueryCache();
          }}
          userSets={savedSets}
          type={type}
        />
      )}
      <Tooltip
        title={intl.get('screen.dataExploration.youMustSelect')}
        trigger={isDisabled ? 'hover' : 'none'}
      >
        {/** need a empty div below to show tooltip when Dropdown is disabled */}
        <div />
        <Dropdown
          disabled={isDisabled}
          menu={getMenuProps({
            participantCount: getSetCount(selectedKeys || [], results.total, selectedAllResults),
            onClick: onClick,
            isEditDisabled: isEditDisabled,
            type,
          })}
          placement="bottomLeft"
          trigger={['click']}
          getPopupContainer={() =>
            document.getElementById(`${type}-set-dropdown-container`) as HTMLElement
          }
        >
          <Button className={'save-set-btn'} onClick={(e) => e.preventDefault()}>
            {getTitle(type)}
            <DownOutlined />
          </Button>
        </Dropdown>
      </Tooltip>
    </div>
  );
};

export default SetsManagementDropdown;
