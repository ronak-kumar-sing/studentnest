import React, { useState, useEffect } from 'react'
import Carousel from './Carousel/Carousel'
import RoomCard from './room/RoomCard'
import FilterComponent from './Filter/FilterComponent'
import { SAMPLE_ROOMS } from '../utils/sampleData'

function Main() {
  const [displayedRooms, setDisplayedRooms] = useState(SAMPLE_ROOMS.slice(0, 6));
  const [priceRange, setPriceRange] = useState([2000, 25000]);
  const [availabilityFilter, setAvailabilityFilter] = useState({
    availableNow: true,
    availableNextMonth: false
  });
  const [roomTypeFilter, setRoomTypeFilter] = useState({
    single: false,
    shared: false,
    pg: false,
    hostel: false,
    apartment: false,
    studio: false
  });
  const [amenityFilter, setAmenityFilter] = useState({
    wifi: false,
    parking: false,
    security: false,
    kitchen: false,
    laundry: false,
    gym: false,
    ac: false,
    heating: false
  });
  const [locationFilter, setLocationFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('default');
  const [areaRange, setAreaRange] = useState([50, 500]);

  const handleCardClick = (roomId) => {
    console.log('Navigating to room:', roomId);
    // Here you would typically navigate to the room details page
    // navigate(`/room/${roomId}`);
  };

  const handleFavorite = (roomId) => {
    console.log('Toggled favorite for room:', roomId);
    // Here you would typically update the favorite status in your state/database
  };

  // Comprehensive filter function
  const applyFilters = () => {
    let filtered = [...SAMPLE_ROOMS];

    // Price filter
    filtered = filtered.filter(room =>
      room.price >= priceRange[0] && room.price <= priceRange[1]
    );

    // Availability filter
    if (availabilityFilter.availableNow && !availabilityFilter.availableNextMonth) {
      filtered = filtered.filter(room => room.availability.isAvailable);
    } else if (!availabilityFilter.availableNow && availabilityFilter.availableNextMonth) {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      filtered = filtered.filter(room => {
        const availableDate = new Date(room.availability.availableFrom);
        return availableDate <= nextMonth;
      });
    } else if (availabilityFilter.availableNow && availabilityFilter.availableNextMonth) {
      // Show all rooms if both are selected
    } else if (!availabilityFilter.availableNow && !availabilityFilter.availableNextMonth) {
      filtered = []; // Show no rooms if none selected
    }

    // Room type filter
    const selectedRoomTypes = Object.keys(roomTypeFilter).filter(type => roomTypeFilter[type]);
    if (selectedRoomTypes.length > 0) {
      filtered = filtered.filter(room => selectedRoomTypes.includes(room.roomType));
    }

    // Amenity filter
    const selectedAmenities = Object.keys(amenityFilter).filter(amenity => amenityFilter[amenity]);
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(room =>
        selectedAmenities.every(amenity => room.amenities.includes(amenity))
      );
    }

    // Location filter
    if (locationFilter.trim()) {
      filtered = filtered.filter(room =>
        room.location.address.toLowerCase().includes(locationFilter.toLowerCase()) ||
        room.location.city.toLowerCase().includes(locationFilter.toLowerCase()) ||
        room.location.nearbyUniversities.some(uni =>
          uni.name.toLowerCase().includes(locationFilter.toLowerCase())
        )
      );
    }

    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(room => room.rating >= ratingFilter);
    }

    // Area filter
    filtered = filtered.filter(room =>
      room.features.area >= areaRange[0] && room.features.area <= areaRange[1]
    );

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.availability.availableFrom) - new Date(a.availability.availableFrom));
        break;
      case 'area':
        filtered.sort((a, b) => b.features.area - a.features.area);
        break;
      default:
        // Keep original order
        break;
    }

    setDisplayedRooms(filtered);
  };

  // Auto-apply filters when any filter changes
  useEffect(() => {
    applyFilters();
  }, [priceRange, availabilityFilter, roomTypeFilter, amenityFilter, locationFilter, ratingFilter, sortBy, areaRange]);

  const clearAllFilters = () => {
    setPriceRange([2000, 25000]);
    setAvailabilityFilter({ availableNow: true, availableNextMonth: false });
    setRoomTypeFilter({
      single: false,
      shared: false,
      pg: false,
      hostel: false,
      apartment: false,
      studio: false
    });
    setAmenityFilter({
      wifi: false,
      parking: false,
      security: false,
      kitchen: false,
      laundry: false,
      gym: false,
      ac: false,
      heating: false
    });
    setLocationFilter('');
    setRatingFilter(0);
    setSortBy('default');
    setAreaRange([50, 500]);
  };

  return (
    <div className='min-h-screen bg-transparent'>
      {/* Hero Section */}
      <div style={{ height: '450px', position: 'relative' }}>
        <Carousel
          baseWidth={1625}
          cardHeight={350}
          autoplay={true}
          autoplayDelay={2500}
          pauseOnHover={true}
          loop={true}
          round={false}
        />
      </div>

      <div className='flex gap-6 p-6 min-h-screen'>
        {/* Filter Sidebar - Sticky */}
        <div className='w-96 flex-shrink-0'>
          <FilterComponent
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            availabilityFilter={availabilityFilter}
            setAvailabilityFilter={setAvailabilityFilter}
            roomTypeFilter={roomTypeFilter}
            setRoomTypeFilter={setRoomTypeFilter}
            amenityFilter={amenityFilter}
            setAmenityFilter={setAmenityFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            areaRange={areaRange}
            setAreaRange={setAreaRange}
            displayedRooms={displayedRooms.length}
            totalRooms={SAMPLE_ROOMS.length}
            clearAllFilters={clearAllFilters}
          />
        </div>

        {/* Main Content Area */}
        <div className='flex-1 min-h-screen'>
          <div className='mb-6'>
            <h2 className='text-white text-2xl font-semibold mb-2'>Available Rooms</h2>
            <p className='text-white/80'>Find your perfect accommodation near top universities</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {displayedRooms.map(room => (
              <RoomCard
                key={room.id}
                room={room}
                onCardClick={handleCardClick}
                onFavorite={handleFavorite}
                showDistance={true}
                className="transform hover:scale-[1.02] transition-transform duration-300"
              />
            ))}
          </div>

          {/* No Results State */}
          {displayedRooms.length === 0 && (
            <div className='text-center py-12'>
              <div className='text-white/60 text-lg mb-4'>No rooms match your current filters</div>
              <button
                onClick={clearAllFilters}
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105'
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          {displayedRooms.length < SAMPLE_ROOMS.length && displayedRooms.length > 0 && (
            <div className='text-center mt-8'>
              <button
                onClick={() => setDisplayedRooms(SAMPLE_ROOMS)}
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105'
              >
                Load More Rooms
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Main