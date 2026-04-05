# DEFINICIÓN DEL PROYECTO: Portfolio Sandra Gonzalez

## Objetivo
Crear un portfolio web para Sandra Gonzalez (Diseñadora UI/UX). La web debe ser estéticamente premium, rápida y altamente accesible, pero gestionable por una persona sin conocimientos de programación.

## Stack Tecnológico Requerido
- **Framework:** Astro (SSG)
- **Estilos:** Tailwind CSS
- **CMS:** Decap CMS (Git-based CMS) para la gestión de contenido.
- **Hosting/Deploy:** Netlify o Vercel.
- **Animaciones:** CSS puro o Framer Motion (especialmente para el logo de SG).

## Restricciones y Reglas Core
1. **Acceso Privado:** La web pública debe estar bloqueada por un código (contraseña). Este código debe ser editable desde el panel de administración (Decap CMS) por la diseñadora. Utilizar middleware de Astro para proteger las rutas.
2. **Sin Backend Propio:** No usar bases de datos como Postgres o MongoDB. Todo el contenido y configuración (incluido el código de acceso) debe vivir en archivos Markdown/JSON gestionados a través del CMS.
3. **Estructura de la Web:**
   - Pantalla de Bloqueo (Input para el código)
   - Mis trabajos (Portfolio grid)
   - Mis servicios (Cards de servicios)
   - Sobre mí (Bio y foto)
   - Contacto (Formulario o links a redes/email)
4. **Animación:** El logo "SG" debe ser un SVG animado al cargar la página.

## Sistema de Diseño — Paleta Vainilla 2026

### Filosofía
Paleta construida sobre una única temperatura: **ámbar muy apagado**. El ojo percibe calidez sin identificar el color. Sensación analógica — como papel de calidad — en entorno digital. Nunca blancos puros, nunca negros puros, nunca grises fríos.

**Regla raíz:** un solo valor cromático (vainilla/ámbar), dos valores de luminosidad (claro extremo / oscuro extremo), y grises que tiran levemente hacia ese ámbar.

### Tipografía
- **Toda la web:** `Trocchi` (Google Fonts) — serif elegante, warm, con personalidad
- Tamaños grandes y protagonistas

### Tokens de Color

#### Fondos
| Token | HEX | Uso |
|---|---|---|
| `bg-base` | `#F7F4EE` | Fondo principal de página |
| `bg-surface` | `#F2EDE3` | Secciones alternadas, sidebars, paneles secundarios |
| `bg-card` | `#EDE8DC` | Cards de proyecto y servicios |
| `bg-sunken` | `#E6E0D2` | Inputs, áreas hundidas |

#### Texto
| Token | HEX | Uso |
|---|---|---|
| `text-primary` | `#1C1916` | Texto de cuerpo principal |
| `text-secondary` | `#4A4540` | Metadatos, fechas, categorías |
| `text-muted` | `#7A736A` | Notas, placeholders — mínimo 15px |
| `text-disabled` | `#AEA89F` | Solo estados inactivos |
| `text-on-dark` | `#F5F0E8` | Texto sobre fondos oscuros |
| `text-on-dark-muted` | `#C4BDB1` | Texto secundario sobre fondos oscuros |

#### Cabeceras
| Token | HEX | Uso |
|---|---|---|
| `heading-h1` | `#0F0D0B` | H1 y display grande |
| `heading-h2` | `#1C1916` | H2 |
| `heading-h3` | `#2E2A25` | H3 |
| `heading-display-light` | `#F5F0E8` | H1 sobre fondos oscuros |

#### Hero / Jumbo
| Token | HEX | Uso |
|---|---|---|
| `hero-bg` | `#1A1714` | Fondo hero fullscreen y pantalla de lock |
| `hero-bg-alt` | `#F7F4EE` | Hero variante clara |
| `hero-text-primary` | `#F5F0E8` | Texto principal del hero sobre oscuro |
| `hero-text-accent` | `#D4C9B0` | Subtítulo / tagline en hero oscuro |
| `hero-text-dark` | `#0F0D0B` | Texto del hero sobre variante clara |

#### Acentos
| Token | HEX | Uso |
|---|---|---|
| `accent` | `#8B7355` | Acento principal — links de acción, botón primario, nav activo |
| `accent-hover` | `#6E5B40` | Hover del acento |
| `accent-active` | `#55452F` | Estado presionado |
| `accent-subtle` | `#D4C9B0` | Fondos de badges, tags, highlights |
| `accent-subtle-text` | `#5C4A32` | Texto sobre `accent-subtle` |

#### Bordes y Separadores
| Token | HEX | Uso |
|---|---|---|
| `border-default` | `#DDD7CC` | Inputs, cards con borde, dividers |
| `border-subtle` | `#E8E3D9` | Separadores suaves entre secciones |
| `border-strong` | `#C4BDB1` | Énfasis, inputs en foco |
| `border-on-dark` | `#3A3530` | Separadores sobre fondos oscuros |
| `border-accent` | `#8B7355` | Input activo/focused |

#### Navegación
| Token | HEX | Uso |
|---|---|---|
| `nav-bg` | `#F7F4EE` | Fondo nav modo claro |
| `nav-bg-scrolled` | `#F2EDE3` | Nav al hacer scroll |
| `nav-text` | `#4A4540` | Ítems de nav normal |
| `nav-text-hover` | `#0F0D0B` | Nav hover |
| `nav-text-active` | `#0F0D0B` | Ítem de nav activo |
| `nav-indicator` | `#8B7355` | Indicador visual activo |

#### Botones
| Token | HEX | Uso |
|---|---|---|
| `btn-primary-bg` | `#1C1916` | Botón primario fondo |
| `btn-primary-text` | `#F5F0E8` | Botón primario texto |
| `btn-primary-hover-bg` | `#0F0D0B` | Botón primario hover |
| `btn-secondary-border` | `#1C1916` | Ghost button borde |
| `btn-secondary-hover-bg` | `#1C1916` | Ghost button hover (se rellena) |
| `btn-accent-bg` | `#8B7355` | Botón de acento (Ver proyecto, CTAs) |
| `btn-accent-hover-bg` | `#6E5B40` | Hover botón de acento |

#### Overlays (hover sobre imágenes)
| Token | Valor | Uso |
|---|---|---|
| `overlay-dark` | `#1A1714` 70% | Hover sobre cards de proyecto |
| `overlay-dark-subtle` | `#1A1714` 40% | Permanente sobre hero con texto |
| `overlay-dark-strong` | `#1A1714` 85% | Imágenes muy brillantes |
| `overlay-text-color` | `#F5F0E8` | Texto sobre cualquier overlay oscuro |
| `overlay-meta-color` | `#D4C9B0` | Año, categoría sobre overlay |

### Reglas de Uso

**Combinaciones correctas:**
- `bg-base` + `text-primary` — par base, siempre funciona
- `hero-bg` + `hero-text-primary` — contraste máximo para hero
- `bg-card` + `heading-h2` + `text-secondary` — estructura de cards
- `btn-primary-bg` + `btn-primary-text` — el par más elegante del sistema

**Combinaciones prohibidas:**
- Nunca `text-muted` para texto informativo real — solo decorativo
- Nunca `accent` como color de texto largo
- Nunca blanco puro `#FFFFFF` salvo bold sobre fondo oscuro
- Nunca negro puro `#000000` — siempre marrón muy oscuro
- Nunca grises fríos en ningún token

**Contraste WCAG:**
- `text-primary` / `bg-base` → ~14:1 (AAA)
- `text-secondary` / `bg-base` → ~6.5:1 (AA/AAA)
- `text-muted` / `bg-base` → ~4.2:1 (AA, mínimo 15px)
- `hero-text-primary` / `hero-bg` → ~13:1 (AAA)
- `accent` como texto → mínimo 18px o bold 14px

### Homepage (Index = Mis Trabajos)
- Grid de proyectos directo, sin hero ni intro
- 2 columnas en desktop, 1 en móvil
- Cada card: imagen `aspect-ratio 4/3` + título grande debajo + categoría pequeña
- Sin bordes ni sombras — solo espaciado como separador
- Hover: escala sutil `scale-[1.01]` + overlay oscuro con año del proyecto

### Página de Servicios
- Grid 2×2 o 3×2 según número de servicios
- Cada celda: icono SVG de línea (stroke, sin fill, 28-32px) + nombre grande + descripción breve
- Separadores horizontales finos (`border-t`) en lugar de cards con bordes

### Navegación
- Ultra simplificada: Trabajos · Servicios · Sobre mí · Contacto
- Logo SVG animado "SG" como anchor visual a la izquierda

### Pantalla de Lock (Contraseña)
- Solo el logo SG animado + un input minimalista sin label visible
- Fondo `#111111` completo
