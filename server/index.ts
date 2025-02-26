import express, { Request, Response } from 'express';
import cors from 'cors'; // Import cors
import bodyParser from 'body-parser';
import { connectToDatabase, getDb } from './db';
import { ObjectId } from 'mongodb'; 

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
connectToDatabase()
  .then(() => {
    console.log('Database connected. Starting server...');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1); // Stop the server if DB connection fails
  });

// Mock API endpoint
app.get('/api/data', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the serverrr!' });
});


app.get('/api/contact/search/:email', async (req: Request, res: Response) => {
  const email = req.query.email as string; // Explicitly cast it
  console.log("----- email -------<< [ "+ email+ " ]")

  if (!email) {
    res.status(400).json({ success: false, message: 'Email is required' });
    return; // Ensure function exits properly
  }

  try {
    const db = getDb();
    const collection = db.collection('contacts');
    const contact = await collection.findOne({ email });

    if (!contact) {
      res.status(404).json({ success: false, message: 'Contact not found' });
      return;
    }

    res.json({ success: true, contact });
  } catch (error) {
    console.error('Error fetching contact by email:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contact' });
  }
});

// Fetch contact by ID
app.get('/api/contact/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("----- id -------<< [ "+ id+ " ]")
  try {
    const db = getDb();
    const collection = db.collection('contacts');
    const contact = await collection.findOne({ _id: new ObjectId(id) });

    if (contact) {
      res.json({ success: true, contact });
    } else {
      res.status(404).json({ success: false, message: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contact' });
  }
});



// Contact form submission
app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  try {
    const db = getDb();
    const collection = db.collection('contacts');
    await collection.insertOne({ name, email, message, date: new Date() });
    res.json({ success: true, message: 'Message received and stored!' });
  } catch (error) {
    console.error('Error storing contact form submission:', error);
    res.status(500).json({ success: false, message: 'Failed to store message' });
  }
});

// skills
app.get('/api/skills', (req: Request, res: Response) => {
  const skills = [
    { name: 'TypeScript', level: 'Advanced' },
    { name: 'React', level: 'Advanced' },
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'Express.js', level: 'Intermediate' },
  ];
  res.json(skills);
});

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });