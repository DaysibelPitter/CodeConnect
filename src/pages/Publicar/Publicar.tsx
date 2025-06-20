import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import Nav from "../../components/nav/Nav";
import FormPost from "../../components/FormPost/FormPost";
import "./publicar.css";
import { fetchProyectos } from "../../Redux/sliceProjects";
import UploadImage from "../../components/UploadImg/UploadImage";

function Publicar() {
  const usuario = useSelector((state: RootState) => state.usuarios.usuarioActual);
  console.log("Usuario en Publicar.tsx:", usuario);

  const [image, setImage] = useState<string | null>(null);
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
    totalComentarios: 0,
    totalSalvos: 0,
    totalCompartidos: 0,

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



  return (
    <div className="publicar-container">
      <Nav />

      <div className="publicar-content">
        <div className="publicar-content-left">
          <UploadImage
          estilos="default"
  carpeta="proyectos"
  onUploadComplete={(url) => setImage(url)}
/>
        </div>
<div className="publicar-content-right">
  <FormPost onPublicar={handlePublicar} resetForm={resetForm} setResetForm={setResetForm} />
</div>
      </div>
    </div>
  );
}

export default Publicar;