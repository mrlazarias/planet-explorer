<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-primary">Planetas</h1>
        <p class="text-muted-foreground mt-1">Explore todos os planetas do nosso sistema solar</p>
      </div>
      <router-link to="/planets/create" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Novo Planeta
      </router-link>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center space-y-4">
        <svg class="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-muted-foreground">Carregando planetas...</p>
      </div>
    </div>

    <div v-else-if="error" class="p-6 rounded-lg bg-destructive/20 border border-destructive/50 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-destructive">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p class="text-lg font-medium text-destructive-foreground">{{ error }}</p>
      <button @click="fetchPlanets" class="btn btn-secondary mt-4">Tentar novamente</button>
    </div>

    <div v-else-if="planets.length === 0" class="text-center py-16">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-muted-foreground">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
      <h2 class="text-2xl font-bold text-primary mb-2">Nenhum planeta encontrado</h2>
      <p class="text-muted-foreground mb-6">Comece adicionando um novo planeta ao sistema.</p>
      <router-link to="/planets/create" class="btn btn-primary">Adicionar planeta</router-link>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <router-link 
        v-for="planet in planets" 
        :key="planet._id" 
        :to="`/planets/${planet._id}`"
        class="planet-card card overflow-hidden"
      >
        <div class="cosmic-shimmer"></div>
        <div class="aspect-[4/3] w-full relative">
          <img 
            :src="planet.imageUrl" 
            :alt="planet.name" 
            class="h-full w-full object-cover transition-all"
          />
          <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 class="text-xl font-bold text-white">{{ planet.name }}</h3>
          </div>
        </div>
        <div class="p-4 space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Diâmetro</span>
            <span class="font-medium">{{ formatNumber(planet.diameter) }} km</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Dist. do Sol</span>
            <span class="font-medium">{{ formatNumber(planet.distanceFromSun) }} milhões km</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Rotação</span>
            <span class="font-medium">{{ planet.rotationPeriod }}</span>
          </div>
          <div class="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
            <span class="text-sm text-muted-foreground">Possui anéis?</span>
            <span class="inline-flex px-2 py-1 rounded-full text-xs font-medium" 
              :class="planet.hasRings ? 'bg-success/20 text-success-foreground' : 'bg-muted/30 text-muted-foreground'">
              {{ planet.hasRings ? 'Sim' : 'Não' }}
            </span>
          </div>
        </div>
      </router-link>
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
    
    const planets = computed(() => planetsStore.getPlanets);
    const loading = computed(() => planetsStore.isLoading);
    const error = computed(() => planetsStore.getError);
    
    const fetchPlanets = async () => {
      await planetsStore.fetchPlanets();
    };
    
    const formatNumber = (num) => {
      return new Intl.NumberFormat().format(num);
    };
    
    onMounted(() => {
      fetchPlanets();
    });
    
    return {
      planets,
      loading,
      error,
      fetchPlanets,
      formatNumber
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