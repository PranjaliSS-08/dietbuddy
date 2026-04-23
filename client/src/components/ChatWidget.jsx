import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Link as LinkIcon, Bot } from 'lucide-react';
import { useChat } from '../hooks/useChat';

const ChatWidget = ({ theme }) => {
  const { messages, sendMessage, isLoading, isOpen, setIsOpen } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  // Listen for custom event to open chat from Hero section
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, [setIsOpen]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="animate-fade-in" style={{
          position: 'fixed',
          bottom: '5.5rem',
          right: '2rem',
          width: 'min(calc(100vw - 4rem), 400px)',
          height: '600px',
          maxHeight: 'calc(100vh - 100px)',
          backgroundColor: 'var(--surface)',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
          overflow: 'hidden',
          border: '1px solid var(--border)'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: 'var(--primary)',
            padding: '1rem 1.5rem',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '50%' }}>
              <Bot size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>DietBuddy</h3>
              <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>Online & Ready</span>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                width: '100%'
              }}>
                <div style={{
                  backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg)',
                  color: msg.sender === 'user' ? '#fff' : 'var(--text)',
                  padding: '0.75rem 1rem',
                  borderRadius: '16px',
                  borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                  maxWidth: '85%',
                  boxShadow: msg.sender === 'bot' ? 'var(--shadow)' : 'none',
                  border: msg.sender === 'bot' ? '1px solid var(--border)' : 'none',
                  wordBreak: 'break-word'
                }}>
                  {msg.text}
                </div>

                {/* Suggestions */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                    {msg.suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(s)}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid var(--primary)',
                          color: 'var(--primary)',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--primary-light)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Links */}
                {msg.links && msg.links.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem', width: '100%' }}>
                    {msg.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          backgroundColor: 'var(--surface-hover)',
                          padding: '0.75rem',
                          borderRadius: '12px',
                          color: 'var(--text)',
                          border: '1px solid var(--border)',
                          fontSize: '0.875rem'
                        }}
                      >
                        <LinkIcon size={16} color="var(--primary)" />
                        {link.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div style={{
                backgroundColor: 'var(--bg)',
                padding: '1rem',
                borderRadius: '16px',
                borderBottomLeftRadius: '4px',
                maxWidth: 'fit-content',
                display: 'flex',
                gap: '0.25rem',
                alignItems: 'center',
                border: '1px solid var(--border)'
              }}>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{
            padding: '1rem',
            borderTop: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: '24px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg)',
                color: 'var(--text)',
                outline: 'none',
                fontFamily: 'Inter, sans-serif'
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              style={{
                backgroundColor: input.trim() && !isLoading ? 'var(--primary)' : 'var(--border)',
                color: '#fff',
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s',
                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed'
              }}
            >
              <Send size={20} style={{ marginLeft: '-2px' }} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
