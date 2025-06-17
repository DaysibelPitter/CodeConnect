import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export interface Usuario {
  id: string;
  usuario: string;
  nombre: string;
  email: string;
  imagen?: string;
  contraseña: string;
  biografia: string;
  conexiones: string[];  
  proyectosCreados: string[]; 
  proyectosGuardados: string[];
  proyectosCompartidos: string[];
}

interface UsuariosState {
  usuarios: Usuario[];
  usuarioActual?: Usuario;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsuariosState = {
  usuarios: [],
  usuarioActual: undefined,
  status: "idle",
  error: null,
};

export const fetchUsuarios = createAsyncThunk("usuarios/fetchUsuarios", async () => {
  try {
    const coleccionUsuarios = collection(db, "usuarios");
    const datosUsuarios = await getDocs(coleccionUsuarios);

    if (datosUsuarios.empty) {
      console.warn("La colección 'usuarios' está vacía.");
      return [];
    }

    return datosUsuarios.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Usuario[];
  } catch (error) {
    console.error(" Error al obtener los usuarios:", error);
    throw error;
  }
});

export const actualizarUsuario = createAsyncThunk(
  "usuarios/actualizarUsuario",
  async ({ usuarioId, nuevosDatos }: { usuarioId: string; nuevosDatos: Partial<Usuario> }) => {
    try {
      const usuarioRef = doc(db, "usuarios", usuarioId);
      await updateDoc(usuarioRef, nuevosDatos);
      console.log(" Usuario actualizado correctamente.");
      return { usuarioId, nuevosDatos };
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  }
);

const usuariosReducer = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
  setUsuarioActual: (state, action: PayloadAction<Usuario>) => {
    console.log("Usuario actual:", state.usuarioActual);
  state.usuarioActual = action.payload;
  
},
  agregarProyectoGuardado: (state, action: PayloadAction<string>) => {
  if (state.usuarioActual) {
    state.usuarioActual = {
      ...state.usuarioActual,
      proyectosGuardados: [...(state.usuarioActual.proyectosGuardados || []), action.payload],
    };
  }
},
agregarProyectoCompartido: (state, action: PayloadAction<string>) => {
  if (state.usuarioActual) {
    state.usuarioActual = {
      ...state.usuarioActual,
      proyectosCompartidos: [...(state.usuarioActual.proyectosCompartidos || []), action.payload],
    };
  }
},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsuarios.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsuarios.fulfilled, (state, action: PayloadAction<Usuario[]>) => {
        console.log("Usuarios obtenidos:", action.payload);

        state.status = "succeeded";
        state.usuarios = action.payload;
        state.error = null;
      })
      .addCase(fetchUsuarios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error al cargar los usuarios";
      })
      .addCase(actualizarUsuario.fulfilled, (state, action) => {
        const { usuarioId, nuevosDatos } = action.payload;
        const usuarioIndex = state.usuarios.findIndex((u) => u.id === usuarioId);
        
        if (usuarioIndex !== -1) {
          state.usuarios[usuarioIndex] = { ...state.usuarios[usuarioIndex], ...nuevosDatos };
          if (state.usuarioActual?.id === usuarioId) {
            state.usuarioActual = { ...state.usuarioActual, ...nuevosDatos };
          }
        }
      });
  },
});

export const { setUsuarioActual, agregarProyectoGuardado, agregarProyectoCompartido } = usuariosReducer.actions;
export default usuariosReducer.reducer;