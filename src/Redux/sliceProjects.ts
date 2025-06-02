import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../config/firebase";
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
}


interface Comentario {
  id: number;
  usuario: string;
  texto: string;
}

interface ProyectosState {
  proyectos: Proyecto[];
  filtro: string;
  proyectosVistos: Proyecto[]
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
  tagsSeleccionadas:[],
  status: "idle", 
  error: null
};

export const fetchProyectos = createAsyncThunk(
  "proyectos/fetchProyectos",
  async () => {
    try{
      
      const coleccionProyectos = collection(db, "proyectos");
      console.log("Colección referenciada:", coleccionProyectos); 

    const datosProyectos = await getDocs(coleccionProyectos);
     console.log("Documentos obtenidos sin procesar:", datosProyectos.docs)
    console.log("Proyectos obtenidos:", datosProyectos.docs);
datosProyectos.docs.forEach((doc) => console.log(`Documento ID: ${doc.id}, Data:`, doc.data()));

 if (datosProyectos.empty) {
        console.warn("La colección 'proyectos' está vacía.");
      }
    const proyectos = datosProyectos.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
  })) as Proyecto[];
  return proyectos;
    }catch(error){
      console.error("Error al obtener los proyectos:", error);
      throw error;
    }  
}
);

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
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProyectos.pending, (state) => {
       state.status = "loading";
       state.error = null;
       console.log("Cargando proyectos...");
      })
      .addCase(fetchProyectos.fulfilled, (state, action) => {
        console.log("Proyectos recibidos en Redux antes de guardarlos:", action.payload);

        state.status = "succeeded";
        state.proyectos = action.payload || [];
        state.error = null;
        console.log("Proyectos cargados exitosamente:", state.proyectos);
      })
      .addCase(fetchProyectos.rejected, (state, action) => {
         state.status = "failed";
        state.error = action.error.message || "Error al cargar los proyectos";
        console.error("Error al cargar los proyectos:", state.error);
      });
  },
});

export const { setFiltro, agregarProyectoVisto,agregarTagSeleccionada, eliminarTagSeleccionada, agregarComentario  } = proyectosSlice.actions; 
export default proyectosSlice.reducer;
