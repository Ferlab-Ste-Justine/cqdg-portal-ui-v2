import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { Button } from 'antd';
import { INDEXES } from 'graphql/constants';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';

import { ReportType } from 'services/api/reports/models';
import { fetchReport } from 'store/report/thunks';

interface IDownloadClinicalDataButtonProps {
  participantIds?: string[];
  sqon?: ISqonGroupFilter;
  type?: 'default' | 'primary';
}

const DownloadClinicalDataButton = ({
  participantIds = [],
  sqon,
  type = 'default',
}: IDownloadClinicalDataButtonProps) => {
  const dispatch = useDispatch();

  const getCurrentSqon = (): any =>
    sqon || generateSelectionSqon(INDEXES.PARTICIPANT, participantIds);

  return (
    <Button
      disabled={!sqon && !participantIds.length}
      icon={<DownloadOutlined />}
      onClick={() =>
        dispatch(
          fetchReport({
            data: {
              sqon: getCurrentSqon(),
              name: ReportType.CLINICAL_DATA,
              withFamily: false,
            },
          }),
        )
      }
      type={type}
    >
      {intl.get('api.report.clinicalData.download')}
    </Button>
  );
};

export default DownloadClinicalDataButton;
