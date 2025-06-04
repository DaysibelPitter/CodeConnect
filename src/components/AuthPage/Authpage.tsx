import { Link } from "react-router-dom";
import imgCadastro from "../../assets/imgCadastro.png";
import imgLogin from "../../assets/imgLogin.png";
import "./AuthPage.css";
import { FaClipboard } from "react-icons/fa";
import Form from "../Form/Form";
import ContasExternas from "../ContasExternas/ContasExternas";
import { db } from "../../config/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

interface AuthPageProps {
  isCadastro: boolean;
}

const registrarUsuario = async (nome: string, email: string, password: string) => {
  try {
    await addDoc(collection(db, "usuarios"), {
      usuario: email.split("@")[0],
      nombre: nome,
      email,
      contraseña: password,
      fecha_registro: new Date(),
    });

    console.log("Usuario registrado correctamente.");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
  }
};

const validarLogin = async (email: string, password: string) => {
  try {
    const q = query(collection(db, "usuarios"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const usuario = querySnapshot.docs[0].data();

      if (usuario.contraseña === password) {
        console.log("Login exitoso:", usuario);
        return usuario;
      }
    }

    console.warn("Usuario no encontrado o contraseña incorrecta.");
    return null;
  } catch (error) {
    console.error("Error al validar login:", error);
    return null;
  }
};

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
          <Form isCadastro={isCadastro} onRegistrar={registrarUsuario} onLogin={validarLogin} />
        </div>
        <div>
          <ContasExternas />
          <div className="cadastroLink">
            {isCadastro ? (
              <Link to="/">Já tem conta? Faça login! <FaClipboard /></Link>
            ) : (
              <>
                <span>Ainda não tem conta?</span>
                <Link to="/cadastro">Crie seu cadastro! <FaClipboard /></Link>
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