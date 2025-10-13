// 🌾 Land Controller - Business logic for lands

const Land = require('../models/land');
const { calculateHealthScore } = require('../utils/ai');

// 📖 GET all lands for a user
exports.getLands = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const lands = await Land.find({ userId })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: lands.length,
      data: lands
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// 📖 GET single land by ID
exports.getLandById = async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    
    if (!land) {
      return res.status(404).json({
        success: false,
        error: 'Land not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: land
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// ➕ CREATE new land
exports.createLand = async (req, res) => {
  try {
    const { name, latitude, longitude, area, cropType } = req.body;
    
    // Calculate initial health score
    const healthScore = calculateHealthScore(50, 50, 20, 0, area);
    
    const land = new Land({
      userId: req.user.id,
      name,
      latitude,
      longitude,
      area,
      cropType,
      healthScore,
      status: healthScore >= 85 ? 'healthy' : 
              healthScore >= 60 ? 'warning' : 'danger'
    });
    
    await land.save();
    
    res.status(201).json({
      success: true,
      data: land,
      message: `✅ ${name} added successfully!`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// 🔄 UPDATE land
exports.updateLand = async (req, res) => {
  try {
    const { soilHealth, moisture, temperature, trees } = req.body;
    
    let land = await Land.findById(req.params.id);
    
    if (!land) {
      return res.status(404).json({
        success: false,
        error: 'Land not found'
      });
    }
    
    // Update values
    if (soilHealth !== undefined) land.soilHealth = soilHealth;
    if (moisture !== undefined) land.moisture = moisture;
    if (temperature !== undefined) land.temperature = temperature;
    if (trees !== undefined) land.trees = trees;
    
    // Recalculate health score
    land.healthScore = calculateHealthScore(
      land.soilHealth,
      land.moisture,
      land.temperature,
      land.trees,
      land.area
    );
    
    land.status = land.healthScore >= 85 ? 'healthy' : 
                  land.healthScore >= 60 ? 'warning' : 'danger';
    
    land.lastUpdated = Date.now();
    
    await land.save();
    
    res.status(200).json({
      success: true,
      data: land
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// 🗑️ DELETE land
exports.deleteLand = async (req, res) => {
  try {
    const land = await Land.findByIdAndDelete(req.params.id);
    
    if (!land) {
      return res.status(404).json({
        success: false,
        error: 'Land not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: '✅ Land deleted successfully!',
      data: land
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};