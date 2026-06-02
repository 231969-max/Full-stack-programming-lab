# Final_Term_Project_HLApp - Healthcare Ecosystem

An integrated full-stack web application designed for patients to book consultations online and medical teams to manage treatment lifecycles, physical vitals checkups, medications, follow-up calendars, and simulated alerts.

Developed using **Next.js** for the frontend, **Node.js & Express.js** for the backend, and **MongoDB** for persistent storage, with a secure role-based JWT authentication model (Admin, Doctor, Patient).

---

## 🌟 Premium Features

1. **Role-Based JWT Security**: Access control separating Dashboards and API endpoints. 
2. **Interactive Patient Hub**: Complete consultation booker, active medication schedule lists, detailed medical histories, and in-app simulated alarm center.
3. **Doctor Workspace**: Vitals recording (temp, BP, heart rate, weight), dynamic prescription writer (add/remove medications on-the-fly), and follow-up schedulers.
4. **Admin Control Center**: Visual counters, complete CRUD tables to Add/Update/Delete Specialist Doctors and Patients, and appointment triaging with specialist doctor reassignments.
5. **Resilient In-Memory Fallback**: If local MongoDB is not running on port `27017` on start, the backend automatically transitions to a fully functional in-memory database prepopulated with **1 Admin, 15 Doctors, and 15 Patients**, maintaining 100% of the project's interactive features!

---

## 🔑 Seeding Credential Sheet
* **Default Password (All Accounts)**: `password123`

| Role | Username / Email | Key Features |
| :--- | :--- | :--- |
| **System Administrator** | `admin@hlapp.com` | Hospital CRUD management, reassigning doctors, overview stats. |
| **Specialist Doctor** | `doctor1@hlapp.com` to `doctor15@hlapp.com` | Triaging appointments, recording vitals, compiling prescriptions, follow-ups. |
| **Patient Profile** | `patient1@hlapp.com` to `patient15@hlapp.com` | Online scheduling wizard, viewing history vault, medication clocks. |

*Quick Tip: On the Login Screen, click any of the **"Quick Demo Logins"** shortcut buttons to auto-fill the form instantly!*

---

## 🛠️ Step-by-Step Launch Guide

### Prerequisites
Ensure you have **Node.js** (v18+) installed on your machine.

---

### Step 1: Launch Backend Server
1. Open a new terminal inside the backend directory:
   ```bash
   cd Final_Term_Project_HLApp/backend
   ```
2. Install npm dependencies (if not already completed):
   ```bash
   npm install
   ```
3. *(Optional)* Seed MongoDB directly (requires running MongoDB on port 27017):
   ```bash
   npm run seed
   ```
4. Start the backend hot-reload server:
   ```bash
   npm run dev
   ```
   *Note: If MongoDB is not running locally, the terminal will log a resilient warning and activate **In-Memory Mock Database Simulation** loaded with all 1 Admin, 15 Doctors, and 15 Patients!*

---

### Step 2: Launch Frontend Portal
1. Open a second terminal inside the frontend directory:
   ```bash
   cd Final_Term_Project_HLApp/frontend
   ```
2. Start the Next.js development portal:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)** to experience the high-fidelity glassmorphism interface!

---

## 🏗️ Separation of Concerns (Directory Layout)

```
Final_Term_Project_HLApp/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connections (db.js) & Mock DB engine (mockDb.js)
│   │   ├── controllers/     # Authentication, CRUD, Appointments, Treatments
│   │   ├── middleware/      # JWT auth middleware and role validators
│   │   ├── models/          # Mongoose Schemas (User, Doctor, Patient, etc.)
│   │   ├── routes/          # Express API route bindings
│   │   └── seed.js          # Independent database seeding runner
│   ├── .env                 # Environment configs (PORT, JWT Secret, Mongo URI)
│   └── server.js            # Node main app launcher
│
└── frontend/
    ├── src/
    │   ├── app/             # Next.js App Router folders
    │   │   ├── dashboard/   # Role-based dashboards (admin, doctor, patient)
    │   │   ├── login/       # Login page
    │   │   ├── register/    # Register page
    │   │   ├── globals.css  # Premium glassmorphic design system styleheet
    │   │   ├── layout.js    # Root Next.js frame
    │   │   └── page.js      # Beautiful clinical portal gateway
    │   ├── context/         # AuthSession & Toast notification context providers
    │   └── services/        # Axios API client bindings with JWT interceptors
    └── package.json
```

---

## 📈 Requirements Mapping Check
- **JWT Auth & Password Hashing**: Fully implemented in `authController.js`, `User.js` pre-save hooks, and `auth.js` middlewares.
- **Doctor/PatientCRUD System**: Integrated in `userController.js` and exposed with complete modal actions in the Admin Dashboard.
- **15+ Doctors & 15+ Patients Constraint**: Maintained in `seed.js` and `mockDb.js` by default.
- **Appointment & Treatment Lifecycle**: Complete flow from patient booking -> admin/doctor approval -> vitals consult -> treatment cycle status -> follow-up visits. Managed in `appointmentController.js` and `treatmentController.js`.
- **Prescriptions & Medical History Timeline**: Med array compilation with custom dosages and unified timeline history views implemented in `treatmentController.js` and `patient/page.js` timeline views.
- **Simulated Notification Reminders**: Handled dynamically upon prescription or follow-up schedules. Dispatches alerts instantly to the patient's Simulated Alert Inbox.
- **Modern Next.js UI**: Implemented in App Router with full CSS design tokens, smooth hover glows, card blurs, and micro-animations.
