# TecnoSoporte Nuble - Portal de Servicios Tecnologicos

**Estudiante:** Lucas Antonio Covarrubias Gamonal  
**Asignatura:** Ingenieria Web  
**Tecnologia:** Vue 3 (Composition API / script setup) + Vite + Vue Router 4  

---

## Descripcion General del Proyecto

**TecnoSoporte Nuble** es una aplicacion web interactiva desarrollada como Single Page Application (SPA) para una empresa regional dedicada a la prestacion de servicios tecnologicos integrales (soporte tecnico computacional, infraestructura de redes, desarrollo de software web y capacitacion digital).

El proyecto integra un catalogo dinamico de servicios con filtrado reactivo multidimensional, navegacion por rutas sin recarga, estado compartido desacoplado y un formulario de contacto y cotizacion con validacion estricta en tiempo real y confirmacion de recepcion.

---

## Instrucciones de Instalacion y Ejecucion

### Requisitos Previos
- Node.js (version 18 o superior recomendada)
- Gestor de paquetes npm

### Pasos para Ejecucion Local

1. **Instalacion de dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicacion estara disponible en el puerto local indicado por Vite (habitualmente `http://localhost:5173`).

3. **Compilacion para produccion:**
   ```bash
   npm run build
   ```

---

## Estructura del Proyecto

```text
actividad semana 9/
├── public/
├── src/
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
├── CONTEXTO.md                 # Contexto de negocio y directrices tecnicas
├── index.html                  # Plantilla base HTML5
├── package.json                # Dependencias y scripts del proyecto
└── README.md                   # Documentacion tecnica del desarrollo
```

---

## Parte 1 – Reutilizacion del proyecto

En esta primera etapa se realizo un analisis integral del codigo base heredado (src/) para adaptar la solucion al rubro de servicios tecnologicos, optimizando la estructura del proyecto y asegurando una base limpia y escalable:

### 1. Elementos Conservados
- **src/components/DancingLetters.vue**: Componente visual interactivo para animar tipografias letra por letra al interactuar con el mouse, aportando dinamismo moderno a la cabecera.
- **src/components/LiquidButton.vue**: Boton de diseno liquido con efecto de brillo metalico y variantes (default, glass), reutilizable en los llamados a la accion y navegacion.
- **Diseno de tarjeta con cintas (Taped Header Card) en src/App.vue**: Mantiene la identidad estetica distintiva de la aplicacion mediante bordes redondeados, sombras suaves y detalles de cintas adhesivas vectoriales.
- **Variables de diseno en src/style.css**: Se conservaron todos los nombres de tokens CSS (--color-primary, --color-accent, etc.) para mantener la coherencia del sistema de diseno.
- **Estructura base de src/main.js**: Montaje reactivo con createApp(App).mount('#app').

### 2. Elementos Modificados
- **src/App.vue**:
  - Se cambio la insignia superior a "TecnoSoporte Nuble".
  - Se actualizo el titulo interactivo de DancingLetters a "TecnoSoporte Nuble".
  - Se adapto el subtitulo corporativo: "Soluciones tecnologicas integrales: soporte tecnico, infraestructura de redes, desarrollo web y capacitacion digital.".
  - Se limpiaron los imports y referencias a los componentes del caso anterior para permitir una compilacion sin errores.
- **index.html**:
  - Se cambio el title del documento a "TecnoSoporte Nuble - Servicios Tecnologicos".
- **src/style.css**:
  - Se ajusto la paleta de colores al rubro tecnologico (azules profundos, turquesas, cian y pizarra moderna) manteniendo los mismos nombres de variables para no romper referencias existentes.

### 3. Elementos Eliminados
- **src/components/Proveedores.vue**, **Libros.vue**, **Recepciones.vue**, **ItemsRecepcion.vue**, **HelloWorld.vue**: Eliminados por pertenecer exclusivamente a la logica de negocio anterior (recepcion de textos escolares) y no aplicar al catalogo de servicios tecnologicos.
- **src/stores/useRecepcionStore.js**: Eliminado el store antiguo de libros/recepciones.
- **src/assets/vue.svg**: Eliminado el logo de plantilla no utilizado.

### 4. Nuevas Carpetas Creadas
- **src/views/**: Para alojar las vistas principales de la SPA (Inicio, Nosotros, Servicios, Contacto).
- **src/data/**: Para almacenar el catalogo de servicios y datos locales sin backend.
- **src/router/**: Para la configuracion de rutas con Vue Router.

---

## Parte 2 – Navegacion y vistas

En esta segunda etapa se implemento la arquitectura Single Page Application (SPA) mediante la integracion de **Vue Router 4**, desacoplando la navegacion condicional previa y habilitando un sistema de enrutamiento formal, modular y escalable.

### 1. Configuracion del Enrutador (src/router/index.js)
Se configuro una instancia de enrutador mediante `createRouter` y `createWebHistory()`, registrando las cuatro rutas principales con sus respectivos identificadores (`name`) y componentes asociados:
- **Ruta `/` (`name: 'inicio'`):** Vinculada a `InicioView.vue`.
- **Ruta `/nosotros` (`name: 'nosotros'`):** Vinculada a `NosotrosView.vue`.
- **Ruta `/servicios` (`name: 'servicios'`):** Vinculada a `ServiciosView.vue`.
- **Ruta `/contacto` (`name: 'contacto'`):** Vinculada a `ContactoView.vue`.

En el punto de entrada de la aplicacion (`src/main.js`), se registro el enrutador mediante `app.use(router)` antes de montar la aplicacion en el DOM.

### 2. Descripcion de las Vistas Creadas
- **`src/views/InicioView.vue`:** Pagina de aterrizaje que introduce la propuesta de valor de TecnoSoporte Nuble, destacando tres pilares de servicio (Soporte Agil, Conectividad Confiable y Soluciones a Medida) e incluyendo un llamado a la accion interactivo mediante `LiquidButton` que redirige programmaticamente a la seccion de Servicios.
- **`src/views/NosotrosView.vue`:** Presentacion institucional que expone en tarjetas diferenciadas la Mision, Vision y Proposito de la empresa, junto con los principios de trabajo fundamentales (Rigor Tecnico, Transparencia Total y Compromiso Local).
- **`src/views/ServiciosView.vue`:** Vista preparada con estructura de encabezado para alojar el catalogo interactivo de servicios tecnologicos y filtros computados.
- **`src/views/ContactoView.vue`:** Vista preparada con estructura de encabezado para alojar el formulario reactivo de contacto y cotizaciones con validacion de campos.

### 3. Mecanismo de Navegacion en App.vue
- Se elimino la variable de estado local `tab` y las directivas condicionales `v-if` de navegacion.
- Se incorporo el componente `<RouterView />` en el area principal para el renderizado dinamico de las vistas correspondientes a la URL activa.
- La barra de navegacion utiliza componentes `<RouterLink>` encapsulando `LiquidButton`, determinando de forma reactiva el estado activo mediante el hook `useRoute()` de Vue Router (`route.name`). Esto garantiza el cambio instantaneo de vistas sin recargar la pagina y preservando la identidad visual.

---

## Parte 3 – Catalogo de servicios y componentes

En esta etapa se implemento la capa de datos local y el componente modular para la representacion del catalogo de servicios tecnologicos.

### 1. Estructuracion de los Datos (src/data/servicios.js)
Se creo un modulo de datos que exporta una coleccion de 7 servicios tecnologicos representativos del giro comercial de la empresa, distribuidos en 4 categorias principales (*Soporte Tecnico*, *Redes e Infraestructura*, *Desarrollo Web*, *Capacitacion*).

Cada objeto de servicio cumple con la siguiente estructura de propiedades:
- **`id` (Number):** Identificador unico numerico del servicio.
- **`nombre` (String):** Titulo descriptivo y formal del servicio.
- **`categoria` (String):** Clasificacion tematica del servicio.
- **`descripcion` (String):** Sintesis del alcance y actividades tecnicas incluidas.
- **`precio` (Number):** Tarifa referencial en formato numerico entero para su posterior formateo.
- **`disponible` (Boolean):** Estado operativo del servicio (al menos un servicio configurado con `false` para representar servicios en mantenimiento o con cupos agotados).

### 2. Componente Reutilizable (src/components/ServicioCard.vue)
Se desarrollo el componente reutilizable `ServicioCard.vue`, el cual encapsula la presentacion individual de cada servicio:
- **Recepcion de Props:** Define la prop `servicio` como un objeto requerido con funcion validadora personalizada para verificar la existencia y tipos de las 5 propiedades obligatorias (`id`, `nombre`, `categoria`, `descripcion`, `precio`, `disponible`).
- **Formateo de Moneda Local:** Utiliza una propiedad computada (`precioFormateado`) mediante el API estandar `Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })`, asegurando la representacion visual adecuada en pesos chilenos (por ejemplo, `$25.000`).
- **Etiquetas de Estado y Categoria:** Incorpora badges visuales con clases dinamicas condicionales para destacar la categoria tematica y el estado de disponibilidad.

---

## Parte 4 – Filtros, condicionales e interaccion

En esta cuarta etapa se integraron capacidades avanzadas de busqueda reactiva, filtrado multidimensional sin mutacion de datos, gestion condicional de la interfaz y comunicacion entre componentes mediante eventos personalizados (`emit`) y estado reactivo compartido.

### 1. Sistema de Filtros Reactivos en ServiciosView.vue
- **Filtro de Busqueda Textual:** Vinculado bidireccionalmente con `v-model="busqueda"` a un campo de entrada de texto, permitiendo coincidencias insensibles a mayusculas/minusculas sobre el nombre del servicio.
- **Filtro por Categoria:** Vinculado con `v-model="categoriaSeleccionada"` a un elemento `<select>`. La lista de opciones se genera dinamicamente mediante una propiedad computada (`categorias = computed(() => ['Todas', ...new Set(servicios.map(s => s.categoria))])`), garantizando que cualquier nueva categoria en los datos se refleje automaticamente.
- **Propiedad Computada `serviciosFiltrados`:** Aplica el metodo inmutable `.filter()` combinando de forma simultanea los criterios de texto y categoria. La coleccion original `servicios` nunca es mutada, preservando la integridad de los datos.
- **Contador Dinamico de Resultados:** Informa en tiempo real la cantidad de registros coincidentes frente al total disponible (por ejemplo, *"Mostrando X de Y servicios"*).

### 2. Manejo de Directivas Condicionales (v-if / v-else)
- **Visualizacion de Resultados:** Se emplea `v-if="serviciosFiltrados.length > 0"` para renderizar la grilla de tarjetas. Cuando no existen coincidencias, la clausula `v-else` despliega un bloque de estado vacio descriptivo (*"No encontramos servicios con ese criterio"*) con un boton de accion rapida para restablecer los filtros a su estado inicial.
- **Control de Disponibilidad en ServicioCard.vue:** Se utilizan bloques `v-if="servicio.disponible"` y `v-else` tanto para renderizar el distintivo visual (*Disponible* / *No disponible*) como para alternar entre el boton activo *"Solicitar informacion"* y el boton inactivo deshabilitado *"No disponible"*.

### 3. Comunicacion entre Componentes mediante Emits y Estado Compartido
- **Emision de Eventos (Hijo a Padre):** En `ServicioCard.vue` se declaro `defineEmits(['seleccionar'])`. Al presionar *"Solicitar informacion"*, se valida la disponibilidad y se dispara `emit('seleccionar', props.servicio)`.
- **Captura en el Padre:** `ServiciosView.vue` escucha el evento mediante `@seleccionar="manejarSeleccion"`, invocando la actualizacion del estado global.
- **Estado Reactivo Compartido (src/stores/seleccion.js):** Se implemento un modulo reactivo nativo de Vue (`ref`) que expone `servicioSeleccionado`, `seleccionarServicio()` y `limpiarSeleccion()`, permitiendo persistir el servicio escogido en memoria para su utilizacion directa en la vista de Contacto sin requerir dependencias externas como Pinia.
- **Banner de Seleccion Activa:** Al seleccionarse un servicio, se despliega en la parte superior un panel con los datos del servicio, una opcion para cancelar la seleccion y un acceso directo (*"Ir a contacto"*) mediante navegacion programatica (`router.push('/contacto')`).

---

## Parte 5 – Formulario de contacto

En esta quinta etapa se construyo el modulo interactivo de contacto y cotizaciones en `src/views/ContactoView.vue`, aplicando captura de datos bidireccional reactiva, validaciones integrales del lado del cliente y retroalimentacion visual sin persistencia en base de datos externa.

### 1. Estructura del Formulario y Enlace de Datos
El formulario utiliza un objeto reactivo `form` gestionado mediante `reactive()` con los siguientes campos:
- **`nombre` (String):** Nombre completo del solicitante.
- **`correo` (String):** Direccion de correo electronico corporativo o personal.
- **`telefono` (String):** Numero de contacto telefonico o WhatsApp.
- **`servicioId` (Number | String):** Identificador del servicio de interes seleccionado desde el menu desplegable.
- **`mensaje` (String):** Detalle de la consulta o requerimiento tecnico.

### 2. Integracion con el Estado Compartido y Preseleccion
- Al montarse el componente (`onMounted`), se consulta el estado reactivo `servicioSeleccionado` provisto por `src/stores/seleccion.js`.
- Si el usuario selecciono un servicio previamente desde la vista de Catalogo, el campo `<select>` se inicializa de forma automatica con dicho servicio y se despliega un aviso contextual (*"Servicio Preseleccionado: Ha seleccionado [Nombre] desde el catalogo de servicios"*).
- Si no existe seleccion previa, el menu desplegable inicia en la opcion por defecto *"Seleccione un servicio"*.

### 3. Reglas de Validacion y Retroalimentacion en Tiempo Real
La validacion se ejecuta tanto en el evento `@blur` de cada campo como de forma global en el envio del formulario (`@submit.prevent="enviarFormulario"`), gestionando un objeto reactivo `errores`:
- **Nombre:** Obligatorio y con longitud minima de 3 caracteres.
- **Correo Electronico:** Obligatorio y validado mediante expresion regular de estructura de email (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
- **Telefono:** Obligatorio y validado bajo formatos chilenos comunes (9 digitos numericos o prefijo internacional `+56 9`).
- **Servicio:** Obligatorio, exigiendo la seleccion de una opcion valida del catalogo.
- **Mensaje:** Obligatorio y con longitud minima de 10 caracteres explicativos.

Cada campo en estado invalido recibe la clase CSS `.is-invalid` (resaltado con borde rojo de alerta) y renderiza condicionalmente un mensaje de error especifico mediante `v-if`.

### 4. Confirmacion de Solicitud y Resumen
- Al superar satisfactoriamente todas las validaciones, se oculta el formulario y se despliega una tarjeta de confirmacion con el resumen completo de la solicitud (nombre, correo, telefono, servicio, categoria, valor referencial, fecha y mensaje).
- Se incorpora el boton *"Enviar otra consulta"*, el cual restablece todos los campos del formulario, limpia los errores y resetea la seleccion global mediante `limpiarSeleccion()`.

---

## Parte 6 – Diseno y revision final

En la etapa final se ejecuto una auditoria integral sobre todo el sitio web para consolidar la coherencia visual, optimizar la experiencia de usuario (UX/UI) y asegurar la adaptabilidad responsiva en diversos dispositivos.

### 1. Unificacion de la Identidad Visual
- **Paleta de Colores Corporativa:** Se estandarizaron los tokens de diseno en `src/style.css` basados en tonos azules (`#0284C7`), turquesas (`#06B6D4`), acentos teal (`#0D9488`), fondo claro slate (`#F8FAFC`) y tipografia de alto contraste (`#0F172A`).
- **Tipografia Coherente:** Se aplico la combinacion tipografica de Google Fonts con *Outfit* para titulos y encabezados (`font-weight: 800`), y *Inter Tight* para cuerpos de texto, formularios y botones.
- **Bordes, Sombras y Espaciados:** Se homogeneizaron los radios de borde (tarjetas principales con `border-radius: 24px`, elementos secundarios con `12px` - `20px`), sombras difusas suaves con tinte slate y transiciones fluidas en estados hover (`0.2s ease`).

### 2. Adaptacion Responsiva Multiplataforma
Se validaron e incorporaron reglas de medios (media queries) para garantizar la correcta visualizacion en:
- **Dispositivos Moviles (~375px - 480px):** Las cintas decorativas vectoriales del header reducen su escala y reposicionamiento para evitar superposiciones; la barra de navegacion distribuye los enlaces de manera balanceada; la grilla de servicios pasa automaticamente a una unica columna vertical; y los campos del formulario se apilan fluidamente.
- **Tablets (~768px):** Ajuste dinamico de grillas de 2 columnas para servicios y pilares institucionales.
- **Escritorio (~1024px+):** Disposicion amplia de 3 columnas para servicios con maximo ancho centrado de 1080px.

### 3. Pie de Pagina Corporativo (Footer)
Se anadio un footer estructural en `App.vue` que presenta:
- Identidad de marca de **TecnoSoporte Nuble**.
- Datos de contacto y cobertura territorial (Chillan, Region de Nuble).
- Horario de atencion y correo electronico corporativo.
- Linea de derechos reservados formal.

### 4. Revision de Calidad de Codigo y Rendimiento
- Verificacion de eliminacion de archivos huerfanos, importaciones sin uso y ausencia de sentencias `console.log`.
- Validacion estricta de compilacion de produccion con `npm run build`, alcanzando 0 errores y 0 advertencias.

---

## Verificacion de Integridad
- Compilacion de produccion validada exitosamente con `npm run build` (0 errores, 0 advertencias).
- Navegacion SPA fluida, reactividad completa, validaciones robustas y responsive design comprobados.
