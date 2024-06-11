import React, { useState, useEffect } from "react";
import "./Perfil.css";
import Navegacion from "../../components/Navegacion/Navegacion";

function Perfil() {
  const [showError, setShowError] = useState(false);
  // informacion del usuario
  const [nombre, setNombre] = useState("");
  const [dpi, setDpi] = useState("");
  const [email, setEmail] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");
  // informacion para editar usuario
  const [nombreNuevo, setNombreNuevo] = useState("");
  const [dpiNuevo, setDpiNuevo] = useState("");
  const [emailNuevo, setEmailNuevo] = useState("");
  const [fotoPerfilNuevo, setFotoPerfilNuevo] = useState("");
  const [password, setpassword] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const ip = `http://${process.env.REACT_APP_API_IP}:5000`;

  useEffect(() => {
    const url = `${ip}/perfil`;
    const token = localStorage.getItem("jwt");
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res: ", res);
        setNombre(res.result.nombre);
        setDpi(res.result.dpi);
        setEmail(res.result.email);
        setFotoPerfil(res.result.imagen);
        
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64Image = event.target.result;
        resolve(base64Image);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  const handleModificarDatosClick = () => {
    setModoEdicion(true);
  };

  const cancelarEdicion = () => {
    setModoEdicion(false);
    setShowError(false);
  };

  const editarPerfil = async () => {
    const url = `${ip}/editar-perfil`;
    let base64Image = "";
    const token = localStorage.getItem("jwt");
    if (fotoPerfilNuevo !== "") {
      base64Image = fotoPerfilNuevo.split(",")[1];
    }
    let data = {
      id_usuario: localStorage.getItem("id_usuario"),
      imagen: base64Image,
      nombre: nombreNuevo,
      dpi: dpiNuevo,
      email: emailNuevo,
      password: password,
    };
    console.log("data: ", data);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((res) => {
        console.log("res: ", res);
        if (res.passwordCorrecta) {
          setModoEdicion(false);
          setShowError(false);
          window.location.reload();
        } else {
          setShowError(true);
        }
      });
  };

  const mostrarError = (event) => {
    return (
      <div className="alert alert-dismissible alert-danger">
        <strong>Oh no! hubo un problema: </strong> Para modificar tus datos,
        debes de ingresar tu contraseña y que sea correcta.
      </div>
    );
  };

  const imagenMomentanea = async (event) => {
    const imagen = event.target.files[0];
    const base64Image = await convertToBase64(imagen);
    setFotoPerfilNuevo(base64Image);
  };

  return (
    <main>
      <div className="contenido album py-5 ">
        <Navegacion />
        <div className="contenedor ">
          {showError && mostrarError()}
          <h1>Perfil de Usuario</h1>
          {modoEdicion ? (
            <div className="form-contenedor">
              <div className="profile-picture-contenedor">
                <img
                  className="profile-picture bigger"
                  src={fotoPerfilNuevo !== "" ? fotoPerfilNuevo : fotoPerfil}
                  alt="Foto de Perfil"
                />
                <label htmlFor="fileInput" className="custom-file-upload">
                  <span className="add-button-perfil">+</span>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(event) => imagenMomentanea(event)}
                  />
                </label>
              </div>
              <div className="form-fields">
                <div class="form-group">
                  <label class="col-form-label mt-4" for="inputDefault">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder={nombre}
                    id="inputDefault"
                    onChange={(e) => setNombreNuevo(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label class="col-form-label" for="inputDefault">
                    DPI
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder={dpi}
                    id="inputDefault"
                    onChange={(e) => setDpiNuevo(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label class="col-form-label" for="inputDefault">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder={email}
                    id="inputDefault"
                    onChange={(e) => setEmailNuevo(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label class="col-form-label" for="inputDefault">
                    Ingresa tu contraseña para guardar
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputDefault"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <button className="button" onClick={editarPerfil}>
                  Guardar Datos
                </button>
                <button className="button" onClick={cancelarEdicion}>
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="profile-photo">
                <img
                  className="profile-picture bigger"
                  src={fotoPerfil}
                  alt="Foto de Perfil"
                />
              </div>
              <div className="user-info">
                <div className="user-info-row">
                  <label>Nombre:</label>
                  <span>{nombre}</span>
                </div>
                <div className="user-info-row">
                  <label>DPI:</label>
                  <span>{dpi}</span>
                </div>
                <div className="user-info-row">
                  <label>Email:</label>
                  <span>{email}</span>
                </div>
              </div>
              <button className="button" onClick={handleModificarDatosClick}>
                Modificar Datos
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Perfil;
