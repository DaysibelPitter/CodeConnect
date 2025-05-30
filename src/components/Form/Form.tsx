import { FaArrowRight } from "react-icons/fa";
import "./form.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


interface FormData {
  nome: string;
  email: string;
  password: string;
  lembrar?: boolean;
}

interface FormProps {
  isCadastro?: boolean;
}

function Form({ isCadastro = false }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log("Datos enviados:", data);
  
    if (data.email && data.password) {
      navigate("/feed");
    }
  };  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      {isCadastro && (
        <>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="inputForm"
            placeholder="Nome completo"
            {...register("nome", { required: "O nome é obrigatório" })}
          />
          {errors.nome && <p className="error-mensagem">{errors.nome.message}</p>}
        </>
      )}

      <label htmlFor="email">Email ou usuário</label>
      <input
        type="email"
        id="email"
        className="inputForm"
        placeholder="Usuario123"
        {...register("email", { required: "O email é obrigatório" })}
      />
      {errors.email && <p className="error-mensagem">{errors.email.message}</p>}

      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        className="inputForm"
        placeholder="*****"
        {...register("password", { required: "A senha é obrigatória" })}
      />
      {errors.password && <p className="error-mensagem">{errors.password.message}</p>}

      <div className="lembrarSenha">
        <label htmlFor="lembrar" className="lembrarSenhaLabel">
          <input type="checkbox" id="lembrar" {...register("lembrar")} />
          Lembrar-me
        </label>
        {!isCadastro && <a href="#">Esqueci a senha</a>}
      </div>

      <button type="submit" className="botaoForm">
        {isCadastro ? "Cadastrar" : "Login"} <FaArrowRight />
      </button>
    </form>
  );
}

export default Form;