<template>
  <div class="relative">
    <!-- Nebulosa de fundo -->
    <div class="nebula"></div>
    
    <!-- Cabeçalho com animação -->
    <div class="mb-10">
      <div class="relative overflow-hidden">
        <h1 class="text-5xl md:text-6xl font-bold mb-3">
          <span class="text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">Bem-vindo</span>
          <span class="text-foreground"> ao </span>
          <span class="text-accent drop-shadow-[0_0_8px_rgba(147,51,234,0.5)]">Sistema Solar</span>
        </h1>
        <div class="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
      </div>
      <p class="text-xl text-muted-foreground mt-4 max-w-3xl leading-relaxed">
        Explore todos os planetas do sistema solar em uma interface interativa. Descubra detalhes fascinantes sobre cada planeta e suas características únicas.
      </p>
      
      <!-- Dashboard de estatísticas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        <!-- Total de planetas -->
        <div class="planet-card bg-gradient-to-br from-card/80 to-card/60 border-primary/20">
          <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-[100px] bg-primary/5"></div>
          <div class="p-6 relative z-10">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium">Planetas</h3>
              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
            </div>
            <p class="text-4xl font-bold mt-4 flex items-baseline">
              <span class="mr-1">{{ planetsCount }}</span>
              <span class="text-sm text-muted-foreground">/8</span>
            </p>
            <div class="flex justify-between items-center mt-3">
              <span class="text-sm text-muted-foreground">Total de planetas</span>
              <span class="text-sm text-primary">100%</span>
            </div>
            <!-- Barra de progresso -->
            <div class="mt-2 w-full bg-secondary/30 rounded-full h-1.5">
              <div class="bg-primary h-1.5 rounded-full" :style="`width: ${(planetsCount / 8) * 100}%`"></div>
            </div>
          </div>
        </div>
        
        <!-- Planetas com anéis -->
        <div class="planet-card bg-gradient-to-br from-card/80 to-card/60 border-success/20">
          <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-[100px] bg-success/5"></div>
          <div class="p-6 relative z-10">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium">Com anéis</h3>
              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-success/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-success">
                  <circle cx="12" cy="12" r="10" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" />
                </svg>
              </div>
            </div>
            <p class="text-4xl font-bold mt-4 flex items-baseline">
              <span class="mr-1">{{ planetsWithRings }}</span>
              <span class="text-sm text-muted-foreground">/{{ planetsCount }}</span>
            </p>
            <div class="flex justify-between items-center mt-3">
              <span class="text-sm text-muted-foreground">Planetas com anéis</span>
              <span class="text-sm text-success">{{ Math.round((planetsWithRings / planetsCount) * 100) }}%</span>
            </div>
            <!-- Barra de progresso -->
            <div class="mt-2 w-full bg-secondary/30 rounded-full h-1.5">
              <div class="bg-success h-1.5 rounded-full" :style="`width: ${(planetsWithRings / planetsCount) * 100}%`"></div>
            </div>
          </div>
        </div>
        
        <!-- Maior planeta -->
        <div class="planet-card bg-gradient-to-br from-card/80 to-card/60 border-accent/20">
          <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-[100px] bg-accent/5"></div>
          <div class="p-6 relative z-10">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium">Maior planeta</h3>
              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
            </div>
            <p class="text-2xl font-bold mt-4">{{ largestPlanet?.name || '-' }}</p>
            <div class="flex justify-between items-center mt-3">
              <span class="text-sm text-muted-foreground">Diâmetro</span>
              <span class="text-sm text-accent">{{ largestPlanet ? formatNumber(largestPlanet.diameter) + ' km' : '-' }}</span>
            </div>
            
            <div class="mt-4 flex items-center gap-2" v-if="largestPlanet">
              <div v-for="(n, i) in 5" :key="i" class="h-1 rounded-full" 
                  :class="i < 5 ? 'bg-accent/70 w-10' : 'bg-secondary/30 w-5'"
                  :style="{ opacity: 1 - (i * 0.15) }"></div>
            </div>
          </div>
        </div>
        
        <!-- Planeta mais distante -->
        <div class="planet-card bg-gradient-to-br from-card/80 to-card/60 border-primary/20">
          <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-[100px] bg-primary/5"></div>
          <div class="p-6 relative z-10">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium">Mais distante</h3>
              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                </svg>
              </div>
            </div>
            <p class="text-2xl font-bold mt-4">{{ farthestPlanet?.name || '-' }}</p>
            <div class="flex justify-between items-center mt-3">
              <span class="text-sm text-muted-foreground">Distância do Sol</span>
              <span class="text-sm text-primary">{{ farthestPlanet ? formatNumber(farthestPlanet.distanceFromSun) + ' mi km' : '-' }}</span>
            </div>
            
            <div class="mt-4 flex items-center gap-1" v-if="farthestPlanet">
              <div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
              <div class="h-px flex-1 bg-primary/30"></div>
              <div class="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Visualização do sistema solar aprimorada -->
    <div class="planet-card bg-card/60 backdrop-blur-xl border-border/30 overflow-hidden mt-10 relative">
      <div class="absolute -top-[250px] -right-[250px] w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-[200px] -left-[200px] w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"></div>
      
      <!-- Header com decoração -->
      <div class="card-header relative z-10">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-primary">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          <h2 class="card-title">Sistema Solar</h2>
        </div>
        <p class="card-description">Visualização em escala relativa dos planetas com suas órbitas</p>
      </div>
      
      <div class="p-6 pt-2 flex flex-col items-center relative z-10">
        <!-- Sistema solar -->
        <div v-if="loading" class="loading-indicator h-40 w-full">
          <svg class="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-muted-foreground mt-4">Carregando o sistema solar...</p>
        </div>
        
        <div v-else-if="planets.length > 0" class="relative w-full overflow-x-auto solar-system-view py-24 mt-4">
          <!-- Sol -->
          <div class="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center z-10">
            <div class="sun w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full shadow-lg shadow-amber-500/50 animate-pulse"></div>
            <span class="mt-2 text-xs text-muted-foreground font-medium">Sol</span>
          </div>
          
          <!-- Planetas com órbitas -->
          <div class="flex items-center justify-start pl-24 space-x-24 relative">
            <!-- Linha de órbita -->
            <div class="absolute top-1/2 left-0 w-full h-px bg-border/20"></div>
            
            <!-- Decoração de orbitas -->
            <div v-for="(planet, index) in sortedPlanets" :key="`orbit-${planet._id}`"
                 class="orbital-ring absolute top-1/2 left-4"
                 :style="{
                   width: `${40 + index * 48}px`,
                   height: `${40 + index * 48}px`,
                   marginLeft: `${-20 - index * 24}px`,
                   marginTop: `${-20 - index * 24}px`,
                 }">
            </div>
            
            <div 
              v-for="planet in sortedPlanets" 
              :key="planet._id" 
              class="flex flex-col items-center group"
            >
              <router-link 
                :to="`/planets/${planet._id}`" 
                class="relative"
              >
                <div 
                  class="rounded-full shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                  :class="getPlanetColor(planet.name)"
                  :style="{
                    width: getPlanetSize(planet.diameter) + 'px',
                    height: getPlanetSize(planet.diameter) + 'px'
                  }"
                >
                  <!-- Anéis para planetas que os possuem -->
                  <div v-if="planet.hasRings" 
                       class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent border border-gray-400/30 rounded-full"
                       :style="{
                         width: `${getPlanetSize(planet.diameter) * 1.8}px`,
                         height: `${getPlanetSize(planet.diameter) * 0.5}px`,
                         transform: 'translate(-50%, -50%) rotate(30deg)'
                       }">
                  </div>
                </div>
                
                <!-- Tooltip com informações do planeta -->
                <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity w-48 bg-card/95 backdrop-blur-xl p-3 rounded-lg shadow-xl border border-border/50 z-20 pointer-events-none">
                  <h4 class="font-medium text-sm text-primary mb-1">{{ planet.name }}</h4>
                  <div class="space-y-1 text-xs">
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Diâmetro:</span>
                      <span>{{ formatNumber(planet.diameter) }} km</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Rotação:</span>
                      <span>{{ planet.rotationPeriod }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Distância:</span>
                      <span>{{ formatNumber(planet.distanceFromSun) }} mi km</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">Anéis:</span>
                      <span>{{ planet.hasRings ? 'Sim' : 'Não' }}</span>
                    </div>
                  </div>
                  <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-card/95 border-r border-b border-border/50 transform rotate-45"></div>
                </div>
              </router-link>
              <router-link 
                :to="`/planets/${planet._id}`" 
                class="mt-2 text-xs font-medium hover:text-primary transition-colors"
              >
                {{ planet.name }}
              </router-link>
            </div>
          </div>
        </div>
        
        <!-- Mensagem de nenhum planeta -->
        <div v-else class="p-8 text-center">
          <p class="text-muted-foreground">Nenhum planeta encontrado no sistema solar.</p>
        </div>
      </div>
      
      <div class="card-footer justify-end relative z-10">
        <router-link to="/planets" class="btn-primary group">
          <span>Ver todos os planetas</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 group-hover:translate-x-1 transition-transform">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { usePlanetsStore } from '../store/planets';

export default {
  name: 'HomeView',
  setup() {
    const planetsStore = usePlanetsStore();
    
    onMounted(() => {
      planetsStore.fetchPlanets();
    });
    
    const planets = computed(() => planetsStore.getPlanets);
    const loading = computed(() => planetsStore.isLoading);
    
    const sortedPlanets = computed(() => {
      return [...planets.value].sort((a, b) => a.distanceFromSun - b.distanceFromSun);
    });
    
    const planetsCount = computed(() => planets.value.length);
    
    const planetsWithRings = computed(() => {
      return planets.value.filter(planet => planet.hasRings).length;
    });
    
    const largestPlanet = computed(() => {
      if (planets.value.length === 0) return null;
      return planets.value.reduce((largest, planet) => {
        return planet.diameter > largest.diameter ? planet : largest;
      }, planets.value[0]);
    });
    
    const farthestPlanet = computed(() => {
      if (planets.value.length === 0) return null;
      return planets.value.reduce((farthest, planet) => {
        return planet.distanceFromSun > farthest.distanceFromSun ? planet : farthest;
      }, planets.value[0]);
    });
    
    const formatNumber = (num) => {
      return new Intl.NumberFormat().format(num);
    };
    
    const getPlanetSize = (diameter) => {
      // Base size
      const baseSize = 8;
      
      // Create a logarithmic scale to prevent giant planets from dominating
      const size = baseSize + Math.log(diameter / 1000) * 12;
      
      // Ensure minimum size
      return Math.max(size, 16);
    };
    
    const getPlanetColor = (name) => {
      const colors = {
        'Mercury': 'bg-gradient-to-br from-gray-400 to-gray-600',
        'Venus': 'bg-gradient-to-br from-amber-300 to-yellow-600',
        'Earth': 'bg-gradient-to-br from-blue-400 to-blue-700',
        'Mars': 'bg-gradient-to-br from-red-400 to-red-700',
        'Jupiter': 'bg-gradient-to-br from-amber-300 to-amber-700',
        'Saturn': 'bg-gradient-to-br from-yellow-300 to-yellow-600',
        'Uranus': 'bg-gradient-to-br from-cyan-300 to-cyan-600',
        'Neptune': 'bg-gradient-to-br from-blue-400 to-blue-800'
      };
      
      return colors[name] || 'bg-gradient-to-br from-gray-400 to-gray-600';
    };
    
    return {
      planets,
      loading,
      sortedPlanets,
      planetsCount,
      planetsWithRings,
      largestPlanet,
      farthestPlanet,
      formatNumber,
      getPlanetSize,
      getPlanetColor
    };
  }
};
</script>

<style scoped>
.solar-system-view {
  min-width: 100%;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--primary)) hsl(var(--card));
}

.solar-system-view::-webkit-scrollbar {
  height: 6px;
}

.solar-system-view::-webkit-scrollbar-track {
  background: hsl(var(--card));
  border-radius: 3px;
}

.solar-system-view::-webkit-scrollbar-thumb {
  background-color: hsl(var(--primary));
  border-radius: 3px;
}

.sun {
  position: relative;
}

.sun::before {
  content: '';
  position: absolute;
  inset: -5px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(5px);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style> 