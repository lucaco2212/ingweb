# CONTEXTO DEL PROYECTO: TecnoSoporte Ñuble

Este documento contiene el contexto de negocio, arquitectura y directrices técnicas del proyecto. Debe ser leído al inicio de cada tarea o etapa de desarrollo.

---

## 1. Información de la Empresa
- **Nombre:** TecnoSoporte Ñuble
- **Rubro:** Servicios tecnológicos integrales (soporte técnico, infraestructura de redes, desarrollo web, consultoría y capacitación digital).
- **Público Objetivo:** Personas particulares, pymes, instituciones y empresas de la Región de Ñuble y alrededores.
- **Identidad Visual:** Paleta moderna en tonos azul, turquesa, cian y acentos tecnológicos. Tono de comunicación cercano, confiable y profesional.

---

## 2. Stack Tecnológico y Reglas de Desarrollo
- **Framework:** Vue 3 con Composition API y `<script setup>`.
- **Tooling:** Vite.
- **Enrutamiento:** Vue Router (SPA con navegación fluida entre vistas).
- **Estilos:** CSS nativo con variables de diseño (Design Tokens) en `src/style.css`.
- **Persistencia / Backend:** Sin backend ni base de datos externa; manejo de datos locales reactivos (`src/data/`).
- **Dependencias:** No agregar librerías externas innecesarias. Mantener el proyecto ligero y modular.

---

## 3. Requisitos Globales del Proyecto
1. **Arquitectura SPA:** Navegación por vistas estructuradas:
   - **Inicio (`HomeView.vue`):** Hero section, resumen de servicios y llamada a la acción.
   - **Nosotros (`AboutView.vue`):** Misión, visión, historia y equipo de TecnoSoporte Ñuble.
   - **Servicios (`ServicesView.vue`):** Catálogo de mínimo 6 servicios tecnológicos.
   - **Contacto (`ContactView.vue`):** Formulario de contacto con validación reactiva y detalles de ubicación/contacto.
2. **Catálogo de Servicios:**
   - Renderizado dinámico con `v-for`.
   - Componente reutilizable con `props` tipadas/definidas.
   - Sistema de filtros dinámicos con `v-model` + `computed` sin mutar el arreglo original de datos.
   - Uso semántico de directivas condicionales `v-if`, `v-else` y `v-show`.
3. **Comunicación entre Componentes:**
   - Emisión de eventos desde componentes hijos al padre mediante `emit` (ej. selección de servicio, cotización o modal).
4. **Formulario de Contacto / Cotización:**
   - Vinculación bidireccional reactiva con `v-model`.
   - Validaciones de campos requeridos, email y formato de teléfono.
   - Feedback visual de éxito/error.
5. **Diseño y Calidad de Código:**
   - Diseño coherente, moderno y 100% responsivo (desktop, tablet, móvil).
   - Cero errores o warnings en consola del navegador.

---

## 4. Flujo de Trabajo por Partes
- Cada una de las 6 partes culmina con:
  1. Documentación de la sección correspondiente en `README.md`.
  2. Commit en git con el mensaje exacto de la parte.
- No realizar commits agrupados al final.
