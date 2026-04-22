import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getCharacterConversation } from '../services/api';
import './CharacterChat.css';

const CHARACTERS = [
  { id: 'Luffy', name: 'Monkey D. Luffy', color: '#e3000f', greeting: 'Yo! Eu sou o Monkey D. Luffy, o homem que vai ser o Rei dos Piratas! O que manda?' },
  { id: 'Zoro', name: 'Roronoa Zoro', color: '#2ecc71', greeting: 'Humpf. O que você quer? Não atrapalhe meu treinamento.' },
  { id: 'Nami', name: 'Nami', color: '#f39c12', greeting: 'Oi! Vai me pagar por essa informação? Brincadeira... O que quer saber da navegadora mais linda dos mares?' },
  { id: 'Usopp', name: 'Deus Usopp', color: '#8e44ad', greeting: 'Eu sou o grande Capitão Usopp! Comandando mais de 8.000 homens! Do que precisa?' },
  { id: 'Sanji', name: 'Vinsmoke Sanji', color: '#2980b9', greeting: 'Seja bem-vindo. Quer algo para comer ou beber enquanto conversamos? Se for uma bela dama, é por conta da casa!' },
  { id: 'Chopper', name: 'Tony Tony Chopper', color: '#ff9ff3', greeting: 'Me elogiar não me deixa feliz seu idiota! M-Mas do que você precisa? Está machucado?' },
  { id: 'Robin', name: 'Nico Robin', color: '#9b59b6', greeting: 'Fufufu... Olá. O que traz você aqui? Encontrou alguma ruína interessante?' },
  { id: 'Franky', name: 'Franky', color: '#3498db', greeting: 'SUUPER!! Como posso ajudar, irmão? Precisa de uma atualização ciborgue?' },
  { id: 'Brook', name: 'Brook', color: '#bdc3c7', greeting: 'Yohohoho! Pode me dar a honra de ver sua ca... quer dizer, como posso ajudar? Ouvindo uma boa música, talvez?' },
  { id: 'Jinbe', name: 'Jinbe', color: '#16a085', greeting: 'Saudações. Eu sou Jinbe, o cavaleiro do mar. Em que posso ser útil?' },
];

const CharacterChat = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[0]);

  // Guardamos as mensagens de cada personagem separadamente
  const [chats, setChats] = useState({
    [CHARACTERS[0].id]: [{ id: 1, sender: 'ai', text: CHARACTERS[0].greeting }]
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const messagesEndRef = useRef(null);

  const currentMessages = useMemo(() => {
    return chats[selectedCharacter.id] || [{ id: `greeting-${selectedCharacter.id}`, sender: 'ai', text: selectedCharacter.greeting }];
  }, [chats, selectedCharacter.id, selectedCharacter.greeting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const handleSelectCharacter = (e) => {
    const char = CHARACTERS.find(c => c.id === e.target.value);
    setSelectedCharacter(char);
    setImageError(false); // Reseta o erro da imagem ao trocar de personagem
    if (!chats[char.id]) {
      setChats(prev => ({
        ...prev,
        [char.id]: [{ id: Date.now(), sender: 'ai', text: char.greeting }]
      }));
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text: input };

    // Adiciona a msg do usuário no fluxo atual
    setChats(prev => ({
      ...prev,
      [selectedCharacter.id]: [...(prev[selectedCharacter.id] || []), userMessage]
    }));

    setInput('');
    setIsLoading(true);

    try {
      const text = await getCharacterConversation(userMessage.text, selectedCharacter.id);

      setChats(prev => ({
        ...prev,
        [selectedCharacter.id]: [
          ...prev[selectedCharacter.id],
          { id: Date.now(), sender: 'ai', text }
        ]
      }));
    } catch (error) {
      setChats(prev => ({
        ...prev,
        [selectedCharacter.id]: [
          ...prev[selectedCharacter.id],
          { id: Date.now(), sender: 'ai', text: 'Os Den Den Mushis estão de mal humor.' }
        ]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm(`Tem certeza que deseja limpar a conversa com ${selectedCharacter.name}?`)) {
      setChats(prev => ({
        ...prev,
        [selectedCharacter.id]: [{ id: Date.now(), sender: 'ai', text: selectedCharacter.greeting }]
      }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="character-chat-wrapper">
      <div
        className="chat-container character-chat-container"
        style={{
          borderColor: selectedCharacter.color,
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 20px ${selectedCharacter.color}20`,
          '--char-bg': `url('/images2/${selectedCharacter.id}Background.png')`
        }}
      >
        <div className="chat-header" style={{ borderBottomColor: selectedCharacter.color }}>
          <div className="header-character-info">
            <div className={`char-thumb ${imageError ? 'no-thumb' : ''}`} style={{ borderColor: selectedCharacter.color }}>
              {!imageError && (
                <img
                  src={`/images/${selectedCharacter.id}.png`}
                  alt={selectedCharacter.name}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div className="select-wrapper">
              <select
                className="character-dropdown"
                value={selectedCharacter.id}
                onChange={handleSelectCharacter}
                style={{ color: selectedCharacter.color }}
              >
                {CHARACTERS.map(char => (
                  <option key={char.id} value={char.id}>{char.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="chat-header-status">
            <p className="status-text">Den Den Mushi Conectado!</p>
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
        </div>

        <div 
          className="chat-main-body"
          style={{ '--char-bg': `url('/images2/${selectedCharacter.id}Background.png')` }}
        >
          <div className="chat-area character-chat-area">
            <div className="messages-list">
              {currentMessages.map(msg => (
                <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                  <div
                    className="message-bubble"
                    style={
                      msg.sender === 'ai'
                        ? { borderLeft: `4px solid ${selectedCharacter.color}` }
                        : {}
                    }
                  >
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

          <div className="input-area" style={{ borderTopColor: `${selectedCharacter.color}40` }}>
            <div className="input-wrapper" style={{ borderColor: `${selectedCharacter.color}80` }}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={`O que deseja falar com ${selectedCharacter.name}?`}
                rows="1"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                style={{ backgroundColor: selectedCharacter.color }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#fff' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterChat;
