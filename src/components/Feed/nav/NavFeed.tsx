import logo from '../../../assets/Logo.png';
import './navFeed.css';
import { FaInfoCircle } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
// icone de login = import { FaArrowRightToBracket } from "react-icons/fa6";
// <FaArrowRightToBracket />
function NavFeed() {

  return (
    <>
    <nav className='sidebar'>
    <img src={logo} alt="logo" />
    <button className='botaoPublicar'>Publicar</button>
    <button className='navBotao'><FaRegFileAlt />Feed</button>
    <button  className='navBotao'><FaUserCircle />Perfil</button>
    <button  className='navBotao'><FaInfoCircle />Sobre nós</button>
    <button  className='navBotao'><FaArrowRightFromBracket />Sair</button>
    </nav>
    </>
  )
}

export default NavFeed;


