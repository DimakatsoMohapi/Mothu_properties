const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());

// POST route to save data
app.post('/submit', (req, res) => {
  const newMessage = {
    ...req.body,
    timestamp: new Date().toISOString()
  };

  const filePath = path.join(__dirname, 'data', 'enquiries.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    const messages = err ? [] : JSON.parse(data || '[]');
    messages.push(newMessage);

    fs.writeFile(filePath, JSON.stringify(messages, null, 2), err => {
      if (err) return res.status(500).send('Error saving message');
      res.status(200).send('Message saved');
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
