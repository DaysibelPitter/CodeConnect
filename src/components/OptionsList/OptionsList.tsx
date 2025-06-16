import "./optionsList.css";
interface OptionsListProps {
  opciones: string[];
  onSelect: (opcion: string) => void;
  className?: string;
}

const OptionsList: React.FC<OptionsListProps> = ({ opciones, onSelect }) => {
  return (
    <div className="options-list">
      {opciones.length > 0 && (
        <ul className="opciones-tags">
          {opciones.map((opcion) => (
            <li key={opcion} onClick={() => onSelect(opcion)}>
              {opcion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OptionsList;