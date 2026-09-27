<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { servicios } from '../data/servicios.js'
import ServicioCard from '../components/ServicioCard.vue'
import LiquidButton from '../components/LiquidButton.vue'
import { servicioSeleccionado, seleccionarServicio, limpiarSeleccion } from '../stores/seleccion.js'

const router = useRouter()

const busqueda = ref('')
const categoriaSeleccionada = ref('Todas')

const categorias = computed(() => {
  const lista = servicios.map(s => s.categoria)
  return ['Todas', ...new Set(lista)]
})

const serviciosFiltrados = computed(() => {
  const texto = busqueda.value.trim().toLowerCase()
  return servicios.filter(s => {
    const coincideNombre = s.nombre.toLowerCase().includes(texto)
    const coincideCategoria = categoriaSeleccionada.value === 'Todas' || s.categoria === categoriaSeleccionada.value
    return coincideNombre && coincideCategoria
  })
})

function limpiarFiltros() {
  busqueda.value = ''
  categoriaSeleccionada.value = 'Todas'
}

function manejarSeleccion(servicio) {
  seleccionarServicio(servicio)
}

function irAContacto() {
  router.push('/contacto')
}
</script>

<template>
  <div class="view-container">
    <header class="section-header-card">
      <div class="section-tag">Catálogo Profesional</div>
      <h2 class="section-title">Nuestros Servicios Tecnológicos</h2>
      <p class="section-lead">
        Explore nuestra oferta integral de servicios especializados. Seleccione el servicio de su interés para solicitar información o cotización personalizada.
      </p>
    </header>

    <!-- Banner de Servicio Seleccionado -->
    <section v-if="servicioSeleccionado" class="selected-banner">
      <div class="banner-content">
        <span class="banner-label">Servicio seleccionado:</span>
        <strong class="banner-title">{{ servicioSeleccionado.nombre }}</strong>
        <span class="banner-category">({{ servicioSeleccionado.categoria }})</span>
      </div>

      <div class="banner-actions">
        <LiquidButton 
          variant="glass" 
          size="sm" 
          @click="limpiarSeleccion"
        >
          Quitar selección
        </LiquidButton>

        <LiquidButton 
          variant="primary" 
          size="sm" 
          @click="irAContacto"
        >
          Ir a contacto
        </LiquidButton>
      </div>
    </section>

    <!-- Barra de Filtros y Búsqueda -->
    <section class="filters-card">
      <div class="filter-group search-group">
        <label for="search-input" class="filter-label">Buscar por nombre:</label>
        <input 
          id="search-input"
          v-model="busqueda"
          type="text" 
          class="filter-input"
          placeholder="Ej: Mantenimiento, Redes, Web..."
        />
      </div>

      <div class="filter-group category-group">
        <label for="category-select" class="filter-label">Filtrar por categoría:</label>
        <select 
          id="category-select"
          v-model="categoriaSeleccionada"
          class="filter-select"
        >
          <option v-for="cat in categorias" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>

      <div class="results-counter">
        <span class="counter-text">
          Mostrando <strong>{{ serviciosFiltrados.length }}</strong> de {{ servicios.length }} servicios
        </span>
      </div>
    </section>

    <!-- Lista de Servicios o Estado Vacío -->
    <div v-if="serviciosFiltrados.length > 0" class="servicios-grid">
      <ServicioCard 
        v-for="servicio in serviciosFiltrados" 
        :key="servicio.id" 
        :servicio="servicio"
        @seleccionar="manejarSeleccion"
      />
    </div>

    <div v-else class="empty-state-card">
      <div class="empty-icon">🔍</div>
      <h3 class="empty-title">No encontramos servicios con ese criterio</h3>
      <p class="empty-description">
        Intente ajustando el término de búsqueda o seleccionando otra categoría en el filtro superior.
      </p>
      <LiquidButton 
        variant="default" 
        size="md" 
        @click="limpiarFiltros"
      >
        Limpiar filtros
      </LiquidButton>
    </div>
  </div>
</template>

<style scoped>
.view-container {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.section-header-card {
  background: var(--color-base-200);
  border-radius: 24px;
  border: 1px solid var(--color-base-300);
  padding: 36px 30px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.section-tag {
  display: inline-block;
  background-color: var(--color-highlight-light);
  color: var(--color-highlight);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 6px 16px;
  border-radius: 999px;
  margin-bottom: 14px;
}

.section-title {
  font-size: 1.85rem;
  color: var(--color-neutral);
  margin-bottom: 10px;
}

.section-lead {
  font-size: 1.05rem;
  color: var(--color-muted);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.65;
}

/* Banner de Servicio Seleccionado */
.selected-banner {
  background: linear-gradient(135deg, #e0f2fe 0%, #ccfbf1 100%);
  border: 1px solid #7dd3fc;
  border-radius: 20px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  box-shadow: 0 6px 20px rgba(2, 132, 199, 0.1);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  color: var(--color-neutral);
}

.banner-label {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.banner-title {
  font-size: 1.05rem;
  color: var(--color-neutral);
}

.banner-category {
  font-size: 0.9rem;
  color: var(--color-muted);
}

.banner-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* Filtros */
.filters-card {
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.02);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-group {
  flex: 2;
  min-width: 240px;
}

.category-group {
  flex: 1;
  min-width: 200px;
}

.filter-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-neutral);
}

.filter-input,
.filter-select {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid var(--color-base-300);
  background: var(--color-base-100);
  color: var(--color-neutral);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.filter-input:focus,
.filter-select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
}

.results-counter {
  display: flex;
  align-items: center;
  padding-bottom: 8px;
}

.counter-text {
  font-size: 0.9rem;
  color: var(--color-muted);
}

.counter-text strong {
  color: var(--color-primary);
}

/* Grilla de Servicios */
.servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

/* Estado Vacío */
.empty-state-card {
  background: var(--color-base-200);
  border: 1px dashed var(--color-base-300);
  border-radius: 20px;
  padding: 48px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.empty-icon {
  font-size: 2.2rem;
  margin-bottom: 4px;
}

.empty-title {
  font-size: 1.3rem;
  color: var(--color-neutral);
}

.empty-description {
  color: var(--color-muted);
  font-size: 0.96rem;
  max-width: 480px;
  margin-bottom: 12px;
}

@media (max-width: 640px) {
  .servicios-grid {
    grid-template-columns: 1fr;
  }

  .filters-card {
    flex-direction: column;
    align-items: stretch;
  }

  .selected-banner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
