import "./socialEngagement.css";
import img from "../../../../assets/imgPerfil.png";
import { FaComment, FaShare, FaBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import { doc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { useDispatch } from "react-redux";
import { fetchProyectos } from "../../../../Redux/sliceProjects";
import { AppDispatch } from "../../../../Redux/store";
import { Usuario } from "../../../../Redux/sliceUsers";

interface SocialEngagementProps {
  proyectoId: string;
  usuarioActual: Usuario;
  usuarioAutor: string;
}

const SocialEngagement: React.FC<SocialEngagementProps> = ({ proyectoId, usuarioActual, usuarioAutor }) => {
  const [datos, setDatos] = useState({
    totalComentarios: "0",
    totalCompartidos: "0",
    totalSalvos: "0",
  });

  
const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!proyectoId) return;

    const ref = doc(db, "proyectos", proyectoId);
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setDatos({
          totalComentarios: data.totalComentarios?.toString() ?? "0",
          totalCompartidos: data.totalCompartidos?.toString() ?? "0",
          totalSalvos: data.totalSalvos?.toString() ?? "0",
        });
      }
    });

    return () => unsubscribe();
  }, [proyectoId]);

  const manejarCompartir = async () => {
  if (!usuarioActual?.id) {
    console.error("Error: usuario no tiene un ID válido.");
    return;
  }

  const proyectoRef = doc(db, "proyectos", proyectoId);
  const usuarioRef = doc(db, "usuarios", usuarioActual.id);

  await updateDoc(proyectoRef, {
    totalCompartidos: increment(1),
  });

  await updateDoc(usuarioRef, {
    proyectosCompartidos: [...(usuarioActual.proyectosCompartidos || []), proyectoId],
  });

  dispatch(fetchProyectos());
};
const manejarAprobar = async () => {
  if (!usuarioActual?.id) {
    console.error("Error: usuario no tiene un ID válido.");
    return;
  }

  const proyectoRef = doc(db, "proyectos", proyectoId);
  const usuarioRef = doc(db, "usuarios", usuarioActual.id);

  await updateDoc(proyectoRef, {
    totalSalvos: increment(1),
  });

  await updateDoc(usuarioRef, {
    proyectosGuardados: [...(usuarioActual.proyectosGuardados || []), proyectoId],
  });

  dispatch(fetchProyectos());
};

  return (
    <div className="social-engagement-container">
      <div className="actions-container">
        <div className="action">
          <FaComment className="icon" />
          <p>{datos.totalComentarios}</p>
        </div>
        <div className="action" onClick={manejarCompartir}>
          <FaShare className="icon" />
          <p>{datos.totalCompartidos}</p>
        </div>
        <div className="action" onClick={manejarAprobar}>
          <FaBookmark className="icon" />
          <p>{datos.totalSalvos}</p>
        </div>
      </div>
      <div className="user-info">
        <div className="user-avatar-container">
          <img src={img} alt={usuarioAutor || "Usuario"} className="user-avatar" />
        </div>
        <h1 className="user-name">{usuarioAutor}</h1>
      </div>
    </div>
  );
};

export default SocialEngagement;