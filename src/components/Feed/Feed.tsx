import NavFeed from "./nav/NavFeed"
import './Feed.css';
import { FaSistrix } from "react-icons/fa6";
import Tags from '../Feed/Tags/Tags';
import Cards from './Cards/Card/Cards';
function Feed() {
 

  return (
    <div className="feed-container">
    <NavFeed/>
    <div className='feed'>
      <div className="feed-header">

      <div className="search-container">
      <FaSistrix  className="search-icon"/>
      <input type="search" name="buscar" id="buscar" className="search-input" placeholder="Digite o que voce procura" />
      </div>
      <div className="filtros">
       <Tags/>
      <button className="botao-limpar-filtros">Limpar tudo</button>
      </div>
      </div>
       <div className="feed-content">
        <button className="botao-recentes">Recentes</button>
        <Cards/>
       </div>
    </div>
    </div>
  )
}

export default Feed;


