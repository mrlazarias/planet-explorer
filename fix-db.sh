#!/bin/bash

echo "Corrigindo banco de dados..."

docker-compose -f docker-compose.fixed.yml exec -T backend node -e "
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/planet_explorer')
  .then(async () => {
    console.log('MongoDB conectado');
    
    // Modelo de usuário simplificado
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    });
    
    // Adicionar método para comparar senha
    userSchema.methods.comparePassword = async function(enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    };
    
    // Registrar o modelo
    let User;
    try {
      User = mongoose.model('User');
    } catch (error) {
      User = mongoose.model('User', userSchema);
    }
    
    // Limpar usuários existentes
    await User.deleteMany({});
    
    // Criar novo usuário com senha simples
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);
    
    await User.create({
      username: 'test',
      password: hashedPassword
    });
    
    console.log('Usuário de teste criado com sucesso!');
    console.log('Username: test');
    console.log('Password: 123456');
    
    process.exit();
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });
"

echo "Banco de dados corrigido!"
echo "Agora você pode usar:"
echo "Username: test"
echo "Password: 123456" 