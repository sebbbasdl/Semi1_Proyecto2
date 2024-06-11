import React, { useEffect, useState } from "react";
import "./Chat.css";

const Chat = (props) => {
  const { chat, user1, user2, onSendPrivateMessage, setChat } = props;
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
  }, []); // Dependencias actualizadas

  const sendMessage = () => {
    onSendPrivateMessage(newMessage)
    setChat(oldArray => [...oldArray, {userId: user1.id, text:newMessage}])
    // Limpiar el área de texto
    setNewMessage("");
  };

  return (
    <main>
      <h5>{user2.nombre}</h5>
      <div className="chat-container">
        {chat.map((message, index) => (
          <div
            key={index}
            className={`message ${
              Number(message.userId) === Number(user1.id) ? "right" : "left"
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
    </main>
  );
};

export default Chat;
