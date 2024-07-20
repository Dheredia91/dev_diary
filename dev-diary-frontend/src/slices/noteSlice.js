// src/slices/noteSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/* thunks wait for the API request to complete without blocking the main thread
   Dispatch Thunk -> Start Async Operation -> (Wait) -> Dispatch Success/Failure Action -> Reducer -> State Update */

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/notes/');
  return response.data;
});

/* createSlice combines reducers, actions, and initial state in one place */
const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  //  empty object here because no synchronous actions are defined
  reducers: {},
  // used to handle the asynchronous actions generated by createAsyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default noteSlice.reducer;
