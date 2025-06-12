// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
// import { db } from "../config/firebase";

// export interface Comentario {
//   id: string;
//   proyectoId: string;
//   texto: string;
//   autorId: string;
//   respuestas: { autor: string; texto: string }[];
// }

// interface ComentariosState {
//   comentarios: Comentario[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: ComentariosState = {
//   comentarios: [],
//   status: "idle",
//   error: null,
// };

// export const fetchComentarios = createAsyncThunk("comentarios/fetchComentarios", async () => {
//   try {
//     const coleccionComentarios = collection(db, "comentarios");
//     const datosComentarios = await getDocs(coleccionComentarios);

//     if (datosComentarios.empty) {
//       console.warn(" La colección 'comentarios' está vacía.");
//     }

//     return datosComentarios.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as Comentario[];
//   } catch (error) {
//     console.error(" Error al obtener los comentarios:", error);
//     throw error;
//   }
// });

// // Actualizar comentarios (Agregar respuesta)
// // export const actualizarComentarios = createAsyncThunk(
// //   "comentarios/actualizarComentarios",
// //   async ({ comentarioId, respuesta }: { comentarioId: string; respuesta: { autor: string; texto: string } }) => {
// //     try {
// //       const comentarioRef = doc(db, "comentarios", comentarioId);
// //       await updateDoc(comentarioRef, {
// //         respuestas: [...respuesta], 
// //       });

// //       return { comentarioId, respuesta };
// //     } catch (error) {
// //       console.error("Error al actualizar el comentario:", error);
// //       throw error;
// //     }
// //   }
// // );

// const comentariosReducer = createSlice({
//   name: "comentarios",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchComentarios.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchComentarios.fulfilled, (state, action: PayloadAction<Comentario[]>) => {
//         state.status = "succeeded";
//         state.comentarios = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchComentarios.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Error al cargar los comentarios";
//       })
//       .addCase(actualizarComentarios.fulfilled, (state, action) => {
//         const { comentarioId, respuesta } = action.payload;
//         const comentarioIndex = state.comentarios.findIndex((c) => c.id === comentarioId);

//         if (comentarioIndex !== -1) {
//           state.comentarios[comentarioIndex].respuestas.push(respuesta);
//         }
//       });
//   },
// });

// export default comentariosReducer.reducer;