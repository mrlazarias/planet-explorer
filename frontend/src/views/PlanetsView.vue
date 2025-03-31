<template>
  <div class="relative space-y-8">
    <!-- Efeito decorativo -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute top-1/2 left-1/2 -translate a-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"></div>
    </div>
    
    <!-- Cabeçalho da página -->
    <div class="text-center space-y-3">
      <h1 class="text-3xl font-bold tracking-tight">
        <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Sistema Solar
        </span>
      </h1>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Explore os planetas do nosso sistema solar. Clique em um planeta para ver mais detalhes sobre ele.
      </p>
    </div>
    
    <!-- Filtro e estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Barra de filtro -->
      <div class="bg-card border border-border/50 rounded-lg p-4 shadow-md backdrop-blur-sm">
        <div class="flex flex-wrap items-center gap-4">
          <div class="relative w-full md:w-64">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input 
              type="text" 
              v-model="searchTerm" 
              placeholder="Buscar planetas..." 
              class="w-full pl-10 h-10 rounded-md bg-card/70 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
          <div class="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="ringFilter" 
              v-model="filterWithRings" 
              class="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <label for="ringFilter" class="text-sm font-medium cursor-pointer select-none">
              Apenas com anéis
            </label>
          </div>
          <div class="flex items-center space-x-2 ml-auto">
            <label for="sortBy" class="text-sm font-medium">Ordenar por:</label>
            <select 
              id="sortBy" 
              v-model="sortBy" 
              class="h-9 rounded-md bg-card/70 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
            >
              <option value="name">Nome</option>
              <option value="diameter">Diâmetro</option>
              <option value="distanceFromSun">Distância do Sol</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Card de estatísticas -->
      <div class="bg-card border border-border/50 rounded-lg p-4 shadow-md backdrop-blur-sm">
        <div class="flex flex-wrap justify-between gap-2">
          <div class="flex flex-col">
            <span class="text-sm text-muted-foreground">Total de planetas</span>
            <div class="flex items-baseline gap-1.5">
              <span class="text-2xl font-bold">{{ planets.length }}</span>
              <span class="text-sm text-muted-foreground">exibidos</span>
            </div>
          </div>
          <div v-if="filteredPlanets.length > 0" class="flex flex-col">
            <span class="text-sm text-muted-foreground">Tamanho médio</span>
            <div class="flex items-baseline gap-1.5">
              <span class="text-2xl font-bold">{{ averageDiameter }}</span>
              <span class="text-sm text-muted-foreground">km</span>
            </div>
          </div>
          <div v-if="filterWithRings" class="flex flex-col">
            <span class="text-sm text-muted-foreground">Com anéis</span>
            <div class="flex items-baseline gap-1.5">
              <span class="text-2xl font-bold">{{ planetsWithRings }}</span>
              <span class="text-sm text-muted-foreground">planetas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Conteúdo principal -->
    <div>
      <!-- Estado de carregamento -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
      
      <!-- Mensagem de erro -->
      <div v-else-if="error" class="bg-destructive/10 border border-destructive/30 rounded-lg p-8 text-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-destructive">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" x2="12" y1="8" y2="12"/>
          <line x1="12" x2="12.01" y1="16" y2="16"/>
        </svg>
        <h3 class="text-lg font-medium text-destructive">Erro ao carregar planetas</h3>
        <p class="text-muted-foreground">{{ error }}</p>
        <button @click="fetchPlanets" class="px-4 py-2 text-sm font-medium bg-card border border-border rounded-md hover:bg-secondary transition-colors">
          Tentar novamente
        </button>
      </div>
      
      <!-- Lista de planetas vazia -->
      <div v-else-if="filteredPlanets.length === 0" class="bg-card/30 border border-border/50 rounded-lg p-8 text-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-muted-foreground">
          <circle cx="12" cy="12" r="10"/>
          <line x1="8" x2="16" y1="12" y2="12"/>
        </svg>
        <h3 class="text-lg font-medium">Nenhum planeta encontrado</h3>
        <p class="text-muted-foreground">Tente ajustar os filtros de busca.</p>
      </div>
      
      <!-- Grid de planetas -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <router-link 
          v-for="planet in filteredPlanets" 
          :key="planet._id" 
          :to="'/planets/' + planet._id"
          class="group bg-card border border-border/60 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg hover:shadow-primary/20 hover:border-primary/60 hover:translate-y-[-4px]"
        >
          <div class="relative aspect-video overflow-hidden bg-gradient-to-br from-card to-background">
            <!-- Efeito visual do planeta -->
            <div 
              class="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all group-hover:scale-110"
              :class="{'planet-with-rings': planet.hasRings}"
            >
              <div 
                class="w-24 h-24 rounded-full" 
                :style="{
                  background: getPlanetColor(planet.name),
                  boxShadow: getPlanetColor(planet.name, true)
                }"
              ></div>
            </div>
            
            <!-- Badge para planetas com anéis -->
            <div 
              v-if="planet.hasRings" 
              class="absolute top-2 right-2 text-xs font-medium py-1 px-2 rounded-full bg-secondary/70 backdrop-blur-sm"
            >
              Com anéis
            </div>
          </div>
          
          <div class="p-4 space-y-2">
            <div class="flex justify-between items-start">
              <h3 class="text-lg font-semibold group-hover:text-primary transition-colors">
                {{ planet.name }}
              </h3>
              <div class="text-xs text-muted-foreground px-1.5 py-0.5 rounded bg-secondary/30">
                {{ formatDistanceFromSun(planet.distanceFromSun) }}
              </div>
            </div>
            
            <div class="space-y-1 text-sm text-muted-foreground">
              <div class="flex justify-between">
                <span>Diâmetro:</span>
                <span class="font-medium text-foreground">{{ formatDiameter(planet.diameter) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Rotação:</span>
                <span class="font-medium text-foreground">{{ formatRotation(planet.rotationPeriod) }}</span>
              </div>
            </div>
            
            <div class="pt-2 flex justify-end">
              <span class="text-xs text-primary font-medium group-hover:text-primary/80">
                Ver detalhes →
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../store/auth';

export default {
  name: 'PlanetsView',
  setup() {
    const authStore = useAuthStore();
    const planets = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const searchTerm = ref('');
    const filterWithRings = ref(false);
    const sortBy = ref('name');
    
    // Função para buscar os planetas da API
    const fetchPlanets = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        const apiUrl = `${process.env.VUE_APP_API_URL}/planets`;
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Falha ao carregar planetas: ${response.statusText}`);
        }
        
        const data = await response.json();
        planets.value = data;
      } catch (err) {
        error.value = err.message || 'Ocorreu um erro ao buscar os planetas';
        console.error('Error fetching planets:', err);
      } finally {
        loading.value = false;
      }
    };
    
    // Filtragem e ordenação dos planetas
    const filteredPlanets = computed(() => {
      let result = [...planets.value];
      
      // Aplicar filtro de busca
      if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase();
        result = result.filter(planet => 
          planet.name.toLowerCase().includes(term)
        );
      }
      
      // Aplicar filtro de anéis
      if (filterWithRings.value) {
        result = result.filter(planet => planet.hasRings);
      }
      
      // Aplicar ordenação
      result.sort((a, b) => {
        if (sortBy.value === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy.value === 'diameter') {
          return b.diameter - a.diameter;
        } else if (sortBy.value === 'distanceFromSun') {
          return a.distanceFromSun - b.distanceFromSun;
        }
        return 0;
      });
      
      return result;
    });
    
    // Calcular estatísticas
    const planetsWithRings = computed(() => {
      return planets.value.filter(p => p.hasRings).length;
    });
    
    const averageDiameter = computed(() => {
      if (filteredPlanets.value.length === 0) return 0;
      const sum = filteredPlanets.value.reduce((acc, planet) => acc + planet.diameter, 0);
      return Math.round(sum / filteredPlanets.value.length).toLocaleString();
    });
    
    // Funções de formatação
    const formatDiameter = (diameter) => {
      return `${diameter.toLocaleString()} km`;
    };
    
    const formatDistanceFromSun = (distance) => {
      return `${distance.toLocaleString()} milhões km`;
    };
    
    const formatRotation = (days) => {
      if (days >= 1) {
        return `${days} dias`;
      } else {
        // Converter para horas quando for menos de um dia
        const hours = Math.round(days * 24);
        return `${hours} horas`;
      }
    };
    
    // Gerar cor para o planeta baseado no nome
    const getPlanetColor = (name, isShadow = false) => {
      const colors = {
        'Mercúrio': '#A4A5A6',
        'Vênus': '#E8CCA0',
        'Terra': '#2E86C1',
        'Marte': '#CB4335',
        'Júpiter': '#D68910',
        'Saturno': '#F7DC6F',
        'Urano': '#85C1E9',
        'Netuno': '#2874A6',
      };
      
      const defaultColor = '#8E44AD';
      const color = colors[name] || defaultColor;
      
      if (isShadow) {
        return `0 0 20px ${color}, 0 0 60px ${color}40`;
      }
      
      return color;
    };
    
    onMounted(() => {
      fetchPlanets();
    });
    
    return {
      planets,
      filteredPlanets,
      loading,
      error,
      searchTerm,
      filterWithRings,
      sortBy,
      planetsWithRings,
      averageDiameter,
      fetchPlanets,
      formatDiameter,
      formatDistanceFromSun,
      formatRotation,
      getPlanetColor
    };
  }
};
</script>

<style scoped>
.planet-with-rings::before {
  content: '';
  position: absolute;
  width: 40px;
  height: 10px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transform: rotateX(75deg);
  z-index: 1;
}
</style> 