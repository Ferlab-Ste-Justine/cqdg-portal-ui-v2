import { initialState } from 'store/fenceCavatica/types';
import { RootState } from 'store/types';

export type FenceCavaticaProps = initialState;

export const fenceCavaticaSelector = (state: RootState) => state.fenceCavatica;
