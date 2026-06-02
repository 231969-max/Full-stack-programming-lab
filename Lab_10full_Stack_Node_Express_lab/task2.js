// Lab Task 2: Simple Message Routes System
// Creates routes /home, /about, /contact and shows messages in browser

const express = require('express');
const app = express();

app.get('/home', (req, res) => {
    res.send(`
    <html>
    <head><title>Home Page</title></head>
    <body>
        <h1>Welcome Home</h1>
        <p>This is the Home Page of our Express application.</p>
    </body>
    </html>`);
});

app.get('/about', (req, res) => {
    res.send(`
    <html>
    <head><title>About Page</title></head>
    <body>
        <h1>About Us</h1>
        <p>We are learning Full Stack Development with Node.js and Express.</p>
    </body>
    </html>`);
});

app.get('/contact', (req, res) => {
    res.send(`
    <html>
    <head><title>Contact Page</title></head>
    <body>
        <h1>Contact Us</h1>
        <p>Email: contact@example.com</p>
        <p>Phone: +92-300-1234567</p>
    </body>
    </html>`);
});

app.listen(3000, () => {
    console.log("Task 2 running at http://localhost:3000/home");
});
