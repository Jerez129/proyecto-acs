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

/* ===== INICIO: scripts de la parte 2 (rama-albert) ===== */
/* ---------- Flujo del control de cambio (figura 22.5) ---------- */
(function flujoCambio() {
  const contenedor = document.getElementById("flujoCambio");
  if (!contenedor) return;

  const pasos = [...contenedor.querySelectorAll("#flujoPasos li")];
  const anterior = document.getElementById("flujoAnterior");
  const siguiente = document.getElementById("flujoSiguiente");
  const contador = document.getElementById("flujoContador");
  const decision = document.getElementById("flujoDecision");
  const negado = document.getElementById("flujoNegado");
  const indiceDecision = pasos.findIndex((p) => p.classList.contains("decision"));
  let actual = 0;
  let rechazado = false;

  contenedor.classList.add("js"); // activa los estilos del modo paso a paso

  function pintar() {
    pasos.forEach((p, i) => {
      p.classList.toggle("actual", i === actual);
      p.classList.toggle("hecho", i < actual);
    });
    contador.textContent = `Paso ${actual + 1} de ${pasos.length}`;
    const enDecision = actual === indiceDecision && !rechazado;
    decision.hidden = !enDecision;
    negado.hidden = !rechazado;
    anterior.disabled = actual === 0;
    siguiente.disabled = enDecision || rechazado || actual === pasos.length - 1;
  }

  anterior.addEventListener("click", () => {
    rechazado = false;
    if (actual > 0) actual--;
    pintar();
  });
  siguiente.addEventListener("click", () => {
    if (actual < pasos.length - 1) actual++;
    pintar();
  });
  decision.querySelectorAll("[data-decision]").forEach((boton) =>
    boton.addEventListener("click", () => {
      if (boton.dataset.decision === "aprobar") {
        actual++;
      } else {
        rechazado = true;
      }
      pintar();
    })
  );
  pintar();
})();

/* ---------- Lista de verificación de auditoría ---------- */
(function checklistAuditoria() {
  const lista = document.getElementById("checklistAuditoria");
  if (!lista) return;
  const casillas = [...lista.querySelectorAll("input[type=checkbox]")];
  const barra = document.getElementById("checklistProgreso");

  const resultado = document.getElementById("checklistResultado");

  function actualizar() {
    const marcadas = casillas.filter((c) => c.checked).length;
    casillas.forEach((c) => c.parentElement.classList.toggle("marcada", c.checked));
    barra.style.width = (marcadas / casillas.length) * 100 + "%";
    resultado.textContent = marcadas === casillas.length
      ? "¡Auditoría completa! El cambio puede integrarse a la nueva versión."
      : `${marcadas} de ${casillas.length} verificaciones completadas.`;
  }
  casillas.forEach((c) => c.addEventListener("change", actualizar));
  actualizar();
})();

/* ---------- Quiz ---------- */
(function quiz() {
  const contenedor = document.getElementById("quiz");
  if (!contenedor) return;

  const preguntas = [
    {
      enunciado: "¿Cuáles son las cinco tareas del proceso ACS según Pressman?",
      opciones: [
        "Análisis, diseño, código, prueba y mantenimiento",
        "Identificación, control de versión, control de cambio, auditoría y reporte de estado",
        "Planificación, ejecución, control, cierre y reporte",
        "Requisitos, arquitectura, integración, despliegue y soporte"
      ],
      correcta: 1,
      explicacion: "Son las cinco capas concéntricas de la figura 22.4. Los ICS las atraviesan desde el centro hacia afuera."
    },
    {
      enunciado: "Una 'Especificación de diseño' que agrupa el modelo de datos y varios diagramas es un…",
      opciones: ["Objeto básico", "Objeto agregado", "Conjunto de cambio", "Reporte de estado"],
      correcta: 1,
      explicacion: "Un objeto agregado es una colección de objetos básicos y de otros objetos agregados."
    },
    {
      enunciado: "¿Qué documento se genera por cada cambio aprobado por la ACC?",
      opciones: ["El reporte de estado (REC)", "La línea base", "La Orden de Cambio de Ingeniería (OCI)", "El modelo del sistema"],
      correcta: 2,
      explicacion: "La OCI describe el cambio que se hará, las restricciones y los criterios para revisarlo y auditarlo."
    },
    {
      enunciado: "¿Qué evita el control de sincronización?",
      opciones: [
        "Que personas sin permiso modifiquen un objeto",
        "Que dos cambios paralelos se sobrescriban entre sí",
        "Que el cliente pida cambios",
        "Que se pierdan los reportes"
      ],
      correcta: 1,
      explicacion: "El control de acceso decide quién puede cambiar algo; el de sincronización evita que los cambios paralelos choquen. En Git se logra con ramas y merge."
    },
    {
      enunciado: "Antes de que un ICS se convierta en línea base, ¿qué tipo de control de cambio se aplica?",
      opciones: ["Formal", "A nivel de proyecto", "Informal", "Ninguno: está prohibido cambiarlo"],
      correcta: 2,
      explicacion: "Antes de la línea base el autor puede hacer los cambios necesarios, siempre que no afecten a otros elementos del sistema."
    },
    {
      enunciado: "¿Qué preguntas responde el reporte de estado de la configuración?",
      opciones: [
        "¿Cuánto cuesta?, ¿cuánto tarda?",
        "¿Qué ocurrió?, ¿quién lo hizo?, ¿cuándo ocurrió?, ¿qué más se afectará?",
        "¿Funciona?, ¿es rápido?",
        "¿Quién aprueba?, ¿quién paga?"
      ],
      correcta: 1,
      explicacion: "Son las cuatro preguntas del REC. En Git, el historial (git log) responde buena parte de ellas."
    },
    {
      enunciado: "En GitHub, ¿qué cumple un papel parecido al de la OCI?",
      opciones: ["Un fork", "Un Pull Request aprobado", "Una estrella (star)", "El archivo .gitignore"],
      correcta: 1,
      explicacion: "El Pull Request describe el cambio, se revisa (auditoría) y, al aprobarse, se integra en la línea base (main)."
    }
  ];

  let indice = 0;
  let puntaje = 0;

  function mostrarPregunta() {
    const p = preguntas[indice];
    contenedor.innerHTML = `
      <div class="quiz-pregunta">
        <p class="quiz-progreso">Pregunta ${indice + 1} de ${preguntas.length}</p>
        <p class="quiz-enunciado">${p.enunciado}</p>
        <div class="quiz-opciones">
          ${p.opciones.map((o, i) => `<button type="button" class="quiz-opcion" data-i="${i}">${o}</button>`).join("")}
        </div>
        <p class="quiz-explicacion" hidden></p>
        <div class="quiz-acciones" hidden><button type="button" class="btn btn-primario" id="quizSiguiente">${indice < preguntas.length - 1 ? "Siguiente pregunta →" : "Ver resultado"}</button></div>
      </div>`;

    const botones = contenedor.querySelectorAll(".quiz-opcion");
    botones.forEach((b) =>
      b.addEventListener("click", () => {
        const elegida = Number(b.dataset.i);
        const acierto = elegida === p.correcta;
        if (acierto) puntaje++;
        botones.forEach((x) => {
          x.disabled = true;
          if (Number(x.dataset.i) === p.correcta) x.classList.add("correcta");
        });
        if (!acierto) b.classList.add("incorrecta");
        const explicacion = contenedor.querySelector(".quiz-explicacion");
        explicacion.textContent = (acierto ? "✔ ¡Correcto! " : "✘ No exactamente. ") + p.explicacion;
        explicacion.hidden = false;
        contenedor.querySelector(".quiz-acciones").hidden = false;
        document.getElementById("quizSiguiente").addEventListener("click", () => {
          indice++;
          indice < preguntas.length ? mostrarPregunta() : mostrarResultado();
        });
      })
    );
  }

  function mostrarResultado() {
    const mensaje = puntaje === preguntas.length ? "¡Dominas la ACS!"
      : puntaje >= preguntas.length * 0.6 ? "¡Buen trabajo! Repasa las preguntas que fallaste."
      : "Vuelve a leer las secciones y prueba otra vez.";
    contenedor.innerHTML = `
      <div class="quiz-pregunta quiz-final">
        <p class="quiz-puntaje">${puntaje}/${preguntas.length}</p>
        <p>${mensaje}</p>
        <button type="button" class="btn btn-primario" id="quizReiniciar">Intentar de nuevo</button>
      </div>`;
    document.getElementById("quizReiniciar").addEventListener("click", () => {
      indice = 0;
      puntaje = 0;
      mostrarPregunta();
    });
  }

  mostrarPregunta();
})();

/* ---------- Copiar la cita ---------- */
(function copiarCita() {
  const boton = document.getElementById("btnCopiarCita");
  const texto = document.getElementById("textoCita");
  if (!boton || !texto) return;
  boton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(texto.textContent.trim());
      boton.textContent = "¡Cita copiada!";
    } catch (e) {
      boton.textContent = "Selecciona el texto y cópialo";
    }
    setTimeout(() => (boton.textContent = "Copiar cita"), 2000);
  });
})();

/* pendiente */
/* ===== FIN: scripts de la parte 2 ===== */
