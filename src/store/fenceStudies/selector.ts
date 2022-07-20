import { initialState } from 'store/fenceStudies/types';
import { RootState } from 'store/types';

export type FenceStudiesProps = initialState;

export const fenceStudiesSelector = (state: RootState) => state.fenceStudies;
