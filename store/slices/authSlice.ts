import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    isLogin: boolean,
    token: string,
}

const initialState: AuthState = {
    isLogin: false,
    token: ''
};

const authSlices = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn(state, action: PayloadAction<string>) {
            state.isLogin = true;
            state.token = action.payload;
        },
        signOut(state) {
            state.isLogin = false;
            state.token = '';
        }
    }
});

export const authActions = authSlices.actions;
export default authSlices.reducer;