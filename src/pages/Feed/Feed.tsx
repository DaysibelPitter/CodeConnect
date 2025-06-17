import Nav from "../../components/nav/Nav";
import "./Feed.css";
import { FaSistrix } from "react-icons/fa6";
import Tags from "../../components/Feed/Tags/Tags";
import Cards from "../../components/Feed/Cards/Card/Cards";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { agregarTagSeleccionada, resetTags, setFiltro } from "../../Redux/sliceProjects";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { eliminarTagSeleccionada } from "../../Redux/sliceProjects";
import { filtrarOpciones } from "../../utils/utils"; 
import { useState } from "react";
import { fetchProyectos } from "../../Redux/sliceProjects";
import { AppDispatch } from "../../Redux/store";
import OptionsList from "../../components/OptionsList/OptionsList";

function Feed() {
  const proyectos = useSelector((state: RootState) => state.proyectos.proyectos);
  const filtro = useSelector((state: RootState) => state.proyectos.filtro);
  const tagsSeleccionadas = useSelector((state: RootState) => state.proyectos.tagsSeleccionadas);
  const status = useSelector((state: RootState) => state.proyectos.status);
  const error = useSelector((state: RootState) => state.proyectos.error);
  const dispatch :AppDispatch =  useDispatch();
const usuarioActual = useSelector((state: RootState) => state.usuarios.usuarioActual);

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

const proyectosFiltrados =
  filtro === "recientes" && proyectosVistos.length > 0
    ? proyectosVistos
    : tagsSeleccionadas.length > 0
    ? proyectos.filter(p => Array.isArray(p.tecnologias) && p.tecnologias.some(t => tagsSeleccionadas.includes(t)))
    : filtro
    ? proyectos.filter(p => Array.isArray(p.tecnologias) && p.tecnologias.includes(filtro))
    : proyectos;

  const location = useLocation();
  useEffect(() => {
  console.log("Estado de proyectos en Redux:", proyectos);
}, [proyectos]);
useEffect(() => {
  console.log("Lista de proyectos vistos:", proyectosVistos);
}, [proyectosVistos]);
useEffect(() => {
  console.log("Filtro actual:", filtro);
}, [filtro]);

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
      <Nav />
      <div className="feed">
        <div className="feed-header">
          <div className="search-container">
            <div className="search-input-container">
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
            </div>
            <div className="list-container">
          <OptionsList opciones={filteredOptions} onSelect={handleSelectTag} />

            </div>

          </div>
          <div className="filtros">
            
             <Tags tags={tagsSeleccionadas} onRemove={(tag: string) => dispatch(eliminarTagSeleccionada(tag))} />
            <button className="botao-limpar-filtros" 
            onClick={() => {
    dispatch(setFiltro(""));
    dispatch(resetTags()); 
  }}

            >
              Limpar todo

            </button>
          </div>
        </div>
        <div className="feed-content">
  <button 
  className="botao-recentes" 
  onClick={() => {
    dispatch(setFiltro("recientes"));
  }} 
  disabled={proyectosVistos.length === 0}
>
  Recientes
</button>
         {usuarioActual && <Cards proyectos={proyectosFiltrados} usuarioActual={usuarioActual}/>}


        </div>
      </div>
    </div>
  );
}

export default Feed;