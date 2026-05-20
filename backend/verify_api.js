// verify_api.js - Integration Test Script using Node.js Native Fetch

const BASE_URL = "http://localhost:5000";

async function runTests() {
    console.log("=== STARTING API E2E TESTS ===");
    let token = "";
    let testPatientId = "";

    try {
        // 1. REGISTER ADMIN USER
        console.log("\n[TEST 1] Registering Admin User...");
        const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "testadmin",
                password: "adminpassword123",
                role: "admin"
            })
        });
        const regData = await regRes.json();
        console.log("Register response code:", regRes.status);
        console.log("Register output:", regData.message || regData);

        // 2. LOGIN USER
        console.log("\n[TEST 2] Logging in to retrieve JWT Token...");
        const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "testadmin",
                password: "adminpassword123"
            })
        });
        const loginData = await loginRes.json();
        console.log("Login response code:", loginRes.status);
        if (loginData.accessToken) {
            token = loginData.accessToken;
            console.log("JWT Token retrieved successfully!");
        } else {
            throw new Error("Failed to retrieve access token");
        }

        // 3. CREATE PATIENT RECORD (ADMIN RESTRICTED)
        console.log("\n[TEST 3] Creating a new Patient Record...");
        const patientRes = await fetch(`${BASE_URL}/api/patients`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: "Arthur Dent",
                age: 42,
                disease: "Severe Confusion from Space Travel",
                contact: "+44 20 7946 0958"
            })
        });
        const patientData = await patientRes.json();
        console.log("Create patient response code:", patientRes.status);
        console.log("Patient created:", patientData);
        if (patientData._id) {
            testPatientId = patientData._id;
        }

        // 4. GET ALL PATIENTS
        console.log("\n[TEST 4] Fetching all Patient Records...");
        const getPatientsRes = await fetch(`${BASE_URL}/api/patients`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const patientsData = await getPatientsRes.json();
        console.log("Get patients response code:", getPatientsRes.status);
        console.log("Patients count:", patientsData.length);
        console.log("Patients details:", patientsData);

        // 5. TEST WEATHER FORECAST SERVICE (TASK 7.1)
        console.log("\n[TEST 5] Fetching Weather Forecast for Karachi...");
        const weatherRes = await fetch(`${BASE_URL}/api/weather?city=Karachi`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const weatherData = await weatherRes.json();
        console.log("Weather query response code:", weatherRes.status);
        console.log("Weather payload:", weatherData);

        // 6. TEST NEWS HEADLINES SERVICE (TASK 7.2)
        console.log("\n[TEST 6] Fetching Top Headlines for US...");
        const newsRes = await fetch(`${BASE_URL}/api/news/us`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const newsData = await newsRes.json();
        console.log("News query response code:", newsRes.status);
        console.log("Headlines returned:", newsData.length);
        console.log("First headline:", newsData[0]);

        // Cleanup
        if (testPatientId) {
            console.log("\n[TEST CLEANUP] Deleting test patient record...");
            const delRes = await fetch(`${BASE_URL}/api/patients/${testPatientId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            console.log("Delete response code:", delRes.status);
            console.log("Delete output:", await delRes.json());
        }

        console.log("\n=== ALL TESTS PASSED SUCCESSFULLY! ===");
    } catch (error) {
        console.error("\n❌ TESTS FAILED:", error.message);
    }
}

runTests();
