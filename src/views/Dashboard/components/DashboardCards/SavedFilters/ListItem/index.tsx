import { useContext, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { setQueryBuilderState } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ConfigProvider, Modal } from 'antd';
import { formatDistance } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import frCA from 'date-fns/locale/fr-CA';

import { FILTER_ID_QUERY_PARAM_KEY } from 'common/constants';
import { FILTER_TAG_PAGE_MAPPING, FILTER_TAG_QB_ID_MAPPING } from 'common/queryBuilder';
import ListItemWithActions from 'components/uiKit/list/ListItemWithActions';
import { TUserSavedFilter } from 'services/api/savedFilter/models';
import { deleteSavedFilter } from 'store/savedFilter/thunks';

import EditModal from '../EditModal';

interface OwnProps {
  id: any;
  data: TUserSavedFilter;
}

const SavedFiltersListItem = ({ data }: OwnProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { locale } = useContext(ConfigProvider.ConfigContext);

  return (
    <>
      <ListItemWithActions
        key={data.id}
        onEditCb={() => setModalVisible(true)}
        onDeleteCb={() =>
          Modal.confirm({
            title: intl.get('components.querybuilder.header.popupConfirm.delete.title'),
            icon: <ExclamationCircleOutlined />,
            okText: intl.get('components.querybuilder.header.popupConfirm.delete.okText'),
            content: intl.get('components.querybuilder.header.popupConfirm.delete.content'),
            cancelText: intl.get('components.querybuilder.header.popupConfirm.delete.cancelText'),
            okButtonProps: { danger: true },
            onOk: () => dispatch(deleteSavedFilter(data.id)),
          })
        }
        linkProps={{
          to: {
            pathname: FILTER_TAG_PAGE_MAPPING[data.tag],
            search: `?${FILTER_ID_QUERY_PARAM_KEY}=${data.id}`,
          },
          content: data.title,
          onClick: () =>
            setQueryBuilderState(FILTER_TAG_QB_ID_MAPPING[data.tag], {
              active: data.queries[0].id,
              state: data.queries,
            }),
        }}
        description={intl.get('screen.dashboard.cards.savedFilters.lastSaved', {
          date: formatDistance(new Date(), new Date(data.updated_date), {
            locale: locale?.locale === 'fr' ? frCA : enUS,
          }),
        })}
      />
      <EditModal visible={modalVisible} onCancel={() => setModalVisible(false)} filter={data} />
    </>
  );
};

export default SavedFiltersListItem;
