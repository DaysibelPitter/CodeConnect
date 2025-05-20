import { useState } from "react";
import Nav from "../../components/nav/Nav";
import FormPost from "../../components/FormPost/FormPost"; 
import "./publicar.css";
import { FaArrowUp, FaXmark } from "react-icons/fa6"; 

function Publicar() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFileName(file.name);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setFileName(null);
  };

  return (
    <div className="publicar-container">
      <Nav />

      <div className="publicar-content">
        <div className="publicar-content-left">
         
          <div className="container-img">
            {image ? <img src={image} alt="Imagen subida" /> : "Imagen aquí"}
          </div>
          <label htmlFor="file-upload" className="botaoPublicar">
            Cargar imagen <FaArrowUp />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          {image && (
            <div className="archivo-info">
              <span>{fileName}</span>
              <button className="botaoExcluir" onClick={handleRemoveImage}>
                <FaXmark />
              </button>
            </div>
          )}
        </div>
        <div className="publicar-content-right"> 
<FormPost />
        </div>
      </div>
    </div>
  );
}

export default Publicar;