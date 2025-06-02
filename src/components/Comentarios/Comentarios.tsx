import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { agregarComentario } from "../../Redux/sliceProjects";
import "./Comentarios.css";
import { useState } from "react";

function Comentarios() {
  const comentarios = useSelector((state: RootState) => state.proyectos.comentarios);
  const dispatch = useDispatch();
  const [nuevoComentario, setNuevoComentario] = useState("");

  const manejarComentario = () => {
    if (nuevoComentario.trim() !== "") {
      dispatch(agregarComentario({ id: Date.now(), usuario: "@usuarioActual", texto: nuevoComentario }));
      setNuevoComentario("");
    }
  };

  return (
    <div className="comentarios-container">
        <h1>Comentarios</h1>
      {comentarios.map((comentario) => (
        <div key={comentario.id} className="comentario">
            <div className="comentario-texto">
              <p><strong>{comentario.usuario}</strong></p>
              <p>{comentario.texto}</p>
            </div>
          <button className="comentario-boton">Responder</button>
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