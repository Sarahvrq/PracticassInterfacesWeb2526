# Listado de Paises - Next

Este proyecto es una aplicación web que consume la API de REST Countries para mostrar un listado de países del mundo con información detallada de cada uno.

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

La navegación está construida con Next.js App Router. La ruta principal (`/`) muestra el listado de todos los países. Al hacer clic en "Ver país", se navega a la ruta dinámica `/country/[name]` usando `useRouter` de `next/navigation`. En la página de detalle, se lee el parámetro `name` de la URL con `useParams` y se usa `decodeURIComponent` para recuperar el nombre original del país.
