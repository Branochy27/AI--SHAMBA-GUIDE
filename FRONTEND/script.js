// ============================================
// 🤖 SMART LAND GUARDIAN AI - JAVASCRIPT
// Think of JavaScript like the brain that
// makes everything work and react!
// ============================================

// Step 1: Create a database to store all lands
let lands = [
    {
        id: 1,
        name: "Farm A",
        latitude: -1.2921,
        longitude: 36.8219,
        area: 50,
        soilHealth: 75,
        moisture: 60,
        temperature: 25,
        trees: 150,
        ndvi: 0.65,
        realTimeData: {
            rainfall: 15,
            windSpeed: 8,
            humidity: 65,
            timestamp: new Date().toLocaleTimeString()
        }
    }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Generate random real-time weather data
function generateRealTimeData() {
    return {
        rainfall: Math.floor(Math.random() * 30),
        windSpeed: Math.floor(Math.random() * 25),
        humidity: 40 + Math.floor(Math.random() * 60),
        timestamp: new Date().toLocaleTimeString()
    };
}

// ============================================
// 🤖 AI ANALYSIS ENGINE
// ============================================

function analyzeWithAI(soil, moisture, temp, trees, area, ndvi) {
    let score = 0;
    let alerts = [];
    let predictions = [];
    let recommendations = [];

    // ✅ SOIL HEALTH ANALYSIS (25 points)
    if (soil >= 80) {
        score += 25;
        predictions.push("Soil: Excellent quality detected!");
    } else if (soil >= 60) {
        score += 18;
        predictions.push("Soil: Good but needs monitoring");
    } else if (soil >= 40) {
        score += 10;
        alerts.push("⚠️ Soil degradation detected");
        recommendations.push("Add organic matter to improve soil");
    } else {
        score += 5;
        alerts.push("❌ Critical soil degradation");
        recommendations.push("Emergency intervention needed: plant cover crops");
    }

    // ✅ MOISTURE ANALYSIS (25 points)
    if (moisture >= 45 && moisture <= 70) {
        score += 25;
        predictions.push("Moisture: Perfect for crops 💧");
    } else if (moisture < 30) {
        score += 5;
        alerts.push("💧 Severe drought predicted");
        recommendations.push("Activate irrigation system immediately");
        predictions.push("Next 7 days: High drought risk");
    } else if (moisture > 80) {
        score += 10;
        alerts.push("💦 Waterlogging risk detected");
        recommendations.push("Improve drainage systems");
        predictions.push("Next 7 days: Moderate flood risk");
    } else {
        score += 15;
    }

    // ✅ TEMPERATURE ANALYSIS (20 points)
    if (temp >= 18 && temp <= 28) {
        score += 20;
        predictions.push("Temperature: Ideal growing conditions");
    } else if (temp < 10 || temp > 35) {
        score += 5;
        alerts.push("🌡️ Extreme temperature detected");
        recommendations.push("Consider protective measures (shade/mulch)");
        predictions.push("Climate stress: High risk");
    } else {
        score += 12;
    }

    // ✅ VEGETATION INDEX (NDVI) (15 points)
    if (ndvi >= 0.6) {
        score += 15;
        predictions.push("Vegetation: Very healthy (NDVI: Excellent)");
    } else if (ndvi >= 0.4) {
        score += 10;
        predictions.push("Vegetation: Moderate health");
    } else {
        score += 3;
        alerts.push("🌾 Low vegetation detected");
        recommendations.push("Consider reforestation efforts");
    }

    // ✅ REFORESTATION IMPACT (15 points)
    const treesDensity = trees / area;
    if (treesDensity >= 3) {
        score += 15;
        predictions.push("Reforestation: Excellent progress");
    } else if (treesDensity >= 1) {
        score += 10;
        predictions.push("Reforestation: Good coverage");
    } else {
        score += 5;
        recommendations.push("Plant more trees for climate resilience");
    }

    // ✅ DETERMINE STATUS
    let status = "healthy";
    let overallPrediction = "Stable";

    if (score >= 85) {
        status = "healthy";
        overallPrediction = "Excellent health - Maintain current practices";
    } else if (score >= 60) {
        status = "warning";
        overallPrediction = "Monitor closely - Plan interventions";
    } else {
        status = "danger";
        overallPrediction = "Critical - Immediate action needed";
    }

    // Return all analysis
    return {
        score: Math.min(Math.max(score, 0), 100),
        status,
        alerts,
        predictions,
        recommendations,
        overallPrediction,
        ndvi: ndvi.toFixed(2)
    };
}

// ============================================
// CREATE LAND CARD HTML
// ============================================

function createLandCardHTML(land) {
    // Run AI analysis
    const analysis = analyzeWithAI(
        land.soilHealth,
        land.moisture,
        land.temperature,
        land.trees,
        land.area,
        land.ndvi
    );

    // Get status text and icon
    const statusText = {
        healthy: "✅ Healthy",
        warning: "⚠️ Warning",
        danger: "❌ Critical"
    }[analysis.status];

    // Calculate trees per hectare
    const treesDensity = (land.trees / land.area).toFixed(1);

    // Create the HTML
    const html = `
        <div class="land-card ${analysis.status}">
            <!-- HEADER -->
            <div class="card-header">
                <div class="card-header-top">
                    <div class="card-header-title">
                        <h3>${land.name}</h3>
                        <p>${statusText}</p>
                    </div>
                    <button class="btn-delete" onclick="deleteLand(${land.id})">🗑️</button>
                </div>

                <!-- GIS LOCATION INFO -->
                <div class="gis-info">
                    📍 Lat: ${land.latitude.toFixed(4)} | Lon: ${land.longitude.toFixed(4)} | Area: ${land.area} ha
                </div>
            </div>

            <!-- BODY -->
            <div class="card-body">
                <!-- HEALTH SCORE -->
                <div class="health-score">
                    <div class="health-score-label">
                        <span>AI Health Score</span>
                        <span class="health-score-value">${analysis.score}%</span>
                    </div>
                    <div class="progress-bar">
                        <div 
                            class="progress-fill ${analysis.status}" 
                            style="width: ${analysis.score}%"
                        >
                            ${analysis.score > 20 ? analysis.score + '%' : ''}
                        </div>
                    </div>
                </div>

                <!-- METRICS GRID -->
                <div class="metrics-grid">
                    <div class="metric-card metric-soil">
                        <div class="metric-label">🌾 SOIL</div>
                        <div class="metric-value">${land.soilHealth}%</div>
                    </div>
                    <div class="metric-card metric-moisture">
                        <div class="metric-label">💧 MOISTURE</div>
                        <div class="metric-value">${land.moisture}%</div>
                    </div>
                    <div class="metric-card metric-temperature">
                        <div class="metric-label">🌡️ TEMP</div>
                        <div class="metric-value">${land.temperature}°C</div>
                    </div>
                    <div class="metric-card metric-trees">
                        <div class="metric-label">🌳 TREES</div>
                        <div class="metric-value">${land.trees}</div>
                    </div>
                    <div class="metric-card metric-ndvi">
                        <div class="metric-label">🛰️ NDVI</div>
                        <div class="metric-value">${analysis.ndvi}</div>
                    </div>
                </div>

                <!-- REAL-TIME DATA -->
                <div class="info-box realtime-box">
                    <h4>📡 Real-time Weather Data</h4>
                    <div class="weather-grid">
                        <div class="weather-item">
                            <div class="weather-label">☔ Rainfall</div>
                            <div class="weather-value">${land.realTimeData.rainfall}mm</div>
                        </div>
                        <div class="weather-item">
                            <div class="weather-label">💨 Wind</div>
                            <div class="weather-value">${land.realTimeData.windSpeed} km/h</div>
                        </div>
                        <div class="weather-item">
                            <div class="weather-label">💧 Humidity</div>
                            <div class="weather-value">${land.realTimeData.humidity}%</div>
                        </div>
                        <div class="weather-item">
                            <div class="weather-label">⏰ Updated</div>
                            <div class="weather-value" style="font-size: 0.9rem;">${land.realTimeData.timestamp}</div>
                        </div>
                    </div>
                </div>

                <!-- PREDICTIONS -->
                ${analysis.predictions.length > 0 ? `
                    <div class="info-box predictions-box">
                        <h4>🔮 AI Predictions & Analysis</h4>
                        <ul>
                            ${analysis.predictions.map(pred => `<li>✓ ${pred}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                <!-- ALERTS -->
                ${analysis.alerts.length > 0 ? `
                    <div class="info-box alerts-box">
                        <h4>⚠️ Alerts</h4>
                        <ul>
                            ${analysis.alerts.map(alert => `<li>${alert}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                <!-- RECOMMENDATIONS -->
                ${analysis.recommendations.length > 0 ? `
                    <div class="info-box recommendations-box">
                        <h4>💡 AI Recommendations</h4>
                        <ul>
                            ${analysis.recommendations.map(rec => `<li>→ ${rec}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    return html;
}

// ============================================
// DISPLAY ALL LANDS
// ============================================

function displayLands() {
    const container = document.getElementById('landsContainer');
    
    // If no lands, show empty message
    if (lands.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #999;">No land areas added yet. Add one to get started!</p>';
        return;
    }

    // Create HTML for all lands
    container.innerHTML = lands.map(land => createLandCardHTML(land)).join('');
}

// ============================================
// ADD LAND AREA
// ============================================

function addLand(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('landName').value.trim();
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    const area = parseFloat(document.getElementById('areaSlider').value);
    const soilHealth = parseFloat(document.getElementById('soilSlider').value);
    const moisture = parseFloat(document.getElementById('moistureSlider').value);
    const temperature = parseFloat(document.getElementById('tempSlider').value);
    const trees = parseInt(document.getElementById('treesInput').value);

    // Validate
    if (!name) {
        alert('❌ Please enter a land name!');
        return;
    }

    // Calculate NDVI (based on soil health)
    const ndvi = 0.4 + (soilHealth / 100) * 0.3;

    // Create new land object
    const newLand = {
        id: Date.now(),
        name,
        latitude,
        longitude,
        area,
        soilHealth,
        moisture,
        temperature,
        trees,
        ndvi,
        realTimeData: generateRealTimeData()
    };

    // Add to database
    lands.push(newLand);

    // Refresh display
    displayLands();

    // Reset form
    document.getElementById('landForm').reset();
    document.getElementById('soilValue').textContent = '50';
    document.getElementById('moistureValue').textContent = '50';
    document.getElementById('tempValue').textContent = '20';
    document.getElementById('areaValue').textContent = '50';
    document.getElementById('treesValue').textContent = '0';

    // Show success message
    alert(`✅ ${name} added successfully!`);
}

// ============================================
// DELETE LAND AREA
// ============================================

function deleteLand(id) {
    if (confirm('🗑️ Are you sure you want to delete this land area?')) {
        // Remove from database
        lands = lands.filter(land => land.id !== id);
        
        // Refresh display
        displayLands();
        
        alert('✅ Land area deleted!');
    }
}

// ============================================
// UPDATE SLIDER VALUES LIVE
// ============================================

function updateSliderValues() {
    // Soil slider
    document.getElementById('soilSlider').addEventListener('input', (e) => {
        document.getElementById('soilValue').textContent = e.target.value;
    });

    // Moisture slider
    document.getElementById('moistureSlider').addEventListener('input', (e) => {
        document.getElementById('moistureValue').textContent = e.target.value;
    });

    // Temperature slider
    document.getElementById('tempSlider').addEventListener('input', (e) => {
        document.getElementById('tempValue').textContent = e.target.value;
    });

    // Area slider
    document.getElementById('areaSlider').addEventListener('input', (e) => {
        document.getElementById('areaValue').textContent = e.target.value;
    });

    // Trees input
    document.getElementById('treesInput').addEventListener('input', (e) => {
        document.getElementById('treesValue').textContent = e.target.value;
    });
}

// ============================================
// UPDATE REAL-TIME DATA EVERY 5 SECONDS
// ============================================

function updateRealTimeData() {
    setInterval(() => {
        // Update weather data for all lands
        lands.forEach(land => {
            land.realTimeData = generateRealTimeData();
        });

        // Refresh display
        displayLands();
    }, 5000);
}

// ============================================
// INITIALIZATION - Run when page loads
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌍 Smart Land Guardian AI - Loaded!');

    // Display initial lands
    displayLands();

    // Setup form submission
    document.getElementById('landForm').addEventListener('submit', addLand);

    // Update slider values
    updateSliderValues();

    // Start real-time data updates
    updateRealTimeData();

    console.log('✅ All systems ready!');
});