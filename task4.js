// Lab Task 4: Simple HTML Page Renderer
// Creates / route that returns a full HTML page with title, paragraph and list

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`
    <html>
    <head><title>My Express Page</title></head>
    <body>
        <h1>Full Stack Development Lab</h1>
        <p>This is a simple HTML page rendered using Express.js. 
        It demonstrates how to send a complete HTML response from a Node.js server.</p>
        <h2>Technologies Used:</h2>
        <ul>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>JavaScript</li>
            <li>HTML</li>
        </ul>
    </body>
    </html>`);
});

app.listen(3000, () => {
    console.log("Task 4 running at http://localhost:3000");
});
