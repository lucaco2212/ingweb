# TecnoSoporte Ñuble - Portal de Servicios Tecnológicos

**Estudiante:** Lucas Antonio Covarrubias Gamonal  
**Asignatura:** Ingeniería Web  
**Tecnología:** Vue 3 (Composition API / `<script setup>`) + Vite + Vue Router  

---

## Contexto del Proyecto
Transformación y evolución de la plataforma web hacia el portal corporativo y catálogo interactivo de **TecnoSoporte Ñuble**, empresa dedicada a servicios de soporte técnico, infraestructura de redes, desarrollo web y capacitación tecnológica en la Región de Ñuble.

---

## Parte 1 – Reutilización del proyecto

En esta primera etapa se realizó un análisis integral del código base heredado (`src/`) para adaptar la solución al rubro de servicios tecnológicos, optimizando la estructura del proyecto y asegurando una base limpia y escalable:

### 1. Elementos Conservados
- **`src/components/DancingLetters.vue`**: Componente visual interactivo para animar tipografías letra por letra al interactuar con el mouse, aportando dinamismo moderno a la cabecera.
- **`src/components/LiquidButton.vue`**: Botón de diseño líquido con efecto de brillo metálico y variantes (`default`, `glass`), reutilizable en los llamados a la acción y navegación.
- **Diseño de tarjeta con cintas (*Taped Header Card*) en `src/App.vue`**: Mantiene la identidad estética distintiva de la aplicación mediante bordes redondeados, sombras suaves y detalles de cintas adhesivas vectoriales.
- **Variables de diseño en `src/style.css`**: Se conservaron todos los nombres de tokens CSS (`--color-primary`, `--color-accent`, etc.) para mantener la coherencia del sistema de diseño.
- **Estructura base de `src/main.js`**: Montaje reactivo con `createApp(App).mount('#app')`.

### 2. Elementos Modificados
- **`src/App.vue`**:
  - Se cambió la insignia superior de *"📚 Sistema Mineduc Ñuble"* a *"⚡ TecnoSoporte Ñuble"*.
  - Se actualizó el título interactivo de `DancingLetters` a *"TecnoSoporte Ñuble"*.
  - Se adaptó el subtítulo corporativo: *"Soluciones tecnológicas integrales: soporte técnico, infraestructura de redes, desarrollo web y capacitación digital."*.
  - Se limpiaron los imports y referencias a los componentes del caso anterior para permitir una compilación sin errores.
- **`index.html`**:
  - Se cambió el `<title>` del documento a `"TecnoSoporte Ñuble - Servicios Tecnológicos"`.
- **`src/style.css`**:
  - Se ajustó la paleta de colores al rubro tecnológico (azules profundos, turquesas, cian y pizarra moderna) manteniendo los mismos nombres de variables para no romper referencias existentes.

### 3. Elementos Eliminados
- **`src/components/Proveedores.vue`**, **`Libros.vue`**, **`Recepciones.vue`**, **`ItemsRecepcion.vue`**, **`HelloWorld.vue`**: Eliminados por pertenecer exclusivamente a la lógica de negocio anterior (recepción de textos escolares) y no aplicar al catálogo de servicios tecnológicos.
- **`src/stores/useRecepcionStore.js`**: Eliminado el store antiguo de libros/recepciones.
- **`src/assets/vue.svg`**: Eliminado el logo de plantilla no utilizado.

### 4. Nuevas Carpetas Creadas
- **`src/views/`**: Para alojar las vistas principales de la SPA (`Inicio`, `Nosotros`, `Servicios`, `Contacto`).
- **`src/data/`**: Para almacenar el catálogo de servicios y datos locales sin backend.
- **`src/router/`**: Para la configuración de rutas con Vue Router.

---

## Verificación de Integridad
- `.gitignore` configurado para ignorar `node_modules/`, `dist/`, `.DS_Store` y archivos temporales.
- `npm run build` ejecutado satisfactoriamente con 0 errores y 0 warnings.
