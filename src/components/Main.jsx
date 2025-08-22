import React, { useState, useEffect } from 'react'
import Carousel from './Carousel/Carousel'
import RoomCard from './room/RoomCard'
import { SAMPLE_ROOMS, ROOM_TYPES, AMENITIES } from '../utils/sampleData'
import ShinyText from './TextAnimations/ShinyText/ShinyText'

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
    <div className='min-h-screen p-6 bg-transparent'>
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

      <div className='flex gap-6'>
        {/* Comprehensive Filter Sidebar */}
        <div className='bg-black/30 backdrop-blur-md rounded-3xl p-6 w-96 border border-white/10 max-h-[800px] overflow-y-auto'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-white text-xl font-semibold'>Filters</h2>
            <button
              onClick={clearAllFilters}
              className='text-blue-400 hover:text-blue-300 text-sm underline transition-colors'
            >
              Clear All
            </button>
          </div>

          {/* Sort Options */}
          <div className='mb-6'>
            <h3 className='text-white/90 font-medium mb-3'>Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='default'>Default</option>
              <option value='price-low'>Price: Low to High</option>
              <option value='price-high'>Price: High to Low</option>
              <option value='rating'>Highest Rated</option>
              <option value='newest'>Newest Available</option>
              <option value='area'>Largest Area</option>
            </select>
          </div>

          {/* Location Search */}
          <div className='mb-6'>
            <h3 className='text-white/90 font-medium mb-3'>Location</h3>
            <input
              type='text'
              placeholder='Search by area, city, or university...'
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className='w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Availability Filter */}
          <div className='mb-6'>
            <h3 className='text-white/90 font-medium mb-3'>Availability</h3>
            <div className='space-y-2'>
              <label className='flex items-center text-white/90 text-sm'>
                <input
                  type='checkbox'
                  className='mr-2 accent-blue-500'
                  checked={availabilityFilter.availableNow}
                  onChange={(e) => setAvailabilityFilter({
                    ...availabilityFilter,
                    availableNow: e.target.checked
                  })}
                />
                Available Now
              </label>
              <label className='flex items-center text-white/90 text-sm'>
                <input
                  type='checkbox'
                  className='mr-2 accent-blue-500'
                  checked={availabilityFilter.availableNextMonth}
                  onChange={(e) => setAvailabilityFilter({
                    ...availabilityFilter,
                    availableNextMonth: e.target.checked
                  })}
                />
                Available Next Month
              </label>
            </div>
          </div>

          {/* Room Type Filter */}
          <div className='mb-6'>
            <h3 className='text-white/90 font-medium mb-3'>Room Type</h3>
            <div className='space-y-2'>
              {Object.entries(ROOM_TYPES).map(([key, label]) => (
                <label key={key} className='flex items-center text-white/90 text-sm'>
                  <input
                    type='checkbox'
                    className='mr-2 accent-blue-500'
                    checked={roomTypeFilter[key]}
                    onChange={(e) => setRoomTypeFilter({
                      ...roomTypeFilter,
                      [key]: e.target.checked
                    })}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className='mb-6'>
            <h3 className='text-white/90 font-medium mb-3'>Price Range</h3>
            <div className='text-white/70 text-sm mb-3'>
              ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
            </div>
            <div className='space-y-3'>
              <div>
                <label className='text-white/70 text-xs'>Min Price</label>
                <input
                  type='range'
                  min='2000'
                  max='25000'
                  step='500'
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className='w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer mt-1'
                />
              </div>
              <div>
                <label className='text-white/70 text-xs'>Max Price</label>
                <input
                  type='range'
                  min='2000'
                  max='25000'
                  step='500'
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className='w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer mt-1'
                />
              </div>
            </div>
          </div>

          {/* Area Range */}
          <div className='mb-6'>
            <h3 className='text-white/90 font-medium mb-3'>Area (sq ft)</h3>
            <div className='text-white/70 text-sm mb-3'>
              {areaRange[0]} - {areaRange[1]} sq ft
            </div>
            <div className='space-y-3'>
              <div>
                <label className='text-white/70 text-xs'>Min Area</label>
                <input
                  type='range'
                  min='50'
                  max='500'
                  step='25'
                  value={areaRange[0]}
                  onChange={(e) => setAreaRange([parseInt(e.target.value), areaRange[1]])}
                  className='w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer mt-1'
                />
              </div>
              <div>
                <label className='text-white/70 text-xs'>Max Area</label>
                <input
                  type='range'
                  min='50'
                  max='500'
                  step='25'
                  value={areaRange[1]}
                  onChange={(e) => setAreaRange([areaRange[0], parseInt(e.target.value)])}
                  className='w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer mt-1'
                />
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className='mb-6'>
            <h3 className='text-white/90 font-medium mb-3'>Minimum Rating</h3>
            <div className='flex space-x-2'>
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setRatingFilter(rating === ratingFilter ? 0 : rating)}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${ratingFilter >= rating
                      ? 'bg-yellow-500 text-black'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                >
                  {rating}★
                </button>
              ))}
            </div>
            {ratingFilter > 0 && (
              <div className='text-white/60 text-xs mt-2'>
                Showing rooms rated {ratingFilter}+ stars
              </div>
            )}
          </div>

          {/* Amenities Filter */}
          <div className='mb-6'>
            <h3 className='text-white/90 font-medium mb-3'>Amenities</h3>
            <div className='grid grid-cols-2 gap-2'>
              {Object.entries(AMENITIES).map(([key, amenity]) => (
                <label key={key} className='flex items-center text-white/90 text-sm'>
                  <input
                    type='checkbox'
                    className='mr-2 accent-blue-500'
                    checked={amenityFilter[key]}
                    onChange={(e) => setAmenityFilter({
                      ...amenityFilter,
                      [key]: e.target.checked
                    })}
                  />
                  <span className='truncate'>{amenity.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Price Filters */}
          <div className='mb-6'>
            <h3 className='text-white/90 font-medium mb-3'>Quick Price Filters</h3>
            <div className='space-y-2'>
              <button
                className='block w-full text-left hover:text-blue-300 transition-colors text-white/80 text-sm py-1'
                onClick={() => setPriceRange([2000, 5000])}
              >
                Up to ₹5,000
              </button>
              <button
                className='block w-full text-left hover:text-blue-300 transition-colors text-white/80 text-sm py-1'
                onClick={() => setPriceRange([5000, 8000])}
              >
                ₹5,000 - ₹8,000
              </button>
              <button
                className='block w-full text-left hover:text-blue-300 transition-colors text-white/80 text-sm py-1'
                onClick={() => setPriceRange([8000, 12000])}
              >
                ₹8,000 - ₹12,000
              </button>
              <button
                className='block w-full text-left hover:text-blue-300 transition-colors text-white/80 text-sm py-1'
                onClick={() => setPriceRange([12000, 25000])}
              >
                Over ₹12,000
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className='pt-6 border-t border-white/20'>
            <div className='text-center'>
              <div className='text-white/70 text-sm mb-2'>
                Showing {displayedRooms.length} of {SAMPLE_ROOMS.length} rooms
              </div>
              <div className='text-white/50 text-xs'>
                Filters applied: {[
                  locationFilter && 'Location',
                  Object.values(roomTypeFilter).some(v => v) && 'Room Type',
                  Object.values(amenityFilter).some(v => v) && 'Amenities',
                  ratingFilter > 0 && 'Rating',
                  (priceRange[0] !== 2000 || priceRange[1] !== 25000) && 'Price',
                  (areaRange[0] !== 50 || areaRange[1] !== 500) && 'Area'
                ].filter(Boolean).join(', ') || 'None'}
              </div>
            </div>
          </div>
        </div>

        {/* Room Listings */}
        <div className='flex-1'>
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

          {/* Load More Button */}
          {displayedRooms.length < SAMPLE_ROOMS.length && (
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