import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Proyecto {
  id: number;
  usuario: string;
  nombre: string;
  tecnologias: string[];
  descripcion: string;
  totalComentarios: string;
  totalCompartidos: string;
  totalSalvos: string;
}

interface ProyectosState {
  proyectos: Proyecto[];
  filtro: string;
  proyectosVistos: Proyecto[]
}

const initialState: ProyectosState = {
  proyectos: [
    { id: 1, usuario: "@carlos", nombre: "Proyecto 1", tecnologias: ["React"], descripcion: "Descripción breve.", totalComentarios: "4", totalCompartidos: "26", totalSalvos: "3" },
    { id: 2, usuario: "@daniel", nombre: "Proyecto 2", tecnologias: ["Vue"], descripcion: "Otra descripción interesante.", totalComentarios: "40", totalCompartidos: "12", totalSalvos: "43" },
    { id: 3, usuario: "@julio", nombre: "Proyecto 3", tecnologias: ["React"], descripcion: "Descripción de otro proyecto.", totalComentarios: "4", totalCompartidos: "26", totalSalvos: "3" },
    { id: 4, usuario: "@carlos", nombre: "Proyecto 1", tecnologias: ["React"], descripcion: "Descripción breve.", totalComentarios: "4", totalCompartidos: "26", totalSalvos: "3" },
    { id: 5, usuario: "@daniel", nombre: "Proyecto 2", tecnologias: ["Vue"], descripcion: "Otra descripción interesante.", totalComentarios: "40", totalCompartidos: "12", totalSalvos: "43" }
    
  ],
  filtro: "",
  proyectosVistos: [],
};

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
  },
});

export const { setFiltro, agregarProyectoVisto } = proyectosSlice.actions; 
export default proyectosSlice.reducer;
