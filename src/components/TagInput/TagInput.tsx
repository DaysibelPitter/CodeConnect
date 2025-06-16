import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { agregarTagSeleccionada, eliminarTagSeleccionada } from "../../Redux/sliceProjects";
import Tags from "../Feed/Tags/Tags";
import { filtrarOpciones } from "../../utils/utils";
import "./TagInput.css";
import OptionsList from "../OptionsList/OptionsList";
interface TagInputProps {
  setTecnologias?: React.Dispatch<React.SetStateAction<string[]>>; 
  resetForm?:boolean;
}

function TagInput({ setTecnologias }: TagInputProps) {
  const dispatch = useDispatch();
  const selectedTags = useSelector((state: RootState) => state.proyectos.tagsSeleccionadas);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  
  useEffect(() => {
    if (setTecnologias) {
      setTecnologias(selectedTags);
    }
  }, [selectedTags, setTecnologias]); 

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
      <div className="tag-input-container">
      <label htmlFor="tag-input">Tag</label>
      <input
        type="text"
        id="tag-input"
        className="inputForm"
        value={inputValue}
        onChange={handleChange}
      />
      <OptionsList opciones={filteredOptions} onSelect={handleSelectTag}/>
      </div>

      
      <Tags tags={selectedTags} onRemove={(tag: string) => dispatch(eliminarTagSeleccionada(tag))} />
    </div>
  );
}

export default TagInput;