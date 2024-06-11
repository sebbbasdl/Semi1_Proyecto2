import React, { useEffect, useState } from "react";
import "../Publicacion/Publicacion.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import Comentario from "./Comentario";

const Publicacion = (props) => {
  let { id_publicacion, nombre, fecha, imagen, contenido, comentarios } = props;
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState({
    id_publicacion,
    nombre,
    comentario: "",
  });
  const [comentarios2, setComentarios] = useState([]);
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    setComentarios(comentarios);
    setDescripcion(contenido);
  }, [comentarios, contenido]);

  const toggleComentarios = () => {
    setMostrarComentarios(!mostrarComentarios);
  };

  const handleNuevoComentarioChange = (event) => {
    setNuevoComentario({ ...nuevoComentario, comentario: event.target.value });
  };

  const ip = `http://${process.env.REACT_APP_API_IP}:5000`;
  let data = {
    comentario: nuevoComentario.comentario,
    id_publicacion,
    nombre,
  };

  const enviarComentario = async () => {
    if (nuevoComentario.comentario.trim() !== "") {
      console.log(data);
      const token = localStorage.getItem("jwt");
      const response = await fetch(`${ip}/add-comentario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      console.log("response: ", response.ok);
      if (response.ok) {
        const nuevoComentario2 = {
          nombre,
          comentario: nuevoComentario.comentario,
        };
        setComentarios([...comentarios, nuevoComentario2]);
        setNuevoComentario({ nombre: "", comentario: "" });
      } else {
        console.log("error");
        alert("Error al enviar el comentario");
      }
    }
  };

  const handleChange = (event, contenido) => {
    const url = `${ip}/translate`;
    const token = localStorage.getItem("jwt");
    let data = { contenido: contenido, idioma: event.target.value };
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
        setDescripcion(res.traduccion);
      });
  };

  const traduccion = (descripcion) => {
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
          Traducir
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Idioma"
          defaultValue={1}
          onChange={(e) => handleChange(e, descripcion)}
          sx={{ color: "white" }}
        >
          <MenuItem value={1}>Español</MenuItem>
          <MenuItem value={2}>Inglés</MenuItem>
          <MenuItem value={3}>Portugués</MenuItem>
          <MenuItem value={4}>Francés</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <main>
      <div className="post-container">
        <div className="header">
          <img
            src={imagen}
            alt="Publicacion"
            className="post-image"
            style={{ maxWidth: "100%" }}
          />
          <div className="header-text">
            <div className="header-background">
              <p className="name">{nombre}</p>
              <p className="date">{fecha}</p>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="content-background">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <p className="description">{descripcion} </p>
              {traduccion(descripcion)}
            </Grid>
          </div>
        </div>
        <div className="comentarios-container">
          <button className="ver-comentarios-btn" onClick={toggleComentarios}>
            {mostrarComentarios ? "Ocultar Comentarios" : "Ver Comentarios"}
          </button>
          {mostrarComentarios && (
            <div className="comentarios-section">
              <ul className="comentarios-list">
                {comentarios2.map((comentario, index) => (
                  <Comentario
                    index={index}
                    comentario={comentario.comentario}
                    nombre={comentario.nombre}
                  />
                ))}
              </ul>
              <textarea
                placeholder="Escribe tu comentario..."
                value={nuevoComentario.comentario}
                onChange={handleNuevoComentarioChange}
                className="nuevo-comentario-input"
              />
              <button
                onClick={enviarComentario}
                className="enviar-comentario-btn"
              >
                Enviar Comentario
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Publicacion;
