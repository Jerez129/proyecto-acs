/* =========================================================
   Proyecto ACS · script.js
   Cada módulo revisa si su sección existe antes de ejecutarse,
   así la página funciona aunque una sección aún esté pendiente.
   ========================================================= */

/* ---------- Base: menú móvil ---------- */
(function menuMovil() {
  const boton = document.getElementById("btnMenu");
  const menu = document.getElementById("menuPrincipal");
  if (!boton || !menu) return;

  boton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", String(abierto));
  });
  // Cerrar el menú al elegir una sección
  menu.querySelectorAll("a").forEach((enlace) =>
    enlace.addEventListener("click", () => {
      menu.classList.remove("abierto");
      boton.setAttribute("aria-expanded", "false");
    })
  );
})();

/* ---------- Base: tabla de contenido automática ---------- */
(function tablaContenido() {
  const lista = document.getElementById("tablaContenido");
  if (!lista) return;
  document.querySelectorAll(".seccion > h2").forEach((titulo) => {
    const seccion = titulo.parentElement;
    const item = document.createElement("li");
    const enlace = document.createElement("a");
    enlace.href = "#" + seccion.id;
    enlace.textContent = titulo.textContent;
    item.appendChild(enlace);
    lista.appendChild(item);
  });
})();

/* ---------- Base: barra de progreso, botón "arriba" y enlace activo ---------- */
(function desplazamiento() {
  const barra = document.getElementById("barraProgreso");
  const btnArriba = document.getElementById("btnArriba");
  const secciones = [...document.querySelectorAll(".seccion")];
  const enlaces = [...document.querySelectorAll(".main-navigation a, .toc a")];

  function alDesplazar() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const porcentaje = total > 0 ? (window.scrollY / total) * 100 : 0;
    if (barra) barra.style.width = porcentaje + "%";
    if (btnArriba) btnArriba.hidden = window.scrollY < 600;

    // Marca en el menú la sección que se está leyendo
    let actual = "";
    secciones.forEach((s) => {
      if (s.getBoundingClientRect().top < window.innerHeight * 0.35) actual = s.id;
    });
    enlaces.forEach((a) => a.classList.toggle("activo", a.getAttribute("href") === "#" + actual));
  }

  window.addEventListener("scroll", alDesplazar, { passive: true });
  alDesplazar();
  if (btnArriba) btnArriba.addEventListener("click", () => window.scrollTo({ top: 0 }));
})();

/* ---------- Base: aparición suave de las secciones ---------- */
(function revelar() {
  if (!("IntersectionObserver" in window)) return;
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observador.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".seccion").forEach((s) => {
    s.classList.add("revelar");
    observador.observe(s);
  });
})();

/* ---------- Base: widget "¿Te fue útil?" ---------- */
(function widgetUtil() {
  const botones = document.querySelectorAll(".btn-util");
  const gracias = document.getElementById("utilGracias");
  botones.forEach((b) =>
    b.addEventListener("click", () => {
      botones.forEach((x) => x.classList.toggle("elegido", x === b));
      if (gracias) gracias.hidden = false;
    })
  );
})();

/* ===== INICIO: scripts de la parte 1 (rama-johansell) ===== */
/* ---------- Diagrama interactivo de capas ---------- */
(function capasACS() {
  const panel = document.getElementById("capasPanel");
  if (!panel) return;

  const info = {
    ics: {
      titulo: "ICS: el centro",
      texto: "Los Ítems de Configuración del Software son los productos de trabajo que se controlan: documentos, modelos, código y pruebas. Todo el proceso gira alrededor de ellos.",
      ejemplo: "En nuestro proyecto: index.html, styles.css, script.js y las imágenes."
    },
    identificacion: {
      titulo: "1. Identificación",
      texto: "Cada ICS recibe un nombre único y se organiza como objeto básico o agregado, registrando sus relaciones con otros objetos. Se aplica siempre que nace un ICS.",
      ejemplo: "En Git: la ruta del archivo y el hash de cada commit identifican sin ambigüedad cada versión."
    },
    cambio: {
      titulo: "2. Control de cambio",
      texto: "Las peticiones de cambio se evalúan, la Autoridad de Control de Cambio (ACC) decide y, si aprueba, se emite una Orden de Cambio de Ingeniería (OCI). Si nadie pide cambiar el ICS, esta capa no interviene.",
      ejemplo: "En GitHub: un Issue es la petición y un Pull Request aprobado funciona como la OCI."
    },
    version: {
      titulo: "3. Control de versión",
      texto: "Se guardan todas las versiones de cada objeto y se puede construir cualquier versión específica del software. El ICS queda asignado a una versión concreta.",
      ejemplo: "En Git: commits, ramas y etiquetas como v1.0."
    },
    auditoria: {
      titulo: "4. Auditoría de la configuración",
      texto: "Se comprueba que el cambio se hizo como pedía la OCI, que se siguieron los estándares y que los ICS relacionados también se actualizaron.",
      ejemplo: "En GitHub: la revisión del Pull Request antes de hacer merge."
    },
    reporte: {
      titulo: "5. Reporte de estado",
      texto: "Se informa qué pasó, quién lo hizo, cuándo y qué más se ve afectado, para que todo el equipo esté al tanto.",
      ejemplo: "En Git: git log, el historial de commits y la pestaña Insights → Network."
    }
  };

  const titulo = document.getElementById("capasTitulo");
  const texto = document.getElementById("capasTexto");
  const ejemplo = document.getElementById("capasEjemplo");
  const capas = document.querySelectorAll(".capas-figura [data-capa]");

  function mostrar(clave) {
    const datos = info[clave];
    if (!datos) return;
    titulo.textContent = datos.titulo;
    texto.textContent = datos.texto;
    ejemplo.textContent = datos.ejemplo;
    ejemplo.hidden = false;
    capas.forEach((c) => c.classList.toggle("activa", c.dataset.capa === clave));
  }

  capas.forEach((capa) => {
    capa.addEventListener("click", (evento) => {
      evento.stopPropagation(); // evita que el clic llegue a los anillos de abajo
      mostrar(capa.dataset.capa);
    });
    capa.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        mostrar(capa.dataset.capa);
      }
    });
  });
})();

/* ===== FIN: scripts de la parte 1 ===== */

/* ===== INICIO: scripts de la parte 2 (rama-companero) ===== */
/* pendiente */
/* ===== FIN: scripts de la parte 2 ===== */
