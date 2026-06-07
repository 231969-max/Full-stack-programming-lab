const mongoose = require('mongoose');

const FollowUpSchema = new mongoose.Schema({
  visitDate: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Missed'],
    default: 'Scheduled',
  },
});

const TreatmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
  diagnosis: {
    type: String,
    required: [true, 'Please provide a diagnosis'],
    trim: true,
  },
  treatmentStatus: {
    type: String,
    enum: ['Under Treatment', 'Recovered', 'Discharged'],
    default: 'Under Treatment',
  },
  physicalCheckup: {
    temperature: { type: String, default: '' },
    bloodPressure: { type: String, default: '' },
    heartRate: { type: String, default: '' },
    weight: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
  followUps: [FollowUpSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp on modifications
TreatmentSchema.pre('save', function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Treatment', TreatmentSchema);
