# ⚓ OnePieceAI

Um chat temático de One Piece com inteligência artificial, dividido em três sessões interativas

---

## 🎯 Sobre o Projeto

Aplicação web com IA generativa integrada ao universo de One Piece. Contendo 3 sessões

- ✅ Historiador de One Piece com consumo de API externa (personagens e sagas)
- ✅ Chat com os 10 Mugiwaras, cada um com tom de conversa personalizado
- ✅ Criador de Akuma no Mi com geração criativa via IA 

---

## 📖 Sessões do Projeto

### 🗺️ Sessão 1 — O Historiador
Funciona como um guia especializado em One Piece. Quando necessário, consome a API pública de One Piece para buscar informações sobre:
- Personagens (nome, raça, fruta do diabo, afiliação, etc.)
- Sagas e arcos da obra
- Tripulações 

---

### 🏴‍☠️ Sessão 2 — Conversa com os Mugiwaras
O usuário escolhe com qual membro da tripulação deseja conversar. Cada personagem possui um tom e estilo únicos definidos via system prompt:

- Monkey D. Luffy 
- Roronoa Zoro 
- Nami
- God Usopp
- Vinsmoke Sanji
- Tony Tony Chopper
- Nico Robin
- Franky
- Brook
- Jinbe

---

### 😈 Sessão 3 — Criador de Akuma no Mi
O usuário fornece dois parâmetros e a IA gera uma Akuma no Mi criativa e coerente com o universo:

**Parâmetros de entrada:**
- **Tipo:** Paramecia, Logia ou Zoan
- **Base do poder:** ex. fogo, tempo, espelho, som...

**A IA retorna:**
- Nome da fruta (nomenclatura japonesa: *[Nome]-[Nome] no Mi*)
- Descrição detalhada dos poderes e habilidades

---

## 🧑‍💻 Tecnologias Utilizadas

### Backend (Desenvolvido 100% por mim)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Spring AI](https://img.shields.io/badge/Spring_AI-1E4D78?style=for-the-badge&logo=spring&logoColor=white)

### Frontend (Com auxílio de IA)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Ferramentas de Desenvolvimento
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ_IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## ⚙️ Requisitos

Antes de começar, certifique-se de ter instalado:

- **JDK 21+** — [Download](https://www.oracle.com/java/technologies/javase-jdk21-downloads.html)
- **Node.js (22.16.0) e NPM (10.9.2)** - [Download](https://nodejs.org/)
- **Possuir api key da Google (inicialmente com o modelo gratuito "gemini-2.5-flash")**

---

## ✨ Como Rodar o Projeto

### Backend (Java / Spring Boot)

**Configure sua chave da Google no `.env`:**
```properties
GOOGLE_AI_API_KEY=SUA CHAVE AQUI
```

### Frontend (React)

**Instale as dependências e inicie (na pasta do frontend):**
```bash
npm install
npm start
```

---

## 👀 Rodar Localmente

- 🔄 Backend (porta: **8080**)
- 🔄 Frontend (porta: **3000**)

---
