# Sandra González — Portfolio

Portfolio web privado para Sandra González, diseñadora UI/UX. Acceso mediante código personal configurable desde el CMS.

## Stack

- **Framework:** [Astro](https://astro.build) (SSR)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com) v4
- **CMS:** [Storyblok](https://storyblok.com) — editor visual, sin conocimientos técnicos
- **Hosting:** [Vercel](https://vercel.com)

## Estructura del proyecto

```
src/
├── components/         # Componentes reutilizables (Nav, Footer, LogoSG...)
├── layouts/            # Layout principal con nav y estilos globales
├── lib/
│   └── storyblok.ts    # Helper de API: getTrabajos, getServicios, getSiteConfig
├── middleware/         # Protección por contraseña (cookie sg_session)
├── pages/
│   ├── index.astro           # Portfolio grid (trabajos)
│   ├── trabajo/[slug].astro  # Página de proyecto individual
│   ├── servicios.astro       # Servicios ofrecidos
│   ├── sobre-mi.astro        # Página bio
│   ├── contacto.astro        # Contacto y redes
│   ├── lock.astro            # Pantalla de acceso con contraseña
│   └── api/unlock.ts         # Endpoint que valida el código y setea la cookie
└── styles/
    └── global.css            # Tokens de color, tipografía Trocchi, variables CSS
```

## Gestión de contenido (Storyblok)

Todo el contenido se gestiona desde **storyblok.com**. Estructura de stories:

```
trabajos/          → Proyectos del portfolio (componente: trabajo)
servicios/         → Servicios ofrecidos (componente: servicio)
config/site        → Configuración global del sitio (componente: site_config)
```

### Componentes disponibles en cada trabajo

| Bloque | Uso |
|---|---|
| `bloque_texto` | Texto enriquecido con Markdown (títulos, listas, párrafos) |
| `bloque_imagen` | Imagen o GIF con pie de foto opcional |

### Campos de configuración global (`config/site`)

`heroLine1..4`, `heroBgImage`, `aboutIntro`, `aboutBody`, `aboutImage`, `contactIntro`, `email`, `instagram`, `linkedin`, `behance`, `accessCode`

## Variables de entorno

Crear un archivo `.env` en local (no se sube al repo):

```env
STORYBLOK_PREVIEW_TOKEN=tu_preview_token
STORYBLOK_PUBLIC_TOKEN=tu_public_token
STORYBLOK_SPACE_ID=tu_space_id
ACCESS_CODE=tu_codigo_de_acceso   # fallback si Storyblok no está disponible
```

En Vercel estas variables se configuran en **Settings → Environment Variables**.

## Desarrollo local

```bash
npm install
npm run dev       # http://localhost:4321
```

## Deploy

El deploy es automático en Vercel al hacer push a `main`. No se requiere ninguna configuración adicional.

## Acceso protegido

La web requiere un código de acceso que se valida contra `accessCode` en `config/site` de Storyblok. Sandra puede cambiarlo desde el CMS sin tocar código. El código se almacena en una cookie de sesión (`sg_session`).

El editor visual de Storyblok bypasea el lock automáticamente mediante el parámetro `_storyblok` en la URL.
