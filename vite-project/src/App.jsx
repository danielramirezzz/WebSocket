import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  const [socket, setSocket] = useState();
  const [inputMessage, setInputMessage] = useState("");
  const [mensajesRecibidos, setMensajeRecibido] = useState([]);
  const [user, setUser] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("message", (msg) => {
      setMensajeRecibido(msg);
    });

    const nombre = prompt("¿Cuál es tu nombre?");
    setUser(nombre || "Usuario");

    return () => newSocket.disconnect();
  }, []);

  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajesRecibidos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket && inputMessage.trim()) {
      socket.emit("message", { user, inputMessage });
      setInputMessage("");
    }
  };

  return (
    <div className="main-container">
      <div className="chat-window">
        {}
        <header className="chat-header">
          <div className="brand">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon-logo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h1>ChatWebsocket</h1>
          </div>

          <div className="user-profile">
            <div className="avatar-circle">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" />
              </svg>
            </div>
            <span className="user-name">{user}</span>
          </div>
        </header>

        {}
        <div className="messages-container">
          {mensajesRecibidos.map((m, index) => (
            <div key={index} className={`message-row ${m.user === user ? "mine" : "theirs"}`}>
              <div className="bubble">
                <span className="sender">{m.user}</span>
                <p>{m.text}</p>
                <span className="timestamp">{m.time}</span>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        {}
        <form className="input-bar" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputMessage}
            placeholder="Escribe un mensaje..."
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="submit" className="send-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;