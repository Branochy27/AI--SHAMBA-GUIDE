// 🌾 Land Model - Stores farm information

const mongoose = require('mongoose');
// create a schema
const landSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Please provide a land name'],
      trim: true
    },
    latitude: {
      type: Number,
      required: [true, 'Please provide latitude']
    },
    longitude: {
      type: Number,
      required: [true, 'Please provide longitude']
    },
    area: {
      type: Number,
      required: [true, 'Please provide area in hectares']
    },
    soilHealth: {
      type: Number,
      default: 50,
      min: 0,
      max: 100
    },
    moisture: {
      type: Number,
      default: 50,
      min: 0,
      max: 100
    },
    temperature: {
      type: Number,
      default: 20,
      min: -50,
      max: 60
    },
    trees: {
      type: Number,
      default: 0,
      min: 0
    },
    ndvi: {
      type: Number,
      default: 0.4,
      min: 0,
      max: 1
    },
    status: {
      type: String,
      enum: ['healthy', 'warning', 'danger'],
      default: 'healthy'
    },
    healthScore: {
      type: Number,
      default: 50,
      min: 0,
      max: 100
    },
    cropType: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// ✅ Index for faster queries
landSchema.index({ userId: 1 });
landSchema.index({ status: 1 });

module.exports = mongoose.model('Land', landSchema);