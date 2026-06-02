const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  experience: {
    type: Number,
    min: [0, 'Experience cannot be negative'],
    default: 0,
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
  },
  availabilityStatus: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Doctor', DoctorSchema);
