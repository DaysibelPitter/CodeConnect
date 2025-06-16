import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Boton from "../../components/Boton/Boton";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { setUsuarioActual } from "../../Redux/sliceUsers";
import { Usuario } from "../../Redux/sliceUsers";

interface FormProps {
  isCadastro?: boolean;
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

    if (isCadastro && !nome.trim()) {
      setErrorMessage("El nombre es obligatorio.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Ingresa un email o usuario válido.");
      return;
    }

    if (!password || password.length < 5 || !/\d/.test(password) || !/[A-Za-z]/.test(password)) {
      setErrorMessage("La contraseña debe tener al menos 5 caracteres y contener letras y números.");
      return;
    }

    if (isCadastro) {
      await registrarUsuario();
      navigate("/");
    } else {
     const loginResponse = await validarLogin();

if (loginResponse.resultado) {
  dispatch(setUsuarioActual(loginResponse.resultado));
  navigate("/feed");
} else {
  const mensaje =
    loginResponse.error === "contraseña_incorrecta"
      ? " La contraseña es incorrecta."
      : " Usuario no encontrado.";
  setErrorMessage(mensaje);
}
    }
  };

  const registrarUsuario = async () => {
    await addDoc(collection(db, "usuarios"), {
      usuario: email.split("@")[0].toLowerCase(),
      nombre: nome,
      email: email.toLowerCase(),
      contraseña: password,
      fecha_registro: new Date().toISOString(),
      proyectosCreados: [],
      conexiones: [],
    });
  };

const validarLogin = async () => {
  const inputNormalizado = email.trim().toLowerCase();

  const qEmail = query(collection(db, "usuarios"), where("email", "==", inputNormalizado));
  const querySnapshotEmail = await getDocs(qEmail);

  const docEncontrado = !querySnapshotEmail.empty
    ? querySnapshotEmail.docs[0]
    : (await getDocs(query(collection(db, "usuarios"), where("usuario", "==", inputNormalizado)))).docs[0];

  if (!docEncontrado) return { resultado: null, error: "usuario no encontrado" };

  const usuario = { ...docEncontrado.data(), id: docEncontrado.id } as Usuario;

  if (usuario.contraseña.trim() !== password.trim()) {
    return { resultado: null, error: "contraseña_incorrecta" };
  }

  return { resultado: usuario, error: null };
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
              placeholder="Nombre completo"
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
          colorFondo="var(--verde-claro)"
          colorTexto="#171D1F"
          className="botaoForm"
          icone={<FaArrowRight />}
        />
      </form>
    </div>
  );
}

export default Form;