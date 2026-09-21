# TecnoSoporte Nuble - Portal de Servicios Tecnologicos

**Estudiante:** Lucas Antonio Covarrubias Gamonal  
**Asignatura:** Ingenieria Web  
**Tecnologia:** Vue 3 (Composition API / script setup) + Vite + Vue Router  



## Contexto del Proyecto

Transformacion y evolucion de la plataforma web hacia el portal corporativo y catalogo interactivo de **TecnoSoporte Nuble**, empresa dedicada a servicios de soporte tecnico, infraestructura de redes, desarrollo web y capacitacion tecnologica en la Region de Nuble.



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

## Verificacion de Integridad
- Compilacion de produccion validada exitosamente con `npm run build` (0 errores, 0 advertencias).
- Navegacion SPA fluida y reactiva entre todas las rutas del sistema.
