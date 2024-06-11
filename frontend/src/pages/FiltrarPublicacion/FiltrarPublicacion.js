import React, { useEffect } from "react";
import Navegacion from "../../components/Navegacion/Navegacion";
import "./FiltrarPublicacion.css";
import { useState } from "react";
import { Box, Grid } from "@mui/material";
import Publicacion from "../../components/Publicacion/Publicacion";

const FiltrarPublicacion = () => {
  const [etiquetas, setEtiquetas] = useState(["Todos"]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [selecEtiqueta, setSelectEtiqueta] = useState("Todos");
  const [buscarEtiqueta, setBuscarEtiqueta] = useState("");
  const ip = `http://${process.env.REACT_APP_API_IP}:5000`;

  useEffect(() => {
    const url = `${ip}/get-publicaciones`;
    const token = localStorage.getItem("jwt");

    const fetchData = async () => {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((res) => {
          console.log("res: ", res);
          setEtiquetas(res.etiquetas);
          setPublicaciones(res.publicaciones);
        });
    };
    fetchData();
  }, []);

  const filtrarPublicaciones = () => {
    const url = `${ip}/filtrar-publicaciones`;
    const token = localStorage.getItem("jwt");
    let data = {
      etiqueta: buscarEtiqueta === '' ? selecEtiqueta : buscarEtiqueta,
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
          console.log("res filtrar: ", res);
          setEtiquetas(res.etiquetas);
          setPublicaciones(res.publicaciones);
        });
    };
    fetchData();
  };

  return (
    <main>
      <Navegacion />

      <div class="contenido album py-5 ">
        <div class="container">
          <h1>Filtrar Publicaciones</h1>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <Grid xs={2}>
                <div class="form-group">
                  <label for="exampleSelect1" class="form-label selec-filtro">
                    Etiquetas
                  </label>
                  <select
                    class="form-select"
                    id="exampleSelect1"
                    onChange={(event) => setSelectEtiqueta(event.target.value)}
                  >
                    {etiquetas.map((e) => (
                      <option value={e}>{e}</option>
                    ))}
                  </select>
                </div>
              </Grid>
              <Grid xs={3}>
                <div class="form-group">
                  <label class="col-form-label mt-4" for="inputDefault">
                    Buscar etiqueta
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Todos..."
                    id="inputDefault"
                    onChange={(event) => setBuscarEtiqueta(event.target.value)}
                  />
                </div>
              </Grid>
              <Grid xs={4}>
                <div class="form-group">
                  <button
                    type="button"
                    class="btn btn-success boton-filtro"
                    onClick={filtrarPublicaciones}
                  >
                    Filtrar
                  </button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
        {publicaciones.map((p) => (
          <Publicacion
            id_publicacion={p.id}
            nombre={p.nombre}
            fecha={p.fecha}
            imagen={p.imagen}
            contenido={p.descripcion}
            comentarios={p.comentarios}
          />
        ))}
      </div>
    </main>
  );
};

export default FiltrarPublicacion;
