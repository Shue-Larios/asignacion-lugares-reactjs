import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadLugar } from "../../lugares/helpers/loadLugar";
import { onAddNewLugar, setLugar } from "./lugaresSlice";


export const startNewLugar = (data) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const newLugar = {
            nombre: data.nombre,
            disponible: data.disponible,
            rango: data.rango,
            tipo: data.tipo
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/lugares_puntos/lugares`));

        await setDoc(newDoc, newLugar);

        newLugar.id = newDoc.id;
    }
}
export const startLoadingLugar = (data) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');
        const lugar = await loadLugar(uid);
        dispatch(setLugar(lugar));
    }
}

export const startSaveLugar = (data) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const LugarTofireStore = { ...data };
        delete LugarTofireStore.id;
        const docRef = doc(FirebaseDB, `/${uid}/lugares_puntos/lugares/${data.id}`);
        await setDoc(docRef, LugarTofireStore, { merge: true })
    }
}

export const startDeletingLugar = (data) => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { puntos } = getState().puntos;
        const docRef = doc(FirebaseDB, `/${uid}/lugares_puntos/lugares/${data.id}`);

        let cantPuntos = puntos.filter(punto => punto.idLugar == data.id)

        cantPuntos.map(async (t) => {
            const docResp = doc(FirebaseDB, `/${uid}/lugares_puntos/puntos/${t.id}`);
            await deleteDoc(docResp);
        });
        await deleteDoc(docRef);
    }

}