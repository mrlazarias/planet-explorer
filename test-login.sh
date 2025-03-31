#!/bin/bash

echo "Testando login na API..."

curl -v -X POST -H "Content-Type: application/json" -d '{"username":"user1","password":"123456"}' http://localhost:3000/api/users/login

echo ""
echo "Se você viu um token JWT na resposta, o login funcionou!"
echo "Agora tente acessar a aplicação web em http://localhost:8081"
echo "e faça login com as mesmas credenciais:"
echo "Username: user1"
echo "Password: 123456" 