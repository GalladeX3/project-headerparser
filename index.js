// Request Header Parser Microservice — WaldoXP
// index.js — Request Header Parser Microservice (FCC)
// where your node app starts

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// enable CORS 
app.use(cors({ optionsSuccessStatus: 200 }));

// serve static files and landing page
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

// IMPORTANT: trust proxy so req.ip reflects X-Forwarded-For on hosts like Railway
app.set('trust proxy', true);

// (optional) FCC sample endpoint
app.get('/api/hello', (req, res) => res.json({ greeting: 'hello API' }));

// REQUIRED endpoint for this project
app.get('/api/whoami', (req, res) => {
  const xff = req.headers['x-forwarded-for'];
  const ip = xff ? String(xff).split(',')[0].trim()
                 : (req.ip || req.socket?.remoteAddress || '');
  const language = req.get('Accept-Language') || '';
  const software = req.get('User-Agent') || '';
  res.json({ ipaddress: ip, language, software });
});

// listen for requests 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Request Header Parser running on ${PORT}`));
