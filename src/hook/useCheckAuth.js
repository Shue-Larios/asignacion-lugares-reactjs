import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { onLogin, onLogout } from "../store";
import { startLoadingPunto } from "../store/puntos/thunks";


export const useCheckAuth = () => {

  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(onLogout());
      const { uid, email } = user;
      dispatch(onLogin({ uid, email }));
      dispatch(startLoadingPunto());
    })
  }, [])

  return {
    status
  }
}
