# RoomCard Component

A reusable card component that displays room information in a compact, visually appealing format. Used in search results, featured listings, and user favorites.

## 📍 Location
`src/components/room/RoomCard.jsx`

## 🎯 Purpose
- Display room information in a card layout
- Show key details like price, location, amenities
- Provide quick actions (favorite, view details)
- Maintain consistent design across the application

## 📋 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `room` | Object | ✅ | - | Room data object containing all room information |
| `onFavorite` | Function | ❌ | - | Callback when favorite button is clicked |
| `onCardClick` | Function | ❌ | - | Callback when card is clicked |
| `showDistance` | Boolean | ❌ | false | Whether to show distance from user's location |
| `compact` | Boolean | ❌ | false | Whether to use compact layout |
| `className` | String | ❌ | '' | Additional CSS classes |

## 🏗️ Room Object Structure

```javascript
const room = {
  id: "string",
  title: "string",
  description: "string",
  price: number,
  images: ["string"], // Array of image URLs
  roomType: "single|shared|pg|hostel|apartment|studio",
  location: {
    address: "string",
    city: "string",
    coordinates: { lat: number, lng: number },
    nearbyUniversities: [
      { name: "string", distance: number, commute: number }
    ]
  },
  amenities: [
    { id: "string", name: "string", icon: "string", category: "string" }
  ],
  rating: number, // 0-5
  totalReviews: number,
  availability: {
    isAvailable: boolean,
    availableFrom: "Date string"
  },
  owner: {
    name: "string",
    verified: boolean,
    rating: number
  },
  features: {
    area: number, // in sq ft
    furnished: boolean,
    floor: number,
    totalFloors: number
  }
}
```

## 🎨 Visual Elements

### Card Layout
```
┌─────────────────────────────────────┐
│ [Image Carousel]      [❤️ Favorite] │
│                                     │
├─────────────────────────────────────┤
│ Room Title                   ₹Price │
│ 📍 Location • 🏠 Room Type          │
│ ⭐ Rating (Reviews)                 │
│                                     │
│ 🎯 Amenities: WiFi, AC, Kitchen...  │
│                                     │
│ 🏫 University Name - Distance       │
│ 🚗 Commute: X minutes               │
│                                     │
│ [View Details Button]               │
└─────────────────────────────────────┘
```

### Compact Layout
```
┌───────────────────────────────┐
│ [Img] Title           ₹Price  │
│       📍 Location             │
│       ⭐ Rating • Amenities   │
└───────────────────────────────┘
```

## 🌟 Key Features

### Image Handling
- **Multiple Images**: Carousel/slider for multiple room photos
- **Lazy Loading**: Images load when card comes into viewport
- **Fallback**: Default placeholder if no images available
- **Optimization**: Responsive images for different screen sizes

### Interactive Elements
- **Favorite Button**: Heart icon that toggles saved status
- **Hover Effects**: Smooth transitions and shadow changes
- **Click Navigation**: Navigate to detailed room view
- **Loading States**: Skeleton loading while data fetches

### Responsive Design
- **Mobile First**: Optimized for mobile viewing
- **Grid Layout**: Adapts to different screen sizes
- **Touch Friendly**: Large tap targets for mobile users

## 🔧 Usage Examples

### Basic Usage
```jsx
import RoomCard from '../components/room/RoomCard';

function SearchResults({ rooms }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map(room => (
        <RoomCard
          key={room.id}
          room={room}
          onCardClick={() => navigate(`/room/${room.id}`)}
          onFavorite={(roomId) => toggleFavorite(roomId)}
        />
      ))}
    </div>
  );
}
```

### Compact Mode
```jsx
<RoomCard
  room={room}
  compact={true}
  showDistance={false}
  className="mb-4"
/>
```

### With Distance
```jsx
<RoomCard
  room={room}
  showDistance={true}
  onCardClick={handleCardClick}
/>
```

## 🎯 Interactive States

### Favorite States
- **Not Favorited**: Empty heart outline
- **Favorited**: Filled red heart
- **Loading**: Spinning indicator while saving

### Availability States
- **Available**: Green indicator with "Available Now"
- **Soon**: Yellow indicator with available date
- **Unavailable**: Gray indicator with "Not Available"

### Owner Verification
- **Verified**: Green checkmark badge
- **Unverified**: Gray badge or no badge

## 📱 Responsive Breakpoints

| Screen Size | Layout | Cards Per Row |
|-------------|--------|---------------|
| Mobile (< 768px) | Stacked | 1 |
| Tablet (768px - 1024px) | Grid | 2 |
| Desktop (> 1024px) | Grid | 3-4 |

## 🎨 Styling Classes

### Main Container
```css
.room-card {
  @apply bg-white rounded-xl shadow-sm border border-gray-100
         overflow-hidden hover:shadow-lg transition-all duration-300
         cursor-pointer group;
}
```

### Image Container
```css
.room-image {
  @apply relative aspect-video bg-gray-200 overflow-hidden;
}
```

### Content Section
```css
.room-content {
  @apply p-4 space-y-3;
}
```

## 🔄 Animations

### Hover Effects
- Card lifts with shadow increase
- Image scales slightly (1.05x)
- Favorite button color transitions
- Border color changes

### Loading Animation
- Skeleton placeholder with shimmer effect
- Smooth fade-in when data loads
- Progressive image loading

## 🧩 Dependencies

### Required Packages
- `lucide-react` - Icons (Heart, MapPin, Star, etc.)
- `framer-motion` - Animations and transitions
- `react-router-dom` - Navigation

### Internal Dependencies
- `../../utils/constants.js` - AMENITIES, ROOM_TYPES
- `../../utils/helpers.js` - formatPrice, calculateDistance
- `../common/Button.jsx` - Reusable button component

## 🔍 SEO Considerations
- Semantic HTML structure
- Alt text for images
- Proper heading hierarchy
- Structured data for room listings

## ♿ Accessibility Features
- Keyboard navigation support
- ARIA labels for interactive elements
- Color contrast compliance
- Screen reader friendly content
- Focus indicators

## 🧪 Testing Considerations
- Test with different room data structures
- Verify responsive behavior across devices
- Test favorite functionality
- Validate navigation behavior
- Test loading and error states

## 🚀 Performance Optimizations
- Image lazy loading
- Memoized components for list rendering
- Virtual scrolling for large lists
- Debounced favorite actions
- Cached distance calculations