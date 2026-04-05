# WIKI — Portfolio Sandra Gonzalez

> Documento de referencia para sesiones futuras. Leer antes de trabajar en el proyecto.

---

## Qué es este proyecto

Portfolio web privado para **Sandra Gonzalez**, diseñadora UI/UX. La web es estéticamente premium, rápida y gestionable por Sandra sin conocimientos de programación a través de un panel de administración (Decap CMS).

**URL de producción:** https://fastidious-malasada-8c0a34.netlify.app  
**Repositorio:** https://github.com/afketo/sandra-portfolio  
**Panel admin:** https://fastidious-malasada-8c0a34.netlify.app/admin  

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Astro v6 (`output: 'server'` — SSR) |
| Estilos | Tailwind CSS v4 |
| CMS | Decap CMS v3 (git-based, sin base de datos) |
| Hosting | Netlify (plan gratuito) |
| Autenticación CMS | Netlify Identity + Git Gateway |
| Fuentes | DM Serif Display + DM Sans (Google Fonts) |
| Adapter | `@astrojs/netlify` |

---

## Diseño — Decisiones clave

| Elemento | Decisión |
|----------|---------|
| Inspiración | Portfolio de Lucas Simons — ultra minimalista |
| Fondo | `#111111` (negro profundo cálido) |
| Texto | `#F5F5F0` (off-white cálido) |
| Headings | DM Serif Display (serif elegante) |
| Body/UI | DM Sans (sans-serif limpia) |
| Acento admin | `#c9b99a` (dorado suave) |

---

## Estructura de archivos críticos

```
sandra-portfolio/
├── src/
│   ├── layouts/Layout.astro          # Layout base con Nav, fuentes, padding
│   ├── components/
│   │   ├── LogoSG.astro              # Logo SVG animado (stroke-dashoffset)
│   │   ├── Nav.astro                 # Navbar fija con blur, 72px altura
│   │   └── IconoServicio.astro       # 4 iconos SVG inline (research/ui/prototype/brand)
│   ├── middleware/index.ts           # Protección por contraseña (cookie sg_session)
│   ├── pages/
│   │   ├── index.astro               # Homepage: jumbo + grid 2 cols
│   │   ├── lock.astro                # Pantalla de contraseña + Netlify Identity widget
│   │   ├── servicios.astro           # Lista con iconos SVG y separadores
│   │   ├── sobre-mi.astro            # Bio + foto, grid 2 cols
│   │   ├── contacto.astro            # Email + redes sociales
│   │   ├── trabajo/[slug].astro      # Detalle de proyecto (SSR dinámico con getEntry)
│   │   ├── admin/index.astro         # Panel Decap CMS con tema oscuro
│   │   └── api/unlock.ts             # POST endpoint para validar código de acceso
│   ├── content/
│   │   ├── trabajos/                 # Archivos .md de cada proyecto
│   │   ├── servicios/                # Archivos .md de cada servicio
│   │   └── config/site.json          # Configuración global (código de acceso, redes, etc.)
│   └── styles/global.css             # CSS global: fuentes, variables, scrollbar
├── public/
│   ├── admin/
│   │   ├── config.yml                # Configuración de Decap CMS (colecciones, campos)
│   │   ├── index.html                # Fallback estático del admin (redundante con la página Astro)
│   │   └── admin.css                 # Tema oscuro del panel de administración
│   ├── favicon.svg                   # Logo SG como favicon
│   └── images/                       # Imágenes subidas por Sandra desde el CMS
├── src/content.config.ts             # Schema Zod de las colecciones (Astro v5 Content Layer)
├── astro.config.mjs                  # Astro config: SSR + Tailwind + Netlify adapter
├── netlify.toml                      # Config de build para Netlify
└── WIKI.md                           # Este archivo
```

---

## Sistema de autenticación

### Contraseña del portfolio (visitantes)
- El middleware en `src/middleware/index.ts` intercepta todas las rutas
- Rutas públicas: `/`, `/lock`, `/api/unlock`, `/admin/*`, `/_astro/*`
- Si no hay cookie `sg_session` válida → redirige a `/lock`
- `/` es especial: sirve página mínima que detecta tokens de Netlify Identity en el hash
- Al entrar el código correcto → se setea la cookie por 30 días

**Código actual:** `sandra2024` (editable desde el admin en Configuración General)

### Admin (Decap CMS)
- Autenticación via Netlify Identity
- Sandra tiene cuenta con su email
- Para invitar nuevos admins: Netlify dashboard → Identity → Invite users

### Flujo de recuperación/invitación
Los enlaces de Netlify llevan el token en el hash de la URL (`#invite_token=...`). Dado que el middleware redirige todo a `/lock`, el hash se perdería en un redirect de servidor. Por eso `/` es pública y tiene un script cliente que detecta el token antes de redirigir.

---

## Colecciones del CMS

### Trabajos (`src/content/trabajos/*.md`)
Campos:
- `title` — Título del proyecto
- `categoria` — Disciplina (ej: "UI Design · UX Research")
- `year` — Año (número)
- `featured` — Boolean: si es `true`, aparece como **jumbo** (ancho completo) en el index
- `cover` — Imagen de portada (JPG, PNG, WebP, **GIF**)
- `order` — Orden de aparición (menor = antes)
- `draft` — Boolean: si es `true`, no aparece en la web
- `bloques` — Array de bloques ordenables:
  - `{ type: 'texto', texto: '...(markdown)...' }`
  - `{ type: 'imagen', imagen: '/images/foto.jpg', caption: 'Pie de foto' }`

**URL de cada proyecto:** `/trabajo/[nombre-del-archivo-sin-extension]`  
Los archivos se nombran con el slug del título (ej: `rediseno-app-bancaria.md` → `/trabajo/rediseno-app-bancaria`)

### Servicios (`src/content/servicios/*.md`)
Campos: `title`, `descripcion`, `icono` (research/ui/prototype/brand), `order`

### Configuración General (`src/content/config/site.json`)
Campos: `accessCode`, `siteTitle`, `siteSubtitle`, `email`, `instagram`, `linkedin`, `behance`

---

## Homepage — lógica del grid

```
featured = true  →  JUMBO (16:7, ancho completo, con badge "destacado")
featured = false →  Grid 2 columnas (4:3)
```

Si no hay cookie válida, el index sirve una página mínima que:
1. Busca tokens en el hash de la URL (`#invite_token`, `#recovery_token`)
2. Si hay token → Netlify Identity lo procesa (modal de contraseña del CMS)
3. Si no hay token → redirige a `/lock`

---

## Animaciones

- **Logo SG**: SVG con `stroke-dashoffset` animado al cargar. S se dibuja primero (0s), G después (0.4s delay).
- **Cards y secciones**: `IntersectionObserver` con clase `.reveal` → `.visible`. Transition: `opacity + translateY`. Delay escalonado por `--i` CSS variable.

---

## Imágenes y GIFs

- Las imágenes se suben desde el admin a `/public/images/`
- Se sirven en la ruta `/images/...`
- **GIFs animados son soportados**: se usan `<img>` nativos (sin Astro Image component), por lo que los GIFs se reproducen automáticamente
- En el admin, el campo de imagen acepta: JPG, PNG, WebP, GIF

---

## Panel de administración

- **Ruta:** `/admin/`
- **Tecnología:** Decap CMS v3 (cargado desde CDN de unpkg)
- **Tema:** CSS oscuro custom en `/public/admin/admin.css`
  - Usa selectores de elementos HTML (`body header`, `body input`, etc.) porque Decap v3 usa styled-components con hashes aleatorios en producción
  - No usar `[class*="NombreComponente"]` — no funciona
- **Preview:** Panel derecho muestra preview visual del proyecto (título, cover, categoría, año)
- **Bloques expandidos:** `collapsed: false` en el widget list y cada tipo de objeto

---

## Comandos útiles

```bash
# Desarrollo local
cd /opt/projects/sandra-portfolio
NODE_ENV=development npx astro dev --port 4321 --host 10.9.0.1

# Build de producción
npm run build

# Ver logs del servidor de desarrollo
tail -f /tmp/astro-dev.log
```

**Puertos en el VPS:**
- `4321` → Astro dev server (requiere regla UFW: `sudo ufw allow in on wg0 to any port 4321 proto tcp`)
- `8081` → Ya no se usa (era el proxy de Decap CMS local, eliminado)

**Acceso VPN:** El servidor VPS es accesible via WireGuard en `10.9.0.1`

---

## Deploy en Netlify

1. Push a `main` en GitHub → Netlify detecta y redeploya automáticamente
2. Build command: `npm run build`
3. Publish directory: `dist/`
4. Node version: 22

**Variables necesarias en Netlify:** ninguna (todo está en archivos del repo)

**Para que el CMS funcione tras deploy:**
- Netlify → Site settings → Identity → Enable
- Identity → Registration → Invite only
- Identity → Services → Git Gateway → Enable
- Invitar a Sandra: Identity → Invite users → su email

---

## Proyectos de ejemplo (datos semilla)

| Archivo | Título | Featured |
|---------|--------|---------|
| `rediseno-app-bancaria.md` | Rediseño App Bancaria | ✅ (jumbo) |
| `sistema-de-diseno-startup-saas.md` | Sistema de Diseño — Startup SaaS | ❌ |
| `identidad-visual-marca-de-moda.md` | Identidad Visual — Marca de Moda | ❌ |

Todos usan imágenes de Unsplash (URLs externas). Sandra debe reemplazarlas con sus proyectos reales desde el admin.

---

## Pendiente / Próximos pasos sugeridos

- [ ] Sandra reemplaza los proyectos de ejemplo con sus proyectos reales
- [ ] Sandra sube su foto en la página "Sobre mí" y actualiza su bio
- [ ] Sandra actualiza el email y redes sociales en Configuración General
- [ ] Sandra cambia el código de acceso desde el admin
- [ ] Configurar dominio personalizado en Netlify (cuando Sandra lo tenga)
- [ ] Revisar accesibilidad WCAG AA en el formulario de contacto
- [ ] Considerar añadir página 404 personalizada
