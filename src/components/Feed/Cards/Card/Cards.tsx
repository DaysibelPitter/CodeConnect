import { Link } from "react-router-dom";
import "./Cards.css";
// import img from "../../../../assets/imagenCard.png";
import SocialEngagement from "../SocialEngagement/SocialEngagement";
import { Proyecto } from "../../../../Redux/sliceProjects";

interface CardsProps {
  proyectos: Proyecto[];
}

function Cards({ proyectos }: CardsProps) {
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
                usuario={"@"+ card.usuario}
                totalComentarios={card.totalComentarios}
                totalCompartidos={card.totalCompartidos}
                totalSalvos={card.totalSalvos}
              />
            </div>
          </div>
        </Link>
      )):( <p>Nenhum projeto disponível.</p>

      )}
    </div>
  );
}

export default Cards;