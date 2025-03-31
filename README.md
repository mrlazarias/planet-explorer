# Sistema Solar Explorer

Um aplicativo fullstack para explorar informações sobre os planetas do sistema solar. O projeto está dividido em backend (Node.js/Express/MongoDB) e frontend (Vue.js).

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- JWT para autenticação

### Frontend
- Vue.js 3
- Vue Router
- Pinia (gerenciamento de estado)
- Tailwind CSS (estilização)
- Axios

## Requisitos para Execução

### Com Docker (Recomendado)
- Docker
- Docker Compose

### Sem Docker
- Node.js (versão 14 ou superior)
- MongoDB (instalado localmente ou utilize um serviço de nuvem)
- NPM ou Yarn

## Configuração e Execução

### Com Docker

A maneira mais fácil de rodar o projeto é utilizando Docker:

```bash
# Clone o repositório (se ainda não tiver feito)
git clone <url-do-repositorio> 
cd planet-explorer

# Use o script otimizado para iniciar o projeto (recomendado)
chmod +x run-fixed.sh
./run-fixed.sh

# Para parar e limpar os recursos
chmod +x stop.sh
./stop.sh
```

A aplicação estará disponível em:
- Frontend: http://localhost:8081
- Backend API: http://localhost:3000/api
- MongoDB: localhost:27017

### Alternativamente, você pode usar o Docker Compose manualmente:

```bash
# Para iniciar com a configuração corrigida
docker-compose -f docker-compose.fixed.yml up -d

# Para inicializar o banco de dados
./init-db.sh

# Para parar os serviços
docker-compose -f docker-compose.fixed.yml down
```

### Sem Docker

#### Backend

1. Navegue até a pasta do backend:
   ```
   cd planet-explorer/backend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   - `MONGODB_URI`: URI de conexão com o MongoDB (padrão: mongodb://localhost:27017/sistema-solar)
   - `JWT_SECRET`: Chave secreta para assinatura de tokens JWT
   - `PORT`: Porta para o servidor (padrão: 3000)

4. Popule o banco de dados com os planetas do sistema solar:
   ```
   npm run data:import
   ```

5. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

O servidor backend estará em execução na porta 3000 (ou na porta configurada no arquivo .env).

#### Frontend

1. Navegue até a pasta do frontend:
   ```
   cd planet-explorer/frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env.local`:
   ```
   VUE_APP_API_URL=http://localhost:3000/api
   ```

4. Inicie o servidor de desenvolvimento:
   ```
   npm run serve
   ```

O aplicativo frontend estará em execução na porta 8080 (ou outra porta disponível).

## Credenciais de Acesso

Um usuário padrão é criado ao executar o script de importação de dados:

- Username: `admin`
- Password: `password123`

## Funcionalidades

- Autenticação de usuário
- Listagem de planetas do sistema solar
- Visualização detalhada de cada planeta
- Cadastro de novos planetas personalizados

## Estrutura do Projeto

### Backend
```
backend/
├── src/
│   ├── config/         # Configurações (banco de dados, etc.)
│   ├── controllers/    # Controladores da API
│   ├── data/           # Dados de seed para o banco
│   ├── middleware/     # Middlewares (autenticação, etc.)
│   ├── models/         # Modelos do banco de dados
│   ├── routes/         # Rotas da API
│   ├── utils/          # Utilitários
│   └── server.ts       # Ponto de entrada do servidor
├── .env                # Variáveis de ambiente
└── package.json        # Dependências e scripts
```

### Frontend
```
frontend/
├── public/             # Arquivos públicos
├── src/
│   ├── assets/         # Recursos (imagens, css, etc.)
│   ├── components/     # Componentes reutilizáveis
│   ├── router/         # Configuração de rotas
│   ├── store/          # Gerenciamento de estado (Pinia)
│   ├── views/          # Componentes de página
│   ├── App.vue         # Componente raiz
│   └── main.js         # Ponto de entrada do aplicativo
├── tailwind.config.js  # Configuração do Tailwind CSS
└── package.json        # Dependências e scripts
```

## Design e Estilização

O projeto utiliza Tailwind CSS para estilização, proporcionando:

- Interface moderna e responsiva
- Tema escuro com detalhes em azul
- Transições e efeitos de hover
- Componentes consistentes em toda a aplicação

## Implantação com Docker

O projeto está configurado para ser facilmente implantado com Docker:

### Arquivos de Configuração Docker
- `docker-compose.fixed.yml` - Define e configura todos os serviços (MongoDB, Backend, Frontend) com correções
- `backend/Dockerfile` - Configuração para construir a imagem do backend
- `frontend/Dockerfile` - Configuração para construir a imagem do frontend (multi-stage build)
- `frontend/nginx.conf` - Configuração do Nginx para servir a aplicação frontend e proxy para a API

### Scripts Auxiliares
- `run-fixed.sh` - Inicia todos os serviços com a configuração corrigida
- `stop.sh` - Limpa e para todos os serviços
- `init-db.sh` - Inicializa o banco de dados com planetas e usuário

### Serviços Docker
- **MongoDB**: Banco de dados persistente
- **Backend**: API Node.js/Express
- **Frontend**: Aplicação Vue.js servida via Nginx

### Problemas Comuns e Soluções
- **Porta 8080 já em uso**: Modificamos para usar a porta 8081 para o frontend
- **Erros de TypeScript**: Resolvidos no Dockerfile com correções específicas
- **Problemas de banco de dados**: Use o `init-db.sh` para reinicializar os dados 