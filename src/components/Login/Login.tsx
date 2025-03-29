
import img from "../../assets/IMG_1 - Desktop.png"
import './Login.css'

import { FaClipboard } from "react-icons/fa";
import  FormLogin from "./formLogin";
import ContasExternas from "./ContasExternas";
function Login() {
 

  return (
    <div className="container">
      <div className='img'>
         <img src={img} alt="imagen del login" />
      </div>
      <div className="login">
      <h1>Login</h1>
      <p>Boas-vindas! Faça seu login.</p>
        <div className='form'>
         <FormLogin/>
          <div className="outrasContas">
          <hr/>
      <span className="hrTitulo">ou entre com outras contas</span>
    <ContasExternas/>
      </div>
      </div>
      <div className="cadastroLink">
      <span>ainda não tem conta?</span>
      <a href="">Crie seu cadastro! <FaClipboard /></a>
      </div>
      </div>
      
    </div>
  )
}

export default Login
