import { Link } from "react-router-dom";
import imgCadastro from "../../assets/imgCadastro.png";
import imgLogin from "../../assets/imgLogin.png";
import "./AuthPage.css";
import { FaClipboard } from "react-icons/fa";
import Form from "../Form/Form";
import ContasExternas from "../ContasExternas/ContasExternas";

interface AuthPageProps {
  isCadastro: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ isCadastro }) => {
  return (
    <div className="container">
      <div className="img">
        <img src={isCadastro ? imgCadastro : imgLogin} alt={isCadastro ? "Cadastro" : "Login"} />
      </div>
      <div className="containerForm">
        <h1>{isCadastro ? "Cadastro" : "Login"}</h1>
        <p>{isCadastro ? "Olá! Preencha seus dados." : "Boas-vindas! Faça seu login."}</p>
        <div className="formContainer">
          <Form isCadastro={isCadastro} />
        </div>
        <div>
          <ContasExternas />
          <div className="cadastroLink">
            {isCadastro ? (
              <Link to="/">Ya tienes cuenta? Puedes hacer Login! <FaClipboard /></Link>
            ) : (
              <>
                <span>Aun no tienes una cuenta?</span>
                <Link to="/cadastro">Crea tu cuenta! <FaClipboard /></Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoginPage = () => <AuthPage isCadastro={false} />;
export const CadastroPage = () => <AuthPage isCadastro={true} />;