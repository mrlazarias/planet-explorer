<template>
  <div>
    <div v-if="loading" class="text-center py-12 text-lg text-gray-400">
      Carregando detalhes do planeta...
    </div>
    
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div v-else-if="!planet" class="text-center py-12 text-lg text-gray-400">
      Planeta não encontrado. <router-link to="/planets" class="text-primary-400 hover:underline">Ver todos os planetas</router-link>
    </div>
    
    <div v-else>
      <router-link to="/planets" class="inline-block mb-8 text-primary-400 hover:text-primary-500 transition-colors font-medium">
        &larr; Voltar para planetas
      </router-link>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 bg-dark-900/80 rounded-lg overflow-hidden shadow-xl">
        <div class="h-full">
          <img :src="planet.imageUrl" :alt="planet.name" class="w-full h-full object-cover" />
        </div>
        
        <div class="p-8">
          <h2 class="text-3xl font-bold text-primary-400 mb-8">{{ planet.name }}</h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <span class="text-sm text-gray-400 mb-2">Diâmetro</span>
              <span class="text-xl font-medium">{{ planet.diameter }} km</span>
            </div>
            
            <div class="flex flex-col">
              <span class="text-sm text-gray-400 mb-2">Período de Rotação</span>
              <span class="text-xl font-medium">{{ planet.rotationPeriod }}</span>
            </div>
            
            <div class="flex flex-col">
              <span class="text-sm text-gray-400 mb-2">Distância do Sol</span>
              <span class="text-xl font-medium">{{ planet.distanceFromSun }} milhões km</span>
            </div>
            
            <div class="flex flex-col">
              <span class="text-sm text-gray-400 mb-2">Anéis</span>
              <span class="text-xl font-medium" :class="{'text-amber-400': planet.hasRings}">
                {{ planet.hasRings ? 'Sim' : 'Não' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePlanetsStore } from '../store/planets';

export default {
  name: 'PlanetDetailView',
  setup() {
    const route = useRoute();
    const planetsStore = usePlanetsStore();
    
    onMounted(async () => {
      await planetsStore.fetchPlanetById(route.params.id);
    });
    
    return {
      planet: computed(() => planetsStore.getPlanet),
      loading: computed(() => planetsStore.isLoading),
      error: computed(() => planetsStore.getError)
    };
  }
};
</script>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: #64b5f6;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
}

.back-link:hover {
  opacity: 0.8;
}

.planet-detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.planet-image-container {
  height: 100%;
}

.planet-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.planet-info {
  padding: 2rem;
}

.planet-info h2 {
  color: #64b5f6;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 0.5rem;
}

.info-value {
  font-size: 1.2rem;
  font-weight: 500;
}

.has-rings {
  color: #ffc107;
}

.loading, .no-planet {
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

@media (max-width: 768px) {
  .planet-detail-content {
    grid-template-columns: 1fr;
  }
  
  .planet-image-container {
    height: 300px;
  }
}
</style> 