const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecuresecretkey12345_hlapp_secret', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  const { name, email, password, role, ...extraFields } = req.body;

  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    const bcrypt = require('bcryptjs');
    try {
      const existing = mockDb.findUserByEmail(email);
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'A user with this email address already exists.',
        });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = mockDb.createUser({
        name,
        email,
        password: hashedPassword,
        role: role || 'Patient',
      });
      let profile = null;
      if (user.role === 'Patient') {
        profile = mockDb.createPatientProfile({
          user: user._id,
          age: extraFields.age || null,
          gender: extraFields.gender || null,
          phone: extraFields.phone || '',
          address: extraFields.address || '',
          medicalHistory: extraFields.medicalHistory || [],
          assignedDoctor: extraFields.assignedDoctor || null,
        });
      } else if (user.role === 'Doctor') {
        profile = mockDb.createDoctorProfile({
          user: user._id,
          specialization: extraFields.specialization || 'General',
          phone: extraFields.phone || '',
          experience: extraFields.experience || 0,
          department: extraFields.department || 'General Practice',
        });
      }
      const token = generateToken(user._id);
      return res.status(201).json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        profile,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists.',
      });
    }

    // Create Base User (bcrypt hashing runs inside pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Patient', // Defaults to Patient
    });

    let profile = null;

    // Create role-specific profile
    if (user.role === 'Patient') {
      profile = await Patient.create({
        user: user._id,
        age: extraFields.age || null,
        gender: extraFields.gender || null,
        phone: extraFields.phone || '',
        address: extraFields.address || '',
        medicalHistory: extraFields.medicalHistory || [],
        assignedDoctor: extraFields.assignedDoctor || null,
      });
    } else if (user.role === 'Doctor') {
      profile = await Doctor.create({
        user: user._id,
        specialization: extraFields.specialization || 'General',
        phone: extraFields.phone || '',
        experience: extraFields.experience || 0,
        department: extraFields.department || 'General Practice',
        availabilityStatus: true,
      });
    }

    // Generate Token
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      profile,
    });
  } catch (error) {
    console.error(`[Register Error] ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Registration failed: ${error.message}`,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate email & password inputs
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both email and password.',
    });
  }

  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    const bcrypt = require('bcryptjs');
    try {
      const user = mockDb.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. User not found.',
        });
      }
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Password incorrect.',
        });
      }
      const token = generateToken(user._id);
      let profile = null;
      if (user.role === 'Patient') {
        profile = mockDb.findPatientById(user._id);
      } else if (user.role === 'Doctor') {
        profile = mockDb.findDoctorById(user._id);
      }
      return res.status(200).json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        profile,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    // Check for user (explicitly selecting password)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found.',
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Password incorrect.',
      });
    }

    // Generate Token
    const token = generateToken(user._id);

    // Fetch corresponding profile
    let profile = null;
    if (user.role === 'Patient') {
      profile = await Patient.findOne({ user: user._id }).populate({
        path: 'assignedDoctor',
        populate: { path: 'user', select: 'name email' }
      });
    } else if (user.role === 'Doctor') {
      profile = await Doctor.findOne({ user: user._id });
    }

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      profile,
    });
  } catch (error) {
    console.error(`[Login Error] ${error.message}`);
    return res.status(500).json({
      success: false,
      message: `Login failed: ${error.message}`,
    });
  }
};

// @desc    Get current logged in user details
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const user = mockDb.findUserById(req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User session not found.' });
      }
      let profile = null;
      if (user.role === 'Patient') {
        profile = mockDb.findPatientById(user._id);
      } else if (user.role === 'Doctor') {
        profile = mockDb.findDoctorById(user._id);
      }
      return res.status(200).json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        profile,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User session not found.',
      });
    }

    let profile = null;
    if (user.role === 'Patient') {
      profile = await Patient.findOne({ user: user._id })
        .populate({
          path: 'assignedDoctor',
          populate: { path: 'user', select: 'name email' }
        });
    } else if (user.role === 'Doctor') {
      profile = await Doctor.findOne({ user: user._id });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      profile,
    });
  } catch (error) {
    console.error(`[GetMe Error] ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Server error while retrieving profile details.',
    });
  }
};
