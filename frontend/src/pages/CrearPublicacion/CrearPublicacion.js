import React, { useState } from "react";
import Navegacion from "../../components/Navegacion/Navegacion";
import "./CrearPublicacion.css";
import { useNavigate } from "react-router-dom";

// ui material
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

const CrearPublicacion = () => {
  const navigate = useNavigate();
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [showError, setShowError] = useState(false);
  const ip = `http://${process.env.REACT_APP_API_IP}:5000`;

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

  const mostrarError = (event) => {
    return (
      <div className="alert alert-dismissible alert-danger">
        <strong>Oh no!</strong> Parece ser que no se ha podido crear la
        publicación. Intente luego.
      </div>
    );
  };

  const crearPublicacion = async () => {
    let base64Image = await convertToBase64(imagen);
    base64Image = base64Image.split(",")[1];
    const url = `${ip}/crear-publicacion`;
    const token = localStorage.getItem("jwt");
    console.log("token: ", token);  
    let data = {
      imagen: base64Image,
      descripcion: descripcion,
    };
    console.log("data: ", data);
    const fetchData = async () => {
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
          if (res.ok) {
            alert("Publicación creada exitosamente");
          } else {
            alert("No se ha podido crear la publicación");
          }
        });
    };
    fetchData();
  };

  return (
    <main>
      <Navegacion />
      <div className="contenido album py-5">
        {showError && mostrarError()}
        <div class="container">
          <h1>Crear Publicación</h1>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid xs={4}>
                <div class="form-group">
                  <label for="formFile" class="form-label mt-4">
                    Imagen
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    required={true}
                    onChange={(event) => setImagen(event.target.files[0])}
                  />
                </div>
              </Grid>
              <Grid xs={8}>
                <div class="form-group">
                  <label for="exampleTextarea" class="form-label mt-4">
                    Descripción
                  </label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="exampleTextarea"
                    rows="10"
                    onChange={(event) => setDescripcion(event.target.value)}
                  ></textarea>
                </div>
              </Grid>
              <Grid>
                <br />
                <br />
                <br />
                <br />
                <br />
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={crearPublicacion}
                >
                  ¡Compartir Publicación!
                </button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </main>
  );
};

export default CrearPublicacion;
