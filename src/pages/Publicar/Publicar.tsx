import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import Nav from "../../components/nav/Nav";
import FormPost from "../../components/FormPost/FormPost";
import "./publicar.css";
import { FaArrowUp, FaXmark } from "react-icons/fa6";
import { fetchProyectos } from "../../Redux/sliceProjects";

function Publicar() {
  const usuario = useSelector((state: RootState) => state.usuarios.usuarioActual);
  console.log("Usuario en Publicar.tsx:", usuario);

  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [publicado, setPublicado] = useState(false);
  const dispatch: AppDispatch = useDispatch();


 const handlePublicar = async (nombre: string, descripcion: string, tecnologias: string[]) => {
  if (!usuario) {
    console.error("No hay usuario logueado.");
    return;
  }

  await addDoc(collection(db, "proyectos"), {
    nombre,
    descripcion,
    tecnologias,
    imagen: image || "", 
    UsuarioID: usuario.id,
    usuario: usuario.usuario,
    fecha_creacion: new Date(),
  });

  dispatch(fetchProyectos()); 

  console.log("Proyecto publicado con imagen en localhost:", image);
  setPublicado(true);
};

 const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file); 
    setImage(imageUrl);
    setFileName(file.name);
    console.log("Imagen cargada en localhost:", imageUrl);
  }
};

  const handleRemoveImage = () => {
    setImage(null);
    setFileName(null);
  };

  return (
    <div className="publicar-container">
      <Nav />

      <div className="publicar-content">
        <div className="publicar-content-left">
          <div className="container-img">
            {image ? <img src={image} alt="Imagen subida" /> : "Imagen aquí"}
          </div>
          <label htmlFor="file-upload" className="boton-upload">
            Cargar imagen <FaArrowUp />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload} 
            style={{ display: "none" }}
          />
          {image && (
            <div className="archivo-info">
              <span>{fileName}</span>
              <button className="botaoExcluir" onClick={handleRemoveImage}>
                <FaXmark />
              </button>
            </div>
          )}
        </div>

        <div className="publicar-content-right">
          {!publicado ? (
            <FormPost onPublicar={handlePublicar} />
          ) : (
            <p>¡Proyecto publicado con éxito!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Publicar;