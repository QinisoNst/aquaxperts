import React, { useState } from "react";
import "./Chatbot.css";

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      // Simple echo response for now
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `You said: ${input}`, sender: "bot" },
        ]);
      }, 500);
      setInput("");
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <h2>AquaXperts Assistant</h2>
        <button onClick={onClose}>&times;</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
