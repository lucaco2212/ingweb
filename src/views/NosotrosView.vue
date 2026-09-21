<script setup>
</script>

<template>
  <div class="view-container">
    <section class="card-section">
      <div class="section-tag">Nuestra Identidad</div>
      <h2 class="section-title">Sobre TecnoSoporte Ñuble</h2>
      <p class="section-lead">
        Somos una empresa regional comprometida con entregar servicios tecnológicos confiables, transparentes y de alto estándar técnico para personas, profesionales y organizaciones de la Región de Ñuble.
      </p>
    </section>

    <div class="pillars-grid">
      <div class="pillar-card">
        <h3 class="pillar-title">Misión</h3>
        <p class="pillar-text">
          Proveer soluciones tecnológicas integrales que optimicen la infraestructura informática, potencien la presencia digital y resuelvan contingencias técnicas con agilidad, honestidad y cercanía profesional.
        </p>
      </div>

      <div class="pillar-card">
        <h3 class="pillar-title">Visión</h3>
        <p class="pillar-text">
          Consolidarnos como el principal aliado tecnológico de referencia en la Región de Ñuble, reconocidos por nuestra capacidad técnica, atención personalizada y aporte al desarrollo digital de la comunidad.
        </p>
      </div>

      <div class="pillar-card">
        <h3 class="pillar-title">Propósito</h3>
        <p class="pillar-text">
          Democratizar el acceso a soporte técnico calificado y herramientas digitales modernas, permitiendo que cada usuario y organización aproveche al máximo el potencial de la tecnología sin complicaciones.
        </p>
      </div>
    </div>

    <section class="values-section">
      <h3 class="values-heading">Nuestros Principios de Trabajo</h3>
      <div class="values-grid">
        <div class="value-item">
          <h4>Rigor Técnico</h4>
          <p>Diagnósticos basados en metodologías formales y estándares de la industria.</p>
        </div>
        <div class="value-item">
          <h4>Transparencia Total</h4>
          <p>Presupuestos claros, plazos definidos y comunicación fluida en cada etapa del servicio.</p>
        </div>
        <div class="value-item">
          <h4>Compromiso Local</h4>
          <p>Presencia y atención dedicada a las necesidades concretas de la comunidad regional.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.view-container {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.card-section {
  background: var(--color-base-200);
  border-radius: 24px;
  border: 1px solid var(--color-base-300);
  padding: 40px 36px;
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
  margin-bottom: 16px;
}

.section-title {
  font-size: 1.85rem;
  color: var(--color-neutral);
  margin-bottom: 14px;
}

.section-lead {
  font-size: 1.05rem;
  color: var(--color-muted);
  max-width: 740px;
  margin: 0 auto;
  line-height: 1.7;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.pillar-card {
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  border-radius: 20px;
  padding: 30px 24px;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.03);
}

.pillar-title {
  font-size: 1.3rem;
  color: var(--color-primary);
  margin-bottom: 12px;
  position: relative;
  padding-bottom: 10px;
}

.pillar-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 32px;
  height: 3px;
  background-color: var(--color-primary);
  border-radius: 2px;
}

.pillar-text {
  color: var(--color-muted);
  font-size: 0.96rem;
  line-height: 1.65;
}

.values-section {
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  border-radius: 20px;
  padding: 36px 30px;
}

.values-heading {
  font-size: 1.35rem;
  color: var(--color-neutral);
  margin-bottom: 24px;
  text-align: center;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.value-item h4 {
  color: var(--color-neutral);
  font-size: 1.05rem;
  margin-bottom: 6px;
}

.value-item p {
  color: var(--color-muted);
  font-size: 0.92rem;
  line-height: 1.55;
}
</style>
