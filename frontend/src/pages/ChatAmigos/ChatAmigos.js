import React, { useEffect, useState, useRef, useCallback } from "react";
import Navegacion from "../../components/Navegacion/Navegacion";
import "./ChatAmigos.css";
import Chat from "../../components/Chat/Chat";

const URL = "wss://vk7tl0t2b0.execute-api.us-east-1.amazonaws.com/production";

const ChatAmigos = () => {
  const [amigos, setAmigos] = useState([]);
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chat, setChat] = useState([]);
  const socket = useRef(null);

  const ip = `http://${process.env.REACT_APP_API_IP}:5000`;

  const onSocketOpen = useCallback(() => {
    const name = user1.nombre;
    socket.current?.send(JSON.stringify({ action: "setName", name }));
  }, [user1]);

  const onSocketMessage = useCallback(
    (dataSTR) => {
      const data = JSON.parse(dataSTR);
      console.log("respuesta del socket: ", data);
      if (data.privateMessage) {
        setChat((oldArray) => [
          ...oldArray,
          { user2: user2.id, text: data.privateMessage },
        ]);
      } else if (data.systemMessage) {
        const user = data.systemMessage.split(" ");
        let userId = {};
        if (user1.nombre === user[0]) {
          userId = user1.id;
        } else {
          userId = user2.id;
        }
        setChat((oldArray) => [...oldArray, { userId: userId, text: data.systemMessage }]);
      }
    },
    [user1, user2]
  );

  const onSendPrivateMessage = useCallback(
    (message) => {
      const to = user2.nombre;
      socket.current?.send(
        JSON.stringify({ action: "sendPrivate", message, to })
      );
    },
    [user2]
  );

  const onConnect = useCallback(() => {
    if (socket.current?.readyState === socket.OPEN) {
      socket.current = new WebSocket(URL);
      socket.current.addEventListener("open", onSocketOpen);
      socket.current.addEventListener("message", (event) => {
        onSocketMessage(event.data);
      });
      console.log("Conectado");
    }
  }, [onSocketOpen, onSocketMessage]);

  useEffect(() => {
    const url = `${ip}/agg-sl-friends`;
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
          setAmigos(res.mis_friends);
          setUser1({ id: res.user1.id, nombre: res.user1.nombre });
        });
    };
    fetchData();

    return () => {
      socket.current?.close();
    };
  }, []);

  const chatear = (id_usuario2, nombre2) => {
    setUser2({ id: id_usuario2, nombre: nombre2 });
    setShowChat(true);
  };

  return (
    <main>
      <Navegacion />
      <div className="contenido album contenido-amigos">
        <div className="cards-container">
          <div className="cards-inner-container">
            {/* <div class="card">
              <img
                src="https://viapais.com.ar/resizer/MddKMHve-vqiG0CWdOn1NSSULUs=/980x640/smart/filters:quality(75):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/F46KZJQDZNHMDIHW67ZTJBL32Y.jpg"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">Duki</h5>
                <button type="button" class="btn btn-info">
                  Enviar mensaje
                </button>
              </div>
            </div> */}
            {amigos.map((a) => (
              <div class="card">
                <img src={a.imagen} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{a.nombre}</h5>
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={() => {
                      chatear(a.id, a.nombre);
                      onConnect();
                    }}
                  >
                    Enviar mensaje
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showChat && (
          <Chat
            chat={chat}
            user1={user1}
            user2={user2}
            onSendPrivateMessage={onSendPrivateMessage}
            setChat={setChat}
          />
        )}
      </div>
    </main>
  );
};

export default ChatAmigos;
