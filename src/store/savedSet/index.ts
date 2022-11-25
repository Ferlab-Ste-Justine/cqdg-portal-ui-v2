import { useSelector } from 'react-redux';
import EnvironmentVariables from 'helpers/EnvVariables';

import { savedSetSelector } from './selector';

export type { initialState as SavedSetInitialState } from './types';
export { default, SavedSetState } from './slice';

export const PROJECT_ID = EnvironmentVariables.configFor('ARRANGER_PROJECT_ID');

export const useSavedSet = () => useSelector(savedSetSelector);
