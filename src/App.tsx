import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Feed from "./pages/Feed/Feed";
import AcercaDe from "./pages/AcercaDe/AcercaDe";
import Perfil from "./pages/Perfil/Perfil"
import Publicar from "./pages/Publicar/Publicar";
import DetailsProjects from "./pages/DetailsProjects/DetailsProjects";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

function App() {
  return (
    <>
    <Provider store={store}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/acercaDe" element={<AcercaDe />} />
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/publicar" element={<Publicar/>}/>
          <Route path="/detailsprojects/:id" element={<DetailsProjects/>}/>
          <Route path="/recientes" element={<Feed />} />
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
