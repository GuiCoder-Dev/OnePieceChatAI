import React, { useState, useRef, useEffect } from 'react';
import { getNormalConversation } from '../services/api';
import './HistorianChat.css';

const HistorianChat = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: 'Saudações, viajante! Sou o Grande Historiador do mundo de One Piece. Pergunte-me qualquer coisa sobre piratas, marinheiros, Akuma no Mi ou as famosas lendas dos mares!' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const text = await getNormalConversation(userMessage.text);
      
      setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text: 'Perdoe-me, meus Den Den Mushis estão com problemas de conexão. Tente novamente mais tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Tem certeza que deseja limpar esta conversa?')) {
      setMessages([
        { 
          id: Date.now(), 
          sender: 'ai', 
          text: 'Saudações, viajante! Sou o Grande Historiador do mundo de One Piece. Pergunte-me qualquer coisa sobre piratas, marinheiros, Akuma no Mi ou as famosas lendas dos mares!' 
        }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-info">
          <h2>Historiador de Ohara</h2>
          <p>A sabedoria do século perdido</p>
        </div>
        <button 
          className="clear-chat-btn" 
          onClick={handleClearChat}
          title="Limpar Conversa"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <div className="chat-area">
        <div className="messages-list">
          {messages.map(msg => (
            <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
              <div className="message-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message-wrapper ai">
              <div className="message-bubble loading">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="input-area">
        <div className="input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="O que deseja saber sobre a Grand Line?"
            rows="1"
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistorianChat;
