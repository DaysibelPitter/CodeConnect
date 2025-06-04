import NavFeed from "../../components/nav/Nav";
import imgUser from "../../assets/imgPerfil.png";
import "./perfil.css";
import Cards from "../../components/Feed/Cards/Card/Cards";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

function Perfil() {
  const usuario = useSelector((state: RootState) => state.usuarios.usuarioActual);
  const proyectos = useSelector((state: RootState) => state.proyectos.proyectos);

  const proyectosUsuario = usuario 
    ? proyectos.filter((p) => p.UsuarioID === usuario.id) 
    : [];

  return (
    <div className="perfil-container">
      <NavFeed />
      <div className="perfil-content">
        <div className="perfil-header">
          <img src={usuario?.imagen || imgUser} alt="Foto de perfil" />

          <div className="perfil-header-text">
            <div className="perfil-header-user">
              <span>@{usuario?.usuario?.includes("@") ? `user_${usuario.id}` : usuario?.usuario || "Usuario desconocido"}</span>
              <button>Seguir</button>
            </div>

            <div className="perfil-header-info">
              <h1>{usuario?.nombre || "Nombre no disponible"}</h1>
              <p>
                {usuario?.biografia || "Biografía no disponible. Por favor, completa tu perfil."}
              </p>
            </div>

            <div className="perfil-header-stats">
              <div className="perfil-header-stats-item">
                <span>{proyectosUsuario.length}</span>
                <span>Proyectos</span>
              </div>
              <div className="perfil-header-stats-item">
                <span>{usuario?.conexiones?.length || 0}</span>
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