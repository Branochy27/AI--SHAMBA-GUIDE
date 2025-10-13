// ⚠️ Alert Model - Stores system alerts

const mongoose = require('mongoose');

// create a schema
const alertSchema = new mongoose.Schema(
  {
    landId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Land',
      required: true
    },
    alertType: {
      type: String,
      enum: ['soil', 'water', 'temperature', 'pest', 'disease', 'other'],
      required: true
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    isResolved: {
      type: Boolean,
      default: false
    },
    resolvedAt: {
      type: Date,
      default: null
    },
    actionTaken: {
      type: String,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alert', alertSchema);