import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { Button, Dropdown, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';

import { ReportType } from 'services/api/reports/models';
import { fetchReport } from 'store/report/thunks';

interface IDownloadClinicalDataDropdownProps {
  participantIds?: string[];
  sqon?: ISqonGroupFilter;
  type?: 'default' | 'primary';
}

const DownloadClinicalDataDropdown = ({
  participantIds = [],
  sqon,
  type = 'default',
}: IDownloadClinicalDataDropdownProps) => {
  const dispatch = useDispatch();

  const getCurrentSqon = (): any =>
    sqon || generateSelectionSqon(INDEXES.PARTICIPANT, participantIds);
  const isDisabled = !sqon?.content?.length && !participantIds.length;

  const MenuProps = {
    onClick: (e: { key: string }) =>
      dispatch(
        fetchReport({
          data: {
            sqon: getCurrentSqon(),
            name: e.key,
            withFamily: e.key === ReportType.CLINICAL_DATA_FAMILY,
          },
        }),
      ),
    items: [
      {
        key: ReportType.CLINICAL_DATA,
        label: intl.get('api.report.clinicalData.participant', { count: participantIds.length }),
      },
      {
        key: ReportType.CLINICAL_DATA_FAMILY,
        label: intl.get('api.report.clinicalData.family', { count: participantIds.length }),
      },
    ],
  };

  return (
    <Tooltip
      title={intl.get('screen.dataExploration.youMustSelect')}
      trigger={isDisabled ? 'hover' : 'none'}
    >
      {/** need a empty div below to show tooltip when Dropdown is disabled */}
      <div />
      <Dropdown disabled={isDisabled} key="actionDropdown" menu={MenuProps} placement="bottomLeft">
        <Button type={type} icon={<DownloadOutlined />}>
          {intl.get('api.report.clinicalData.download')}
        </Button>
      </Dropdown>
    </Tooltip>
  );
};

export default DownloadClinicalDataDropdown;
