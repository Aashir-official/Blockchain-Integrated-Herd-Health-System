// Dashboard JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeNavigation();
    initializeCharts();
    
    // Set default active section
    showSection('dashboard');
});

// Navigation functionality
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
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
    const sections = document.querySelectorAll('.dashboard-section');
    
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Farm selector functionality
function showFarm(farmId) {
    const farmButtons = document.querySelectorAll('.farm-btn');
    
    farmButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Update dashboard data based on selected farm
    // Here you would typically fetch and update data for the selected farm
}

// Cattle filter functionality
function filterCattle(filterType) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    const cattleCards = document.querySelectorAll('.cattle-card');
    
    cattleCards.forEach(card => {
        switch(filterType) {
            case 'all':
                card.style.display = 'block';
                break;
            case 'healthy':
                card.style.display = card.classList.contains('healthy') ? 'block' : 'none';
                break;
            case 'alerts':
                card.style.display = card.classList.contains('alert') ? 'block' : 'none';
                break;
            case 'recent':
                // Show all for now - in real implementation, this would filter by timestamp
                card.style.display = 'block';
                break;
        }
    });
}

// Initialize charts
function initializeCharts() {
    // Main health chart
    const healthCtx = document.getElementById('healthChart');
    if (healthCtx) {
        new Chart(healthCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Avg Temperature (°C)',
                        data: [38.1, 38.4, 38.7, 38.5, 38.3, 38.6, 38.2],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239,68,68,0.12)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.35
                    },
                    {
                        label: 'Avg Heart Rate (BPM)',
                        data: [74, 76, 73, 78, 75, 77, 72],
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99,102,241,0.12)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.35
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Temperature chart
    const tempCtx = document.getElementById('tempChart');
    if (tempCtx) {
        new Chart(tempCtx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    label: 'Temperature (°C)',
                    data: [38.2, 38.5, 39.1, 38.8, 38.3, 38.0],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 37,
                        max: 41
                    }
                }
            }
        });
    }
    
    // Heart rate chart
    const heartRateCtx = document.getElementById('heartRateChart');
    if (heartRateCtx) {
        new Chart(heartRateCtx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    label: 'Heart Rate (BPM)',
                    data: [72, 75, 82, 78, 74, 70],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Activity chart
    const activityCtx = document.getElementById('activityChart');
    if (activityCtx) {
        new Chart(activityCtx, {
            type: 'doughnut',
            data: {
                labels: ['Normal', 'High', 'Low', 'None'],
                datasets: [{
                    label: 'Activity Levels',
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#6b7280'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                }
            }
        });
    }
}

// Simulate real-time data updates
setInterval(function() {
    updateRealTimeData();
}, 30000); // Update every 30 seconds

function updateRealTimeData() {
    // Simulate updating cattle data
    const cattleCards = document.querySelectorAll('.cattle-card');
    
    cattleCards.forEach(card => {
        const tempValue = card.querySelector('.data-item .value');
        if (tempValue && tempValue.textContent.includes('°C')) {
            // Simulate small temperature variations
            const currentTemp = parseFloat(tempValue.textContent);
            const variation = (Math.random() - 0.5) * 0.4; // ±0.2°C variation
            const newTemp = (currentTemp + variation).toFixed(1);
            tempValue.textContent = newTemp + '°C';
            
            // Update alert status if temperature is too high
            if (parseFloat(newTemp) > 39.5) {
                card.classList.remove('healthy');
                card.classList.add('alert');
                card.querySelector('.status-indicator').classList.remove('healthy');
                card.querySelector('.status-indicator').classList.add('alert');
                card.querySelector('.status-text').textContent = 'High Temp Alert';
            } else {
                card.classList.remove('alert');
                card.classList.add('healthy');
                card.querySelector('.status-indicator').classList.remove('alert');
                card.querySelector('.status-indicator').classList.add('healthy');
                card.querySelector('.status-text').textContent = 'Healthy';
            }
        }
    });
    
}

// Health report PDF generation
function generateHealthReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('BIHHS Health Report', 20, 20);
    
    // Add generation date
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${currentDate}`, 20, 30);
    
    // Add farm statistics
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text('Farm Statistics Overview', 20, 50);
    
    doc.setFontSize(12);
    doc.text('• Total Collars: 156', 30, 65);
    doc.text('• Active Alerts: 6', 30, 75);
    doc.text('• Farms Connected: 3', 30, 85);
    doc.text('• Overall Health Score: 94%', 30, 95);
    
    // Add individual cattle data
    doc.setFontSize(16);
    doc.text('Individual Cattle Health Data', 20, 115);
    
    doc.setFontSize(12);
    let yPos = 130;
    
    const cattleData = [
        { id: 'KHI-001', status: 'Healthy', temp: '38.2°C', hr: '78 BPM', activity: 'Normal' },
        { id: 'KHI-045', status: 'High Temp Alert', temp: '40.1°C', hr: '95 BPM', activity: 'Low' },
        { id: 'KHI-032', status: 'Healthy', temp: '38.5°C', hr: '72 BPM', activity: 'High' },
        { id: 'KHI-078', status: 'Healthy', temp: '38.0°C', hr: '75 BPM', activity: 'Normal' }
    ];
    
    cattleData.forEach(cattle => {
        doc.text(`${cattle.id} - Status: ${cattle.status}`, 30, yPos);
        doc.text(`  Temperature: ${cattle.temp}, Heart Rate: ${cattle.hr}, Activity: ${cattle.activity}`, 40, yPos + 10);
        yPos += 25;
    });
    
    // Add recommendations
    doc.setFontSize(16);
    doc.text('Health Recommendations', 20, yPos + 20);
    
    doc.setFontSize(12);
    yPos += 35;
    doc.text('• Monitor KHI-045 closely due to elevated temperature', 30, yPos);
    doc.text('• Continue regular health monitoring for all cattle', 30, yPos + 10);
    doc.text('• Maintain current vaccination schedule', 30, yPos + 20);
    doc.text('• Consider veterinary consultation for KHI-045', 30, yPos + 30);
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated by BIHHS - Blockchain Integrated Herd Health System', 20, 280);
    
    // Save the PDF
    doc.save(`BIHHS_Health_Report_${new Date().toISOString().split('T')[0]}.pdf`);
}

// Certificate generation
function generateCertificate(certificateName, validityDate) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add border
    doc.setLineWidth(2);
    doc.rect(10, 10, 190, 277);
    
    // Add title
    doc.setFontSize(24);
    doc.setTextColor(40, 40, 40);
    doc.text('HEALTH CERTIFICATE', 105, 40, { align: 'center' });
    
    // Add subtitle
    doc.setFontSize(18);
    doc.setTextColor(100, 100, 100);
    doc.text('BIHHS Certified', 105, 55, { align: 'center' });
    
    // Add certificate content
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('This is to certify that:', 105, 80, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text(certificateName, 105, 100, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('Has met all health monitoring requirements', 105, 120, { align: 'center' });
    doc.text('as per BIHHS standards and protocols.', 105, 135, { align: 'center' });
    
    // Add validity
    if (validityDate) {
        doc.text(`Valid until: ${validityDate}`, 105, 160, { align: 'center' });
    } else {
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 160, { align: 'center' });
    }
    
    // Add signature area
    doc.text('_________________________', 60, 220);
    doc.text('Authorized Signature', 60, 235);
    
    doc.text('_________________________', 130, 220);
    doc.text('Date', 130, 235);
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated by BIHHS - Blockchain Integrated Herd Health System', 105, 270, { align: 'center' });
    
    // Save the PDF
    doc.save(`${certificateName.replace(/[^a-z0-9]/gi, '_')}_Certificate.pdf`);
}

// Export functionality
document.querySelector('.btn-outline')?.addEventListener('click', function() {
    generateHealthReport();
});

// Certificate download functionality
document.addEventListener('click', function(e) {
    if (e.target.textContent === 'Download' && e.target.classList.contains('btn')) {
        const certInfo = e.target.parentElement.querySelector('.cert-info');
        const certName = certInfo.querySelector('h4').textContent;
        const certDetails = certInfo.querySelector('p').textContent;
        
        // Extract validity date if it exists
        let validityDate = null;
        if (certDetails.includes('Valid until:')) {
            validityDate = certDetails.replace('Valid until: ', '');
        }
        
        generateCertificate(certName, validityDate);
    }
});

// Settings save functionality
document.addEventListener('change', function(e) {
    if (e.target.type === 'number' || e.target.type === 'checkbox') {
        // In a real application, this would save to the backend
    }
});
