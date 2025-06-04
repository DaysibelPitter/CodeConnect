import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, query, where, DocumentData } from "firebase/firestore";
import { db } from "../../config/firebase";
import "./form.css";
import Boton from "../../components/Boton/Boton";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUsuarioActual } from "../../Redux/sliceUsers";
import { Usuario } from "../../Redux/sliceUsers";

interface FormProps {
  isCadastro?: boolean;
  onRegistrar?: (nome: string, email: string, password: string) => Promise<void>;
  onLogin?: (email: string, password: string) => Promise<DocumentData | null>; 
}


function Form({ isCadastro = false }: FormProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!nome && isCadastro) {
      setErrorMessage("El nombre es obligatorio.");
      return;
    }
    if (!email) {
      setErrorMessage("Ingresa un email o usuario válido.");
      return;
    }
    if (!password || password.length < 5 || !/\d/.test(password) || !/[A-Za-z]/.test(password)) {
      setErrorMessage(" La contraseña debe tener al menos 5 caracteres y contener letras y números.");
      return;
    }

    if (isCadastro) {
      await registrarUsuario();
      navigate("/"); 
    } else {
      const usuario = await validarLogin();
      if (usuario) {
        navigate("/feed"); 
      } else {
        setErrorMessage("⚠️ Credenciales incorrectas. Verifica tu email y contraseña.");
      }
    }
  };

const registrarUsuario = async () => {
  await addDoc(collection(db, "usuarios"), {
    usuario: email.split("@")[0], 
    nombre: nome,  
    email,
    contraseña: password,
    fecha_registro: new Date(),
    proyectosCreados: [],
    conexiones: [],
  });

  console.log("Usuario registrado correctamente.");
};

const validarLogin = async () => {
  const q = query(collection(db, "usuarios"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const usuarioData = querySnapshot.docs[0].data() as Usuario;
    const usuario: Usuario = {
      
      ...usuarioData, 
      id: querySnapshot.docs[0].id, 
      proyectosCreados: usuarioData.proyectosCreados || [],
      conexiones: usuarioData.conexiones || [],
    };

    dispatch(setUsuarioActual(usuario));
    console.log("Login exitoso. Usuario guardado en Redux:", usuario);
    return usuario;
  }
  return null;
};


  return (
    <div className="form-container">
      <h1>{isCadastro ? "Cadastro" : "Login"}</h1>
      <form onSubmit={handleSubmit} className="form">
        
        {isCadastro && (
          <div className="inputContainer">
            <label>Nombre</label>
            <input 
              type="text"
              placeholder="Nome completo"
              className="inputForm"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        )}

        <div className="inputContainer">
          <label>Email o usuário</label>
          <input 
            type="text"
            placeholder="Usuario123"
            className="inputForm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label>Contraseña</label>
          <input 
            type="password"
            placeholder="*****"
            className="inputForm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="lembrarSenha">
          <label className="lembrarSenhaLabel">
            <input 
              type="checkbox" 
              checked={lembrar}
              onChange={(e) => setLembrar(e.target.checked)}
            />
            Recordarme
          </label>
        </div>

        {errorMessage && <p className="error-mensagem">{errorMessage}</p>}

        <Boton 
          texto={isCadastro ? "Cadastrar" : "Login"} 
          tipo="submit" 
          colorFondo="#81FE88" 
          colorTexto="#171D1F" 
          className="botaoForm"
          icone={<FaArrowRight />}
        />
      </form>
    </div>
  );
}

export default Form;