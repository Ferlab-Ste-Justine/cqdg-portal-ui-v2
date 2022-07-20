import { useSelector } from 'react-redux';

import { SetType } from 'services/api/savedSet/models';

import EnvironmentVariables from '../../helpers/EnvVariables';

import { savedSetSelector } from './selector';

export type { initialState as SavedSetInitialState } from './types';
export { default, SavedSetState } from './slice';

export const MAX_LENGTH_NAME = 50;
export const getSetFieldId = (type: SetType) => `${type}_fhir_id`;
export const PROJECT_ID = EnvironmentVariables.configFor('ARRANGER_PROJECT_ID');

export const useSavedSet = () => useSelector(savedSetSelector);
