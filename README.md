# Proyecto ACS: Administración de la Configuración del Software

Resumen interactivo de la **sección 22.3 "El proceso ACS"** del libro *Ingeniería del Software: un enfoque práctico* de Roger S. Pressman, publicado como página web con GitHub Pages.

🔗 **Página publicada:** https://jerez129.github.io/proyecto-acs/
📁 **Repositorio:** https://github.com/Jerez129/proyecto-acs

---

## 👥 Integrantes

| Integrante | Usuario de GitHub | Rama |
|---|---|---|
| Johansell Alfonso Pérez Feliz | [@Jerez129](https://github.com/Jerez129) | `rama-johansell` |
| Albert Garcia | *(usuario de Albert)* | `rama-albert` |

---

## 📝 Descripción del proyecto

Página web que explica, con nuestras propias palabras, el proceso de Administración de la Configuración del Software (ACS) según Pressman: sus cuatro objetivos y sus cinco tareas (identificación, control de versión, control de cambio, auditoría de la configuración y reporte de estado).

Incluye recursos interactivos para reforzar los conceptos:
- Diagrama de **capas concéntricas** en el que se puede hacer clic (figura 22.4).
- **Flujo paso a paso** del proceso de control de cambio, con la decisión de la ACC (figura 22.5).
- **Lista de verificación** con las seis preguntas de la auditoría de configuración.
- **Quiz** de 7 preguntas para repasar.
- Tablas comparativas (CVS frente a Git, revisión técnica frente a auditoría, conceptos ACS frente a Git/GitHub).

## 🎯 Objetivo de la actividad

Analizar y sintetizar la sección 22.3 de Pressman y, al mismo tiempo, **aplicar en la práctica** los principios de la ACS usando Git y GitHub para construir el proyecto de forma colaborativa y controlada:

**Identificación → Cambio → Versionado → Integración → Auditoría → Reporte**

## 🛠️ Tecnologías utilizadas

- **HTML5**: estructura semántica de la página.
- **CSS3**: diseño adaptable (*responsive*), variables CSS y Grid/Flexbox. Estilo inspirado en [concepto.de](https://concepto.de/blog/).
- **JavaScript**: interactividad (diagrama de capas, flujo de cambio, lista de verificación, quiz).
- **SVG**: diagramas e ilustraciones.
- **Git y GitHub**: control de versiones, ramas, Issues y Pull Requests.
- **GitHub Pages**: publicación de la página.
- **Google Fonts**: Playfair Display y Montserrat.

## 📂 Estructura del proyecto

```
proyecto-acs/
│
├── index.html              # Página principal con todas las secciones
├── README.md               # Este archivo
│
├── css/
│   └── styles.css          # Estilos (base, parte 1, parte 2 y responsive)
│
├── js/
│   └── script.js           # Interactividad (base, parte 1, parte 2)
│
└── assets/
    └── images/
        ├── logo.svg, logo-blanco.svg, favicon.svg
        ├── portada.svg         # Ilustración de ramas de la portada
        ├── jerarquia-ics.svg   # Jerarquía de ICS del proyecto
        └── flujo-ramas.svg     # Diagrama del flujo de trabajo con ramas
```

## 🤝 Participación de cada integrante

### Johansell Alfonso Pérez Feliz (`rama-johansell`)
- Creación del repositorio, estructura inicial y esqueleto de la página (CSS y JS base).
- Creación de los Issues #1 y #2.
- **Parte 1 del contenido:**
  - Introducción y objetivos del proceso ACS (22.3).
  - Diagrama interactivo de las cinco capas.
  - Identificación de objetos de configuración (22.3.1).
  - Control de versión y comparación CVS frente a Git (22.3.2).
- Revisión y aprobación del Pull Request de Albert.
- README final, etiqueta `v1.0` y publicación en GitHub Pages.

### Albert Garcia (`rama-albert`)
- **Parte 2 del contenido:**
  - Control de cambio con flujo interactivo (22.3.3).
  - Auditoría de configuración con lista de verificación (22.3.4).
  - Reporte de estado de la configuración (22.3.5).
  - Sección "La ACS en la práctica: Git y GitHub" con diagrama de ramas.
  - Conclusión, quiz y referencias bibliográficas.
- Revisión y aprobación del Pull Request de Johansell.

## 🔀 Flujo de trabajo con Git (ACS aplicada)

| Concepto ACS | Cómo lo aplicamos |
|---|---|
| **Identificación** | Estructura base y esqueleto con secciones marcadas en `main` |
| **Petición de cambio** | Un Issue por cada parte del trabajo |
| **Versionado** | Cada integrante trabajó en su propia rama con commits descriptivos |
| **Control de sincronización** | Cada rama editó zonas distintas de los archivos, sin conflictos |
| **Integración (OCI)** | Pull Request #1 y #2 hacia `main` |
| **Auditoría** | Cada PR fue revisado y aprobado por el otro integrante |
| **Reporte** | Historial de commits, gráfico en *Insights → Network* y etiqueta `v1.0` |

Para ver el historial no lineal:
```bash
git log --oneline --graph --all
```

## ▶️ Cómo ver el proyecto

**En línea:** abre https://jerez129.github.io/proyecto-acs/

**En tu computadora:**
```bash
git clone https://github.com/Jerez129/proyecto-acs.git
cd proyecto-acs
```
Luego abre `index.html` con cualquier navegador. No requiere instalar nada.

## 📚 Referencia bibliográfica

Pressman, R. S. (2010). *Ingeniería del software: un enfoque práctico* (7.ª ed.). McGraw-Hill. Capítulo 22, sección 22.3 "El proceso ACS", pp. 508–515.
