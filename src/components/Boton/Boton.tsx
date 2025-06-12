import "./boton.css";

interface BotonProps {
  texto: string;
  colorFondo?: string; 
  colorTexto?: string;
  tipo?: "submit" | "button" | "reset";
  className?: string;
  icone?: React.ReactNode;
  onClick?: () => void;
}

const Boton = ({ texto,tipo="button", onClick, colorFondo = "", colorTexto="var(--verde-claro)" , icone}: BotonProps) => {
  return (
    <button className="boton" type={tipo} style={{ backgroundColor: colorFondo, color: colorTexto }} onClick={onClick}>
      {texto}
    {icone && <span className="icone">{icone}</span>} 
    </button>
  );
};

export default Boton;