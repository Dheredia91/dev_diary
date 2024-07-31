import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous thunk action for logging in a user
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', credentials);
      // Save the access and refresh tokens in local storage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
  // Asynchronous thunk action for registering a new user
  export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', userData);
      // Save the access and refresh tokens in local storage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });

// slice for managing authentication state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // action to log out the user
    logout: (state) => {
      localStorage.removeItem('access_token'); // remove the token from local storage
      localStorage.removeItem('refresh_token'); 
      state.user = null; // clear the user state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.detail : action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.detail : action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
