import { addDoc, collection, Timestamp, onSnapshot, query, where, doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import "./Comentarios.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { increment } from "firebase/firestore";

export interface Comentario {
  id: string;
  proyectoId: string;
  texto: string;
  autorId: string;
  respuestas: { autorId: string; texto: string }[];
}

function Comentarios({ proyectoId }: { proyectoId: string }) {
  const [comentariosFirestore, setComentarios] = useState<Comentario[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [respuestaTexto, setRespuestaTexto] = useState<Record<string, string>>({});
  const usuarioActual = useSelector((state: RootState) => state.usuarios.usuarioActual);
  const [nombresUsuarios, setNombresUsuarios] = useState<Record<string, string>>({});

 useEffect(() => {
  if (!proyectoId) return;

  const comentariosRef = query(collection(db, "comentarios"), where("proyectoId", "==", proyectoId));

  const unsubscribe = onSnapshot(comentariosRef, async (snapshot) => {
    const comentariosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Comentario[];
    setComentarios(comentariosData);

    const nuevosNombresUsuarios: Record<string, string> = {};
    const idsNecesarios = new Set<string>();

    for (const comentario of comentariosData) {
      idsNecesarios.add(comentario.autorId);
      for (const respuesta of comentario.respuestas || []) {
        idsNecesarios.add(respuesta.autorId);
      }
    }

    for (const id of idsNecesarios) {
      if (!nombresUsuarios[id]) {
        const usuarioRef = doc(db, "usuarios", id);
        const usuarioSnapshot = await getDoc(usuarioRef);
        nuevosNombresUsuarios[id] = usuarioSnapshot.exists()
          ? usuarioSnapshot.data().usuario
          : "Usuario desconocido";
      }
    }

    setNombresUsuarios((prev) => ({ ...prev, ...nuevosNombresUsuarios }));
  });

  return () => unsubscribe();
}, [proyectoId]);

  const manejarComentario = async () => {
    if (!proyectoId || !usuarioActual) {
      console.error("❌ Error: No se puede guardar el comentario sin un usuario logueado.");
      return;
    }

    if (nuevoComentario.trim() !== "") {
      await addDoc(collection(db, "comentarios"), {
        proyectoId,
        autorId: usuarioActual.id,
        texto: nuevoComentario,
        fecha: Timestamp.now(),
        respuestas: [],
      });

      setNuevoComentario("");
      const proyectoRef = doc(db, "proyectos", proyectoId);
      await updateDoc(proyectoRef, {
        totalComentarios: increment(1),
});

    }
  };

  const manejarRespuesta = async (comentarioId: string) => {
    const texto = respuestaTexto[comentarioId]?.trim();
    if (!texto || !usuarioActual) return;

    const comentarioRef = doc(db, "comentarios", comentarioId);

    await updateDoc(comentarioRef, {
      respuestas: arrayUnion({ autorId: usuarioActual.id, texto })
    });

    setRespuestaTexto((prev) => ({ ...prev, [comentarioId]: "" }));
    const proyectoRef = doc(db, "proyectos", proyectoId);
    await updateDoc(proyectoRef, {
    totalComentarios: increment(1)
});
  };

  return (
    <div className="comentarios-container">
      <h1>Comentarios</h1>
      {comentariosFirestore.map((comentario) => (
        <div key={comentario.id} className="comentario">
          <div className="comentario-texto">
<p><strong>@{nombresUsuarios[comentario.autorId]}</strong></p>
            <p>{comentario.texto}</p>
          </div>

         
 {comentario.respuestas && comentario.respuestas.length > 0 && (
            <div className="respuestas">
              {comentario.respuestas.map((respuesta, index) => (
                <div key={index} className="respuesta">
<p><strong>@{nombresUsuarios[respuesta.autorId]}</strong></p>
                  <p>{respuesta.texto}</p>
                </div>
              ))}
            </div>
          )} 
          <input
            type="text"
            placeholder="Escribe tu respuesta..."
            className="nuevo-comentario respuestas"
            value={respuestaTexto[comentario.id] || ""}
            onChange={(e) =>
              setRespuestaTexto((prev) => ({ ...prev, [comentario.id]: e.target.value }))
            }
          />
          <button className="comentario-boton respuesta" onClick={() => manejarRespuesta(comentario.id)}>
            Responder
          </button>

         
        </div>
      ))}

      <textarea
        className="nuevo-comentario"
        value={nuevoComentario}
        onChange={(e) => setNuevoComentario(e.target.value)}
        placeholder="Escribe un comentario..."
      />
      <button className="comentario-boton" onClick={manejarComentario}>Enviar</button>
    </div>
  );
}

export default Comentarios;