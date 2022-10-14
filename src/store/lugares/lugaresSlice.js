import { createSlice } from '@reduxjs/toolkit';


export const lugaresSlice = createSlice({
    name: 'lugares',
    initialState: {
        isSaving: false,
        lugares: [
        ],
        activeLugar: null,
        editLugares: null
    },
    reducers: {
        setLugar: (state, { payload }) => {
            state.lugares = payload
        },
        onAddNewLugar: (state, { payload }) => {
            state.lugares.push(payload);
            state.isSaving = false,
                state.activeLugar = null
            state.editLugares = null;
        },
        onSetActiveLugar: (state, { payload }) => {
            state.activeLugar = payload;
            state.editLugares = null;
        },
        onSetEditLugar: (state) => {
            state.editLugares = true;
        },
        onUpdateLugar: (state, { payload }) => {
            state.activeLugar = null
            state.editLugares = null;
            state.lugares = state.lugares.map(lugar => {
                if (lugar._id === payload._id) {
                    return payload;
                }
                return lugar;
            })
        },
        onCloseModal: (state, { payload }) => {
            state.activeLugar = null;
            state.editLugares = null;
        },
    }
});
export const { setLugar, onSetActiveLugar, onSetEditLugar, onAddNewLugar, onUpdateLugar, onCloseModal, onDeleteLugar } = lugaresSlice.actions;