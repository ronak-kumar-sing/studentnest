# RoomDetails Page Component

A comprehensive page component that displays detailed information about a specific room including images, amenities, location, reviews, and booking functionality.

## 📍 Location
`src/pages/RoomDetails.jsx`

## 🎯 Purpose
- Display complete room information and photos
- Show interactive map with location
- Display reviews and ratings
- Provide booking/contact functionality
- Show similar room recommendations

## 📋 URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | ✅ | Room ID from the URL path `/room/:id` |

## 🏗️ Page Sections

### 1. Image Gallery Section
```
┌─────────────────────────────────────────────────┐
│ [Main Image]                    [Favorite] [Share] │
│                                                 │
│ [Thumbnail] [Thumbnail] [Thumbnail] [View All]  │
└─────────────────────────────────────────────────┘
```

### 2. Room Information Section
```
┌─────────────────────────────────────────────────┐
│ Room Title                             ₹Price/month │
│ 📍 Full Address                                  │
│ ⭐ 4.5 Rating (25 reviews) • Room Type          │
│                                                 │
│ 👤 Owner: Name ✅ Verified                      │
│ 📞 Phone • ✉️ Email • 💬 Chat                   │
│                                                 │
│ [Book Now] [Schedule Visit] [Add to Favorites]  │
└─────────────────────────────────────────────────┘
```

### 3. Details & Features Section
```
┌─────────────────────────────────────────────────┐
│ About This Place                                │
│ Description text...                             │
│                                                 │
│ Room Features                                   │
│ • Area: 200 sq ft    • Floor: 2/5             │
│ • Furnished: Yes     • Balcony: Yes           │
│                                                 │
│ Amenities                                       │
│ [WiFi] [AC] [Kitchen] [Parking] [Security]     │
│ [More...]                                       │
└─────────────────────────────────────────────────┘
```

### 4. Location & Map Section
```
┌─────────────────────────────────────────────────┐
│ Location & Nearby                               │
│                                                 │
│ [Interactive Map with Marker]                   │
│                                                 │
│ 🏫 Nearby Universities                          │
│ • Delhi University - 2.5 km (15 min)          │
│ • JNU - 5.2 km (25 min)                       │
│                                                 │
│ 🏪 Nearby Facilities                            │
│ • Metro Station - 500m    • Grocery - 200m    │
│ • Hospital - 1km          • Restaurant - 100m  │
└─────────────────────────────────────────────────┘
```

### 5. Reviews Section
```
┌─────────────────────────────────────────────────┐
│ Reviews & Ratings                               │
│                                                 │
│ Overall Rating: ⭐⭐⭐⭐⭐ 4.5/5 (25 reviews)     │
│                                                 │
│ Rating Breakdown:                               │
│ Cleanliness    ████████░░ 4.2                  │
│ Location       █████████░ 4.8                  │
│ Amenities      ███████░░░ 3.9                  │
│ Owner          █████████░ 4.6                  │
│                                                 │
│ Recent Reviews:                                 │
│ 👤 Student Name ⭐⭐⭐⭐⭐ 2 months ago          │
│ "Great place, very clean and near to university" │
│                                                 │
│ [Load More Reviews] [Write a Review]            │
└─────────────────────────────────────────────────┘
```

### 6. Similar Rooms Section
```
┌─────────────────────────────────────────────────┐
│ Similar Rooms You Might Like                    │
│                                                 │
│ [RoomCard] [RoomCard] [RoomCard] [RoomCard]     │
└─────────────────────────────────────────────────┘
```

## 🎨 Component Structure

```jsx
function RoomDetails() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Image Gallery */}
      <ImageGallery images={room.images} />

      {/* Main Content */}
      <div className="container-max py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Column - Room Info */}
          <div className="lg:col-span-2 space-y-8">
            <RoomHeader room={room} />
            <RoomDescription room={room} />
            <AmenitiesList amenities={room.amenities} />
            <LocationMap location={room.location} />
            <ReviewsSection roomId={room.id} />
          </div>

          {/* Right Column - Booking Panel */}
          <div className="lg:col-span-1">
            <BookingPanel room={room} />
            <OwnerContact owner={room.owner} />
          </div>
        </div>

        {/* Similar Rooms */}
        <SimilarRooms currentRoomId={room.id} />
      </div>
    </div>
  );
}
```

## 🧩 Sub-Components

### ImageGallery Component
```jsx
const ImageGallery = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="aspect-video bg-gray-200">
        <img src={images[currentImage]} />

        {/* Navigation Arrows */}
        <button onClick={previousImage}>←</button>
        <button onClick={nextImage}>→</button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <FavoriteButton />
          <ShareButton />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 p-4">
        {images.slice(0, 4).map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => setCurrentImage(index)}
            className="w-20 h-16 object-cover rounded cursor-pointer"
          />
        ))}
        {images.length > 4 && (
          <button onClick={() => setShowAllImages(true)}>
            View All {images.length}
          </button>
        )}
      </div>

      {/* Full Screen Gallery Modal */}
      {showAllImages && (
        <ImageGalleryModal
          images={images}
          onClose={() => setShowAllImages(false)}
        />
      )}
    </div>
  );
};
```

### BookingPanel Component
```jsx
const BookingPanel = ({ room }) => {
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null
  });

  return (
    <div className="card sticky top-8">
      <div className="text-2xl font-bold mb-4">
        ₹{room.price.toLocaleString()}/month
      </div>

      {/* Availability Calendar */}
      <div className="mb-4">
        <label>Available From:</label>
        <input
          type="date"
          min={room.availability.availableFrom}
          className="input-field"
        />
      </div>

      {/* Booking Buttons */}
      <div className="space-y-3">
        <button className="btn-primary w-full">
          Book Now
        </button>
        <button className="btn-secondary w-full">
          Schedule Visit
        </button>
        <button className="btn-ghost w-full">
          Add to Favorites
        </button>
      </div>

      {/* Cost Breakdown */}
      <div className="mt-4 pt-4 border-t text-sm">
        <div className="flex justify-between">
          <span>Monthly Rent</span>
          <span>₹{room.price}</span>
        </div>
        <div className="flex justify-between">
          <span>Security Deposit</span>
          <span>₹{room.price * 2}</span>
        </div>
        <div className="flex justify-between font-semibold pt-2 border-t">
          <span>Total Initial Cost</span>
          <span>₹{room.price * 3}</span>
        </div>
      </div>
    </div>
  );
};
```

### LocationMap Component
```jsx
const LocationMap = ({ location }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Location & Nearby</h3>

      {/* Interactive Map */}
      <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
        {mapLoaded ? (
          <Map
            center={location.coordinates}
            markers={[location.coordinates]}
            nearbyPlaces={location.nearbyFacilities}
          />
        ) : (
          <MapSkeleton />
        )}
      </div>

      {/* Nearby Universities */}
      <div>
        <h4 className="font-medium mb-3">🏫 Nearby Universities</h4>
        <div className="space-y-2">
          {location.nearbyUniversities.map((uni, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{uni.name}</div>
                <div className="text-sm text-gray-600">
                  {uni.distance} km • {uni.commute} min by transport
                </div>
              </div>
              <button className="text-primary-600 text-sm">
                Get Directions
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Facilities */}
      <div>
        <h4 className="font-medium mb-3">🏪 Nearby Facilities</h4>
        <div className="grid grid-cols-2 gap-4">
          {location.nearbyFacilities.map((facility, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <FacilityIcon type={facility.type} />
              <span>{facility.name}</span>
              <span className="text-gray-500">({facility.distance}m)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

## 🔍 Data Fetching

### Room Data Hook
```jsx
const useRoomDetails = (roomId) => {
  return useQuery({
    queryKey: ['room', roomId],
    queryFn: () => roomService.getRoomById(roomId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Usage in component
function RoomDetails() {
  const { id } = useParams();
  const { data: room, isLoading, error } = useRoomDetails(id);

  if (isLoading) return <RoomDetailsSkeleton />;
  if (error) return <ErrorPage />;
  if (!room) return <NotFound />;

  return (
    // Component JSX
  );
}
```

### Related Data
```jsx
// Fetch similar rooms
const useSimilarRooms = (roomId, location, roomType) => {
  return useQuery({
    queryKey: ['similar-rooms', roomId],
    queryFn: () => roomService.getSimilarRooms({
      excludeId: roomId,
      location: location.coordinates,
      roomType,
      limit: 4
    }),
    enabled: !!roomId,
  });
};

// Fetch reviews
const useRoomReviews = (roomId) => {
  return useQuery({
    queryKey: ['room-reviews', roomId],
    queryFn: () => reviewService.getReviewsByRoom(roomId),
    enabled: !!roomId,
  });
};
```

## 📱 Responsive Design

### Mobile Layout (< 768px)
- Single column layout
- Sticky booking panel at bottom
- Collapsible sections
- Touch-optimized image gallery
- Simplified map view

### Tablet Layout (768px - 1024px)
- Two-column layout for some sections
- Larger map display
- Side-by-side amenities grid

### Desktop Layout (> 1024px)
- Three-column layout with sticky sidebar
- Full-featured map with overlays
- Expanded image gallery
- Side-by-side content sections

## 🎯 Interactive Features

### Image Gallery
- **Swipe Support**: Touch gestures for mobile
- **Keyboard Navigation**: Arrow keys for desktop
- **Zoom Functionality**: Click to zoom on desktop
- **Full Screen Mode**: Modal overlay for better viewing

### Booking Actions
- **Instant Booking**: Direct booking for verified rooms
- **Visit Scheduling**: Calendar integration for visits
- **Contact Owner**: Multiple contact methods
- **Save for Later**: Add to favorites list

### Reviews & Ratings
- **Filter Reviews**: By rating, date, student type
- **Sort Options**: Most recent, highest rating, most helpful
- **Write Review**: Modal form for authenticated users
- **Like Reviews**: Vote on helpful reviews

## 🔐 Authentication & Permissions

### Public Access
- View room details
- Browse photos
- See reviews and ratings
- View location (limited)

### Authenticated Users
- Contact owner directly
- Book or schedule visits
- Write and edit reviews
- Save to favorites
- Access full location details

### Room Owners
- Edit room information
- Respond to reviews
- Manage booking requests
- Update availability

## 🧪 Loading & Error States

### Loading States
- **Room Data**: Skeleton with shimmer effect
- **Images**: Progressive loading with blur effect
- **Map**: Loading spinner with fallback
- **Reviews**: Skeleton cards

### Error States
- **Room Not Found**: 404 page with search suggestions
- **Network Error**: Retry button with error message
- **Map Load Error**: Static image fallback
- **Booking Error**: Inline error with alternative actions

## 🚀 Performance Optimizations

### Image Optimization
- **Lazy Loading**: Load images as they enter viewport
- **Multiple Sizes**: Responsive image sizes
- **WebP Format**: Modern format with JPEG fallback
- **Compression**: Optimized file sizes

### Code Splitting
- **Route-based**: Separate bundle for room details
- **Component-based**: Lazy load heavy components
- **Third-party**: Separate bundles for maps, charts

### Caching Strategy
- **Room Data**: Cache for 5 minutes
- **Images**: Browser cache for 24 hours
- **Reviews**: Cache for 10 minutes
- **Similar Rooms**: Cache for 1 hour

## ♿ Accessibility Features

### Screen Reader Support
- Semantic HTML structure
- ARIA labels and descriptions
- Alt text for all images
- Proper heading hierarchy

### Keyboard Navigation
- Tab order for interactive elements
- Enter/Space for button activation
- Arrow keys for gallery navigation
- Escape key to close modals

### Visual Accessibility
- High contrast ratios
- Focus indicators
- Readable font sizes
- Color blind friendly palette

## 📊 Analytics & Tracking

### User Interactions
- Room view events
- Image gallery interactions
- Booking button clicks
- Contact owner actions
- Review interactions

### Performance Metrics
- Page load times
- Image load times
- Map render times
- User engagement duration

## 🔧 Configuration Options

### Feature Flags
```javascript
const FEATURES = {
  enableBooking: true,
  enableReviews: true,
  enableMap: true,
  enableSimilarRooms: true,
  enableShare: true,
};
```

### Display Options
```javascript
const DISPLAY_CONFIG = {
  imagesPerRow: 4,
  maxReviewsInitial: 5,
  similarRoomsCount: 4,
  mapHeight: '400px',
  enableImageZoom: true,
};
```