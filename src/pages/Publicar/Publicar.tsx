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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";

function Publicar() {
  const usuario = useSelector((state: RootState) => state.usuarios.usuarioActual);
  console.log("Usuario en Publicar.tsx:", usuario);

  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [resetForm, setResetForm] = useState(false);
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
  });

  dispatch(fetchProyectos()); 

  console.log("Proyecto publicado con imagen en:", image);
    
 setTimeout(() => {
  setResetForm(true);
  setTimeout(() => {
    setResetForm(false);
  }, 3000); 
}, 500); 
};

 const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
   const storageRef = ref(storage, `proyectos/${file.name}`)
   const uploadTask = uploadBytesResumable(storageRef,file)

   uploadTask.on(
    "state_changed",
    (snapshot)=> {
      const progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Progreso de carga: ${progreso}%`);
    },
    (error)=>{
      console.error("Error al subir la imagen:", error);
    },
    async()=> {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log("Imagen subida y disponible en :", downloadURL)
      setImage(downloadURL);
      setFileName(file.name);
      console.log("Imagen subida con éxito:", downloadURL);
    }
   )
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
  <FormPost onPublicar={handlePublicar} resetForm={resetForm} setResetForm={setResetForm} />
</div>
      </div>
    </div>
  );
}

export default Publicar;