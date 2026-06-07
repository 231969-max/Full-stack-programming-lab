const Treatment = require('../models/Treatment');
const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Notification = require('../models/Notification');

// Helper to create notifications (Mongoose)
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

// @desc    Initiate/Create a treatment record for an appointment
// @route   POST /api/treatments
// @access  Private (Doctor only)
exports.createTreatment = async (req, res) => {
  const { appointmentId, diagnosis, physicalCheckup } = req.body;

  if (!appointmentId || !diagnosis) {
    return res.status(400).json({
      success: false,
      message: 'Please provide appointmentId and initial diagnosis.',
    });
  }

  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const app = mockDb.appointments.find(a => a._id === appointmentId);
      if (!app) return res.status(404).json({ success: false, message: 'Linked appointment not found.' });

      const doctorProfile = mockDb.doctors.find(d => d.user === req.user._id);
      if (!doctorProfile || app.doctor !== doctorProfile._id) {
        return res.status(403).json({ success: false, message: 'Access denied. Doctor mismatch.' });
      }

      const treatmentExists = mockDb.treatments.find(t => t.appointment === appointmentId);
      if (treatmentExists) {
        return res.status(400).json({ success: false, message: 'A treatment cycle has already been initiated.' });
      }

      const treatment = mockDb.createTreatment({
        patient: app.patient,
        doctor: doctorProfile._id,
        appointment: appointmentId,
        diagnosis,
        physicalCheckup: physicalCheckup || { temperature: '', bloodPressure: '', heartRate: '', weight: '', notes: '' }
      });

      // Update appointment status to Completed
      app.status = 'Completed';

      // Create Notification
      const pProfile = mockDb.patients.find(p => p._id === app.patient);
      mockDb.createNotification(
        pProfile.user,
        'Treatment Cycle Started',
        `Dr. ${req.user.name} has initiated an active treatment cycle for your diagnosis: "${diagnosis}".`,
        'Appointment'
      );

      return res.status(201).json({
        success: true,
        message: 'Treatment cycle successfully initiated.',
        data: treatment,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    // Check if appointment exists
    const appointment = await Appointment.findById(appointmentId)
      .populate('patient')
      .populate('doctor');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Linked appointment not found.',
      });
    }

    // Verify doctor matches the appointment doctor
    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    if (!doctorProfile || appointment.doctor._id.toString() !== doctorProfile._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only start treatment for patients assigned to you.',
      });
    }

    // Check if a treatment already exists for this appointment
    const treatmentExists = await Treatment.findOne({ appointment: appointmentId });
    if (treatmentExists) {
      return res.status(400).json({
        success: false,
        message: 'A treatment cycle has already been initiated for this appointment.',
      });
    }

    // Create Treatment Record
    const treatment = await Treatment.create({
      patient: appointment.patient._id,
      doctor: doctorProfile._id,
      appointment: appointmentId,
      diagnosis,
      treatmentStatus: 'Under Treatment',
      physicalCheckup: physicalCheckup || {
        temperature: '',
        bloodPressure: '',
        heartRate: '',
        weight: '',
        notes: '',
      },
      followUps: [],
    });

    // Mark appointment as Completed
    appointment.status = 'Completed';
    await appointment.save();

    // Fetch patient base user account for notification
    const pProfile = await Patient.findById(appointment.patient._id).populate('user', '_id name');
    
    await createNotificationHelper(
      pProfile.user._id,
      'Treatment Cycle Started',
      `Dr. ${req.user.name} has initiated an active treatment cycle for your diagnosis: "${diagnosis}". Check your records panel.`,
      'Appointment'
    );

    return res.status(201).json({
      success: true,
      message: 'Treatment cycle successfully initiated.',
      data: treatment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to initiate treatment: ${error.message}`,
    });
  }
};

// @desc    Get treatment records
// @route   GET /api/treatments
// @access  Private
exports.getTreatments = async (req, res) => {
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

      const treatList = mockDb.findTreatments(query);
      return res.status(200).json({
        success: true,
        count: treatList.length,
        data: treatList,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    let query = {};

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

    const treatments = await Treatment.find(query)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'name email' },
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name email specialization department' },
      })
      .populate('appointment')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: treatments.length,
      data: treatments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch treatment records: ${error.message}`,
    });
  }
};

// @desc    Get single treatment by ID
// @route   GET /api/treatments/:id
// @access  Private
exports.getTreatmentById = async (req, res) => {
  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const treat = mockDb.findTreatmentById(req.params.id);
      if (!treat) {
        return res.status(404).json({ success: false, message: 'Treatment record not found.' });
      }
      return res.status(200).json({ success: true, data: treat });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const treatment = await Treatment.findById(req.params.id)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'name email age gender phone address' },
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name email specialization department' },
      })
      .populate('appointment');

    if (!treatment) {
      return res.status(404).json({
        success: false,
        message: 'Treatment record not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: treatment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch treatment details: ${error.message}`,
    });
  }
};

// @desc    Update treatment stats, checkups and status (Doctor only)
// @route   PUT /api/treatments/:id
// @access  Private (Doctor only)
exports.updateTreatment = async (req, res) => {
  const { diagnosis, treatmentStatus, physicalCheckup } = req.body;

  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const treat = mockDb.treatments.find(t => t._id === req.params.id);
      if (!treat) return res.status(404).json({ success: false, message: 'Treatment record not found.' });

      const doctorProfile = mockDb.doctors.find(d => d.user === req.user._id);
      if (!doctorProfile || treat.doctor !== doctorProfile._id) {
        return res.status(403).json({ success: false, message: 'Access denied.' });
      }

      if (diagnosis !== undefined) treat.diagnosis = diagnosis;
      if (treatmentStatus !== undefined) treat.treatmentStatus = treatmentStatus;
      if (physicalCheckup !== undefined) {
        treat.physicalCheckup = {
          ...treat.physicalCheckup,
          ...physicalCheckup,
        };
      }
      treat.updatedAt = new Date();

      // Notify
      const pProfile = mockDb.patients.find(p => p._id === treat.patient);
      mockDb.createNotification(
        pProfile.user,
        'Treatment Record Updated',
        `Dr. ${req.user.name} has updated your treatment details. Status: ${treat.treatmentStatus}.`,
        'Appointment'
      );

      return res.status(200).json({
        success: true,
        message: 'Treatment record updated successfully.',
        data: mockDb.findTreatmentById(treat._id),
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const treatment = await Treatment.findById(req.params.id);
    if (!treatment) {
      return res.status(404).json({
        success: false,
        message: 'Treatment record not found.',
      });
    }

    // Verify doctor matches
    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    if (!doctorProfile || treatment.doctor.toString() !== doctorProfile._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only update treatments of patients assigned to you.',
      });
    }

    // Update fields
    if (diagnosis !== undefined) treatment.diagnosis = diagnosis;
    if (treatmentStatus !== undefined) treatment.treatmentStatus = treatmentStatus;
    if (physicalCheckup !== undefined) {
      treatment.physicalCheckup = {
        ...treatment.physicalCheckup,
        ...physicalCheckup,
      };
    }

    await treatment.save();

    // Notify patient
    const pProfile = await Patient.findById(treatment.patient).populate('user', '_id name');
    await createNotificationHelper(
      pProfile.user._id,
      'Treatment Record Updated',
      `Dr. ${req.user.name} has updated your treatment details. Status: ${treatment.treatmentStatus}.`,
      'Appointment'
    );

    return res.status(200).json({
      success: true,
      message: 'Treatment record updated successfully.',
      data: treatment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update treatment details: ${error.message}`,
    });
  }
};

// @desc    Schedule a follow-up visit (Doctor only)
// @route   POST /api/treatments/:id/followups
// @access  Private (Doctor only)
exports.scheduleFollowUp = async (req, res) => {
  const { visitDate, notes } = req.body;

  if (!visitDate) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a scheduled visit date.',
    });
  }

  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const treat = mockDb.treatments.find(t => t._id === req.params.id);
      if (!treat) return res.status(404).json({ success: false, message: 'Treatment record not found.' });

      const doctorProfile = mockDb.doctors.find(d => d.user === req.user._id);
      if (!doctorProfile || treat.doctor !== doctorProfile._id) {
        return res.status(403).json({ success: false, message: 'Access denied.' });
      }

      const newFollowUp = {
        _id: `followup_${Date.now()}`,
        visitDate: new Date(visitDate),
        notes: notes || '',
        status: 'Scheduled',
      };
      treat.followUps.push(newFollowUp);

      // Create Notification Reminder
      const pProfile = mockDb.patients.find(p => p._id === treat.patient);
      mockDb.createNotification(
        pProfile.user,
        'Follow-Up Scheduled',
        `A new follow-up appointment has been scheduled with Dr. ${req.user.name} for ${new Date(visitDate).toLocaleDateString()}. Please attend.`,
        'FollowUp'
      );

      return res.status(200).json({
        success: true,
        message: 'Follow-up visit scheduled successfully.',
        data: mockDb.findTreatmentById(treat._id),
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const treatment = await Treatment.findById(req.params.id);
    if (!treatment) {
      return res.status(404).json({
        success: false,
        message: 'Treatment record not found.',
      });
    }

    // Verify doctor
    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    if (!doctorProfile || treatment.doctor.toString() !== doctorProfile._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.',
      });
    }

    // Append follow-up
    treatment.followUps.push({
      visitDate,
      notes: notes || '',
      status: 'Scheduled',
    });

    await treatment.save();

    // Create Notification Reminder
    const pProfile = await Patient.findById(treatment.patient).populate('user', '_id name');
    await createNotificationHelper(
      pProfile.user._id,
      'Follow-Up Scheduled',
      `A new follow-up appointment has been scheduled with Dr. ${req.user.name} for ${new Date(visitDate).toLocaleDateString()}. Please attend.`,
      'FollowUp'
    );

    return res.status(200).json({
      success: true,
      message: 'Follow-up visit scheduled successfully.',
      data: treatment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to schedule follow-up: ${error.message}`,
    });
  }
};

// =========================================================================
// PRESCRIPTIONS
// =========================================================================

// @desc    Create prescription (Doctor only)
// @route   POST /api/prescriptions
// @access  Private (Doctor only)
exports.addPrescription = async (req, res) => {
  const { appointmentId, medications, notes } = req.body;

  if (!appointmentId || !medications || !Array.isArray(medications) || medications.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please provide appointmentId and a list of medications with dosage details.',
    });
  }

  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const app = mockDb.appointments.find(a => a._id === appointmentId);
      if (!app) return res.status(404).json({ success: false, message: 'Appointment not found.' });

      const doctorProfile = mockDb.doctors.find(d => d.user === req.user._id);
      if (!doctorProfile || app.doctor !== doctorProfile._id) {
        return res.status(403).json({ success: false, message: 'Access denied.' });
      }

      const prescription = mockDb.createPrescription({
        patient: app.patient,
        doctor: doctorProfile._id,
        appointment: appointmentId,
        medications,
        notes: notes || '',
      });

      const pProfile = mockDb.patients.find(p => p._id === app.patient);
      
      const medsNames = medications.map(m => m.name).join(', ');
      mockDb.createNotification(
        pProfile.user,
        'New Prescription Added',
        `Dr. ${req.user.name} has prescribed: ${medsNames}. Check your dosage schedules.`,
        'Medication'
      );

      for (let med of medications) {
        mockDb.createNotification(
          pProfile.user,
          `Medication Reminder: ${med.name}`,
          `Take ${med.dosage} (${med.frequency}) for the next ${med.duration}.`,
          'Medication'
        );
      }

      return res.status(201).json({
        success: true,
        message: 'Prescription added successfully.',
        data: prescription,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.',
      });
    }

    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    if (!doctorProfile || appointment.doctor.toString() !== doctorProfile._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.',
      });
    }

    // Create Prescription
    const prescription = await Prescription.create({
      patient: appointment.patient,
      doctor: doctorProfile._id,
      appointment: appointmentId,
      medications,
      notes: notes || '',
    });

    // Notify patient about new prescriptions
    const pProfile = await Patient.findById(appointment.patient).populate('user', '_id name');
    
    // Add dynamic notification message
    const medsNames = medications.map(m => m.name).join(', ');
    await createNotificationHelper(
      pProfile.user._id,
      'New Prescription Added',
      `Dr. ${req.user.name} has prescribed: ${medsNames}. Check your dosage schedules under Prescriptions.`,
      'Medication'
    );

    // Create individual medication timers
    for (let med of medications) {
      await createNotificationHelper(
        pProfile.user._id,
        `Medication Reminder: ${med.name}`,
        `Take ${med.dosage} (${med.frequency}) for the next ${med.duration}.`,
        'Medication'
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Prescription added successfully.',
      data: prescription,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to add prescription: ${error.message}`,
    });
  }
};

// @desc    Get prescriptions
// @route   GET /api/prescriptions
// @access  Private
exports.getPrescriptions = async (req, res) => {
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

      const prescList = mockDb.findPrescriptions(query);
      return res.status(200).json({
        success: true,
        count: prescList.length,
        data: prescList,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    let query = {};

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

    const prescriptions = await Prescription.find(query)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'name email' },
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'name email specialization department' },
      })
      .populate('appointment')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch prescriptions: ${error.message}`,
    });
  }
};

// @desc    Get comprehensive medical history of a patient
// @route   GET /api/treatments/patient/:patientId/history
// @access  Private
exports.getMedicalHistory = async (req, res) => {
  const patientId = req.params.patientId;

  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      if (req.user.role === 'Patient') {
        const selfPatient = mockDb.patients.find(p => p.user === req.user._id);
        if (!selfPatient || selfPatient._id !== patientId) {
          return res.status(403).json({ success: false, message: 'Access denied.' });
        }
      }

      const patient = mockDb.findPatientById(patientId);
      if (!patient) return res.status(404).json({ success: false, message: 'Patient profile not found.' });

      const treatments = mockDb.findTreatments({ patient: patientId });
      const prescriptions = mockDb.findPrescriptions({ patient: patientId });
      const appointments = mockDb.findAppointments({ patient: patientId });

      return res.status(200).json({
        success: true,
        data: {
          patient,
          treatments,
          prescriptions,
          appointments,
        },
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    // Permissions check: Patients can only fetch their own history
    if (req.user.role === 'Patient') {
      const selfPatient = await Patient.findOne({ user: req.user._id });
      if (!selfPatient || selfPatient._id.toString() !== patientId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only view your own medical record vault.',
        });
      }
    }

    const patient = await Patient.findById(patientId)
      .populate('user', 'name email age gender phone address')
      .populate({
        path: 'assignedDoctor',
        populate: { path: 'user', select: 'name specialization' }
      });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found.',
      });
    }

    // Get all completed treatments
    const treatments = await Treatment.find({ patient: patientId })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name specialization' } })
      .populate('appointment')
      .sort({ createdAt: -1 });

    // Get all prescriptions
    const prescriptions = await Prescription.find({ patient: patientId })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name specialization' } })
      .populate('appointment')
      .sort({ createdAt: -1 });

    // Get all appointments
    const appointments = await Appointment.find({ patient: patientId })
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name specialization' } })
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      data: {
        patient,
        treatments,
        prescriptions,
        appointments,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch patient history: ${error.message}`,
    });
  }
};
