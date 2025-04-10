import { FaArrowRight } from "react-icons/fa";
import "./form.css"
interface FormProps {
  isCadastro?: boolean;
}

function Form({ isCadastro = false }: FormProps) {
  return (
    <>
    <form action="" method="post" className="form">
        {isCadastro && (
          <>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              className="inputForm"
              placeholder="Nome completo"
            />
          </>
        )}
 <label htmlFor="email">Email ou usuário</label>
        <input
          type="email"
          name="email"
          id="email"
          className="inputForm"
          placeholder="Usuario123"
        />

<label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          id="password"
          className="inputForm"
          placeholder="*****"
        />

<div className="lembrarSenha">
<label htmlFor="Lembrar-me" className="lembrarSenhaLabel"> 
  <input type="checkbox" name="lembrar" id="lembrar" />
Lembrar-me</label>
  {!isCadastro && <a href="#">Esqueci a senha</a>}
</div>

        <button
          type="submit"
          className="botaoForm"
        >

{isCadastro ? "Cadastrar" : "Login"}
          <FaArrowRight />
        </button>
      </form>
    </>
  );
}

export default Form;
