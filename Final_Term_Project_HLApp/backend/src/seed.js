const mongoose = require('mongoose');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

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

const seedDatabase = async () => {
  const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hlapp';
  console.log(`[Seed Process] Connecting to database: ${dbUri}`);
  
  try {
    await mongoose.connect(dbUri);
    
    console.log('[Seed Process] Clearing all existing user, doctor, patient, appointment, treatment, prescription, and notification records...');
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    
    // Attempt deletion on dynamic models to clear database completely
    try {
      await mongoose.connection.collection('appointments').deleteMany({});
      await mongoose.connection.collection('treatments').deleteMany({});
      await mongoose.connection.collection('prescriptions').deleteMany({});
      await mongoose.connection.collection('notifications').deleteMany({});
    } catch (err) {
      // Collections might not exist yet, ignore
    }
    
    console.log('[Seed Process] Database cleared successfully.');

    // 1. Create Admin
    const adminUser = await User.create({
      name: 'System Administrator',
      email: 'admin@hlapp.com',
      password: 'password123',
      role: 'Admin',
    });
    console.log(`[Seed Process] Created Admin: ${adminUser.email}`);

    // 2. Create Doctors
    console.log(`[Seed Process] Seeding ${doctorsData.length} Doctors...`);
    const seededDoctors = [];
    for (let i = 0; i < doctorsData.length; i++) {
      const doc = doctorsData[i];
      const email = `doctor${i + 1}@hlapp.com`;
      
      const user = await User.create({
        name: doc.name,
        email: email,
        password: 'password123',
        role: 'Doctor',
      });
      
      const doctorProfile = await Doctor.create({
        user: user._id,
        specialization: doc.specialization,
        phone: doc.phone,
        experience: doc.experience,
        department: doc.department,
        availabilityStatus: true,
      });
      
      seededDoctors.push(doctorProfile);
      console.log(` - Created Doctor Profile for ${doc.name} (${email})`);
    }

    // 3. Create Patients
    console.log(`[Seed Process] Seeding ${patientsData.length} Patients...`);
    for (let i = 0; i < patientsData.length; i++) {
      const pat = patientsData[i];
      const email = `patient${i + 1}@hlapp.com`;
      
      const user = await User.create({
        name: pat.name,
        email: email,
        password: 'password123',
        role: 'Patient',
      });
      
      // Assign a doctor dynamically
      const docIndex = i % seededDoctors.length;
      const assignedDoc = seededDoctors[docIndex];
      
      const patientProfile = await Patient.create({
        user: user._id,
        age: pat.age,
        gender: pat.gender,
        phone: pat.phone,
        address: pat.address,
        medicalHistory: pat.medicalHistory,
        assignedDoctor: assignedDoc._id,
      });
      
      console.log(` - Created Patient Profile for ${pat.name} (${email}) | Assigned Doctor ID: ${assignedDoc._id}`);
    }

    console.log('\n===============================================================');
    console.log('   DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('   Default Password for all accounts: password123');
    console.log('   Admin Login:     admin@hlapp.com');
    console.log('   Doctors Logins:  doctor1@hlapp.com to doctor15@hlapp.com');
    console.log('   Patient Logins:  patient1@hlapp.com to patient15@hlapp.com');
    console.log('===============================================================\n');

  } catch (error) {
    console.error(`[Seed Process Error] Seeding failed: ${error.message}`);
  } finally {
    mongoose.disconnect();
    console.log('[Seed Process] Database connection closed.');
  }
};

// Check if run directly from command line
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
