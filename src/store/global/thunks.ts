import { createAsyncThunk } from '@reduxjs/toolkit';

import { WrapperApi } from 'services/api/wrapper';
import { IStatistics } from 'services/api/wrapper/models';
import { RootState } from 'store/types';

const fetchStats = createAsyncThunk<IStatistics, void, { rejectValue: string; state: RootState }>(
  'wrapper/fetch/stats',
  async () => {
    const { data } = await WrapperApi.fetchStatistics();

    return data!;
  },
  {
    condition: (_, { getState }) => {
      const { global } = getState();

      return global.stats === undefined;
    },
  },
);

export { fetchStats };
