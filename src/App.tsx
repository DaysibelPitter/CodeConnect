
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import Cadastro from './components/Cadastro/Cadastro'
// import Feed from './components/Feed/Feed'

function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro/>} />
        {/* <Route path="/feed" element={<Feed />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


