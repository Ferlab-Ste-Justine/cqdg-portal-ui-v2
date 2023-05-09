import { FenceConnectionInitialState } from 'store/fenceConnection';
import { GlobalInitialState } from 'store/global';
import { UserInitialState } from 'store/user';

import { RemoteInitialState } from './remote';
import { ReportInitialState } from './report';
import { SavedFilterInitialState } from './savedFilter';
import { SavedSetInitialState } from './savedSet';

export type RootState = {
  global: GlobalInitialState;
  user: UserInitialState;
  report: ReportInitialState;
  fenceConnection: FenceConnectionInitialState;
  savedFilter: SavedFilterInitialState;
  savedSet: SavedSetInitialState;
  remote: RemoteInitialState;
};
