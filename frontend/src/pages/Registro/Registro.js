import React, { useState, useRef } from "react";
import "./Registro.css";
import Webcam from "react-webcam";

const Registro = () => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [dpi, setDpi] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");
  const [imagenUsuario, setImagenUsuario] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef();

  const handleNombreChange = (e) => setNombreCompleto(e.target.value);
  const handleCorreoChange = (e) => setCorreoElectronico(e.target.value);
  const handleDpiChange = (e) => setDpi(e.target.value);
  const handleContrasenaChange = (e) => setContrasena(e.target.value);
  const handleRepetirContrasenaChange = (e) =>
    setRepetirContrasena(e.target.value);


const handleImagenChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
        const reader = new FileReader();
    
        reader.onloadend = () => {
        // Aquí se ejecuta después de que la lectura del archivo se completa
        const base64String = reader.result;
        setImagenUsuario(base64String);
        };
    
        // Lee el archivo como una URL de datos (base64)
        reader.readAsDataURL(file);
    }
    };

  function Base64Modificada(base64String) {
    const parts = base64String.split(",");
    if (parts.length === 2) {
      return parts[1];
    } else {
      return base64String; 
    }
  }

  const startCamera = () => {
    setShowCamera(true);
  };

  const takePhoto = () => {
    const photo = webcamRef.current.getScreenshot();
    console.log(photo);
    setImagenUsuario(photo);
    setShowCamera(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(imagenUsuario && nombreCompleto && correoElectronico && dpi && contrasena && repetirContrasena && (contrasena === repetirContrasena)){

        let data = {
            nombre: nombreCompleto,
            correo: correoElectronico,
            dpi,
            password: contrasena,
            imagen: Base64Modificada(imagenUsuario)
            
        }

        console.log("Datos registro:", data)
        fetch(`http://${process.env.REACT_APP_API_IP}:5000/registro`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((data) => {
                if (data) {
                    alert('Bienvenido!!');
                    window.location.href = '/login';
                } else {
                    alert('Error en el servidor, no se pudo registrar tu usuario');
                }
            })
            .catch((error) => {
                
                console.error('Error:', error);
                alert('Error en la solicitud');
            });
    }else{
        alert("Error! asegurate de llenar todos los datos o que las contraseñas coincidan.")

    }
    
  };

  

  return (
    
    <div className="form-container">
        <h1 className="registro-title">Registro</h1>
    <form className="form-login" onSubmit={handleSubmit}>
      <label class="label-login">
        Nombre Completo:
        <input
          class="input-login"
          type="text"
          value={nombreCompleto}
          onChange={handleNombreChange}
        />
      </label>

      <label class="label-login">
        Correo Electrónico:
        <input
          class="input-login"
          type="email"
          value={correoElectronico}
          onChange={handleCorreoChange}
        />
      </label>

      <label class="label-login">
        DPI:
        <input
          class="input-login"
          type="text"
          value={dpi}
          onChange={handleDpiChange}
        />
      </label>

      <label class="label-login">
        Contraseña:
        <input
          class="input-login"
          type="password"
          value={contrasena}
          onChange={handleContrasenaChange}
        />
      </label>

      <label class="label-login">
        Confirmar Contraseña:
        <input
          class="input-login"
          type="password"
          value={repetirContrasena}
          onChange={handleRepetirContrasenaChange}
        />
      </label>

      <div className="button-container">
  <label class="label-login">
    Foto del Usuario:
    <input
      class="input-login"
      type="file"
      accept="image/*"
      onChange={handleImagenChange}
      
    />
  </label>

  <button type="button" class="button-login" onClick={startCamera}>
    Activar Cámara
  </button>
</div>

{showCamera && (
  <div className="camera-container">
    <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      className="webcam"
    />
    <button type="button" class="button-login" onClick={takePhoto}>
      Tomar Foto
    </button>
  </div>
)}

<button type="submit" class="button-registrar">Registrarse</button>
    </form>
    </div>
  );
};

export default Registro;
