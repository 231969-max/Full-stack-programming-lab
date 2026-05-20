const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/patientController");

/* CREATE */
router.post(
    "/",
    auth("admin"),
    controller.createPatient
);

/* GET ALL */
router.get(
    "/",
    auth(),
    controller.getPatients
);

/* GET ONE */
router.get(
    "/:id",
    auth(),
    controller.getPatient
);

/* UPDATE */
router.put(
    "/:id",
    auth("admin"),
    controller.updatePatient
);

/* DELETE */
router.delete(
    "/:id",
    auth("admin"),
    controller.deletePatient
);

module.exports = router;
