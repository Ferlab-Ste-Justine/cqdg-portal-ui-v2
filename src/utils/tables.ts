import { ProColumnType, TColumnStates } from '@ferlab/ui/core/components/ProTable/types';

/*
 * This function purpose is to determine if the columns in the user config
 * match those of the table. If one changes a col key in a table than the
 * user config, if used, could lead to incorrect display or action. Table cols must
 * have priority.
 * */
const userColsHaveSameKeyAsDefaultCols = (
  userCols: TColumnStates = [],
  defaultCols: ProColumnType[] = [],
): boolean => {
  const userColsIsEmpty = userCols?.length === 0;
  const defaultColsIsEmpty = defaultCols?.length === 0;
  const sizeMismatch = userCols.length !== defaultCols.length;
  if (userColsIsEmpty || defaultColsIsEmpty || sizeMismatch) {
    return false;
  }
  const defaultColsKeys = defaultCols.map((c) => c.key);
  return userCols.every((c) => defaultColsKeys.includes(c.key));
};

export const userColumnPreferencesOrDefault = (
  userCols: TColumnStates = [],
  defaultCols: ProColumnType[] = [],
) => {
  if (userColsHaveSameKeyAsDefaultCols(userCols, defaultCols)) {
    return userCols;
  }
  return defaultCols.map((c: any) => ({
    index: c.key,
    key: c.key,
    visible: true,
  }));
};
