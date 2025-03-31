import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';

// Lazy loading routes
const LoginView = () => import('../views/LoginView.vue');
const HomeView = () => import('../views/HomeView.vue');
const PlanetListView = () => import('../views/PlanetListView.vue');
const PlanetDetailView = () => import('../views/PlanetDetailView.vue');
const PlanetCreateView = () => import('../views/PlanetCreateView.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/planets',
    name: 'planets',
    component: PlanetListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/planets/create',
    name: 'planet-create',
    component: PlanetCreateView,
    meta: { requiresAuth: true }
  },
  {
    path: '/planets/:id',
    name: 'planet-detail',
    component: PlanetDetailView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'router-link-active'
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
