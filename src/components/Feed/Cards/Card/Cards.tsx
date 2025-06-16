import { Link } from "react-router-dom";
import "./Cards.css";
import SocialEngagement from "../SocialEngagement/SocialEngagement";
import { Proyecto } from "../../../../Redux/sliceProjects";
import { Usuario } from "../../../../Redux/sliceUsers";

interface CardsProps {
  proyectos: Proyecto[];
  usuarioActual: Usuario;
}
function Cards({ proyectos, usuarioActual }: CardsProps) {

  return (
    <div className="card-container">
      {proyectos.length > 0 ? (
      proyectos.map((card) => 
        <Link 
          key={card.id} 
          to={`/detailsprojects/${card.id}`} 
          state={{ proyecto: card }} 
          className="card-link"
        >
          <div className="card">
            <div className="card-img">
              <img src={card.imagen || "URL_DA_IMAGEM"} alt={card.usuario} />

            </div>
            <div className="card-content">
              <div className="card-text">
                <h1>{card.nombre}</h1>
                <p className="card-description">{card.descripcion}</p>
              </div>
         <SocialEngagement 
  usuarioAutor={card.usuario} 
  usuarioActual={usuarioActual} 
  proyectoId={card.id} 
/>
            </div>
          </div>
        </Link>
      )):( <p>Ningun proyecto esta disponible.</p>

      )}
    </div>
  );
}

export default Cards;