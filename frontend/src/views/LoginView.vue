<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4 relative">
    <!-- Efeitos de fundo -->
    <div class="stars">
      <div v-for="i in 100" :key="i" class="star" 
           :style="{
             left: `${Math.random() * 100}%`, 
             top: `${Math.random() * 100}%`,
             '--duration': `${5 + Math.random() * 10}s`
           }">
      </div>
    </div>
    
    <div class="nebula"></div>
    
    <!-- Planeta decorativo -->
    <div class="absolute opacity-10 w-[800px] h-[800px] rounded-full bg-accent/20 blur-3xl -right-[400px] -top-[400px]"></div>
    <div class="absolute opacity-10 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl -left-[300px] -bottom-[300px]"></div>
    
    <div class="w-full max-w-md z-10">
      <!-- Logo animado -->
      <div class="text-center mb-8">
        <div class="inline-flex p-5 rounded-full bg-card border border-border/60 mb-5 relative overflow-hidden shadow-2xl">
          <div class="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 animate-pulse"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-primary mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Planet Explorer</h1>
        <p class="text-xl text-muted-foreground">Explore o sistema solar em uma nova dimensão</p>
      </div>

      <!-- Card de login com efeitos visuais -->
      <div class="planet-card relative backdrop-blur-xl bg-card/60 border-border/40 shadow-2xl">
        <!-- Brilho sutil na borda superior -->
        <div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div class="card-header">
          <h2 class="card-title text-2xl">Acesso à Estação</h2>
          <p class="card-description">Entre com suas credenciais para continuar a exploração</p>
        </div>
        
        <div class="card-content">
          <!-- Mensagem de erro com animação -->
          <div v-if="errorMsg" 
               class="mb-6 p-4 rounded-md border border-destructive/30 bg-destructive/10 text-destructive-foreground flex items-center gap-3 animate-[shake_0.5s_ease-in-out]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <span>{{ errorMsg }}</span>
          </div>
          
          <form @submit.prevent="handleLogin" class="space-y-4">
            <!-- Campo de usuário com ícone -->
            <div class="space-y-2">
              <label for="username" class="label flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Nome de usuário
              </label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="username"
                  v-model="username"
                  class="input pl-10"
                  placeholder="Insira seu nome de usuário"
                  required
                  autocomplete="username"
                />
              </div>
            </div>
            
            <!-- Campo de senha com ícone -->
            <div class="space-y-2">
              <label for="password" class="label flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Senha
              </label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="input pl-10"
                  placeholder="Insira sua senha"
                  required
                  autocomplete="current-password"
                />
              </div>
            </div>
            
            <!-- Botão de login com efeito -->
            <div class="mt-8">
              <button type="submit" class="btn-primary w-full h-11 text-base font-medium" :disabled="loading">
                <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ loading ? 'Conectando...' : 'Acessar o Sistema' }}</span>
              </button>
            </div>
          </form>
        </div>
        
        <!-- Credenciais com visual melhorado -->
        <div class="card-footer flex-col items-start space-y-3">
          <div class="w-full border-t border-border/30 pt-4">
            <div class="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <p class="text-sm font-medium text-primary">Credenciais para teste:</p>
            </div>
            <div class="text-xs bg-secondary/30 p-3 rounded-md w-full border border-secondary/40">
              <div class="flex justify-between mb-1">
                <span class="text-muted-foreground">Usuário:</span>
                <span class="font-mono font-medium">test</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Senha:</span>
                <span class="font-mono font-medium">123456</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Versão e rodapé -->
      <div class="mt-8 text-center text-xs text-muted-foreground opacity-70">
        <p>Planet Explorer v1.0.0 &copy; {{ new Date().getFullYear() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    const username = ref('');
    const password = ref('');
    const loading = ref(false);
    const errorMsg = ref('');
    
    const handleLogin = async () => {
      if (!username.value || !password.value) {
        errorMsg.value = 'Por favor, informe usuário e senha';
        return;
      }
      
      loading.value = true;
      errorMsg.value = '';
      
      try {
        const result = await authStore.login(username.value, password.value);
        
        if (result.success) {
          router.push('/');
        } else {
          errorMsg.value = result.message || 'Usuário ou senha inválidos';
        }
      } catch (error) {
        errorMsg.value = 'Erro ao conectar ao servidor';
        console.error('Login error:', error);
      } finally {
        loading.value = false;
      }
    };
    
    return {
      username,
      password,
      loading,
      errorMsg,
      handleLogin
    };
  }
};
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
</style> 