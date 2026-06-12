# SmartPC — Sistema de recomendación de computadoras

SmartPC es una plataforma web diseñada para ayudar a los usuarios a encontrar computadoras de acuerdo con su perfil de uso, presupuesto y preferencias técnicas. El sistema analiza equipos disponibles en el catálogo, calcula una puntuación personalizada y muestra un ranking de recomendaciones con explicación técnica, comparación entre dispositivos y enlaces hacia tiendas externas.

## Demo en producción

El sistema se encuentra desplegado en Railway:

https://smartpc-frontend-production.up.railway.app/

## Capturas del sistema

### Landing principal

<img width="1903" height="915" alt="image" src="https://github.com/user-attachments/assets/57f25cd2-9f4f-4a73-890b-16b2cb79d173" />

### Recomendador

<img width="1896" height="915" alt="image" src="https://github.com/user-attachments/assets/3c7be277-5894-4d96-9c1f-07f00d07b596" />
<img width="1900" height="912" alt="image" src="https://github.com/user-attachments/assets/7bc31ee4-353d-45ad-b17d-59138eeb1c09" />
<img width="1898" height="922" alt="image" src="https://github.com/user-attachments/assets/871a9fe1-d995-4e2c-a8be-9cff13a74e46" />

### Resultados de recomendación

<img width="1898" height="917" alt="image" src="https://github.com/user-attachments/assets/a9f74c93-9933-45fc-9268-d6adbcd7cb8a" />
<img width="1894" height="931" alt="image" src="https://github.com/user-attachments/assets/0982e460-4284-4497-961d-f0a20a5e2d82" />

### Comparador de equipos

<img width="1918" height="922" alt="image" src="https://github.com/user-attachments/assets/9cfded1b-f438-4ddf-9d9c-11c422f31412" />

### Detalles del equipo

<img width="1898" height="912" alt="image" src="https://github.com/user-attachments/assets/ffeea8dd-e8d7-4219-8ff8-9508f967d5cf" />
<img width="1919" height="913" alt="image" src="https://github.com/user-attachments/assets/561bd921-516b-405b-a168-65d2f10c8470" />
<img width="1897" height="915" alt="image" src="https://github.com/user-attachments/assets/b3c3d6fb-ab21-43aa-aeff-7593bd29b85b" />
<img width="1898" height="919" alt="image" src="https://github.com/user-attachments/assets/26152880-a8ba-435a-a186-0fa2d381c1e7" />


### Glosario técnico

<img width="1896" height="925" alt="image" src="https://github.com/user-attachments/assets/ff54a5f4-eb52-4091-8939-a740ab0fac24" />
<img width="1894" height="922" alt="image" src="https://github.com/user-attachments/assets/db0a912b-f828-4436-b32b-c554a699cee1" />
<img width="1900" height="923" alt="image" src="https://github.com/user-attachments/assets/e03ee687-b5a7-4516-a20b-4fae1e604006" />
<img width="1899" height="909" alt="image" src="https://github.com/user-attachments/assets/198ed676-2248-4f36-92bf-df9ac93809a6" />


### Panel administrativo

<img width="1894" height="915" alt="image" src="https://github.com/user-attachments/assets/4d8094b1-f04f-4b60-aa51-5c289b86201d" />

## Descripción general

SmartPC permite seleccionar un perfil de uso, definir un rango de presupuesto y agregar preferencias adicionales para obtener recomendaciones de computadoras. El sistema no vende productos directamente; únicamente orienta al usuario mediante análisis técnico y redirección a tiendas externas donde los equipos fueron encontrados.

El proyecto cuenta con:

* Landing principal.
* Recomendador de computadoras.
* Comparador de hasta 3 dispositivos.
* Modal de detalles técnicos por equipo.
* Glosario técnico.
* Aviso de privacidad.
* Términos de uso.
* Panel administrativo para revisión de productos obtenidos por scraping.
* Backend con motor de recomendación.
* Base de datos MySQL.
* Despliegue con Docker y Railway.

## Características principales

### Recomendador

El usuario puede seleccionar:

* Perfil de uso:

  * Oficina
  * Programación
  * Gaming
  * Diseño
* Presupuesto mínimo y máximo.
* Preferencias adicionales:

  * Portabilidad
  * Batería
  * Rendimiento gráfico
  * Almacenamiento
  * Pantalla
  * Costo-beneficio

Con esta información, SmartPC calcula un ranking de equipos considerando pesos por perfil y bonos por preferencias.

### Comparador

El sistema permite seleccionar hasta 3 equipos para compararlos en una tabla con sus principales especificaciones:

* Precio
* Score
* CPU
* RAM
* GPU
* Almacenamiento
* Pantalla

Las mejores especificaciones se resaltan visualmente cuando existe un ganador único.

### Detalles del equipo

Cada equipo cuenta con un modal de detalles donde se muestran:

* Especificaciones técnicas.
* Análisis SmartPC personalizado.
* Puntos destacados.
* Puntos a considerar.
* Acceso al glosario técnico.

### Glosario técnico

El glosario explica conceptos como CPU, GPU, RAM, SSD, almacenamiento, pantalla y otros términos relevantes para usuarios no técnicos.

### Panel administrativo

El panel administrativo permite revisar productos obtenidos mediante scraping, aprobarlos, descartarlos o convertirlos al catálogo principal.

Ruta del panel:

```txt
/admin/scraping
```

## Tecnologías utilizadas

### Frontend

* React
* Vite
* React Router DOM
* CSS personalizado
* Diseño responsive

### Backend

* Node.js
* Express
* MySQL2
* CORS
* dotenv
* node-cron
* Axios
* Cheerio

### Base de datos

* MySQL

### Despliegue

* Docker
* Docker Compose
* Railway
* Nginx para servir el frontend en producción

## Estructura del proyecto

```txt
SmartPC/
├── backend/
│   ├── database/
│   │   └── connection.js
│   ├── middlewares/
│   │   └── adminAuth.js
│   ├── scrapers/
│   ├── scripts/
│   ├── services/
│   ├── package.json
│   └── server.js
├── databases/
│   └── smartpc_db.sql
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   └── logo_only.svg
├── src/
│   ├── admin/
│   │   └── scraping/
│   │       ├── AdminScraping.jsx
│   │       └── AdminScraping.css
│   ├── config/
│   │   └── api.js
│   ├── glosario/
│   │   ├── Glosario.jsx
│   │   └── Glosario.css
│   ├── legales/
│   │   ├── AvisoPrivacidad.jsx
│   │   ├── AvisoPrivacidad.css
│   │   ├── TerminosUso.jsx
│   │   └── TerminosUso.css
│   ├── App.jsx
│   ├── App.css
│   ├── Home.jsx
│   ├── Home.css
│   ├── Recomendador.jsx
│   ├── Recomendador.css
│   └── main.jsx
├── Dockerfile.backend
├── Dockerfile.frontend
├── docker-compose.yml
├── package.json
├── vite.config.js
└── README.md
```

## Instalación local

### Requisitos previos

* Node.js
* npm
* MySQL o XAMPP
* Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/FiniteMusic/SmartPC.git
cd SmartPC
```

### 2. Instalar dependencias del frontend

```bash
npm install
```

### 3. Instalar dependencias del backend

```bash
cd backend
npm install
cd ..
```

### 4. Configurar variables de entorno del backend

Crear un archivo `.env` dentro de la carpeta `backend/`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=smartpc_db
DB_PORT=3306
PORT=3001
ADMIN_KEY=<tu_clave_admin>
```

Ajusta los valores según tu configuración local de MySQL.

### 5. Importar la base de datos

Importar el archivo:

```txt
databases/smartpc_db.sql
```

en MySQL o phpMyAdmin.

### 6. Ejecutar backend

Desde la carpeta `backend/`:

```bash
npm run dev
```

o:

```bash
npm start
```

El backend correrá en:

```txt
http://localhost:3001
```

### 7. Ejecutar frontend

Desde la raíz del proyecto:

```bash
npm run dev
```

El frontend correrá normalmente en:

```txt
http://localhost:5173
```

o en el puerto que indique Vite.

## Ejecución con Docker

El proyecto puede levantarse con Docker Compose, incluyendo frontend, backend y MySQL.

### 1. Construir y levantar contenedores

Desde la raíz del proyecto:

```bash
docker compose up -d --build
```

### 2. Servicios disponibles

```txt
Frontend: http://localhost:5174
Backend:  http://localhost:3001
MySQL:    localhost:3307
```

### 3. Detener contenedores

```bash
docker compose down
```

### 4. Reiniciar base de datos dockerizada

Si se modifica el archivo `databases/smartpc_db.sql`, es necesario borrar el volumen de MySQL para que Docker vuelva a importar la base:

```bash
docker compose down -v
docker compose up -d --build
```

## Variables de entorno

### Backend

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
PORT=
ADMIN_KEY=
FRONTEND_URL=
```

### Frontend

```env
VITE_API_URL=
```

En desarrollo local, si no existe `VITE_API_URL`, el frontend usará:

```txt
http://localhost:3001
```

Esto se define en:

```txt
src/config/api.js
```

## Despliegue en Railway

El proyecto se desplegó en Railway usando tres servicios:

```txt
SmartPC-Frontend
SmartPC-Backend
MySQL
```

### Backend en Railway

Variables principales:

```env
RAILWAY_DOCKERFILE_PATH=Dockerfile.backend
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
ADMIN_KEY=<tu_clave_admin> 
FRONTEND_URL=https://smartpc-frontend-production.up.railway.app
```

### Frontend en Railway

Variables principales:

```env
RAILWAY_DOCKERFILE_PATH=Dockerfile.frontend
VITE_API_URL=https://smartpc-backend-production.up.railway.app
```

### Nota sobre Vite y Docker

Como el frontend usa Vite, la variable `VITE_API_URL` debe estar disponible durante el build. Por eso el `Dockerfile.frontend` incluye:

```dockerfile
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
```

## Endpoints principales

### Estado del backend

```http
GET /api/status
```

### Equipos

```http
GET /api/equipos
GET /api/equipos/:id
```

### Recomendaciones

```http
POST /api/recomendaciones
```

Body de ejemplo:

```json
{
  "perfil": "Programacion",
  "presupuestoMin": 10000,
  "presupuestoMax": 25000,
  "preferencias": ["almacenamiento", "precio"]
}
```

### Pesos por perfil

```http
GET /api/perfiles/pesos
GET /api/perfiles/:nombre/pesos
```

### Scraping

```http
POST /api/scraping/ejecutar
GET /api/scraping/productos
PATCH /api/scraping/productos/:id/estado
POST /api/scraping/productos/:id/convertir
```

Los endpoints de scraping requieren autenticación mediante header:

```txt
x-admin-key
```

## Ejecución manual de scraping en producción

Ejemplo con PowerShell:

```powershell
Invoke-RestMethod `
  -Uri "https://smartpc-backend-production.up.railway.app/api/scraping/ejecutar" `
  -Method POST `
  -Headers @{ "x-admin-key" = "<tu_clave_admin>" } `
  -ContentType "application/json" `
  -Body '{"grupo":"oficina"}'
```

Otros grupos posibles:

```json
{"grupo":"programacion"}
{"grupo":"gaming"}
{"grupo":"diseno"}
```

## Consideraciones importantes

* SmartPC no vende productos directamente.
* Los enlaces externos redirigen a tiendas de terceros.
* Los precios y disponibilidad pueden cambiar sin previo aviso.
* Las recomendaciones son orientativas y dependen de la información disponible en el catálogo.
* El scraping debe ejecutarse con moderación para evitar bloqueos por exceso de solicitudes.
* En producción se recomienda no ejecutar pruebas masivas para evitar consumo innecesario de recursos.

## Estado del proyecto

Versión funcional en producción:

```txt
SmartPC v1.0 — Release de producción
```

Fecha de despliegue:

```txt
Junio 2026
```

## Autoría

Proyecto académico desarrollado para la materia de Calidad del Software.

Institución:

```txt
Instituto Politécnico Nacional — Escuela Superior de Cómputo
```

Carrera:

```txt
Ingeniería en Sistemas Computacionales
```

Equipo de desarrollo:

```txt
De la Cruz Velázquez Marco Uriel 
```

## Licencia

Este proyecto fue desarrollado con fines académicos.
El uso, modificación o distribución deberá respetar los lineamientos establecidos por el equipo desarrollador.
