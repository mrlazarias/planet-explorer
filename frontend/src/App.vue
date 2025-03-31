<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Efeitos de fundo -->
    <div class="stars" v-if="isAuthenticated">
      <div v-for="i in 100" :key="i" class="star" 
           :style="{
             left: `${Math.random() * 100}%`, 
             top: `${Math.random() * 100}%`,
             '--duration': `${5 + Math.random() * 10}s`
           }">
      </div>
    </div>
    
    <div class="nebula" v-if="isAuthenticated"></div>
    
    <!-- Navbar principal com design futurista -->
    <header v-if="isAuthenticated" class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div class="container flex h-16 items-center">
        <!-- Logo com animação sutil -->
        <div class="flex items-center space-x-2 mr-6">
          <div class="relative flex items-center justify-center w-8 h-8">
            <div class="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary drop-shadow-[0_0_4px_rgba(59,130,246,0.7)]">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <span class="text-lg font-bold tracking-tight">
            <span class="text-primary">Planet</span>
            <span class="text-foreground">Explorer</span>
          </span>
        </div>
        
        <!-- Links de navegação com indicadores -->
        <nav class="flex items-center space-x-6">
          <router-link 
            to="/" 
            class="relative py-2 text-sm font-medium transition-colors hover:text-primary"
            :class="{ 'text-primary': $route.path === '/' }"
          >
            <div class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Home</span>
            </div>
            <div v-if="$route.path === '/'" class="absolute h-0.5 w-full bottom-0 left-0 bg-primary rounded-full"></div>
          </router-link>
          
          <router-link 
            to="/planets" 
            class="relative py-2 text-sm font-medium transition-colors hover:text-primary"
            :class="{ 'text-primary': $route.path.includes('/planets') }"
          >
            <div class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="21.17" x2="12" y1="8" y2="8" />
                <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
                <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
              </svg>
              <span>Planetas</span>
            </div>
            <div v-if="$route.path.includes('/planets')" class="absolute h-0.5 w-full bottom-0 left-0 bg-primary rounded-full"></div>
          </router-link>
        </nav>
        
        <!-- Menu do usuário com dropdown elegante -->
        <div class="ml-auto flex items-center space-x-4">
          <div class="relative inline-block">
            <button 
              @click="showUserMenu = !showUserMenu" 
              class="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-sm font-medium border border-border/50 transition-all hover:border-primary/50 hover:bg-secondary/70"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{{ userDisplay }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground" :class="{'rotate-180': showUserMenu}">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            
            <!-- Dropdown aprimorado -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div v-if="showUserMenu" 
                   class="absolute right-0 mt-2 w-56 rounded-md bg-card/90 shadow-lg border border-border/50 py-1 backdrop-blur-lg z-50"
                   @click.outside="showUserMenu = false">
                <div class="px-4 py-3 border-b border-border/30">
                  <p class="text-sm text-muted-foreground">Conectado como</p>
                  <p class="text-sm font-medium truncate">{{ userDisplay }}</p>
                </div>
                <button @click="logout" class="w-full flex items-center px-4 py-2 text-left text-sm text-destructive hover:bg-secondary/50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                  </svg>
                  Sair do sistema
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </header>

    <!-- Conteúdo principal com animações de transição -->
    <main class="flex-1 container py-8">
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
    </main>

    <!-- Rodapé com design melhorado -->
    <footer v-if="isAuthenticated" class="border-t border-border/40 bg-card/20 backdrop-blur-sm">
      <div class="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <div class="flex items-center gap-2 text-center text-sm text-muted-foreground md:text-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
            <circle cx="12" cy="12" r="10" />
            <path d="m16.2 7.8-2 6.3-6.4 2.1 2-6.3z" />
          </svg>
          <p>&copy; {{ new Date().getFullYear() }} Planet Explorer. Todos os direitos reservados.</p>
        </div>
        <div class="flex items-center gap-4">
          <p class="text-center text-sm text-muted-foreground">Versão 1.0.0</p>
          <a href="#" class="text-sm text-muted-foreground hover:text-primary transition-colors">Sobre</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { useAuthStore } from './store/auth';

export default {
  name: 'App',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const showUserMenu = ref(false);
    
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const userDisplay = computed(() => {
      return authStore.user?.username || 'Usuário';
    });
    
    const logout = () => {
      authStore.logout();
      router.push('/login');
      showUserMenu.value = false;
    };
    
    return {
      isAuthenticated,
      userDisplay,
      showUserMenu,
      logout
    };
  },
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
      },
    },
  }
};
</script>

<style>
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Transições de página */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
