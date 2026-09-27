# TecnoSoporte Nuble - Portal de Servicios Tecnologicos

**Estudiante:** Lucas Antonio Covarrubias Gamonal  
**Asignatura:** Ingenieria Web  
**Tecnologia:** Vue 3 (Composition API / script setup) + Vite + Vue Router 4 + Node.js + Express  

---

## Descripcion General del Proyecto

**TecnoSoporte Nuble** es una aplicacion web interactiva desarrollada como Single Page Application (SPA) para una empresa regional dedicada a la prestacion de servicios tecnologicos integrales (soporte tecnico computacional, infraestructura de redes, desarrollo de software web y capacitacion digital).

El proyecto integra un catalogo dinamico de servicios con filtrado reactivo multidimensional, navegacion por rutas sin recarga, estado compartido desacoplado, un formulario de contacto y cotizacion con validacion estricta en tiempo real y confirmacion de recepcion, junto con un servidor backend desacoplado desarrollado en Node.js y Express.

---

## Instrucciones de Instalacion y Ejecucion

### Requisitos Previos
- Node.js (version 18 o superior recomendada)
- Gestor de paquetes npm

### Pasos para Ejecucion Local

1. **Frontend (Actividad 8):**
   ```bash
   npm install
   npm run dev
   ```
   La aplicacion web estara disponible en el puerto local indicado por Vite (`http://localhost:5173`).

2. **Backend (Actividad 9):**
   ```bash
   cd backend
   npm install
   ```

3. **Compilacion para produccion del frontend:**
   ```bash
   npm run build
   ```

---

## Estructura del Proyecto

```text
actividad semana 9/
├── backend/                    # Servidor backend independiente (Actividad 9)
│   ├── node_modules/           # Dependencias exclusivas del backend
│   ├── package-lock.json       # Arbol de dependencias bloqueado del backend
│   └── package.json            # Manifiesto y scripts del backend (Express)
├── public/
├── src/                        # Codigo fuente del frontend intacto (Actividad 8)
│   ├── assets/                 # Recursos graficos estaticos
│   ├── components/             # Componentes modulares y reutilizables
│   │   ├── DancingLetters.vue  # Cabecera interactiva con animacion tipografica
│   │   ├── LiquidButton.vue    # Boton estilizado con variantes visuales
│   │   └── ServicioCard.vue    # Tarjeta de presentacion individual de servicio
│   ├── data/                   # Datos locales y catalogos
│   │   └── servicios.js        # Coleccion estructurada de servicios tecnologicos
│   ├── router/                 # Configuracion de rutas
│   │   └── index.js            # Enrutador Vue Router (Inicio, Nosotros, Servicios, Contacto)
│   ├── stores/                 # Estado reactivo global
│   │   └── seleccion.js        # Estado compartido del servicio preseleccionado
│   ├── views/                  # Vistas principales de la aplicacion (SPA)
│   │   ├── InicioView.vue      # Pagina de inicio y propuesta de valor
│   │   ├── NosotrosView.vue    # Informacion institucional, mision y vision
│   │   ├── ServiciosView.vue   # Catalogo con buscador, filtros y seleccion
│   │   └── ContactoView.vue    # Formulario de contacto con validaciones
│   ├── App.vue                 # Componente raiz con layout, header taped y footer
│   ├── main.js                 # Punto de entrada y montaje de Vue + Router
│   └── style.css               # Sistema de variables y estilos globales
├── .gitignore                  # Exclusion de node_modules y dist (frontend y backend)
├── CONTEXTO.md                 # Contexto de negocio y directrices tecnicas
├── index.html                  # Plantilla base HTML5 del frontend
├── package.json                # Dependencias y scripts del frontend
└── README.md                   # Documentacion tecnica del desarrollo
```

---

## Actividad 8 – Desarrollo Frontend SPA

### Parte 1 – Reutilizacion del proyecto
En esta primera etapa se realizo un analisis integral del codigo base heredado (src/) para adaptar la solucion al rubro de servicios tecnologicos, optimizando la estructura del proyecto y asegurando una base limpia y escalable:
- **Elementos Conservados:** `DancingLetters.vue`, `LiquidButton.vue`, diseno de tarjeta con cintas (`Taped Header Card`) en `App.vue`, variables de diseno en `style.css` y punto de entrada en `main.js`.
- **Elementos Modificados:** Identidad institucional a *TecnoSoporte Nuble*, titulo animado, subtitulo corporativo, `index.html` con nuevo title y paleta de colores azul/turquesa tecnologica en `style.css`.
- **Elementos Eliminados:** Componentes obsoletos del caso anterior (`Proveedores.vue`, `Libros.vue`, `Recepciones.vue`, `ItemsRecepcion.vue`, `HelloWorld.vue`, `useRecepcionStore.js` y `assets/vue.svg`).
- **Nuevas Carpetas Creadas:** `src/views/`, `src/data/` y `src/router/`.

### Parte 2 – Navegacion y vistas
Implementacion de Single Page Application (SPA) con **Vue Router 4**:
- **Configuracion de Rutas:** Registro formal de rutas con nombres unicos (`/`, `/nosotros`, `/servicios`, `/contacto`).
- **Vistas Creadas:** `InicioView.vue`, `NosotrosView.vue`, `ServiciosView.vue` y `ContactoView.vue`.
- **Navegacion en App.vue:** Reemplazo de directivas condicionales por `<RouterView />` y `<RouterLink>` integrados con `LiquidButton` y deteccion reactiva de ruta activa via `useRoute()`.

### Parte 3 – Catalogo de servicios y componentes
Implementacion de la capa de datos y presentacion modular:
- **Datos (src/data/servicios.js):** Arreglo de 7 servicios tecnologicos distribuidos en 4 categorias, con id, nombre, categoria, descripcion, precio numerico y disponibilidad booleana.
- **Componente Reutilizable (src/components/ServicioCard.vue):** Componente con props tipadas y validadas, formateo de precios en pesos chilenos (`CLP`) via `Intl.NumberFormat` y badges de estado visual.
- **Renderizado Dinamico en ServiciosView.vue:** Grilla responsiva CSS renderizada con directiva `v-for`.

### Parte 4 – Filtros, condicionales e interaccion
Capacidades de busqueda reactiva y comunicacion de componentes:
- **Filtros Reactivos:** Busqueda textual por nombre (`v-model="busqueda"`) y filtro desplegable por categoria derivado con `computed`.
- **Propiedad Computada `serviciosFiltrados`:** Filtrado inmutable sobre la coleccion sin mutar los datos originales.
- **Directivas Condicionales:** `v-if` / `v-else` para grilla de resultados o mensaje de estado vacio con boton para limpiar filtros, y alternancia de boton activo / deshabilitado en tarjetas.
- **Emision de Eventos y Store Compartido:** `defineEmits(['seleccionar'])` en el hijo, captura con `@seleccionar` en el padre y persistencia en `src/stores/seleccion.js` con banner superior interactivo.

### Parte 5 – Formulario de contacto
Modulo de contacto y cotizacion en `src/views/ContactoView.vue`:
- **Estructura y Preseleccion:** Formulario reactivo con `reactive()` vinculado a nombre, correo, telefono, servicio de interes y mensaje, preseleccionando automaticamente el servicio elegido en el catalogo.
- **Validacion Estricta:** Reglas de validacion en `@blur` y `@submit.prevent` para obligatoriedad, formato de correo, telefono chileno y extension minima de mensaje.
- **Resumen y Confirmacion:** Tarjeta de confirmacion con detalle de solicitud y boton para reiniciar el formulario y limpiar la seleccion global.

### Parte 6 – Diseno y revision final
Consolidacion y control de calidad:
- **Identidad Visual:** Tokens homogeneos de color, fuentes Google Fonts (*Outfit* y *Inter Tight*), radios de borde consistentes y sombras suaves.
- **Adaptabilidad Responsiva:** Media queries para soporte optimo en movil (~375px), tablet (~768px) y escritorio (~1024px+).
- **Footer Corporativo:** Pie de pagina transversal con datos de contacto, ubicacion y horario.
- **Auditoria:** Ausencia de errores en compilacion (`npm run build`), cero warnings y codigo limpio.

---

## Actividad 9 – Backend con Node.js y Express

## Parte 1 y 2 – Preparacion del backend

En esta etapa se establecio la base y arquitectura inicial para el servidor backend, disenado de manera completamente desacoplada e independiente del frontend desarrollado en la Actividad 8:

### 1. Creacion del Directorio de Backend
- Se creo la carpeta `backend/` en la raiz del repositorio, manteniendo una separacion limpia respecto a los archivos y carpetas del frontend (`src/`, `index.html`, `public/`, `package.json` raiz).

### 2. Inicializacion del Proyecto Node.js
- Se ejecuto el comando:
  ```bash
  npm init -y
  ```
  con el directorio de trabajo ubicado dentro de `backend/`.
- Este comando genero de forma automatica el archivo `backend/package.json`, estableciendo el manifiesto de configuracion propio del backend con sus metadatos (nombre, version, punto de entrada `index.js`, scripts y tipo de modulo).

### 3. Instalacion de Express
- Se instalo el framework web **Express** dentro de la carpeta `backend/` mediante el comando:
  ```bash
  npm install express
  ```
- **Proposito de Express:** Express es un framework minimalista y flexible para Node.js que proporciona una infraestructura robusta para la creacion de servidores HTTP, manejo de rutas, procesamiento de solicitudes (requests), envio de respuestas (responses), soporte de middleware y construccion de APIs REST.
- Se verifico en `backend/package.json` la correcta incorporacion de `"express"` dentro del bloque de dependencias (`dependencies`).

### 4. Configuracion de Control de Versiones (.gitignore)
- Se actualizo el archivo `.gitignore` de la raiz del proyecto para excluir explicitamente `backend/node_modules`, evitando que las dependencias binarias y paquetes descargados sean versionados en el repositorio Git.

### 5. Independencia Arquitectonica
- Se enfatiza que el backend opera de forma aislada y no altera ningun archivo ni funcionalidad del frontend de la Actividad 8, el cual permanece 100% intacto y funcional.

---

## Verificacion de Integridad
- Frontend: Compilacion validada con `npm run build` (0 errores, 0 advertencias).
- Backend: Directorio `backend/` inicializado con su propio `package.json` y `express` instalado como dependencia.
