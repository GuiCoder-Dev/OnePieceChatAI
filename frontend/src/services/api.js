import axios from 'axios';

const api = axios.create({
  // O proxy no package.json (/ai ...) vai redirecionar para o Spring Boot (localhost:8080)
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getNormalConversation = async (prompt) => {
  const response = await api.get('/ai/normal-conversations', {
    params: { prompt },
  });
  return response.data;
};

export const getCharacterConversation = async (prompt, choiceCharacter = 'Luffy') => {
  const response = await api.get('/ai/character-conversations', {
    params: { prompt, choiceCharacter },
  });
  return response.data;
};

export const createFruit = async (fruitType, power) => {
  const response = await api.get('/ai/create-fruit', {
    params: { fruitType, power },
  });
  return response.data;
};

export default api;
