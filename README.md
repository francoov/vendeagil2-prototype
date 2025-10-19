# Vende Ágil - Aplicación de Coincidencias

Esta es una aplicación web completa que replica y mejora la interfaz de "Vende Ágil" para mostrar coincidencias de mercado público con funcionalidades avanzadas.

## ✨ Características Principales

### 🎨 **Tema Dual (Claro/Oscuro)**
- Switch funcional para alternar entre tema claro y oscuro
- **Logos oficiales de Vende Ágil** que cambian según el tema:
  - **Tema claro**: `logo-vendeagil-dark.png` (logo oscuro)
  - **Tema oscuro**: `logo-vendeagil-white.png` (logo claro)
- Persistencia de preferencias en localStorage
- Transiciones suaves entre temas
- Soporte completo en todos los componentes

### 🧭 **Navegación Mejorada**
- **Sidebar lateral** con menú expandible
- **Dashboard** con estadísticas y resumen
- **Vista de Coincidencias** con múltiples opciones de visualización
- **Búsqueda de Compra** (en desarrollo)
- **Configuración** completa del sistema

### 📊 **Múltiples Vistas de Coincidencias**
1. **Vista de Tarjetas**: Visualización detallada con información completa
2. **Vista de Lista**: Navegación rápida con información resumida
3. **Vista Kanban**: Organización por estados personalizables

### ⚙️ **Sistema de Configuración Avanzado**
- **Notificaciones**: Configuración de alertas por correo
- **Límites personalizables**: Cantidad de correos diarios
- **Módulos Premium**: Activar funcionalidades adicionales
- **Gestión de empresa**: Modal mejorado para descripción

### 🎯 **Onboarding Inteligente**
- Tutorial interactivo con tooltips
- Guía paso a paso de funcionalidades
- Opción de saltar o completar el tour
- Persistencia del estado de onboarding

### 🔍 **Búsqueda Mejorada**
- Aclaración de funcionalidad del buscador
- Tooltip informativo sobre el alcance de búsqueda
- Búsqueda solo en compras ágiles levantadas

### 🏢 **Gestión de Líneas de Negocio**
- Navegación mejorada entre diferentes empresas
- Descripción personalizable de cada empresa
- Modal mejorado con sugerencias y validación

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Tipado estático completo
- **Tailwind CSS** - Estilos y diseño responsive
- **Lucide React** - Iconografía moderna
- **React Hooks** - Gestión de estado y efectos
- **Context API** - Gestión global de estado (tema, onboarding)

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd vendeagil-app2

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
npm start
```

### Acceso
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
├── app/
│   ├── globals.css          # Estilos globales y tema dual
│   ├── layout.tsx           # Layout principal con providers
│   └── page.tsx             # Página principal con routing
├── components/
│   ├── Header.tsx           # Header con búsqueda mejorada
│   ├── Sidebar.tsx          # Navegación lateral
│   ├── CoincidenciasView.tsx # Vista principal de coincidencias
│   ├── DashboardView.tsx    # Panel de estadísticas
│   ├── ListView.tsx         # Vista de lista simplificada
│   ├── KanbanView.tsx       # Vista Kanban con estados
│   ├── MatchCard.tsx        # Tarjeta detallada de coincidencia
│   ├── FiltersSection.tsx   # Filtros y controles
│   ├── SettingsView.tsx     # Vista de configuración
│   ├── CompanyModal.tsx     # Modal de descripción de empresa
│   ├── ThemeToggle.tsx      # Switch de tema
│   └── OnboardingTooltip.tsx # Sistema de onboarding
├── contexts/
│   ├── ThemeContext.tsx     # Contexto para tema dual
│   └── OnboardingContext.tsx # Contexto para onboarding
├── tailwind.config.js       # Configuración de Tailwind
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Dependencias del proyecto
```

## 🎨 Sistema de Colores

### Tema Oscuro (Predeterminado)
- **Primary**: #ff6b6b (rojo/rosa para elementos importantes)
- **Secondary**: #4ecdc4 (verde para presupuestos y acciones)
- **Accent**: #45b7d1 (azul para el logo)
- **Dark**: Tonos azul-verde oscuro (#051c25, #002c36)

### Tema Claro
- **Background**: #f9fafb (gris claro)
- **Cards**: #ffffff (blanco)
- **Text**: #1a1a1a (gris oscuro)
- **Borders**: #e5e7eb (gris medio)

## 🔧 Funcionalidades Avanzadas

### Vista Kanban
- Estados personalizables por usuario
- Arrastrar y soltar tarjetas entre columnas
- Agregar nuevas columnas dinámicamente
- Contador de elementos por estado

### Sistema de Filtros
- Filtro por monto mínimo con slider
- Filtro por región con dropdown
- Filtro de favoritos
- Ordenamiento por proximidad de cierre o fecha
- Exportación a Excel

### Configuración de Notificaciones
- Activación/desactivación de notificaciones por correo
- Límite personalizable de correos diarios (default: 20)
- Módulos premium con switches individuales

### Onboarding Interactivo
- 8 pasos guiados por la interfaz
- Tooltips informativos
- Progreso visual
- Opción de saltar o completar

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- **Desktop**: Experiencia completa con sidebar
- **Tablet**: Adaptación de layouts y componentes
- **Mobile**: Navegación optimizada para pantallas pequeñas

## 🔒 Persistencia de Datos

- **Tema**: Guardado en localStorage
- **Onboarding**: Estado de completado persistente
- **Configuración**: Preferencias de usuario guardadas
- **Favoritos**: Estado de coincidencias marcadas

## 🎯 Próximas Mejoras

- [ ] Integración con API real
- [ ] Autenticación de usuarios
- [ ] Notificaciones push
- [ ] Exportación avanzada de datos
- [ ] Integración con calendarios
- [ ] Análisis de tendencias
