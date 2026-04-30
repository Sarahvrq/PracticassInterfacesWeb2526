# Clon de Twitter — Next.js
 
Aplicación web desarrollada con Next.js y TypeScript que consume una API REST propia para simular las funcionalidades principales de Twitter: publicar posts, dar likes, retweets, seguir usuarios y comentar.
 
## Instalación y Configuración
 
Para ejecutar este proyecto localmente, sigue estos pasos:
 
1. **Instalar dependencias:**
   ```bash
   npm install
   ```
 
2. **Arrancar el proyecto:**
   ```bash
   npm run dev
   ```
 
## Navegación
 
La aplicación cuenta con un layout común con cabecera compartida y cuatro páginas principales:
 
- `/` — Feed principal con los últimos posts, paginación, botones de like/retweet y formulario para publicar
- `/post/[id]` — Detalle de un post con comentarios y formulario para comentar
- `/profile/[username]` — Perfil de usuario con estadísticas, botón de seguir y listado de posts paginado
- `/login` — Formulario de login y registro alternados en la misma página
Si el usuario no tiene token en las cookies, el proxy de Next.js le redirige automáticamente a `/login`.
 
## Datos anidados de la API
 
Algunos endpoints devuelven objetos anidados, como el autor dentro de un post o el usuario dentro de un comentario. Estos se desestructuran directamente al renderizar cada componente para mantener el código limpio y evitar pasar demasiadas props entre componentes.
 
