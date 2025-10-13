// 🔮 Prediction Model - Stores AI predictions

const mongoose = require('mongoose');
// create a schema
const predictionSchema = new mongoose.Schema(
  {
    landId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Land',
      required: true
    },
    predictionType: {
      type: String,
      enum: ['drought', 'flood', 'disease', 'pest', 'frost'],
      required: true
    },
    confidenceScore: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    },
    predictedDate: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    recommendations: [{
      action: String,
      priority: String,
      timeframe: String
    }],
    status: {
      type: String,
      enum: ['active', 'occurred', 'prevented'],
      default: 'active'
    },
    isAccurate: {
      type: Boolean,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Prediction', predictionSchema);