import { configureStore } from '@reduxjs/toolkit'
import noteReducer from '../reducers/noteReducer';
import categoryReducer from '../reducers/categoryReducer';

/*
The current Redux application state lives in an object called the store
*/

// combines the notes and category reducer into a single reducer 
export const rootReducer = configureStore({
    reducer:{
        notes: noteReducer,
        categories: categoryReducer,
    }

});

