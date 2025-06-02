import NavFeed from "../../components/nav/Nav";
import "./Feed.css";
import { FaSistrix } from "react-icons/fa6";
import Tags from "../../components/Feed/Tags/Tags";
import Cards from "../../components/Feed/Cards/Card/Cards";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { agregarTagSeleccionada, setFiltro } from "../../Redux/sliceProjects";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { eliminarTagSeleccionada } from "../../Redux/sliceProjects";
import { filtrarOpciones } from "../../utils/utils"; 
import { useState } from "react";
import { fetchProyectos } from "../../Redux/sliceProjects";
import { AppDispatch } from "../../Redux/store";

function Feed() {
  const proyectos = useSelector((state: RootState) => state.proyectos.proyectos);
  const filtro = useSelector((state: RootState) => state.proyectos.filtro);
  const tagsSeleccionadas = useSelector((state: RootState) => state.proyectos.tagsSeleccionadas);
  const status = useSelector((state: RootState) => state.proyectos.status);
  const error = useSelector((state: RootState) => state.proyectos.error);
  const dispatch :AppDispatch =  useDispatch();

   const [searchInput, setSearchInput] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);



  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    setFilteredOptions(filtrarOpciones(value, tagsSeleccionadas));
  };

const handleSelectTag = (option: string) => {
    dispatch(agregarTagSeleccionada(option));
    setSearchInput("");
    setFilteredOptions([]);
  };

  const proyectosVistos = useSelector((state: RootState) => state.proyectos.proyectosVistos);

 const proyectosFiltrados = tagsSeleccionadas.length > 0
    ? proyectos.filter(p => p.tecnologias.some(t => tagsSeleccionadas.includes(t)))
    : filtro === "recientes"
    ? proyectosVistos
    : filtro
    ? proyectos.filter(p => p.tecnologias.includes(filtro))
    : proyectos

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
  console.log("Estado de proyectos en Redux:", proyectos);
}, [proyectos]);

  useEffect(() => {
    if (location.pathname === "/feed") {
    dispatch(setFiltro(""));

    if (status === "idle") {
      dispatch(fetchProyectos());
    }
  }
}, [location.pathname, dispatch, status, error]
);
  if (status === "loading") {
    return <div>Buscandos los proyectos...</div>;
  }

  if (status === "failed") {
    return <div>Ups! No encontre ese proyecto {error}</div>;
  }

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
               value={searchInput}
            onChange={handleSearchChange}

            />
             {filteredOptions.length > 0 && (
            <ul className="suggestions-list">
              {filteredOptions.map(option => (
                <li key={option} onClick={() => handleSelectTag(option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}

          </div>
          <div className="filtros">
            
             <Tags tags={tagsSeleccionadas} onRemove={(tag: string) => dispatch(eliminarTagSeleccionada(tag))} />
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
         <Cards proyectos={proyectos || proyectosFiltrados} />


        </div>
      </div>
    </div>
  );
}

export default Feed;