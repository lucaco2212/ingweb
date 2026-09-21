<script setup>
</script>

<template>
  <div class="view-container">
    <div class="header-card">
      <div class="section-tag">Catálogo Profesional</div>
      <h2 class="section-title">Nuestros Servicios Tecnológicos</h2>
      <p class="section-lead">
        Ofrecemos soluciones integrales adaptadas a las necesidades específicas de cada cliente.
      </p>
    </div>

    <div class="provisional-card">
      <h3>Módulo de Servicios en Configuración</h3>
      <p>El catálogo completo e interactivo de servicios tecnológicos estará disponible en la siguiente etapa del sistema.</p>
    </div>
  </div>
</template>

<style scoped>
.view-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header-card {
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
  max-width: 650px;
  margin: 0 auto;
}

.provisional-card {
  background: var(--color-base-200);
  border: 1px dashed var(--color-base-300);
  border-radius: 20px;
  padding: 48px 24px;
  text-align: center;
}

.provisional-card h3 {
  font-size: 1.25rem;
  color: var(--color-neutral);
  margin-bottom: 10px;
}

.provisional-card p {
  color: var(--color-muted);
  font-size: 0.98rem;
}
</style>
