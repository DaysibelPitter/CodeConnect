import { FaArrowRight } from "react-icons/fa";
import "./FormLogin.css"
function FormLogin(){
    return(
        <>
         <form action="" method="post" className="formLogin">
                    <label htmlFor="">Email ou usuário</label>
                    <input type="email" name="email" id="email" className="inputLogin" placeholder="Usuario123"/>
                    <label htmlFor="">Senha</label>
                    <input type="password" name="password" id="password" className="inputLogin" placeholder="*****"/>
                    <div className="lembrarSenha">
                      <span><input type="checkbox" name="" id="" />Lembrar-me</span>
                    <a href="#">Esqueci a senha</a>
                    </div>
                    <button type="submit" className="botaoLogin">Login<FaArrowRight/></button>
                  </form>
        </>
    )
}

export default FormLogin