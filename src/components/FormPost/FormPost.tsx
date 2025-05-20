import TagInput from "../TagInput/TagInput";
import "./formPost.css";


function FormPost() {
  return (
    <div className="form-container">
     <h1>Nuevo Proyecto</h1>
     
     <form action="" method="post" className="form">
        <label htmlFor="">Nombre del proyecto</label>
        <input type="text" placeholder="React desde cero" className="inputForm"/>
        <label htmlFor="">Descripción</label>
        <textarea name="" id="" cols={30} rows={10} 
          className="inputForm"></textarea>
        <TagInput/>
     </form>
      </div>
    
  );
}

export default FormPost;
