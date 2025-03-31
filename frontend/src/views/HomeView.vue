<template>
  <div class="text-center">
    <section class="py-16 mb-12 rounded-lg bg-gradient-to-b from-dark-900/80 to-dark-950/95 bg-cover bg-center" 
      style="background-image: url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200')">
      <h1 class="text-4xl font-bold text-primary-400 mb-4">Explore o Sistema Solar</h1>
      <p class="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
        Descubra informações fascinantes sobre os planetas do nosso sistema solar
      </p>
      <router-link to="/planets" class="btn">Ver Planetas</router-link>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      <div class="p-8 rounded-lg bg-dark-900/80 shadow-lg transform transition-transform hover:-translate-y-1">
        <div class="text-5xl mb-4">🪐</div>
        <h3 class="text-xl font-bold text-primary-400 mb-4">Explore Planetas</h3>
        <p class="text-gray-300">Conheça os detalhes de cada planeta do sistema solar.</p>
      </div>
      
      <div class="p-8 rounded-lg bg-dark-900/80 shadow-lg transform transition-transform hover:-translate-y-1">
        <div class="text-5xl mb-4">✨</div>
        <h3 class="text-xl font-bold text-primary-400 mb-4">Dados Detalhados</h3>
        <p class="text-gray-300">Informações precisas sobre diâmetro, distância do sol e mais.</p>
      </div>
      
      <div class="p-8 rounded-lg bg-dark-900/80 shadow-lg transform transition-transform hover:-translate-y-1">
        <div class="text-5xl mb-4">🚀</div>
        <h3 class="text-xl font-bold text-primary-400 mb-4">Crie Planetas</h3>
        <p class="text-gray-300">Adicione seus próprios planetas personalizados.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  text-align: center;
}

.hero {
  padding: 4rem 0;
  background: linear-gradient(to bottom, rgba(18, 18, 18, 0.8), rgba(18, 18, 18, 0.95)), url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200') center/cover no-repeat;
  border-radius: 10px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #64b5f6;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #f5f5f5;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: rgba(26, 26, 26, 0.8);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: #64b5f6;
}

.feature-card p {
  color: #f5f5f5;
}
</style> 