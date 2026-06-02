const bcrypt = require('bcryptjs');

// Mock Data Arrays
const users = [];
const doctors = [];
const patients = [];
const appointments = [];
const treatments = [];
const prescriptions = [];
const notifications = [];

// Seed data generators
const doctorsData = [
  { name: 'Dr. John Smith', specialization: 'Cardiology', department: 'Heart Care Center', experience: 12, phone: '+1-555-0101' },
  { name: 'Dr. Sarah Connor', specialization: 'Pediatrics', department: 'Children Health', experience: 8, phone: '+1-555-0102' },
  { name: 'Dr. Alan Grant', specialization: 'Orthopedics', department: 'Bone Joint Clinic', experience: 15, phone: '+1-555-0103' },
  { name: 'Dr. Ellen Ripley', specialization: 'Neurology', department: 'Brain Science Dept', experience: 10, phone: '+1-555-0104' },
  { name: 'Dr. Bruce Banner', specialization: 'Endocrinology', department: 'Hormonal Health', experience: 9, phone: '+1-555-0105' },
  { name: 'Dr. Clara Oswald', specialization: 'Dermatology', department: 'Skin Wellness Clinic', experience: 6, phone: '+1-555-0106' },
  { name: 'Dr. Charles Xavier', specialization: 'Psychiatry', department: 'Mental Health Services', experience: 20, phone: '+1-555-0107' },
  { name: 'Dr. Dana Scully', specialization: 'Pathology', department: 'Diagnostic Labs', experience: 11, phone: '+1-555-0108' },
  { name: 'Dr. Stephen Strange', specialization: 'Neurosurgery', department: 'Advanced Surgical Clinic', experience: 14, phone: '+1-555-0109' },
  { name: 'Dr. Gregory House', specialization: 'Internal Medicine', department: 'Diagnostics Division', experience: 18, phone: '+1-555-0110' },
  { name: 'Dr. Beverly Crusher', specialization: 'General Practice', department: 'Family Health Center', experience: 16, phone: '+1-555-0111' },
  { name: 'Dr. Leonard McCoy', specialization: 'General Surgery', department: 'Emergency Medicine', experience: 17, phone: '+1-555-0112' },
  { name: 'Dr. Amy Farrah', specialization: 'Neurobiology', department: 'Brain Science Dept', experience: 7, phone: '+1-555-0113' },
  { name: 'Dr. Julius Hibbert', specialization: 'Family Medicine', department: 'Family Health Center', experience: 13, phone: '+1-555-0114' },
  { name: 'Dr. Nick Riviera', specialization: 'General Practice', department: 'Low Cost Clinic', experience: 4, phone: '+1-555-0115' },
];

const patientsData = [
  { name: 'Alice Cooper', age: 34, gender: 'Female', phone: '+1-555-0201', address: '123 Main St, Springfield', medicalHistory: ['Seasonal Allergies'] },
  { name: 'Bob Marley', age: 45, gender: 'Male', phone: '+1-555-0202', address: '456 Reggae Ave, Kingston', medicalHistory: ['Hypertension'] },
  { name: 'Charlie Brown', age: 29, gender: 'Male', phone: '+1-555-0203', address: '789 Kite Ln, Minneapolis', medicalHistory: ['Asthma'] },
  { name: 'Diana Prince', age: 32, gender: 'Female', phone: '+1-555-0204', address: '101 Themyscira Blvd, DC', medicalHistory: [] },
  { name: 'Edward Elric', age: 24, gender: 'Male', phone: '+1-555-0205', address: '202 Alchemy Rd, Resembool', medicalHistory: ['Amputation Rehabilitation'] },
  { name: 'Fiona Gallagher', age: 28, gender: 'Female', phone: '+1-555-0206', address: '303 South Side St, Chicago', medicalHistory: ['Chronic Stress'] },
  { name: 'George Costanza', age: 52, gender: 'Male', phone: '+1-555-0207', address: '404 Queens Plaza, New York', medicalHistory: ['Anxiety', 'Acid Reflux'] },
  { name: 'Harry Potter', age: 38, gender: 'Male', phone: '+1-555-0208', address: '4 Privet Drive, Surrey', medicalHistory: ['Scar Inflammation'] },
  { name: 'Iris West', age: 30, gender: 'Female', phone: '+1-555-0209', address: '505 Central City Way', medicalHistory: [] },
  { name: 'Jack Sparrow', age: 41, gender: 'Male', phone: '+1-555-0210', address: '606 Tortuga Cove, Caribbean', medicalHistory: ['Dehydration'] },
  { name: 'Kate Austen', age: 35, gender: 'Female', phone: '+1-555-0211', address: '707 Oceanic Way, Island', medicalHistory: ['Mild Trauma'] },
  { name: 'Luke Skywalker', age: 26, gender: 'Male', phone: '+1-555-0212', address: '808 Tatooine Dunes, Anchorhead', medicalHistory: ['Prosthetic Hand Checkup'] },
  { name: 'Mona Lisa', age: 31, gender: 'Female', phone: '+1-555-0213', address: '909 Louvre Gallery, Paris', medicalHistory: [] },
  { name: 'Neo Anderson', age: 36, gender: 'Male', phone: '+1-555-0214', address: '111 Matrix Loop, Nebuchadnezzar', medicalHistory: ['Insomnia', 'Chronic Neck Pain'] },
  { name: 'Olivia Benson', age: 48, gender: 'Female', phone: '+1-555-0215', address: '222 Plaza Ave, Manhattan', medicalHistory: ['Minor Joint Pain'] },
];

let isInitialized = false;

// Prepopulate function
const initializeMockDB = () => {
  if (isInitialized) return;
  
  console.log('[Mock DB] Initializing in-memory tables and seeding records...');
  
  // Use a pre-hashed password string for speed ("password123")
  const hashedPassword = bcrypt.hashSync('password123', 10);

  // 1. Create Admin
  const adminId = 'admin_user_id_100';
  users.push({
    _id: adminId,
    name: 'System Administrator',
    email: 'admin@hlapp.com',
    password: hashedPassword,
    role: 'Admin',
    createdAt: new Date(),
  });

  // 2. Create Doctors
  doctorsData.forEach((doc, index) => {
    const docUserId = `doctor_user_id_${index + 1}`;
    const docProfileId = `doctor_profile_id_${index + 1}`;
    const email = `doctor${index + 1}@hlapp.com`;
    
    users.push({
      _id: docUserId,
      name: doc.name,
      email: email,
      password: hashedPassword,
      role: 'Doctor',
      createdAt: new Date(),
    });

    doctors.push({
      _id: docProfileId,
      user: docUserId,
      specialization: doc.specialization,
      phone: doc.phone,
      experience: doc.experience,
      department: doc.department,
      availabilityStatus: true,
    });
  });

  // 3. Create Patients
  patientsData.forEach((pat, index) => {
    const patUserId = `patient_user_id_${index + 1}`;
    const patProfileId = `patient_profile_id_${index + 1}`;
    const email = `patient${index + 1}@hlapp.com`;
    
    users.push({
      _id: patUserId,
      name: pat.name,
      email: email,
      password: hashedPassword,
      role: 'Patient',
      createdAt: new Date(),
    });

    // Circular doctor assignment
    const docProfile = doctors[index % doctors.length];

    patients.push({
      _id: patProfileId,
      user: patUserId,
      age: pat.age,
      gender: pat.gender,
      phone: pat.phone,
      address: pat.address,
      medicalHistory: pat.medicalHistory,
      assignedDoctor: docProfile._id,
    });
  });

  // Seed 2 initial Pending appointments for demo purposes
  const demoPatient = patients[0];
  const demoDoctor = doctors[0];
  appointments.push({
    _id: 'app_id_demo_1',
    patient: demoPatient._id,
    doctor: demoDoctor._id,
    date: new Date(Date.now() + 86400000 * 2), // 2 days from now
    timeSlot: '10:00 AM - 10:30 AM',
    reason: 'Routine cardiovascular checkup and prescription refill.',
    status: 'Pending',
    createdAt: new Date(),
  });

  appointments.push({
    _id: 'app_id_demo_2',
    patient: patients[1]._id,
    doctor: doctors[1]._id,
    date: new Date(Date.now() + 86400000 * 3), // 3 days from now
    timeSlot: '02:00 PM - 02:30 PM',
    reason: 'Persistent mild breathing issues after a cold.',
    status: 'Pending',
    createdAt: new Date(),
  });

  isInitialized = true;
  console.log(`[Mock DB] Seed Complete! Users: ${users.length} | Doctors: ${doctors.length} | Patients: ${patients.length} | Demo Appointments: ${appointments.length}`);
};

// Autostart seeding if mock database is loaded
initializeMockDB();

// Helper population loaders (simulates .populate() from Mongoose)
const populateUser = (profile) => {
  if (!profile) return null;
  const user = users.find(u => u._id === profile.user);
  return {
    ...profile,
    user: user ? { _id: user._id, name: user.name, email: user.email, role: user.role } : null
  };
};

const populateDoctor = (profile) => {
  if (!profile) return null;
  const doc = doctors.find(d => d._id === profile.assignedDoctor);
  if (!doc) return profile;
  return {
    ...profile,
    assignedDoctor: populateUser(doc)
  };
};

const mockDbEngine = {
  // Collections getters
  users,
  doctors,
  patients,
  appointments,
  treatments,
  prescriptions,
  notifications,

  // Authentication Helpers
  findUserByEmail: (email) => users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  findUserById: (id) => users.find(u => u._id === id),
  createUser: (userData) => {
    const _id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const newUser = {
      _id,
      ...userData,
      createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
  },

  // Profile Helpers
  findDoctorById: (id) => {
    const doc = doctors.find(d => d._id === id || d.user === id);
    return populateUser(doc);
  },
  findPatientById: (id) => {
    const pat = patients.find(p => p._id === id || p.user === id);
    if (!pat) return null;
    const populated = populateUser(pat);
    return populateDoctor(populated);
  },
  createDoctorProfile: (profileData) => {
    const _id = `doctor_profile_${Date.now()}`;
    const newDoc = { _id, availabilityStatus: true, ...profileData };
    doctors.push(newDoc);
    return populateUser(newDoc);
  },
  createPatientProfile: (profileData) => {
    const _id = `patient_profile_${Date.now()}`;
    const newPat = { _id, medicalHistory: [], ...profileData };
    patients.push(newPat);
    return populateUser(newPat);
  },

  // Appointment Helpers
  createAppointment: (appData) => {
    const _id = `app_${Date.now()}`;
    const newApp = {
      _id,
      status: 'Pending',
      createdAt: new Date(),
      ...appData
    };
    appointments.push(newApp);
    return newApp;
  },
  findAppointments: (query = {}) => {
    let filtered = [...appointments];
    if (query.patient) filtered = filtered.filter(a => a.patient === query.patient);
    if (query.doctor) filtered = filtered.filter(a => a.doctor === query.doctor);
    
    return filtered.map(app => {
      const pat = patients.find(p => p._id === app.patient);
      const doc = doctors.find(d => d._id === app.doctor);
      return {
        ...app,
        patient: populateUser(pat),
        doctor: populateUser(doc),
      };
    });
  },
  findAppointmentById: (id) => {
    const app = appointments.find(a => a._id === id);
    if (!app) return null;
    const pat = patients.find(p => p._id === app.patient);
    const doc = doctors.find(d => d._id === app.doctor);
    return {
      ...app,
      patient: populateUser(pat),
      doctor: populateUser(doc)
    };
  },

  // Treatment Helpers
  createTreatment: (treatData) => {
    const _id = `treat_${Date.now()}`;
    const newTreat = {
      _id,
      treatmentStatus: 'Under Treatment',
      physicalCheckup: { temperature: '', bloodPressure: '', heartRate: '', weight: '', notes: '' },
      followUps: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...treatData
    };
    treatments.push(newTreat);
    return newTreat;
  },
  findTreatments: (query = {}) => {
    let filtered = [...treatments];
    if (query.patient) filtered = filtered.filter(t => t.patient === query.patient);
    if (query.doctor) filtered = filtered.filter(t => t.doctor === query.doctor);
    
    return filtered.map(treat => {
      const pat = patients.find(p => p._id === treat.patient);
      const doc = doctors.find(d => d._id === treat.doctor);
      const app = appointments.find(a => a._id === treat.appointment);
      return {
        ...treat,
        patient: populateUser(pat),
        doctor: populateUser(doc),
        appointment: app
      };
    });
  },
  findTreatmentById: (id) => {
    const treat = treatments.find(t => t._id === id);
    if (!treat) return null;
    const pat = patients.find(p => p._id === treat.patient);
    const doc = doctors.find(d => d._id === treat.doctor);
    const app = appointments.find(a => a._id === treat.appointment);
    return {
      ...treat,
      patient: populateUser(pat),
      doctor: populateUser(doc),
      appointment: app
    };
  },

  // Prescription Helpers
  createPrescription: (prescData) => {
    const _id = `presc_${Date.now()}`;
    const newPresc = {
      _id,
      createdAt: new Date(),
      ...prescData
    };
    prescriptions.push(newPresc);
    return newPresc;
  },
  findPrescriptions: (query = {}) => {
    let filtered = [...prescriptions];
    if (query.patient) filtered = filtered.filter(p => p.patient === query.patient);
    if (query.doctor) filtered = filtered.filter(p => p.doctor === query.doctor);
    
    return filtered.map(presc => {
      const pat = patients.find(p => p._id === presc.patient);
      const doc = doctors.find(d => d._id === presc.doctor);
      const app = appointments.find(a => a._id === presc.appointment);
      return {
        ...presc,
        patient: populateUser(pat),
        doctor: populateUser(doc),
        appointment: app
      };
    });
  },

  // Notification Helpers
  createNotification: (recipient, title, message, type = 'Appointment') => {
    const _id = `notif_${Date.now()}_${Math.floor(Math.random()*1000)}`;
    const newNotif = {
      _id,
      recipient,
      title,
      message,
      type,
      status: 'Unread',
      createdAt: new Date(),
    };
    notifications.push(newNotif);
    return newNotif;
  },
  findNotifications: (recipientId) => {
    return notifications
      .filter(n => n.recipient === recipientId)
      .sort((a,b) => b.createdAt - a.createdAt);
  }
};

module.exports = mockDbEngine;
