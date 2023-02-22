import { FileAccessType, IFileEntity } from 'graphql/files/models';

export const userHasAccessToFile = (file: IFileEntity) => {
  //todo: After MVP, determine rules to allow or not access to files

  if (file.data_access === FileAccessType.CONTROLLED) {
    return false;
  }

  if (file.data_access === FileAccessType.REGISTERED) {
    return true;
  }

  return false;
};
