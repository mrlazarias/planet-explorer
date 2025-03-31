import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/globals.css';
import './assets/tailwind.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Inicializar o estado de autenticação
import { useAuthStore } from './store/auth';
const authStore = useAuthStore();
authStore.initializeAuth();

app.mount('#app');
