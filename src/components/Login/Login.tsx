import { Link } from 'react-router-dom';
import img from "../../assets/IMG_1 - Desktop.png"
import './Login.css'
import { FaClipboard } from "react-icons/fa";
import  Form from "../Form/Form";
import ContasExternas from "../ContasExternas/ContasExternas";
function Login() {
  return (
    <div className="container">
      <div className='img'>
         <img src={img} alt="imagen del login" />
      </div>
      <div className="containerForm">
      <h1>Login</h1>
      <p>Boas-vindas! Faça seu login.</p>
        <div className='formContainer'>
        <Form isCadastro={false} />
      </div>
      <div>
      <ContasExternas/>
      <div className="cadastroLink">
      <span>ainda não tem conta?</span>
      <Link to="/cadastro">Crie seu cadastro! <FaClipboard /></Link>
      </div>
      </div>
     
      </div>
    </div>
  )
}

export default Login
