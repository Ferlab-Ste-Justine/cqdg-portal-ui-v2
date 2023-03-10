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
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { IQueryResults } from 'graphql/models';
import { IParticipantEntity } from 'graphql/participants/models';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import CreateEditModal from 'views/Dashboard/components/DashboardCards/SavedSets/CreateEditModal';

import { MAX_ITEMS_QUERY } from 'common/constants';
import PlaylistAdd from 'components/Icons/PlaylistAdd';
import PlaylistRemove from 'components/Icons/PlaylistRemove';
import { SetType } from 'services/api/savedSet/models';
import { useSavedSet } from 'store/savedSet';
import { numberWithCommas } from 'utils/string';

import AddRemoveSaveSetModal from './AddRemoveSaveSetModal';

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
    default:
      return <UserOutlined className={styles.icon} />;
  }
};

const getLabel = (type: string, participantCount: number): string => {
  if (type === INDEXES.FILE) {
    return participantCount > 1
      ? `${participantCount} ${intl.get('screen.dataExploration.filesSelected')}`
      : `${participantCount} ${intl.get('screen.dataExploration.fileSelected')}`;
  }
  if (type === INDEXES.PARTICIPANT) {
    return participantCount > 1
      ? `${participantCount} ${intl.get('screen.dataExploration.participantsSelected')}`
      : `${participantCount} ${intl.get('screen.dataExploration.participantSelected')}`;
  }
  if (type === INDEXES.BIOSPECIMEN) {
    return participantCount > 1
      ? `${participantCount} ${intl.get('screen.dataExploration.biospecimensSelected')}`
      : `${participantCount} ${intl.get('screen.dataExploration.biospecimenSelected')}`;
  }
  return '';
};

const getTitle = (type: string): string => {
  if (type === INDEXES.FILE) {
    return intl.get('screen.dataExploration.saveFilesSet');
  }
  if (type === INDEXES.PARTICIPANT) {
    return intl.get('screen.dataExploration.saveParticipantsSet');
  }
  if (type === INDEXES.BIOSPECIMEN) {
    return intl.get('screen.dataExploration.saveBiospecimensSet');
  }
  return '';
};

interface IMenuOverlayProps {
  participantCount: number;
  onClick: MenuClickEventHandler;
  isEditDisabled: boolean;
  type: string;
}

const MenuOverlay = ({ participantCount, onClick, isEditDisabled, type }: IMenuOverlayProps) => (
  <Menu
    className={styles.saveSetOptionMenu}
    onClick={onClick}
    items={[
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
              title={`Max. ${numberWithCommas(MAX_ITEMS_QUERY)} ${intl.get(
                'screen.dataExploration.participantCount',
              )}`}
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
    ]}
  />
);

const getSetCount = (selected: string[], total: number, allSelected: boolean) => {
  if (allSelected) {
    return total;
  } else {
    return selected.length;
  }
};

interface ISetsManagementDropdownProps {
  results: IQueryResults<IParticipantEntity[] | IFileEntity[] | IBiospecimenEntity[]>;
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

  useEffect(() => {
    if (savedSets && !isLoading && !fetchingError && sqon) {
      setIsEditDisabled(!(savedSets.length > 0 && sqon.content.length > 0));
    }
  }, [fetchingError, isLoading, savedSets, sqon]);

  const onClick: MenuClickEventHandler = (e) => {
    const key = e.key as string;
    // @ts-ignore
    const m = modals[key];
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
      <Dropdown
        disabled={!selectedKeys?.length}
        overlay={
          <MenuOverlay
            participantCount={getSetCount(selectedKeys || [], results.total, selectedAllResults)}
            onClick={onClick}
            isEditDisabled={isEditDisabled}
            type={type}
          />
        }
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
    </div>
  );
};

export default SetsManagementDropdown;
