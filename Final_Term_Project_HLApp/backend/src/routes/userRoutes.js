const express = require('express');
const router = express.Router();
const {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Protect all routes here
router.use(protect);

// Doctor Routes
router.get('/doctors', getDoctors);
router.get('/doctors/:id', getDoctorById);
router.post('/doctors', authorize('Admin'), createDoctor);
router.put('/doctors/:id', authorize('Admin'), updateDoctor);
router.delete('/doctors/:id', authorize('Admin'), deleteDoctor);

// Patient Routes
router.get('/patients', getPatients);
router.get('/patients/:id', getPatientById);
router.post('/patients', authorize('Admin'), createPatient);
router.put('/patients/:id', updatePatient); // internally checks if Admin/Doctor or self
router.delete('/patients/:id', authorize('Admin'), deletePatient);

module.exports = router;
