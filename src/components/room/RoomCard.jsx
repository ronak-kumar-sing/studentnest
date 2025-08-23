import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Users, ArrowRight, Eye } from 'lucide-react';
import ShinyText from '../TextAnimations/ShinyText/ShinyText';
import { AMENITIES_LIST } from '../../utils/constants';

function RoomCard({
  room,
  onFavorite,
  onCardClick,
  showDistance = false,
  compact = false,
  className = ''
}) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    onFavorite?.(room.id);
  };

  const handleCardClick = () => {
    onCardClick?.(room.id);
  };

  // Get the first amenity icons to display with enhanced styling
  const getAmenityIcons = () => {
    // Color themes for different amenity types
    const colorThemes = [
      { color: 'text-blue-300', bg: 'bg-blue-900/30' },
      { color: 'text-green-300', bg: 'bg-green-900/30' },
      { color: 'text-red-300', bg: 'bg-red-900/30' },
      { color: 'text-orange-300', bg: 'bg-orange-900/30' },
      { color: 'text-purple-300', bg: 'bg-purple-900/30' },
      { color: 'text-yellow-300', bg: 'bg-yellow-900/30' },
    ];

    return room.amenities?.slice(0, 4).map((amenityId, index) => {
      const amenity = AMENITIES_LIST[amenityId];
      const theme = colorThemes[index % colorThemes.length];

      if (!amenity) {
        return (
          <div
            key={amenityId}
            className="p-2 rounded-lg bg-gray-800/50 text-gray-300"
            title={amenityId}
          >
            •
          </div>
        );
      }

      const IconComponent = amenity.icon;

      return (
        <div
          key={amenityId}
          className={`p-2 rounded-lg ${theme.bg} ${theme.color} transition-all duration-200 hover:scale-110`}
          title={amenity.name}
        >
          <IconComponent size={16} />
        </div>
      );
    });
  };

  const cardContent = compact ? (
    // Modern Compact Card Design
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-blue-500/20 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1">

        <Link to={`/room/${room.id}`} className="block">
          <div className="flex gap-4 p-4">
            {/* Image Section */}
            <div className="relative w-24 h-20 flex-shrink-0">
              <img
                src={room.images?.[0] || '/api/placeholder/96/80'}
                alt={room.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl"></div>
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-base truncate text-white group-hover:text-blue-400 transition-colors">
                  {room.title}
                </h3>
                <div className="text-right ml-2">
                  <span className="text-lg font-bold">
                    <ShinyText
                      text={`₹${room.price.toLocaleString()}`}
                      className="text-white"
                    />
                  </span>
                  <span className="text-xs text-gray-400 block">/month</span>
                </div>
              </div>

              <div className="flex items-center text-gray-300 text-sm mb-2">
                <MapPin size={14} className="mr-1 text-gray-400" />
                <span className="truncate">{room.location.address}</span>
              </div>

              <div className="flex items-center justify-between">
                {room.rating && (
                  <div className="flex items-center">
                    <div className="flex items-center bg-amber-900/30 px-2 py-1 rounded-full">
                      <Star size={12} className="text-amber-400 fill-current mr-1" />
                      <span className="text-amber-300 text-xs font-medium">{room.rating}</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  {getAmenityIcons().slice(0, 3)}
                  {room.amenities?.length > 3 && (
                    <span className="text-xs text-gray-400 ml-1">+{room.amenities.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-800/90 hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
        >
          <Heart
            size={14}
            className={`${isFavorited ? 'fill-red-400 text-red-400' : 'text-gray-400 hover:text-red-400'} transition-colors duration-200`}
          />
        </button>
      </div>
    </div>
  ) : (
    // Modern Full Card Design
    <div className={`group cursor-pointer ${className}`}>
      <div className="relative overflow-hidden rounded-3xl bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 border border-gray-700 hover:border-gray-600 transition-all duration-500 transform hover:-translate-y-2">

        {/* Image Section with Overlay */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={room.images?.[0] || '/api/placeholder/400/256'}
            alt={room.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-3 rounded-full bg-gray-800/90 hover:bg-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 z-20 transform hover:scale-110"
          >
            <Heart
              size={18}
              className={`${isFavorited ? 'fill-red-400 text-red-400' : 'text-gray-300 hover:text-red-400'} transition-colors duration-200`}
            />
          </button>

          {/* Price Badge */}
          <div className="absolute top-4 left-4 bg-gray-800/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-xl border border-gray-700">
            <div className="text-xl font-bold">
              <ShinyText
                text={`₹${room.price.toLocaleString()}`}
                className="text-white"
              />
            </div>
            <div className="text-sm text-gray-300 -mt-1">per month</div>
          </div>

          {/* View Details Floating Button */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Link
              to={`/room/${room.id}`}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 text-sm font-medium"
            >
              <Eye size={16} />
              Quick View
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <Link to={`/room/${room.id}`} className="block">
            {/* Title and Location */}
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2 line-clamp-2 text-white group-hover:text-blue-400 transition-colors">
                {room.title}
              </h3>
              <div className="flex items-center text-gray-300">
                <MapPin size={16} className="mr-2 text-gray-400" />
                <span className="text-sm">{room.location.address}</span>
              </div>
            </div>

            {/* Rating and Room Type */}
            <div className="flex items-center justify-between mb-4">
              {room.rating && (
                <div className="flex items-center bg-amber-900/30 px-3 py-2 rounded-xl">
                  <Star size={16} className="text-amber-400 fill-current mr-2" />
                  <span className="text-amber-300 font-semibold mr-1">{room.rating}</span>
                  <span className="text-amber-400 text-sm">({room.totalReviews} reviews)</span>
                </div>
              )}
              <div className="flex items-center bg-gray-700/50 px-3 py-2 rounded-xl">
                <Users size={16} className="text-gray-400 mr-2" />
                <span className="text-gray-200 text-sm font-medium capitalize">{room.roomType}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                {getAmenityIcons()}
                {room.amenities?.length > 4 && (
                  <div className="bg-gray-700/50 text-gray-200 px-3 py-2 rounded-lg text-sm font-medium">
                    +{room.amenities.length - 4} more
                  </div>
                )}
              </div>
            </div>
          </Link>

          {/* Action Button */}
          <Link
            to={`/room/${room.id}`}
            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 group/button"
          >
            <span>View Full Details</span>
            <ArrowRight size={18} className="transition-transform duration-200 group-hover/button:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );

  return cardContent;
}

export default RoomCard;
