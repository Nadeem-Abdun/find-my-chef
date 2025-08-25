import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Chef } from '@/types';
import { chefsApi } from '@/services/mockApi';

interface State {
  items: Chef[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: State = { items: [], loading: false, error: null, loaded: false };

export const fetchChefs = createAsyncThunk<Chef[]>('chefs/fetchAll', async () => {
  return await chefsApi.all();
});

const chefsSlice = createSlice({
  name: 'chefs',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchChefs.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(fetchChefs.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload;
        s.loaded = true;
      })
      .addCase(fetchChefs.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message ?? 'Failed to load chefs';
      });
  },
});

export default chefsSlice.reducer;
