import { useDispatch } from 'react-redux';
import ResizableGridLayout, {
  TSerializedResizableGridLayoutConfig,
} from '@ferlab/ui/core/layout/ResizableGridLayout';
import { Space } from 'antd';

import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getResizableGridDictionary } from 'utils/translation';

import getSummaryLayout, { UID } from './getSummaryLayout';

import styles from './index.module.scss';

const SummaryTab = () => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const defaultLayouts = getSummaryLayout();

  return (
    <Space className={styles.wrapper} direction="vertical">
      <ResizableGridLayout
        uid={UID}
        defaultLayouts={defaultLayouts}
        dictionary={getResizableGridDictionary()}
        layouts={userInfo?.config.data_exploration?.summary?.layouts}
        onReset={(layouts: TSerializedResizableGridLayoutConfig[]) => {
          dispatch(updateUserConfig({ data_exploration: { summary: { layouts } } }));
        }}
        onConfigUpdate={(layouts: TSerializedResizableGridLayoutConfig[]) => {
          dispatch(updateUserConfig({ data_exploration: { summary: { layouts } } }));
        }}
      />
    </Space>
  );
};

export default SummaryTab;
