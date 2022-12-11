import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface hrefInterface {
    url: string,
    buttonMessage: string
}

export interface ModalState {
    isShow: boolean,
    message: string,
    href?:hrefInterface
}

const initialState: ModalState = {
    isShow: false,
    message: '',
    href: undefined
};

const modalSlices = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal(state, action: PayloadAction<string>) {
            state.isShow = true;
            state.message = action.payload;
        },

        setHref(state, action: PayloadAction<hrefInterface>) {
            state.href = action.payload;
        },

        closeModal(state) {
            state.isShow = false;
            state.message = '';
            state.href = undefined;
        }
    }
});

export const modalActions = modalSlices.actions;
export default modalSlices.reducer;