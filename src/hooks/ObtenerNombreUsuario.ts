import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

export const useObtenerNombreUsuario = (autorId: string) => {
  const usuario = useSelector((state: RootState) =>
    state.usuarios.usuarios.find((u) => u.id === autorId)
  );
  return usuario?.usuario || "Usuario desconocido";
};
