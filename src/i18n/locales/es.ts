import type { I18nStrings } from "@/i18n/types";

const baseStrings = {
  "site.title": "Luismi Barcos",
  "site.desc":
    "Situado en España, Luismi es un experto en backend apasionado por Java y Kotlin, y un gran fanático de la programación funcional.",
};

const ESLocale: I18nStrings = {
  ...baseStrings,
  "hero.title": "Luismi Barcos",
  "hero.body": `
<p>
Hola, soy un <b>desarrollador de software</b> apasionado por crear soluciones prácticas.<br>
Trabajo sobre todo con <b>Java</b> y <b>REST APIs</b>, aunque también me interesa <b>Kotlin</b> y la <b>programación funcional</b>.
</p>
<br/>
<p>
Me gusta aprender sobre <b>arquitectura de software</b> y <b>código limpio</b>, y explorar formas de mejorar mi <b>productividad personal</b>.
</p>
<br/>
<p>
Este es mi <b>blog personal</b>, donde comparto reflexiones y experimentos por curiosidad y diversión.  
</p>
`,
  "hero.beforeReadme": "",
  "hero.readme": "",
  "hero.afterReadme": "",
  copy: "copiar",
  copied: "copiado",
  by: "por",
  about: "Sobre mí",
  socialLinks: "Redes Sociales",
  home: "Inicio",
  posts: "Posts",
  "posts.desc": "Todos los artículos que he publicado.",
  tag: "Tag",
  "tag.desc": 'Todos los artículos con la tag "{name}".',
  tags: "Tags",
  "tags.desc": "Todas las tags usadas en posts",
  archives: "Archivos",
  "archives.desc": "Todos los artículos que he archivado.",
  featured: "Destacado",
  recentPosts: "Posts Recientes",
  tableOfContents: "Tabla de contenidos",
  "tableOfContents.desc": "Abrir tabla de contenidos",
  allPosts: "Todas las posts",
  search: "Buscar",
  "search.desc": "Busca cualquier artículo",
  "search.placeholder": "Buscar lo que sea",
  pages: "Páginas",
  page: "Página",
  pageWithNo: "Página {no}",
  "navigation.goBack": "Volver",
  "navigation.goBackHome": "Volver al inicio",
  "navigation.backToTop": "Volver arriba",
  "navigation.nextPost": "Siguiente publicación",
  "navigation.prevPost": "Publicación anterior",
  pageNotFound: "Página no encontrada",
  notFound: "No encontrado",
  rssFeed: "RSS Feed",
  suggestChanges: "Sugerir cambios",
  toggleLightAndDark: "Cambiar entre claro y oscuro",
  "pagination.prev": "Anterior",
  "pagination.next": "Siguiente",
  "footer.text": `
    Powered by <a class="underline decoration-dashed underline-offset-8" href='https://astro.build/'>Astro</a>.
    <br/>
    Theme by <a class="underline decoration-dashed underline-offset-8" href='https://github.com/yousef8/astro-paper-i18n'>AstroPaper with I18n</a>
    <br/>
    Copyright © {year} | All rights reserved`,
  "date.published": "Publicado",
  "date.updated": "Actualizado",
  "date.month.1": "Enero",
  "date.month.2": "Febrero",
  "date.month.3": "Marzo",
  "date.month.4": "Abril",
  "date.month.5": "Mayo",
  "date.month.6": "Junio",
  "date.month.7": "Julio",
  "date.month.8": "Agosto",
  "date.month.9": "Septiembre",
  "date.month.10": "Octubre",
  "date.month.11": "Noviembre",
  "date.month.12": "Diciembre",
  "socials.github": `${baseStrings["site.title"]} en Github`,
  "socials.facebook": `${baseStrings["site.title"]} en Facebook`,
  "socials.instagram": `${baseStrings["site.title"]} en Instagram`,
  "socials.linkedin": `${baseStrings["site.title"]} en LinkedIn`,
  "socials.mail": `Enviar un correo a ${baseStrings["site.title"]}`,
  "socials.x": `${baseStrings["site.title"]} en X`,
  "socials.twitch": `${baseStrings["site.title"]} en Twitch`,
  "socials.youtube": `${baseStrings["site.title"]} en Youtube`,
  "socials.whatsapp": `${baseStrings["site.title"]} en Whatsapp`,
  "socials.snapchat": `${baseStrings["site.title"]} en Snapchat`,
  "socials.pinterest": `${baseStrings["site.title"]} en Pinterest`,
  "socials.tiktok": `${baseStrings["site.title"]} en TikTok`,
  "socials.codepen": `${baseStrings["site.title"]} en CodePen`,
  "socials.discord": `${baseStrings["site.title"]} en Discord`,
  "socials.gitlab": `${baseStrings["site.title"]} en GitLab`,
  "socials.reddit": `${baseStrings["site.title"]} en Reddit`,
  "socials.skype": `${baseStrings["site.title"]} en Skype`,
  "socials.steam": `${baseStrings["site.title"]} en Steam`,
  "socials.telegram": `${baseStrings["site.title"]} en Telegram`,
  "socials.mastodon": `${baseStrings["site.title"]} en Mastodon`,
  "sharePost.desc": "Compartir esta publicación en",
  "sharePost.on": "Compartir esta publicación en {media}",
  "sharePost.via": "Compartir esta publicación vía {media}",
  "a11y.skipToContent": "Saltar al contenido",
  "a11y.rssFeed": "rss feed",
  "a11y.openMenu": "Abrir menú",
  "a11y.closeMenu": "Cerrar menú",
  "a11y.archives": "archivos",
  "a11y.search": "buscar",
  "a11y.themeButtonDefaultLabel": "auto",
  "a11y.pagination": "Paginación",
  "a11y.breadcrumb": "navegación jerárquica",
  "a11y.languagePicker": "Selector de idioma",
};

export default ESLocale;
