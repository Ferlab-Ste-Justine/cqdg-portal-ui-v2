import React, { ReactElement, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListItemWithActions from '@ferlab/ui/core/components/List/ListItemWithActions';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { SET_ID_PREFIX } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Col, Modal, Row, Typography } from 'antd';
import { formatDistance } from 'date-fns';
import { INDEXES } from 'graphql/constants';
import {
  DATA_EXPLORATION_QB_ID,
  DATA_FILES_SAVED_SETS_FIELD,
} from 'views/DataExploration/utils/constant';
import { VARIANT_REPO_QB_ID } from 'views/Variants/utils/constants';

import DownloadFileManifestModal from 'components/reports/DownloadFileManifestModal';
import { SetActionType } from 'components/uiKit/SetsManagementDropdown';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';
import { deleteSavedSet } from 'store/savedSet/thunks';
import { getIdFieldByType } from 'utils/fieldMapper';
import { STATIC_ROUTES } from 'utils/routes';

import CreateEditModal from '../CreateEditModal';

import styles from './index.module.css';

const { Text } = Typography;

const redirectToPage = (setType: string) => {
  switch (setType) {
    case INDEXES.FILE:
      return STATIC_ROUTES.DATA_EXPLORATION_DATAFILES;
    case INDEXES.PARTICIPANT:
      return STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS;
    case INDEXES.BIOSPECIMEN:
      return STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS;
    case INDEXES.VARIANT:
      return STATIC_ROUTES.VARIANTS;
    default:
      return STATIC_ROUTES.DATA_EXPLORATION;
  }
};

interface IListItemProps {
  data: IUserSetOutput;
  icon: ReactElement;
}

const ListItem = ({ data, icon }: IListItemProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sqon = generateQuery({
    newFilters: [
      generateValueFilter({
        field: DATA_FILES_SAVED_SETS_FIELD,
        index: INDEXES.FILE,
        value: data?.ids,
      }),
    ],
  });

  return (
    <>
      <ListItemWithActions
        key={data.id}
        className={styles.savedSetListItem}
        onEdit={() => setModalVisible(true)}
        onDelete={() =>
          Modal.confirm({
            title: intl.get('components.savedSets.popupConfirm.delete.title'),
            icon: <ExclamationCircleOutlined />,
            okText: intl.get('components.savedSets.popupConfirm.delete.okText'),
            content: intl.get('components.savedSets.popupConfirm.delete.content'),
            cancelText: intl.get('components.savedSets.popupConfirm.delete.cancelText'),
            okButtonProps: { danger: true },
            onOk: () => dispatch(deleteSavedSet(data.id)),
          })
        }
        extraActions={[
          data.setType === SetType.FILE && (
            <DownloadFileManifestModal
              key="fileManifest"
              sqon={sqon}
              isIconButton
              setId={data.id}
            />
          ),
        ]}
        extra={
          <Row gutter={8} className={styles.countDisplay}>
            <Col>
              <Text className={styles.count}>{numberFormat(data.size)}</Text>
            </Col>
            <Col>
              <Text type="secondary">{icon}</Text>
            </Col>
          </Row>
        }
        onClick={() => {
          const setValue = `${SET_ID_PREFIX}${data.id}`;

          addQuery({
            queryBuilderId:
              data.setType === SetType.VARIANT ? VARIANT_REPO_QB_ID : DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: getIdFieldByType(data.setType),
                  value: [setValue],
                  index: data.setType,
                }),
              ],
            }),
            setAsActive: true,
          });
          navigate(redirectToPage(data.setType));
        }}
        title={data.tag}
        description={intl.get('screen.dashboard.cards.lastSaved', {
          date: formatDistance(new Date(), new Date(data.updated_date)),
        })}
      />
      <CreateEditModal
        title={intl.get('components.savedSets.modal.edit.title')}
        setType={data.setType}
        hideModalCb={() => setModalVisible(false)}
        visible={modalVisible}
        currentSaveSet={data}
        saveSetActionType={SetActionType.UPDATE_SET}
      />
    </>
  );
};

export default ListItem;
