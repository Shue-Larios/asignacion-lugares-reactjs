import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadPuntos } from "../../maps/helpers/loadPuntos";
import { setPunto } from "./puntosSlice";


export const startNewPunto = (data) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const newPunto = {
            codigo: data.codigo,
            latitud: data.latitud,
            longitud: data.longitud,
            idLugar: data.idLugar,
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/lugares_puntos/puntos`));

        await setDoc(newDoc, newPunto);

        newPunto.id = newDoc.id;
    }
}

export const startLoadingPunto = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');
        const lugar = await loadPuntos(uid);
        dispatch(setPunto(lugar));

    }
}

export const startSavePunto = (data) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const LugarTofireStore = { ...data };
        delete LugarTofireStore.id;
        const docRef = doc(FirebaseDB, `/${uid}/lugares_puntos/puntos/${data.id}`);
        await setDoc(docRef, LugarTofireStore, { merge: true })
    }
}

export const startDeletingPunto = (data) => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const docRef = doc(FirebaseDB, `/${uid}/lugares_puntos/puntos/${data.id}`);
        await deleteDoc(docRef);
    }

}