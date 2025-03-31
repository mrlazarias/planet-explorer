<template>
  <div class="flex justify-center items-center min-h-[80vh]">
    <div class="w-full max-w-md p-8 rounded-lg bg-dark-900/80 shadow-xl">
      <h2 class="text-3xl font-bold text-center text-primary-400 mb-6">Sistema Solar Explorer</h2>
      <div class="mb-6">
        <h3 class="text-xl font-medium mb-6">Login</h3>
        <div v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </div>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username" class="block mb-2 font-medium">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="password" class="block mb-2 font-medium">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
              required
            />
          </div>
          <button type="submit" class="btn btn-block mt-6" :disabled="loading">
            {{ loading ? 'Loading...' : 'Login' }}
          </button>
        </form>
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
        errorMsg.value = 'Please enter username and password';
        return;
      }
      
      loading.value = true;
      errorMsg.value = '';
      
      const result = await authStore.login(username.value, password.value);
      
      if (result.success) {
        router.push('/');
      } else {
        errorMsg.value = result.message;
      }
      
      loading.value = false;
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.login-card {
  background: rgba(26, 26, 26, 0.8);
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.login-card h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #64b5f6;
}

.login-form h3 {
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.error-message {
  background: rgba(255, 87, 87, 0.2);
  color: #ff5757;
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style> 