import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { agregarTagSeleccionada, eliminarTagSeleccionada } from "../../Redux/sliceProjects";
import Tags from "../Feed/Tags/Tags";
import { filtrarOpciones } from "../../utils/utils"; 

function TagInput() {
  const dispatch = useDispatch();
  const selectedTags = useSelector((state: RootState) => state.proyectos.tagsSeleccionadas);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredOptions(filtrarOpciones(value, selectedTags));
  };

  const handleSelectTag = (option: string) => {
    dispatch(agregarTagSeleccionada(option));
    setInputValue("");
    setFilteredOptions([]);
  };

  return (
    <div className="form-container">
      <label htmlFor="tag-input">Tag</label>
      <input
        type="text"
        id="tag-input"
        className="inputForm"
        value={inputValue}
        onChange={handleChange}
      />
      {filteredOptions.length > 0 && (
        <ul className="suggestions-list">
          {filteredOptions.map(option => (
            <li key={option} onClick={() => handleSelectTag(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
      <Tags tags={selectedTags} onRemove={(tag:string) => dispatch(eliminarTagSeleccionada(tag))} />
    </div>
  );
}

export default TagInput;