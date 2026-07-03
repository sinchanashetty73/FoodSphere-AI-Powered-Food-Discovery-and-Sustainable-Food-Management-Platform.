import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
const [messages, setMessages] = useState([
{
text: `👋 Welcome to FoodSpire AI Assistant

🍕 Food Recommendations
🥗 Nutrition Analysis
📖 Recipe Generation
⚠️ Allergy Detection
📍 Restaurant Suggestions

Ask me anything about food!`,
sender: "bot",
},
]);

const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);

const handleSend = async () => {
if (!input.trim()) return;


const userMessage = {
  text: input,
  sender: "user",
};

setMessages((prev) => [...prev, userMessage]);

const currentInput = input;
setInput("");
setLoading(true);

try {
  const response = await axios.post(
    "http://localhost:5194/api/Chatbot/ask",
    {
      message: currentInput,
    }
  );

  setMessages((prev) => [
    ...prev,
    {
      text: response.data.reply,
      sender: "bot",
    },
  ]);
} catch (error) {
  setMessages((prev) => [
    ...prev,
    {
      text: "⚠️ Unable to connect to FoodSpire AI.",
      sender: "bot",
    },
  ]);
}

setLoading(false);


};

return ( <div className="ai-page">


  {/* Floating Food Images */}
  <img src="/biryani.jpeg" className="floating-img biryani" alt="" />
  <img src="/burger.jpg" className="floating-img burger" alt="" />
  <img src="/dish1.jpeg" className="floating-img pizza" alt="" />
  <img src="/ice Cream.jpeg" className="floating-img icecream" alt="" />

  {/* Glowing Orbs */}
  <div className="orb orb1"></div>
  <div className="orb orb2"></div>
  <div className="orb orb3"></div>

  <div className="ai-header">
    <h1>🤖 FoodSpire AI Assistant</h1>
    <p>
      Smart Food Recommendations • Recipes • Nutrition • Health Insights
    </p>
  </div>

  <div className="ai-container">

    <div className="left-panel">

      <h3>✨ AI Features</h3>

      <div className="feature-card">🍕 Food Recommendations</div>
      <div className="feature-card">🥗 Nutrition Analysis</div>
      <div className="feature-card">📖 Recipe Generator</div>
      <div className="feature-card">⚠️ Allergy Detection</div>
      <div className="feature-card">📍 Nearby Restaurants</div>
      <div className="feature-card">❤️ Health Score</div>

      <h4>Quick Actions</h4>

      <button onClick={() => setInput("Suggest healthy breakfast")}>
        Healthy Breakfast
      </button>

      <button onClick={() => setInput("Suggest dinner ideas")}>
        Dinner Ideas
      </button>

      <button onClick={() => setInput("Give me a recipe")}>
        Recipe Generator
      </button>

      <button onClick={() => setInput("Suggest high protein foods")}>
        High Protein Foods
      </button>

    </div>

    <div className="chat-panel">

      <div className="chat-box">

        {messages.map((msg, index) => (
  <div key={index} className={`chat-message ${msg.sender}`}>

  {msg.image && (
    <img
      src={msg.image}
      alt="food"
      className="food-chat-image"
    />
  )}

  <div>{msg.text}</div>

</div>
        ))}

        {loading && (
          <div className="typing">
            🤖 FoodSpire AI is typing...
          </div>
        )}

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Ask anything about food..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleSend()
          }
        />

        <button onClick={handleSend}>
          ➤
        </button>

      </div>

    </div>
  </div>
</div>


);
};

export default Chatbot;
