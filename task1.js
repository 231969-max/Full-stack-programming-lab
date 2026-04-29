// Lab Task 1: Student List Display (GET Only)
// Creates an Express server that shows a list of students in browser using HTML <li>

const express = require('express');
const app = express();

const students = [
    { name: "Ali", rollNo: "001" },
    { name: "Ahmed", rollNo: "002" },
    { name: "Sara", rollNo: "003" },
    { name: "Fatima", rollNo: "004" },
    { name: "Usman", rollNo: "005" }
];

app.get('/students', (req, res) => {
    let html = `
    <html>
    <head><title>Student List</title></head>
    <body>
        <h1>Student List</h1>
        <ul>
            ${students.map(s => `<li>${s.name} - Roll No: ${s.rollNo}</li>`).join('')}
        </ul>
    </body>
    </html>`;
    res.send(html);
});

app.listen(3000, () => {
    console.log("Task 1 running at http://localhost:3000/students");
});
