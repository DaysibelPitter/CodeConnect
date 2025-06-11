import { useState, useEffect } from "react";
import TagInput from "../TagInput/TagInput";
import "./formPost.css";
import Boton from "../Boton/Boton";
import { FaTrashCan } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa6";

interface FormPostProps {
   onPublicar: (nombre: string, descripcion: string, tecnologias: string[]) => void;
   resetForm: boolean;
   setResetForm: (value: boolean) => void;
}

function FormPost({ onPublicar, resetForm, setResetForm }: FormPostProps) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tecnologias, setTecnologias] = useState<string[]>([]);
  const [publicado, setPublicado] = useState(false);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  if (resetForm) {
    setNombre("");
    setDescripcion("");
    setTecnologias([]);
    setPublicado(false);
    setResetForm(false); 
  }
}, [resetForm, setResetForm]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!nombre.trim() || !descripcion.trim() || tecnologias.length === 0) {
    setError("Por favor, completa todos los campos antes de publicar.");
    return;
  }

  try {
    await onPublicar(nombre, descripcion, tecnologias);
    setPublicado(true);
    setError(null); 
  } catch (error) {
     console.error("Error al publicar el proyecto:", error);
    setError("Error al publicar el proyecto. Intenta nuevamente.");
  }
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
          required
        />

        <label>Descripción</label>
        <textarea
          cols={30}
          rows={10}
          className="inputForm"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        
        />

        <TagInput setTecnologias={setTecnologias} />
{error && <p className="mensaje-error">{error}</p>}
        <div className="botones-publicar-container">
<div className="botones">
             <Boton
            tipo="button"
            texto="Deletar"
            icone={<FaTrashCan />}
            onClick={() => {
              setNombre("");
              setDescripcion("");
              setTecnologias([]);
              setError(null);
            }}
          />
        <Boton tipo="submit" texto="Publicar" colorFondo="var(--verde-claro)" colorTexto="--gris-oscuro" icone={<FaUpload />} />
          </div>
         {publicado && <p className="mensaje-exito">¡Proyecto publicado con éxito!</p>}

        </div>
      </form>
    </div>
  );
}

export default FormPost;