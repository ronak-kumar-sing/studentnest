# StudentNest 🏠

A modern student accommodation finder built with React and Vite, designed to help students find the perfect room, PG, hostel, or apartment near their university.

## ✨ Features

### 🔍 Advanced Search & Filtering
- **Price Range Filter**: Set minimum and maximum budget preferences
- **Location-based Search**: Find rooms near specific universities or areas
- **Room Type Options**: Single rooms, shared accommodation, PG, hostels, apartments, studios
- **Amenity Filters**: WiFi, parking, security, kitchen, laundry, gym, AC, heating
- **Availability Filter**: Available now or next month
- **Rating Filter**: Filter by minimum rating requirements
- **Area Size Filter**: Choose preferred room size range

### 🏡 Room Management
- **Detailed Room Listings**: High-quality images, comprehensive descriptions, and pricing
- **Interactive Image Galleries**: Browse through multiple room photos
- **Room Details**: Floor plans, amenities, owner information, and reviews
- **Saved Rooms**: Bookmark favorite accommodations for later viewing
- **Interactive Maps**: View room locations and nearby universities

### 📱 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with keyboard shortcuts
- **Smooth Animations**: Framer Motion powered transitions and effects
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Interactive Components**: Carousels, animated text, and tilt effects

### 🎯 Booking & Communication
- **Booking System**: Schedule room visits and bookings
- **Owner Contact**: Direct communication with property owners
- **Review System**: Read and leave reviews for accommodations
- **Visit Scheduling**: Book property visits at convenient times

### 🎨 Visual Elements
- **Aurora Background**: Dynamic animated background effects
- **Fuzzy Text Animations**: Engaging text reveal animations
- **Shiny Text Effects**: Eye-catching animated text components
- **Interactive Cards**: Hover effects and smooth transitions
- **Map Integration**: Interactive maps showing room locations

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/studentnest.git
   cd studentnest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Backgrounds/     # Background components (Aurora, Map)
│   ├── Carousel/        # Image carousel component
│   ├── Map/            # Map integration components
│   ├── TextAnimations/ # Animated text components
│   └── room/           # Room-related components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Application pages/routes
├── services/           # API services
└── utils/              # Utility functions and constants
```

## 🎨 Key Technologies

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router Dom** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Tanstack Query** - Data fetching and caching
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library
- **OGL** - WebGL library for 3D effects

## 🎯 Core Features Breakdown

### Room Search & Filtering
The application provides comprehensive filtering options including:
- Price range (₹2,000 - ₹25,000)
- Room types (Single, Shared, PG, Hostel, Apartment, Studio)
- Amenities (WiFi, Parking, Security, Kitchen, etc.)
- Location-based search with university proximity
- Rating and review filters
- Availability status

### Interactive UI Components
- **Carousel**: Multi-image room galleries with navigation
- **Map Component**: Interactive location viewing
- **Room Cards**: Hover effects and favorite functionality
- **Toast Notifications**: User feedback system
- **Theme Switching**: Dark/light mode with persistence

### Booking Flow
1. Browse available rooms with advanced filters
2. View detailed room information and images
3. Check location on interactive map
4. Contact owner or schedule a visit
5. Complete booking process

## 🎨 Customization

### Theme Configuration
The application supports theme switching with persistence. Themes can be toggled using:
- Keyboard shortcut: `Ctrl/Cmd + T`
- Theme toggle button in the header

### Aurora Background
Customize the animated background in `src/Backgrounds/Aurora/Aurora.jsx`:
```jsx
<Aurora
  colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/>
```

## 📱 Responsive Design

StudentNest is fully responsive and optimized for:
- **Desktop**: Full feature set with advanced layouts
- **Tablet**: Adapted layouts with touch-friendly interactions
- **Mobile**: Simplified navigation and optimized components

## 🔧 Development

### Adding New Room Types
1. Update `ROOM_TYPES` in `src/utils/constants.js`
2. Add corresponding filters in `src/components/Main.jsx`
3. Update room type styling if needed

### Adding New Amenities
1. Update `AMENITIES` in `src/utils/sampleData.js`
2. Add amenity icons in room detail components
3. Update filter logic in main component

### API Integration
Replace mock data in `src/services/api.js` with real API endpoints:
```javascript
export const roomAPI = {
  getRooms: () => axios.get('/api/rooms'),
  getRoomById: (id) => axios.get(`/api/rooms/${id}`),
  bookRoom: (data) => axios.post('/api/bookings', data)
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build files will be generated in the `dist/` directory.

### Deployment Options
- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for deployment
- **Traditional Hosting**: Upload `dist` folder contents

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Unsplash** for high-quality room images
- **Lucide** for beautiful icons
- **Framer Motion** for smooth animations
- **Tailwind CSS** for rapid UI development

---

**StudentNest** - Find your perfect student accommodation with ease! 🎓🏠

