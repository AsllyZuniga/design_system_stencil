<div align="center">

# 🎨 Design System — Stencil Library

### Librería de componentes UI reutilizables construida con Stencil.js

![Stencil](https://img.shields.io/badge/Stencil.js-000000?style=for-the-badge&logo=stencil&logoColor=white)
![Web Components](https://img.shields.io/badge/Web_Components-29ABE2?style=for-the-badge&logo=webcomponents.org&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

</div>

---

## 📖 Descripción

**design_system_stencil** es una librería de componentes UI construida con [Stencil.js](https://stenciljs.com/), que genera **Web Components** estándar reutilizables en cualquier framework (React, Angular, Vue) o en HTML puro.

El proyecto está organizado como un **monorepo** con una arquitectura de paquetes clara, donde cada componente es independiente y cuenta con su propia demo en HTML.

---

## 📦 Estructura del Proyecto

```
design_system_stencil/
└── packages/
    └── stencil-library/
        └── src/
            ├── components/         # Componentes UI
            │   ├── ui-badge/
            │   ├── ui-button/
            │   ├── ui-card/
            │   ├── ui-input/
            │   ├── ui-panel-modal/
            │   ├── ui-select/
            │   ├── ui-table/
            │   ├── ui-tag/
            │   └── ui-test/
            └── demos/              # HTML de demostración por componente
                ├── ui-badge.html
                ├── ui-button.html
                ├── ui-card.html
                ├── ui-input.html
                ├── ui-panel-modal.html
                ├── ui-select.html
                ├── ui-table.html
                ├── ui-tag.html
                └── ui-test.html
```

---

## 🧩 Componentes Disponibles

| Componente | Tag | Descripción |
|------------|-----|-------------|
| **Badge** | `<ui-badge>` | Indicadores de estado, contadores y etiquetas visuales |
| **Button** | `<ui-button>` | Botones con variantes y estados (disabled, loading, etc.) |
| **Card** | `<ui-card>` | Contenedor de contenido con estructura flexible |
| **Input** | `<ui-input>` | Campo de texto con validación y estilos consistentes |
| **Panel Modal** | `<ui-panel-modal>` | Modal/panel lateral para contenido emergente |
| **Select** | `<ui-select>` | Selector desplegable personalizado |
| **Table** | `<ui-table>` | Tabla de datos con soporte para filas y columnas |
| **Tag** | `<ui-tag>` | Etiquetas para categorizar o filtrar elementos |
| **Test** | `<ui-test>` | Componente de prueba y sandbox para desarrollo |

---

## 🚀 Cómo Empezar

### Instalación

```bash
# Clona el repositorio
git clone https://github.com/AsllyZuniga/design_system_stencil.git
cd design_system_stencil

# Entra a la librería e instala dependencias
cd packages/stencil-library
npm install
```

### Desarrollo

```bash
# Levanta el servidor de desarrollo con hot-reload
npm start
```

### Build

```bash
# Compila los Web Components para producción
npm run build
```

---

## 🔌 Uso de los Componentes

Una vez compilada la librería, puedes usar los componentes en cualquier proyecto:

**En HTML puro:**
```html
<script type="module" src="path/to/stencil-library/dist/stencil-library.esm.js"></script>

<ui-button>Click me</ui-button>
<ui-badge color="primary">Nuevo</ui-badge>
<ui-input placeholder="Escribe aquí..."></ui-input>
```

**En React:**
```jsx
import { defineCustomElements } from 'stencil-library/loader';
defineCustomElements();

function App() {
  return (
    <>
      <ui-button>Aceptar</ui-button>
      <ui-card>Contenido de la tarjeta</ui-card>
    </>
  );
}
```

---

## 🧪 Ver Demos

Cada componente tiene su propia demo en HTML. Para visualizarlas, levanta el servidor de desarrollo:

```bash
npm start
# Luego abre en el navegador:
# http://localhost:3333/demos/ui-button.html
# http://localhost:3333/demos/ui-input.html
```

---

## 🌿 Ramas

| Rama | Descripción |
|------|-------------|
| `develop` | Rama principal de desarrollo activo |
| `main` | Versión estable y lista para producción |

---

## 🛠️ Stack Tecnológico

- **[Stencil.js](https://stenciljs.com/)** — Compilador de Web Components
- **TypeScript** — Tipado estricto en todos los componentes
- **HTML5** — Demos y documentación interactiva
- **Web Components** — Estándar nativo del navegador (Custom Elements, Shadow DOM)

---

<div align="center">

Hecho con ❤️ por [AsllyZuniga](https://github.com/AsllyZuniga)

</div>
