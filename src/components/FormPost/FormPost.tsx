import { useState } from "react";
import TagInput from "../TagInput/TagInput";
import "./formPost.css";
interface FormPostProps {
  onPublicar: (nombre: string, descripcion: string, tecnologias: string[]) => void;
}

function FormPost({ onPublicar }: FormPostProps) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tecnologias, setTecnologias] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPublicar(nombre, descripcion, tecnologias); 
  };

  return (
    <div className="form-container">
      <h1>Nuevo Proyecto</h1>

      <form onSubmit={handleSubmit} className="form">
        <label>Nombre del proyecto</label>
        <input
          type="text"
          placeholder="React desde cero"
          className="inputForm"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Descripción</label>
        <textarea
          cols={30}
          rows={10}
          className="inputForm"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <TagInput setTecnologias={setTecnologias} />

        <button type="submit" className="botaoPublicar">Publicar</button>
         <div className="botones-publicar">
          <button type="button" className="botaoDescartar" >Descartar</button>
          <button type="submit" className="botaoPublicar">Publicar</button>
        </div>

      </form>
    </div>
  );
}

export default FormPost;