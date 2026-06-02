const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Medication name is required'],
    trim: true,
  },
  dosage: {
    type: String,
    required: [true, 'Dosage is required (e.g., 500mg)'],
    trim: true,
  },
  frequency: {
    type: String,
    required: [true, 'Frequency is required (e.g., Twice daily)'],
    trim: true,
  },
  duration: {
    type: String,
    required: [true, 'Duration is required (e.g., 7 days)'],
    trim: true,
  },
});

const PrescriptionSchema = new mongoose.Schema({
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
  medications: [MedicationSchema],
  notes: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
