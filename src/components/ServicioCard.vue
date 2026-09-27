<script setup>
import { computed } from 'vue'
import LiquidButton from './LiquidButton.vue'

const props = defineProps({
  servicio: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        typeof value.id === 'number' &&
        typeof value.nombre === 'string' &&
        typeof value.categoria === 'string' &&
        typeof value.descripcion === 'string' &&
        typeof value.precio === 'number' &&
        typeof value.disponible === 'boolean'
      )
    }
  }
})

const emit = defineEmits(['seleccionar'])

const precioFormateado = computed(() => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(props.servicio.precio)
})

function solicitarInfo() {
  if (props.servicio.disponible) {
    emit('seleccionar', props.servicio)
  }
}
</script>

<template>
  <article 
    class="servicio-card"
    :class="{ 'is-unavailable': !servicio.disponible }"
  >
    <div class="card-header">
      <span class="category-badge">{{ servicio.categoria }}</span>
      <span 
        v-if="servicio.disponible" 
        class="status-badge status-available"
      >
        Disponible
      </span>
      <span 
        v-else 
        class="status-badge status-unavailable"
      >
        No disponible
      </span>
    </div>

    <div class="card-body">
      <h3 class="card-title">{{ servicio.nombre }}</h3>
      <p class="card-description">{{ servicio.descripcion }}</p>
    </div>

    <div class="card-footer">
      <div class="price-container">
        <span class="price-label">Valor referencial</span>
        <span class="price-value">{{ precioFormateado }}</span>
      </div>

      <div class="action-container">
        <LiquidButton 
          v-if="servicio.disponible"
          variant="primary"
          size="sm"
          @click="solicitarInfo"
        >
          Solicitar información
        </LiquidButton>

        <LiquidButton 
          v-else
          variant="glass"
          size="sm"
          :disabled="true"
        >
          No disponible
        </LiquidButton>
      </div>
    </div>
  </article>
</template>

<style scoped>
.servicio-card {
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  position: relative;
}

.servicio-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.07);
  border-color: #cbd5e1;
}

.servicio-card.is-unavailable {
  opacity: 0.85;
  background: #f8fafc;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;
  flex-wrap: wrap;
}

.category-badge {
  background-color: var(--color-highlight-light);
  color: var(--color-highlight);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 12px;
  border-radius: 999px;
}

.status-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
}

.status-available {
  background-color: var(--color-accent-light);
  color: var(--color-accent);
}

.status-unavailable {
  background-color: #fee2e2;
  color: var(--color-error);
}

.card-body {
  flex-grow: 1;
  margin-bottom: 20px;
}

.card-title {
  font-size: 1.18rem;
  color: var(--color-neutral);
  line-height: 1.35;
  margin-bottom: 10px;
}

.card-description {
  color: var(--color-muted);
  font-size: 0.92rem;
  line-height: 1.6;
}

.card-footer {
  padding-top: 16px;
  border-top: 1px solid var(--color-base-300);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.price-container {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 0.75rem;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.price-value {
  font-size: 1.25rem;
  font-weight: 800;
  font-family: var(--font-display);
  color: var(--color-primary);
}

.action-container {
  display: flex;
  align-items: center;
}
</style>
