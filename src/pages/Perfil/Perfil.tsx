import NavFeed from "../../components/nav/Nav";
import "./perfil.css";
import Cards from "../../components/Feed/Cards/Card/Cards";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { useState } from "react";
import UploadImage from "../../components/UploadImg/UploadImage";
import { actualizarUsuario, fetchUsuarioPorId } from "../../Redux/sliceUsers"; 

function Perfil() {
  const usuario = useSelector((state: RootState) => state.usuarios.usuarioActual);
  const proyectos = useSelector((state: RootState) => state.proyectos.proyectos);
  const dispatch: AppDispatch = useDispatch();
  const [editandoBio, setEditandoBio] = useState(false);
  const [nuevaBio, setNuevaBio] = useState(usuario?.biografia || "");

  const [filtroActivo, setFiltroActivo] = useState<"todos" | "guardados" | "compartidos">("todos");

  const proyectosUsuario = usuario
    ? proyectos.filter((p) => {
        const esDelUsuario = p.UsuarioID === usuario.id;
        const usuarioGuardó = usuario.proyectosGuardados?.includes(p.id);
        const usuarioCompartió = usuario.proyectosCompartidos?.includes(p.id);

        if (filtroActivo === "guardados") return usuarioGuardó;
        if (filtroActivo === "compartidos") return usuarioCompartió;
        return esDelUsuario;
      })
    : [];

  const actualizarFotoPerfil = async (url: string) => {
    if (!usuario?.id) return;

    await dispatch(actualizarUsuario({
      usuarioId: usuario.id,
      nuevosDatos: { imagen: url }
    }));

    await dispatch(fetchUsuarioPorId(usuario.id)); 
  };

  const guardarBiografia = async () => {
  if (!usuario?.id) return;

  await dispatch(actualizarUsuario({
    usuarioId: usuario.id,
    nuevosDatos: { biografia: nuevaBio }
  }));

  await dispatch(fetchUsuarioPorId(usuario.id));
  setEditandoBio(false);
};

  return (
    <div className="perfil-container">
      <NavFeed />
      <div className="perfil-content">
        <div className="perfil-header">
          <div className="perfil-header-image">
            <UploadImage
              estilos="perfil"
              carpeta="usuarios"
              urlPorDefecto={usuario?.imagen}
              onUploadComplete={actualizarFotoPerfil}
            />
          </div>

          <div className="perfil-header-text">
            <div className="perfil-header-user">
              <span>
                @{usuario?.usuario?.includes("@")
                  ? `user_${usuario.id}`
                  : usuario?.usuario || "Usuario desconocido"}
              </span>
              <button>Seguir</button>
            </div>

           <div className="perfil-header-info">
  <h1>{usuario?.nombre || "Nombre no disponible"}</h1>
  {editandoBio ? (
    <>
      <textarea
        value={nuevaBio}
        onChange={(e) => setNuevaBio(e.target.value)}
        rows={3}
        className="perfil-bio-input"
      />
      <button className="perfil-bio-boton" onClick={guardarBiografia}>Guardar</button>
    </>
  ) : (
    <>
      <p>{usuario?.biografia || "Biografía no disponible. Por favor, completa tu perfil."}</p>
      <button className="perfil-bio-boton" onClick={() => setEditandoBio(true)}>Editar</button>
    </>
  )}
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
            {["todos", "guardados", "compartidos"].map((filtro) => (
              <button
                key={filtro}
                className={`filtro-post ${filtroActivo === filtro ? "activo" : ""}`}
                onClick={() => setFiltroActivo(filtro as typeof filtroActivo)}
              >
                {filtro === "todos" ? "Mis proyectos" : filtro.charAt(0).toUpperCase() + filtro.slice(1)}
              </button>
            ))}
          </div>
          {usuario && <Cards proyectos={proyectosUsuario} usuarioActual={usuario} />}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
