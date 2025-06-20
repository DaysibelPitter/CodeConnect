import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
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
  const coleccionUsuarios = collection(db, "usuarios");
  const datosUsuarios = await getDocs(coleccionUsuarios);

  return datosUsuarios.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Usuario[];
});

export const actualizarUsuario = createAsyncThunk(
  "usuarios/actualizarUsuario",
  async ({ usuarioId, nuevosDatos }: { usuarioId: string; nuevosDatos: Partial<Usuario> }) => {
    const usuarioRef = doc(db, "usuarios", usuarioId);
    await updateDoc(usuarioRef, nuevosDatos);
    return { usuarioId, nuevosDatos };
  }
);

//  Nuevo thunk para recargar al usuario desde Firestore
export const fetchUsuarioPorId = createAsyncThunk(
  "usuarios/fetchUsuarioPorId",
  async (usuarioId: string) => {
    const usuarioRef = doc(db, "usuarios", usuarioId);
    const snapshot = await getDoc(usuarioRef);
    if (!snapshot.exists()) throw new Error("Usuario no encontrado");
    return { id: usuarioId, ...snapshot.data() } as Usuario;
  }
);

const usuariosReducer = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    setUsuarioActual: (state, action: PayloadAction<Usuario>) => {
      state.usuarioActual = action.payload;
    },
    agregarProyectoGuardado: (state, action: PayloadAction<string>) => {
      if (state.usuarioActual) {
        state.usuarioActual.proyectosGuardados = [
          ...(state.usuarioActual.proyectosGuardados || []),
          action.payload,
        ];
      }
    },
    agregarProyectoCompartido: (state, action: PayloadAction<string>) => {
      if (state.usuarioActual) {
        state.usuarioActual.proyectosCompartidos = [
          ...(state.usuarioActual.proyectosCompartidos || []),
          action.payload,
        ];
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
        const index = state.usuarios.findIndex((u) => u.id === usuarioId);
        if (index !== -1) {
          state.usuarios[index] = { ...state.usuarios[index], ...nuevosDatos };
        }
        if (state.usuarioActual?.id === usuarioId) {
          state.usuarioActual = { ...state.usuarioActual, ...nuevosDatos };
        }
      })
      .addCase(fetchUsuarioPorId.fulfilled, (state, action: PayloadAction<Usuario>) => {
        state.usuarioActual = action.payload;
      });
  },
});

export const {
  setUsuarioActual,
  agregarProyectoGuardado,
  agregarProyectoCompartido,
} = usuariosReducer.actions;

export default usuariosReducer.reducer;
