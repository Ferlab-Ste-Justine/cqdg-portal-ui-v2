import { useDispatch } from 'react-redux';
import ResizableGridLayout, {
  TSerializedResizableGridLayoutConfig,
} from '@ferlab/ui/core/layout/ResizableGridLayout';
import { Space } from 'antd';

import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getResizableGridDictionary } from 'utils/translation';

import getSummaryLayout, { UID } from './getSummaryLayout';

import styles from './index.module.css';

const SummaryTab = () => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  return (
    <Space className={styles.wrapper} direction="vertical">
      <ResizableGridLayout
        uid={UID}
        defaultLayouts={getSummaryLayout()}
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
