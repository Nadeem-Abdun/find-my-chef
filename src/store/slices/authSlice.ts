import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@/types';
import { authApi, type LoginDto, type RegisterDto } from '@/services/mockApi';

interface Slice extends AuthState {
  loading: boolean;
  error: string | null;
}

const initialState: Slice = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk<User, LoginDto, { rejectValue: string }>(
  'auth/login',
  async (dto, { rejectWithValue }) => {
    try {
      return await authApi.login(dto);
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const registerThunk = createAsyncThunk<User, RegisterDto, { rejectValue: string }>(
  'auth/register',
  async (dto, { rejectWithValue }) => {
    try {
      return await authApi.register(dto);
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (b) => {
    b.addCase(loginThunk.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(loginThunk.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
        s.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload ?? 'Login failed';
      })
      .addCase(registerThunk.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(registerThunk.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
        s.isAuthenticated = true;
      })
      .addCase(registerThunk.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload ?? 'Registration failed';
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
