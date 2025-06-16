import "./socialEngagement.css";
import img from "../../../../assets/imgPerfil.png";
import { FaComment, FaShare, FaBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import { doc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { useDispatch } from "react-redux";
import { fetchProyectos } from "../../../../Redux/sliceProjects";
import { AppDispatch } from "../../../../Redux/store";

interface SocialEngagementProps {
  proyectoId: string;
  usuario: string;
}

const SocialEngagement: React.FC<SocialEngagementProps> = ({ proyectoId, usuario }) => {
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
    const proyectoRef = doc(db, "proyectos", proyectoId);
    await updateDoc(proyectoRef, {
      totalCompartidos: increment(1),
    });
    dispatch(fetchProyectos()); // Actualiza Redux después del clic
  };

  const manejarAprobar = async () => {
    const proyectoRef = doc(db, "proyectos", proyectoId);
    await updateDoc(proyectoRef, {
      totalSalvos: increment(1),
    });
    dispatch(fetchProyectos()); // Asegura que el perfil refleje el conteo
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
          <img src={img} alt={usuario} className="user-avatar" />
        </div>
        <h1 className="user-name">{usuario}</h1>
      </div>
    </div>
  );
};

export default SocialEngagement;