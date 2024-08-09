const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

// note this is the middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// the (HTML, CSS)
app.use(express.static(path.join(__dirname, "public")));

// the arrays being stored
let successfulAttempts = [];
let failedAttempts = [];

// Render of my initial form page :)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form  for the submissions
app.post("/check-palindrome", (req, res) => {
  const word = req.body.word;
  const type = req.body.type;

  const isPalindrome = (str) => {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    return cleanedStr === cleanedStr.split("").reverse().join("");
  };

  const result = isPalindrome(word)
    ? `"${word}" is a palindrome!`
    : `"${word}" is not a palindrome.`;

  // Store results based on palindrome check red and blue? add later
  if (isPalindrome(word)) {
    successfulAttempts.push(word);
  } else {
    failedAttempts.push(word);
  }

  // Send results and previous attempts back to the user on their server page
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Palindrome Result</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #ffe6e6; /* Light pink background */
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: #fff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                text-align: center;
                max-width: 600px;
                width: 100%;
            }
            h1 {
                font-size: 24px;
                color: #333;
                margin-bottom: 20px;
            }
            .result {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .success {
                color: #006400; /* Dark green */
            }
            .failure {
                color: #ff0000; /* Red */
            }
            .history {
                margin-top: 20px;
                text-align: left;
            }
            .history h2 {
                font-size: 20px;
            }
            .history ul {
                list-style-type: none;
                padding: 0;
            }
            .history li {
                margin-bottom: 5px;
            }
            a {
                display: block;
                margin-top: 20px;
                color: #ff6699;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Palindrome Check Result</h1>
            <p class="result ${
              isPalindrome(word) ? "success" : "failure"
            }">${result}</p>
            <div class="history">
                <h2>Previous Attempts</h2>
                <h3>Palindromes:</h3>
                <ul>${successfulAttempts
                  .map((item) => `<li>${item}</li>`)
                  .join("")}</ul>
                <h3>Non-Palindromes:</h3>
                <ul>${failedAttempts
                  .map((item) => `<li>${item}</li>`)
                  .join("")}</ul>
            </div>
            <a href="/">Check another word or phrase</a>
        </div>
    </body>
    </html>
  `);
});

// Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
