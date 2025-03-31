#!/bin/bash

# Script para executar o projeto com as correções

# Construir os contêineres com a configuração corrigida
echo "Construindo os contêineres com as correções..."
docker-compose -f docker-compose.fixed.yml build

# Iniciar os contêineres
echo "Iniciando os contêineres..."
docker-compose -f docker-compose.fixed.yml up -d

# Inicializar o banco de dados (aguardar um pouco para o MongoDB iniciar)
echo "Aguardando serviços inicializarem..."
sleep 10

echo "Inicializando o banco de dados..."
./init-db.sh

echo "Sistema iniciado com sucesso!"
echo "Acesse:"
echo "  Frontend: http://localhost:8081"
echo "  Backend API: http://localhost:3000/api"
echo ""
echo "Credenciais de acesso:"
echo "  Username: admin"
echo "  Password: password123" 