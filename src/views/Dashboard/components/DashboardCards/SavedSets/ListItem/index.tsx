import { ReactElement, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListItemWithActions from '@ferlab/ui/core/components/List/ListItemWithActions';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { SET_ID_PREFIX } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Col, Modal, Row, Typography } from 'antd';
import { formatDistance } from 'date-fns';
import { INDEXES } from 'graphql/constants';
import { SetActionType } from 'views/DataExploration/components/SetsManagementDropdown';
import {
  DATA_EPLORATION_FILTER_TAG,
  DATA_EXPLORATION_QB_ID,
} from 'views/DataExploration/utils/constant';

import { IUserSetOutput } from 'services/api/savedSet/models';
import { getSetFieldId } from 'store/savedSet';
import { deleteSavedSet } from 'store/savedSet/thunks';

import CreateEditModal from '../CreateEditModal';

import styles from './index.module.scss';

interface OwnProps {
  data: IUserSetOutput;
  icon: ReactElement;
}

const { Text } = Typography;

const redirectToPage = (setType: string) => {
  switch (setType) {
    case INDEXES.FILE:
      return `${DATA_EPLORATION_FILTER_TAG}/datafiles`;
    case INDEXES.PARTICIPANT:
      return `${DATA_EPLORATION_FILTER_TAG}/participants`;
    case INDEXES.BIOSPECIMEN:
      return `${DATA_EPLORATION_FILTER_TAG}/biospecimens`;
    default:
      return DATA_EPLORATION_FILTER_TAG;
  }
};

const ListItem = ({ data, icon }: OwnProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onCancel = () => {
    setModalVisible(false);
  };

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
        extra={
          <Row gutter={8} className={styles.countDisplay}>
            <Col>
              <Text className={styles.count}>{data.size}</Text>
            </Col>
            <Col>
              <Text type="secondary">{icon}</Text>
            </Col>
          </Row>
        }
        onClick={() => {
          history.push(redirectToPage(data.setType));

          const setValue = `${SET_ID_PREFIX}${data.id}`;
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: getSetFieldId(data.setType),
                  value: [setValue],
                  index: data.setType,
                }),
              ],
            }),
            setAsActive: true,
          });
        }}
        title={data.tag}
        description={intl.get('screen.dashboard.cards.savedFilters.lastSaved', {
          date: formatDistance(new Date(), new Date(data.updated_date)),
        })}
      />
      <CreateEditModal
        title={intl.get('components.savedSets.modal.edit.title')}
        setType={data.setType}
        hideModalCb={onCancel}
        visible={modalVisible}
        currentSaveSet={data}
        saveSetActionType={SetActionType.UPDATE_SET}
      />
    </>
  );
};

export default ListItem;
