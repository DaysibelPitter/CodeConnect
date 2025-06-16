import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { agregarProyectoVisto, Proyecto } from "../../Redux/sliceProjects";
import { RootState } from "../../Redux/store";
import Nav from "../../components/nav/Nav";
import "./DetailsProjects.css";
import SocialEngagement from "../../components/Feed/Cards/SocialEngagement/SocialEngagement";
import Comentarios from "../../components/Comentarios/Comentarios";
import { useEffect, useState } from "react";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

const DetailsProjects = () => {
  const { id } = useParams();
  const proyectos = useSelector((state: RootState) => state.proyectos.proyectos);
  const dispatch = useDispatch();
  const proyecto = proyectos.find((p) => p.id.toString() === id);
  const proyectoActual = useSelector((state: RootState) => state.proyectos.proyectoActual);

  const [proyectoEnTiempoReal, setProyectoEnTiempoReal] = useState<Proyecto | null>(null);
  const [codigoEditable, setCodigoEditable] = useState("");
  const [codigoOriginal, setCodigoOriginal] = useState("");

  useEffect(() => {
    if (!id) return;
    const docRef = doc(db, "proyectos", id);
    const unsub = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as Proyecto;
        setProyectoEnTiempoReal({ ...data, id: snap.id });
        const codigo = data.codigo || "";
        setCodigoEditable(codigo);
        setCodigoOriginal(codigo);
      }
    });
    return () => unsub();
  }, [id]);

  const guardarCodigoActualizado = async () => {
    if (!proyecto) return;
    const proyectoRef = doc(db, "proyectos", proyecto.id);
    try {
      await updateDoc(proyectoRef, { codigo: codigoEditable });
    } catch (err) {
      console.error("Error guardando el código:", err);
      alert("Ocurrió un error al guardar.");
    }
  };

  useEffect(() => {
    if (proyecto) {
      dispatch(agregarProyectoVisto(proyecto));
    }
  }, [dispatch, proyecto]);

  const proyectoParaMostrar = proyectoEnTiempoReal || proyecto;

  return (
    <div className="details-container">
      <Nav />
      <div className="details-content">
        {proyectoParaMostrar ? (
          <div className="details-project">
            <div className="details-header">
              <div className="details-image">
                <img src={proyectoParaMostrar.imagen} alt="imagen de proyecto" />
              </div>
              <div className="details-info">
                <h1>{proyectoParaMostrar.nombre}</h1>
                <p>{proyectoParaMostrar.descripcion}</p>
                <SocialEngagement
                  proyectoId={proyectoParaMostrar.id}
                  usuario={proyectoParaMostrar.usuario}
                />
              </div>
            </div>

            <div className="details-code">
              <h1>Código</h1>
              <pre className="codigo-pre">{codigoOriginal}</pre>

              <h2>Editar código</h2>
              <textarea
                className="code-input"
                value={codigoEditable}
                onChange={(e) => setCodigoEditable(e.target.value)}
                rows={10}
              />
              <button onClick={guardarCodigoActualizado}>Guardar código</button>
            </div>

            <div className="details-comments">
              {proyectoActual ? (
                <Comentarios proyectoId={proyectoActual.id} />
              ) : (
                <p>No hay un proyecto seleccionado.</p>
              )}
            </div>
          </div>
        ) : (
          <h2>Proyecto no encontrado.</h2>
        )}
      </div>
    </div>
  );
};

export default DetailsProjects;