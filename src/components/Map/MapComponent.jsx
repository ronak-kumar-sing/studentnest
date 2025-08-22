import { useState, useRef, useEffect } from 'react'
import { MapPin, Navigation, Maximize2, Minimize2 } from 'lucide-react'
import { motion } from 'framer-motion'

const MapComponent = ({
  location,
  className = '',
  height = 'h-96',
  showControls = true,
  markersData = [],
  onLocationClick
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const mapRef = useRef(null)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const getDirections = () => {
    if (location?.coordinates) {
      const { lat, lng } = location.coordinates
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      window.open(url, '_blank')
    }
  }

  const MapSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-300 w-full h-full rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-8 h-8 text-gray-500 mx-auto mb-2 animate-bounce" />
          <p className="text-gray-500 text-sm">Loading map...</p>
        </div>
      </div>
    </div>
  )

  const MapContent = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Map Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Central Location Marker */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          {/* Pulse Animation */}
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30" />
        </motion.div>
      </div>

      {/* Additional Markers for Nearby Places */}
      {markersData.map((marker, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 + index * 0.1 }}
          className="absolute"
          style={{
            left: `${30 + (index * 15)}%`,
            top: `${25 + (index * 10)}%`
          }}
          onClick={() => onLocationClick?.(marker)}
        >
          <div className="w-4 h-4 bg-blue-500 rounded-full cursor-pointer hover:scale-110 transition-transform">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 whitespace-nowrap">
              {marker.name}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Map Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={toggleFullscreen}
            className="bg-white shadow-md p-2 rounded-lg hover:bg-gray-50 transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={getDirections}
            className="bg-blue-600 text-white shadow-md p-2 rounded-lg hover:bg-blue-700 transition-colors"
            title="Get directions"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Location Info Overlay */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md max-w-xs">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-4 h-4 text-red-500" />
          <span className="font-medium text-sm">Property Location</span>
        </div>
        <p className="text-xs text-gray-600">{location?.fullAddress || location?.address}</p>
      </div>
    </div>
  )

  return (
    <>
      <div
        ref={mapRef}
        className={`relative ${height} ${className} ${isLoading ? '' : 'cursor-move'} rounded-lg overflow-hidden`}
      >
        {isLoading ? <MapSkeleton /> : <MapContent />}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-6xl h-5/6 bg-white rounded-lg overflow-hidden"
          >
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 bg-white shadow-md p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
            <div className="w-full h-full">
              <MapContent />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default MapComponent
