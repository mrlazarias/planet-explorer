<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-primary-400">Planetas do Sistema Solar</h2>
      <router-link to="/planets/create" class="btn">Adicionar Planeta</router-link>
    </div>
    
    <div v-if="loading" class="text-center py-12 text-lg text-gray-400">
      Carregando planetas...
    </div>
    
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div v-else-if="planets.length === 0" class="text-center py-12 text-lg text-gray-400">
      Nenhum planeta encontrado. Adicione um novo planeta!
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="planet in planets" :key="planet._id" 
        class="bg-dark-900/80 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:-translate-y-1">
        <router-link :to="`/planets/${planet._id}`" class="block">
          <img :src="planet.imageUrl" :alt="planet.name" class="w-full h-48 object-cover" />
          <div class="p-5">
            <h3 class="text-xl font-semibold text-primary-400 mb-2">{{ planet.name }}</h3>
            <div class="flex justify-between text-sm text-gray-400">
              <span>{{ planet.diameter }} km</span>
              <span v-if="planet.hasRings" class="text-amber-400">Tem anéis</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { usePlanetsStore } from '../store/planets';

export default {
  name: 'PlanetListView',
  setup() {
    const planetsStore = usePlanetsStore();
    
    // Fetch planets when component is mounted
    onMounted(() => {
      planetsStore.fetchPlanets();
    });
    
    return {
      planets: computed(() => planetsStore.getPlanets),
      loading: computed(() => planetsStore.isLoading),
      error: computed(() => planetsStore.getError)
    };
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.planets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.planet-card {
  background: rgba(26, 26, 26, 0.8);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.planet-card:hover {
  transform: translateY(-5px);
}

.planet-card a {
  text-decoration: none;
  color: inherit;
}

.planet-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.planet-info {
  padding: 1.5rem;
}

.planet-info h3 {
  margin-bottom: 0.5rem;
  color: #64b5f6;
}

.planet-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #ccc;
}

.has-rings {
  color: #ffc107;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.loading, .no-planets {
  text-align: center;
  padding: 3rem 0;
  font-size: 1.2rem;
  color: #ccc;
}

.error-message {
  background: rgba(255, 87, 87, 0.2);
  color: #ff5757;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style> 