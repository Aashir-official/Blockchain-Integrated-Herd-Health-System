// Admin Dashboard JavaScript functionality
// Mock data for demonstration purposes

// Mock Users Data
const mockUsers = [
    {
        id: 'USR001',
        name: 'Ahmed Khan',
        email: 'ahmed.khan@farm.com',
        phone: '+92-300-1234567',
        type: 'Farm Owner',
        status: 'active',
        joinedDate: '2024-01-15',
        lastLogin: '2025-01-16 14:30',
        collarsCount: 25,
        location: 'Karachi'
    },
    {
        id: 'USR002',
        name: 'Fatima Livestock Co.',
        email: 'contact@fatimalivestock.com',
        phone: '+92-301-9876543',
        type: 'Cattle Company',
        status: 'active',
        joinedDate: '2024-02-20',
        lastLogin: '2025-01-16 09:15',
        collarsCount: 150,
        location: 'Lahore'
    },
    {
        id: 'USR003',
        name: 'Muhammad Ali',
        email: 'm.ali@gmail.com',
        phone: '+92-302-5555666',
        type: 'Farm Owner',
        status: 'blocked',
        joinedDate: '2024-03-10',
        lastLogin: '2025-01-10 16:45',
        collarsCount: 0,
        location: 'Islamabad'
    },
    {
        id: 'USR004',
        name: 'Green Pastures Ltd',
        email: 'info@greenpastures.pk',
        phone: '+92-303-7777888',
        type: 'Cattle Company',
        status: 'active',
        joinedDate: '2024-04-05',
        lastLogin: '2025-01-15 11:20',
        collarsCount: 89,
        location: 'Faisalabad'
    },
    {
        id: 'USR005',
        name: 'Sara Ahmed',
        email: 'sara.ahmed@outlook.com',
        phone: '+92-304-2222333',
        type: 'Farm Owner',
        status: 'inactive',
        joinedDate: '2024-05-12',
        lastLogin: '2024-12-20 08:30',
        collarsCount: 12,
        location: 'Multan'
    }
];

// Mock Collars Data
const mockCollars = [
    {
        id: 'COL001',
        owner: 'Ahmed Khan',
        location: 'Karachi Farm',
        status: 'active',
        battery: 85,
        lastSignal: '2 mins ago',
        healthData: 'Normal',
        activityMovement: 'Normal Activity',
        temperature: 38.2,
        heartRate: 75
    },
    {
        id: 'COL002',
        owner: 'Fatima Livestock Co.',
        location: 'Lahore Farm A',
        status: 'active',
        battery: 92,
        lastSignal: '1 min ago',
        healthData: 'Normal',
        activityMovement: 'High Activity',
        temperature: 38.5,
        heartRate: 82
    },
    {
        id: 'COL003',
        owner: 'Green Pastures Ltd',
        location: 'Faisalabad Ranch',
        status: 'maintenance',
        battery: 45,
        lastSignal: '3 hours ago',
        healthData: 'No Data',
        activityMovement: 'No Movement',
        temperature: null,
        heartRate: null
    },
    {
        id: 'COL004',
        owner: 'Ahmed Khan',
        location: 'Karachi Farm',
        status: 'error',
        battery: 15,
        lastSignal: '6 hours ago',
        healthData: 'Alert',
        activityMovement: 'Low Activity',
        temperature: 40.1,
        heartRate: 95
    },
    {
        id: 'COL005',
        owner: 'Sara Ahmed',
        location: 'Multan Farm',
        status: 'inactive',
        battery: 0,
        lastSignal: '2 days ago',
        healthData: 'Offline',
        activityMovement: 'No Data',
        temperature: null,
        heartRate: null
    }
];

// Mock Activity Logs
const mockActivityLogs = [
    {
        user: 'Ahmed Khan',
        loginTime: '2025-01-16 14:30:15',
        logoutTime: '2025-01-16 16:45:22',
        duration: '2h 15m',
        location: 'Karachi, Pakistan',
        status: 'completed'
    },
    {
        user: 'Fatima Livestock Co.',
        loginTime: '2025-01-16 09:15:30',
        logoutTime: 'Active',
        duration: 'Active',
        location: 'Lahore, Pakistan',
        status: 'active'
    },
    {
        user: 'Green Pastures Ltd',
        loginTime: '2025-01-15 11:20:45',
        logoutTime: '2025-01-15 13:35:12',
        duration: '2h 14m',
        location: 'Faisalabad, Pakistan',
        status: 'completed'
    }
];

// Initialize admin dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check admin authentication
    if (!checkAdminAuth()) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    initializeAdminDashboard();
    initializeNavigation();
    loadDashboardData();
    startRealTimeUpdates();
});

// Check admin authentication
function checkAdminAuth() {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    const adminUsername = localStorage.getItem('adminUsername');
    
    if (adminLoggedIn === 'true' && adminUsername) {
        document.getElementById('admin-welcome').textContent = `Welcome, ${adminUsername}`;
        return true;
    }
    return false;
}

// Initialize admin dashboard
function initializeAdminDashboard() {
    // Set current date filters
    const today = new Date().toISOString().split('T')[0];
    const startDate = document.getElementById('activity-start-date');
    const endDate = document.getElementById('activity-end-date');
    
    if (startDate && endDate) {
        startDate.value = today;
        endDate.value = today;
    }
    
    // Charts removed as per request
    
    // Load all data
    loadUsersData();
    loadCollarsData();
    loadActivityData();
    loadRecentActivity();
    
    console.log('Admin dashboard initialized successfully');
}

// Navigation functionality
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.admin-nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            showSection(targetSection);
        });
    });
}

// Show specific dashboard section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.admin-section');
    
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Refresh data when switching to sections
    if (sectionId === 'users') {
        loadUsersData();
    } else if (sectionId === 'collars') {
        loadCollarsData();
    } else if (sectionId === 'activity') {
        loadActivityData();
    }
}

// Load dashboard overview data
function loadDashboardData() {
    // Update statistics
    document.getElementById('total-users').textContent = mockUsers.length.toLocaleString();
    document.getElementById('active-collars').textContent = mockCollars.filter(c => c.status === 'active').length.toLocaleString();
    document.getElementById('online-users').textContent = mockActivityLogs.filter(log => log.status === 'active').length;
    document.getElementById('last-update').textContent = new Date().toLocaleTimeString();
}

// Initialize charts
function initializeCharts() {
    const registrationCtx = document.getElementById('registrationChart');
    if (registrationCtx) {
        new Chart(registrationCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Registrations',
                    data: [45, 78, 92, 67, 89, 134],
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

// Load users data into table
function loadUsersData() {
    const tbody = document.getElementById('users-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    mockUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>
                <div>${user.email}</div>
                <small style="color: #6b7280;">${user.phone}</small>
            </td>
            <td>${user.type}</td>
            <td><span class="status-badge ${user.status}">${user.status.toUpperCase()}</span></td>
            <td>${formatDate(user.joinedDate)}</td>
            <td>${user.lastLogin}</td>
            <td>${user.collarsCount}</td>
            <td>
                ${user.status === 'active' ? 
                    `<button class="action-btn block" onclick="blockUser('${user.id}')">Block</button>` :
                    user.status === 'blocked' ?
                    `<button class="action-btn unblock" onclick="unblockUser('${user.id}')">Unblock</button>` : ''
                }
                ${user.status === 'inactive' ? 
                    `<button class="action-btn delete" onclick="deleteUser('${user.id}')">Delete</button>` : ''
                }
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load collars data into table
function loadCollarsData() {
    const tbody = document.getElementById('collars-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    mockCollars.forEach(collar => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${collar.id}</td>
            <td>${collar.owner}</td>
            <td>${collar.location}</td>
            <td><span class="status-badge ${collar.status}">${collar.status.toUpperCase()}</span></td>
            <td>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 20px; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden;">
                        <div style="width: ${collar.battery}%; height: 100%; background: ${collar.battery > 50 ? '#10b981' : collar.battery > 20 ? '#f59e0b' : '#ef4444'}; transition: width 0.3s;"></div>
                    </div>
                    <span style="font-size: 0.75rem; color: #6b7280;">${collar.battery}%</span>
                </div>
            </td>
            <td>${collar.lastSignal}</td>
            <td>${collar.healthData}</td>
            <td>${collar.activityMovement}</td>
            <td>
                <button class="action-btn view" onclick="viewCollarDetails('${collar.id}')">Details</button>
                ${collar.status === 'error' ? 
                    `<button class="action-btn block" onclick="resetCollar('${collar.id}')">Reset</button>` : ''
                }
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load activity data into table
function loadActivityData() {
    const tbody = document.getElementById('activity-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    mockActivityLogs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.user}</td>
            <td>${log.loginTime}</td>
            <td>${log.logoutTime}</td>
            <td>${log.duration}</td>
            <td>${log.location}</td>
            <td><span class="status-badge ${log.status === 'active' ? 'active' : 'inactive'}">${log.status.toUpperCase()}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Load recent activity
function loadRecentActivity() {
    const activityContainer = document.getElementById('recent-activity');
    if (!activityContainer) return;
    
    const recentActivities = [
        { type: 'login', title: 'Ahmed Khan logged in', time: '2 minutes ago' },
        { type: 'system', title: 'System backup completed', time: '15 minutes ago' },
        { type: 'login', title: 'Fatima Livestock Co. logged in', time: '1 hour ago' },
        { type: 'logout', title: 'Green Pastures Ltd logged out', time: '2 hours ago' },
        { type: 'system', title: 'New user registration', time: '3 hours ago' }
    ];
    
    activityContainer.innerHTML = '';
    
    recentActivities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon ${activity.type}">
                <i class="fas ${activity.type === 'login' ? 'fa-sign-in-alt' : activity.type === 'logout' ? 'fa-sign-out-alt' : 'fa-cog'}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        activityContainer.appendChild(item);
    });
}

// User Management Functions
function viewUserDashboard(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
        alert(`Opening dashboard for ${user.name}...\n\nThis would redirect to their individual dashboard view with:\n- Farm/Company overview\n- Active collars\n- Health monitoring\n- Recent activities`);
        // In real implementation, this would open the user's dashboard in a new tab/window
        // window.open(`../pages/dashboard.html?userId=${userId}`, '_blank');
    }
}

function blockUser(userId) {
    if (confirm('Are you sure you want to block this user? They will not be able to access their account.')) {
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
            user.status = 'blocked';
            loadUsersData();
            alert(`User ${user.name} has been blocked successfully.`);
            
            // Log the action
            console.log(`Admin blocked user: ${user.name} (${userId})`);
        }
    }
}

function unblockUser(userId) {
    if (confirm('Are you sure you want to unblock this user? They will regain access to their account.')) {
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
            user.status = 'active';
            loadUsersData();
            alert(`User ${user.name} has been unblocked successfully.`);
            
            // Log the action
            console.log(`Admin unblocked user: ${user.name} (${userId})`);
        }
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this inactive user? This action cannot be undone.')) {
        const userIndex = mockUsers.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            const user = mockUsers[userIndex];
            mockUsers.splice(userIndex, 1);
            loadUsersData();
            loadDashboardData(); // Update statistics
            alert(`User ${user.name} has been deleted successfully.`);
            
            // Log the action
            console.log(`Admin deleted user: ${user.name} (${userId})`);
        }
    }
}

// Collar Management Functions
function viewCollarDetails(collarId) {
    const collar = mockCollars.find(c => c.id === collarId);
    if (collar) {
        alert(`Collar Details: ${collarId}\n\nOwner: ${collar.owner}\nLocation: ${collar.location}\nStatus: ${collar.status}\nBattery: ${collar.battery}%\nLast Signal: ${collar.lastSignal}\n\nHealth Data:\nTemperature: ${collar.temperature ? collar.temperature + '°C' : 'No data'}\nHeart Rate: ${collar.heartRate ? collar.heartRate + ' BPM' : 'No data'}\nActivity: ${collar.activityMovement || 'No data'}`);
    }
}

function resetCollar(collarId) {
    if (confirm('Reset this collar? This will attempt to reconnect and clear error status.')) {
        const collar = mockCollars.find(c => c.id === collarId);
        if (collar) {
            collar.status = 'active';
            collar.lastSignal = 'Just now';
            loadCollarsData();
            alert(`Collar ${collarId} has been reset successfully.`);
            
            // Log the action
            console.log(`Admin reset collar: ${collarId}`);
        }
    }
}

// Search and Filter Functions
function setupSearchAndFilters() {
    // User search
    const userSearch = document.getElementById('user-search');
    if (userSearch) {
        userSearch.addEventListener('input', function() {
            filterUsers(this.value);
        });
    }
    
    // User filter
    const userFilter = document.getElementById('user-filter');
    if (userFilter) {
        userFilter.addEventListener('change', function() {
            filterUsersByType(this.value);
        });
    }
    
    // Collar search
    const collarSearch = document.getElementById('collar-search');
    if (collarSearch) {
        collarSearch.addEventListener('input', function() {
            filterCollars(this.value);
        });
    }
    
    // Collar status filter
    const collarFilter = document.getElementById('collar-status-filter');
    if (collarFilter) {
        collarFilter.addEventListener('change', function() {
            filterCollarsByStatus(this.value);
        });
    }
}

function filterUsers(searchTerm) {
    const rows = document.querySelectorAll('#users-tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterUsersByType(type) {
    const rows = document.querySelectorAll('#users-tbody tr');
    rows.forEach(row => {
        if (type === 'all') {
            row.style.display = '';
        } else {
            const statusCell = row.cells[4]; // Status column
            const typeCell = row.cells[3]; // Type column
            
            let shouldShow = false;
            
            if (type === 'active' || type === 'blocked' || type === 'inactive') {
                shouldShow = statusCell.textContent.toLowerCase().includes(type);
            } else if (type === 'farm-owners') {
                shouldShow = typeCell.textContent.includes('Farm Owner');
            } else if (type === 'cattle-companies') {
                shouldShow = typeCell.textContent.includes('Cattle Company');
            }
            
            row.style.display = shouldShow ? '' : 'none';
        }
    });
}

function filterCollars(searchTerm) {
    const rows = document.querySelectorAll('#collars-tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterCollarsByStatus(status) {
    const rows = document.querySelectorAll('#collars-tbody tr');
    rows.forEach(row => {
        if (status === 'all') {
            row.style.display = '';
        } else {
            const statusCell = row.cells[3]; // Status column
            const shouldShow = statusCell.textContent.toLowerCase().includes(status);
            row.style.display = shouldShow ? '' : 'none';
        }
    });
}

function filterActivityLogs() {
    const startDate = document.getElementById('activity-start-date').value;
    const endDate = document.getElementById('activity-end-date').value;
    
    if (!startDate || !endDate) {
        alert('Please select both start and end dates.');
        return;
    }
    
    // In a real implementation, this would filter the activity logs by date range
    alert(`Filtering activity logs from ${startDate} to ${endDate}\n\nThis would show only login activities within the selected date range.`);
    loadActivityData(); // Reload with filtered data
}

// PDF Export Functions
function exportUsersReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('BIHHS - User Registration Report', 20, 20);
    
    // Add generation date
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${currentDate}`, 20, 30);
    
    // Add summary statistics
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text('Summary Statistics', 20, 50);
    
    doc.setFontSize(12);
    const activeUsers = mockUsers.filter(u => u.status === 'active').length;
    const blockedUsers = mockUsers.filter(u => u.status === 'blocked').length;
    const inactiveUsers = mockUsers.filter(u => u.status === 'inactive').length;
    const totalCollars = mockUsers.reduce((sum, u) => sum + u.collarsCount, 0);
    
    doc.text(`• Total Registered Users: ${mockUsers.length}`, 30, 65);
    doc.text(`• Active Users: ${activeUsers}`, 30, 75);
    doc.text(`• Blocked Users: ${blockedUsers}`, 30, 85);
    doc.text(`• Inactive Users: ${inactiveUsers}`, 30, 95);
    doc.text(`• Total Collars in System: ${totalCollars}`, 30, 105);
    
    // Add user details
    doc.setFontSize(16);
    doc.text('Detailed User Information', 20, 125);
    
    doc.setFontSize(10);
    let yPos = 140;
    
    mockUsers.forEach(user => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.text(`${user.id} - ${user.name}`, 30, yPos);
        doc.text(`  Type: ${user.type} | Status: ${user.status.toUpperCase()}`, 40, yPos + 10);
        doc.text(`  Email: ${user.email} | Phone: ${user.phone}`, 40, yPos + 20);
        doc.text(`  Joined: ${user.joinedDate} | Last Login: ${user.lastLogin}`, 40, yPos + 30);
        doc.text(`  Collars: ${user.collarsCount} | Location: ${user.location}`, 40, yPos + 40);
        yPos += 50;
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated by BIHHS Admin Portal - Confidential Document', 20, 290);
    
    // Save the PDF
    doc.save(`BIHHS_Users_Report_${new Date().toISOString().split('T')[0]}.pdf`);
}

function exportActivityReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('BIHHS - User Activity Report', 20, 20);
    
    // Add generation date
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${currentDate}`, 20, 30);
    
    // Add activity summary
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text('Activity Summary', 20, 50);
    
    doc.setFontSize(12);
    const activeNow = mockActivityLogs.filter(log => log.status === 'active').length;
    const totalSessions = mockActivityLogs.length;
    
    doc.text(`• Total Login Sessions: ${totalSessions}`, 30, 65);
    doc.text(`• Currently Active Users: ${activeNow}`, 30, 75);
    doc.text(`• Average Session Duration: 2h 15m`, 30, 85);
    doc.text(`• Most Active Time: 2:00 PM - 4:00 PM`, 30, 95);
    
    // Add detailed activity logs
    doc.setFontSize(16);
    doc.text('Recent Login Activity', 20, 115);
    
    doc.setFontSize(10);
    let yPos = 130;
    
    mockActivityLogs.forEach(log => {
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.text(`User: ${log.user}`, 30, yPos);
        doc.text(`Login: ${log.loginTime} | Logout: ${log.logoutTime}`, 40, yPos + 10);
        doc.text(`Duration: ${log.duration} | Location: ${log.location}`, 40, yPos + 20);
        doc.text(`Status: ${log.status.toUpperCase()}`, 40, yPos + 30);
        yPos += 50;
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated by BIHHS Admin Portal - Confidential Document', 20, 290);
    
    // Save the PDF
    doc.save(`BIHHS_Activity_Report_${new Date().toISOString().split('T')[0]}.pdf`);
}

function exportCollarsReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('BIHHS - Collar Status Report', 20, 20);
    
    // Add generation date
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${currentDate}`, 20, 30);
    
    // Add collar statistics
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text('Collar Statistics', 20, 50);
    
    doc.setFontSize(12);
    const activeCollars = mockCollars.filter(c => c.status === 'active').length;
    const inactiveCollars = mockCollars.filter(c => c.status === 'inactive').length;
    const maintenanceCollars = mockCollars.filter(c => c.status === 'maintenance').length;
    const errorCollars = mockCollars.filter(c => c.status === 'error').length;
    
    doc.text(`• Total Collars: ${mockCollars.length}`, 30, 65);
    doc.text(`• Active Collars: ${activeCollars}`, 30, 75);
    doc.text(`• Inactive Collars: ${inactiveCollars}`, 30, 85);
    doc.text(`• Under Maintenance: ${maintenanceCollars}`, 30, 95);
    doc.text(`• Error Status: ${errorCollars}`, 30, 105);
    
    // Add collar details
    doc.setFontSize(16);
    doc.text('Individual Collar Status', 20, 125);
    
    doc.setFontSize(10);
    let yPos = 140;
    
    mockCollars.forEach(collar => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.text(`${collar.id} - ${collar.owner}`, 30, yPos);
        doc.text(`  Location: ${collar.location} | Status: ${collar.status.toUpperCase()}`, 40, yPos + 10);
        doc.text(`  Battery: ${collar.battery}% | Last Signal: ${collar.lastSignal}`, 40, yPos + 20);
        doc.text(`  Health Data: ${collar.healthData}`, 40, yPos + 30);
        if (collar.temperature && collar.heartRate) {
            doc.text(`  Temperature: ${collar.temperature}°C | Heart Rate: ${collar.heartRate} BPM | Activity: ${collar.activityMovement || 'No data'}`, 40, yPos + 40);
            yPos += 50;
        } else {
            doc.text(`  Activity: ${collar.activityMovement || 'No data'}`, 40, yPos + 40);
            yPos += 50;
        }
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated by BIHHS Admin Portal - Confidential Document', 20, 290);
    
    // Save the PDF
    doc.save(`BIHHS_Collars_Report_${new Date().toISOString().split('T')[0]}.pdf`);
}

function exportSystemReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('BIHHS - System Health Report', 20, 20);
    
    // Add generation date
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${currentDate}`, 20, 30);
    
    // Add system overview
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text('System Overview', 20, 50);
    
    doc.setFontSize(12);
    doc.text(`• System Health: 98.7%`, 30, 65);
    doc.text(`• Total Registered Users: ${mockUsers.length}`, 30, 75);
    doc.text(`• Active Collars: ${mockCollars.filter(c => c.status === 'active').length}`, 30, 85);
    doc.text(`• Online Users: ${mockActivityLogs.filter(log => log.status === 'active').length}`, 30, 95);
    doc.text(`• Server Uptime: 99.9%`, 30, 105);
    doc.text(`• Database Status: Healthy`, 30, 115);
    doc.text(`• Backup Status: Last backup completed successfully`, 30, 125);
    
    // Add performance metrics
    doc.setFontSize(16);
    doc.text('Performance Metrics', 20, 145);
    
    doc.setFontSize(12);
    doc.text(`• Average Response Time: 245ms`, 30, 160);
    doc.text(`• Data Processing Rate: 1,250 records/minute`, 30, 170);
    doc.text(`• Storage Usage: 67% (2.1TB of 3.2TB)`, 30, 180);
    doc.text(`• Bandwidth Usage: 45 Mbps average`, 30, 190);
    doc.text(`• Active Connections: 1,847`, 30, 200);
    
    // Add recent system events
    doc.setFontSize(16);
    doc.text('Recent System Events', 20, 220);
    
    doc.setFontSize(10);
    doc.text(`• System backup completed successfully at 02:00 AM`, 30, 235);
    doc.text(`• Database optimization completed - 15% performance improvement`, 30, 245);
    doc.text(`• Security scan completed - No threats detected`, 30, 255);
    doc.text(`• All collar connections verified and stable`, 30, 265);
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated by BIHHS Admin Portal - Confidential Document', 20, 290);
    
    // Save the PDF
    doc.save(`BIHHS_System_Report_${new Date().toISOString().split('T')[0]}.pdf`);
}

// System maintenance actions (front-end simulated)
function clearSystemCache() {
    // Simulate clearing UI caches/local state only
    const keys = ['bihhsUserCredentials','bihhsAdminCredentials'];
    keys.forEach(k => localStorage.removeItem(k));
    alert('System cache cleared (local demo data removed).');
}
function backupDatabase() {
    alert('Backup started. In this demo, a real backend is not connected.');
}
function toggleMaintenanceMode() {
    const current = localStorage.getItem('adminMaintenanceMode') === 'true';
    const next = !current;
    localStorage.setItem('adminMaintenanceMode', String(next));
    alert(`Maintenance Mode ${next ? 'ENABLED' : 'DISABLED'}.`);
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function refreshData() {
    loadDashboardData();
    loadUsersData();
    loadCollarsData();
    loadActivityData();
    loadRecentActivity();
    
    // Show refresh feedback
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1500);
}

function startRealTimeUpdates() {
    // Update online users count every 30 seconds
    setInterval(() => {
        const onlineCount = Math.floor(Math.random() * 20) + 140; // Random between 140-159
        document.getElementById('online-users').textContent = onlineCount;
        document.getElementById('last-update').textContent = new Date().toLocaleTimeString();
    }, 30000);
    
    // Update collar battery levels occasionally
    setInterval(() => {
        mockCollars.forEach(collar => {
            if (collar.status === 'active' && collar.battery > 0) {
                // Simulate battery drain
                collar.battery = Math.max(0, collar.battery - Math.random());
            }
        });
        
        if (document.getElementById('collars').classList.contains('active')) {
            loadCollarsData();
        }
    }, 60000); // Update every minute
}

// Admin logout
function adminLogout() {
    if (confirm('Are you sure you want to logout from the admin panel?')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoginTime');
        
        alert('Logged out successfully!');
        window.location.href = 'admin-login.html';
    }
}

// Initialize search and filters when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        setupSearchAndFilters();
    }, 500);
});
