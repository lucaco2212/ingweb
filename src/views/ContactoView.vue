<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { servicios } from '../data/servicios.js'
import { servicioSeleccionado, limpiarSeleccion } from '../stores/seleccion.js'
import LiquidButton from '../components/LiquidButton.vue'

const form = reactive({
  nombre: '',
  correo: '',
  telefono: '',
  servicioId: '',
  mensaje: ''
})

const errores = reactive({
  nombre: '',
  correo: '',
  telefono: '',
  servicioId: '',
  mensaje: ''
})

const enviado = ref(false)
const resumenEnvio = ref(null)

// Preselección si proviene del catálogo
onMounted(() => {
  if (servicioSeleccionado.value) {
    form.servicioId = servicioSeleccionado.value.id
  }
})

const servicioDetalle = computed(() => {
  if (!form.servicioId) return null
  return servicios.find(s => s.id === Number(form.servicioId)) || null
})

function validarCampo(campo) {
  switch (campo) {
    case 'nombre':
      if (!form.nombre.trim()) {
        errores.nombre = 'El nombre es obligatorio.'
      } else if (form.nombre.trim().length < 3) {
        errores.nombre = 'El nombre debe tener al menos 3 caracteres.'
      } else {
        errores.nombre = ''
      }
      break

    case 'correo':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!form.correo.trim()) {
        errores.correo = 'El correo electrónico es obligatorio.'
      } else if (!emailRegex.test(form.correo.trim())) {
        errores.correo = 'Ingrese un formato de correo válido (ej: usuario@dominio.cl).'
      } else {
        errores.correo = ''
      }
      break

    case 'telefono':
      const telLimpio = form.telefono.replace(/[\s\-\+]/g, '')
      if (!form.telefono.trim()) {
        errores.telefono = 'El teléfono de contacto es obligatorio.'
      } else if (!/^(56)?9[0-9]{8}$/.test(telLimpio) && !/^[0-9]{8,12}$/.test(telLimpio)) {
        errores.telefono = 'Ingrese un número telefónico válido (ej: +56 9 1234 5678 o 9 dígitos).'
      } else {
        errores.telefono = ''
      }
      break

    case 'servicioId':
      if (!form.servicioId) {
        errores.servicioId = 'Debe seleccionar un servicio de interés.'
      } else {
        errores.servicioId = ''
      }
      break

    case 'mensaje':
      if (!form.mensaje.trim()) {
        errores.mensaje = 'El mensaje o descripción de la consulta es obligatorio.'
      } else if (form.mensaje.trim().length < 10) {
        errores.mensaje = 'El mensaje debe tener al menos 10 caracteres explicativos.'
      } else {
        errores.mensaje = ''
      }
      break
  }
}

function validarTodo() {
  validarCampo('nombre')
  validarCampo('correo')
  validarCampo('telefono')
  validarCampo('servicioId')
  validarCampo('mensaje')

  return !errores.nombre && !errores.correo && !errores.telefono && !errores.servicioId && !errores.mensaje
}

function enviarFormulario() {
  if (!validarTodo()) {
    return
  }

  const servicioElegido = servicios.find(s => s.id === Number(form.servicioId))

  resumenEnvio.value = {
    nombre: form.nombre.trim(),
    correo: form.correo.trim(),
    telefono: form.telefono.trim(),
    servicio: servicioElegido ? servicioElegido.nombre : 'No especificado',
    categoria: servicioElegido ? servicioElegido.categoria : 'General',
    precio: servicioElegido ? servicioElegido.precio : 0,
    mensaje: form.mensaje.trim(),
    fecha: new Date().toLocaleString('es-CL', {
      dateStyle: 'long',
      timeStyle: 'short'
    })
  }

  enviado.value = true
}

function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(valor)
}

function reiniciarFormulario() {
  form.nombre = ''
  form.correo = ''
  form.telefono = ''
  form.servicioId = ''
  form.mensaje = ''

  errores.nombre = ''
  errores.correo = ''
  errores.telefono = ''
  errores.servicioId = ''
  errores.mensaje = ''

  limpiarSeleccion()
  resumenEnvio.value = null
  enviado.value = false
}
</script>

<template>
  <div class="view-container">
    <header class="section-header-card">
      <div class="section-tag">Atención y Asistencia</div>
      <h2 class="section-title">Contáctenos</h2>
      <p class="section-lead">
        Complete el siguiente formulario para solicitar cotizaciones, agendar soporte técnico o resolver cualquier requerimiento tecnológico.
      </p>
    </header>

    <!-- Aviso si proviene de una selección previa en el catálogo -->
    <div v-if="!enviado && servicioSeleccionado" class="context-banner">
      <div class="banner-icon-box">📌</div>
      <div class="banner-text">
        <strong>Servicio Preseleccionado:</strong>
        <span>Ha seleccionado <em>"{{ servicioSeleccionado.nombre }}"</em> desde el catálogo de servicios.</span>
      </div>
    </div>

    <!-- Formulario de Contacto (visible si no se ha enviado aún) -->
    <section v-if="!enviado" class="form-container-card">
      <form @submit.prevent="enviarFormulario" novalidate class="contact-form">
        <!-- Nombre Completo -->
        <div class="form-group">
          <label for="campo-nombre" class="form-label">
            Nombre Completo <span class="required-asterisk">*</span>
          </label>
          <input 
            id="campo-nombre"
            v-model="form.nombre"
            type="text"
            class="form-input"
            :class="{ 'is-invalid': errores.nombre }"
            placeholder="Ej: Carolina Morales Silva"
            @blur="validarCampo('nombre')"
            @input="errores.nombre && validarCampo('nombre')"
          />
          <span v-if="errores.nombre" class="error-feedback">{{ errores.nombre }}</span>
        </div>

        <!-- Fila de Correo y Teléfono -->
        <div class="form-row">
          <div class="form-group flex-1">
            <label for="campo-correo" class="form-label">
              Correo Electrónico <span class="required-asterisk">*</span>
            </label>
            <input 
              id="campo-correo"
              v-model="form.correo"
              type="email"
              class="form-input"
              :class="{ 'is-invalid': errores.correo }"
              placeholder="Ej: contacto@empresa.cl"
              @blur="validarCampo('correo')"
              @input="errores.correo && validarCampo('correo')"
            />
            <span v-if="errores.correo" class="error-feedback">{{ errores.correo }}</span>
          </div>

          <div class="form-group flex-1">
            <label for="campo-telefono" class="form-label">
              Teléfono de Contacto <span class="required-asterisk">*</span>
            </label>
            <input 
              id="campo-telefono"
              v-model="form.telefono"
              type="tel"
              class="form-input"
              :class="{ 'is-invalid': errores.telefono }"
              placeholder="Ej: +56 9 9123 4567"
              @blur="validarCampo('telefono')"
              @input="errores.telefono && validarCampo('telefono')"
            />
            <span v-if="errores.telefono" class="error-feedback">{{ errores.telefono }}</span>
          </div>
        </div>

        <!-- Servicio de Interés -->
        <div class="form-group">
          <label for="campo-servicio" class="form-label">
            Servicio de Interés <span class="required-asterisk">*</span>
          </label>
          <select 
            id="campo-servicio"
            v-model="form.servicioId"
            class="form-select"
            :class="{ 'is-invalid': errores.servicioId }"
            @change="validarCampo('servicioId')"
          >
            <option value="" disabled>Seleccione un servicio</option>
            <option 
              v-for="s in servicios" 
              :key="s.id" 
              :value="s.id"
            >
              {{ s.nombre }} ({{ s.categoria }}) - {{ formatearPrecio(s.precio) }}
            </option>
          </select>
          <span v-if="errores.servicioId" class="error-feedback">{{ errores.servicioId }}</span>
        </div>

        <!-- Mensaje o Consulta -->
        <div class="form-group">
          <label for="campo-mensaje" class="form-label">
            Mensaje o Requerimiento Técnico <span class="required-asterisk">*</span>
          </label>
          <textarea 
            id="campo-mensaje"
            v-model="form.mensaje"
            rows="4"
            class="form-textarea"
            :class="{ 'is-invalid': errores.mensaje }"
            placeholder="Describa brevemente la situación, urgencia o requerimiento técnico..."
            @blur="validarCampo('mensaje')"
            @input="errores.mensaje && validarCampo('mensaje')"
          ></textarea>
          <span v-if="errores.mensaje" class="error-feedback">{{ errores.mensaje }}</span>
        </div>

        <!-- Botón de Envío -->
        <div class="form-actions">
          <LiquidButton 
            variant="primary" 
            size="lg" 
            type="submit"
          >
            Enviar Solicitud
          </LiquidButton>
        </div>
      </form>
    </section>

    <!-- Resumen de Confirmación (visible cuando enviado es true) -->
    <section v-else class="confirmation-card">
      <div class="confirmation-badge">Solicitud Registrada Exitosamente</div>
      <h3 class="confirmation-title">Resumen de la Consulta</h3>
      <p class="confirmation-subtitle">
        Hemos recibido su requerimiento. Un especialista de TecnoSoporte Ñuble se pondrá en contacto a la brevedad.
      </p>

      <div class="summary-box">
        <div class="summary-item">
          <span class="summary-label">Nombre del Solicitante:</span>
          <span class="summary-value">{{ resumenEnvio.nombre }}</span>
        </div>

        <div class="summary-item">
          <span class="summary-label">Correo Electrónico:</span>
          <span class="summary-value">{{ resumenEnvio.correo }}</span>
        </div>

        <div class="summary-item">
          <span class="summary-label">Teléfono de Contacto:</span>
          <span class="summary-value">{{ resumenEnvio.telefono }}</span>
        </div>

        <div class="summary-item">
          <span class="summary-label">Servicio Solicitado:</span>
          <span class="summary-value highlight-text">
            {{ resumenEnvio.servicio }} 
            <small class="category-tag">({{ resumenEnvio.categoria }})</small>
          </span>
        </div>

        <div class="summary-item">
          <span class="summary-label">Valor Referencial:</span>
          <span class="summary-value">{{ formatearPrecio(resumenEnvio.precio) }}</span>
        </div>

        <div class="summary-item">
          <span class="summary-label">Fecha de Envío:</span>
          <span class="summary-value">{{ resumenEnvio.fecha }}</span>
        </div>

        <div class="summary-item full-width">
          <span class="summary-label">Detalle del Requerimiento:</span>
          <p class="summary-message">{{ resumenEnvio.mensaje }}</p>
        </div>
      </div>

      <div class="confirmation-actions">
        <LiquidButton 
          variant="default" 
          size="md" 
          @click="reiniciarFormulario"
        >
          Enviar otra consulta
        </LiquidButton>
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
  background-color: var(--color-secondary-light);
  color: var(--color-accent);
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

/* Banner de Contexto */
.context-banner {
  background-color: #ecfeff;
  border: 1px solid #a5f3fc;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #0e7490;
  font-size: 0.95rem;
}

.banner-icon-box {
  font-size: 1.2rem;
}

.banner-text em {
  font-weight: 600;
  font-style: normal;
}

/* Tarjeta del Formulario */
.form-container-card {
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  border-radius: 24px;
  padding: 36px 32px;
  box-shadow: 0 6px 25px rgba(15, 23, 42, 0.03);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.flex-1 {
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-neutral);
}

.required-asterisk {
  color: var(--color-error);
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--color-base-300);
  background: var(--color-base-100);
  color: var(--color-neutral);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: var(--color-primary);
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
}

.form-input.is-invalid,
.form-select.is-invalid,
.form-textarea.is-invalid {
  border-color: var(--color-error);
  background: #fef2f2;
}

.form-input.is-invalid:focus,
.form-select.is-invalid:focus,
.form-textarea.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.error-feedback {
  font-size: 0.82rem;
  color: var(--color-error);
  font-weight: 500;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

/* Tarjeta de Confirmación */
.confirmation-card {
  background: var(--color-base-200);
  border: 1px solid #bbf7d0;
  border-radius: 24px;
  padding: 40px 32px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.06);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

.confirmation-badge {
  display: inline-block;
  background-color: #dcfce7;
  color: #15803d;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 6px 18px;
  border-radius: 999px;
  margin-bottom: 16px;
}

.confirmation-title {
  font-size: 1.7rem;
  color: var(--color-neutral);
  margin-bottom: 8px;
}

.confirmation-subtitle {
  color: var(--color-muted);
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto 28px auto;
}

.summary-box {
  background: var(--color-base-100);
  border: 1px solid var(--color-base-300);
  border-radius: 18px;
  padding: 24px;
  text-align: left;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 30px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-item.full-width {
  grid-column: 1 / -1;
  border-top: 1px solid var(--color-base-300);
  padding-top: 14px;
  margin-top: 4px;
}

.summary-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-muted);
  font-weight: 700;
}

.summary-value {
  font-size: 1rem;
  color: var(--color-neutral);
  font-weight: 600;
}

.highlight-text {
  color: var(--color-primary);
}

.category-tag {
  font-size: 0.85rem;
  color: var(--color-muted);
  font-weight: normal;
}

.summary-message {
  font-size: 0.95rem;
  color: var(--color-neutral);
  line-height: 1.6;
  white-space: pre-line;
}

.confirmation-actions {
  display: flex;
  justify-content: center;
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
  }
  .form-container-card,
  .confirmation-card {
    padding: 24px 18px;
  }
}
</style>
