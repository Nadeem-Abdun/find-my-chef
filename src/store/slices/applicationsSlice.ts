import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Application, ApplicationStatus } from '@/types';
import { applicationsApi, type CreateApplicationDto } from '@/services/mockApi';

interface State {
  items: Application[];
  loading: boolean;
  error: string | null;
}

const initialState: State = { items: [], loading: false, error: null };

export const applyToJob = createAsyncThunk<Application, CreateApplicationDto>(
  'applications/apply',
  async (dto) => applicationsApi.create(dto),
);

export const updateApplicationStatus = createAsyncThunk<
  { id: string; status: ApplicationStatus },
  { id: string; status: ApplicationStatus }
>('applications/updateStatus', async ({ id, status }) => applicationsApi.updateStatus(id, status));

export const withdrawApplication = createAsyncThunk<{ id: string }, string>(
  'applications/withdraw',
  async (id) => applicationsApi.remove(id),
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    clearAll(state) {
      state.items = [];
    },
    upsertLocal(state, action: PayloadAction<Application>) {
      const i = state.items.findIndex((a) => a.id === action.payload.id);
      if (i >= 0) state.items[i] = action.payload;
      else state.items.unshift(action.payload);
    },
  },
  extraReducers: (b) => {
    b.addCase(applyToJob.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(applyToJob.fulfilled, (s, a) => {
        s.loading = false;
        s.items.unshift(a.payload);
      })
      .addCase(applyToJob.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message ?? 'Failed to apply';
      })
      .addCase(updateApplicationStatus.fulfilled, (s, a) => {
        const row = s.items.find((r) => r.id === a.payload.id);
        if (row) row.status = a.payload.status;
      })
      .addCase(withdrawApplication.fulfilled, (s, a) => {
        s.items = s.items.filter((r) => r.id !== a.payload.id);
      });
  },
});

export const { clearAll, upsertLocal } = applicationsSlice.actions;
export default applicationsSlice.reducer;
