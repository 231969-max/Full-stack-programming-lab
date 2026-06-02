const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Notification = require('../models/Notification');

// Helper to create a notification (Mongoose)
const createNotificationHelper = async (userId, title, message, type = 'Appointment') => {
  try {
    await Notification.create({
      recipient: userId,
      title,
      message,
      type,
    });
    console.log(`[Notification Alert] Sent to User ID ${userId}: "${title}" - ${message}`);
  } catch (err) {
    console.error(`[Notification Error] Failed to create notification: ${err.message}`);
  }
};

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private (Patient only)
exports.bookAppointment = async (req, res) => {
  const { doctorId, date, timeSlot, reason } = req.body;

  if (!doctorId || !date || !timeSlot || !reason) {
    return res.status(400).json({
      success: false,
      message: 'Please provide doctorId, date, timeSlot, and reason.',
    });
  }

  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const patient = mockDb.patients.find(p => p.user === req.user._id);
      if (!patient) {
        return res.status(404).json({ success: false, message: 'Patient profile not found.' });
      }
      const doctor = mockDb.doctors.find(d => d._id === doctorId);
      if (!doctor) {
        return res.status(404).json({ success: false, message: 'Doctor not found.' });
      }
      
      const appointment = mockDb.createAppointment({
        patient: patient._id,
        doctor: doctor._id,
        date: new Date(date),
        timeSlot,
        reason,
      });

      // Mock Notifications
      const docUser = mockDb.users.find(u => u._id === doctor.user);
      mockDb.createNotification(
        req.user._id,
        'Appointment Booked',
        `Your appointment request with ${docUser ? docUser.name : 'Doctor'} on ${new Date(date).toLocaleDateString()} at ${timeSlot} is now pending approval.`
      );
      mockDb.createNotification(
        doctor.user,
        'New Appointment Request',
        `Patient ${req.user.name} has requested an appointment on ${new Date(date).toLocaleDateString()} at ${timeSlot}.`
      );

      return res.status(201).json({
        success: true,
        message: 'Appointment booked successfully.',
        data: appointment,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    // Find patient record for logged-in user
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found for this user.',
      });
    }

    // Verify doctor exists
    const doctor = await Doctor.findById(doctorId).populate('user', 'name');
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Assigned doctor not found.',
      });
    }

    // Create Appointment
    const appointment = await Appointment.create({
      patient: patient._id,
      doctor: doctor._id,
      date,
      timeSlot,
      reason,
      status: 'Pending',
    });

    // Notify patient and doctor
    await createNotificationHelper(
      req.user._id,
      'Appointment Booked',
      `Your appointment request with ${doctor.user.name} on ${new Date(date).toLocaleDateString()} at ${timeSlot} is now pending approval.`
    );
    await createNotificationHelper(
      doctor.user._id,
      'New Appointment Request',
      `Patient ${req.user.name} has requested an appointment on ${new Date(date).toLocaleDateString()} at ${timeSlot}.`
    );

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully.',
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to book appointment: ${error.message}`,
    });
  }
};

// @desc    Get appointments list
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      let query = {};
      if (req.user.role === 'Patient') {
        const patient = mockDb.patients.find(p => p.user === req.user._id);
        if (!patient) return res.status(200).json({ success: true, count: 0, data: [] });
        query = { patient: patient._id };
      } else if (req.user.role === 'Doctor') {
        const doctor = mockDb.doctors.find(d => d.user === req.user._id);
        if (!doctor) return res.status(200).json({ success: true, count: 0, data: [] });
        query = { doctor: doctor._id };
      }
      
      const appList = mockDb.findAppointments(query);
      return res.status(200).json({
        success: true,
        count: appList.length,
        data: appList,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    let query = {};

    // Filter appointments based on user role
    if (req.user.role === 'Patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (!patient) {
        return res.status(200).json({ success: true, count: 0, data: [] });
      }
      query = { patient: patient._id };
    } else if (req.user.role === 'Doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (!doctor) {
        return res.status(200).json({ success: true, count: 0, data: [] });
      }
      query = { doctor: doctor._id };
    }

    const appointments = await Appointment.find(query)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'name email' },
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name email specialization department' },
      })
      .sort({ date: 1, timeSlot: 1 });

    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch appointments: ${error.message}`,
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointmentById = async (req, res) => {
  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const app = mockDb.findAppointmentById(req.params.id);
      if (!app) {
        return res.status(404).json({ success: false, message: 'Appointment not found.' });
      }
      return res.status(200).json({ success: true, data: app });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'name email' },
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name email specialization department' },
      });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch appointment details: ${error.message}`,
    });
  }
};

// @desc    Approve/Reject/Assign Doctor to appointment
// @route   PUT /api/appointments/:id/status
// @access  Private (Admin or Doctor only)
exports.updateAppointmentStatus = async (req, res) => {
  const { status, doctorId } = req.body;

  if (!status || !['Approved', 'Rejected', 'Completed'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid status: Approved, Rejected, or Completed.',
    });
  }

  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const app = mockDb.appointments.find(a => a._id === req.params.id);
      if (!app) return res.status(404).json({ success: false, message: 'Appointment not found.' });

      if (req.user.role === 'Doctor') {
        const doctor = mockDb.doctors.find(d => d.user === req.user._id);
        if (!doctor || app.doctor !== doctor._id) {
          return res.status(403).json({ success: false, message: 'Access denied.' });
        }
      }

      if (doctorId && req.user.role === 'Admin') {
        const newDoc = mockDb.doctors.find(d => d._id === doctorId);
        if (!newDoc) return res.status(404).json({ success: false, message: 'Doctor not found.' });
        app.doctor = newDoc._id;
      }

      app.status = status;

      const pProfile = mockDb.patients.find(p => p._id === app.patient);
      const dProfile = mockDb.doctors.find(d => d._id === app.doctor);
      const docUser = mockDb.users.find(u => u._id === dProfile.user);

      mockDb.createNotification(
        pProfile.user,
        `Appointment ${status}`,
        `Your appointment with ${docUser ? docUser.name : 'Doctor'} on ${new Date(app.date).toLocaleDateString()} has been ${status.toLowerCase()}.`
      );

      return res.status(200).json({
        success: true,
        message: `Appointment status successfully updated to ${status}.`,
        data: mockDb.findAppointmentById(app._id),
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({ path: 'patient', populate: { path: 'user', select: 'name' } })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name' } });
      
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.',
      });
    }

    // Role safety checks: Doctor can only update their own appointments
    if (req.user.role === 'Doctor') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (!doctor || appointment.doctor.toString() !== doctor._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only update your own appointment status.',
        });
      }
    }

    // Assign a new doctor if provided (Admin only)
    if (doctorId && req.user.role === 'Admin') {
      const newDoctor = await Doctor.findById(doctorId);
      if (!newDoctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor to assign not found.',
        });
      }
      appointment.doctor = newDoctor._id;
    }

    appointment.status = status;
    await appointment.save();

    // Fetch refreshed patient/doctor user accounts for notifications
    const pProfile = await Patient.findById(appointment.patient).populate('user', '_id name');
    const dProfile = await Doctor.findById(appointment.doctor).populate('user', '_id name');

    // Create Notification
    let title = `Appointment ${status}`;
    let message = `Your appointment with ${dProfile.user.name} on ${new Date(
      appointment.date
    ).toLocaleDateString()} has been ${status.toLowerCase()}.`;
    
    await createNotificationHelper(pProfile.user._id, title, message, 'Appointment');

    return res.status(200).json({
      success: true,
      message: `Appointment status successfully updated to ${status}.`,
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update appointment: ${error.message}`,
    });
  }
};
