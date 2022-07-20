import { initialState } from 'store/fenceConnection/types';
import { RootState } from 'store/types';

export type FenceConnectionProps = initialState;

export const fenceConnectionSelector = (state: RootState) => state.fenceConnection;
