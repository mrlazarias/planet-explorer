#!/bin/bash

# Script para parar o projeto e limpar recursos

echo "Parando contêineres..."
docker-compose -f docker-compose.fixed.yml down

echo "Verificando se há contêineres em execução..."
RUNNING_CONTAINERS=$(docker ps -q --filter "name=frontend\|backend\|mongodb")

if [ ! -z "$RUNNING_CONTAINERS" ]; then
  echo "Parando contêineres restantes..."
  docker stop $RUNNING_CONTAINERS
  docker rm $RUNNING_CONTAINERS
fi

echo "Verificando portas em uso..."
PORT_8081=$(lsof -i:8081 -t 2>/dev/null)
PORT_3000=$(lsof -i:3000 -t 2>/dev/null)

if [ ! -z "$PORT_8081" ]; then
  echo "Liberando porta 8081..."
  kill -9 $PORT_8081
fi

if [ ! -z "$PORT_3000" ]; then
  echo "Liberando porta 3000..."
  kill -9 $PORT_3000
fi

echo "Sistema parado e recursos liberados!" 