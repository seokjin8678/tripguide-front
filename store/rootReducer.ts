import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import auth from './slices/authSlice';
import modal from './slices/modalSlice'

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ['auth']
};

const reducer = combineReducers({
    auth, modal
});

export type ReducerType = ReturnType<typeof reducer>;
export default persistReducer(persistConfig, reducer);
