const mongoose = require('mongoose');

const GeoPointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const TripSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  startLocation: {
    address: String,
    geopoint: GeoPointSchema
  },
  endLocation: {
    address: String,
    geopoint: GeoPointSchema
  },
  waypoints: [{
    location: {
      address: String,
      geopoint: GeoPointSchema
    },
    arrivalTime: Date,
    departureTime: Date
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed', 'cancelled', 'delayed'],
    default: 'planned'
  },
  distance: {
    value: Number,
    unit: {
      type: String,
      enum: ['km', 'mi'],
      default: 'km'
    }
  },
  cargo: [{
    type: String,
    weight: Number,
    unit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg'
    }
  }],
  fuelConsumption: {
    value: Number,
    unit: {
      type: String,
      enum: ['l/100km', 'mpg'],
      default: 'l/100km'
    }
  },
  emissions: {
    co2: Number,
    unit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg'
    }
  },
  autonomyLevel: {
    type: String,
    enum: ['manual', 'assisted', 'highlyAutomated', 'fullyAutonomous'],
    default: 'manual'
  },
  weatherConditions: [{
    time: Date,
    description: String,
    temperature: Number,
    windSpeed: Number
  }],
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  strict: false  // Allows for future expansion without model updates
});

TripSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Trip', TripSchema);