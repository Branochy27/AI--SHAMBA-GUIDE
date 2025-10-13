// 🤖 AI Calculations

function calculateHealthScore(soil, moisture, temp, trees, area) {
  let score = 0;
  
  // Soil (25 points)
  if (soil >= 80) score += 25;
  else if (soil >= 60) score += 18;
  else if (soil >= 40) score += 10;
  else score += 5;
  
  // Moisture (25 points)
  if (moisture >= 45 && moisture <= 70) score += 25;
  else if (moisture < 30) score += 5;
  else if (moisture > 80) score += 10;
  else score += 15;
  
  // Temperature (20 points)
  if (temp >= 18 && temp <= 28) score += 20;
  else if (temp < 10 || temp > 35) score += 5;
  else score += 12;
  
  // Trees (15 points)
  const treeDensity = trees / area;
  if (treeDensity >= 3) score += 15;
  else if (treeDensity >= 1) score += 10;
  else score += 5;
  
  // Base (15 points)
  score += 15;
  
  return Math.min(Math.max(score, 0), 100);
}

function generateRecommendations(soil, moisture, temp, ndvi) {
  const recommendations = [];
  
  if (soil < 50) {
    recommendations.push({
      action: 'Add organic matter',
      priority: 'high',
      timeframe: '1 week'
    });
  }
  
  if (moisture < 30) {
    recommendations.push({
      action: 'Turn on irrigation',
      priority: 'high',
      timeframe: 'immediately'
    });
  }
  
  if (temp > 35) {
    recommendations.push({
      action: 'Provide shade',
      priority: 'medium',
      timeframe: '2 days'
    });
  }
  
  return recommendations;
}

module.exports = {
  calculateHealthScore,
  generateRecommendations
};