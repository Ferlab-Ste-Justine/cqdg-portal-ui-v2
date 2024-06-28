import intl from 'react-intl-universal';
import { CloseCircleOutlined } from '@ant-design/icons';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Alert } from 'antd';

import { MAX_ITEMS_QUERY } from 'common/constants';
import styles from 'components/reports/DownloadRequestAccessModal/index.module.scss';

const TooMuchFilesAlert = ({ marginTop = 30 }) => (
  <Alert
    type="error"
    showIcon
    icon={<CloseCircleOutlined className={styles.customAlertIcon} />}
    className={styles.customAlert}
    style={{ marginTop }}
    message={intl.get('api.report.error.tooMuchFilesTitle')}
    description={intl.get('api.report.error.tooMuchFiles', {
      limit: numberFormat(MAX_ITEMS_QUERY),
    })}
  />
);

export default TooMuchFilesAlert;
