import intl from 'react-intl-universal';
import UploadIds from '@ferlab/ui/core/components/UploadIds';
import { TFetchMatchFunc, TOnUpload } from '@ferlab/ui/core/components/UploadIds/types';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Descriptions } from 'antd';

import styles from './index.module.scss';

interface IEntityUploadIdsProps {
  entityId: string;
  entityIdTrans: string;
  placeHolder: string;
  entityIdentifiers: string;
  fetchMatch: TFetchMatchFunc;
  onUpload: TOnUpload;
  title?: string;
}

const EntityUploadIds = ({
  entityId,
  entityIdTrans,
  placeHolder,
  entityIdentifiers,
  fetchMatch,
  onUpload,
  title,
}: IEntityUploadIdsProps) => (
  <UploadIds
    dictionary={{
      modalTitle:
        title ||
        intl.get('components.uploadIds.title', { entity: entityIdTrans?.toLowerCase() || '' }),
      submittedColTitle: intl.get('components.uploadIds.submittedColTitle', {
        entity: entityIdTrans,
      }),
      uploadBtnText:
        title ||
        intl.get('components.uploadIds.uploadBtnText', {
          entity: entityIdTrans?.toLowerCase() || '',
        }),
      modalUploadBtnText: intl.get('components.uploadIds.upload.fileBtn'),
      mappedTo: intl.get('components.uploadIds.mappedTo'),
      clear: intl.get('components.uploadIds.clearBtn'),
      emptyTableDescription: intl.get('components.uploadIds.emptyTable'),
      modalOkText: intl.get('components.uploadIds.upload.btn'),
      modalCancelText: intl.get('components.uploadIds.cancelBtn'),
      collapseTitle: (matchCount, unMatchCount) =>
        intl.get('components.uploadIds.collapseTitle', {
          matchCount: numberFormat(matchCount),
          unMatchCount: numberFormat(unMatchCount),
        }),
      matchTabTitle: (matchCount) =>
        intl.get('components.uploadIds.match', { count: numberFormat(matchCount) }),
      unmatchTabTitle: (unmatchcount) =>
        intl.get('components.uploadIds.unmatch', { count: numberFormat(unmatchcount) }),
      tablesMessage: (submittedCount, mappedCount) =>
        intl.get('components.uploadIds.tableMessage', {
          submittedCount: numberFormat(submittedCount),
          mappedCount: numberFormat(mappedCount),
        }),
      inputLabel: intl.get('components.uploadIds.inputLabel'),
      matchTable: {
        idColTitle: intl.get('components.uploadIds.matchTable.idcol', {
          entity: entityIdTrans,
        }),
        matchToFieldColTitle: intl.get(`components.uploadIds.matchTable.${entityId}.matchcol`),
        mappedToFieldColTitle: intl.get(`components.uploadIds.matchTable.${entityId}.mappedcol`),
      },
    }}
    popoverProps={{
      title: intl.get('components.uploadIds.popover.title'),
      overlayClassName: styles.entityUploadIdsPopover,
      content: (
        <Descriptions column={1}>
          <Descriptions.Item label={intl.get('components.uploadIds.popover.identifiers')}>
            {entityIdentifiers}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('components.uploadIds.popover.separatedBy.title')}>
            {intl.get('components.uploadIds.popover.separatedBy.values')}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('components.uploadIds.popover.uploadFileFormats')}>
            .txt, .csv, .tsv
          </Descriptions.Item>
        </Descriptions>
      ),
    }}
    placeHolder={placeHolder}
    fetchMatch={fetchMatch}
    onUpload={onUpload}
  />
);

export default EntityUploadIds;
