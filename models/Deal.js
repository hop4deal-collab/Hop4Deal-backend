const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  season: {
    type: mongoose.Schema.Types.ObjectId
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  code: {
    type: String,
    trim: true
  },
   link: {
    type: String,
    required: true,
    trim: true
  },
   type: {
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  percentOff: {
    type: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isHot: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for efficient querying
dealSchema.index({ brand: 1, isActive: 1 });
dealSchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model('Deal', dealSchema);

