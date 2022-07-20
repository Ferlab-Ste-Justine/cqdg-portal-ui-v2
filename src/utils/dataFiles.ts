import { FileAccessType, IFileEntity } from 'graphql/files/models';

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

  return file.data_access === FileAccessType.REGISTERED;
};
