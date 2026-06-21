import "./App.css";
import { useState, useEffect, useRef } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    setMessages((prev) => [...prev,{
      text:message,
      sender:"user"
    }
      ]);

    try {
      const response = await fetch("https://express-hmda.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message:message,
        }),
      });
      setMessage("");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          text:data.response,
          sender: "bot"
        }
      ])
      console.log(data);

    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="main-container">
      
      <div className="header">
        <h2>Meddi Buddy</h2>
        <a href="#">Diagnostic Mode</a>
      </div>

      <div className="chat-body">
        <div className="chat-area">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === "user" ? "user" : "bot"}>
                  {msg.text}
              </div>
            ))}
            <div ref={chatEndRef}></div>
        </div>
        <div className="type-area">
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
