// Lab Task 3: Dynamic User Page
// Creates route /user/:name and displays the name in browser

const express = require('express');
const app = express();

app.get('/user/:name', (req, res) => {
    const userName = req.params.name;
    res.send(`
    <html>
    <head><title>User Page</title></head>
    <body>
        <h1>Hello ${userName}</h1>
        <p>Welcome to your personal page, ${userName}!</p>
    </body>
    </html>`);
});

app.listen(3000, () => {
    console.log("Task 3 running at http://localhost:3000/user/Ali");
});
