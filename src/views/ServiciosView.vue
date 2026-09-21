<script setup>
import { servicios } from '../data/servicios.js'
import ServicioCard from '../components/ServicioCard.vue'
</script>

<template>
  <div class="view-container">
    <header class="section-header-card">
      <div class="section-tag">Catálogo Profesional</div>
      <h2 class="section-title">Nuestros Servicios Tecnológicos</h2>
      <p class="section-lead">
        Ponemos a su disposición un portafolio integral de soluciones especializadas para particulares, profesionales y empresas en la Región de Ñuble.
      </p>
    </header>

    <div class="servicios-grid">
      <ServicioCard 
        v-for="servicio in servicios" 
        :key="servicio.id" 
        :servicio="servicio" 
      />
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

.servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

@media (max-width: 640px) {
  .servicios-grid {
    grid-template-columns: 1fr;
  }
}
</style>
