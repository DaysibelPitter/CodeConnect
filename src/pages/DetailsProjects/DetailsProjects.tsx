import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { agregarProyectoVisto } from "../../Redux/sliceProjects";
import { RootState } from "../../Redux/store";
import Nav from "../../components/nav/Nav";
import "./DetailsProjects.css";
import SocialEngagement from "../../components/Feed/Cards/SocialEngagement/SocialEngagement";
import Comentarios from "../../components/Comentarios/Comentarios";

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
      <Nav />
      <div className="details-content">
        {proyecto ? (
          <div className="details-project">
            <div className="details-header">
              <div className="details-image">
                <img src={proyecto.imagen} alt="imagen de proyecto"/>
              </div>
            <div className="details-info">
              <h1>{proyecto.nombre}</h1>
              <p>{proyecto.descripcion}</p>
                <SocialEngagement 
           usuario={proyecto.usuario?? "0"} 
           totalComentarios={proyecto.totalComentarios?? "0"}
           totalCompartidos={proyecto.totalCompartidos?? "0"}
           totalSalvos={proyecto.totalSalvos?? "0"}
         />
            </div>
       
            </div>
           <div className="details-code">
<h1>Código</h1>
 <pre><code>{proyecto.codigo}</code></pre>

           </div>
        <div className="details-comments">
       <Comentarios />
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