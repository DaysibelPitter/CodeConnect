import { useState } from "react";

const opciones = ["React", "Frontend","JavaScript", "HTML", "CSS", "Node.js"];

function TagInput() {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  // Filtrar opciones según lo que el usuario escribe
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Mostrar opciones que coincidan con el texto ingresado
    const filtered = opciones.filter(option => option.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(filtered);
  };

  return (
    <div className="form-container">
      <label htmlFor="tag-input">Tag</label>
      <select className="inputForm">
  <option value="">Selecciona una opción</option>
  <option value="React">React</option>
  <option value="Frontend">Frontend</option>
</select>
      <input
        type="text"
        id="tag-input"
        className="inputForm"
        placeholder="React"
        value={inputValue}
        onChange={handleChange}
      />
      {filteredOptions.length > 0 && (
        <ul className="suggestions-list">
          {filteredOptions.map(option => (
            <li key={option} onClick={() => setInputValue(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagInput;