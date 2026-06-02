const express = require('express');
const router = express.Router();
const {
  createTreatment,
  getTreatments,
  getTreatmentById,
  updateTreatment,
  scheduleFollowUp,
  addPrescription,
  getPrescriptions,
  getMedicalHistory,
} = require('../controllers/treatmentController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

// Treatment core routes
router.get('/', getTreatments);
router.post('/', authorize('Doctor'), createTreatment);
router.get('/:id', getTreatmentById);
router.put('/:id', authorize('Doctor'), updateTreatment);

// Follow-ups
router.post('/:id/followups', authorize('Doctor'), scheduleFollowUp);

// Prescriptions
router.post('/prescriptions/new', authorize('Doctor'), addPrescription);
router.get('/prescriptions/all', getPrescriptions);

// Historical vault aggregation
router.get('/patient/:patientId/history', getMedicalHistory);

module.exports = router;
