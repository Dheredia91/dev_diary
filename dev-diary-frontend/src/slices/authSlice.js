import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous thunk action for logging in a user
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/token/', credentials);
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    // store access token
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    return { user: credentials.username };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
  
// Asynchronous thunk action for registering a new user
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
  try {
    await axios.post('http://127.0.0.1:8000/api/register/', userData);
    return { message: 'Registration successful. Please log in.' };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// slice for managing authentication state
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    successMessage: null, 
  },
  reducers: {
    // action to log out the user
    logout: (state) => {
      localStorage.removeItem('access_token'); // remove the token from local storage
      localStorage.removeItem('refresh_token'); 
      state.user = null; // clear the user state
      state.successMessage = null;
      delete axios.defaults.headers.common['Authorization'];
    },

    loadUser: (state, action) => {
      state.user = action.payload;
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    },

    clearSuccessMessage: (state) => {  
      state.successMessage = null;
    }

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
        state.successMessage = action.payload.message; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.detail : action.error.message;
      });
  },
});

export const { logout, loadUser, clearSuccessMessage } = authSlice.actions;
export default authSlice.reducer;
