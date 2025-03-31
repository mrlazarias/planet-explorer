<template>
  <div>
    <router-link to="/planets" class="inline-block mb-8 text-primary-400 hover:text-primary-500 transition-colors font-medium">
      &larr; Voltar para planetas
    </router-link>
    
    <div class="bg-dark-900/80 rounded-lg p-8 shadow-xl">
      <h2 class="text-2xl font-bold text-primary-400 mb-8 text-center">Adicionar Novo Planeta</h2>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleSubmit" class="max-w-xl mx-auto">
        <div class="form-group">
          <label for="name" class="block mb-2 font-medium">Nome do Planeta</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            class="form-control"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="diameter" class="block mb-2 font-medium">Diâmetro (km)</label>
          <input
            type="number"
            id="diameter"
            v-model.number="formData.diameter"
            class="form-control"
            min="1"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="rotationPeriod" class="block mb-2 font-medium">Período de Rotação</label>
          <input
            type="text"
            id="rotationPeriod"
            v-model="formData.rotationPeriod"
            class="form-control"
            placeholder="ex: 24 horas, 10.5 dias"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="distanceFromSun" class="block mb-2 font-medium">Distância do Sol (milhões km)</label>
          <input
            type="number"
            id="distanceFromSun"
            v-model.number="formData.distanceFromSun"
            class="form-control"
            step="0.1"
            min="0"
            required
          />
        </div>
        
        <div class="form-group flex items-center">
          <label class="flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="formData.hasRings"
              class="w-4 h-4 mr-2 bg-dark-700 border-dark-600 rounded focus:ring-primary-500"
            />
            <span>Este planeta possui anéis?</span>
          </label>
        </div>
        
        <div class="form-group">
          <label for="imageUrl" class="block mb-2 font-medium">URL da Imagem</label>
          <input
            type="url"
            id="imageUrl"
            v-model="formData.imageUrl"
            class="form-control"
            placeholder="https://exemplo.com/imagem.jpg"
            required
          />
        </div>
        
        <div class="mt-8">
          <button type="submit" class="btn btn-block" :disabled="loading">
            {{ loading ? 'Salvando...' : 'Adicionar Planeta' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePlanetsStore } from '../store/planets';

export default {
  name: 'PlanetCreateView',
  setup() {
    const router = useRouter();
    const planetsStore = usePlanetsStore();
    
    const loading = ref(false);
    const error = ref(null);
    
    const formData = reactive({
      name: '',
      diameter: null,
      rotationPeriod: '',
      distanceFromSun: null,
      hasRings: false,
      imageUrl: ''
    });
    
    const handleSubmit = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        const result = await planetsStore.createPlanet(formData);
        
        if (result.success) {
          router.push('/planets');
        } else {
          error.value = result.error;
        }
      } catch (err) {
        error.value = 'Erro ao adicionar planeta. Tente novamente.';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };
    
    return {
      formData,
      loading,
      error,
      handleSubmit
    };
  }
};
</script>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: #64b5f6;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
}

.back-link:hover {
  opacity: 0.8;
}

.create-form-container {
  background: rgba(26, 26, 26, 0.8);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.create-form-container h2 {
  color: #64b5f6;
  margin-bottom: 2rem;
  text-align: center;
}

.create-form {
  max-width: 600px;
  margin: 0 auto;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group input {
  margin-right: 0.5rem;
}

.form-action {
  margin-top: 2rem;
}

.error-message {
  background: rgba(255, 87, 87, 0.2);
  color: #ff5757;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;
}
</style> 