import { useDispatch } from 'react-redux';
import ResizableGridLayout, {
  TSerializedResizableGridLayoutConfig,
} from '@ferlab/ui/core/layout/ResizableGridLayout';
import { Space } from 'antd';

import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getResizableGridDictionary } from 'utils/translation';

import getStudyEntityLayout, { UID } from './getStudyEntityLayout';

import styles from './index.module.scss';

const WrapperGraph = () => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const dictionary = getResizableGridDictionary();
  const defaultLayouts = getStudyEntityLayout();
  const layouts = userInfo?.config.studies?.layouts || defaultLayouts;

  return (
    <Space className={styles.wrapper} direction="vertical">
      <ResizableGridLayout
        uid={UID}
        dictionary={dictionary}
        defaultLayouts={defaultLayouts}
        layouts={layouts}
        onReset={(layouts: TSerializedResizableGridLayoutConfig[]) => {
          dispatch(updateUserConfig({ studies: { layouts } }));
        }}
        onConfigUpdate={(layouts: TSerializedResizableGridLayoutConfig[]) => {
          dispatch(updateUserConfig({ studies: { layouts } }));
        }}
      />
    </Space>
  );
};

export default WrapperGraph;
