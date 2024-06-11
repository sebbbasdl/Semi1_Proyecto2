import React, { useEffect } from "react";
import Navegacion from "../../components/Navegacion/Navegacion";
import { useState } from "react";
import Publicacion from "../../components/Publicacion/Publicacion";
import imagen from "../../components/Publicacion/cr7.jpg";

const VerPublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const ip = `http://${process.env.REACT_APP_API_IP}:5000`

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
          setPublicaciones(res.publicaciones);
        });
    };
    fetchData();
  }, []);

  

  return (
    <main>
      <Navegacion />

      <div className="contenido album py-5">
        <div className="container">
          <h1>Bienvenido</h1>
        </div>
        {publicaciones.map((p, id_publicacion) => (
          <Publicacion
            id_publicacion={p.id_publicacion}
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

export default VerPublicaciones;
