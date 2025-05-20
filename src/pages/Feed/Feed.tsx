import NavFeed from "../../components/nav/Nav";
import "./Feed.css";
import { FaSistrix } from "react-icons/fa6";
import Tags from "../../components/Feed/Tags/Tags";
import Cards from "../../components/Feed/Cards/Card/Cards";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { setFiltro } from "../../Redux/sliceProjects";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Feed() {
  const proyectos = useSelector((state: RootState) => state.proyectos.proyectos);
  const filtro = useSelector((state: RootState) => state.proyectos.filtro);
  const dispatch = useDispatch();
  const proyectosVistos = useSelector((state: RootState) => state.proyectos.proyectosVistos);

  const proyectosFiltrados = filtro === "recientes"
  ? proyectosVistos 
  : filtro
  ? proyectos.filter((p) => p.tecnologias.includes(filtro))
  : proyectos;

  const navigate = useNavigate();
  const location = useLocation();
useEffect(() => {
  if (location.pathname === "/feed") {
    dispatch(setFiltro(""));}
}, [location.pathname, dispatch]);



  return (
    <div className="feed-container">
      <NavFeed />
      <div className="feed">
        <div className="feed-header">
          <div className="search-container">
            <FaSistrix className="search-icon" />
            <input
              type="search"
              name="buscar"
              id="buscar"
              className="search-input"
              placeholder="Digite o que voce procura"
            />
          </div>
          <div className="filtros">
            <Tags />
            <button className="botao-limpar-filtros" onClick={() => dispatch(setFiltro(""))}>
              Limpar tudo
            </button>
          </div>
        </div>
        <div className="feed-content">
  <button 
  className="botao-recentes" 
  onClick={() => {
    dispatch(setFiltro("recientes"));
    navigate("/recientes"); 
  }} 
  disabled={proyectosVistos.length === 0}
>
  Recientes
</button>


          <Cards proyectos={proyectosFiltrados} />
        </div>
      </div>
    </div>
  );
}

export default Feed;