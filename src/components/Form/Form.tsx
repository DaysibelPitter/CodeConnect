import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Boton from "../../components/Boton/Boton";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { setUsuarioActual } from "../../Redux/sliceUsers";
import { Usuario } from "../../Redux/sliceUsers";
import { useState } from "react";

interface FormProps {
  isCadastro?: boolean;
}

interface Formulario {
  nome: string;
  email: string;
  password: string;
  lembrar: boolean;
}

function Form({ isCadastro = false }: FormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Formulario>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");

  const onSubmit = async (data: Formulario) => {
    setFirebaseError("");

    if (isCadastro) {
      if (!data.nome.trim()) {
        setError("nome", { message: "El nombre es obligatorio." });
        return;
      }
      await registrarUsuario(data);
      navigate("/");
    } else {
      const response = await validarLogin(data.email, data.password);
      if (response.resultado) {
        dispatch(setUsuarioActual(response.resultado));
        navigate("/feed");
      } else {
        const mensaje =
          response.error === "contraseña_incorrecta"
            ? "La contraseña es incorrecta."
            : "Usuario no encontrado.";
        setFirebaseError(mensaje);
      }
    }
  };

  const registrarUsuario = async (data: Formulario) => {
    await addDoc(collection(db, "usuarios"), {
      usuario: data.email.split("@")[0].toLowerCase(),
      nombre: data.nome,
      email: data.email.toLowerCase(),
      contraseña: data.password,
      fecha_registro: new Date().toISOString(),
      proyectosCreados: [],
      conexiones: [],
    });
  };

  const validarLogin = async (email: string, password: string) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {isCadastro && (
          <div className="inputContainer">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Nombre completo"
              className="inputForm"
              {...register("nome", { required: "Este campo es obligatorio." })}
            />
            {errors.nome && <p className="error-mensagem">{errors.nome.message}</p>}
          </div>
        )}

        <div className="inputContainer">
          <label>Email o usuário</label>
          <input
            type="text"
            placeholder="Usuario123"
            className="inputForm"
            {...register("email", { required: "Este campo es obligatorio." })}
          />
          {errors.email && <p className="error-mensagem">{errors.email.message}</p>}
        </div>

        <div className="inputContainer">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="*****"
            className="inputForm"
            {...register("password", {
              required: "La contraseña es obligatoria.",
              minLength: {
                value: 5,
                message: "Debe tener al menos 5 caracteres.",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                message: "Debe contener letras y números.",
              },
            })}
          />
          {errors.password && <p className="error-mensagem">{errors.password.message}</p>}
        </div>

        <div className="lembrarSenha">
          <label className="lembrarSenhaLabel">
            <input type="checkbox" {...register("lembrar")} />
            Recordarme
          </label>
        </div>

        {firebaseError && <p className="error-mensagem">{firebaseError}</p>}

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