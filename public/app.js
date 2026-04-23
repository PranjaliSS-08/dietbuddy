const { useEffect, useMemo, useRef, useState } = React;

const API_URL = "https://your-dietbuddy-api-link/api/dialogflow";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "bot",
      text: "Hi! I am DietBuddy. Tell me your weight, goal, and diet preference to start your personalized plan.",
    },
  ]);
  const [suggestions, setSuggestions] = useState([
    "Weight loss plan",
    "Weight gain plan",
    "Vegan meal ideas",
    "Beginner home workout",
  ]);
  const [links, setLinks] = useState([]);

  const chatBodyRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping, links]);

  const quickIntro = useMemo(
    () => [
      "Weight",
      "Diet preference (veg / non-veg / vegan)",
      "Goal (weight loss / weight gain / maintain fitness)",
      "Lifestyle/activity level",
    ],
    []
  );

  const addMessage = (role, text) => {
    setMessages(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role,
        text,
      },
    ]);
  };

  const sendMessage = async (rawText) => {
    const text = String(rawText || "").trim();
    if (!text || isLoading) return;

    addMessage("user", text);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);
    setLinks([]);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      const reply = data?.reply || "I could not understand that. Could you try rephrasing?";
      const nextSuggestions = Array.isArray(data?.suggestions) ? data.suggestions : [];
      const nextLinks = Array.isArray(data?.links) ? data.links : [];

      setTimeout(() => {
        addMessage("bot", reply);
        setSuggestions(nextSuggestions);
        setLinks(nextLinks);
        setIsTyping(false);
      }, 450);
    } catch (error) {
      setTimeout(() => {
        addMessage("bot", "Something went wrong. Please try again.");
        setSuggestions(["Try again", "Weight loss tips", "Healthy meal options"]);
        setLinks([]);
        setIsTyping(false);
      }, 350);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const onSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">DietBuddy</div>
        <button className="toggle" onClick={() => setDarkMode(prev => !prev)}>
          {darkMode ? "Light" : "Dark"} mode
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-card">
              <span className="eyebrow">Personal Wellness Assistant</span>
              <h1>DietBuddy - Your Personal Diet Assistant</h1>
              <p>
                Get personalized diet plans, fitness advice, and healthy lifestyle tips instantly.
              </p>
              <div className="cta-row">
                <button className="btn primary" onClick={() => setChatOpen(true)}>
                  Start Chat
                </button>
                <button
                  className="btn ghost"
                  onClick={() => {
                    const node = document.getElementById("about");
                    if (node) node.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container about-grid">
            <article className="card">
              <h2>What DietBuddy Collects</h2>
              <ul>
                {quickIntro.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="card">
              <h2>What DietBuddy Provides</h2>
              <ul>
                <li>Personalized diet plans</li>
                <li>Meal recommendations</li>
                <li>Exercise suggestions</li>
                <li>Health and lifestyle tips</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section features">
          <div className="container">
            <h2>Features</h2>
            <div className="feature-grid">
              <article className="card">Step-by-step guided diet conversation</article>
              <article className="card">Personalized diet plans based on your goals</article>
              <article className="card">Meal and exercise suggestions for everyday life</article>
              <article className="card">Beginner-friendly interface with quick responses</article>
            </div>
          </div>
        </section>
      </main>

      <button className="chat-launcher" onClick={() => setChatOpen(true)}>
        Open DietBuddy Chat
      </button>

      {chatOpen && (
        <section className="chat-panel" aria-label="DietBuddy chat assistant">
          <div className="chat-head">
            <div className="assistant">
              <div className="avatar" aria-hidden="true">🥗</div>
              <div>
                <strong>DietBuddy Assistant</strong>
                <div style={{ fontSize: "0.82rem", opacity: 0.8 }}>Online</div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setChatOpen(false)}>
              Close
            </button>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map(msg => (
              <div key={msg.id} className={`message-row ${msg.role}`}>
                <div className={`bubble ${msg.role}`}>{msg.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="message-row bot">
                <div className="bubble bot">
                  <div className="typing" aria-label="Bot is typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {links.length > 0 && (
            <div className="links">
              {links.map((link, index) => (
                <a className="link-card" href={link.url} target="_blank" rel="noreferrer" key={`${link.url}-${index}`}>
                  {link.name || link.url}
                </a>
              ))}
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.slice(0, 5).map((item, index) => (
                <button className="quick-btn" key={`${item}-${index}`} onClick={() => onSuggestionClick(item)}>
                  {item}
                </button>
              ))}
            </div>
          )}

          <form className="chat-input" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
            />

            {isLoading ? (
              <div className="spinner" title="Loading"></div>
            ) : (
              <button className="send-btn" type="submit">
                Send
              </button>
            )}
          </form>
        </section>
      )}

      <p className="footer-note">DietBuddy supports quick, goal-based nutrition guidance.</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
