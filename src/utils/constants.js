// Comprehensive amenities list for StudentNest
import {
  Wifi,
  Car,
  Shield,
  ChefHat,
  Home,
  Snowflake,
  Utensils,
  Bath,
  Tv,
  Gamepad2,
  BookOpen,
  Lightbulb,
  Volume2,
  Users,
  Camera,
  KeyRound,
  AlertTriangle,
  UserCheck,
  Droplets,
  Zap,
  Thermometer,
  Recycle,
  FlameKindling,
  Dumbbell,
  Waves,
  Coffee,
  Briefcase,
  Bike,
  Bus,
  Bed,
  Armchair,
  Wind,
  UtensilsCrossed,
  ShowerHead,
  Monitor,
  Building,
  MapPin
} from 'lucide-react'

// Comprehensive amenities categorization
export const AMENITIES_CATEGORIES = {
  FURNISHED: {
    name: '🛏️ Fully Furnished Rooms',
    items: {
      'furnished-bed': { name: 'Bed', icon: Bed, description: 'Comfortable bed with mattress' },
      'study-table': { name: 'Study Table', icon: Monitor, description: 'Dedicated study table' },
      'chair': { name: 'Chair', icon: Armchair, description: 'Study chair' },
      'wardrobe': { name: 'Wardrobe', icon: Home, description: 'Storage wardrobe' }
    }
  },
  CLIMATE: {
    name: '❄️ Air Conditioning / Heating',
    items: {
      'ac': { name: 'Air Conditioning', icon: Snowflake, description: 'Air conditioning system' },
      'heating': { name: 'Heating', icon: Thermometer, description: 'Room heating system' },
      'fan': { name: 'Ceiling Fan', icon: Wind, description: 'Ceiling fan for ventilation' }
    }
  },
  FOOD_SERVICES: {
    name: '🍽️ Mess / Meal Services',
    items: {
      'mess': { name: 'Mess Facility', icon: UtensilsCrossed, description: 'In-house mess service' },
      'meal-plan': { name: 'Meal Plan', icon: Utensils, description: 'Optional meal plan available' },
      'kitchenette': { name: 'Private Kitchenette', icon: ChefHat, description: 'Personal cooking space' },
      'kitchen': { name: 'Shared Kitchen', icon: ChefHat, description: 'Common kitchen access' }
    }
  },
  BATHROOM: {
    name: '🛁 Bathroom Facilities',
    items: {
      'attached-bathroom': { name: 'Attached Bathroom', icon: Bath, description: 'Private attached bathroom' },
      'shared-bathroom': { name: 'Shared Bathroom', icon: Bath, description: 'Clean shared bathroom' },
      'geyser': { name: 'Geyser/Hot Water', icon: ShowerHead, description: 'Hot water facility' }
    }
  },
  COMMON_AREAS: {
    name: '📺 Common Areas',
    items: {
      'tv-lounge': { name: 'TV Lounge', icon: Tv, description: 'Common area with TV' },
      'recreation': { name: 'Recreation Area', icon: Gamepad2, description: 'Games and entertainment' },
      'common-area': { name: 'Common Area', icon: Users, description: 'Shared social space' }
    }
  },
  STUDENT_AMENITIES: {
    name: '🧑‍🎓 Student-Friendly Amenities',
    items: {
      'study-desk': { name: 'Study Desk & Chair', icon: BookOpen, description: 'Dedicated study furniture' },
      'study-lighting': { name: 'Study Lighting', icon: Lightbulb, description: 'Adequate study lighting' },
      'quiet-zones': { name: 'Quiet Study Zones', icon: Volume2, description: 'Designated quiet areas' },
      'community-events': { name: 'Community Events', icon: Users, description: 'Networking and social events' }
    }
  },
  SAFETY_SECURITY: {
    name: '🛡️ Safety & Security',
    items: {
      'cctv': { name: 'CCTV Surveillance', icon: Camera, description: '24/7 CCTV monitoring' },
      'biometric': { name: 'Biometric Access', icon: KeyRound, description: 'Secure biometric entry' },
      'smart-lock': { name: 'Smart Lock', icon: KeyRound, description: 'Digital lock system' },
      'emergency-alarm': { name: 'Emergency Alarm', icon: AlertTriangle, description: 'Emergency alert system' },
      'security-staff': { name: 'Security Staff', icon: UserCheck, description: 'On-site security personnel' },
      'security': { name: '24/7 Security', icon: Shield, description: 'Round-the-clock security' }
    }
  },
  UTILITIES: {
    name: '🌍 Lifestyle & Utilities',
    items: {
      'water-24x7': { name: '24/7 Water Supply', icon: Droplets, description: 'Continuous water supply' },
      'power-backup': { name: 'Power Backup', icon: Zap, description: 'Generator backup power' },
      'waste-management': { name: 'Waste Management', icon: Recycle, description: 'Proper waste disposal' },
      'fire-safety': { name: 'Fire Safety', icon: FlameKindling, description: 'Fire safety equipment' },
      'wifi': { name: 'High-Speed Wi-Fi', icon: Wifi, description: 'High-speed internet' }
    }
  },
  PREMIUM: {
    name: '🚀 Premium Add-ons',
    items: {
      'gym': { name: 'Gym Access', icon: Dumbbell, description: 'Fitness center access' },
      'swimming-pool': { name: 'Swimming Pool', icon: Waves, description: 'Swimming pool facility' },
      'cafeteria': { name: 'Cafeteria', icon: Coffee, description: 'On-site cafeteria' },
      'coffee-machine': { name: 'Coffee Machine', icon: Coffee, description: 'Coffee/tea facility' },
      'coworking': { name: 'Co-working Space', icon: Briefcase, description: 'Professional work areas' },
      'bike-parking': { name: 'Bicycle Parking', icon: Bike, description: 'Secure bicycle parking' },
      'scooter-parking': { name: 'Scooter Parking', icon: Bike, description: 'Two-wheeler parking' },
      'shuttle': { name: 'Shuttle Service', icon: Bus, description: 'Transport to campus/city' },
      'parking': { name: 'Car Parking', icon: Car, description: 'Secure parking space' }
    }
  },
  SERVICES: {
    name: '🧹 Additional Services',
    items: {
      'laundry': { name: 'Laundry Service', icon: Home, description: 'Washing and cleaning' },
      'housekeeping': { name: 'Housekeeping', icon: Home, description: 'Regular cleaning service' },
      'maintenance': { name: 'Maintenance', icon: Home, description: '24/7 maintenance support' }
    }
  }
}

// Flat amenities list for easy access
export const AMENITIES_LIST = Object.values(AMENITIES_CATEGORIES).reduce((acc, category) => {
  return { ...acc, ...category.items }
}, {})

// Get all amenities as array
export const getAllAmenities = () => {
  return Object.entries(AMENITIES_LIST).map(([key, value]) => ({
    id: key,
    ...value
  }))
}

// Get amenities by category
export const getAmenitiesByCategory = () => {
  return Object.entries(AMENITIES_CATEGORIES).map(([categoryKey, category]) => ({
    key: categoryKey,
    name: category.name,
    items: Object.entries(category.items).map(([key, value]) => ({
      id: key,
      ...value
    }))
  }))
}

// Legacy compatibility - basic amenities for existing code
export const AMENITIES = {
  wifi: AMENITIES_LIST['wifi'],
  parking: AMENITIES_LIST['parking'],
  security: AMENITIES_LIST['security'],
  kitchen: AMENITIES_LIST['kitchen'],
  laundry: AMENITIES_LIST['laundry'],
  gym: AMENITIES_LIST['gym'],
  ac: AMENITIES_LIST['ac']
}

// Room types
export const ROOM_TYPES = {
  single: { name: "Single Room", icon: "🛏️", description: "Private single occupancy" },
  shared: { name: "Shared Room", icon: "👥", description: "Shared with roommate" },
  pg: { name: "PG Room", icon: "🏠", description: "Paying guest accommodation" },
  hostel: { name: "Hostel Room", icon: "🏢", description: "Hostel accommodation" },
  apartment: { name: "Apartment", icon: "🏠", description: "Full apartment" },
  studio: { name: "Studio", icon: "🎯", description: "Studio apartment" }
}

// Cities
export const CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow"
]

// Price ranges for filtering
export const PRICE_RANGES = [
  { min: 0, max: 5000, label: "Under ₹5,000" },
  { min: 5000, max: 10000, label: "₹5,000 - ₹10,000" },
  { min: 10000, max: 15000, label: "₹10,000 - ₹15,000" },
  { min: 15000, max: 20000, label: "₹15,000 - ₹20,000" },
  { min: 20000, max: Infinity, label: "Above ₹20,000" }
]