import React, { useState } from 'react';
import { createFruit } from '../services/api';
import './FruitCreator.css';

const FRUIT_TYPES = [
  { id: 'PARAMECIA', name: 'Paramecia' },
  { id: 'ZOAN', name: 'Zoan' },
  { id: 'LOGIA', name: 'Logia' }
];

const FruitCreator = () => {
  const [fruitType, setFruitType] = useState('PARAMECIA');
  const [power, setPower] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!power.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await createFruit(fruitType, power);
      setResult(response);
    } catch (error) {
      setResult('Erro ao despertar sua Akuma no Mi. O mar está agitado demais...');
      console.error('Error creating fruit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fruit-creator-container">
      <div className="creator-header">
        <img src="/images3/HitoHito.png" alt="Hito Hito no Mi" className="fruit-icon left" />
        <h2>Mestre das Akuma no Mi</h2>
        <img src="/images3/YamiYami.png" alt="Yami Yami no Mi" className="fruit-icon right" />
      </div>
      
      <div className="creator-form">
        <div className="form-group">
          <label htmlFor="fruit-type">Tipo da Fruta</label>
          <select 
            id="fruit-type"
            className="fruit-type-select"
            value={fruitType}
            onChange={(e) => setFruitType(e.target.value)}
          >
            {FRUIT_TYPES.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="power-input">Base do Poder</label>
          <textarea
            id="power-input"
            className="power-input"
            placeholder="Ex: Fogo, Gravidade, Fios, Transformar em brinquedo..."
            value={power}
            onChange={(e) => setPower(e.target.value)}
          />
        </div>

        <button 
          className="create-btn"
          onClick={handleCreate}
          disabled={isLoading || !power.trim()}
        >
          {isLoading ? 'Despertando...' : 'Despertar Poder'}
        </button>
      </div>

      {(isLoading || result) && (
        <div className="result-area">
          <div className="result-title">
            <span role="img" aria-label="fruit">🍎</span>
            Sua Nova Akuma no Mi:
          </div>
          
          {isLoading ? (
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <div className="result-content">
              {result}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FruitCreator;
