import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, doc, updateDoc, addDoc, arrayUnion, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { produce } from "immer";

export interface Comentario {
  id: string;
  proyectoId: string;
  texto: string;
  autorId: string;
  respuestas: { autorId: string; texto: string }[];
}

interface ComentariosState {
  comentarios: Comentario[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  
}

const initialState: ComentariosState = {
  comentarios: [],
  status: "idle",
  error: null,
};

export const fetchComentariosPorProyecto = createAsyncThunk(
  "comentarios/fetchComentariosPorProyecto",
  async (proyectoId: string) => {
    try {
      const comentariosRef = query(collection(db, "comentarios"), where("proyectoId", "==", proyectoId));
      const comentariosSnapshot = await getDocs(comentariosRef);

      return comentariosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comentario[];
    } catch (error) {
      console.error(" Error al obtener los comentarios:", error);
      throw error;
    }
  }
);

export const agregarComentario = createAsyncThunk(
  "comentarios/agregarComentario",
  async ({ proyectoId, autorId, texto }: { proyectoId: string; autorId: string; texto: string }) => {
    try {
      const nuevoComentario = {
        proyectoId,
        autorId,
        texto,
        respuestas: [],
      };

      const docRef = await addDoc(collection(db, "comentarios"), nuevoComentario);
      return { id: docRef.id, ...nuevoComentario };
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
      throw error;
    }
  }
);

export const actualizarComentarios = createAsyncThunk(
  "comentarios/actualizarComentarios",
  async ({ comentarioId, respuesta }: { comentarioId: string; respuesta: { autorId: string; texto: string } }) => {
    try {
      const comentarioRef = doc(db, "comentarios", comentarioId);
      await updateDoc(comentarioRef, {
        respuestas: arrayUnion(respuesta),
      });

      return { comentarioId, respuesta };
    } catch (error) {
      console.error(" Error al actualizar el comentario:", error);
      throw error;
    }
  }
);

const comentariosReducer = createSlice({
  name: "comentarios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComentariosPorProyecto.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchComentariosPorProyecto.fulfilled, (state, action: PayloadAction<Comentario[]>) => {
        state.status = "succeeded";
        state.comentarios = action.payload;
        state.error = null;
      })
      .addCase(fetchComentariosPorProyecto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error al cargar los comentarios";
      })
      .addCase(agregarComentario.fulfilled, (state, action) => {
        state.comentarios.push(action.payload);
      })
      .addCase(actualizarComentarios.fulfilled, (state, action) => {
        state.comentarios = produce(state.comentarios, (draft) => {
          const comentario = draft.find((c) => c.id === action.payload.comentarioId);
          if (comentario) {
            comentario.respuestas.push(action.payload.respuesta);
          }
        });
      });
  },
});

export default comentariosReducer.reducer;