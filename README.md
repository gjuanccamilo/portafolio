# Portafolio de Juan Camilo Giraldo Gomez

Portafolio personal de un desarrollador de software enfocado en backend, hecho con **HTML5, CSS y JavaScript nativo**: sin frameworks, sin librerías y sin paso de compilación. Está listo para publicarse gratis en **Netlify** o **Vercel**.

> Esta guía está escrita para quien apenas está aprendiendo. Si una palabra te suena rara, mira el pequeño glosario del final.

---

## 1. Estructura de carpetas

```
portfolio/
├── index.html          ← el contenido: todas las secciones de la página
├── css/
│   └── styles.css      ← el diseño: colores, tarjetas, animaciones, responsive
├── js/
│   └── main.js         ← el comportamiento: tema oscuro, intro, terminal, tarjetas
├── assets/
│   ├── favicon.svg     ← el iconito de la pestaña
│   ├── img/            ← fotos y capturas
│   └── video/          ← video del riego inteligente y su portada
├── netlify.toml        ← configuración para Netlify
├── vercel.json         ← configuración para Vercel
├── .gitignore          ← archivos que Git debe ignorar
└── README.md           ← esta guía
```

Piensa en una casa: `index.html` son las paredes y habitaciones, `styles.css` la pintura y la decoración, y `main.js` la electricidad.

## 2. Verlo en tu computador

1. Descarga y descomprime el proyecto.
2. Haz doble clic en `index.html`. Se abre en tu navegador.

Mejor opción: instala **Visual Studio Code** y la extensión **Live Server**; clic derecho sobre `index.html` → *Open with Live Server*. La página se recarga sola cada vez que guardas un cambio.

## 3. Subirlo a GitHub (recomendado)

Subirlo a GitHub te permite publicar en Netlify o Vercel y que cada cambio se actualice solo.

1. Crea un repositorio nuevo en [github.com](https://github.com/new) (por ejemplo `portafolio`). No marques "Add README".
2. En la carpeta del proyecto, abre una terminal y escribe:

```bash
git init
git add .
git commit -m "Primer commit del portafolio"
git branch -M main
git remote add origin https://github.com/gjuanccamilo/portafolio.git
git push -u origin main
```

(Cambia `portafolio` por el nombre de tu repositorio.)

## 4. Publicar en Netlify

**Opción A: arrastrar y soltar (la más fácil)**
1. Entra a [app.netlify.com](https://app.netlify.com) y crea una cuenta.
2. Ve a **Add new site → Deploy manually**.
3. Arrastra la carpeta completa del proyecto. En unos segundos tendrás un enlace `https://algo.netlify.app`.

**Opción B: desde GitHub (se actualiza solo)**
1. **Add new site → Import an existing project → GitHub**, y elige tu repositorio.
2. Deja **Build command** vacío y **Publish directory** como `.` (el archivo `netlify.toml` ya lo indica).
3. Pulsa **Deploy**. Cada `git push` publicará la nueva versión.

Para cambiar el nombre del enlace: **Site configuration → Change site name**.

## 5. Publicar en Vercel

**Opción A: desde GitHub (recomendada)**
1. Entra a [vercel.com](https://vercel.com) y regístrate con tu cuenta de GitHub.
2. **Add New → Project**, y elige tu repositorio.
3. En **Framework Preset** deja **Other**. No pongas comando de compilación. Deja el directorio de salida por defecto.
4. Pulsa **Deploy**. Obtendrás un enlace `https://algo.vercel.app`.

**Opción B: desde la terminal**
```bash
npm i -g vercel
vercel          # primera vez: responde las preguntas
vercel --prod   # publica en producción
```

## 6. Cómo cambiar tu contenido

Todo el texto está en `index.html`. Abre el archivo y busca lo que quieras cambiar con `Ctrl + F`.

- **Cambiar un texto:** edita lo que está entre las etiquetas, por ejemplo `<p>Mi texto</p>`.
- **Cambiar una foto:** reemplaza el archivo en `assets/img/` por otro **con el mismo nombre**. Recomendado: JPG de menos de 200 KB.
- **Agregar un proyecto:** copia un bloque `<article class="box proj">...</article>` dentro de la sección `#proyectos` y cambia título, descripción, etiquetas y enlace.
- **Agregar una habilidad:** dentro de la sección `#tecnicas`, agrega `<li>Nueva habilidad</li>` en la tarjeta que corresponda.
- **Cambiar colores:** en `css/styles.css`, al principio, están las variables (`--blue`, `--card`, etc.).

## 7. Arquitectura y decisiones

### Qué tipo de proyecto es
Un **sitio estático de una sola página**: no tiene servidor ni base de datos. El navegador descarga tres archivos (HTML, CSS, JS) más las imágenes y arma todo. Por eso se aloja gratis y carga rápido.

### Decisiones tomadas

| Decisión | Por qué |
|---|---|
| **HTML, CSS y JS nativos** (sin React ni Angular) | Fue tu elección: ayuda a entender cómo funciona la web por dentro, y no hay nada que instalar ni compilar. |
| **Una sola página con anclas** (`#proyectos`, `#contacto`…) | Un portafolio es corto; una página es más simple y fácil de recorrer. |
| **HTML semántico** (`header`, `nav`, `main`, `section`, `article`, `figure`) | Mejora la accesibilidad y el posicionamiento en buscadores. |
| **Tarjetas apiladas con `position: sticky`** | Logra el efecto de que cada tarjeta se ponga encima de la anterior usando solo CSS, con poco JavaScript. |
| **Variables CSS** (`--blue`, `--card`…) | Cambian el tema claro/oscuro sin repetir estilos. |
| **Sin librerías** | Menos peso, menos fallos, nada que actualizar. |
| **Imágenes y video optimizados** | Todo el proyecto pesa menos de 1 MB. |
| **Preferencias del usuario respetadas** | Si alguien tiene activado "reducir movimiento", las animaciones se apagan. |

### Cómo se reparten las tareas
- **HTML** decide *qué* hay en la página.
- **CSS** decide *cómo se ve* y se adapta a celular y computador (`@media`).
- **JavaScript** decide *cómo se mueve*: ver sección 9.

## 8. Descripción de las secciones (los "componentes")

Como no usamos un framework, cada bloque de la página es una `<section>` con su propio `id`:

| Sección | `id` | Qué contiene |
|---|---|---|
| **Menú** | (header) | Enlaces a cada sección y botón de tema claro/oscuro. Se queda fijo arriba con efecto de vidrio. |
| **Inicio** | `#inicio` | Tu foto, tu nombre que se "escribe" solo, tu rol, dos botones y una **terminal interactiva** con 5 comandos. |
| **Sobre mí** | `#sobre-mi` | Quién eres y tu visión. |
| **Educación y experiencia** | `#experiencia` | Tarjetas con tu recorrido: Semillero Quipux, proyecto de media técnica, reto del Pac-Man y educación. |
| **Proyectos** | `#proyectos` | Tres tarjetas con foto o video, tecnologías y botón. |
| **Habilidades técnicas** | `#tecnicas` | Tarjetas por categoría: programación, web, bases de datos, paradigma, hardware y herramientas. |
| **Habilidades blandas** | `#blandas` | Tarjetas y la historia **"Cabeza fría, código caliente"**. |
| **Hobbies** | `#hobbies` | La historia de la Wii con ilustración y las tarjetas de tus otros hobbies. |
| **Contacto** | `#contacto` | Ubicación, correo, teléfono y GitHub. |

**Piezas reutilizables** (clases CSS que se repiten):
- `.box`: tarjeta pequeña con fondo suave que se eleva al pasar el mouse.
- `.btn`: botón de píldora con degradado azul que cambia a índigo/púrpura al pasar el mouse.
- `.chips`: etiquetas redondeadas (tecnologías).
- `.ico`: cuadrito con degradado y un emoji, como un icono de app.
- `.story`: bloque destacado para historias largas.
- `.proj`: tarjeta de proyecto (imagen, texto, etiquetas y botón siempre abajo).

## 9. Cómo funciona `main.js`

1. **Tema claro/oscuro:** guarda tu elección en el navegador (`localStorage`).
2. **Intro:** escribe tu nombre letra por letra y luego muestra el resto.
3. **Terminal:** al pulsar un comando, escribe la respuesta. Los textos están en el objeto `CMD`; ahí puedes editarlos.
4. **Pila de tarjetas:** calcula la posición pegajosa de cada tarjeta y encoge un poco la que queda debajo.
5. **Animaciones al subir y bajar:** en cada movimiento del scroll revisa qué elementos están a la vista. Los que entran aparecen y los que salen desaparecen, así se repiten al subir y bajar.
6. **Navegación interna:** hace que los enlaces del menú lleguen bien a tarjetas apiladas.

## 10. Accesibilidad y responsive

- Enlace **"Saltar al contenido"** (aparece al pulsar `Tab`).
- Navegación completa con teclado y foco visible.
- Secciones etiquetadas (`aria-labelledby`), textos alternativos en las imágenes y avisos para lectores de pantalla en la terminal.
- Contraste de color revisado y botones de al menos 44 px.
- Respeta *reducir movimiento* y el modo oscuro del sistema.
- **Responsive:** el diseño se adapta con `flex`, `clamp()` y `@media` (una tarjeta por fila en celular).

## 11. Límites conocidos y próximos pasos

- No se ha probado en todos los navegadores y dispositivos; conviene revisarlo en tu celular y en Chrome, Firefox y Safari.
- La tipografía **Inter** se carga desde Google Fonts; sin internet se usa la tipografía del sistema.
- `css/styles.css` está hecho por "capas" que se van ajustando; funciona bien, pero se puede unificar.
- Para compartir el enlace con vista previa (WhatsApp, LinkedIn) falta una imagen `og:image` con la URL completa del sitio publicado.
- Ideas que fortalecerían el portafolio: botón de **descargar CV**, un **caso de estudio** de Glowsmec (con diagrama de la base de datos), enlaces a **código en GitHub**, una sección **"Qué busco"** y un **dominio propio**.

## Glosario rápido

- **Estático:** la página no cambia según quién entre; son archivos fijos.
- **Despliegue (deploy):** publicar tu página en internet.
- **Repositorio:** carpeta de tu proyecto guardada en GitHub.
- **Responsive:** que la página se adapte a pantallas grandes y pequeñas.
- **Semántico:** usar etiquetas HTML que describen su función, no solo su aspecto.
- **Sticky:** un elemento que "se pega" en cierta posición mientras haces scroll.
