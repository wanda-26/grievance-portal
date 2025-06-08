// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views')); // serve HTML files

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'welcome.html'));
});

app.get('/grievance', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'grievance.html'));
});

app.post('/submit', (req, res) => {
  const grievance = req.body.grievance;
  const entry = `\n${new Date().toLocaleString()}:\n${grievance}\n---\n`;

  fs.appendFile('grievances.txt', entry, (err) => {
    if (err) {
      return res.send('Something went wrong 😢');
    }
    res.redirect('/grievance');
  });
});

app.get('/thank-you', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'thankyou.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
