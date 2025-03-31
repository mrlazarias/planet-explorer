<template>
  <div class="relative space-y-8">
    <!-- Efeito decorativo de background -->
    <div class="absolute inset-0 -z-10">
      <div v-if="planet" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full" 
          :style="{
            background: `radial-gradient(circle, ${getPlanetColor(planet.name)}40 0%, transparent 70%)`,
          }">
      </div>
    </div>
    
    <!-- Botão de volta -->
    <div class="mb-6">
      <router-link 
        to="/planets" 
        class="inline-flex items-center gap-2 px-3 py-2 text-sm bg-card border border-border rounded-md hover:bg-secondary/50 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        Voltar para planetas
      </router-link>
    </div>
    
    <!-- Estado de carregamento -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-primary"></div>
    </div>
    
    <!-- Mensagem de erro -->
    <div v-else-if="error" class="bg-destructive/10 border border-destructive/30 rounded-lg p-8 text-center space-y-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-destructive">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" x2="12" y1="8" y2="12"/>
        <line x1="12" x2="12.01" y1="16" y2="16"/>
      </svg>
      <h3 class="text-lg font-medium text-destructive">Erro ao carregar detalhes</h3>
      <p class="text-muted-foreground">{{ error }}</p>
      <button @click="fetchPlanet" class="px-4 py-2 text-sm font-medium bg-card border border-border rounded-md hover:bg-secondary transition-colors">
        Tentar novamente
      </button>
    </div>
    
    <!-- Conteúdo do planeta -->
    <div v-else-if="planet" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Visualização do planeta -->
      <div class="lg:col-span-1 flex flex-col">
        <div class="bg-card border border-border/60 rounded-lg h-full flex flex-col shadow-lg overflow-hidden">
          <div class="p-6 flex items-center justify-center flex-grow relative h-64 bg-gradient-to-br from-background to-secondary/5">
            <!-- Visualização do planeta -->
            <div class="relative">
              <!-- Efeito de órbita -->
              <div class="absolute inset-0 w-[260px] h-[260px] border border-border/20 rounded-full animate-orbit-slow z-0"></div>
              <div class="absolute inset-0 w-[220px] h-[220px] border border-border/15 rounded-full animate-orbit-slow-reverse z-0" style="animation-delay: -5s;"></div>
              
              <!-- Planeta -->
              <div class="relative z-10 flex items-center justify-center">
                <div 
                  class="planet-sphere"
                  :class="{'planet-with-rings-large': planet.hasRings}"
                  :style="{
                    '--planet-color': getPlanetColor(planet.name),
                    '--planet-size': `${getScaledDiameter(planet.diameter)}px`,
                    '--orbit-speed': `${20 + planet.rotationPeriod * 2}s`
                  }"
                ></div>
              </div>
              
              <!-- Badge de planeta com anéis -->
              <div 
                v-if="planet.hasRings" 
                class="absolute top-0 right-0 -translate-y-full translate-x-1/2 text-xs py-1 px-2 rounded-full bg-secondary/70 backdrop-blur-sm"
              >
                Com anéis
              </div>
            </div>
          </div>
          
          <!-- Informações básicas -->
          <div class="p-6 bg-card space-y-2 border-t border-border/60">
            <h2 class="text-2xl font-bold text-center text-foreground relative">
              {{ planet.name }}
              <div class="absolute h-1 w-12 bg-primary/50 rounded-full bottom-0 left-1/2 transform -translate-x-1/2"></div>
            </h2>
            <div class="grid grid-cols-2 gap-4 pt-4">
              <div class="text-center">
                <div class="text-xs text-muted-foreground uppercase tracking-wider">Diâmetro</div>
                <div class="text-xl font-semibold text-foreground mt-1">{{ formatDiameter(planet.diameter) }}</div>
              </div>
              <div class="text-center">
                <div class="text-xs text-muted-foreground uppercase tracking-wider">Distância do Sol</div>
                <div class="text-xl font-semibold text-foreground mt-1">{{ formatDistanceFromSun(planet.distanceFromSun) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Detalhes do planeta -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Descrição -->
        <div class="bg-card border border-border/60 rounded-lg p-6 shadow-lg space-y-4">
          <h3 class="text-xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            Sobre {{ planet.name }}
          </h3>
          <p class="text-muted-foreground leading-relaxed">
            {{ planet.description || `${planet.name} é um planeta do sistema solar com características únicas. Possui um diâmetro de ${formatDiameter(planet.diameter)} e está a uma distância de ${formatDistanceFromSun(planet.distanceFromSun)} do Sol.` }}
          </p>
        </div>
        
        <!-- Características -->
        <div class="bg-card border border-border/60 rounded-lg p-6 shadow-lg space-y-4">
          <h3 class="text-xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
              <path d="M16 13H8"/>
              <path d="M16 17H8"/>
              <path d="M10 9H8"/>
            </svg>
            Características
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Coluna 1 -->
            <div class="space-y-4">
              <div class="space-y-2">
                <div class="text-sm text-muted-foreground">Período de rotação</div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <div class="text-lg font-semibold">
                    {{ formatRotation(planet.rotationPeriod) }}
                  </div>
                </div>
                <div class="w-full bg-background rounded-full h-2">
                  <div class="bg-primary h-full rounded-full" :style="{ width: `${Math.min(planet.rotationPeriod / 100 * 100, 100)}%` }"></div>
                </div>
              </div>
              
              <div class="space-y-2">
                <div class="text-sm text-muted-foreground">Temperatura média</div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
                  </svg>
                  <div class="text-lg font-semibold">
                    {{ formatTemperature(planet.averageTemp) }}
                  </div>
                </div>
                <div class="w-full bg-background rounded-full h-2">
                  <div 
                    class="h-full rounded-full" 
                    :class="getTemperatureClass(planet.averageTemp)"
                    :style="{ width: `${Math.min((planet.averageTemp + 200) / 500 * 100, 100)}%` }"
                  ></div>
                </div>
              </div>
            </div>
            
            <!-- Coluna 2 -->
            <div class="space-y-4">
              <div class="space-y-2">
                <div class="text-sm text-muted-foreground">Número de luas</div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                  </svg>
                  <div class="text-lg font-semibold">
                    {{ planet.moons || 0 }} {{ planet.moons === 1 ? 'lua' : 'luas' }}
                  </div>
                </div>
                <div class="flex gap-1 mt-1">
                  <div 
                    v-for="i in Math.min(planet.moons || 0, 8)" 
                    :key="i" 
                    class="w-4 h-4 rounded-full bg-primary/80"
                  ></div>
                  <div v-if="(planet.moons || 0) > 8" class="text-xs ml-1 text-muted-foreground flex items-center">
                    +{{ planet.moons - 8 }}
                  </div>
                </div>
              </div>
              
              <div class="space-y-2">
                <div class="text-sm text-muted-foreground">Massa (comparada à Terra)</div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.84 1 6.54 2.75"/>
                    <path d="M15 9.33V6a2 2 0 0 0-2-2H3.5A1.5 1.5 0 0 0 2 5.5c0 .83.67 1.5 1.5 1.5H9v.17"/>
                    <path d="M15 17.67V19a2 2 0 0 1-2 2H5.5a1.5 1.5 0 0 1 0-3H13v-.17"/>
                    <path d="m18 16 3-4-3-4"/>
                  </svg>
                  <div class="text-lg font-semibold">
                    {{ formatMass(getMass(planet)) }} × Terra
                  </div>
                </div>
                <div class="w-full bg-background rounded-full h-2">
                  <div 
                    class="bg-primary h-full rounded-full" 
                    :style="{ width: `${Math.min(getMass(planet) / 300 * 100, 100)}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Posição no Sistema Solar -->
        <div class="bg-card border border-border/60 rounded-lg p-6 shadow-lg space-y-4">
          <h3 class="text-xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="4"/>
              <line x1="21.17" x2="12" y1="8" y2="8"/>
              <line x1="3.95" x2="8.54" y1="6.06" y2="14"/>
              <line x1="10.88" x2="15.46" y1="21.94" y2="14"/>
            </svg>
            Posição no Sistema Solar
          </h3>
          <div class="system-view relative h-20 w-full rounded-lg bg-background/50 overflow-hidden">
            <div class="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-yellow-500 shadow-glow-yellow"></div>
            
            <!-- Órbitas decorativas -->
            <div class="orbits absolute inset-0 opacity-40">
              <div class="absolute left-2 top-1/2 transform -translate-y-1/2 w-[80px] h-[2px] rounded-full border-t border-dashed border-border"></div>
              <div class="absolute left-2 top-1/2 transform -translate-y-1/2 w-[120px] h-[2px] rounded-full border-t border-dashed border-border"></div>
              <div class="absolute left-2 top-1/2 transform -translate-y-1/2 w-[170px] h-[2px] rounded-full border-t border-dashed border-border"></div>
              <div class="absolute left-2 top-1/2 transform -translate-y-1/2 w-[240px] h-[2px] rounded-full border-t border-dashed border-border"></div>
              <div class="absolute left-2 top-1/2 transform -translate-y-1/2 w-[330px] h-[2px] rounded-full border-t border-dashed border-border"></div>
              <div class="absolute left-2 top-1/2 transform -translate-y-1/2 w-[420px] h-[2px] rounded-full border-t border-dashed border-border"></div>
              <div class="absolute left-2 top-1/2 transform -translate-y-1/2 w-[520px] h-[2px] rounded-full border-t border-dashed border-border"></div>
              <div class="absolute left-2 top-1/2 transform -translate-y-1/2 w-[620px] h-[2px] rounded-full border-t border-dashed border-border"></div>
            </div>
            
            <!-- Posição do planeta atual -->
            <div 
              class="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full z-20"
              :style="{
                background: getPlanetColor(planet.name),
                boxShadow: getPlanetColor(planet.name, true),
                left: `${2 + planet.distanceFromSun / 5}px`
              }"
            ></div>
            
            <!-- Marcador com nome -->
            <div 
              class="absolute top-1/4 transform -translate-y-1/2 text-xs bg-background/80 backdrop-blur-sm px-1.5 py-0.5 rounded border border-border/50 shadow-md"
              :style="{
                left: `${2 + planet.distanceFromSun / 5}px`
              }"
            >
              {{ planet.name }}
            </div>
          </div>
          <div class="text-sm text-muted-foreground text-center pt-2">
            A distância do planeta ao Sol é aproximadamente {{ formatDistanceFromSun(planet.distanceFromSun) }}.
            <span v-if="planet.distanceFromSun > 200">
              {{ planet.name }} é um dos planetas mais distantes do Sol.
            </span>
            <span v-else-if="planet.distanceFromSun < 100">
              {{ planet.name }} é um dos planetas mais próximos do Sol.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../store/auth';

export default {
  name: 'PlanetDetailView',
  setup() {
    const route = useRoute();
    const authStore = useAuthStore();
    const planet = ref(null);
    const loading = ref(true);
    const error = ref(null);
    
    // Buscar detalhes do planeta
    const fetchPlanet = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        const planetId = route.params.id;
        const apiUrl = `${process.env.VUE_APP_API_URL}/planets/${planetId}`;
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Falha ao carregar detalhes: ${response.statusText}`);
        }
        
        const data = await response.json();
        planet.value = data;
      } catch (err) {
        error.value = err.message || 'Ocorreu um erro ao buscar os detalhes do planeta';
        console.error('Error fetching planet details:', err);
      } finally {
        loading.value = false;
      }
    };
    
    // Formatar diâmetro
    const formatDiameter = (diameter) => {
      return `${diameter.toLocaleString()} km`;
    };
    
    // Formatar distância do sol
    const formatDistanceFromSun = (distance) => {
      return `${distance.toLocaleString()} milhões km`;
    };
    
    // Formatar período de rotação
    const formatRotation = (days) => {
      if (days >= 1) {
        return `${days} dias`;
      } else {
        // Converter para horas quando for menos de um dia
        const hours = Math.round(days * 24);
        return `${hours} horas`;
      }
    };
    
    // Formatar temperatura
    const formatTemperature = (temp) => {
      return `${temp}°C`;
    };
    
    // Obter classe para a barra de temperatura
    const getTemperatureClass = (temp) => {
      if (temp < -50) return 'bg-blue-600';
      if (temp < 0) return 'bg-blue-400';
      if (temp < 30) return 'bg-green-500';
      if (temp < 100) return 'bg-yellow-500';
      return 'bg-red-500';
    };
    
    // Calcular a massa (estimada) baseada no diâmetro
    const getMass = (planet) => {
      // Relação simples: para Terra, diâmetro = 12742, massa = 1
      // Aproximação: massa ~ (diâmetro/12742)^3
      const earthDiameter = 12742;
      return Math.pow(planet.diameter / earthDiameter, 3);
    };
    
    // Formatar massa
    const formatMass = (mass) => {
      if (mass < 0.01) return mass.toFixed(3);
      if (mass < 0.1) return mass.toFixed(2);
      if (mass < 1) return mass.toFixed(1);
      if (mass < 10) return mass.toFixed(1);
      return Math.round(mass);
    };
    
    // Escalar o diâmetro do planeta para visualização
    const getScaledDiameter = (diameter) => {
      // Escala logarítmica para visualização
      // Mínimo 60px, máximo 200px
      const minSize = 60;
      const maxSize = 200;
      const minDiameter = 2000; // Aproximadamente para Mercúrio
      const maxDiameter = 140000; // Aproximadamente para Júpiter
      
      if (diameter <= minDiameter) return minSize;
      if (diameter >= maxDiameter) return maxSize;
      
      // Escala logarítmica
      const logMinDiameter = Math.log(minDiameter);
      const logMaxDiameter = Math.log(maxDiameter);
      const logDiameter = Math.log(diameter);
      
      const scale = (logDiameter - logMinDiameter) / (logMaxDiameter - logMinDiameter);
      return minSize + scale * (maxSize - minSize);
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
      fetchPlanet();
    });
    
    return {
      planet,
      loading,
      error,
      fetchPlanet,
      formatDiameter,
      formatDistanceFromSun,
      formatRotation,
      formatTemperature,
      formatMass,
      getMass,
      getScaledDiameter,
      getPlanetColor,
      getTemperatureClass
    };
  }
};
</script>

<style scoped>
.planet-sphere {
  width: var(--planet-size, 120px);
  height: var(--planet-size, 120px);
  border-radius: 50%;
  background: var(--planet-color, #8E44AD);
  box-shadow: 0 0 20px var(--planet-color, #8E44AD),
              0 0 60px var(--planet-color, #8E44AD)40;
  position: relative;
  animation: rotate var(--orbit-speed, 20s) linear infinite;
}

.planet-with-rings-large::before {
  content: '';
  position: absolute;
  width: 150%;
  height: 20px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transform: rotateX(75deg);
  z-index: -1;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-orbit-slow {
  animation: orbit 30s linear infinite;
}

.animate-orbit-slow-reverse {
  animation: orbit 40s linear infinite reverse;
}

@keyframes orbit {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.shadow-glow-yellow {
  box-shadow: 0 0 15px rgba(255, 200, 0, 0.6),
              0 0 30px rgba(255, 200, 0, 0.3);
}
</style> 