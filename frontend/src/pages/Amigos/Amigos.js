import React, { useState, useEffect } from "react";
import Navegacion from "../../components/Navegacion/Navegacion";
import "./Amigos.css";

const Amigos = () => {
  const [agregarFriendsData, setAgregarFriendsData] = useState([
   /* {
      id_friend: 10,
      nombre: "Jorge",
      imagen: "https://www.toyota.com.gt/hubfs/Destacada%20(21).jpg",
    },
    {
      id_friend: 5,
      nombre: "Larry",
      imagen: "https://www.toyota.com.gt/hubfs/Destacada%20(21).jpg",
    },*/
  ]);
  const [solicitudFriendsData, setSolicitudFriendsData] = useState([]);

  const [MisFriendsData, setMisFriendsData] = useState([]);
  const ip = `http://${process.env.REACT_APP_API_IP}:5000`;
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ip}/agg-sl-friends`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log("response: ", data);
        setAgregarFriendsData(data.not_amigos);
        setSolicitudFriendsData(data.solicitud_friends);
        setMisFriendsData(data.mis_friends);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleAddFriend = async (friendId, friendNombre) => {
    console.log("----------AGREGAR-------");
    console.log(friendId);
    try {
      const response = await fetch(`${ip}/add-friend`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_friend: friendId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.ok) {
        alert(`Haz enviado una solicitud de amistad a: ${friendNombre}`);
        window.location.reload();
      } else {
        alert("Error en el servidor, no se pudo agregar amigo");
      }
    } catch (error) {
      console.error("Error adding friend:", error.message);
    }
  };

  const handleSolicitudFriend = async (friendId, friendNombre) => {
    console.log("----------SOLICITUD-------");
    console.log(friendId);
    try {
      const response = await fetch(`${ip}/accept-solicitud`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_friend: friendId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.ok) {
        alert(`Ahora eres amigo de: ${friendNombre}}`);
        window.location.reload();
      } else {
        alert("Error en el servidor, no se pudo agregar amigo");
      }
    } catch (error) {
      console.error("Error adding friend:", error.message);
    }
  };

  return (
    <main className="amigos-main">
      <Navegacion />
      <h1>Amigos</h1>
      <div className="amigos-container">
        {/* Tabla 1 - Agregar Amigos */}
        <div className="amigos-table-container">
          <table className="amigos-table" border="1">
            <thead>
              <tr>
                <th>Agregar Amigos</th>
              </tr>
            </thead>
            <tbody>
              {agregarFriendsData.map((friend) => (
                <tr key={friend.id_friend}>
                  <td>
                    <img
                      src={friend.imagen}
                      alt={friend.nombree}
                      className="avatar"
                    />{" "}
                    {friend.nombre}{" "}
                    <button
                      onClick={() =>
                        handleAddFriend(friend.id_friend, friend.nombre)
                      }
                    >
                      Enviar solicitud
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabla 2 - Solicitudes de amistad */}
        <div className="amigos-table-container">
          <table className="amigos-table" border="1">
            <thead>
              <tr>
                <th>Solicitudes de amistad</th>
              </tr>
            </thead>
            <tbody>
              {solicitudFriendsData.map((friend) => (
                <tr key={friend.id_friend}>
                  <td>
                    <img
                      src={friend.imagen}
                      alt=".."
                      className="avatar"
                    />{" "}
                    {friend.nombre}{" "}
                    <button
                      onClick={() =>
                        handleSolicitudFriend(friend.id_friend, friend.nombre)
                      }
                    >
                      Aceptar Solicitud
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Tabla 2 - Solicitudes de amistad */}
        <div className="amigos-table-container">
          <table className="amigos-table" border="1">
            <thead>
              <tr>
                <th>Mis Amigos</th>
              </tr>
            </thead>
            <tbody>
              {MisFriendsData.map((friend) => (
                <tr key={friend.id_friend}>
                  <td>
                    <img
                      src={friend.imagen}
                      alt=".."
                      className="avatar"
                    />{" "}
                    {friend.nombre}{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Amigos;
