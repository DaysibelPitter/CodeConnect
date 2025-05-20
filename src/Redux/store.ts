import { configureStore } from "@reduxjs/toolkit";
import proyectosReducer from "./sliceProjects"; 

export const store = configureStore({
  reducer: {
    proyectos: proyectosReducer, 
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
