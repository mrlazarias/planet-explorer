#!/bin/bash

# Script para facilitar a execução do projeto com Docker

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função de ajuda
function show_help {
    echo -e "${BLUE}Sistema Solar Explorer - Script de Execução${NC}"
    echo ""
    echo "Uso: ./run.sh [comando]"
    echo ""
    echo "Comandos:"
    echo "  start       Inicia todos os containers"
    echo "  stop        Para todos os containers"
    echo "  restart     Reinicia todos os containers"
    echo "  logs        Mostra logs de todos os serviços"
    echo "  seed        Executa o script de seed para popular o banco de dados"
    echo "  status      Mostra o status dos containers"
    echo "  build       Reconstrói os containers"
    echo "  clean       Remove containers, volumes e imagens"
    echo "  help        Mostra esta mensagem de ajuda"
    echo ""
}

# Verifica se o Docker está instalado
if ! command -v docker &> /dev/null || ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker e/ou Docker Compose não estão instalados!${NC}"
    echo "Por favor, instale o Docker e o Docker Compose primeiro."
    exit 1
fi

# Executa o comando baseado no argumento fornecido
case "$1" in
    start)
        echo -e "${GREEN}Iniciando os containers...${NC}"
        docker-compose up -d
        echo -e "${GREEN}Containers iniciados. Acesse:${NC}"
        echo -e "  Frontend: ${BLUE}http://localhost:8080${NC}"
        echo -e "  Backend API: ${BLUE}http://localhost:3000/api${NC}"
        ;;
    stop)
        echo -e "${GREEN}Parando os containers...${NC}"
        docker-compose down
        ;;
    restart)
        echo -e "${GREEN}Reiniciando os containers...${NC}"
        docker-compose down
        docker-compose up -d
        ;;
    logs)
        echo -e "${GREEN}Exibindo logs...${NC}"
        docker-compose logs -f
        ;;
    seed)
        echo -e "${GREEN}Executando seed de dados...${NC}"
        docker-compose exec backend npm run data:import
        ;;
    status)
        echo -e "${GREEN}Status dos containers:${NC}"
        docker-compose ps
        ;;
    build)
        echo -e "${GREEN}Reconstruindo containers...${NC}"
        docker-compose build
        docker-compose up -d
        ;;
    clean)
        echo -e "${GREEN}Removendo containers, volumes e imagens...${NC}"
        docker-compose down -v --rmi all
        ;;
    help|*)
        show_help
        ;;
esac 