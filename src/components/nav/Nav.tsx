import logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';
import './nav.css';
import { FaInfoCircle } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Boton from "../../components/Boton/Boton";
// icone de login = import { FaArrowRightToBracket } from "react-icons/fa6";
// <FaArrowRightToBracket />
function NavFeed() {

  return (
    <>
    <nav className='sidebar'>
    <img src={logo} alt="logo" />
    <Link to="/publicar"><Boton texto='Publicar'/></Link>
    <Link to="/feed" className='navBotao'><FaRegFileAlt />Feed</Link >
    <Link to="/perfil"  className='navBotao'><FaUserCircle />Perfil</Link >
    <Link to="/acercaDe"  className='navBotao'><FaInfoCircle />Quienes somos</Link >
    <Link to="/"  className='navBotao' type='button'><FaArrowRightFromBracket />Salir</Link>
    </nav>
    </>
  )
}

export default NavFeed;


