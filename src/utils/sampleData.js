// Sample room data based on the RoomCard and RoomDetailsPage documentation structure
export const SAMPLE_ROOMS = [
  {
    id: "room-001",
    title: "Cozy Single Room Near DU",
    description: "A comfortable single occupancy room perfect for students, located in a safe and well-connected area near Delhi University.",
    price: 8500,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&w=800&q=80"
    ],
    roomType: "single",
    accommodationType: "room", // "room" or "pg"
    location: {
      address: "North Campus, Delhi",
      city: "Delhi",
      coordinates: { lat: 28.6139, lng: 77.2090 },
      nearbyUniversities: [
        { name: "Delhi University", distance: 2.5, commute: 15 }
      ]
    },
    amenities: [
      "wifi", "parking", "security", "kitchen", "furnished-bed", "study-table",
      "chair", "wardrobe", "ac", "attached-bathroom", "geyser", "study-desk",
      "study-lighting", "cctv", "water-24x7", "power-backup", "laundry"
    ],
    rating: 4.2,
    totalReviews: 18,
    availability: {
      isAvailable: true,
      availableFrom: "2025-09-01"
    },
    owner: {
      id: "owner_001",
      name: "Rajesh Kumar",
      verified: true,
      rating: 4.5,
      email: "rajesh.kumar@gmail.com",
      phone: "+91 98765 43210",
      whatsapp: "+91 98765 43210",
      responseRate: 92
    },
    features: {
      area: 150,
      furnished: true,
      floor: 2,
      totalFloors: 4
    }
  },
  {
    id: "room-002",
    title: "Premium Shared Room with AC",
    description: "Well-furnished shared room with modern amenities, perfect for students looking for a comfortable stay.",
    price: 6500,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=800&q=80"
    ],
    roomType: "shared",
    accommodationType: "room", // "room" or "pg"
    location: {
      address: "South Campus Area, Delhi",
      city: "Delhi",
      coordinates: { lat: 28.5494, lng: 77.1734 },
      nearbyUniversities: [
        { name: "Delhi University South Campus", distance: 1.2, commute: 8 }
      ]
    },
    amenities: [
      "wifi", "security", "kitchen", "furnished-bed", "study-table", "chair",
      "wardrobe", "ac", "shared-bathroom", "geyser", "tv-lounge", "quiet-zones",
      "cctv", "biometric", "water-24x7", "fire-safety", "mess", "common-area"
    ],
    rating: 4.7,
    totalReviews: 25,
    availability: {
      isAvailable: true,
      availableFrom: "2025-08-25"
    },
    owner: {
      id: "owner_002",
      name: "Priya Sharma",
      verified: true,
      rating: 4.8,
      email: "priya.sharma@gmail.com",
      phone: "+91 98234 56789",
      whatsapp: "+91 98234 56789",
      responseRate: 95
    },
    features: {
      area: 200,
      furnished: true,
      floor: 1,
      totalFloors: 3
    }
  },
  {
    id: "room-003",
    title: "Studio Apartment Near Metro",
    description: "Independent studio apartment with kitchen, perfect for students who prefer privacy and independence.",
    price: 12500,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
    ],
    roomType: "studio",
    accommodationType: "room", // "room" or "pg"
    location: {
      address: "Lajpat Nagar, Delhi",
      city: "Delhi",
      coordinates: { lat: 28.5677, lng: 77.2436 },
      nearbyUniversities: [
        { name: "Jamia Millia Islamia", distance: 3.8, commute: 22 }
      ]
    },
    amenities: [
      "wifi", "parking", "kitchenette", "furnished-bed", "study-table", "chair",
      "wardrobe", "ac", "attached-bathroom", "geyser", "gym", "swimming-pool",
      "cafeteria", "coworking", "bike-parking", "security-staff", "cctv",
      "smart-lock", "power-backup", "water-24x7"
    ],
    rating: 4.5,
    totalReviews: 12,
    availability: {
      isAvailable: false,
      availableFrom: "2025-09-15"
    },
    owner: {
      id: "owner_003",
      name: "Amit Singh",
      verified: false,
      rating: 4.2,
      email: "amit.singh@gmail.com",
      phone: "+91 99876 54321",
      whatsapp: "+91 99876 54321",
      responseRate: 88
    },
    features: {
      area: 300,
      furnished: true,
      floor: 3,
      totalFloors: 5
    }
  },
  {
    id: "room-004",
    title: "Budget-Friendly PG Room",
    description: "Affordable room in a well-maintained PG with all basic amenities and good food service.",
    price: 4500,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    roomType: "single",
    accommodationType: "pg", // "room" or "pg"
    location: {
      address: "Mukherjee Nagar, Delhi",
      city: "Delhi",
      coordinates: { lat: 28.7041, lng: 77.2025 },
      nearbyUniversities: [
        { name: "Delhi University", distance: 4.2, commute: 25 }
      ]
    },
    amenities: [
      "wifi", "security", "furnished-bed", "chair", "shared-bathroom", "mess",
      "meal-plan", "tv-lounge", "study-lighting", "cctv", "water-24x7",
      "laundry", "housekeeping"
    ],
    rating: 3.8,
    totalReviews: 31,
    availability: {
      isAvailable: true,
      availableFrom: "2025-08-20"
    },
    owner: {
      id: "owner_004",
      name: "Sunita Devi",
      verified: true,
      rating: 4.1,
      email: "sunita.devi@gmail.com",
      phone: "+91 98111 22333",
      whatsapp: "+91 98111 22333",
      responseRate: 87
    },
    features: {
      area: 120,
      furnished: true,
      floor: 1,
      totalFloors: 2
    }
  },
  {
    id: "room-005",
    title: "Luxury Room with Balcony",
    description: "Spacious room with private balcony, perfect for students who want comfort and a peaceful environment.",
    price: 11000,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80"
    ],
    roomType: "single",
    accommodationType: "room", // "room" or "pg"
    location: {
      address: "Greater Kailash, Delhi",
      city: "Delhi",
      coordinates: { lat: 28.5494, lng: 77.2482 },
      nearbyUniversities: [
        { name: "JNU", distance: 5.2, commute: 28 }
      ]
    },
    amenities: [
      "wifi", "parking", "security", "kitchen", "furnished-bed", "study-table",
      "chair", "wardrobe", "ac", "attached-bathroom", "geyser", "gym",
      "swimming-pool", "cafeteria", "coffee-machine", "coworking", "shuttle",
      "bike-parking", "cctv", "biometric", "emergency-alarm", "security-staff",
      "water-24x7", "power-backup", "waste-management", "fire-safety"
    ],
    rating: 4.9,
    totalReviews: 8,
    availability: {
      isAvailable: true,
      availableFrom: "2025-08-30"
    },
    owner: {
      id: "owner_005",
      name: "Dr. Meena Gupta",
      verified: true,
      rating: 4.9,
      email: "meena.gupta@gmail.com",
      phone: "+91 98555 77888",
      whatsapp: "+91 98555 77888",
      responseRate: 96
    },
    features: {
      area: 250,
      furnished: true,
      floor: 2,
      totalFloors: 3
    }
  },
  {
    id: "room-006",
    title: "Modern Hostel Room",
    description: "Clean and modern hostel room with shared facilities, ideal for students on a tight budget.",
    price: 3500,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80"
    ],
    roomType: "shared",
    accommodationType: "pg", // "room" or "pg"
    location: {
      address: "Kamla Nagar, Delhi",
      city: "Delhi",
      coordinates: { lat: 28.6815, lng: 77.2052 },
      nearbyUniversities: [
        { name: "Delhi University", distance: 1.8, commute: 12 }
      ]
    },
    amenities: [
      "wifi", "security", "furnished-bed", "chair", "shared-bathroom",
      "mess", "meal-plan", "tv-lounge", "recreation", "common-area",
      "study-lighting", "quiet-zones", "cctv", "water-24x7", "laundry"
    ],
    rating: 4.0,
    totalReviews: 42,
    availability: {
      isAvailable: true,
      availableFrom: "2025-08-22"
    },
    owner: {
      id: "owner_006",
      name: "Hostel Manager",
      verified: true,
      rating: 4.2,
      email: "hostel.manager@gmail.com",
      phone: "+91 98999 11222",
      whatsapp: "+91 98999 11222",
      responseRate: 89
    },
    features: {
      area: 100,
      furnished: true,
      floor: 2,
      totalFloors: 4
    }
  },
  {
    id: "room-007",
    title: "Premium PG with Food",
    description: "Well-maintained PG accommodation with home-cooked meals, Wi-Fi, and all essential amenities for comfortable student living.",
    price: 7500,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ],
    roomType: "single",
    accommodationType: "pg", // "room" or "pg"
    location: {
      address: "Laxmi Nagar, Delhi",
      city: "Delhi",
      coordinates: { lat: 28.6345, lng: 77.2775 },
      nearbyUniversities: [
        { name: "Delhi University", distance: 2.8, commute: 18 }
      ]
    },
    amenities: [
      "wifi", "security", "furnished-bed", "study-table", "chair", "wardrobe",
      "shared-bathroom", "mess", "meal-plan", "tv-lounge", "study-lighting",
      "cctv", "water-24x7", "laundry", "housekeeping", "common-area", "fridge"
    ],
    rating: 4.3,
    totalReviews: 29,
    availability: {
      isAvailable: true,
      availableFrom: "2025-09-01"
    },
    owner: {
      id: "owner_007",
      name: "Ravi Sharma",
      verified: true,
      rating: 4.4,
      email: "ravi.sharma@gmail.com",
      phone: "+91 98765 00111",
      whatsapp: "+91 98765 00111",
      responseRate: 91
    },
    features: {
      area: 130,
      furnished: true,
      floor: 1,
      totalFloors: 3,
      meals: true, // PG specific feature
      mealTimes: ["breakfast", "lunch", "dinner"], // PG specific
      pgRules: {
        guestPolicy: "Guests allowed until 8 PM",
        quietHours: "10 PM - 6 AM",
        mealTimings: {
          breakfast: "7:00 AM - 9:00 AM",
          lunch: "12:00 PM - 2:00 PM",
          dinner: "7:00 PM - 9:00 PM"
        }
      }
    }
  }
];

// Room types
export const ROOM_TYPES = {
  single: "Single Room",
  shared: "Shared Room",
  studio: "Studio Apartment"
};

// Accommodation types
export const ACCOMMODATION_TYPES = {
  room: "Room",
  pg: "PG"
};

// Combined display types
export const DISPLAY_TYPES = {
  "room-single": "Single Room",
  "room-shared": "Shared Room",
  "room-studio": "Studio Room",
  "pg-single": "PG Single",
  "pg-shared": "PG Shared"
};

// Common amenities
export const AMENITIES = {
  wifi: { name: "Wi-Fi", icon: "wifi", category: "connectivity" },
  parking: { name: "Parking", icon: "parking", category: "facility" },
  security: { name: "Security", icon: "security", category: "safety" },
  kitchen: { name: "Kitchen", icon: "kitchen", category: "facility" },
  laundry: { name: "Laundry", icon: "laundry", category: "facility" },
  gym: { name: "Gym", icon: "gym", category: "facility" },
  ac: { name: "Air Conditioning", icon: "ac", category: "comfort" },
  heating: { name: "Heating", icon: "heating", category: "comfort" }
};
