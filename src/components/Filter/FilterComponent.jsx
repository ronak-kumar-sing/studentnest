import React from 'react'
import { ROOM_TYPES, AMENITIES } from '../../utils/sampleData'

function FilterComponent({
  priceRange,
  setPriceRange,
  availabilityFilter,
  setAvailabilityFilter,
  roomTypeFilter,
  setRoomTypeFilter,
  amenityFilter,
  setAmenityFilter,
  locationFilter,
  setLocationFilter,
  ratingFilter,
  setRatingFilter,
  sortBy,
  setSortBy,
  areaRange,
  setAreaRange,
  displayedRooms,
  totalRooms,
  clearAllFilters
}) {
  return (
    <div className='bg-black/30 backdrop-blur-md rounded-3xl p-0 w-full border border-white/10 sticky top-6 h-screen overflow-hidden flex flex-col'>
      {/* Header Section */}
      <div className='p-6 pb-4 border-b border-white/10'>
        <div className='flex justify-between items-center mb-3'>
          <h2 className='text-white text-xl font-semibold'>Filters</h2>
          <div className='flex items-center gap-3'>
            <div className='text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full'>
              {[
                locationFilter && 'Location',
                Object.values(roomTypeFilter).some(v => v) && 'Room Type',
                Object.values(amenityFilter).some(v => v) && 'Amenities',
                ratingFilter > 0 && 'Rating',
                (priceRange[0] !== 2000 || priceRange[1] !== 25000) && 'Price',
                (areaRange[0] !== 50 || areaRange[1] !== 500) && 'Area'
              ].filter(Boolean).length} active
            </div>
            <button
              onClick={clearAllFilters}
              className='text-white/80 hover:text-white text-xs px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-all duration-200'
            >
              Clear All
            </button>
          </div>
        </div>
        <div className='text-white/60 text-sm'>
          Showing {displayedRooms} of {totalRooms} rooms
        </div>
      </div>

      {/* Scrollable Filter Content */}
      <div className='flex-1 overflow-y-auto px-6 py-4 space-y-6'>
        {/* Sort Options Card */}
        <div className='bg-white/5 rounded-2xl p-4 border border-white/10'>
          <div className='flex items-center gap-2 mb-3'>
            <svg className='w-4 h-4 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12' />
            </svg>
            <h3 className='text-white/90 font-medium text-sm'>Sort By</h3>
          </div>
          <div className='relative'>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-200 hover:border-white/30'
            >
              <option value='default' className='bg-gray-800'>Default</option>
              <option value='price-low' className='bg-gray-800'>💰 Price: Low to High</option>
              <option value='price-high' className='bg-gray-800'>💎 Price: High to Low</option>
              <option value='rating' className='bg-gray-800'>⭐ Highest Rated</option>
              <option value='newest' className='bg-gray-800'>🆕 Newest Available</option>
              <option value='area' className='bg-gray-800'>📐 Largest Area</option>
            </select>
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
              <svg className='w-4 h-4 text-white/50' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </div>
          </div>
        </div>

        {/* Location Search Card */}
        <div className='bg-white/5 rounded-2xl p-4 border border-white/10'>
          <div className='flex items-center gap-2 mb-3'>
            <svg className='w-4 h-4 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>
            <h3 className='text-white/90 font-medium text-sm'>Location</h3>
          </div>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search by area, city, or university...'
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className='w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 pl-10 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-white/30'
            />
            <svg className='absolute left-3 top-3.5 w-4 h-4 text-white/40' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>
        </div>

        {/* Availability Toggle Card */}
        <div className='bg-white/5 rounded-2xl p-4 border border-white/10'>
          <div className='flex items-center gap-2 mb-4'>
            <svg className='w-4 h-4 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
            </svg>
            <h3 className='text-white/90 font-medium text-sm'>Availability</h3>
          </div>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-white/80 text-sm'>Available Now</span>
              <div className='relative'>
                <input
                  type='checkbox'
                  className='sr-only'
                  checked={availabilityFilter.availableNow}
                  onChange={(e) => setAvailabilityFilter({
                    ...availabilityFilter,
                    availableNow: e.target.checked
                  })}
                />
                <div
                  className={`w-11 h-6 rounded-full cursor-pointer transition-all duration-200 ${availabilityFilter.availableNow ? 'bg-blue-500' : 'bg-white/20'
                    }`}
                  onClick={() => setAvailabilityFilter({
                    ...availabilityFilter,
                    availableNow: !availabilityFilter.availableNow
                  })}
                >
                  <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform duration-200 ${availabilityFilter.availableNow ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-white/80 text-sm'>Available Next Month</span>
              <div className='relative'>
                <input
                  type='checkbox'
                  className='sr-only'
                  checked={availabilityFilter.availableNextMonth}
                  onChange={(e) => setAvailabilityFilter({
                    ...availabilityFilter,
                    availableNextMonth: e.target.checked
                  })}
                />
                <div
                  className={`w-11 h-6 rounded-full cursor-pointer transition-all duration-200 ${availabilityFilter.availableNextMonth ? 'bg-blue-500' : 'bg-white/20'
                    }`}
                  onClick={() => setAvailabilityFilter({
                    ...availabilityFilter,
                    availableNextMonth: !availabilityFilter.availableNextMonth
                  })}
                >
                  <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform duration-200 ${availabilityFilter.availableNextMonth ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Room Type Card with Icons */}
        <div className='bg-white/5 rounded-2xl p-4 border border-white/10'>
          <div className='flex items-center gap-2 mb-4'>
            <svg className='w-4 h-4 text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
            </svg>
            <h3 className='text-white/90 font-medium text-sm'>Room Type</h3>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            {Object.entries(ROOM_TYPES).map(([key, label]) => (
              <div
                key={key}
                className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-105 ${roomTypeFilter[key]
                  ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                  : 'bg-black/20 border-white/10 text-white/70 hover:border-white/20 hover:bg-white/10'
                  }`}
                onClick={() => setRoomTypeFilter({
                  ...roomTypeFilter,
                  [key]: !roomTypeFilter[key]
                })}
              >
                <div className='text-center'>
                  <div className='text-lg mb-1'>
                    {key === 'single' && '🛏️'}
                    {key === 'shared' && '🏠'}
                    {key === 'pg' && '🏢'}
                    {key === 'hostel' && '🏨'}
                    {key === 'apartment' && '🏘️'}
                    {key === 'studio' && '🏬'}
                  </div>
                  <div className='text-xs font-medium'>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Price Range Card */}
        <div className='bg-white/5 rounded-2xl p-4 border border-white/10'>
          <div className='flex items-center gap-2 mb-4'>
            <svg className='w-4 h-4 text-yellow-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
            </svg>
            <h3 className='text-white/90 font-medium text-sm'>Price Range</h3>
          </div>
          <div className='text-center mb-4 p-3 bg-black/20 rounded-xl'>
            <div className='text-white/90 font-semibold text-lg'>
              ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
            </div>
            <div className='text-white/50 text-xs'>per month</div>
          </div>
          <div className='space-y-4'>
            <div>
              <div className='flex justify-between text-white/70 text-xs mb-2'>
                <span>Min: ₹{priceRange[0].toLocaleString()}</span>
                <span>Max: ₹{priceRange[1].toLocaleString()}</span>
              </div>
              <div className='relative'>
                <input
                  type='range'
                  min='2000'
                  max='25000'
                  step='500'
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className='w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb'
                />
              </div>
            </div>
            {/* Quick Price Buttons */}
            <div className='grid grid-cols-2 gap-2'>
              <button
                className='text-xs px-3 py-2 bg-black/20 hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/50 rounded-lg text-white/80 hover:text-blue-300 transition-all duration-200'
                onClick={() => setPriceRange([2000, 5000])}
              >
                ≤ ₹5K
              </button>
              <button
                className='text-xs px-3 py-2 bg-black/20 hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/50 rounded-lg text-white/80 hover:text-blue-300 transition-all duration-200'
                onClick={() => setPriceRange([5000, 8000])}
              >
                ₹5K-8K
              </button>
              <button
                className='text-xs px-3 py-2 bg-black/20 hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/50 rounded-lg text-white/80 hover:text-blue-300 transition-all duration-200'
                onClick={() => setPriceRange([8000, 12000])}
              >
                ₹8K-12K
              </button>
              <button
                className='text-xs px-3 py-2 bg-black/20 hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/50 rounded-lg text-white/80 hover:text-blue-300 transition-all duration-200'
                onClick={() => setPriceRange([12000, 25000])}
              >
                ≥ ₹12K
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Area Range Card */}
        <div className='bg-white/5 rounded-2xl p-4 border border-white/10'>
          <div className='flex items-center gap-2 mb-4'>
            <svg className='w-4 h-4 text-orange-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4' />
            </svg>
            <h3 className='text-white/90 font-medium text-sm'>Area Range</h3>
          </div>
          <div className='text-center mb-4 p-3 bg-black/20 rounded-xl'>
            <div className='text-white/90 font-semibold text-lg'>
              {areaRange[0]} - {areaRange[1]} sq ft
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <div className='flex justify-between text-white/70 text-xs mb-2'>
                <span>Min: {areaRange[0]} sq ft</span>
                <span>Max: {areaRange[1]} sq ft</span>
              </div>
              <div className='relative'>
                <input
                  type='range'
                  min='50'
                  max='500'
                  step='25'
                  value={areaRange[0]}
                  onChange={(e) => setAreaRange([parseInt(e.target.value), areaRange[1]])}
                  className='w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb'
                />
              </div>
            </div>
            {/* Quick Area Buttons */}
            <div className='grid grid-cols-3 gap-2'>
              <button
                className='text-xs px-2 py-2 bg-black/20 hover:bg-orange-500/20 border border-white/10 hover:border-orange-400/50 rounded-lg text-white/80 hover:text-orange-300 transition-all duration-200'
                onClick={() => setAreaRange([50, 150])}
              >
                Cozy
              </button>
              <button
                className='text-xs px-2 py-2 bg-black/20 hover:bg-orange-500/20 border border-white/10 hover:border-orange-400/50 rounded-lg text-white/80 hover:text-orange-300 transition-all duration-200'
                onClick={() => setAreaRange([150, 300])}
              >
                Medium
              </button>
              <button
                className='text-xs px-2 py-2 bg-black/20 hover:bg-orange-500/20 border border-white/10 hover:border-orange-400/50 rounded-lg text-white/80 hover:text-orange-300 transition-all duration-200'
                onClick={() => setAreaRange([300, 500])}
              >
                Large
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Rating Filter Card */}
        <div className='bg-white/5 rounded-2xl p-4 border border-white/10'>
          <div className='flex items-center gap-2 mb-4'>
            <svg className='w-4 h-4 text-yellow-400' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
            </svg>
            <h3 className='text-white/90 font-medium text-sm'>Minimum Rating</h3>
          </div>
          <div className='grid grid-cols-5 gap-2 mb-3'>
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                onClick={() => setRatingFilter(rating === ratingFilter ? 0 : rating)}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 border ${ratingFilter >= rating
                  ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-lg'
                  : 'bg-black/20 border-white/10 text-white/70 hover:border-yellow-400/30 hover:bg-yellow-500/10'
                  }`}
              >
                {rating}★
              </button>
            ))}
          </div>
          {ratingFilter > 0 && (
            <div className='text-center text-yellow-300 text-xs bg-yellow-500/10 p-2 rounded-lg border border-yellow-400/20'>
              Showing {ratingFilter}+ star rated rooms
            </div>
          )}
        </div>

        {/* Enhanced Amenities Card */}
        <div className='bg-white/5 rounded-2xl p-4 border border-white/10'>
          <div className='flex items-center gap-2 mb-4'>
            <svg className='w-4 h-4 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' />
            </svg>
            <h3 className='text-white/90 font-medium text-sm'>Amenities</h3>
            <div className='ml-auto text-xs bg-white/10 px-2 py-1 rounded-full text-white/60'>
              {Object.values(amenityFilter).filter(Boolean).length} selected
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            {Object.entries(AMENITIES).map(([key, amenity]) => (
              <div
                key={key}
                className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-105 ${amenityFilter[key]
                  ? 'bg-green-500/20 border-green-400 text-green-300'
                  : 'bg-black/20 border-white/10 text-white/70 hover:border-white/20 hover:bg-white/10'
                  }`}
                onClick={() => setAmenityFilter({
                  ...amenityFilter,
                  [key]: !amenityFilter[key]
                })}
              >
                <div className='flex items-center gap-2'>
                  <div className='text-sm'>
                    {key === 'wifi' && '📶'}
                    {key === 'parking' && '🚗'}
                    {key === 'security' && '🔒'}
                    {key === 'kitchen' && '🍽️'}
                    {key === 'laundry' && '👕'}
                    {key === 'gym' && '💪'}
                    {key === 'ac' && '❄️'}
                    {key === 'heating' && '🔥'}
                  </div>
                  <span className='text-xs font-medium truncate'>{amenity.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterComponent
