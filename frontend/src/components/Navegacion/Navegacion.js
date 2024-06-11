import React, { useState, useEffect } from "react";
import "./Navegacion.css";
import { Link } from "react-router-dom";

const Navegacion = () => {
  const [activeLink, setActiveLink] = useState(localStorage.getItem("activeLink") || "inicio");

  useEffect(() => {
    // Almacenar el valor inicial en localStorage cuando el componente se monta
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    localStorage.setItem("activeLink", linkName);
  };

  return (
    <div className="nav-static">
      <div class="d-flex flex-nowrap mainnav">
        <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
          <Link
            to={`/inicio`}
            className={`d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none nav-link ${
              activeLink === "inicio" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("inicio")}
          >
            <img
              class="mb-4 logoinit"
              src="https://cdn-icons-png.flaticon.com/512/4336/4336400.png"
              alt=""
              width="100"
              height="100"
            />
          </Link>
          <hr />
          <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
              <Link
                to={`/inicio`}
                className={`nav-link ${
                  activeLink === "inicio" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("inicio")}
              >
                <img
                  class="bi pe-none me-2"
                  src="https://icon-library.com/images/white-home-icon-png/white-home-icon-png-21.jpg"
                  alt=""
                  width="25"
                  height="25"
                />
                Publicaciones
              </Link>
            </li>
            <li>
              <Link
                to="/filtrar-publicaciones"
                className={`nav-link ${
                  activeLink === "filtrar-publicaciones" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("filtrar-publicaciones")}
              >
                <img
                  class="bi pe-none me-2"
                  src="https://www.liberty.edu/staging/library/wp-content/uploads/sites/193/2021/03/magnifying-glass-icon-white.png"
                  alt=""
                  width="25"
                  height="25"
                />
                Buscar Post
              </Link>
            </li>
            <li>
              <Link
                to="/crear-publicacion"
                className={`nav-link ${
                  activeLink === "crear-publicacion" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("crear-publicacion")}
              >
                <img
                  class="bi pe-none me-2"
                  src="https://icon-library.com/images/search-icon-png-white/search-icon-png-white-15.jpg"
                  alt=""
                  width="25"
                  height="25"
                />
                Crear Post
              </Link>
            </li>
            <li>
              <Link
                to="/perfil"
                className={`nav-link ${
                  activeLink === "perfil" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("perfil")}
              >
                <img
                  class="bi pe-none me-2"
                  src="https://www.logista.com/etc.clientlibs/logista-corporate/clientlibs-v2/clientlib-base/resources/icons/user_white.png"
                  alt=""
                  width="25"
                  height="25"
                />
                Perfil
              </Link>
            </li>
            <li>
              <Link
                to="/friends"
                className={`nav-link ${
                  activeLink === "friends" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("friends")}
              >
                <img
                  class="bi pe-none me-2"
                  src="https://www.ppfinestrat.com/wp-content/uploads/2022/06/add-user-3-512.png"
                  alt=""
                  width="25"
                  height="25"
                />
                Amigos
              </Link>
            </li>
            <li>
              <Link
                to="/chat-friends"
                className={`nav-link ${
                  activeLink === "chat-friends" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("chat-friends")}
              >
                <img
                  class="bi pe-none me-2"
                  src="https://icon-library.com/images/white-chat-icon/white-chat-icon-8.jpg"
                  alt=""
                  width="25"
                  height="25"
                />
                Chat
              </Link>
            </li>
            <li>
              <Link
                to="/chat-bot"
                className={`nav-link ${
                  activeLink === "chat-bot" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("chat-bot")}
              >
                <img
                  class="bi pe-none me-2"
                  src="https://chatimize.com/wp-content/uploads/2019/12/chatbot-basics-icon.png"
                  alt=""
                  width="25"
                  height="28"
                />
                ChatBot
              </Link>
            </li>       
            <li>
              <Link
                to="/login"
                className={`nav-link ${activeLink === "radio" ? "active" : ""}`}
              >
                <img
                  class="bi pe-none me-2"
                  src="https://icon-library.com/images/logout-icon-png/logout-icon-png-13.jpg"
                  alt=""
                  width="25"
                  height="25"
                />
                Cerrar sesión
              </Link>
            </li>
          </ul>
          <hr />
        </div>
        <div class="b-example-divider b-example-vr"></div>
      </div>
    </div>
  );
};

export default Navegacion;