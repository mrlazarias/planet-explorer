#!/bin/bash

echo "Criando usuário de teste..."

curl -v -X POST -H "Content-Type: application/json" -d '{"username":"user1","password":"123456"}' http://localhost:3000/api/users/register

echo ""
echo "Usuário criado com sucesso! Você pode fazer login com:"
echo "Username: user1"
echo "Password: 123456" 