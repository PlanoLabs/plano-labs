# PLANO LABS 2.0

Esta entrega conserva la integración existente con Supabase, autenticación, catálogo, portfolio y contacto.

## Cambios incluidos

- Inicio conservado.
- Universo PLANO LABS con cinco nodos: Creatividad, Diseño, Desarrollo, Estrategia y Detrás de PLANO LABS.
- Carrusel de logos reales del portfolio y fichas de proyecto existentes.
- Catálogo interactivo con sus fichas.
- Preguntas frecuentes entre Catálogo y Contacto.
- Contacto con el mensaje “Hagamos realidad tu idea” y recorridos visuales hacia los canales.
- Footer minimalista preservado.
- Administrador reducido a Catálogo, Portfolio y Contacto.

## Supabase y migración

No requiere migración SQL: se mantiene el esquema `cms_documents`, el bucket `site-media`, las políticas y las claves ya utilizados por la aplicación.

## Publicación

1. Reemplazá el proyecto por esta carpeta.
2. Conservá en el proveedor de hosting las mismas variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` (o `VITE_SUPABASE_ANON_KEY`).
3. Ejecutá `npm install` y `npm run build` al desplegar.

El paquete no incluye credenciales ni `node_modules`.
