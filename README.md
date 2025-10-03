# BIHHS - Blockchain Integrated Herd Health System

## Viva Quick Reference

Storage (browser cache)
- User Remember Me: localStorage key bihhsUserCredentials → JSON { emailPhone, password }
- Admin Remember Me: localStorage key bihhsAdminCredentials → JSON { username, password, securityCode }
- Admin session flags: adminLoggedIn, adminUsername, adminLoginTime
- Maintenance mode flag (simulated): adminMaintenanceMode

Key functions and locations
- assets/js/main.js
  - validatePassword (regex) and password message: lines ~91–96 and ~143–144
  - Inline validation helpers and messages: ~102–164, validateInput at ~126–151
  - handleLogin: ~178–214, handleSignup: ~231–251
- assets/js/dashboard.js
  - Health Trends placeholder color fix: ~95–97
  - Doughnut chart centering: assets/css/dashboard.css .chart-card canvas
- assets/js/admin-dashboard.js
  - System maintenance buttons: clearSystemCache/backupDatabase/toggleMaintenanceMode at ~878–893

Anchors fixed
- index.html now contains sections with id="about" and id="contact". Navbar links scroll correctly.

Note: This frontend stores demo data in localStorage only. There is no backend here.

### Supervisor Q&A (Viva Notes)

1) Where is the Admin Security Code set?
- File: pages/admin-login.html
- Location: function handleAdminLogin(...) where credentials are checked
- Exact check: username === 'admin' && password === 'admin123' && securityCode === 'BIHHS2025'
- This means the security code 'BIHHS2025' is defined inline in pages/admin-login.html (no separate config file).

2) Where is login/signup data saved in cache and where in the code?
- Mechanism: Browser localStorage (client-side only)
- Admin login storage (set on successful login and when "Keep me signed in" is checked):
  - Keys: adminLoggedIn, adminUsername, adminLoginTime
  - Remember-me bundle key: bihhsAdminCredentials (JSON with { username, password, securityCode })
  - Implemented in pages/admin-login.html inside handleAdminLogin(...) where localStorage.setItem(...) is called.
- User login storage (when "Remember me" is checked):
  - Key: bihhsUserCredentials (JSON with { emailPhone, password })
  - Set in assets/js/main.js inside handleLogin(...)
  - Loaded back on page load in assets/js/main.js (looks for bihhsUserCredentials and auto-fills the form).
- Sign-up/Registration pages:
  - No persistent storage is performed. The forms validate input and then redirect to dashboard.html; no data is written to localStorage or a database in this prototype.

3) Is the whole website just HTML, CSS, and JS? If no backend, where is data stored and where is the dummy dataset?
- Stack: Pure frontend (HTML, CSS, JavaScript). No backend or database is connected in this project.
- Data storage: Browser localStorage only (see keys above). Clearing site data in the browser will remove it.
- Dummy datasets used for the Admin Dashboard (users, collars, activity logs):
  - File: assets/js/admin-dashboard.js
  - Arrays defined at the top of the file: mockUsers, mockCollars, mockActivityLogs. These drive the tables and counts you see in the admin panel.

## Project Overview

BIHHS (Blockchain Integrated Herd Health System) is a comprehensive web-based platform designed for livestock monitoring and management. The system provides both user and administrative interfaces for monitoring cattle health, managing smart collars, and tracking herd activities.

## System Architecture

### Frontend Technologies
- **HTML5** - Semantic markup for web structure
- **CSS3** - Advanced styling with responsive design
- **JavaScript (ES6+)** - Interactive functionality and data management
- **Chart.js** - Data visualization (removed from overview as requested)
- **jsPDF** - PDF report generation
- **Font Awesome** - Icons and visual elements

### File Structure
```
BIHHS/
├── assets/
│   ├── css/
│   │   ├── admin.css          # Admin-specific styles
│   │   ├── auth.css           # Authentication page styles
│   │   ├── dashboard.css      # Dashboard styles
│   │   ├── responsive.css     # Mobile responsiveness
│   │   └── styles.css         # Global styles
│   └── js/
│       ├── admin-dashboard.js # Admin panel functionality
│       ├── dashboard.js       # User dashboard functionality
│       └── main.js            # Global JavaScript functions
├── pages/
│   ├── admin-dashboard.html   # Administrator control panel
│   ├── admin-login.html       # Admin authentication
│   ├── dashboard.html         # User dashboard
│   ├── login.html             # User authentication
│   ├── signup-*.html          # Registration pages
│   └── signup-selection.html  # User type selection
└── index.html                 # Landing page
```

## Core Functionalities

### 1. Authentication System

#### User Login (`login.html`)
- **Email/Phone Authentication**: Supports both email addresses and 11-digit Pakistani phone numbers (03xxxxxxxxx format)
- **Password Validation**: Minimum 6 characters with at least one letter and one number
- **Remember Me**: Saves credentials locally for convenient re-login
- **Input Validation**: Real-time validation with user-friendly error messages

#### Admin Login (`admin-login.html`)
- **Multi-Layer Security**: Username, password, and security code authentication
- **Demo Credentials**: 
  - Username: `admin`
  - Password: `admin123`
  - Security Code: `BIHHS2025`
- **Session Management**: Secure admin session with automatic logout
- **Remember Me**: Encrypted credential storage for admin convenience

#### User Registration
Two distinct registration paths:

**Farm Owner Registration** (`signup-farm-owner.html`)
- Personal details (name, email, phone)
- Farm information (farm name, location)
- Password creation with confirmation
- Validation for Pakistani phone numbers and name formats

**Cattle Company Registration** (`signup-cattle-company.html`)
- Company details (name, registration info)
- Contact person information
- Business verification fields
- Corporate account setup

### 2. User Dashboard (`dashboard.html`)

#### Overview Section
- **Quick Stats**: Total collars, active animals, health alerts
- **Recent Activities**: Latest system events and notifications
- **Health Monitoring**: Real-time health status indicators
- **Quick Actions**: Shortcuts to frequently used features

#### Collar Management
- **Device Registration**: Add new smart collars to the system
- **Status Monitoring**: Real-time collar connectivity and battery status
- **Health Data Tracking**: Temperature, heart rate, and activity monitoring
- **Location Tracking**: GPS positioning and movement patterns
- **Alert System**: Automated notifications for health anomalies

#### Health Analytics
- **Trend Analysis**: Historical health data visualization
- **Alert Management**: Configurable health thresholds
- **Veterinary Integration**: Health report generation
- **Data Export**: CSV and PDF export capabilities

### 3. Admin Dashboard (`admin-dashboard.html`)

#### System Overview
- **User Statistics**: Total registered users, active/inactive counts
- **Collar Statistics**: Active collars, maintenance alerts, error statuses
- **System Health**: Server uptime, database status, performance metrics
- **Real-Time Updates**: Live data refresh every 30 seconds

#### User Management
**Features:**
- User search and filtering (by type, status, location)
- User status management (active, blocked, inactive)
- Account actions (block, unblock, delete inactive users)
- Export user reports to PDF

**Removed Feature (as requested):**
- ~~View Users Dashboard option~~ - Removed from user actions

#### Collar Tracking System
**Enhanced Features:**
- **Activity/Movement Column**: Added movement tracking data
- Collar status monitoring (active, inactive, maintenance, error)
- Battery level indicators with visual progress bars
- Signal strength monitoring
- GPS location tracking
- Health data aggregation

**Data Fields:**
- Collar ID, Owner, Farm Location
- Status, Battery Level, Last Signal
- Health Data, **Activity/Movement** (NEW)
- Action buttons (Details, Reset for error status)

#### Login Activity Monitoring
**Simplified View (as requested):**
- User identification
- Login/logout timestamps
- Session duration
- Geographic location
- Session status

**Removed Columns (as requested):**
- ~~IP Address~~ - Removed for privacy
- ~~Device Information~~ - Removed to simplify interface

#### System Reports
**Available Reports:**
- **User Registration Report**: Comprehensive user database export
- **Collar Status Report**: Device inventory and status analysis
- **System Health Report**: Performance metrics and uptime statistics

**Removed Report (as requested):**
- ~~Activity Analytics Report~~ - Removed from available reports

#### System Settings
**Configuration Options:**
- Auto-block inactive users (configurable days)
- Collar offline threshold settings
- Battery warning thresholds
- System maintenance tools

**Removed Setting (as requested):**
- ~~Maximum failed login attempts~~ - Removed setting and functionality

#### System Maintenance
The System Maintenance section provides three core functions:

1. **Clear System Cache**
   - Clears temporary system files and cached data
   - Improves system performance
   - Recommended weekly execution

2. **Backup Database**
   - Creates complete system backup
   - Includes user data, collar information, and system logs
   - Automated scheduling available

3. **Maintenance Mode**
   - Enables system-wide maintenance mode
   - Restricts user access during updates
   - Displays maintenance notice to users

### 4. Enhanced Remember Me Functionality

#### User Login Memory
- **Credential Storage**: Email/phone and password saved in localStorage
- **Auto-Population**: Automatic form completion on page reload
- **Security**: Client-side encryption for sensitive data
- **Persistence**: Credentials saved until manually cleared

#### Admin Login Memory
- **Multi-Field Storage**: Username, password, and security code
- **Session Management**: Separate storage from user credentials
- **Auto-Clear**: Automatic cleanup on logout
- **Security**: Enhanced encryption for administrative access

### 5. Data Validation & Security

#### Input Validation
- **Email Format**: RFC-compliant email validation
- **Phone Numbers**: Pakistani mobile format (03xxxxxxxxx)
- **Password Strength**: Minimum complexity requirements
- **Name Validation**: Letters and spaces only, 25 character limit
- **Real-Time Feedback**: Instant validation messages

#### Security Features
- **Session Management**: Secure user session handling
- **Data Encryption**: Client-side sensitive data protection
- **Access Control**: Role-based permission system
- **Audit Logging**: Administrative action tracking

### 6. Responsive Design

#### Mobile Compatibility
- **Breakpoint System**: Optimized for all device sizes
- **Touch-Friendly Interface**: Large buttons and intuitive navigation
- **Performance**: Optimized loading for mobile networks
- **Accessibility**: Screen reader compatible

#### Desktop Features
- **Advanced Layouts**: Complex data tables and multi-column views
- **Keyboard Shortcuts**: Efficient keyboard navigation
- **High-Resolution Displays**: Optimized for modern monitors

## System Maintenance Features

### Automated System Tasks
- **Real-Time Updates**: Live data refresh for critical metrics
- **Battery Monitoring**: Automated collar battery level tracking
- **Health Alerts**: Automatic anomaly detection and notification
- **System Backups**: Scheduled database backups

### Administrative Tools
- **PDF Generation**: Comprehensive report generation system
- **Data Export**: Multiple format support (CSV, PDF, JSON)
- **Search & Filtering**: Advanced data filtering capabilities
- **Bulk Operations**: Mass user/collar management tools

## Next Steps for Backend/Database Integration

Based on the 50% project completion requirements and the development timeline provided:

### 1. Database Schema Design (Priority 1 - Weeks 1-2)
```sql
-- Essential Tables for 50% Target

-- Users Table
CREATE TABLE users (
    user_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('farm_owner', 'cattle_company') NOT NULL,
    status ENUM('active', 'inactive', 'blocked') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    location VARCHAR(100)
);

-- Smart Collars Table
CREATE TABLE smart_collars (
    collar_id VARCHAR(10) PRIMARY KEY,
    user_id VARCHAR(10) NOT NULL,
    status ENUM('active', 'inactive', 'maintenance', 'error') DEFAULT 'active',
    battery_level INT DEFAULT 100,
    last_signal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Health Data Table
CREATE TABLE health_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    collar_id VARCHAR(10) NOT NULL,
    temperature DECIMAL(4,2),
    heart_rate INT,
    activity_level ENUM('high', 'moderate', 'low', 'none') DEFAULT 'moderate',
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collar_id) REFERENCES smart_collars(collar_id)
);

-- Activity Logs Table
CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(10),
    action VARCHAR(100) NOT NULL,
    login_time TIMESTAMP,
    logout_time TIMESTAMP,
    session_duration INT, -- in minutes
    location VARCHAR(100),
    status ENUM('active', 'completed', 'failed') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 2. Backend API Development (Priority 1 - Weeks 3-4)

#### Essential API Endpoints for 50% Completion:

**Authentication APIs:**
```javascript
POST /api/auth/login           // User login
POST /api/auth/admin-login     // Admin login
POST /api/auth/register        // User registration
POST /api/auth/logout          // Session termination
```

**User Management APIs:**
```javascript
GET  /api/users                // Get all users (admin)
GET  /api/users/:id            // Get user details
PUT  /api/users/:id/status     // Update user status (block/unblock)
DELETE /api/users/:id          // Delete user (inactive only)
```

**Collar Management APIs:**
```javascript
GET  /api/collars              // Get all collars
GET  /api/collars/user/:userId // Get user's collars
POST /api/collars              // Register new collar
PUT  /api/collars/:id/status   // Update collar status
GET  /api/collars/:id/health   // Get collar health data
```

**Health Data APIs:**
```javascript
POST /api/health-data          // Insert health reading
GET  /api/health-data/:collarId // Get collar health history
GET  /api/health-data/alerts   // Get health alerts
```

### 3. Smart Collar Simulation (Priority 2 - Week 4)

For demonstration purposes without actual hardware:

```javascript
// Simulated IoT Data Generator
class CollarSimulator {
    generateHealthData() {
        return {
            temperature: (37.5 + Math.random() * 2).toFixed(1), // 37.5-39.5°C
            heartRate: Math.floor(60 + Math.random() * 40),     // 60-100 BPM
            activityLevel: this.getRandomActivity(),
            location: this.generateGPSCoordinates(),
            timestamp: new Date().toISOString()
        };
    }
    
    getRandomActivity() {
        const activities = ['high', 'moderate', 'low', 'none'];
        return activities[Math.floor(Math.random() * activities.length)];
    }
    
    generateGPSCoordinates() {
        // Simulate Pakistani farm coordinates
        const lat = (24.8607 + Math.random() * 10).toFixed(6); // Pakistan lat range
        const lng = (67.0011 + Math.random() * 15).toFixed(6); // Pakistan lng range
        return { latitude: lat, longitude: lng };
    }
}
```

### 4. Technology Stack Recommendations

#### Backend Framework Options:
1. **Node.js + Express** (Recommended for JavaScript consistency)
2. **Python + Flask/Django** (Good for data analytics)
3. **PHP + Laravel** (Traditional web development)

#### Database Options:
1. **PostgreSQL** (Recommended for complex queries and reliability)
2. **MySQL** (Good balance of features and performance)
3. **MongoDB** (For flexible schema requirements)

#### Real-Time Features:
1. **Socket.io** (For live updates)
2. **WebSockets** (For collar data streaming)
3. **Server-Sent Events** (For dashboard updates)

### 5. Development Workflow for 50% Target

#### Week 1-2: Foundation
- Set up development environment
- Implement basic authentication system
- Create core database schema
- Develop user registration/login APIs

#### Week 3-4: Core Features
- Implement collar management system
- Develop health data simulation
- Create admin panel backend
- Basic dashboard functionality

#### Week 5-6: Integration & Testing
- Frontend-backend integration
- Data visualization implementation
- System testing and debugging
- Performance optimization

### 6. Demonstration Strategy

For the 50% project demonstration:

1. **Working User Registration/Login System**
2. **Functional Admin Panel** with user management
3. **Simulated Collar Data** showing health metrics
4. **Basic Dashboard** with real-time updates
5. **PDF Report Generation** working
6. **Database Integration** with mock IoT data

## Demo Credentials

### Admin Login
- **Username**: admin
- **Password**: admin123  
- **Security Code**: BIHHS2025

### User Login (Demo)
- **Email**: demo@farm.com
- **Password**: demo123

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Navigate through the authentication system
4. Explore both user and admin interfaces
5. Test the remember me functionality by refreshing pages

## Future Enhancements

1. **Blockchain Integration**: Implement actual blockchain for data integrity
2. **Mobile App**: React Native or Flutter mobile application
3. **IoT Hardware**: Integration with actual smart collar devices
4. **AI Analytics**: Machine learning for health prediction
5. **GPS Mapping**: Interactive maps for location tracking
6. **Multi-language Support**: Urdu language interface
7. **Advanced Analytics**: Predictive health modeling
8. **API Documentation**: Comprehensive API documentation with Swagger

---

**Note**: This system is currently a frontend demonstration with simulated data. For production deployment, implement the backend infrastructure following the guidelines above.

# BIHHS - Blockchain Integrated Herd Health System

## Project Overview
This project is a comprehensive web-based prototype for the BIHHS (Blockchain Integrated Herd Health System) designed to revolutionize cattle health monitoring through advanced IoT technology, blockchain integration, and real-time analytics. This system now includes both user dashboards for farm owners and cattle companies, as well as a complete administrative panel for system management.

## 🚀 New Features - Admin Panel

### Admin Login Credentials
- **Username:** `admin`
- **Password:** `admin123`
- **Security Code:** `BIHHS2025`

### Admin Panel Features
- **User Management:** View, block/unblock, and delete user accounts
- **Collar Tracking:** Monitor all active collars, battery levels, and health data
- **Login Activity Tracking:** Complete user session logs with timestamps and device information
- **Registration Analytics:** Track when users joined and their account lifecycle
- **System Statistics:** Real-time dashboard with user counts, active collars, and system health
- **PDF Export System:** Generate comprehensive reports for users, activities, collars, and system health
- **Real-time Updates:** Live statistics and collar monitoring
- **Advanced Filtering:** Search and filter capabilities across all data tables

### Key Features Implemented:
- **User Authentication System** - Separate registration/login for farm owners and cattle companies
- **Interactive Dashboard** - Real-time cattle health monitoring interface
- **Multi-Herd Management** - Support for multiple farms and large-scale operations
- **Health Analytics** - Advanced charts and data visualization
- **Alert System** - Real-time notifications for health anomalies
- **Certificate Management** - Health certificates and report generation
- **Responsive Design** - Fully mobile and tablet compatible
- **Mock IoT Simulation** - Simulated sensor data for demonstration

## Technology Stack
- **Frontend**: HTML5, CSS3 (with modern CSS features), JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design, CSS Grid, Flexbox
- **Charts**: Chart.js for data visualization
- **Icons**: Font Awesome 6.0
- **Fonts**: Inter font family from Google Fonts
- **Background**: Pexels cattle image as specified

## Project Structure
```
BIHHS 3/
├── index.html                    # Homepage with hero section and features
├── README.md                     # Project documentation
├── CHANGELOG.md                  # Version history and updates
├── assets/
│   ├── css/
│   │   ├── styles.css           # Main website styles
│   │   ├── responsive.css       # Mobile and tablet responsive styles
│   │   ├── auth.css             # Authentication pages styles
│   │   ├── dashboard.css        # Dashboard interface styles
│   │   └── admin.css            # Admin panel specific styles
│   ├── js/
│   │   ├── main.js              # Main website functionality
│   │   ├── dashboard.js         # Dashboard interactive features
│   │   └── admin-dashboard.js   # Admin panel functionality
│   └── images/                  # Image assets directory
└── pages/
    ├── signup-selection.html     # User type selection page
    ├── signup-farm-owner.html    # Farm owner registration
    ├── signup-cattle-company.html# Company registration
    ├── login.html               # User login page
    ├── admin-login.html         # Admin login page
    ├── dashboard.html           # Main application dashboard
    └── admin-dashboard.html     # Admin management panel
```

## Features Implementation

### 1. User Authentication System
- **Separate Registration Paths**: Farm owners and cattle companies have distinct registration forms
- **Form Validation**: Client-side validation for passwords, email format, and required fields
- **User Type Detection**: Different fields and features based on user type
- **Secure Forms**: Password confirmation and strength requirements

### 2. Dashboard Interface (Based on Provided Mockups)
- **Multi-Herd Overview**: Statistics cards showing total cattle, active alerts, farm count, and health scores
- **Farm Selector**: Toggle between different farms (All Farms, Karachi, Lahore, Islamabad)
- **Cattle Cards**: Individual cattle monitoring with real-time data:
  - Temperature monitoring
  - Heart rate tracking
  - Activity levels
  - Health status indicators
- **Alert System**: Color-coded alerts for health anomalies
- **Filter Options**: Filter cattle by health status, alerts, or recent activity

### 3. Analytics and Visualization
- **Interactive Charts**: Line charts for temperature and heart rate trends
- **Real-time Updates**: Simulated live data updates every 30 seconds
- **Health Trends**: Visual representation of health patterns across farms
- **Data Export**: Functionality to export health reports

### 4. Certificate Management
- **Health Certificates**: Monthly reports and vaccination certificates
- **Download Functionality**: Certificate download simulation
- **Blockchain Integration Ready**: Structure prepared for blockchain certificate validation

### 5. System Settings
- **Alert Thresholds**: Configurable temperature and heart rate limits
- **Notification Preferences**: Email and SMS alert settings
- **User Preferences**: Customizable dashboard settings

## Design Features

### Visual Design
- **Color Scheme**: Modern gradient design with green navigation (matching mockups)
- **Background**: Pexels cattle photograph as requested
- **Typography**: Inter font family for modern, professional appearance
- **Icons**: Font Awesome icons for consistency and clarity
- **Cards**: Modern card-based interface with hover effects and shadows

### Responsive Design
- **Mobile First**: Optimized for mobile devices with touch-friendly interfaces
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Navigation**: Collapsible mobile menu with hamburger toggle
- **Grid Layouts**: Responsive grids that adapt to screen size
- **Touch Optimization**: Larger buttons and spacing for mobile users

### User Experience Features
- **Smooth Animations**: CSS transitions and hover effects
- **Loading States**: Form submission feedback and redirects
- **Error Handling**: User-friendly error messages and validation
- **Accessibility**: Semantic HTML and keyboard navigation support

## Functionality Implementation

### JavaScript Features
- **Form Handling**: Registration and login form processing
- **Dashboard Navigation**: Tab-based section switching
- **Real-time Simulation**: Mock sensor data updates
- **Chart Integration**: Chart.js implementation for analytics
- **Interactive Filters**: Cattle filtering and farm selection
- **Alert Management**: Dynamic alert system

### Mock Data and Simulation
- **Cattle Data**: Realistic temperature, heart rate, and activity data
- **Farm Information**: Multiple farm locations (Karachi, Lahore, Islamabad)
- **Health Alerts**: Simulated health anomaly detection
- **Time-based Updates**: Realistic data variations over time

## Setup and Installation

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or build tools required
- Internet connection for external fonts and icons

### Running the Project
1. **Download/Clone**: Extract or clone the project files
2. **Open**: Navigate to the project directory
3. **Launch**: Open `index.html` in your web browser
4. **Navigate**: Use the website navigation to explore all features

### Testing the System
1. **Homepage**: Start at index.html to see the main website
2. **Registration**: Try both farm owner and cattle company registration
3. **User Login**: Test the regular user login functionality
4. **User Dashboard**: Explore all dashboard sections (Dashboard, Herds, Analytics, Certificates, Settings)
5. **Admin Access**: Login with admin credentials (admin/admin123/BIHHS2025)
6. **Admin Features**: Test all admin panel functionality:
   - User management (view, block/unblock, delete)
   - Collar tracking and monitoring
   - Login activity logs with filtering
   - PDF report generation
   - System statistics and real-time updates
7. **Mobile**: Test responsive design on different screen sizes

## 📊 Admin Panel Guide

### Overview Section
- **System Statistics**: Real-time counts of users, collars, and system health
- **Registration Trends**: Interactive chart showing user growth
- **Quick Actions**: Direct navigation to key management functions
- **Recent Activity**: Live feed of system events

### User Management
- **Search & Filter**: Find users by name, email, or filter by type/status
- **User Actions**:
  - View individual user dashboards
  - Block/unblock user accounts
  - Delete inactive accounts
- **Export**: Generate PDF reports of all user data

### Collar Tracking
- **Real-time Monitoring**: Live status of all collar devices
- **Battery Monitoring**: Visual battery level indicators
- **Health Data**: Temperature and heart rate information
- **Filter Options**: Filter by collar status (active, inactive, maintenance, error)

### Login Activity
- **Session Tracking**: Complete log of user login/logout times
- **Location & Device Info**: IP addresses, browsers, and geographic locations
- **Duration Analytics**: Session length and usage patterns
- **Date Filtering**: Filter activities by custom date ranges

### Reports & Analytics
- **User Reports**: Comprehensive user registration and activity data
- **System Health**: Performance metrics and operational status
- **Collar Reports**: Device status and health monitoring data
- **Activity Reports**: Login patterns and usage analytics

## 👥 Demo User Accounts
The system includes mock user data for testing:

| User ID | Name | Type | Status | Collars | Location |
|---------|------|------|--------|---------|-----------|
| USR001 | Ahmed Khan | Farm Owner | Active | 25 | Karachi |
| USR002 | Fatima Livestock Co. | Cattle Company | Active | 150 | Lahore |
| USR003 | Muhammad Ali | Farm Owner | Blocked | 0 | Islamabad |
| USR004 | Green Pastures Ltd | Cattle Company | Active | 89 | Faisalabad |
| USR005 | Sara Ahmed | Farm Owner | Inactive | 12 | Multan |

## Browser Compatibility
- **Chrome**: Fully supported (recommended)
- **Firefox**: Fully supported
- **Safari**: Fully supported
- **Edge**: Fully supported
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet

## Future Enhancements (Phase 2)
- **Backend Integration**: Node.js/Express API server
- **Database**: PostgreSQL with user and cattle data tables
- **Blockchain**: Smart contracts for certificate validation
- **IoT Integration**: Real sensor data from smart collars
- **Advanced Analytics**: Machine learning for health predictions
- **Mobile App**: React Native mobile application
- **Payment Integration**: Subscription and payment processing
- **Cloud Deployment**: AWS/Azure hosting with CDN

## Development Notes
- **Code Quality**: Clean, commented, and maintainable code
- **Performance**: Optimized CSS and JavaScript for fast loading
- **Security**: Form validation and XSS prevention measures
- **SEO Ready**: Semantic HTML and meta tags
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## Contact and Support
This is a demonstration project showcasing modern web development techniques for IoT and healthcare applications in the agricultural sector.

---

**Last Updated**: January 2025  
**Version**: 2.0.0 (includes Admin Panel)  
**Status**: Complete Prototype with Admin Features

---

## 🎯 Quick Start Guide

1. **Open** `index.html` in your browser
2. **Navigate** to Admin Login or User Login
3. **Admin Access**: Use admin/admin123/BIHHS2025
4. **Explore** all dashboard sections and admin features
5. **Test** user management, collar tracking, and PDF exports
6. **Experience** the complete BIHHS ecosystem

This project demonstrates modern web development techniques for IoT and healthcare applications in the agricultural sector, now including comprehensive administrative functionality for complete system management.
