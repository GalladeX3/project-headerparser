// Request Header Parser Microservice - FCC project

const express = require('express');
const cors = require('cors');

const app = express();

// Allow FCC tester to call the API
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files and landing page
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

// Trust proxy so req.ip reflects client IP on Railway/Render
app.set('trust proxy', true);

// (optional) FCC sample endpoint
app.get('/api/hello', (req, res) => res.json({ greeting: 'hello API' }));

// REQUIRED endpoint
app.get('/api/whoami', (req, res) => {
  const xff = req.headers['x-forwarded-for'];
  const ip = xff ? String(xff).split(',')[0].trim()
                 : (req.ip || req.socket?.remoteAddress || '');
  const language = req.get('Accept-Language') || '';
  const software = req.get('User-Agent') || '';

  res.json({ ipaddress: ip, language, software });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Request Header Parser running on ${PORT}`));
