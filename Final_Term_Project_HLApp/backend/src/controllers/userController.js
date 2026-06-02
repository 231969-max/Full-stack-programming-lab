const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

// =========================================================================
// DOCTOR CRUD
// =========================================================================

// @desc    Get all doctors
// @route   GET /api/users/doctors
// @access  Private
exports.getDoctors = async (req, res) => {
  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const docList = mockDb.doctors.map(d => mockDb.findDoctorById(d._id));
      return res.status(200).json({
        success: true,
        count: docList.length,
        data: docList,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const doctors = await Doctor.find().populate('user', 'name email role');
    return res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch doctors: ${error.message}`,
    });
  }
};

// @desc    Get single doctor by ID
// @route   GET /api/users/doctors/:id
// @access  Private
exports.getDoctorById = async (req, res) => {
  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const doctor = mockDb.findDoctorById(req.params.id);
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor record not found.',
        });
      }
      return res.status(200).json({
        success: true,
        data: doctor,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const doctor = await Doctor.findById(req.params.id).populate('user', 'name email role');
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor record not found.',
      });
    }
    return res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch doctor: ${error.message}`,
    });
  }
};

// @desc    Create a doctor record (Admin only)
// @route   POST /api/users/doctors
// @access  Private/Admin
exports.createDoctor = async (req, res) => {
  const { name, email, password, specialization, phone, experience, department } = req.body;

  // Basic validation
  if (!name || !email || !password || !specialization || !department) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, password, specialization, and department.',
    });
  }

  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    const bcrypt = require('bcryptjs');
    try {
      const emailExists = mockDb.findUserByEmail(email);
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email address already in use.',
        });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = mockDb.createUser({
        name,
        email,
        password: hashedPassword,
        role: 'Doctor',
      });
      const doctor = mockDb.createDoctorProfile({
        user: user._id,
        specialization,
        phone,
        experience: experience || 0,
        department,
      });
      return res.status(201).json({
        success: true,
        message: 'Doctor record created successfully.',
        data: doctor,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Email address already in use.',
      });
    }

    // Create Base User
    const user = await User.create({
      name,
      email,
      password,
      role: 'Doctor',
    });

    // Create Doctor Profile
    const doctor = await Doctor.create({
      user: user._id,
      specialization,
      phone,
      experience: experience || 0,
      department,
      availabilityStatus: true,
    });

    return res.status(201).json({
      success: true,
      message: 'Doctor record created successfully.',
      data: {
        id: doctor._id,
        user: { id: user._id, name: user.name, email: user.email },
        specialization: doctor.specialization,
        phone: doctor.phone,
        experience: doctor.experience,
        department: doctor.department,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to create doctor: ${error.message}`,
    });
  }
};

// @desc    Update doctor details (Admin only)
// @route   PUT /api/users/doctors/:id
// @access  Private/Admin
exports.updateDoctor = async (req, res) => {
  const { name, email, specialization, phone, experience, department, availabilityStatus } = req.body;

  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const docIndex = mockDb.doctors.findIndex(d => d._id === req.params.id);
      if (docIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Doctor record not found.',
        });
      }
      const doc = mockDb.doctors[docIndex];
      if (specialization !== undefined) doc.specialization = specialization;
      if (phone !== undefined) doc.phone = phone;
      if (experience !== undefined) doc.experience = experience;
      if (department !== undefined) doc.department = department;
      if (availabilityStatus !== undefined) doc.availabilityStatus = availabilityStatus;
      
      const user = mockDb.users.find(u => u._id === doc.user);
      if (user) {
        if (name !== undefined) user.name = name;
        if (email !== undefined) {
          if (email !== user.email) {
            const emailExists = mockDb.users.find(u => u.email === email && u._id !== user._id);
            if (emailExists) {
              return res.status(400).json({
                success: false,
                message: 'Email address already in use.',
              });
            }
            user.email = email;
          }
        }
      }
      return res.status(200).json({
        success: true,
        message: 'Doctor record updated successfully.',
        data: mockDb.findDoctorById(doc._id),
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor record not found.',
      });
    }

    // Update Doctor Profile
    if (specialization !== undefined) doctor.specialization = specialization;
    if (phone !== undefined) doctor.phone = phone;
    if (experience !== undefined) doctor.experience = experience;
    if (department !== undefined) doctor.department = department;
    if (availabilityStatus !== undefined) doctor.availabilityStatus = availabilityStatus;

    await doctor.save();

    // Update User Name and Email
    const user = await User.findById(doctor.user);
    if (user) {
      if (name !== undefined) user.name = name;
      if (email !== undefined) {
        // Ensure email isn't duplicated
        if (email !== user.email) {
          const emailExists = await User.findOne({ email });
          if (emailExists) {
            return res.status(400).json({
              success: false,
              message: 'Email address already in use.',
            });
          }
          user.email = email;
        }
      }
      await user.save();
    }

    const updatedDoctor = await Doctor.findById(req.params.id).populate('user', 'name email role');
    return res.status(200).json({
      success: true,
      message: 'Doctor record updated successfully.',
      data: updatedDoctor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update doctor: ${error.message}`,
    });
  }
};

// @desc    Delete doctor record (Admin only)
// @route   DELETE /api/users/doctors/:id
// @access  Private/Admin
exports.deleteDoctor = async (req, res) => {
  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const docIndex = mockDb.doctors.findIndex(d => d._id === req.params.id);
      if (docIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Doctor record not found.',
        });
      }
      const doc = mockDb.doctors[docIndex];
      const userIndex = mockDb.users.findIndex(u => u._id === doc.user);
      if (userIndex !== -1) mockDb.users.splice(userIndex, 1);
      mockDb.doctors.splice(docIndex, 1);
      
      return res.status(200).json({
        success: true,
        message: 'Doctor record and user login deleted successfully.',
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor record not found.',
      });
    }

    // Delete corresponding base User login
    await User.findByIdAndDelete(doctor.user);
    // Delete doctor profile
    await Doctor.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Doctor record and user login deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete doctor: ${error.message}`,
    });
  }
};

// =========================================================================
// PATIENT CRUD
// =========================================================================

// @desc    Get all patients
// @route   GET /api/users/patients
// @access  Private
exports.getPatients = async (req, res) => {
  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const patList = mockDb.patients.map(p => mockDb.findPatientById(p._id));
      return res.status(200).json({
        success: true,
        count: patList.length,
        data: patList,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const patients = await Patient.find()
      .populate('user', 'name email role')
      .populate({
        path: 'assignedDoctor',
        populate: { path: 'user', select: 'name specialization' }
      });
      
    return res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch patients: ${error.message}`,
    });
  }
};

// @desc    Get single patient by ID
// @route   GET /api/users/patients/:id
// @access  Private
exports.getPatientById = async (req, res) => {
  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const patient = mockDb.findPatientById(req.params.id);
      if (!patient) {
        return res.status(404).json({
          success: false,
          message: 'Patient record not found.',
        });
      }
      return res.status(200).json({
        success: true,
        data: patient,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const patient = await Patient.findById(req.params.id)
      .populate('user', 'name email role')
      .populate({
        path: 'assignedDoctor',
        populate: { path: 'user', select: 'name specialization' }
      });
      
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient record not found.',
      });
    }
    return res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch patient: ${error.message}`,
    });
  }
};

// @desc    Create a patient record (Admin only)
// @route   POST /api/users/patients
// @access  Private/Admin
exports.createPatient = async (req, res) => {
  const { name, email, password, age, gender, phone, address, medicalHistory, assignedDoctor } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and password.',
    });
  }

  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    const bcrypt = require('bcryptjs');
    try {
      const emailExists = mockDb.findUserByEmail(email);
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email address already in use.',
        });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = mockDb.createUser({
        name,
        email,
        password: hashedPassword,
        role: 'Patient',
      });
      const patient = mockDb.createPatientProfile({
        user: user._id,
        age,
        gender,
        phone,
        address,
        medicalHistory: medicalHistory || [],
        assignedDoctor,
      });
      return res.status(201).json({
        success: true,
        message: 'Patient record created successfully.',
        data: patient,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    // Check if email exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Email address already in use.',
      });
    }

    // Create Base User
    const user = await User.create({
      name,
      email,
      password,
      role: 'Patient',
    });

    // Create Patient Profile
    const patient = await Patient.create({
      user: user._id,
      age: age || null,
      gender: gender || null,
      phone: phone || '',
      address: address || '',
      medicalHistory: medicalHistory || [],
      assignedDoctor: assignedDoctor || null,
    });

    return res.status(201).json({
      success: true,
      message: 'Patient record created successfully.',
      data: patient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to create patient: ${error.message}`,
    });
  }
};

// @desc    Update patient details
// @route   PUT /api/users/patients/:id
// @access  Private
exports.updatePatient = async (req, res) => {
  const { name, email, age, gender, phone, address, medicalHistory, assignedDoctor } = req.body;

  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const patIndex = mockDb.patients.findIndex(p => p._id === req.params.id);
      if (patIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Patient record not found.',
        });
      }
      const pat = mockDb.patients[patIndex];
      
      // Role safety
      if (req.user.role === 'Patient') {
        const userPatient = mockDb.patients.find(p => p.user === req.user._id);
        if (!userPatient || userPatient._id !== req.params.id) {
          return res.status(403).json({
            success: false,
            message: 'Access denied. You can only update your own profile details.',
          });
        }
      }

      if (age !== undefined) pat.age = age;
      if (gender !== undefined) pat.gender = gender;
      if (phone !== undefined) pat.phone = phone;
      if (address !== undefined) pat.address = address;
      if (medicalHistory !== undefined) pat.medicalHistory = medicalHistory;
      if (assignedDoctor !== undefined) pat.assignedDoctor = assignedDoctor || null;
      
      const user = mockDb.users.find(u => u._id === pat.user);
      if (user) {
        if (name !== undefined) user.name = name;
        if (email !== undefined) {
          if (email !== user.email) {
            const emailExists = mockDb.users.find(u => u.email === email && u._id !== user._id);
            if (emailExists) {
              return res.status(400).json({
                success: false,
                message: 'Email address already in use.',
              });
            }
            user.email = email;
          }
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Patient record updated successfully.',
        data: mockDb.findPatientById(pat._id),
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient record not found.',
      });
    }

    // Role verification (Admin can edit all, Patient can only edit themselves)
    if (req.user.role === 'Patient') {
      const userPatient = await Patient.findOne({ user: req.user._id });
      if (!userPatient || userPatient._id.toString() !== req.params.id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only update your own profile details.',
        });
      }
    }

    // Update Profile Fields
    if (age !== undefined) patient.age = age;
    if (gender !== undefined) patient.gender = gender;
    if (phone !== undefined) patient.phone = phone;
    if (address !== undefined) patient.address = address;
    if (medicalHistory !== undefined) patient.medicalHistory = medicalHistory;
    if (assignedDoctor !== undefined) patient.assignedDoctor = assignedDoctor || null;

    await patient.save();

    // Update User Fields
    const user = await User.findById(patient.user);
    if (user) {
      if (name !== undefined) user.name = name;
      if (email !== undefined) {
        if (email !== user.email) {
          const emailExists = await User.findOne({ email });
          if (emailExists) {
            return res.status(400).json({
              success: false,
              message: 'Email address already in use.',
            });
          }
          user.email = email;
        }
      }
      await user.save();
    }

    const updatedPatient = await Patient.findById(req.params.id)
      .populate('user', 'name email role')
      .populate('assignedDoctor');

    return res.status(200).json({
      success: true,
      message: 'Patient record updated successfully.',
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update patient: ${error.message}`,
    });
  }
};

// @desc    Delete patient record (Admin only)
// @route   DELETE /api/users/patients/:id
// @access  Private/Admin
exports.deletePatient = async (req, res) => {
  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const patIndex = mockDb.patients.findIndex(p => p._id === req.params.id);
      if (patIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Patient record not found.',
        });
      }
      const pat = mockDb.patients[patIndex];
      const userIndex = mockDb.users.findIndex(u => u._id === pat.user);
      if (userIndex !== -1) mockDb.users.splice(userIndex, 1);
      mockDb.patients.splice(patIndex, 1);

      return res.status(200).json({
        success: true,
        message: 'Patient record and user login deleted successfully.',
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient record not found.',
      });
    }

    // Delete corresponding base User login
    await User.findByIdAndDelete(patient.user);
    // Delete patient profile
    await Patient.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Patient record and user login deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete patient: ${error.message}`,
    });
  }
};
