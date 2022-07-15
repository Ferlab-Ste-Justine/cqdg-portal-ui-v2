import { FileAccessType, IFileEntity } from 'graphql/files/models';
import intersection from 'lodash/intersection';

export const userHasAccessToFile = (
  file: IFileEntity,
  userAcls: string[],
  isConnectedToCavatica: boolean = false,
  isConnectedToGen3: boolean = false,
) => {
  if (!isConnectedToGen3 && !isConnectedToCavatica) {
    return false;
  }

  if (file.data_access === FileAccessType.CONTROLLED && !isConnectedToGen3) {
    return false;
  }

  if (file.data_access === FileAccessType.REGISTERED && !isConnectedToCavatica) {
    return false;
  }

  return (
    // !file.acl ||
    // file.acl.length === 0 ||
    // intersection(userAcls, file.acl).length > 0 ||
    file.data_access === FileAccessType.REGISTERED
  );
};
