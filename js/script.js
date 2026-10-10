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
/* pendiente */
/* ===== FIN: scripts de la parte 1 ===== */

/* ===== INICIO: scripts de la parte 2 (rama-companero) ===== */
/* pendiente */
/* ===== FIN: scripts de la parte 2 ===== */
