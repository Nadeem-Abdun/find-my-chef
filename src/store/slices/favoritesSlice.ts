import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface State {
  chefIds: string[];
  jobIds: string[];
}

const initialState: State = { chefIds: [], jobIds: [] };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleChefFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      const idx = state.chefIds.indexOf(id);
      if (idx >= 0) state.chefIds.splice(idx, 1);
      else state.chefIds.push(id);
    },
    toggleJobFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      const idx = state.jobIds.indexOf(id);
      if (idx >= 0) state.jobIds.splice(idx, 1);
      else state.jobIds.push(id);
    },
    clearFavorites(state) {
      state.chefIds = [];
      state.jobIds = [];
    },
  },
});

export const { toggleChefFavorite, toggleJobFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
