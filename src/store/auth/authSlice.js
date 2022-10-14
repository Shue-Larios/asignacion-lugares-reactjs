import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      status: 'checking',
      uid: null,
      email: null,
      displayName: null,
      errorMessage: null,
   },
   reducers: {
      onLogin: (state, { payload }) => {
         state.status = 'authenticated',
            state.uid = payload.uid;
         state.email = payload.email;
         state.displayName = payload.displayName;
         state.errorMessage = null;
      },
      onLogout: (state, { payload }) => {
         state.status = 'not-authenticated',
            state.uid = null;
         state.email = null;
         state.displayName = null;
         state.errorMessage = payload;
      },
      checkingCredentials: (state) => {
         state.status = 'checking';
      },
      clearErrorMessage: (state) => {
         state.errorMessage = null;
      },

   }
});
export const { clearErrorMessage, checkingCredentials, onLogin, onLogout } = authSlice.actions;