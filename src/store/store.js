import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { lugaresSlice } from "./lugares/lugaresSlice";
import { puntosSlice } from "./puntos/puntosSlice";
 
 
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        lugares: lugaresSlice.reducer,
        puntos: puntosSlice.reducer,
    },
})