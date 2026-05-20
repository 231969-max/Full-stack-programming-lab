const Patient = require("../models/Patient");

/* CREATE */
exports.createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({ message: "Failed to create patient", error: error.message });
    }
};

/* GET ALL */
exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch patients", error: error.message });
    }
};

/* GET ONE */
exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch patient", error: error.message });
    }
};

/* UPDATE */
exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json(patient);
    } catch (error) {
        res.status(400).json({ message: "Failed to update patient", error: error.message });
    }
};

/* DELETE */
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete patient", error: error.message });
    }
};
