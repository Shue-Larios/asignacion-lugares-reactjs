import { createSlice } from '@reduxjs/toolkit';

export const puntosSlice = createSlice({
    name: 'puntos',
    initialState: {
        puntos: [
 
        ],
        activePunto: null,
        editpuntos: null
    },
    reducers: {
        setPunto: (state, { payload }) => {
            state.puntos = payload
        },
        onSetActivePunto: (state, { payload }) => {
            state.activePunto = payload;
            state.editpuntos = null;
        },
        onSetEditPunto: (state) => {
            state.editpuntos = true;
        },

        onAddNewPunto: (state, { payload }) => {
            state.puntos.push(payload);
            state.activePunto = null
            state.editpuntos = null;

        },
        onUpdatePunto: (state, { payload }) => {
            state.activePunto = null
            state.editpuntos = null;
            state.puntos = state.puntos.map(Punto => {
                if (Punto._id === payload._id) {
                    return payload;
                }
                return Punto;
            })
        },
        setCloseModal: (state, { payload }) => {
            state.activePunto = null;
            state.editpuntos = null;
        },
        onDeletePunto: (state, { payload }) => {
            if (state.activePunto) {
                state.puntos = state.puntos.filter(Punto => Punto._id !== state.activePunto._id);
                state.activePunto = null
                state.editpuntos = null;
            }
        },

    }
});
export const { setPunto, onSetActivePunto, onSetEditPunto, onAddNewPunto, onUpdatePunto, setCloseModal, onDeletePunto } = puntosSlice.actions;