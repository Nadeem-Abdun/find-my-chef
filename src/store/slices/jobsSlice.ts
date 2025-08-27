import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Job } from '@/types';
import { jobsApi, type CreateJobDto } from '@/services/mockApi';

interface State {
  seedItems: Job[];
  userItems: Job[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: State = {
  seedItems: [],
  userItems: [],
  loading: false,
  error: null,
  loaded: false,
};

export const fetchJobs = createAsyncThunk<Job[]>('jobs/fetchAll', async () => {
  return await jobsApi.all();
});

export const createJob = createAsyncThunk<Job, CreateJobDto>('jobs/create', async (dto) => {
  return await jobsApi.create(dto);
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    updateJob(state, action: PayloadAction<{ id: string; patch: Partial<Job> }>) {
      const { id, patch } = action.payload;
      const u = state.userItems.find((j) => j.id === id);
      if (u) Object.assign(u, patch);
    },
    deleteJob(state, action: PayloadAction<string>) {
      state.userItems = state.userItems.filter((j) => j.id !== action.payload);
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchJobs.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(fetchJobs.fulfilled, (s, a) => {
        s.loading = false;
        s.seedItems = a.payload;
        s.loaded = true;
      })
      .addCase(fetchJobs.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message ?? 'Failed to load jobs';
      })
      .addCase(createJob.fulfilled, (s, a) => {
        s.userItems.unshift(a.payload);
      });
  },
});

export const { updateJob, deleteJob } = jobsSlice.actions;
export default jobsSlice.reducer;
