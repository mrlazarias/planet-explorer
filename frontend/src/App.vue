<template>
  <div class="min-h-screen flex flex-col">
    <nav v-if="isAuthenticated" class="bg-dark-900 py-4 mb-6 shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-primary-400">Sistema Solar Explorer</h1>
          <div class="flex gap-6">
            <router-link to="/" class="text-gray-200 hover:text-primary-400 transition-colors">Home</router-link>
            <router-link to="/planets" class="text-gray-200 hover:text-primary-400 transition-colors">Planetas</router-link>
            <a href="#" @click.prevent="logout" class="text-gray-200 hover:text-primary-400 transition-colors">Logout</a>
          </div>
        </div>
      </div>
    </nav>
    <main class="container mx-auto px-4 flex-grow">
      <router-view />
    </main>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useAuthStore } from './store/auth';

export default {
  name: 'App',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    
    const logout = () => {
      authStore.logout();
      router.push('/login');
    };
    
    return {
      isAuthenticated,
      logout
    };
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Space Grotesk', sans-serif;
  background: #121212;
  color: #f5f5f5;
  line-height: 1.6;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

nav {
  background: #1a1a1a;
  padding: 1.5rem 0;
  margin-bottom: 2rem;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: #f5f5f5;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #64b5f6;
}

h1 {
  color: #64b5f6;
  font-weight: 700;
}

router-link-active {
  color: #64b5f6 !important;
  font-weight: 600;
}

main {
  padding: 2rem 0;
}

.btn {
  display: inline-block;
  background: #64b5f6;
  color: #fff;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  font-family: inherit;
  transition: opacity 0.3s;
}

.btn:hover {
  opacity: 0.9;
}

.btn-block {
  display: block;
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #333;
  background: #1e1e1e;
  color: #f5f5f5;
  border-radius: 5px;
}

.form-control:focus {
  outline: none;
  border-color: #64b5f6;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
</style>
