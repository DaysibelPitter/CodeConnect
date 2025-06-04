import { configureStore } from "@reduxjs/toolkit";
import proyectosReducer from "./sliceProjects"; 
import usuariosReducer from "./sliceUsers";

export const store = configureStore({
  reducer: {
    proyectos: proyectosReducer, 
    usuarios: usuariosReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
