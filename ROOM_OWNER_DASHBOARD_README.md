# Room Owner Dashboard 🏠📊

A streamlined dashboard for room owners to post new rooms, manage booking requests, and handle payments on the StudentNest platform.

## 🌟 Overview

The Room Owner Dashboard is a focused interface for property owners to manage their essential rental business operations: posting room listings, reviewing booking requests, and processing payments.

## 🎯 Key Features

### 🏠 Room Posting
- **Create New Listings**: Post new room listings with photos and details
- **Room Information**: Add room type, size, amenities, and location
- **Pricing Setup**: Set rental rates and security deposits
- **Photo Upload**: Upload multiple room images
- **Availability Settings**: Set room availability dates

### 📋 Booking Request Management
- **View Requests**: See all incoming booking requests
- **Request Details**: View student profiles and booking details
- **Approve/Decline**: Accept or reject booking requests
- **Request Status**: Track pending, approved, and declined requests
- **Communication**: Message students about their requests

### 💳 Payment System
- **Payment Processing**: Secure payment collection from students
- **Payment History**: Track all received payments
- **Payment Status**: Monitor pending and completed payments
- **Refund Management**: Process refunds when needed
- **Payment Analytics**: View revenue and payment trends

## 🏗️ Technical Architecture

### Frontend Stack
- **React 19**: Latest React version
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API communication

### Component Structure
```
src/
├── pages/
│   └── dashboard/
│       ├── Dashboard.jsx              # Main dashboard overview
│       ├── PostRoom.jsx               # Create new room listing
│       ├── BookingRequests.jsx        # Manage booking requests
│       └── Payments.jsx               # Payment management
├── components/
│   └── dashboard/
│       ├── RoomForm.jsx               # Room posting form
│       ├── RequestCard.jsx            # Booking request cards
│       ├── PaymentCard.jsx            # Payment status cards
│       └── ImageUpload.jsx            # Image upload component
├── hooks/
│   ├── useRoomData.js                 # Room data management
│   ├── useBookingRequests.js          # Booking request operations
│   └── usePayments.js                 # Payment data operations
└── services/
    ├── roomAPI.js                     # Room-related API calls
    ├── bookingAPI.js                  # Booking request API calls
    └── paymentAPI.js                  # Payment processing API calls
```

## 📊 API Endpoints

### Room Management
```javascript
// Room operations
POST   /api/rooms                      # Create new room listing
GET    /api/rooms/owner/:ownerId       # Get owner's rooms
PUT    /api/rooms/:id                  # Update room details
POST   /api/rooms/:id/images           # Upload room images
```

### Booking Requests
```javascript
// Booking request operations
GET    /api/bookings/requests/:ownerId # Get booking requests
PUT    /api/bookings/:id/approve       # Approve booking request
PUT    /api/bookings/:id/decline       # Decline booking request
POST   /api/bookings/:id/message       # Send message to student
```

### Payment Processing
```javascript
// Payment operations
GET    /api/payments/owner/:ownerId    # Get payment history
POST   /api/payments/process           # Process payment
POST   /api/payments/refund/:id        # Process refund
GET    /api/payments/analytics         # Payment analytics
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd studentnest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the dashboard**
   - Open http://localhost:5173
   - Navigate to /dashboard

### Environment Variables
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# Payment Gateway
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_RAZORPAY_KEY_ID=rzp_test_...
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-blue: #3B82F6;      /* Dashboard accent */
--primary-green: #10B981;     /* Success states */
--primary-red: #EF4444;       /* Error states */
--primary-yellow: #F59E0B;    /* Pending states */

/* Backgrounds */
--dashboard-bg: #F8FAFC;      /* Main background */
--card-bg: #FFFFFF;           /* Card backgrounds */
```

## 🔐 Authentication & Security

- **JWT Token System**: Secure authentication
- **Role-Based Access**: Room owner permissions
- **Payment Security**: PCI compliant payment processing
- **Data Encryption**: Secure data handling

## 📱 Mobile Responsive

- Mobile-first design
- Touch-friendly interface
- Optimized for all device sizes

## 🚀 Deployment

```bash
# Production build
npm run build

# Preview build
npm run preview
```

---

**Built for StudentNest Room Owners** 🏠

Simple. Secure. Efficient.
--border-color: #E5E7EB;      /* Borders and dividers */
```

### Typography
- **Primary Font**: Inter (clean, professional)
- **Headings**: Bold weights (600-700) for hierarchy
- **Body Text**: Regular weight (400) for readability
- **Accent Text**: Medium weight (500) for emphasis

### Component Spacing
- **Container Padding**: 24px (desktop), 16px (mobile)
- **Card Spacing**: 16px internal padding
- **Element Margins**: 8px, 16px, 24px, 32px scale
- **Grid Gaps**: 16px (mobile), 24px (tablet), 32px (desktop)

## 🔐 Authentication & Security

### User Authentication
- **JWT Token System**: Secure token-based authentication
- **Role-Based Access**: Room owner specific permissions
- **Multi-Factor Authentication**: Optional 2FA for enhanced security
- **Session Management**: Automatic logout and session refresh

### Data Security
- **Input Validation**: Client and server-side validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content sanitization
- **CSRF Protection**: Token-based CSRF prevention
- **Data Encryption**: Sensitive data encryption at rest

## 📊 API Endpoints

### Property Management
```javascript
// Property CRUD operations
GET    /api/dashboard/properties           # Get all properties
POST   /api/dashboard/properties           # Create new property
GET    /api/dashboard/properties/:id       # Get property details
PUT    /api/dashboard/properties/:id       # Update property
DELETE /api/dashboard/properties/:id       # Delete property

// Property media
POST   /api/dashboard/properties/:id/images    # Upload property images
DELETE /api/dashboard/properties/:id/images/:imageId  # Delete image
```

### Booking Management
```javascript
// Booking operations
GET    /api/dashboard/bookings             # Get all bookings
PUT    /api/dashboard/bookings/:id/approve # Approve booking
PUT    /api/dashboard/bookings/:id/decline # Decline booking
GET    /api/dashboard/bookings/calendar    # Get calendar data
POST   /api/dashboard/bookings/:id/cancel  # Cancel booking
```

### Financial Management
```javascript
// Financial data
GET    /api/dashboard/analytics/revenue    # Revenue analytics
GET    /api/dashboard/analytics/expenses   # Expense tracking
GET    /api/dashboard/reports/financial    # Financial reports
POST   /api/dashboard/invoices             # Generate invoice
GET    /api/dashboard/payments             # Payment history
```

### Tenant Management
```javascript
// Tenant operations
GET    /api/dashboard/tenants              # Get all tenants
GET    /api/dashboard/tenants/:id          # Get tenant details
POST   /api/dashboard/tenants/:id/message  # Send message to tenant
GET    /api/dashboard/maintenance/requests # Maintenance requests
PUT    /api/dashboard/maintenance/:id      # Update maintenance status
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd studentnest
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Configure environment variables
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the dashboard**
   - Open http://localhost:5173
   - Navigate to /dashboard (after authentication)

### Environment Variables
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WEBSOCKET_URL=ws://localhost:3000

# Authentication
VITE_JWT_SECRET=your-jwt-secret-key

# File Upload
VITE_MAX_FILE_SIZE=10MB
VITE_ALLOWED_EXTENSIONS=jpg,jpeg,png,pdf,doc,docx

# Payment Gateway
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_RAZORPAY_KEY_ID=rzp_test_...

# Map Integration
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

## 📱 Mobile Optimization

### Responsive Breakpoints
```css
/* Mobile First Approach */
sm: '640px'   /* Small devices */
md: '768px'   /* Medium devices (tablets) */
lg: '1024px'  /* Large devices (desktops) */
xl: '1280px'  /* Extra large devices */
2xl: '1536px' /* Ultra wide screens */
```

### Mobile Features
- Touch-friendly navigation
- Swipe gestures for cards and modals
- Mobile-optimized forms
- Progressive Web App (PWA) support
- Offline functionality
- Push notifications

## 🔍 Testing Strategy

### Testing Tools
- **Vitest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing
- **MSW**: API mocking for tests

### Test Coverage
- Component rendering and interactions
- API integration tests
- User authentication flows
- Booking management workflows
- Financial calculation accuracy
- Mobile responsive behavior

## 📈 Performance Optimization

### Loading Performance
- Code splitting with React.lazy()
- Bundle optimization with Vite
- Image optimization and lazy loading
- Progressive loading for large datasets
- Caching strategies with React Query

### Runtime Performance
- Virtual scrolling for large lists
- Debounced search inputs
- Optimistic updates for better UX
- Memory leak prevention
- Efficient re-rendering patterns

## 🔧 Development Guidelines

### Code Standards
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Conventional Commits**: Git commit standards
- **Component Naming**: PascalCase for components
- **File Organization**: Feature-based folder structure

### Best Practices
- Component composition over inheritance
- Custom hooks for logic reuse
- Proper error boundaries
- Accessibility compliance (WCAG 2.1)
- Performance monitoring
- Security best practices

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Deployment Options
- **Vercel**: Recommended for React applications
- **Netlify**: Alternative hosting platform
- **AWS S3**: Static site hosting
- **Docker**: Containerized deployment
- **Traditional hosting**: Via build files

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch (`git checkout -b feature/dashboard-enhancement`)
3. Make changes and write tests
4. Commit changes (`git commit -m 'Add new dashboard feature'`)
5. Push to branch (`git push origin feature/dashboard-enhancement`)
6. Create Pull Request

### Code Review Process
- All changes require code review
- Automated tests must pass
- Performance impact assessment
- Security review for sensitive features
- Documentation updates required

## 🆘 Support & Troubleshooting

### Common Issues

**Dashboard not loading**
- Check authentication status
- Verify API endpoints are accessible
- Clear browser cache and storage
- Check console for JavaScript errors

**Booking calendar issues**
- Verify date format consistency
- Check timezone settings
- Ensure proper API permissions
- Validate booking data structure

**File upload problems**
- Check file size limits
- Verify file type restrictions
- Ensure proper API endpoints
- Check network connectivity

### Getting Help
- Check documentation and FAQ
- Search existing GitHub issues
- Create detailed bug reports
- Join community discussions
- Contact support team

## 📋 Roadmap

### Phase 1 (Current)
- ✅ Basic dashboard layout
- ✅ Property listing management
- ✅ Booking request handling
- 🔄 Financial analytics (in progress)

### Phase 2 (Next Quarter)
- 🔄 Advanced tenant management
- 🔄 Maintenance tracking system
- 🔄 Mobile app development
- 🔄 API integrations expansion

### Phase 3 (Future)
- 📅 AI-powered insights
- 📅 Advanced reporting tools
- 📅 Multi-language support
- 📅 White-label solutions

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- Vite team for the fast build tool
- Open source community for inspiration and support

---

**Built with ❤️ for StudentNest Room Owners**

For questions, suggestions, or support, please reach out to our development team or create an issue on GitHub.
