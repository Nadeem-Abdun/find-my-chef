import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ChefFilters, JobFilters } from '@/types';

interface State {
  chefFilters: ChefFilters;
  jobFilters: JobFilters;
}

const initialState: State = {
  chefFilters: {},
  jobFilters: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setChefFilters(state, action: PayloadAction<ChefFilters>) {
      state.chefFilters = action.payload;
    },
    resetChefFilters(state) {
      state.chefFilters = {};
    },
    setJobFilters(state, action: PayloadAction<JobFilters>) {
      state.jobFilters = action.payload;
    },
    resetJobFilters(state) {
      state.jobFilters = {};
    },
  },
});

export const { setChefFilters, resetChefFilters, setJobFilters, resetJobFilters } = uiSlice.actions;
export default uiSlice.reducer;
