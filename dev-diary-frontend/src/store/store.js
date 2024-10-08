import { configureStore } from '@reduxjs/toolkit'
import noteReducer from '../slices/noteSlice.js';
import categoryReducer from '../slices/categorySlice.js';
import authReducer from '../slices/authSlice'; 


/*
The current Redux application state lives in an object called the store
*/

// combines the notes and category reducer into a single reducer 
const store = configureStore({
    reducer:{
        notes: noteReducer,
        categories: categoryReducer,
        auth: authReducer,
    }
});

export default store;

