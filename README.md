📦 Posts & Comments Manager - Backend

API RESTful para la gestión de posts y comentarios, construida con NestJS, MongoDB y Mongoose. Incluye CRUD completo, validaciones, carga masiva de posts y manejo global de errores.

🚀 Tecnologías utilizadas

- NestJS – Framework Node.js progresivo
- MongoDB – Base de datos NoSQL
- Mongoose – ODM para MongoDB
- class-validator – Validación de DTOs

TypeScript

📦 Instalación y ejecución

1. Clonar el repositorio
bash
git clone https://github.com/devmportillo/posts-comments-backend.git
cd posts-comments-backend
2. Instalar dependencias
bash
npm install
3. Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto (puedes copiar desde .env.example si existe):

env
MONGODB_URI=mongodb://localhost:27017/posts-comments-db
PORT=3000

⚠️ Asegúrate de tener MongoDB corriendo localmente o usa MongoDB Atlas.

4. Ejecutar en desarrollo
bash
npm run start:dev
El servidor estará disponible en http://localhost:3000

5. Ejecutar en producción

bash
npm run build
npm run start:prod

📚 Endpoints de la API

Posts

Método	Endpoint	Descripción
===============================
GET	     /posts 	Listar todos los posts
GET	     /posts/:id	Obtener un post por ID
POST	 /posts	    Crear un nuevo post
PUT	     /posts/:id	Actualizar un post
DELETE	 /posts/:id	Eliminar un post
POST	 /posts/bulk Carga masiva de posts

Comments

Método	Endpoint	Descripción
===============================
GET	    /comments?postId={id}	Listar comentarios de un post
POST	/comments	Crear un nuevo comentario
DELETE	/comments/:id	Eliminar un comentario

📝 Ejemplo de uso (carga masiva)
Endpoint: POST /posts/bulk
Body (JSON):

json
[
  {
    "title": "Introducción a NestJS",
    "body": "NestJS es un framework para construir aplicaciones Node.js escalables...",
    "author": "Carlos Rodríguez"
  },
  {
    "title": "MongoDB con Mongoose",
    "body": "Mongoose es una librería de modelado de objetos MongoDB...",
    "author": "Ana Martínez"
  }
]

Respuesta exitosa:

json
{
  "success": true,
  "message": "2 posts creados exitosamente",
  "data": [ ... ]
}

🧪 Archivos de prueba incluidos
En la raíz del proyecto se incluyen dos archivos para facilitar las pruebas:

1. bulk-posts-example.json
Contiene un arreglo de 5 posts de ejemplo listos para enviar al endpoint /posts/bulk.
👉 Ideal para probar la carga masiva rápidamente.

2. posts-comments-api-collection.json
Colección completa para Postman o Thunder Client con todas las peticiones preconfiguradas:

- CRUD de posts (crear, listar, obtener, actualizar, eliminar)

Carga masiva de posts

- CRUD de comentarios (crear, listar por post, eliminar)

Casos de error (validaciones, recursos no encontrados)

Cómo importar:

En Postman: File → Import y selecciona el archivo JSON.
En Thunder Client: Collections → Import y elige el archivo.

✅ Manejo de errores
Filtro global de excepciones que captura todos los errores (HTTP, MongoDB, validación) y devuelve una respuesta estandarizada.

Respuesta unificada mediante la clase ApiResponse:

json
{
  "success": true/false,
  "message": "Mensaje descriptivo",
  "data": { ... }
}
Validación automática de DTOs con class-validator. Ejemplo de error:

json
{
  "success": false,
  "message": "title must be longer than or equal to 3 characters",
  "status": 400
}

📁 Estructura del proyecto (resumen)

text

src/
├── common/
│   ├── filters/         # Global exception filter
│   ├── responses/       # ApiResponse util
│   └── dto/             # DTOs base (si los hay)
├── posts/
│   ├── dto/             # CreatePostDto, UpdatePostDto
│   ├── schemas/         # Post schema (Mongoose)
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   └── posts.module.ts
├── comments/
│   ├── dto/             # CreateCommentDto
│   ├── schemas/         # Comment schema
│   ├── comments.controller.ts
│   ├── comments.service.ts
│   └── comments.module.ts
└── main.ts

🤝 Contribuciones
Este proyecto es parte de una prueba técnica.

📄 Licencia
MIT