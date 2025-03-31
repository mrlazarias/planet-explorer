# 🪐 Planet Explorer

![Status](https://img.shields.io/badge/status-stable-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Uma aplicação moderna para explorar informações sobre os planetas do sistema solar, desenvolvida com Vue.js, Node.js, Express e MongoDB.

![Planet Explorer Screenshot](frontend/public/screenshot.png)

## ✨ Características

- **Design Moderno:** Interface limpa e intuitiva com tema espacial
- **Visualização de Planetas:** Exploração visual de todos os planetas do sistema solar
- **Detalhes Completos:** Informações detalhadas sobre cada planeta
- **Sistema de Autenticação:** Protege o acesso às informações
- **API RESTful:** Backend robusto com Express.js
- **Banco de Dados NoSQL:** Armazenamento flexível com MongoDB

## 🚀 Tecnologias

### Frontend
- Vue 3 (Composition API)
- Vue Router
- Pinia (gerenciamento de estado)
- Axios (cliente HTTP)
- Tailwind CSS (framework de estilo)

### Backend
- Node.js
- Express.js
- MongoDB com Mongoose
- JWT para autenticação
- TypeScript

### Infraestrutura
- Docker e Docker Compose
- Nginx como servidor web

## 📋 Pré-requisitos

- Docker e Docker Compose
- Node.js 18+ (para desenvolvimento)

## 🛠️ Instalação e Execução

### Usando Docker (recomendado)

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/planet-explorer.git
   cd planet-explorer
   ```

2. Execute a aplicação usando Docker Compose:
   ```bash
   ./run-fixed.sh
   ```

3. Acesse a aplicação:
   - Frontend: http://localhost:8081
   - API: http://localhost:3000/api

### Credenciais de Acesso

- **Usuário:** test
- **Senha:** 123456

### Desenvolvimento Local

1. Inicie o MongoDB:
   ```bash
   docker-compose -f docker-compose.fixed.yml up mongo
   ```

2. Configure o backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. Configure o frontend:
   ```bash
   cd frontend
   npm install
   npm run serve
   ```

## 🌟 Funcionalidades

### Exploração de Planetas
- Lista de todos os planetas do sistema solar
- Visualização detalhada de cada planeta
- Informações sobre diâmetro, distância do sol, período de rotação e presença de anéis

### Sistema de Autenticação
- Login seguro com JWT
- Proteção de rotas que exigem autenticação

### Administração
- Adição de novos planetas
- Edição de informações de planetas existentes

## 📝 API Endpoints

### Autenticação
- `POST /api/users/login` - Login do usuário
- `POST /api/users/register` - Registro de novo usuário

### Planetas
- `GET /api/planets` - Obter todos os planetas
- `GET /api/planets/:id` - Obter detalhes de um planeta específico
- `POST /api/planets` - Adicionar um novo planeta
- `PUT /api/planets/:id` - Atualizar informações de um planeta
- `DELETE /api/planets/:id` - Remover um planeta

## 🔧 Solução de Problemas

### Erro ERR_EMPTY_RESPONSE ao acessar o frontend
Caso encontre este erro, execute o script para corrigir o banco de dados:
```bash
./fix-db.sh
```

### Falha no login
Verifique se está usando as credenciais corretas:
```bash
./test-login.sh
```

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## ✒️ Autores

* **Desenvolvedor Principal** - Projeto desenvolvido para fins educacionais

---
Feito com ❤️ por Planet Explorer Team 