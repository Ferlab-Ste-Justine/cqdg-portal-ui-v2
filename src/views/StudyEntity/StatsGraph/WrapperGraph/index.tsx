import { useDispatch } from 'react-redux';
import ResizableGridLayout, {
  TSerializedResizableGridLayoutConfig,
} from '@ferlab/ui/core/layout/ResizableGridLayout';
import { Space } from 'antd';

import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';

import getStudyEntityLayout, { UID } from './getStudyEntityLayout';

import styles from './index.module.scss';

const WrapperGraph = () => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  return (
    <Space className={styles.wrapper} direction="vertical">
      <ResizableGridLayout
        uid={UID}
        defaultLayouts={getStudyEntityLayout()}
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

export default WrapperGraph;
