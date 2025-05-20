import NavFeed from "../../components/nav/Nav";
import imgUser from "../../assets/imgPerfil.png";
import "./perfil.css";
import Cards from "../../components/Feed/Cards/Card/Cards";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

function Perfil() {

   const proyectos = useSelector((state: RootState) => state.proyectos.proyectos);

  const proyectosUsuario = proyectos.filter((p) => p.usuario === "@julio");


  return (
    <div className="perfil-container">
      <NavFeed />
      <div className="perfil-content">
        <div className="perfil-header">
          <img src={imgUser} alt="" />
          <div className="perfil-header-text">
             <div className="perfil-header-user">
            <span>@julio</span>
            <button>Seguir</button>
          </div>
          <div className="perfil-header-info">
            <h1>Júlio Olivera</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
<div className="perfil-header-stats">
            <div className="perfil-header-stats-item">
              <span>3</span>
              <span>Proyectos</span>
            </div>
            <div className="perfil-header-stats-item">
              <span>30</span>
              <span>Conexiones</span>
            </div>
          </div>
          </div>
         
          
        </div>
          <div className="perfil-posts">
            <div className="perfil-posts-filter">
                 <button className="filtro-post">Mis proyectos</button>
 <button className="filtro-post">Aprovados</button> 
 <button className="filtro-post">Compartidos</button>
            </div>
           <Cards proyectos={proyectosUsuario} />


        </div>
      </div>
    
    </div>
  );
}

export default Perfil;
