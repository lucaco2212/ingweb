<script setup>
import { useRouter } from 'vue-router'
import LiquidButton from '../components/LiquidButton.vue'

const router = useRouter()

function irAServicios() {
  router.push('/servicios')
}
</script>

<template>
  <div class="view-container">
    <section class="hero-card">
      <div class="hero-badge">Tecnología a su alcance</div>
      <h2 class="hero-title">Impulsamos la Transformación Digital en la Región de Ñuble</h2>
      <p class="hero-description">
        En <strong>TecnoSoporte Ñuble</strong> brindamos soluciones tecnológicas integrales diseñadas para resolver problemas reales.
        Desde soporte técnico especializado y mantención de equipos, hasta diseño e implementación de redes, desarrollo web moderno y capacitación técnica para empresas y particulares.
      </p>

      <div class="hero-actions">
        <LiquidButton variant="primary" size="lg" @click="irAServicios">
          Explorar Servicios
        </LiquidButton>
      </div>
    </section>

    <section class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">01</div>
        <h3>Soporte Ágil y Continuo</h3>
        <p>Diagnóstico certero y mantenimiento preventivo y correctivo para garantizar la continuidad operativa de sus sistemas.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">02</div>
        <h3>Conectividad Confiable</h3>
        <p>Instalación, configuración y seguridad en redes locales y enlaces empresariales con estándares de alto rendimiento.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">03</div>
        <h3>Soluciones a Medida</h3>
        <p>Desarrollo web adaptable, automatización de tareas y capacitación práctica adaptada al nivel de su equipo.</p>
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

.hero-card {
  background: var(--color-base-200);
  border-radius: 24px;
  border: 1px solid var(--color-base-300);
  padding: 44px 36px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.hero-badge {
  display: inline-block;
  background-color: var(--color-secondary-light);
  color: var(--color-accent);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 6px 16px;
  border-radius: 999px;
  margin-bottom: 18px;
}

.hero-title {
  font-size: 2rem;
  line-height: 1.25;
  color: var(--color-neutral);
  max-width: 800px;
  margin: 0 auto 16px auto;
}

.hero-description {
  font-size: 1.08rem;
  color: var(--color-muted);
  max-width: 720px;
  margin: 0 auto 32px auto;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.feature-card {
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  border-radius: 20px;
  padding: 28px 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.05);
}

.feature-icon {
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--color-primary);
  background: var(--color-primary-light);
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--color-neutral);
}

.feature-card p {
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .hero-card {
    padding: 30px 20px;
  }
  .hero-title {
    font-size: 1.5rem;
  }
}
</style>
