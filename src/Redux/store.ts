import { configureStore } from "@reduxjs/toolkit";
import proyectosReducer from "./sliceProjects"; 
import usuariosReducer from "./sliceUsers";
import comentariosReducer from "./sliceComentarios";

export const store = configureStore({
  reducer: {
    proyectos: proyectosReducer, 
    usuarios: usuariosReducer,
    comentarios: comentariosReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
