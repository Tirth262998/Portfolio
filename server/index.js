const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Configure JSON request parsing
app.use(express.json());

// Enable CORS
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin
}));

// Required Health Check Endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const DATA_FILE_PATH = process.env.DATA_FILE_PATH || './data';

// GET /api/projects
app.get('/api/projects', (req, res) => {
  try {
    const projectsFile = path.join(__dirname, DATA_FILE_PATH, 'projects.json');
    const data = fs.readFileSync(projectsFile, 'utf8');
    const projects = JSON.parse(data);
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error reading projects data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// GET /api/projects/:id
app.get('/api/projects/:id', (req, res) => {
  try {
    const projectsFile = path.join(__dirname, DATA_FILE_PATH, 'projects.json');
    const data = fs.readFileSync(projectsFile, 'utf8');
    const projects = JSON.parse(data);

    const project = projects.find(
      (p) => String(p.id) === String(req.params.id)
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error reading project data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/contact
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const contactsFile = path.join(__dirname, DATA_FILE_PATH, 'contacts.json');

    const data = fs.readFileSync(contactsFile, 'utf8');
    const contacts = JSON.parse(data);

    const newContact = {
      id: Date.now(),
      name,
      email,
      message
    };

    contacts.push(newContact);

    fs.writeFileSync(
      contactsFile,
      JSON.stringify(contacts, null, 2)
    );

    res.status(201).json({
      message: 'Contact submission received successfully',
      contact: newContact
    });
  } catch (error) {
    console.error('Error saving contact submission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/contact
app.get('/api/contact', (req, res) => {
  try {
    const contactsFile = path.join(__dirname, DATA_FILE_PATH, 'contacts.json');

    const data = fs.readFileSync(contactsFile, 'utf8');
    const contacts = JSON.parse(data);

    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error reading contact submissions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Deliberate error route for testing global error handling
app.get('/api/test-error', (req, res, next) => {
  next(new Error('Deliberate test error'));
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);

  res.status(500).json({
    error: 'Internal Server Error'
  });
});

// Start listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Data file path configured as: ${DATA_FILE_PATH}`);
  console.log(`Allowed CORS origin configured as: ${allowedOrigin}`);
});
