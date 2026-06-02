const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true, // A doctor must be assigned or selected
  },
  date: {
    type: Date,
    required: [true, 'Please provide an appointment date'],
  },
  timeSlot: {
    type: String,
    required: [true, 'Please provide a time slot'],
  },
  reason: {
    type: String,
    required: [true, 'Please state the reason for appointment'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Completed'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
