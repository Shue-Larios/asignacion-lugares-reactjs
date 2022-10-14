import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";


export const loginWithEmailPassword = async ({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid } = resp.user;
        return {
            ok: true,
            uid
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid } = resp.user;
        return {
            ok: true,
            uid, email
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }

}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}

