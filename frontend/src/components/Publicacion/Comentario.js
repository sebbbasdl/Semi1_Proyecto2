import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import "../Publicacion/Publicacion.css";
import { useEffect, useState } from "react";

const Comentario = (props) => {
  const { index, comentario, nombre } = props;
  const [comentarioAux, setComentarioAux] = useState("");
  const ip = `http://${process.env.REACT_APP_API_IP}:5000`;

  useEffect(() => {
    setComentarioAux(comentario);
  }, [comentario]);

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
        setComentarioAux(res.traduccion);
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
    <li key={index}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <div>
          <strong>{nombre}:</strong> {comentarioAux}
        </div>
        {traduccion(comentarioAux)}
      </Grid>
    </li>
  );
};

export default Comentario;
