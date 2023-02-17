import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { Button } from 'antd';
import { INDEXES } from 'graphql/constants';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';

import { ReportType } from 'services/api/reports/models';
import { fetchReport } from 'store/report/thunks';

interface OwnProps {
  sampleIds: string[];
  sqon?: ISqonGroupFilter;
  type?: 'default' | 'primary';
}

const DownloadSampleDataButton = ({ sampleIds, sqon, type = 'default' }: OwnProps) => {
  const dispatch = useDispatch();

  const getCurrentSqon = (): any => sqon || generateSelectionSqon(INDEXES.BIOSPECIMEN, sampleIds);

  return (
    <Button
      key={1}
      icon={<DownloadOutlined />}
      onClick={() =>
        dispatch(
          fetchReport({
            data: {
              sqon: getCurrentSqon(),
              name: ReportType.BIOSPECIMEN_DATA,
            },
          }),
        )
      }
      disabled={!sampleIds.length}
      type={type}
    >
      {intl.get('api.report.sampleData.download')}
    </Button>
  );
};

export default DownloadSampleDataButton;
