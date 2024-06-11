import React, { useState } from "react";
import Navegacion from "../../components/Navegacion/Navegacion";
import "./ChatBot.css";

const ChatBot = () => {
  const [chat, setChat] = useState([
    
    {  bot_o_user: "bot", text: "¡Hola! ¿En qué puedo ayudarte?"},
  ]);
  const [newMessage, setNewMessage] = useState("");
  const ip = `http://${process.env.REACT_APP_API_IP}:5000`;
  const token = localStorage.getItem("jwt");
  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
    /*const response = [
        {  bot_o_user: "user", text: "¡Hola! ¿En qué puedo ayudarte?" },
        {  bot_o_user: "bot", text: "Hola, estoy buscando información sobre productos.",},
      ];*/
   /* const responseData = response;
      const newChatMessages = responseData.chatBot.map((message) => ({
        id: chat.length + newChatMessages.indexOf(message),
        bot_o_user: message.bot_o_user,
        text: message.mensaje,
      }));*/

      /*const newChat = [...chat, ...response];
      setChat(newChat);
      setNewMessage("");*/
    console.log("-----MENSAJE PARA EL BOT-----")
    console.log({ text: newMessage })

    try {
      const response = await fetch(`${ip}/chat-bot`, {
        method: "POST",
        headers: {
           Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensaje: newMessage }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      const responseData = await response.json();

      const newChat = [...chat, ...responseData];
      setChat(newChat);
      setNewMessage("");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <main>
      <Navegacion />
      <div className="contenido album contenido-amigos">
        <div>
          <h1>ChatBot</h1>
          <div className="chat-container-bot">
            {chat.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.bot_o_user === "user" ? "left" : "right"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <textarea
              className="textarea-chat"
              placeholder="Escribe tu mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="button-enviar" onClick={sendMessage}>
              <h5>{">"}</h5>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatBot;
