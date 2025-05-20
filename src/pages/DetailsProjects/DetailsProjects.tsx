import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { agregarProyectoVisto } from "../../Redux/sliceProjects";
import { RootState } from "../../Redux/store";
import NavFeed from "../../components/nav/Nav";
import "./DetailsProjects.css";

const DetailsProjects = () => {
  const { id } = useParams(); 
  const proyectos = useSelector((state: RootState) => state.proyectos.proyectos);
  const dispatch = useDispatch();

 
  const proyecto = proyectos.find((p) => p.id.toString() === id);

 
  if (proyecto) {
    dispatch(agregarProyectoVisto(proyecto));
  }

  return (
    <div className="details-container">
      <NavFeed />
      <div className="details-content">
        {proyecto ? (
          <>
            <h1>{proyecto.nombre}</h1>
            <p>{proyecto.descripcion}</p>
            <p><strong>Tecnologías:</strong> {proyecto.tecnologias.join(", ")}</p>
          </>
        ) : (
          <h2>Proyecto no encontrado.</h2>
        )}
      </div>
    </div>
  );
};

export default DetailsProjects;