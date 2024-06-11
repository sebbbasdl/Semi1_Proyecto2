import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import CrearPublicacion from "./pages/CrearPublicacion/CrearPublicacion";
import FiltrarPublicacion from "./pages/FiltrarPublicacion/FiltrarPublicacion";
import Perfil from "./pages/Perfil/Perfil";
import Amigos from "./pages/Amigos/Amigos";
import ChatAmigos from "./pages/ChatAmigos/ChatAmigos";
import Registro from "./pages/Registro/Registro"
import VerPublicaciones from "./pages/VerPublicaciones/VerPublicaciones";
import ChatBot from "./pages/ChatBot/ChatBot";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/inicio" element={<VerPublicaciones />} />
          <Route path="/crear-publicacion" element={<CrearPublicacion />} />
          <Route path="/filtrar-publicaciones" element={<FiltrarPublicacion />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/friends" element={<Amigos />} />
          <Route path="/chat-friends" element={<ChatAmigos />} />
          <Route path="/chat-bot" element={<ChatBot />} />
        </Routes>
      </Router>
  );
}

export default App;