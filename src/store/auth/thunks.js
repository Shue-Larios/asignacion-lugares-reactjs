import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword } from "../../firebase/provider";
import { checkingCredentials, onLogin, onLogout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailPassword({ email, password });

        if (!result.ok) return dispatch(onLogout(result.errorMessage))
        dispatch(onLogin(result))
    }
}


export const startCreatingUserWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await registerUserWithEmailPassword({ email, password });
 
         if (!result.ok) return dispatch(onLogout(result.errorMessage));
        dispatch(onLogin(result));
    }
}


export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(onLogout());
    }
}


