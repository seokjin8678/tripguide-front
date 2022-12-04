import { combineReducers } from '@reduxjs/toolkit';
import auth from './slices/authSlice';

const reducer = combineReducers({
    auth
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
