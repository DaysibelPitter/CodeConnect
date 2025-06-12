import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDocs, getDoc, collection, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Usuario } from "./sliceUsers";

export interface Proyecto {
  id: string;
  usuario: string;
  nombre: string;
  tecnologias: string[];
  descripcion: string;
  totalComentarios: string;
  totalCompartidos: string;
  totalSalvos: string;
  codigo?: string; 
  imagen?: string;
  UsuarioID: string;
}

interface Comentario {
  id: number;
  usuario: string;
  texto: string;
}

interface ProyectosState {
  proyectos: Proyecto[];
  filtro: string;
  proyectosVistos: Proyecto[];
  comentarios: Comentario[];
  tagsSeleccionadas: string[];
  status: "idle" | "loading" | "succeeded" | "failed"; 
  error: string | null;
}

const initialState: ProyectosState = {
  proyectos: [],
  filtro: "",
  proyectosVistos: [],
  comentarios: [],
  tagsSeleccionadas: [],
  status: "idle", 
  error: null
};

export const fetchProyectos = createAsyncThunk("proyectos/fetchProyectos", async () => {
  try {
    const coleccionProyectos = collection(db, "proyectos");
    const datosProyectos = await getDocs(coleccionProyectos);

    if (datosProyectos.empty) {
      console.warn("La colección 'proyectos' está vacía.");
    }

    const proyectos = await Promise.all(
      datosProyectos.docs.map(async (proyectoDoc) => {
        const dataProyecto = proyectoDoc.data() as Proyecto;

        let nombreUsuario = "Usuario desconocido";
        if (dataProyecto.UsuarioID) {
          const usuarioRef = doc(db, "usuarios", dataProyecto.UsuarioID);
          const usuarioSnapshot = await getDoc(usuarioRef); 

          if (usuarioSnapshot.exists()) {
            const usuarioData = usuarioSnapshot.data() as Usuario;
            nombreUsuario = usuarioData.usuario;
          }
        }

        return {
          ...dataProyecto,
          usuario: nombreUsuario,
          id: proyectoDoc.id,
        };
      })
    );

    return proyectos;
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    throw error;
  }
});

const proyectosSlice = createSlice({
  name: "proyectos",
  initialState,
  reducers: {
    setFiltro: (state, action: PayloadAction<string>) => {
      state.filtro = action.payload;
    },
    agregarProyectoVisto: (state, action: PayloadAction<Proyecto>) => {
      if (!state.proyectosVistos.some((p) => p.id === action.payload.id)) {
        state.proyectosVistos.push(action.payload); 
      }
    },
    agregarComentario: (state, action: PayloadAction<Comentario>) => {
      state.comentarios.push(action.payload);
    },
    agregarTagSeleccionada: (state, action: PayloadAction<string>) => {
      if (!state.tagsSeleccionadas.includes(action.payload)) {
        state.tagsSeleccionadas.push(action.payload);
      }
    },
    eliminarTagSeleccionada: (state, action: PayloadAction<string>) => {
      state.tagsSeleccionadas = state.tagsSeleccionadas.filter(tag => tag !== action.payload);
    },
    resetTags: (state) => {
       state.tagsSeleccionadas = [];
},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProyectos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProyectos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.proyectos = action.payload || [];
        state.error = null;
      })
      .addCase(fetchProyectos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error al cargar los proyectos";
      });
  },
});

export const { setFiltro, agregarProyectoVisto,resetTags, agregarTagSeleccionada, eliminarTagSeleccionada, agregarComentario } = proyectosSlice.actions;
export default proyectosSlice.reducer;