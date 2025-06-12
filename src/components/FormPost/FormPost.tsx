import { useState, useEffect, useCallback } from "react";
import TagInput from "../TagInput/TagInput";
import "./formPost.css";
import Boton from "../Boton/Boton";
import { FaTrashCan } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa6";
import {resetTags} from "../../Redux/sliceProjects"
import { useDispatch } from "react-redux";

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
  const [errorNombre, setErrorNombre] = useState<string | null>(null);
  const [errorDescripcion, setErrorDescripcion] = useState<string | null>(null);  
  const dispatch = useDispatch();


const resetearCampos = useCallback(() => {
 
  setNombre("");
  setDescripcion("");
  setTecnologias([]);
  dispatch(resetTags());
}, [dispatch]);

useEffect(() => {
  if (resetForm) {
    resetearCampos();
    setResetForm(false);
  }
}, [resetForm, setResetForm, resetearCampos]);
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  let hasError = false;

  if (!nombre.trim()) {
    setErrorNombre("El nombre del proyecto es obligatorio.");
    hasError = true;
  } else {
    setErrorNombre(null);
  }

  if (!descripcion.trim()) {
    setErrorDescripcion("La descripción es obligatoria.");
    hasError = true;
  } else {
    setErrorDescripcion(null);
  }

  if (hasError) return; 

  try {
  await onPublicar(nombre, descripcion, tecnologias);
  setPublicado(true);
  resetearCampos();  
} catch (error) {
  console.error("Error al publicar el proyecto:", error);
}
}

useEffect(() => {
  if (publicado) {
    const timeout = setTimeout(() => {
      setPublicado(false); 
    }, 3000);
    return () => clearTimeout(timeout);
  }
}, [publicado]);
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
      onChange={(e) => {
    setNombre(e.target.value);
    if (errorNombre) setErrorNombre(null);
  }}
        />
{errorNombre && <p className="mensaje-error">{errorNombre}</p>}

        <label>Descripción</label>
      <textarea
  cols={30}
  rows={10}
  className="inputForm"
  value={descripcion}
  onChange={(e) => {
    setDescripcion(e.target.value);
    if (errorDescripcion) setErrorDescripcion(null);
  }}

/>
{errorDescripcion && <p className="mensaje-error">{errorDescripcion}</p>}

        <TagInput setTecnologias={(tags) => {
  setTecnologias(tags);
        }} />

       <div className="botones-publicar-container">
  <div className="botones">
    <Boton tipo="button" texto="Deletar" icone={<FaTrashCan />} onClick={resetearCampos}/>
    <Boton tipo="submit" texto="Publicar" colorFondo="var(--verde-claro)" colorTexto="var(--gris-oscuro)" icone={<FaUpload />} />
  </div>
 
  {publicado && (<p className="mensaje-exito">¡Proyecto publicado con éxito!</p>)}

</div>
      </form>
    </div>
  );
}

export default FormPost;