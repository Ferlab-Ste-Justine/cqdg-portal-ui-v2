import intl from 'react-intl-universal';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Alert } from 'antd';

import styles from 'components/reports/DownloadRequestAccessModal/index.module.css';

const RestrictedStudyAlert = () => (
  <Alert
    type="error"
    showIcon
    icon={<CloseCircleOutlined className={styles.tooMuchFilesIcon} />}
    className={styles.customAlert}
    message={intl.get('entities.study.restrictedTitle')}
    description={
      <>
        {intl.get('entities.study.restrictedContact')}
        <br />
        {intl.get('entities.study.restrictedContact2')}
      </>
    }
  />
);

export default RestrictedStudyAlert;
