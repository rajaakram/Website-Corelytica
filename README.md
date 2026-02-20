# Corelytica - Data-Driven Insights

A premium analytics/data company landing page with modern animations and data visualization elements.

![Corelytica](https://img.shields.io/badge/Corelytica-Analytics-purple)

## Features

- ⚡ **Vite + React + TypeScript** - Modern, fast development setup
- 🎨 **Tailwind CSS** - Utility-first styling with custom animations
- 📊 **Data Visualization** - Animated charts, graphs, and statistics
- ✨ **Modern Animations** - Floating shapes, counter animations, and smooth transitions
- 🌙 **Purple/Indigo Theme** - Premium analytics color scheme
- 📱 **Responsive Design** - Works on all screen sizes
- 🔗 **GitHub Integration** - Link to project repository

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rajaakram/Website-Corelytica.git
cd Website-Corelytica

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build static files to dist folder
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
Website-Corelytica/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles & Tailwind
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies
```

## Design Features

- **Animated Data Bars** - Growing bar charts with staggered animations
- **Counter Statistics** - Animated number counters for key metrics
- **Floating Geometric Shapes** - Purple/indigo gradient orbs with blur effects
- **Line Chart Visualization** - SVG-based animated charts
- **Pie Chart** - Animated circular progress indicator
- **Glass Morphism Cards** - Modern frosted glass effect
- **Mouse-following Gradient** - Interactive spotlight effect
- **Staggered Entrance Animations** - Smooth page load sequence

## Customization

### Colors

The project uses a custom Tailwind color palette:

```javascript
colors: {
  'corelytica': {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
}
```

### Animations

Custom animations are defined in `tailwind.config.js`:

- `animate-float` - Floating animation for background shapes
- `animate-bar-grow` - Growing bar chart animation
- `animate-dash` - SVG path drawing animation
- `animate-slide-up` - Content entrance animation
- `animate-glow` - Pulsing glow effect

## License

MIT License - feel free to use this template for your own projects.

## Connect

- GitHub: [https://github.com/rajaakram/Website-Corelytica](https://github.com/rajaakram/Website-Corelytica)
