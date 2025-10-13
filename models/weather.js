// 🌡️ Weather Model - Stores weather data

const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema(
  {
    landId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Land',
      required: true
    },
    rainfall: {
      type: Number,
      required: true,
      default: 0
    },
    windSpeed: {
      type: Number,
      required: true,
      default: 0
    },
    humidity: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    temperature: {
      type: Number,
      required: true
    },
    cloudCover: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    pressure: {
      type: Number,
      default: 1013
    },
    uvIndex: {
      type: Number,
      default: 0
    },
    source: {
      type: String,
      enum: ['manual', 'api', 'sensor'],
      default: 'manual'
    },
    recordedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// ✅ Index for faster queries
weatherSchema.index({ landId: 1, recordedAt: -1 });

module.exports = mongoose.model('Weather', weatherSchema);