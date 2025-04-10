
import img from "../../assets/IMG_1 - Desktop.png"
import { FaClipboard } from "react-icons/fa";
import  Form from "../Form/Form";
import ContasExternas from "../ContasExternas/ContasExternas";
import "../Login/Login.css"
function Login() {
 

  return (
    <div className="container">
      <div className='img'>
         <img src={img} alt="imagen del Cadastro" />
      </div>
      <div className="containerForm">
      <h1>Cadastro</h1>
      <p>Olá! Preencha seus dados.</p>
        <div className='formContainer'>
        <Form isCadastro={true} />
      </div>
      <div>
      <ContasExternas/>
     <div className="cadastroLink">
      <a href="">Já tem conta? Faça login! <FaClipboard /></a>
      </div>
      </div>
    
      </div>
      
    </div>
  )
}

export default Login
