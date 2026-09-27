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
   npm start
   ```
   El servidor backend estara disponible en `http://localhost:3000`.
   - Endpoint de prueba: `http://localhost:3000/`
   - Endpoint de API REST: `http://localhost:3000/api/servicios`

3. **Compilacion para produccion del frontend:**
   ```bash
   npm run build
   ```

---

## Estructura del Proyecto

```text
actividad semana 9/
├── backend/                    # Servidor backend independiente (Actividad 9)
│   ├── data/                   # Modulo de datos locales del backend
│   │   └── servicios.js        # Coleccion de servicios en formato CommonJS
│   ├── node_modules/           # Dependencias exclusivas del backend
│   ├── package-lock.json       # Arbol de dependencias bloqueado del backend
│   ├── package.json            # Manifiesto y scripts del backend (Express)
│   └── server.js               # Punto de entrada y configuracion del servidor Express
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

### Parte 1 y 2 – Preparacion del backend

En esta etapa se establecio la base y arquitectura inicial para el servidor backend, disenado de manera completamente desacoplada e independiente del frontend desarrollado en la Actividad 8:
- **Creacion del Directorio de Backend:** Se creo la carpeta `backend/` en la raiz del repositorio, manteniendo una separacion limpia respecto a los archivos del frontend.
- **Inicializacion del Proyecto Node.js:** Se ejecuto `npm init -y` dentro de `backend/`, generando su propio manifiesto `backend/package.json`.
- **Instalacion de Express:** Se instalo el framework web Express (`npm install express`), registrandose en el bloque `dependencies` de `backend/package.json`.
- **Configuracion de .gitignore:** Se anadio la regla `backend/node_modules` para evitar el versionado de dependencias instaladas.
- **Independencia Arquitectonica:** El backend opera de forma aislada y no altera ningun archivo ni funcionalidad del frontend de la Actividad 8.

---

### Parte 3 y 4 – Primer servidor

En esta etapa se desarrollo y ejecuto el primer servidor web funcional en Node.js utilizando el framework Express a traves del archivo `backend/server.js`:

```javascript
const express = require('express')

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Servidor de empresa funcionando correctamente')
})

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`)
})
```

#### Explicacion de Conceptos Fundamentales:

1. **Que hace `app.get()`:**  
   Es un metodo de enrutamiento proporcionado por Express que asocia una funcion controladora (callback) a una ruta especifica (en este caso, la ruta raiz `'/'`) cuando se recibe una solicitud HTTP mediante el metodo **GET**. Permite definir que logica de negocio o contenido se debe procesar y entregar al cliente cuando accede a dicha URL.

2. **Que representan `req` y `res`:**  
   - **`req` (Request / Solicitud):** Es un objeto que encapsula toda la informacion enviada por el cliente hacia el servidor, incluyendo parametros de ruta (`req.params`), parametros de consulta en la URL (`req.query`), encabezados HTTP (`req.headers`), cuerpo de la peticion (`req.body`), cookies y metadatos de conexion.
   - **`res` (Response / Respuesta):** Es un objeto provisto por Express que contiene metodos para construir y despachar la respuesta HTTP hacia el cliente. Permite enviar texto o HTML (`res.send()`), documentos JSON (`res.json()`), establecer codigos de estado HTTP (`res.status()`) y adjuntar cabeceras de respuesta.

3. **Que hace `app.listen()`:**  
   Es el metodo que inicia efectivamente el servidor HTTP en el sistema operativo, enlazando la aplicacion a un puerto de red especifico (en este caso, el puerto `3000`). Permite que el servidor quede en un estado de escucha activa y continua para recibir y atender las conexiones entrantes de clientes o navegadores web.

#### Script de Ejecucion:
En `backend/package.json` se configuro el comando de inicio en la seccion de scripts:
```json
"scripts": {
  "start": "node server.js"
}
```
Se verifico la ejecucion del servidor mediante `npm start` y la recepcion correcta del mensaje *"Servidor de empresa funcionando correctamente"* en `http://localhost:3000`.

---

### Parte 5 – Datos de servicios

En esta etapa se creo el modulo de persistencia de datos local para el backend en `backend/data/servicios.js`, exportando la coleccion mediante el estandar **CommonJS** (`module.exports = servicios`):

#### 1. Estructura de cada Servicio:
Cada registro del arreglo contiene las siguientes 6 propiedades:
- **`id` (Number):** Identificador unico secuencial.
- **`nombre` (String):** Nombre formal del servicio tecnologico.
- **`categoria` (String):** Categoria tematica de clasificacion.
- **`descripcion` (String):** Detalle tecnico y alcance del servicio.
- **`precio` (Number):** Valor referencial en moneda local (CLP).
- **`disponible` (Boolean):** Flag de disponibilidad operativa (con el servicio de id 6 configurado en `false`).

#### 2. Servicios Incorporados (Total: 8 servicios):
1. **Mantenimiento Preventivo y Correctivo de Equipos** (*Soporte Tecnico*, $25.000, Disponible).
2. **Instalacion y Configuracion de Redes y Wi-Fi** (*Redes e Infraestructura*, $65.000, Disponible).
3. **Desarrollo de Sitios Web y Landing Pages** (*Desarrollo Web*, $180.000, Disponible).
4. **Recuperacion de Datos y Respaldos en la Nube** (*Soporte Tecnico*, $45.000, Disponible).
5. **Capacitacion en Alfabetizacion Digital y Ciberseguridad** (*Capacitacion y Ciberseguridad*, $35.000, Disponible).
6. **Auditoria de Seguridad y Vulnerabilidades de Red** (*Redes e Infraestructura*, $95.000, No disponible).
7. **Desarrollo de Aplicaciones Web y Paneles a Medida** (*Desarrollo Web*, $320.000, Disponible).
8. **Implementacion de Servidores y Automatizacion Cloud** (*Automatizacion y Cloud*, $140.000, Disponible).

#### 3. Adaptaciones Realizadas respecto al Ejemplo Generico:
- Se extendio la coleccion a 8 servicios (superando el minimo de 6 exigido).
- Se incorporaron categorias especializadas propias como **Capacitacion y Ciberseguridad** y **Automatizacion y Cloud**, ampliando la coherencia con el rubro tecnologico de TecnoSoporte Nuble definido en `CONTEXTO.md`.
- El archivo se mantiene como modulo desacoplado, listo para ser consumido por las rutas de Express en la siguiente etapa.

---

### Parte 6 – API de servicios

En esta etapa se expuso el primer endpoint REST funcional de la aplicacion en `backend/server.js`, permitiendo a clientes externos consultar la totalidad del catalogo de servicios tecnologicos en formato estructurado JSON:

```javascript
const express = require('express')
const servicios = require('./data/servicios')

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Servidor de empresa funcionando correctamente')
})

app.get('/api/servicios', (req, res) => {
  res.json(servicios)
})

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`)
})
```

#### Diferencia Tecnica entre `res.send()` y `res.json()`:

1. **`res.send([body])`:**
   - Es un metodo generico y polimorfico de Express para despachar respuestas HTTP.
   - Puede recibir diversos tipos de datos, tales como cadenas de texto (`String`), objetos `Buffer`, objetos JavaScript o arreglos.
   - Infiere automaticamente el encabezado HTTP `Content-Type` correspondiente segun el tipo de argumento proporcionado: asigna `text/html` o `text/plain` para cadenas de texto, y `application/octet-stream` para buffers.
   - Si se le entrega un objeto o arreglo, internamente invoca de forma delegada a `res.json()`.

2. **`res.json([body])`:**
   - Es un metodo disenado de manera explicita y especializada para la construccion de APIs REST que transmiten datos en formato JSON.
   - Establece de forma estricta y predeterminada la cabecera `Content-Type: application/json; charset=utf-8`.
   - Serializa el argumento proporcionado mediante `JSON.stringify()`, asegurando una conversion precisa de estructuras complejas, valores nulos (`null`) o booleanos a una cadena JSON valida.
   - Respeta las configuraciones globales del entorno de Express, tales como el formateo e indentacion de espacios para respuestas legibles (`app.set('json spaces', 2)`).

#### Verificacion del Endpoint:
Se comprobo el funcionamiento del servidor realizando peticiones HTTP a `http://localhost:3000/api/servicios`, validando la recepcion integra de los 8 objetos de servicio en formato JSON sin advertencias ni errores en consola.

---

### Parte 7 – Consulta por ID

En esta etapa se implemento la ruta parametrizada `GET /api/servicios/:id` en `backend/server.js`, permitiendo la busqueda y recuperacion individual de un servicio especifico mediante su identificador numerico unico:

```javascript
app.get('/api/servicios/:id', (req, res) => {
  const id = Number(req.params.id)
  const servicio = servicios.find(s => s.id === id)

  if (!servicio) {
    return res.status(404).json({ mensaje: 'Servicio no encontrado' })
  }

  res.json(servicio)
})
```

#### Explicacion de Conceptos Tecnicos:

1. **Que es `req.params`:**  
   Es un objeto propio de Express que almacena y mapea todos los parametros de ruta (variables de segmento de URL) definidos con dos puntos (`:nombreParametro`) en el patron del endpoint. Cuando un cliente solicita `/api/servicios/3`, Express extrae el valor del segmento correspondiente y lo expone como una propiedad del objeto: `req.params.id === "3"`.

2. **Por que se utiliza `Number()`:**  
   Todos los valores extraidos de la URL a traves de `req.params` son recibidos de forma nativa como cadenas de texto (`String`). Dado que en la coleccion de datos (`backend/data/servicios.js`) la propiedad `id` esta almacenada como un dato numerico (`Number`), se aplica la conversion explicita con `Number(req.params.id)` para permitir una comparacion de igualdad estricta (`===`) en la funcion `find()`, evitando errores de comparacion por incompatibilidad de tipos primitivos.

3. **Que representa el codigo de estado HTTP `404` (Not Found):**  
   Es el codigo de estado estandar del protocolo HTTP que indica que el servidor ha comprendido la solicitud del cliente, pero no ha podido encontrar el recurso solicitado en su origen de datos o base de almacenamiento. En una arquitectura REST, retornar `404` junto con un payload descriptivo (`{ mensaje: 'Servicio no encontrado' }`) es la practica idonea para senalar que el recurso con el identificador solicitado no existe en el sistema.

#### Verificacion de Endpoints por ID:
Se realizaron pruebas de consulta HTTP contra el servidor en ejecucion:
- **`GET /api/servicios/1`:** Retorno codigo `200 OK` con el objeto completo del servicio *Mantenimiento Preventivo y Correctivo de Equipos*.
- **`GET /api/servicios/3`:** Retorno codigo `200 OK` con el objeto completo del servicio *Desarrollo de Sitios Web y Landing Pages*.
- **`GET /api/servicios/999`:** Retorno codigo `404 Not Found` con la respuesta JSON `{ "mensaje": "Servicio no encontrado" }`.

---

### Parte 8 – Filtro por categoria

En esta etapa se evoluciono el endpoint `GET /api/servicios` en `backend/server.js` para admitir filtrado dinamico mediante parametros de consulta en la URL (*query strings*), permitiendo filtrar por categoria de forma flexible e insensible a mayusculas/minusculas (*case-insensitive*):

```javascript
app.get('/api/servicios', (req, res) => {
  const { categoria } = req.query

  if (categoria) {
    const filtrados = servicios.filter(
      s => s.categoria.toLowerCase() === categoria.toLowerCase()
    )
    return res.json(filtrados)
  }

  res.json(servicios)
})
```

#### Explicacion de Diferencias: `req.params` vs `req.query`:

| Caracteristica | `req.params` (Parametros de Ruta) | `req.query` (Parametros de Consulta / Query Strings) |
| :--- | :--- | :--- |
| **Ubicacion en la URL** | Forma parte estructural de la ruta (`/api/servicios/:id`). | Se anade al final de la URL tras el signo de interrogacion (`/api/servicios?categoria=desarrollo`). |
| **Definicion en el Servidor** | Requiere declaracion explicita en el patron de ruta de Express (`:nombre`). | No requiere declaracion en la firma de la ruta; Express parsea automaticamente todo par clave-valor tras `?`. |
| **Obligatoriedad** | Obligatorio para coincidir con la ruta especifica. | Opcional; se utiliza comunmente para filtros, ordenamiento, busquedas y paginacion. |
| **Proposito REST** | Identificar un recurso unico y especifico en la jerarquia. | Modificar, filtrar o paginar la representacion de una coleccion de recursos. |

#### Verificacion de Endpoints con Query Parameters:
Se realizaron pruebas de peticion HTTP para validar el comportamiento del filtro:
- **`GET /api/servicios`:** Retorna la coleccion completa (8 servicios).
- **`GET /api/servicios?categoria=desarrollo%20web`:** Retorna 2 servicios pertenecientes a *Desarrollo Web*.
- **`GET /api/servicios?categoria=SOPORTE%20TÉCNICO`:** Retorna 2 servicios pertenecientes a *Soporte Tecnico* gracias a la comparacion `.toLowerCase()`.
- **`GET /api/servicios?categoria=categoria_inexistente`:** Retorna un arreglo vacio `[]` con codigo `200 OK`, sin provocar errores ni caidas del servidor.

---

## Verificacion de Integridad
- Frontend: Compilacion validada con `npm run build` (0 errores, 0 advertencias).
- Backend: Endpoint `GET /api/servicios` verificado respondiendo con la coleccion completa o filtrada por `categoria` (query string).
- Backend: Endpoint `GET /api/servicios/:id` verificado con busqueda exitosa (200 OK) y manejo de id inexistente (404 Not Found).


