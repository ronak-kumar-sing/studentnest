import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Star, Bookmark, Trash2, Calendar, Phone } from 'lucide-react'
import { useSavedRooms } from '../contexts/SavedRoomsContext'
import { formatCurrency, getTimeAgo } from '../utils/roomHelpers'

const SavedRoomsPage = () => {
  const { savedRooms, unsaveRoom, clearAllSavedRooms } = useSavedRooms()

  if (savedRooms.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-12 h-12 text-zinc-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">No Saved Rooms</h1>
            <p className="text-zinc-400 mb-8">
              Start exploring and save rooms you're interested in to view them here.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Rooms
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Saved Rooms</h1>
            <p className="text-zinc-400">
              {savedRooms.length} room{savedRooms.length !== 1 ? 's' : ''} saved
            </p>
          </div>

          {savedRooms.length > 0 && (
            <button
              onClick={clearAllSavedRooms}
              className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-400 rounded-lg hover:bg-red-600/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Saved Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all group"
            >
              {/* Room Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay Actions */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => unsaveRoom(room.id)}
                    className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Room Type Badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {room.type}
                  </span>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {room.title}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{room.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-zinc-400 text-sm mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{room.location.area}, {room.location.city}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xl font-bold text-white">
                      {formatCurrency(room.price)}
                    </div>
                    <div className="text-xs text-zinc-500">per month</div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-zinc-400">Saved</div>
                    <div className="text-xs text-zinc-500">
                      {getTimeAgo(room.savedAt)}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link
                    to={`/room/${room.id}`}
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/room/${room.id}/book`}
                      className="bg-zinc-800 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors"
                    >
                      Book Now
                    </Link>
                    <Link
                      to={`/room/${room.id}/visit`}
                      className="bg-zinc-800 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Calendar className="w-3 h-3" />
                      Visit
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Browsing */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-block bg-zinc-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-zinc-700 transition-colors"
          >
            Browse More Rooms
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SavedRoomsPage
