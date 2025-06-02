import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { agregarProyectoVisto } from "../../Redux/sliceProjects";
import { RootState } from "../../Redux/store";
import NavFeed from "../../components/nav/Nav";
import "./DetailsProjects.css";
import img from "../../assets/imgSobre.png"; 
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
      <NavFeed />
      <div className="details-content">
        {proyecto ? (
          <div className="details-project">
            <div className="details-header">
              <div className="details-image">
                <img src={img} alt="imagen de proyecto"/>
              </div>
            <div className="details-info">
              <h1>{proyecto.nombre}</h1>
              <p>{proyecto.descripcion}</p>
            </div>
         <SocialEngagement 
           usuario={proyecto.usuario}
  totalComentarios={proyecto.totalComentarios}
  totalCompartidos={proyecto.totalCompartidos}
  totalSalvos={proyecto.totalSalvos}
         />
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