# Player Profile Component

A futuristic cyberpunk-themed player profile page for gaming websites with smooth animations and responsive design.

## Features

### 🎨 Design
- **Cyberpunk Theme**: Dark background with neon gradients (purple, cyan, pink)
- **Animated Background**: Moving grid pattern with floating particles
- **Glowing Effects**: Pulsing borders, rotating avatar glow, gradient text animations
- **Smooth Transitions**: Hover effects with scale, glow, and movement animations

### 📱 Layout Sections

1. **Header Section**
   - Full-width cover image with gradient overlay
   - Circular profile photo with rotating glow border animation
   - Player username with animated gradient text
   - Country flag + city location
   - Level badge and user metadata

2. **Navigation Tabs**
   - Sticky navigation with backdrop blur
   - Active tab indicator with animated underline
   - Smooth tab switching with fade animations

3. **Overview Tab**
   - Player information card with bio and stats
   - Win/loss statistics with hover animations
   - Quick games preview with colored game tags

4. **Games Tab**
   - Grid of games with neon-colored cards
   - Floating hover effects (scale + glow)
   - Game-specific statistics display

5. **Teams Tab**
   - Team cards with logos and member info
   - Animated team joining dates
   - Hover effects with glowing outlines

6. **Achievements Tab**
   - Achievement cards with golden glow effects
   - Animated borders on hover
   - Icon-based achievement display

### 🎯 Animations

- **Rotating Glow**: Avatar border rotates continuously
- **Gradient Shift**: Username text color shifts smoothly
- **Floating Particles**: Background particles move in loops
- **Grid Movement**: Cyberpunk grid pattern moves diagonally
- **Hover Effects**: Cards scale up with glowing shadows
- **Tab Transitions**: Content fades in/out smoothly

### 📱 Responsive Design

- **Desktop**: Multi-column grids, full animations
- **Tablet**: 2-column layouts, optimized spacing
- **Mobile**: Single column, stacked vertically, touch-friendly

### 🛠 Technical Details

**Built with:**
- React functional components with hooks
- CSS animations and transitions
- CSS Grid and Flexbox for layouts
- CSS custom properties for theming
- Responsive breakpoints for mobile optimization

**Key CSS Features:**
- `conic-gradient` for rotating glow effects
- `backdrop-filter` for glass morphism
- `clip-path` for custom shapes
- CSS animations with `@keyframes`
- CSS Grid with `auto-fit` and `minmax`

### 🚀 Usage

```jsx
import PlayerProfile from './components/PlayerProfile';

// Basic usage
<PlayerProfile playerId="player-123" />

// Demo usage
<PlayerProfile playerId="demo-player" />
```

### 🎮 Demo Data

The component includes comprehensive demo data:
- Player stats and biography
- 6 different games with custom colors
- 3 team affiliations with roles
- 4 achievements with descriptions
- Realistic gaming statistics

### 🎨 Color Scheme

- **Primary**: `#8b5cf6` (Purple)
- **Secondary**: `#00d4ff` (Cyan)  
- **Accent**: `#ff0844` (Pink)
- **Background**: `#0a0a0f` (Dark)
- **Text**: `#ffffff` (White)
- **Muted**: `#a0a0a0` (Gray)

### 📂 Files

- `PlayerProfile.jsx` - Main React component
- `PlayerProfile.css` - Complete styling with animations
- `PlayerProfileDemo.jsx` - Demo wrapper component

Navigate to `/player-profile` to see the component in action!
