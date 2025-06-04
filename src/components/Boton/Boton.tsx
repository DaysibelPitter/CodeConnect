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

const Boton = ({ texto, colorFondo = "", colorTexto="#81FE88" , icone}: BotonProps) => {
  return (
    <button className="boton" style={{ backgroundColor: colorFondo, color: colorTexto }}>
      {texto}
    {icone && <span className="icone">{icone}</span>} 
    </button>
  );
};

export default Boton;