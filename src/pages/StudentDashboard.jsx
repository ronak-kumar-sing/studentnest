import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import FilterComponent from '../components/Filter/FilterComponent'
import RoomCard from '../components/room/RoomCard'
import { SAMPLE_ROOMS } from '../utils/sampleData'
import { useState, useEffect } from 'react'

const StudentDashboard = () => {
  const { user } = useAuth()
  const [displayedRooms, setDisplayedRooms] = useState(SAMPLE_ROOMS.slice(0, 6))
  const [priceRange, setPriceRange] = useState([2000, 25000])
  const [availabilityFilter, setAvailabilityFilter] = useState({
    availableNow: true,
    availableNextMonth: false
  })
  const [roomTypeFilter, setRoomTypeFilter] = useState({
    single: false,
    shared: false,
    pg: false,
    hostel: false,
    apartment: false,
    studio: false
  })
  const [amenityFilter, setAmenityFilter] = useState({
    wifi: false,
    parking: false,
    security: false,
    kitchen: false,
    laundry: false,
    gym: false,
    ac: false,
    heating: false
  })
  const [locationFilter, setLocationFilter] = useState('')
  const [ratingFilter, setRatingFilter] = useState(0)
  const [sortBy, setSortBy] = useState('default')
  const [areaRange, setAreaRange] = useState([50, 500])

  const handleCardClick = (roomId) => {
    console.log('Navigating to room:', roomId)
  }

  const handleFavorite = (roomId) => {
    console.log('Toggled favorite for room:', roomId)
  }

  // Comprehensive filter function
  const applyFilters = () => {
    let filtered = [...SAMPLE_ROOMS]

    // Price filter
    filtered = filtered.filter(room =>
      room.price >= priceRange[0] && room.price <= priceRange[1]
    )

    // Availability filter
    if (availabilityFilter.availableNow && !availabilityFilter.availableNextMonth) {
      filtered = filtered.filter(room => room.availability.isAvailable)
    } else if (!availabilityFilter.availableNow && availabilityFilter.availableNextMonth) {
      const nextMonth = new Date()
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      filtered = filtered.filter(room => {
        const availableDate = new Date(room.availability.availableFrom)
        return availableDate <= nextMonth
      })
    } else if (!availabilityFilter.availableNow && !availabilityFilter.availableNextMonth) {
      filtered = []
    }

    // Room type filter
    const selectedRoomTypes = Object.keys(roomTypeFilter).filter(type => roomTypeFilter[type])
    if (selectedRoomTypes.length > 0) {
      filtered = filtered.filter(room => selectedRoomTypes.includes(room.roomType))
    }

    // Amenity filter
    const selectedAmenities = Object.keys(amenityFilter).filter(amenity => amenityFilter[amenity])
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(room =>
        selectedAmenities.every(amenity => room.amenities.includes(amenity))
      )
    }

    // Location filter
    if (locationFilter.trim()) {
      filtered = filtered.filter(room =>
        room.location.address.toLowerCase().includes(locationFilter.toLowerCase()) ||
        room.location.city.toLowerCase().includes(locationFilter.toLowerCase()) ||
        room.location.nearbyUniversities.some(uni =>
          uni.name.toLowerCase().includes(locationFilter.toLowerCase())
        )
      )
    }

    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(room => room.rating >= ratingFilter)
    }

    // Area filter
    filtered = filtered.filter(room =>
      room.features.area >= areaRange[0] && room.features.area <= areaRange[1]
    )

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.availability.availableFrom) - new Date(a.availability.availableFrom))
        break
      case 'area':
        filtered.sort((a, b) => b.features.area - a.features.area)
        break
      default:
        break
    }

    setDisplayedRooms(filtered)
  }

  // Auto-apply filters when any filter changes
  useEffect(() => {
    applyFilters()
  }, [priceRange, availabilityFilter, roomTypeFilter, amenityFilter, locationFilter, ratingFilter, sortBy, areaRange])

  const clearAllFilters = () => {
    setPriceRange([2000, 25000])
    setAvailabilityFilter({ availableNow: true, availableNextMonth: false })
    setRoomTypeFilter({
      single: false,
      shared: false,
      pg: false,
      hostel: false,
      apartment: false,
      studio: false
    })
    setAmenityFilter({
      wifi: false,
      parking: false,
      security: false,
      kitchen: false,
      laundry: false,
      gym: false,
      ac: false,
      heating: false
    })
    setLocationFilter('')
    setRatingFilter(0)
    setSortBy('default')
    setAreaRange([50, 500])
  }

  return (
    <div className='min-h-screen bg-[#060010]/98'>
      {/* Welcome Banner */}
      <div className='bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10'>
        <div className='container mx-auto px-6 py-8'>
          <div className='max-w-4xl'>
            <h1 className='text-3xl font-bold text-white mb-2'>
              Welcome back, {user?.name}! 👋
            </h1>
            <p className='text-white/80 text-lg'>
              Find your perfect accommodation from {SAMPLE_ROOMS.length} available rooms
            </p>

            {/* Quick Stats */}
            <div className='flex items-center space-x-6 mt-6'>
              <div className='flex items-center space-x-2'>
                <div className='w-3 h-3 bg-green-400 rounded-full'></div>
                <span className='text-white/70 text-sm'>
                  {SAMPLE_ROOMS.filter(room => room.availability.isAvailable).length} Available Now
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='w-3 h-3 bg-blue-400 rounded-full'></div>
                <span className='text-white/70 text-sm'>
                  {SAMPLE_ROOMS.filter(room => room.rating >= 4.5).length} Highly Rated
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='w-3 h-3 bg-purple-400 rounded-full'></div>
                <span className='text-white/70 text-sm'>
                  Starting from ₹{Math.min(...SAMPLE_ROOMS.map(room => room.price)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 py-6'>
        <div className='flex gap-6 min-h-screen'>
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
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-white text-2xl font-semibold mb-2'>Available Rooms</h2>
                  <p className='text-white/80'>
                    {displayedRooms.length} room{displayedRooms.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                {/* View Toggle */}
                <div className='flex items-center space-x-2 bg-black/20 rounded-xl p-1 border border-white/10'>
                  <button className='px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium'>
                    Grid
                  </button>
                  <button className='px-3 py-2 text-white/70 hover:text-white rounded-lg text-sm font-medium transition-colors'>
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Room Grid */}
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
              <div className='text-center py-16'>
                <div className='text-6xl mb-4'>🔍</div>
                <h3 className='text-white/80 text-xl mb-2'>No rooms match your filters</h3>
                <p className='text-white/60 mb-6'>Try adjusting your search criteria to find more options</p>
                <button
                  onClick={clearAllFilters}
                  className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105'
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {displayedRooms.length > 0 && displayedRooms.length < SAMPLE_ROOMS.length && (
              <div className='text-center mt-12'>
                <button
                  onClick={() => setDisplayedRooms(SAMPLE_ROOMS)}
                  className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg'
                >
                  Load More Rooms
                  <svg className='inline-block w-4 h-4 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
